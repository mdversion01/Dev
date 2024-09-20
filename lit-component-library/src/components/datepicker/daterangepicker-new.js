import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import Fontawesome from "lit-fontawesome";
import { datepickerStyles } from "./datepicker-styles.js";
import { utilitiesStyles } from "../utilities-styles.js";
import { selectFieldStyles } from "../select-field/select-field-styles.js";
import { plSelectFieldStyles } from "../pl-select-field/pl-select-field-styles.js";
import { formStyles } from "../form-styles.js";
import { inputFieldStyles } from "../input-field/input-field-styles";
import { inputGroupStyles } from "../input-group/input-group-styles.js";
import { plInputGroupStyles } from "../pl-input-group/pl-input-group-styles.js";
import { buttonStyles } from "../button/button-styles";
import { createPopper } from "@popperjs/core";

class DateRangePickerNew extends LitElement {
  static styles = [
    Fontawesome,
    formStyles,
    selectFieldStyles,
    plSelectFieldStyles,
    utilitiesStyles,
    buttonStyles,
    inputFieldStyles,
    inputGroupStyles,
    plInputGroupStyles,
    datepickerStyles,
    css`
      footer .small {
        font-size: 80%;
      }

      .dropdown-wrapper .dropdown {
        z-index: 1;
        width: 558px;
      }
    `,
  ];

  static get properties() {
    return {
      ariaLabel: { type: String },
      dateFormat: { type: String },
      okButtonDisabled: { type: Boolean },
      plumage: { type: Boolean },
      dropdownOpen: { type: Boolean },
      selectedDate: { type: String },
      selectedStartDate: { type: String },
      selectedEndDate: { type: String },
      dateFormat: { type: String },
      joinBy: { type: String },
      inputId: { type: String },
      append: { type: Boolean },
      appendId: { type: String },
      disabled: { type: Boolean },
      label: { type: String },
      labelHidden: { type: Boolean },
      formLayout: { type: String },
      icon: { type: String },
      prepend: { type: Boolean },
      prependId: { type: String },
      required: { type: Boolean },
      size: { type: String },
      validation: { type: Boolean },
      validationMessage: { type: String },
      warningMessage: { type: String },
      rangePicker: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.ariaLabel = "";
    this.dateFormat = "Y-m-d"; // Other options: "M-d-Y", "Long Date", "ISO"
    this.startDate = null;
    this.endDate = null;
    this.currentStartMonth = new Date().getMonth();
    this.currentStartYear = new Date().getFullYear();
    this.currentEndMonth = this.currentStartMonth + 1;
    this.currentEndYear = this.currentStartYear;
    this.focusedDate = new Date();
    this.okButtonDisabled = true; // Initialize the OK button as disabled
    this.plumage = false;
    this.dropdownOpen = false;
    this.selectedDate = "";
    this.selectedStartDate = "";
    this.selectedEndDate = "";
    this.dateFormat = "YYYY-MM-DD";
    this.inputElement = null;
    this.popperInstance = null;
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.preventClose = false;
    this.joinBy = " - ";
    this.inputId = "datepicker";
    this.append = true;
    this.appendId = "";
    this.disabled = false;
    this.label = "Date Picker";
    this.labelHidden = false;
    this.formLayout = "";
    this.icon = "fas fa-calendar-alt";
    this.prepend = false;
    this.prependId = "";
    this.required = false;
    this.size = "";
    this.validation = false;
    this.validationMessage = "";
    this.warningMessage = "";
    this.rangePicker = false;
    this.addEventListener("reset-picker", this.resetCalendar);

    if (this.currentEndMonth > 11) {
      this.currentEndMonth = 0;
      this.currentEndYear += 1;
    }

    // Set default warning message based on selected picker
    this.setDefaultWarningMessage();
  }

  firstUpdated() {
    this.inputElement = this.shadowRoot.querySelector(".form-control");
    document.addEventListener("click", this.handleOutsideClick);

    // Log inputElement to ensure it's correctly selected
    console.log(this.inputElement);

    if (!this.inputElement) {
      console.error("Input element not found.");
    } else {
      document.addEventListener("click", this.handleOutsideClick);
    }

    this.shadowRoot.addEventListener(
      "reset-picker",
      this.clearInputField.bind(this)
    );

    // Ensure the warning message is displayed when the page is loaded
    this.setDefaultWarningMessage(); // Call it here to ensure correct initial message
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.handleDocumentClick);

    // Listen for the reset-picker event and reset the calendar when it's triggered
    this.addEventListener("reset-picker", this.resetCalendar);

    this.append = this.getAttribute("append") !== "false";
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.handleOutsideClick);
    document.removeEventListener("click", this.handleDocumentClick);

    // Remove the event listener when the component is disconnected
    this.removeEventListener("reset-picker", this.resetCalendar);
  }

  renderSelects() {
    return html`
      <label id="monthSelectField" class="sr-only visually-hidden" for="months"
        >Select Month</label
      >
      <select
        id="months"
        class="form-select form-control select-sm months"
        aria-label="Select Month"
        aria-labelledby="monthSelectField"
        role="listbox"
        @change=${this.handleMonthChange}
      >
        ${Array.from({ length: 12 }, (_, i) => {
          const month = new Date(0, i).toLocaleString("en-US", {
            month: "long",
          });
          return html`<option value="${i}">${month}</option>`;
        })}
      </select>

      <label id="yearSelectField" class="sr-only visually-hidden" for="year"
        >Select Year</label
      >
      <select
        id="year"
        class="form-select form-control select-sm years"
        aria-label="Select Year"
        aria-labelledby="yearSelectField"
        role="listbox"
        @change=${this.handleYearChange}
      >
        ${Array.from({ length: 21 }, (_, i) => {
          const year = i + 2014;
          return html`<option value="${year}">${year}</option>`;
        })}
      </select>
    `;
  }

  renderPlumageSelects() {
    return html`
      <div
        class="pl-input-container mr-2"
        @click="${this.handleInteraction}"
        role="presentation"
        aria-labelledby="monthSelectField"
      >
        <label
          id="monthSelectField"
          class="sr-only visually-hidden"
          for="months"
          >Select Month</label
        >
        <select
          id="months"
          class="form-select form-control select-sm months"
          aria-label="Select Month"
          aria-labelledby="monthSelectField"
          role="listbox"
          @change=${this.handleMonthChange}
          @focus="${this.handleFocus}"
          @blur="${this.handleBlur}"
        >
          ${Array.from({ length: 12 }, (_, i) => {
            const month = new Date(0, i).toLocaleString("en-US", {
              month: "long",
            });
            return html`<option value="${i}">${month}</option>`;
          })}
        </select>

        <div class="b-underline" role="presentation">
          <div class="b-focus" role="presentation" aria-hidden="true"></div>
        </div>
      </div>

      <div
        class="pl-input-container mr-2"
        @click="${this.handleInteraction}"
        role="presentation"
        aria-labelledby="yearSelectField"
      >
        <label id="yearSelectField" class="sr-only visually-hidden" for="year"
          >Select Year</label
        >
        <select
          id="year"
          class="form-select form-control select-sm years"
          aria-label="Select Year"
          aria-labelledby="yearSelectField"
          role="listbox"
          @change=${this.handleYearChange}
          @focus="${this.handleFocus}"
          @blur="${this.handleBlur}"
        >
          ${Array.from({ length: 21 }, (_, i) => {
            const year = i + 2014;
            return html`<option value="${year}">${year}</option>`;
          })}
        </select>

        <div class="b-underline" role="presentation">
          <div class="b-focus" role="presentation" aria-hidden="true"></div>
        </div>
      </div>
    `;
  }

  handleInteraction(event) {
    // Stop the event from propagating to the document click handler
    event.stopPropagation();

    // Check if the event target is a select element (for both month and year)
    const container = event.target.closest(".pl-input-container");
    const bFocusDiv = container ? container.querySelector(".b-focus") : null;

    if (bFocusDiv) {
      // If the interaction is on the select field (either month or year), apply the focus styles
      if (event.target.tagName.toLowerCase() === "select") {
        bFocusDiv.style.width = "100%";
        bFocusDiv.style.left = "0";
      } else {
        bFocusDiv.style.width = "0";
        bFocusDiv.style.left = "50%";
      }
    }
  }

  handleFocus(event) {
    // Ensure focus logic is handled properly for both select fields (month and year)
    this.handleInteraction(event);
  }

  handleBlur(event) {
    // Reset the focus styling when focus is lost (for both select fields)
    this.handleDocumentClick();
  }

  handleDocumentClick() {
    // Ensure shadowRoot is available before querying elements
    if (this.shadowRoot) {
      const bFocusDivs = this.shadowRoot.querySelectorAll(".b-focus");

      // Check if bFocusDivs exists and contains elements
      if (bFocusDivs.length > 0) {
        bFocusDivs.forEach((bFocusDiv) => {
          bFocusDiv.style.width = "0";
          bFocusDiv.style.left = "50%";
        });
      }
    }
  }

  // Update input field with selected startDate and endDate when OK is clicked
  _handleOkClick() {
    const formattedStartDate = this.startDate
      ? this.formatDateAccordingToSelectedFormat(this.startDate)
      : null;

    const formattedEndDate = this.endDate
      ? this.formatDateAccordingToSelectedFormat(this.endDate)
      : null;

    if (formattedStartDate && formattedEndDate) {
      // Check if inputElement exists before trying to set its value
      if (this.inputElement) {
        // Update the input field with the selected range
        this.inputElement.value = `${formattedStartDate} ${this.joinBy} ${formattedEndDate}`;
      } else {
        console.error("Input element is not available.");
      }

      // Dispatch an event to notify about the updated range
      this.dispatchEvent(
        new CustomEvent("date-range-updated", {
          detail: {
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          },
        })
      );

      // Close the dropdown and clean up
      this.dropdownOpen = false;
      this.destroyPopper();
      document.removeEventListener("click", this.handleOutsideClick);
    } else {
      console.error("Invalid date range selection");
    }
  }

  formatDateAccordingToSelectedFormat(date) {
    // Simplified date formatting logic for consistency
    if (!date) return null;
    return this.formatDateYmd(date); // Using Y-m-d as default format
  }

  handleMonthChange(event) {
    const selectedMonth = parseInt(event.target.value, 10);
    this.currentStartMonth = selectedMonth;
    this.currentEndMonth = (selectedMonth + 1) % 12;

    if (this.currentStartMonth === 11) {
      this.currentEndYear = this.currentStartYear + 1;
    } else {
      this.currentEndYear = this.currentStartYear;
    }

    Promise.resolve(this.requestUpdate())
      .then(() => {
        this.syncMonthYearSelectors();
      })
      .catch((error) => {
        console.error("Error in handleMonthChange:", error);
      });
  }

  handleYearChange(event) {
    const selectedYear = parseInt(event.target.value, 10);
    this.currentStartYear = selectedYear;

    if (this.currentStartMonth === 11) {
      this.currentEndYear = selectedYear + 1;
    } else {
      this.currentEndYear = selectedYear;
    }

    Promise.resolve(this.requestUpdate())
      .then(() => {
        this.syncMonthYearSelectors();
      })
      .catch((error) => {
        console.error("Error in handleMonthChange:", error);
      });
  }

  syncMonthYearSelectors() {
    const monthSelect = this.shadowRoot.getElementById("months");
    const yearSelect = this.shadowRoot.getElementById("year");

    if (monthSelect) {
      monthSelect.value = this.currentStartMonth.toString();
    }
    if (yearSelect) {
      yearSelect.value = this.currentStartYear.toString();
    }
  }

  resetCalendar() {
    this.startDate = null;
    this.endDate = null;
    this.currentStartMonth = new Date().getMonth();
    this.currentStartYear = new Date().getFullYear();
    this.currentEndMonth = this.currentStartMonth + 1;
    this.currentEndYear = this.currentStartYear;

    // Ensure that the input field is cleared as well
    if (this.inputElement) {
      this.inputElement.value = "";
    }

    if (this.currentEndMonth > 11) {
      this.currentEndMonth = 0;
      this.currentEndYear += 1;
    }

    this.okButtonDisabled = true; // Disable the OK button after reset

    // Sync the month/year selectors and update the calendar view
    Promise.resolve(this.requestUpdate()).then(() => {
      this.syncMonthYearSelectors();
    });
  }

  renderCalendar(month0b, year) {
    const calendarGridId = `calendar-grid-${month0b}-${year}`;
    const formattedMonthYear = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
    }).format(new Date(year, month0b, 1));

    return html`
      <div
        aria-describedby="${calendarGridId}"
        aria-labelledby="calendar-grid-caption"
        aria-roledescription="Calendar"
        class="calendar dp-calendar form-control h-auto text-center pt-2"
        role="grid"
        aria-label="Calendar for ${formattedMonthYear}"
        tabindex="0"
        @keydown=${this.handleKeyDown}
        @focus=${this.handleCalendarFocus}
        @focusout=${this.handleCalendarFocusOut}
      >
        <div
          aria-live="polite"
          aria-atomic="true"
          class="calendar-grid-caption text-center font-weight-bold"
          id="calendar-grid-caption"
        >
          ${formattedMonthYear}
        </div>
        <div aria-hidden="true" class="calendar-grid-weekdays" role="row">
          <small
            aria-label="Sunday"
            title="Sunday"
            class="calendar-grid-day col${this.plumage ? " text-truncate" : ""}"
            role="columnheader"
            >Sun</small
          >
          <small
            aria-label="Monday"
            title="Monday"
            class="calendar-grid-day col${this.plumage ? " text-truncate" : ""}"
            role="columnheader"
            >Mon</small
          >
          <small
            aria-label="Tuesday"
            title="Tuesday"
            class="calendar-grid-day col${this.plumage ? " text-truncate" : ""}"
            role="columnheader"
            >Tue</small
          >
          <small
            aria-label="Wednesday"
            title="Wednesday"
            class="calendar-grid-day col${this.plumage ? " text-truncate" : ""}"
            role="columnheader"
            >Wed</small
          >
          <small
            aria-label="Thursday"
            title="Thursday"
            class="calendar-grid-day col${this.plumage ? " text-truncate" : ""}"
            role="columnheader"
            >Thu</small
          >
          <small
            aria-label="Friday"
            title="Friday"
            class="calendar-grid-day col${this.plumage ? " text-truncate" : ""}"
            role="columnheader"
            >Fri</small
          >
          <small
            aria-label="Saturday"
            title="Saturday"
            class="calendar-grid-day col${this.plumage ? " text-truncate" : ""}"
            role="columnheader"
            >Sat</small
          >
        </div>
        <div class="calendar-grid" id="${calendarGridId}" role="grid">
          ${this.renderCalendarDays(month0b, year)}
        </div>
      </div>
    `;
  }

  renderCalendarDays(month0b, year) {
    const previousMonthLastDate = new Date(
      Date.UTC(year, month0b, 0)
    ).getUTCDate();
    const firstDay = this.getFirstDayOfMonth(year, month0b);
    const daysInMonth = new Date(Date.UTC(year, month0b + 1, 0)).getUTCDate();
    const firstDayOfWeek = firstDay === 0 ? 0 : firstDay;
    let date = 1;
    let nextMonthDay = 1;
    let rows = [];
    let currentRow = [];

    for (let cellIndex = 0; cellIndex < 42; cellIndex++) {
      let day = null;
      let dataMonth = month0b + 1;
      let dataYear = year;
      const itemClasses = ["calendar-grid-item"];
      let dayNumberSpanClasses = [
        "btn",
        "border-0",
        "rounded-circle",
        "text-nowrap",
      ];
      let ariaLabel = "";

      if (cellIndex < firstDayOfWeek) {
        day = previousMonthLastDate - firstDayOfWeek + cellIndex + 1;
        dataMonth = month0b === 0 ? 12 : month0b;
        dataYear = month0b === 0 ? year - 1 : year;
        itemClasses.push("previous-month-day");
        dayNumberSpanClasses.push("text-muted");
      } else if (date <= daysInMonth) {
        day = date++;
        const currentDate = new Date(Date.UTC(year, month0b, day));
        dayNumberSpanClasses.push("text-dark", "font-weight-bold");

        if (day === 1) {
          itemClasses.push(
            month0b === this.currentStartMonth
              ? "csm-first-day"
              : "cem-first-day"
          );
        }
        if (day === daysInMonth) {
          itemClasses.push(
            month0b === this.currentStartMonth ? "csm-last-day" : "cem-last-day"
          );
        }

        if (this.isToday(currentDate)) {
          dayNumberSpanClasses.push("current-day");
        }
        if (
          this.isDateInRange(currentDate) &&
          !itemClasses.includes("previous-month-day") &&
          !itemClasses.includes("next-month-day")
        ) {
          itemClasses.push("selected-range");
        }
        if (
          this.isStartOrEndDate(currentDate) &&
          !itemClasses.includes("previous-month-day") &&
          !itemClasses.includes("next-month-day")
        ) {
          itemClasses.push("selected-range-active");
        }
        if (this.isFocusedDate(currentDate)) {
          dayNumberSpanClasses.push("focus");
        }
      } else {
        day = nextMonthDay++;
        dataMonth = month0b === 11 ? 1 : month0b + 2;
        dataYear = month0b === 11 ? year + 1 : year;
        itemClasses.push("next-month-day");
        dayNumberSpanClasses.push("text-muted");
      }

      if (
        !itemClasses.includes("selected-range") &&
        !itemClasses.includes("selected-range-active")
      ) {
        dayNumberSpanClasses.push("btn-outline-light");
      }

      ariaLabel = day
        ? new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(dataYear, dataMonth - 1, day))
        : "";

      const dataDate = day
        ? `${dataYear}-${String(dataMonth).padStart(2, "0")}-${String(
            day
          ).padStart(2, "0")}`
        : "";

      const calendarCell = {
        cell: html`
          <div
            class="${itemClasses.join(" ")}"
            role="gridcell"
            tabindex="-1"
            data-month="${dataMonth}"
            data-year="${dataYear}"
            data-day="${day}"
            data-date="${dataDate}"
            id="${day ? `cell-${dataDate}` : ""}"
            aria-label="${ariaLabel}"
            @click=${() =>
              day &&
              this.handleDayClick(
                new Date(Date.UTC(dataYear, dataMonth - 1, day))
              )}
          >
            <span class="${dayNumberSpanClasses.join(" ")}">${day || ""}</span>
          </div>
        `,
        isNextMonth: itemClasses.includes("next-month-day"),
      };

      currentRow.push(calendarCell);

      if (currentRow.length === 7) {
        const isNextMonthRow = currentRow.every((cell) => cell.isNextMonth);
        if (!isNextMonthRow) {
          rows.push(html`${currentRow.map((c) => c.cell)}`);
        }
        currentRow = [];
      }
    }

    return html`${rows}`;
  }

  handleKeyDown(event) {
    const inputField = this.shadowRoot.querySelector("input.form-control");

    // Handle Backspace key: Clear input and reset calendar if the field is empty
    if (event.key === "Backspace") {
      if (inputField.value.trim() === "") {
        this.clearInputField(); // Reset everything if input is empty
        return; // Exit to prevent further key handling
      }
    }

    const calendarGrids = this.shadowRoot.querySelectorAll(".calendar-grid");
    let currentFocus = this.shadowRoot.activeElement;
    let calendarCells = Array.from(calendarGrids).flatMap((grid) =>
      Array.from(
        grid.querySelectorAll(
          ".calendar-grid-item:not(.previous-month-day):not(.next-month-day)"
        )
      )
    );

    if (event.key === "Tab") {
      // If the Tab key is pressed
      if (!event.shiftKey) {
        // If Tab is pressed (not Shift+Tab), focus on the next focusable element outside the calendar
        event.preventDefault();
        this.shadowRoot.querySelector(".date-range-display")?.focus(); // Focus on the first time input
      } else {
        // Handle Shift+Tab if needed
        // You can define behavior if Shift+Tab is pressed and should navigate to the previous focusable element
      }
    } else if (event.key.startsWith("Arrow")) {
      event.preventDefault();
      let index = Array.from(calendarCells).indexOf(currentFocus);

      if (index !== -1) {
        let newIndex = index;

        if (event.key === "ArrowUp") {
          newIndex = Math.max(index - 7, 0);
          this.moveFocusToNewIndex(calendarCells, newIndex);
        } else if (event.key === "ArrowDown") {
          newIndex = Math.min(index + 7, calendarCells.length - 1);
          this.moveFocusToNewIndex(calendarCells, newIndex);
        } else if (event.key === "ArrowLeft") {
          if (currentFocus.classList.contains("csm-first-day")) {
            this.prevMonth().then(() => {
              const lastDayElement = this.shadowRoot.querySelector(
                ".calendar-grid-item.csm-last-day span"
              );
              if (lastDayElement) {
                this.clearAllFocus();
                lastDayElement.classList.add("focus");
                lastDayElement.parentElement.focus();
              }
            });
          } else {
            newIndex = Math.max(index - 1, 0);
            this.moveFocusToNewIndex(calendarCells, newIndex);
          }
        } else if (event.key === "ArrowRight") {
          if (currentFocus.classList.contains("cem-last-day")) {
            this.nextMonth().then(() => {
              const firstDayElement = this.shadowRoot.querySelector(
                ".calendar-grid-item.cem-first-day span"
              );
              if (firstDayElement) {
                this.clearAllFocus();
                firstDayElement.classList.add("focus");
                firstDayElement.parentElement.focus();
              }
            });
          } else {
            newIndex = Math.min(index + 1, calendarCells.length - 1);
            this.moveFocusToNewIndex(calendarCells, newIndex);
          }
        }
      }
    } else if (event.key === "Enter" || event.key === " ") {
      this.handleEnterKeyPress(event);
    }
  }

  moveFocusToNewIndex(calendarCells, newIndex) {
    this.clearAllFocus();

    const targetCell = calendarCells[newIndex];
    if (targetCell) {
      if (
        targetCell.classList.contains("previous-month-day") ||
        targetCell.classList.contains("next-month-day")
      ) {
        return;
      }

      const targetSpan = targetCell.querySelector("span");
      targetSpan.classList.add("focus");
      targetCell.focus();
      this.updateActiveDateElements();
    }
  }

  prevMonth() {
    this.currentStartMonth--;
    this.currentEndMonth--;

    if (this.currentStartMonth < 0) {
      this.currentStartMonth = 11;
      this.currentStartYear--;
    }

    if (this.currentEndMonth < 0) {
      this.currentEndMonth = 11;
      this.currentEndYear--;
    }

    this.focusedDate.setUTCMonth(this.currentStartMonth);
    this.focusedDate.setUTCFullYear(this.currentStartYear);

    return Promise.resolve(this.requestUpdate()).then(() => {
      this.syncMonthYearSelectors();
    });
  }

  nextMonth() {
    this.currentStartMonth++;
    this.currentEndMonth++;

    if (this.currentStartMonth > 11) {
      this.currentStartMonth = 0;
      this.currentStartYear++;
    }

    if (this.currentEndMonth > 11) {
      this.currentEndMonth = 0;
      this.currentEndYear++;
    }

    this.focusedDate.setUTCMonth(this.currentStartMonth);
    this.focusedDate.setUTCFullYear(this.currentStartYear);

    return Promise.resolve(this.requestUpdate()).then(() => {
      this.syncMonthYearSelectors();
    });
  }

  focusOnFirstDay(monthType) {
    const calendarGrid = this.shadowRoot.querySelectorAll(
      monthType === "currentStartMonth"
        ? ".dp-calendar:first-child .calendar-grid"
        : ".dp-calendar:last-child .calendar-grid"
    );

    const firstDaySpan = calendarGrid[0].querySelector(
      '.calendar-grid-item[data-day="1"] span'
    );
    if (firstDaySpan) {
      this.clearAllFocus();
      firstDaySpan.classList.add("focus");
      firstDaySpan.parentElement.focus();
    }
  }

  focusOnLastDay(monthType) {
    const calendarGrid = this.shadowRoot.querySelectorAll(
      monthType === "currentStartMonth"
        ? ".dp-calendar:first-child .calendar-grid"
        : ".dp-calendar:last-child .calendar-grid"
    );

    const lastDay = new Date(
      this.currentStartYear,
      this.currentStartMonth + 1,
      0
    ).getDate();

    const lastDaySpan = calendarGrid[0].querySelector(
      `.calendar-grid-item[data-day="${lastDay}"] span`
    );

    if (lastDaySpan) {
      this.clearAllFocus();
      lastDaySpan.classList.add("focus");
      lastDaySpan.parentElement.focus();
    }
  }

  clearAllFocus() {
    const focusedElements = this.shadowRoot.querySelectorAll(
      ".calendar-grid-item span.focus"
    );
    focusedElements.forEach((el) => el.classList.remove("focus"));
  }

  handleDayClick(date) {
    this.selectDate(date);
    this.updateDisplayedDateRange(); // Make sure the displayed date range is updated
  }

  handleEnterKeyPress(event) {
    const focusedElement = this.shadowRoot.querySelector(
      ".calendar-grid-item span.focus"
    );
    if (focusedElement) {
      const date = new Date(
        focusedElement.parentElement.getAttribute("data-date")
      );
      this.selectDate(date);
    }
  }

  handleCalendarFocus() {
    this.clearAllFocus();

    const firstDayElement = this.shadowRoot.querySelector(
      ".dp-calendar:first-child .calendar-grid-item.csm-first-day span"
    );

    if (firstDayElement) {
      firstDayElement.classList.add("focus");
      firstDayElement.parentElement.focus();
      this.shadowRoot.querySelector(".calendar-wrapper").classList.add("focus");
    }
  }

  handleCalendarFocusOut(event) {
    const calendarDiv = this.shadowRoot.querySelector(".calendar-wrapper");
    if (
      !this.shadowRoot
        .querySelector(".calendar-wrapper")
        .contains(event.relatedTarget)
    ) {
      this.clearAllFocus();
      calendarDiv.classList.remove("focus");
    }
  }

  // Select the date based on startDate and endDate logic
  selectDate(date) {
    if (!this.startDate || (this.startDate && this.endDate)) {
      this.startDate = date;
      this.endDate = null;
    } else {
      if (date >= this.startDate) {
        this.endDate = date;
      } else {
        this.startDate = date;
        this.endDate = null;
      }
    }

    this.updateSelectedRange(); // Update the range selections in the calendar
    this._updateOkButtonState(); // Enable OK button if valid
    this.updateDisplayedDateRange(); // Update displayed date range immediately
    this.requestUpdate();
  }

  // Update the range selections in the calendar grid
  updateSelectedRange() {
    const allItems = this.shadowRoot.querySelectorAll(".calendar-grid-item");

    allItems.forEach((item) => {
      const itemDate = new Date(item.getAttribute("data-date"));
      const normalizedItemDate = this.normalizeDate(itemDate);
      const spanElement = item.querySelector("span");

      // Clear previous selection classes
      item.classList.remove("selected-range", "selected-range-active");
      spanElement.classList.remove("focus");

      // Apply 'selected-range-active' to the start and end dates
      if (this.isStartOrEndDate(normalizedItemDate)) {
        item.classList.add("selected-range-active");
        spanElement.classList.remove("btn-outline-light");
      }

      // Apply 'selected-range' to the dates within the range
      if (
        this.isDateInRange(normalizedItemDate) &&
        !item.classList.contains("previous-month-day") &&
        !item.classList.contains("next-month-day")
      ) {
        item.classList.add("selected-range");
        spanElement.classList.remove("btn-outline-light");
      }
    });
  }

  // Update the displayed range text in the UI
  updateDisplayedDateRange() {
    const startDateElement = this.shadowRoot.querySelector(".start-date");
    const endDateElement = this.shadowRoot.querySelector(".end-date");

    if (this.startDate && this.endDate) {
      const formattedStartDate = this.formatDate(
        this.normalizeDate(this.startDate), // Normalize date to prevent time zone shifts
        this.dateFormat
      );
      const formattedEndDate = this.formatDate(
        this.normalizeDate(this.endDate),
        this.dateFormat
      );

      startDateElement.textContent = formattedStartDate;
      endDateElement.textContent = formattedEndDate;
    } else {
      startDateElement.textContent = "N/A";
      endDateElement.textContent = "N/A";
    }
  }

  isToday(date) {
    const today = new Date();
    return (
      date.getUTCFullYear() === today.getUTCFullYear() &&
      date.getUTCMonth() === today.getUTCMonth() &&
      date.getUTCDate() === today.getUTCDate()
    );
  }

  // Check if a date is within the selected range
  isDateInRange(date) {
    const normalizedStartDate = this.normalizeDate(this.startDate);
    const normalizedEndDate = this.normalizeDate(this.endDate);
    return (
      normalizedStartDate &&
      normalizedEndDate &&
      date >= normalizedStartDate &&
      date <= normalizedEndDate
    );
  }

  // Check if a date is the start or end date
  isStartOrEndDate(date) {
    const normalizedStartDate = this.startDate
      ? this.normalizeDate(this.startDate)
      : null;
    const normalizedEndDate = this.endDate
      ? this.normalizeDate(this.endDate)
      : null;

    // Use exact date comparison, not off-by-one
    return (
      (normalizedStartDate &&
        date.getTime() === normalizedStartDate.getTime()) ||
      (normalizedEndDate && date.getTime() === normalizedEndDate.getTime())
    );
  }

  isFocusedDate(date) {
    return this.focusedDate && date.getTime() === this.focusedDate.getTime();
  }

  updateActiveDateElements() {
    const focusedSpan = this.shadowRoot.querySelector(
      ".calendar-grid-item span.focus"
    );

    if (focusedSpan) {
      const dataDate = focusedSpan.parentElement.getAttribute("data-date");
      const date = new Date(`${dataDate}T00:00:00Z`);

      const selectedDateYmd =
        this.shadowRoot.querySelector(".selected-date-Ymd");
      const selectedFormatted = this.shadowRoot.querySelector(
        ".selected-formatted-date"
      );
      const selectedIsoFormatted = this.shadowRoot.querySelector(
        ".selected-formatted-iso"
      );

      if (selectedDateYmd) {
        selectedDateYmd.textContent = this.formatDateYmd(date);
      }
      if (selectedFormatted) {
        selectedFormatted.textContent = this.formatDateLong(date);
      }
      if (selectedIsoFormatted) {
        selectedIsoFormatted.textContent = this.formatISODate(date);
      }
    }
  }

  getFirstDayOfMonth(year, month) {
    return new Date(Date.UTC(year, month, 1)).getUTCDay();
  }

  formatDateYmd(date) {
    return date.toISOString().split("T")[0];
  }

  formatDateLong(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };
    return date.toLocaleDateString("en-US", options);
  }

  formatDateMDY(date) {
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${month}-${day}-${year}`;
  }

  formatISODate(date) {
    return date.toISOString();
  }

  _updateOkButtonState() {
    const startDateValid =
      this.startDate && this.formatDateYmd(this.startDate) !== "N/A";
    const endDateValid =
      this.endDate && this.formatDateYmd(this.endDate) !== "N/A";

    this.okButtonDisabled = !(startDateValid && endDateValid); // Disable OK button if any condition is not met
  }

  clearInputField() {
    this.startDate = null;
    this.endDate = null;

    // Clear the input field
    if (this.inputElement) {
      this.inputElement.value = "";
    }

    // Set default warning message based on the selected picker
    this.setDefaultWarningMessage();

    // Reset validation message
    this.validationMessage = "";

    // Add 'is-invalid' and 'invalid' classes to input and label
    this.inputElement.classList.add("is-invalid");
    const labelElement = this.shadowRoot.querySelector(
      `label[for="${this.inputId}"]`
    );
    const appendElement = this.shadowRoot.querySelector(
      ".pl-input-group-append"
    );
    const prependElement = this.shadowRoot.querySelector(
      ".pl-input-group-prepend"
    );

    if (labelElement) {
      labelElement.classList.add("invalid");
    }
    if (appendElement) {
      appendElement.classList.add("is-invalid");
    }
    if (prependElement) {
      prependElement.classList.add("is-invalid");
    }

    // Close the dropdown and destroy the Popper instance (if exists)
    this.dropdownOpen = false;
    this.destroyPopper(); // Destroy the Popper instance

    // Reset the calendar view to its default state
    this.requestUpdate();
    this.resetCalendar();
  }

  // Updated handleOutsideClick to prevent dropdown close on internal clicks
  handleOutsideClick(event) {
    const dropdown = this.shadowRoot.querySelector(".dropdown");
    const okButton = this.shadowRoot.querySelector(".ok-button button");

    // Only close if the click is outside the dropdown or on the OK button
    if (
      dropdown &&
      (!dropdown.contains(event.target) || event.target === okButton)
    ) {
      this.dropdownOpen = false;
      this.destroyPopper();
      document.removeEventListener("click", this.handleOutsideClick);
    }

    this.preventClose = false; // Ensure this is reset after every click
  }

  // Helper function to remove the validation classes
  removeValidationClasses() {
    if (this.inputElement) {
      // Remove 'is-invalid' from the input field
      this.inputElement.classList.remove("is-invalid");
    }

    // Remove 'invalid' and 'is-invalid' from other elements
    const labelElement = this.shadowRoot.querySelector(
      `label[for="${this.inputId}"]`
    );
    const appendElement = this.shadowRoot.querySelector(
      ".pl-input-group-append"
    );
    const prependElement = this.shadowRoot.querySelector(
      ".pl-input-group-prepend"
    );

    if (labelElement) {
      labelElement.classList.remove("invalid");
    }
    if (appendElement) {
      appendElement.classList.remove("is-invalid");
    }
    if (prependElement) {
      prependElement.classList.remove("is-invalid");
    }
  }

  // Define the missing method
  updateSelectedDateDisplay(date) {
    // If the input element exists, update its value based on the selected date
    if (this.inputElement) {
      if (date) {
        const formattedDate = this.formatDate(date, this.dateFormat);
        this.inputElement.value = formattedDate;
      } else {
        this.inputElement.value = ""; // Clear the input if no date is selected
      }
    }
  }

  toggleDropdown(event) {
    event.stopPropagation();

    this.preventClose = true; // Prevent the dropdown from closing

    this.dropdownOpen = !this.dropdownOpen;

    if (this.dropdownOpen) {
      // If a range is already selected, ensure the correct months are displayed
      if (this.startDate) {
        this.currentStartMonth = this.startDate.getMonth();
        this.currentStartYear = this.startDate.getFullYear();
        this.currentEndMonth = this.endDate
          ? this.endDate.getMonth()
          : (this.currentStartMonth + 1) % 12;
        this.currentEndYear = this.endDate
          ? this.endDate.getFullYear()
          : this.currentStartMonth === 11
          ? this.currentStartYear + 1
          : this.currentStartYear;

        // Handle when start and end dates are in the same month
        if (
          this.currentStartMonth === this.currentEndMonth &&
          this.currentStartYear === this.currentEndYear
        ) {
          this.currentEndMonth = (this.currentStartMonth + 1) % 12;
          this.currentEndYear =
            this.currentStartMonth === 11
              ? this.currentStartYear + 1
              : this.currentStartYear;
        }
      } else {
        // Default to current month and the next consecutive month
        const today = new Date();
        this.currentStartMonth = today.getMonth();
        this.currentStartYear = today.getFullYear();
        this.currentEndMonth = (this.currentStartMonth + 1) % 12;
        this.currentEndYear =
          this.currentStartMonth === 11
            ? this.currentStartYear + 1
            : this.currentStartYear;
      }

      // Update the calendar view
      this.createPopperInstance();
      document.addEventListener("click", this.handleOutsideClick);
    } else {
      this.destroyPopper();
      document.removeEventListener("click", this.handleOutsideClick);
    }
  }

  // Normalize a date to remove time components and ensure comparisons only on year, month, day
  normalizeDate(date) {
    // Avoid timezone-related issues by always working in UTC
    if (!date) return null;
    return new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    );
  }

  // Utility to parse a date string based on the dateFormat prop
  parseDate(dateStr) {
    const parts = dateStr.split("-");

    // Adjust parsing according to the selected dateFormat
    if (this.dateFormat === "YYYY-MM-DD") {
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // JS months are 0-based
        const day = parseInt(parts[2], 10);
        return new Date(year, month, day);
      }
    } else if (this.dateFormat === "MM-DD-YYYY") {
      if (parts.length === 3) {
        const month = parseInt(parts[0], 10) - 1; // JS months are 0-based
        const day = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
      }
    }
    return null;
  }

  createPopperInstance() {
    const dropdown = this.shadowRoot.querySelector(".dropdown");
    if (!this.popperInstance && this.inputElement && dropdown) {
      this.popperInstance = createPopper(this.inputElement, dropdown, {
        placement: "bottom-start",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 2], // Adjust offset as needed
            },
          },
          {
            name: "preventOverflow",
            options: {
              boundary: "viewport",
            },
          },
        ],
      });
    }
  }

  destroyPopper() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
  }

  // Helper function to format a date according to the selected format
  formatDate(date, format) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    if (format === "YYYY-MM-DD") {
      return `${year}-${month}-${day}`;
    } else if (format === "MM-DD-YYYY") {
      return `${month}-${day}-${year}`;
    }

    return `${year}-${month}-${day}`; // Default format
  }

  validateInput(value) {
    // Regular expression to match a full date range in formats like "YYYY-MM-DD to YYYY-MM-DD"
    const dateRangePattern =
      /^(?:\d{4}-\d{2}-\d{2})\s*(to|-)\s*(?:\d{4}-\d{2}-\d{2})$/;

    const isValid = dateRangePattern.test(value);

    if (!value) {
      // If input is empty, show the warning message based on the selected picker
      this.setDefaultWarningMessage();
    } else if (!isValid) {
      // If format is invalid, show the validation message
      this.validation = true;
      this.validationMessage = "Invalid date range format.";
      this.warningMessage = ""; // Reset warning message
    } else {
      // Input is valid, clear both messages
      this.validation = false;
      this.validationMessage = "";
      this.warningMessage = "";
    }

    this.requestUpdate(); // Ensure the UI reflects changes
  }

  // Call this method when the picker type is updated or initially loaded
  setDefaultWarningMessage() {
    this.validation = this.validation; // Ensure validation is active
    this.requestUpdate(); // Trigger a re-render to display the message
  }

  // Handle input changes when typing a date range manually
  handleInputChange(event) {
    const inputValue = event.target.value.trim();

    if (inputValue === "") {
      // Reset everything if input is cleared
      this.clearInputField();
      return;
    }

    // Split the input based on the joinBy (e.g., " - " or " to ")
    const dates = inputValue.split(this.joinBy);
    if (dates.length === 2) {
      const [startDateStr, endDateStr] = dates.map((date) => date.trim());

      // Parse the start and end dates from the input
      const startDate = this.parseDate(startDateStr);
      const endDate = this.parseDate(endDateStr);

      if (startDate && endDate && startDate <= endDate) {
        this.startDate = startDate;
        this.endDate = endDate;

        // Sync the calendar to show the months of the startDate and next consecutive month
        this.currentStartMonth = this.startDate.getMonth();
        this.currentStartYear = this.startDate.getFullYear();

        // Ensure consecutive months display
        if (
          this.startDate.getMonth() === this.endDate.getMonth() &&
          this.startDate.getFullYear() === this.endDate.getFullYear()
        ) {
          // If the start and end are in the same month, show the next month
          this.currentEndMonth = (this.currentStartMonth + 1) % 12;
          this.currentEndYear =
            this.currentStartMonth === 11
              ? this.currentStartYear + 1
              : this.currentStartYear;
        } else {
          // Show the end date's month if it's different
          this.currentEndMonth = this.endDate.getMonth();
          this.currentEndYear = this.endDate.getFullYear();
        }

        // Update the range and the calendar view
        this.updateSelectedRange();
        this.updateDisplayedDateRange();

        // Re-render the calendar to reflect the manual input
        this.requestUpdate();
      } else {
        // Handle invalid date input
        this.validation = true;
        this.validationMessage = "Invalid date range format.";
        this.requestUpdate();
      }
    } else {
      // Handle incorrect input format
      this.validation = true;
      this.validationMessage = "Invalid date range format.";
      this.requestUpdate();
    }
  }

  handleDateRangeSelect(event) {
    // Manually extract the date components to avoid time zone issues
    const startDateParts = event.detail.startDate.split("-");
    const endDateParts = event.detail.endDate.split("-");

    // Create date objects using local date parts (YYYY, MM, DD)
    const startDate = new Date(
      startDateParts[0],
      startDateParts[1] - 1,
      startDateParts[2]
    );
    const endDate = new Date(
      endDateParts[0],
      endDateParts[1] - 1,
      endDateParts[2]
    );

    // Format the dates for display
    this.selectedStartDate = this.formatDate(startDate, this.dateFormat);
    this.selectedEndDate = this.formatDate(endDate, this.dateFormat);

    this.dropdownOpen = false;

    if (this.inputElement) {
      this.inputElement.value =
        this.selectedStartDate && this.selectedEndDate
          ? `${this.selectedStartDate} ${this.joinBy} ${this.selectedEndDate}`
          : "";
      this.inputElement.focus();
    }

    // Validate input after selecting the date range
    this.validateInput(this.inputElement.value);

    this.removeValidationClasses();
    this.destroyPopper();
  }

  handleNavigationClick(event) {
    this.preventClose = true;
  }

  renderDateRangePicker() {
    // Ensure consecutive month rendering
    const startMonth = this.currentStartMonth;
    const startYear = this.currentStartYear;

    const nextMonth = (startMonth + 1) % 12;
    const nextYear = startMonth === 11 ? startYear + 1 : startYear;

    return html`
      <div
        class="range-picker-wrapper${this.plumage ? " plumage" : ""}"
        role="region"
        aria-label="${this.ariaLabel || "Date Range Picker"}"
      >
        <div class="range-picker-nav mb-1" aria-label="Navigation Controls">
          <button
            @click=${this.prevMonth}
            class="range-picker-nav-btn btn-outline-secondary"
            aria-label="Previous Month"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path
                d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c-12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
              />
            </svg>
          </button>
          <div class="selectors">
            ${this.plumage ? this.renderPlumageSelects() : this.renderSelects()}

            <button
              @click=${() =>
                this.dispatchEvent(
                  new CustomEvent("reset-picker", {
                    bubbles: true,
                    composed: true,
                  })
                )}
              class="reset-btn"
              aria-label="Reset Calendar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M48.5 224L40 224c-13.3 0-24-10.7-24-24L16 72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8L48.5 224z"
                />
              </svg>
            </button>
          </div>
          <button
            @click=${this.nextMonth}
            class="range-picker-nav-btn btn-outline-secondary"
            aria-label="Next Month"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path
                d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s-32.8-12.5 45.3 0l160 160z"
              />
            </svg>
          </button>
        </div>
        <div class="range-picker">
          <div
            class="calendar-wrapper"
            role="application"
            aria-label="Calendars"
          >
            ${this.renderCalendar(startMonth, startYear)}
            ${this.renderCalendar(nextMonth, nextYear)}
          </div>
          <footer class="border-top small text-center">
            <div class="small" aria-live="polite">
              Use cursor keys to navigate calendar dates
            </div>
          </footer>
          <div
            class="date-range-display"
            role="region"
            aria-labelledby="date-ranges"
            tabindex="0"
          >
            <div id="date-ranges" class="date-ranges">
              <span class="start-end-ranges"
                ><span class="start-date">N/A</span>
                <span class="to-spacing">to</span
                ><span class="end-date">N/A</span></span
              >
            </div>
          </div>
        </div>

        <div class="ok-button">
          <button
            @click="${this._handleOkClick}"
            class="btn btn-primary"
            ?disabled="${this.okButtonDisabled}"
          >
            OK
          </button>
        </div>
      </div>
    `;
  }

  renderDropdown() {
    return html`
      <div class="dropdown ${this.dropdownOpen ? "open" : ""}">
        <div
          class="dropdown-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="datepicker-desc"
          @click="${(e) => e.stopPropagation()}"
        >
          ${this.renderDateRangePicker()}
        </div>
      </div>
    `;
  }

  renderInputGroup() {
    return html`
      <div class=${ifDefined(this.formLayout ? this.formLayout : undefined)}>
        <div
          class="form-group form-input-group-basic ${this.formLayout} ${this
            .formLayout === "horizontal" || this.formLayout === "inline"
            ? " row"
            : ""}"
        >
          <label
            class="form-control-label${this.required ? " required" : ""}${this
              .labelHidden
              ? " sr-only"
              : ""}${this.formLayout === "horizontal"
              ? " col-md-2 no-padding"
              : ""}${this.validation ? " invalid" : ""}"
            for=${ifDefined(this.inputId ? this.inputId : undefined)}
            aria-hidden="true"
            >${this.formLayout === "horizontal" || this.formLayout === "inline"
              ? `${this.label}:`
              : `${this.label}`}</label
          >
          <div
            class=${ifDefined(
              this.formLayout === "horizontal"
                ? "col-md-10 no-padding"
                : undefined
            )}
          >
            <div
              class="pl-input-group${this.size === "sm"
                ? " pl-input-group-sm"
                : this.size === "lg"
                ? " pl-input-group-lg"
                : ""}"
              role="group"
              aria-label="Date Picker Group"
            >
              ${this.prepend
                ? html`<div
                    class="pl-input-group-prepend${this.validation
                      ? " is-invalid"
                      : ""}"
                  >
                    <button
                      @click=${this.toggleDropdown}
                      class="calendar-button pl-btn pl-input-group-text"
                      aria-label="Toggle Calendar Picker"
                      aria-haspopup="dialog"
                      aria-expanded=${this.dropdownOpen ? "true" : "false"}
                      ?disabled=${this.disabled}
                    >
                      <i class="${this.icon}"></i>
                    </button>
                  </div>`
                : ""}

              <input
                id="${this.inputId}"
                type="text"
                class="form-control${this.validation ? " is-invalid" : ""}"
                placeholder="${this.dateFormat} ${this.joinBy} ${this
                  .dateFormat}"
                value="${this.selectedStartDate && this.selectedEndDate
                  ? `${this.selectedStartDate} ${this.joinBy} ${this.selectedEndDate}`
                  : ""}"
                @input=${this.handleInputChange}
                ?disabled=${this.disabled}
                aria-label="Selected Date"
                aria-describedby="datepicker-desc"
              />

              ${this.append
                ? html`<div
                    class="pl-input-group-append${this.validation
                      ? " is-invalid"
                      : ""}"
                  >
                    <button
                      @click=${this.toggleDropdown}
                      class="calendar-button pl-btn pl-input-group-text"
                      aria-label="Toggle Calendar Picker"
                      aria-haspopup="dialog"
                      aria-expanded=${this.dropdownOpen ? "true" : "false"}
                      ?disabled=${this.disabled}
                    >
                      <i class="${this.icon}"></i>
                    </button>
                  </div>`
                : ""}
            </div>
            ${this.validation
              ? html`
                  ${this.warningMessage
                    ? html`<div class="invalid-feedback warning">
                        ${this.warningMessage}
                      </div>`
                    : html`<div class="invalid-feedback validation">
                        ${this.validationMessage}
                      </div>`}
                `
              : ""}
          </div>
        </div>
      </div>
    `;
  }

  renderPlInputGroup() {
    return html`
      <div class="plumage${this.formLayout ? ` ${this.formLayout}` : ""}">
        <div
          class="form-group form-pl-input-group${this.formLayout ===
          "horizontal"
            ? ` row`
            : this.formLayout === "inline"
            ? ` row inline`
            : ""}"
        >
          <label
            class="form-control-label${this.required ? " required" : ""}${this
              .labelHidden
              ? " sr-only"
              : ""}${this.formLayout === "horizontal"
              ? " col-md-2 no-padding"
              : ""}${this.validation ? " invalid" : ""}"
            for="${this.inputId}"
            aria-hidden="true"
            >${this.formLayout === "horizontal" || this.formLayout === "inline"
              ? html`${this.label}:`
              : html`${this.label}`}
          </label>

          <div
            class=${ifDefined(
              this.formLayout === "horizontal"
                ? "col-md-10 no-padding"
                : undefined
            )}
          ></div>

          <div
            class="pl-input-group${this.size === "sm"
              ? " pl-input-group-sm"
              : this.size === "lg"
              ? " pl-input-group-lg"
              : ""}${this.disabled ? " disabled" : ""}"
            role="group"
            aria-label="Date Picker Group"
          >
            ${this.prepend
              ? html`<div
                  class="pl-input-group-prepend${this.validation
                    ? " is-invalid"
                    : ""}"
                >
                  <button
                    @click=${this.toggleDropdown}
                    class="calendar-button pl-btn pl-input-group-text"
                    aria-label="Toggle Calendar Picker"
                    aria-haspopup="dialog"
                    aria-expanded=${this.dropdownOpen ? "true" : "false"}
                    ?disabled=${this.disabled}
                  >
                    <i class="${this.icon}"></i>
                  </button>
                </div>`
              : ""}

            <input
              id="${this.inputId}"
              type="text"
              class="form-control${this.validation ? " is-invalid" : ""}"
              placeholder=${this.selectedPicker === "daterange"
                ? `${this.dateFormat} ${this.joinBy} ${this.dateFormat}`
                : this.selectedPicker === "daterangetime"
                ? `${this.dateFormat} HH:MM ${this.joinBy} ${this.dateFormat} HH:MM`
                : this.dateFormat}
              value=${this.selectedPicker === "datepicker"
                ? this.selectedDate
                : this.selectedPicker === "daterange"
                ? this.selectedStartDate && this.selectedEndDate
                  ? `${this.selectedStartDate} ${this.joinBy} ${this.selectedEndDate}`
                  : ""
                : this.selectedPicker === "daterangetime"
                ? this.selectedStartDate &&
                  this.selectedEndDate &&
                  this.startTime &&
                  this.endTime
                  ? `${this.selectedStartDate} ${this.startTime} ${
                      this.joinBy
                    } ${this.selectedEndDate} ${this.endTime} ${
                      this.showDuration && this.duration
                        ? `(${this.duration})`
                        : ""
                    }`
                  : ""
                : ""}
              @focus="${this.handleInteraction}"
              @blur="${this.handleDocumentClick}"
              @input=${this.handleInputChange}
              name="selectedDate"
              aria-label="Selected Date"
              aria-describedby="datepicker-desc"
              aria-describedby=${ifDefined(
                this.validation ? "validationMessage" : undefined
              )}
              ?disabled=${this.disabled}
            />

            ${this.append
              ? html`<div
                  class="pl-input-group-append${this.validation
                    ? " is-invalid"
                    : ""}"
                >
                  <button
                    @click=${this.toggleDropdown}
                    class="calendar-button pl-btn pl-input-group-text"
                    aria-label="Toggle Calendar Picker"
                    aria-haspopup="dialog"
                    aria-expanded=${this.dropdownOpen ? "true" : "false"}
                    ?disabled=${this.disabled}
                  >
                    <i class="${this.icon}"></i>
                  </button>
                </div>`
              : ""}

            <div
              class="b-underline${this.validation ? " invalid" : ""}"
              role="presentation"
            >
              <div
                class="b-focus${this.disabled ? " disabled" : ""}${this
                  .validation
                  ? " invalid"
                  : ""}"
                role="presentation"
                aria-hidden="true"
              ></div>
            </div>
          </div>
          ${this.validation
            ? html`
                ${this.warningMessage
                  ? html`<div class="invalid-feedback warning">
                      ${this.warningMessage}
                    </div>`
                  : html`<div class="invalid-feedback validation">
                      ${this.validationMessage}
                    </div>`}
              `
            : ""}
        </div>
      </div>
    `;
  }

  renderInputs() {
    return html`
      <div class="dropdown-wrapper">
        ${this.plumage ? this.renderPlInputGroup() : this.renderInputGroup()}
        ${this.renderDropdown()}
      </div>
    `;
  }

  render() {
    return this.rangePicker
      ? this.renderDateRangePicker()
      : this.renderInputs();
  }
}

customElements.define("date-range-picker-new", DateRangePickerNew);
