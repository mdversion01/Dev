import { LitElement, html, css } from "lit";
import Fontawesome from "lit-fontawesome";
import { ifDefined } from "lit/directives/if-defined.js";
import { formStyles } from "../form-styles.js";
import { inputFieldStyles } from "../input-field/input-field-styles";
import { inputGroupStyles } from "../input-group/input-group-styles.js";
import { plInputGroupStyles } from "../pl-input-group/pl-input-group-styles.js";
import { buttonStyles } from "../button/button-styles";
import { datepickerStyles } from "./datepicker-styles";
import { createPopper } from "@popperjs/core";

class DatePickerNew extends LitElement {
  static styles = [
    Fontawesome,
    formStyles,
    buttonStyles,
    inputFieldStyles,
    inputGroupStyles,
    plInputGroupStyles,
    datepickerStyles,
    css`
      footer .small {
        font-size: 80%;
      }
    `,
  ];

  static get properties() {
    return {
      selectedDate: { type: Object },
      selectedMonth: { type: Number },
      selectedYear: { type: Number },
      previousSelectedDayElement: { type: Object },
      currentSelectedDate: { type: Object },
      shouldClearSelectedDate: { type: Boolean },
      isCalendarFocused: { type: Boolean },
      currentMonth: { type: Number },
      currentYear: { type: Number },
      displayContextExamples: { type: Boolean },
      dateFormat: { type: String }, // Property for date format
      plumage: { type: Boolean },

      dropdownOpen: { type: Boolean },
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
      calendar: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.selectedDate = null;
    this.selectedMonth = null;
    this.selectedYear = null;
    this.previousSelectedDayElement = null;
    this.currentSelectedDate = new Date();
    this.shouldClearSelectedDate = false;
    this.isCalendarFocused = false;
    this.currentMonth = this.currentSelectedDate.getMonth();
    this.currentYear = this.currentSelectedDate.getFullYear();
    this.displayContextExamples = false;
    this.dateFormat = "YYYY-MM-DD"; // Default to YYYY-MM-DD format
    this.plumage = false;
    this.addEventListener("reset-picker", this.resetCalendar);
    this.addEventListener("update-calendar", this.handleUpdateCalendar); // Listen for updates

    this.dropdownOpen = false;
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
    this.calendar = false;

    // Bind handleOutsideClick once to maintain the same reference
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("update-calendar", this.updateCalendarWithDate);

    this.addEventListener("keydown", this.handleKeyDown);

    // document.addEventListener("click", this.handleDocumentClick);
    // this.append = this.getAttribute("append") !== "false";
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("update-calendar", this.updateCalendarWithDate);
    this.removeEventListener("keydown", this.handleKeyDown);

    document.removeEventListener("click", this.handleOutsideClick);
    // document.removeEventListener("click", this.handleDocumentClick);
  }

  firstUpdated() {
    this.renderCalendar(this.currentMonth, this.currentYear);
    this.updateSelectedDateDisplay("No date selected");

    if (this.displayContextExamples) {
      this.updateInitialContext();
    }

    this.inputElement = this.shadowRoot.querySelector(".form-control");

    // Attach the input blur event handler to trigger calendar update when typing is done
    this.inputElement.addEventListener("blur", this.handleInputBlur.bind(this));

    // Retain the keydown event handler for backspace, arrow keys, etc.
    this.inputElement.addEventListener(
      "keydown",
      this.handleKeyDown.bind(this)
    );

    document.addEventListener("click", this.handleOutsideClick);
    document.removeEventListener("click", this.handleDocumentClick);
    // Ensure the warning message is displayed when the page is loaded
    this.setDefaultWarningMessage(); // Call it here to ensure correct initial message
    this.requestUpdate();
  }

  // Method to handle updating the calendar with the typed date
  updateCalendarWithDate(event) {
    const { date } = event.detail;

    // Update the current month and year to match the typed date
    this.currentMonth = date.getUTCMonth();
    this.currentYear = date.getUTCFullYear();

    // Update the selected date
    this.selectedDate = new Date(
      Date.UTC(this.currentYear, this.currentMonth, date.getUTCDate())
    );

    // Re-render the calendar with the updated month and year
    this.renderCalendar(this.currentMonth, this.currentYear);

    // Set the active state on the selected date
    this.setActiveState();
  }

  resetCalendar(event) {
    const today = new Date();

    // Clear the selected date
    this.selectedDate = null;

    // Clear the active state and reset the calendar view
    this.clearActiveState();

    // Reset the selected date display to "No date selected"
    this.updateSelectedDateDisplay("No date selected");

    // Optionally, you can reset the focus to today's date
    this.currentDate();
  }

  handleOutsideClick(event) {
    // Ensure that shadowRoot and dropdown are available
    if (!this.shadowRoot) return;

    const dropdown = this.shadowRoot.querySelector(".dropdown");

    // Check if the click was outside the dropdown
    if (!this.preventClose && dropdown && !dropdown.contains(event.target)) {
      this.dropdownOpen = false;
      this.destroyPopper();
      document.removeEventListener("click", this.handleOutsideClick); // Remove listener on close
    }

    this.preventClose = false; // Reset preventClose after handling
  }

  toggleDropdown(event) {
    this.preventClose = true; // Prevent immediate close when toggling

    // Toggle the dropdown state
    this.dropdownOpen = !this.dropdownOpen;

    if (this.dropdownOpen) {
      const inputValue = this.inputElement.value.trim();

      // If input is empty, reset to today's date
      if (!inputValue) {
        this.clearInputField(); // Reset the input field and calendar
      } else {
        // If there's a valid date in the input, parse and update the calendar
        const parsedDate = this.parseDate(inputValue);

        if (parsedDate) {
          this.updateCalendarWithParsedDate(parsedDate); // Sync calendar with input
        } else {
          // If the input date is invalid, clear and reset
          this.clearInputField();
        }
      }

      this.createPopperInstance(); // Open the dropdown and create the popper
      document.addEventListener("click", this.handleOutsideClick); // Attach listener to document
    } else {
      this.destroyPopper(); // Close the dropdown
      document.removeEventListener("click", this.handleOutsideClick); // Remove listener from document
    }
  }

  createPopperInstance() {
    const dropdown = this.shadowRoot.querySelector(".dropdown");
    this.popperInstance = createPopper(this.inputElement, dropdown, {
      placement: "bottom-start",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 2],
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

  destroyPopper() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
  }

  handleInputChange(event) {
    const inputValue = event.target.value.trim();

    // Update the input field with the current value
    this.updateInputField(inputValue);

    // If the input is cleared (Backspace or manual delete)
    if (inputValue === "") {
      this.clearInputField(); // Call the clear function to reset everything
      return;
    }

    // Perform validation on the current input
    this.validateInput(inputValue);
  }

  handleInputBlur(event) {
    const inputValue = event.target.value.trim();

    // If the input is empty, clear the input and reset calendar
    if (inputValue === "") {
      this.clearInputField(); // Reset the input field and calendar
      this.validation = false; // Disable any validation error
      this.validationMessage = ""; // Clear any validation message
      this.requestUpdate(); // Re-render UI without any validation
      return;
    }

    // Parse the input date based on the current date format
    const parsedDate = this.parseDate(inputValue);

    if (parsedDate) {
      // If valid, update the calendar and input field
      this.updateCalendarWithParsedDate(parsedDate);
    } else {
      // If invalid, show validation error but DO NOT show "Invalid Date" in input
      this.validation = true;
      this.validationMessage = `Invalid date format. Please use ${this.dateFormat}.`;
      this.requestUpdate();
    }
  }

  parseDate(input) {
    // Determine the current date format
    if (this.dateFormat === "YYYY-MM-DD") {
      const partsYMD = input.split("-");
      if (partsYMD.length === 3) {
        const year = parseInt(partsYMD[0], 10);
        const month = parseInt(partsYMD[1], 10) - 1; // Months are 0-based
        const day = parseInt(partsYMD[2], 10);

        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
          return new Date(year, month, day);
        }
      }
    } else if (this.dateFormat === "MM-DD-YYYY") {
      const partsMDY = input.split("-");
      if (partsMDY.length === 3) {
        const month = parseInt(partsMDY[0], 10) - 1; // Months are 0-based
        const day = parseInt(partsMDY[1], 10);
        const year = parseInt(partsMDY[2], 10);

        if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
          return new Date(year, month, day);
        }
      }
    }

    return null; // Return null if the input doesn't match the expected format
  }

//   formatDate(date) {
//     if (this.dateFormat === "MM-DD-YYYY") {
//       return this.formatDateMdy(date); // Format as MM-DD-YYYY
//     }
//     return this.formatDateYmd(date); // Default to YYYY-MM-DD
//   }

  handleDateSelect(event) {
    const selectedDay = event.target.dataset.day;
    this.selectedDate = new Date(
      this.currentYear,
      this.currentMonth,
      selectedDay
    );

    // Format based on the dateFormat property
    const formattedDate = this.formatDate(this.selectedDate);

    // Update the input field with the formatted date
    this.updateInputField(formattedDate);

    // Update the display of the selected date
    this.updateSelectedDateDisplay(formattedDate);

    this.toggleDropdown(); // Close dropdown after selection
  }

  renderDatePicker() {
    return html`
      <div class="dp-single-calendar${this.plumage ? " plumage" : ""}">
        <div
          class="calendar-inner"
          dir="ltr"
          lang="en-US"
          role="group"
          aria-describedby="calendar-wrapper"
        >
          <header class="datepicker" title="Selected Date">
            <output
              aria-live="polite"
              aria-atomic="true"
              class="selected-date form-control form-control-sm text-center"
              id="selected-date"
              role="status"
              tabindex="-1"
            >
              <bdi>No date selected</bdi>
              <bdi class="sr-only">(Selected date)</bdi>
            </output>
          </header>
          <div
            class="calendar-nav d-flex"
            aria-label="Calendar Navigation"
            role="group"
            aria-labelledby="calendar-navigation"
          >
            <span id="calendar-navigation" class="sr-only"
              >Calendar Navigation</span
            >
            <button
              aria-label="Previous year"
              aria-keyshortcuts="Alt+PageDown"
              class="prev-year btn btn-sm border-0 flex-fill btn-outline-secondary"
              title="Previous year"
              type="button"
              @click=${this.prevYear}
            >
              <i class="fas fa-angle-double-left" aria-hidden="true"></i>
            </button>
            <button
              aria-label="Previous month"
              aria-keyshortcuts="PageDown"
              class="prev-month btn btn-sm border-0 flex-fill btn-outline-secondary"
              title="Previous month"
              type="button"
              @click=${this.prevMonth}
            >
              <i class="fas fa-angle-left" aria-hidden="true"></i>
            </button>
            <button
              aria-label="Current Day/Month/Year"
              aria-keyshortcuts="Home"
              class="current-date btn btn-sm border-0 flex-fill btn-outline-secondary"
              title="Current Day/Month/Year"
              type="button"
              @click=${this.currentDate}
            >
              <i class="fas fa-circle" aria-hidden="true"></i>
              <span class="sr-only">Today</span>
            </button>
            <button
              aria-label="Next month"
              aria-keyshortcuts="PageUp"
              class="next-month btn btn-sm border-0 flex-fill btn-outline-secondary"
              title="Next month"
              type="button"
              @click=${this.nextMonth}
            >
              <i class="fas fa-angle-right" aria-hidden="true"></i>
            </button>
            <button
              title="Next year"
              type="button"
              class="next-year btn btn-sm border-0 flex-fill btn-outline-secondary"
              aria-label="Next year"
              aria-keyshortcuts="Alt+PageUp"
              @click=${this.nextYear}
            >
              <i class="fas fa-angle-double-right" aria-hidden="true"></i>
            </button>
          </div>
          <div
            aria-describedby="calendar-grid"
            aria-labelledby="calendar-grid-caption"
            aria-roledescription="Calendar"
            class="calendar form-control h-auto text-center pt-2"
            role="region"
            aria-label="Calendar"
            tabindex="0"
            @focus=${this.handleCalendarFocus}
            @focusout=${this.handleCalendarFocusOut}
          >
            <div
              aria-live="polite"
              aria-atomic="true"
              class="calendar-grid-caption text-center font-weight-bold"
              id="__CDID__calendar-grid-caption_"
            ></div>
            <div aria-hidden="true" class="calendar-grid-weekdays">
              <small
                aria-label="Sunday"
                title="Sunday"
                class="calendar-grid-day col${this.plumage
                  ? " text-truncate"
                  : ""}"
                >Sun</small
              >
              <small
                aria-label="Monday"
                title="Monday"
                class="calendar-grid-day col${this.plumage
                  ? " text-truncate"
                  : ""}"
                >Mon</small
              >
              <small
                aria-label="Tuesday"
                title="Tuesday"
                class="calendar-grid-day col${this.plumage
                  ? " text-truncate"
                  : ""}"
                >Tue</small
              >
              <small
                aria-label="Wednesday"
                title="Wednesday"
                class="calendar-grid-day col${this.plumage
                  ? " text-truncate"
                  : ""}"
                >Wed</small
              >
              <small
                aria-label="Thursday"
                title="Thursday"
                class="calendar-grid-day col${this.plumage
                  ? " text-truncate"
                  : ""}"
                >Thu</small
              >
              <small
                aria-label="Friday"
                title="Friday"
                class="calendar-grid-day col${this.plumage
                  ? " text-truncate"
                  : ""}"
                >Fri</small
              >
              <small
                aria-label="Saturday"
                title="Saturday"
                class="calendar-grid-day col${this.plumage
                  ? " text-truncate"
                  : ""}"
                >Sat</small
              >
            </div>
            <div class="calendar-grid" id="calendar-grid"></div>
            <footer class="border-top small text-muted text-center bg-light">
              <div class="small">
                Use cursor keys to navigate calendar dates
              </div>
            </footer>
          </div>
        </div>
      </div>
      ${this.displayContextExamples
        ? html` <div
            class="context"
            role="region"
            aria-labelledby="context-title"
            tabindex="0"
          >
            <div id="context-title">Context:</div>
            <div>
              selectedYMD: "<span class="selected-date-Ymd"
                >Date not selected</span
              >"
            </div>
            <div>
              selectedMDY: "<span class="selected-date-Mdy"
                >Date not selected</span
              >"
            </div>
            <div>
              selectedFormatted: "<span class="selected-formatted-date"
                >Date not selected</span
              >"
            </div>
            <div>
              selectedIsoFormatted: "<span class="selected-formatted-iso"
                >Date not selected</span
              >"
            </div>
            <div>activeYMD: "<span class="active-date-ymd"></span>"</div>
            <div>activeMDY: "<span class="active-date-mdy"></span>"</div>
            <div>
              activeFormatted: "<span class="active-formatted-date-long"></span
              >"
            </div>
            <div>
              activeIsoFormatted: "<span class="active-formatted-iso"></span>"
            </div>
          </div>`
        : ""}
    `;
  }

  updateSelectedDateDisplay(formattedDate) {
    const selectedDateDisplay =
      this.shadowRoot.querySelector(".selected-date bdi");
    selectedDateDisplay.textContent = formattedDate;
  }

  updateSelectedDateElements(formattedDate) {
    if (!this.displayContextExamples) {
      return; // Do nothing if context examples are not displayed
    }

    const date = new Date(`${formattedDate}T00:00:00Z`);
    const selectedDateYmd = this.formatDateYmd(date);
    const selectedDateMdy = this.formatDateMdy(date);
    const selectedFormatted = this.formatDateLong(date);
    const selectedIsoFormatted = this.formatISODate(date);

    const selectedDateDisplayYmd =
      this.shadowRoot.querySelector(".selected-date-Ymd");
    const selectedDateDisplayMdy =
      this.shadowRoot.querySelector(".selected-date-Mdy");
    const selectedDateDisplayFull = this.shadowRoot.querySelector(
      ".selected-formatted-date"
    );
    const selectedDateDisplayIso = this.shadowRoot.querySelector(
      ".selected-formatted-iso"
    );

    if (selectedDateDisplayYmd) {
      selectedDateDisplayYmd.textContent = selectedDateYmd;
    } else {
      console.warn("Element with class .selected-date-Ymd not found.");
    }

    if (selectedDateDisplayMdy) {
      selectedDateDisplayMdy.textContent = selectedDateMdy;
    } else {
      console.warn("Element with class .selected-date-Myd not found.");
    }

    if (selectedDateDisplayFull) {
      selectedDateDisplayFull.textContent = selectedFormatted;
    } else {
      console.warn("Element with class .selected-formatted-date not found.");
    }

    if (selectedDateDisplayIso) {
      selectedDateDisplayIso.textContent = selectedIsoFormatted;
    } else {
      console.warn("Element with class .selected-formatted-iso not found.");
    }

    this.updateSelectedDateDisplay(selectedFormatted);
  }

  updateActiveDateElements() {
    if (!this.displayContextExamples) {
      return; // Do nothing if context examples are not displayed
    }

    const focusedSpan = this.shadowRoot.querySelector(
      ".calendar-grid-item span.focus"
    );
    const activeDateYMD = this.shadowRoot.querySelector(".active-date-ymd");

    const activeDateMDY = this.shadowRoot.querySelector(".active-date-mdy");

    const activeLongDate = this.shadowRoot.querySelector(
      ".active-formatted-date-long"
    );
    const activeIsoDate = this.shadowRoot.querySelector(
      ".active-formatted-iso"
    );

    if (!activeDateYMD || !activeDateMDY || !activeLongDate || !activeIsoDate) {
      console.error("One or more active date elements are missing");
      return;
    }

    if (focusedSpan) {
      const dataDate = focusedSpan.parentElement.getAttribute("data-date");
      const date = new Date(`${dataDate}T00:00:00Z`);
      activeDateYMD.textContent = dataDate;
      activeDateMDY.textContent = dataDate;
      activeLongDate.textContent = this.formatDateLong(date);
      activeIsoDate.textContent = this.formatISODate(date);
    } else {
      activeDateYMD.textContent = "Date not selected";
      activeDateMDY.textContent = "Date not selected";
      activeLongDate.textContent = "Date not selected";
      activeIsoDate.textContent = "Date not selected";
    }
  }

  // Add a helper method to map the dateFormat to the correct function
  getDateFormatMethod(format) {
    switch (format) {
      case "YYYY-MM-DD":
        return this.formatDateYmd;
      case "MM-DD-YYYY":
        return this.formatDateMdy;
      default:
        console.warn(`Unknown date format: ${format}. Using default.`);
        return this.formatDateYmd; // Default to YYYY-MM-DD
    }
  }

  handleDayClick(event) {
    const clickedSpan = event.target;
    const dayContainer = clickedSpan.parentElement;

    const isPreviousMonthDay =
        dayContainer.classList.contains("previous-month-day");
    const isNextMonthDay = dayContainer.classList.contains("next-month-day");
    const isActive = clickedSpan.classList.contains("active");

    // Clear the active state only if the clicked day is not already active
    if (!isActive) {
        this.clearActiveState(); // Ensure other active states are cleared

        // Add active state to the clicked day
        clickedSpan.classList.add("active", "btn-primary", "focus");

        // Add aria-label for accessibility to show the selected state
        const selectedDateElement = this.shadowRoot.getElementById(
            `cell-${dayContainer.dataset.date}`
        );
        if (selectedDateElement) {
            const existingAriaLabel = selectedDateElement.getAttribute("aria-label");
            selectedDateElement.setAttribute(
                "aria-label",
                `${existingAriaLabel} (Selected)`
            );
            selectedDateElement.setAttribute("aria-selected", "true");
            selectedDateElement.setAttribute("aria-current", "date");
        }

        // Update selected date properties
        this.selectedMonth = parseInt(dayContainer.dataset.month);
        this.selectedYear = parseInt(dayContainer.dataset.year);
        const selectedDay = parseInt(clickedSpan.textContent);

        // Use local time instead of UTC to avoid timezone issues
        this.selectedDate = new Date(
            this.selectedYear,
            this.selectedMonth - 1,
            selectedDay
        );

        // Get the method to format the date according to the selected format
        const formatMethod = this.getDateFormatMethod(this.dateFormat);
        const formattedSelectedDate = formatMethod.call(this, this.selectedDate);

        // Update the input field with the formatted selected date
        this.updateInputField(formattedSelectedDate);

        // Update other related components, including the header
        this.updateSelectedDateDisplay(formattedSelectedDate);
        this.updateActiveDateElements();

        // Update the selected date in the context and ensure the calendar is focused
        this.currentSelectedDate = new Date(
            this.selectedYear,
            this.selectedMonth - 1,
            selectedDay
        );

        this.updateSelectedDateElements(formattedSelectedDate);
        this.shadowRoot.querySelector(".calendar").classList.add("focus");
        this.isCalendarFocused = true;

        // Update aria-activedescendant for accessibility
        const formattedDate = `${this.selectedDate.getFullYear()}-${(
            this.selectedDate.getMonth() + 1
        )
            .toString()
            .padStart(2, "0")}-${this.selectedDate
            .getDate()
            .toString()
            .padStart(2, "0")}`;
        this.shadowRoot
            .querySelector(".calendar")
            .setAttribute("aria-activedescendant", `cell-${formattedDate}`);

        // Dispatch the date-selected event with the formatted date
        this.dispatchEvent(
            new CustomEvent("date-selected", {
                detail: { formattedDate: formattedSelectedDate },
                bubbles: true,
                composed: true,
            })
        );
    }

    // Do not allow toggling off the selected day
    if (isActive) {
        return; // Prevent removing the active state when clicking the same day
    }

    // Handle previous/next month date selections
    if (isPreviousMonthDay) {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
    } else if (isNextMonthDay) {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
    }

    this.selectedMonth = parseInt(dayContainer.dataset.month);
    this.selectedYear = parseInt(dayContainer.dataset.year);
    const selectedDay = parseInt(clickedSpan.textContent);

    // Use local time instead of UTC to avoid timezone issues
    this.selectedDate = new Date(
        this.selectedYear,
        this.selectedMonth - 1,
        selectedDay
    );

    this.renderCalendar(this.currentMonth, this.currentYear);

    const formattedDate = `${this.selectedDate.getFullYear()}-${(
        this.selectedDate.getMonth() + 1
    )
        .toString()
        .padStart(2, "0")}-${this.selectedDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;
    this.shadowRoot
        .querySelector(".calendar")
        .setAttribute("aria-activedescendant", `cell-${formattedDate}`);

    const newFocusCell = this.shadowRoot.querySelector(
        `.calendar-grid-item[data-date="${formattedDate}"]`
    );
    if (newFocusCell) {
        newFocusCell.focus();
        this.shadowRoot
            .querySelector(".calendar")
            .setAttribute("aria-activedescendant", newFocusCell.id);
    }

    this.setActiveState();
    this.updateSelectedDateElements(formattedDate);
    this.updateActiveDateElements();

    // Ensure the focus remains on the selected day
    setTimeout(() => {
        newFocusCell?.querySelector("span")?.focus();
    }, 0);

    this.setActiveState();
}


  // Add a helper method to update the input field
  updateInputField(formattedDate) {
    const inputField = this.shadowRoot.querySelector("input.form-control");
    if (inputField) {
      inputField.value = formattedDate;
    }
  }

  handleEnterKeyPress(event) {
    event.stopPropagation();

    const focusedSpan = this.shadowRoot.querySelector(
      ".calendar-grid-item span.focus"
    );
    if (focusedSpan) {
      const dayContainer = focusedSpan.parentElement;

      const isPreviousMonthDay =
        dayContainer.classList.contains("previous-month-day");
      const isNextMonthDay = dayContainer.classList.contains("next-month-day");

      const isActive = focusedSpan.classList.contains("active");

      if (isActive && !isPreviousMonthDay && !isNextMonthDay) {
        return; // Do nothing if the active day is pressed again
      } else {
        this.handleDayClick({ target: focusedSpan });
      }
    }
  }

  handleDateNavigation(event, direction) {
    const focusedElement = this.shadowRoot.activeElement;

    if (focusedElement.classList.contains("calendar-grid-item")) {
      let calendarCells = this.shadowRoot.querySelectorAll(
        ".calendar-grid-item"
      );
      const currentIndex = Array.from(calendarCells).indexOf(focusedElement);

      if (currentIndex !== -1) {
        let newIndex =
          direction === "next" ? currentIndex + 1 : currentIndex - 1;

        if (direction === "up" && currentIndex < 7) {
          // Move to the previous month and set focus on the correct day
          this.prevMonth();
          const daysInPrevMonth = new Date(
            this.currentYear,
            this.currentMonth + 1,
            0
          ).getUTCDate();
          newIndex = daysInPrevMonth - (7 - currentIndex);
          calendarCells = this.shadowRoot.querySelectorAll(
            ".calendar-grid-item"
          );
        } else if (
          direction === "down" &&
          currentIndex >= calendarCells.length - 7
        ) {
          // Move to the next month and set focus on the correct day
          this.nextMonth();
          newIndex = currentIndex % 7;
          calendarCells = this.shadowRoot.querySelectorAll(
            ".calendar-grid-item"
          );
        }

        const targetCell = calendarCells[newIndex];
        const targetSpan = targetCell.querySelector("span");

        const previousFocusedSpan = this.shadowRoot.querySelector(
          ".calendar-grid-item span.focus"
        );
        if (previousFocusedSpan) {
          previousFocusedSpan.classList.remove("focus");
        }

        targetSpan.classList.add("focus");

        targetCell.focus();
        this.updateActiveDateElements();
      }
    }
  }

  clearActiveState() {
    const allSpans = this.shadowRoot.querySelectorAll(
      ".calendar-grid-item span"
    );
    allSpans.forEach((span) => {
      span.classList.remove("active", "btn-primary", "focus");
      span.classList.add("btn-outline-light", "text-dark");

      const dateElement = this.shadowRoot.getElementById(
        `cell-${span.parentElement.dataset.date}`
      );
      if (dateElement) {
        const existingAriaLabel = dateElement.getAttribute("aria-label");
        if (existingAriaLabel.endsWith(" (Selected)")) {
          dateElement.setAttribute(
            "aria-label",
            existingAriaLabel.slice(0, -11)
          );
          dateElement.removeAttribute("aria-selected");
          dateElement.removeAttribute("aria-current");
        }
      }
    });
  }

  setActiveState() {
    const activeSpan = this.shadowRoot.querySelector(".active");
    if (activeSpan) {
      activeSpan.classList.remove("active", "btn-primary", "focus");
      activeSpan.classList.add("btn-outline-light", "text-dark");
    }

    if (this.selectedDate) {
      const selectedDateElement = this.shadowRoot.getElementById(
        `cell-${this.selectedDate.getUTCFullYear()}-${(
          this.selectedDate.getUTCMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${this.selectedDate
          .getUTCDate()
          .toString()
          .padStart(2, "0")}`
      );
      if (selectedDateElement) {
        const selectedSpan = selectedDateElement.querySelector("span");
        selectedSpan.classList.add("active", "btn-primary", "focus");
        selectedSpan.classList.remove("btn-outline-light", "text-dark");
      }
    }
  }

  renderCalendar(month0b, year) {
    const calendarGrid = this.shadowRoot.querySelector(".calendar-grid");
    calendarGrid.innerHTML = "";

    const displayMonth = month0b + 1;
    const previousMonthLastDate = new Date(
      Date.UTC(year, month0b, 0)
    ).getUTCDate();
    const firstDay = this.getFirstDayOfMonth(year, month0b);
    const daysInMonth = new Date(Date.UTC(year, month0b + 1, 0)).getUTCDate();
    const firstDayOfWeek = firstDay === 0 ? 0 : firstDay;
    let date = 1;
    const totalWeeks = Math.ceil((firstDayOfWeek + daysInMonth) / 7);

    const options = {
      year: "numeric",
      month: "long",
    };

    const formattedMonthYear = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
    }).format(new Date(year, month0b, 1));
    this.shadowRoot.querySelector(
      "#__CDID__calendar-grid-caption_"
    ).textContent = formattedMonthYear;

    for (let i = 0; i < totalWeeks; i++) {
      for (let j = 0; j < 7; j++) {
        const dayItem = document.createElement("div");
        dayItem.classList.add("calendar-grid-item");
        dayItem.setAttribute("role", "button");
        dayItem.setAttribute("tabindex", "-1"); // Disable tabbing

        const currentDate = new Date(Date.UTC(year, month0b, date));
        const today = new Date();
        dayItem.dataset.month = displayMonth;
        dayItem.dataset.year = currentDate.getUTCFullYear();
        dayItem.dataset.day = currentDate.getUTCDate();

        const dataDate = `${year}-${displayMonth
          .toString()
          .padStart(2, "0")}-${date.toString().padStart(2, "0")}`;
        dayItem.dataset.date = dataDate;
        dayItem.id = `cell-${dataDate}`;

        const isCurrentDay =
          today.getUTCDate() === date &&
          today.getUTCMonth() === month0b &&
          today.getUTCFullYear() === year;
        const isSelectedDay =
          this.selectedDate &&
          this.selectedDate.getUTCDate() === date &&
          this.selectedDate.getUTCMonth() === month0b &&
          this.selectedDate.getUTCFullYear() === year;

        const dayNumberSpan = document.createElement("span");
        dayNumberSpan.classList.add(
          "btn",
          "btn-outline-light",
          "border-0",
          "rounded-circle",
          "text-nowrap",
          "text-dark",
          "font-weight-bold"
        );

        if (i === 0 && j < firstDayOfWeek && firstDayOfWeek > 0) {
          const previousMonthDay =
            previousMonthLastDate - firstDayOfWeek + j + 1;
          dayNumberSpan.textContent = previousMonthDay;
          dayItem.classList.add("previous-month-day");
          dayNumberSpan.classList.add("text-muted");
          dayNumberSpan.classList.remove("text-dark", "font-weight-bold");

          const previousMonth = month0b === 0 ? 11 : month0b - 1;
          const previousYear = month0b === 0 ? year - 1 : year;
          dayItem.dataset.month = previousMonth + 1;
          dayItem.dataset.year = previousYear;
          dayItem.dataset.day = previousMonthDay;
          const previousMonthDataDate = `${
            dayItem.dataset.year
          }-${dayItem.dataset.month
            .toString()
            .padStart(2, "0")}-${dayItem.dataset.day
            .toString()
            .padStart(2, "0")}`;
          dayItem.dataset.date = previousMonthDataDate;
          dayItem.id = `cell-${previousMonthDataDate}`;
          const formattedDate = new Date(
            Date.UTC(
              dayItem.dataset.year,
              dayItem.dataset.month - 1,
              dayItem.dataset.day
            )
          ).toLocaleDateString("en-US", options);
          dayItem.setAttribute("aria-label", formattedDate);
        } else if (date <= daysInMonth) {
          dayNumberSpan.textContent = date;
          dayItem.dataset.month = displayMonth;
          dayItem.dataset.year = year;
          dayItem.dataset.day = date;

          const formattedDate = currentDate.toLocaleDateString(
            "en-US",
            options
          );

          if (isCurrentDay) {
            dayNumberSpan.classList.add("current-day");
            dayItem.setAttribute(
              "aria-label",
              this.formatDateForAriaLabel(formattedDate, true)
            );
          } else {
            dayItem.setAttribute("aria-label", formattedDate);
          }

          if (isSelectedDay) {
            dayNumberSpan.classList.add("active", "btn-primary", "focus");
            dayNumberSpan.classList.remove("btn-outline-light", "text-dark");
            const existingAriaLabel = dayItem.getAttribute("aria-label");
            dayItem.setAttribute(
              "aria-label",
              existingAriaLabel + " (Selected)"
            );
            this.updateSelectedDateDisplay(
              this.formatDate(year, displayMonth, date)
            );
            this.updateActiveDateElements();
          }

          date++;
        } else {
          const nextMonthDay = date - daysInMonth;
          dayNumberSpan.textContent = nextMonthDay;
          dayItem.classList.add("next-month-day");
          dayNumberSpan.classList.add("text-muted");
          dayNumberSpan.classList.remove("text-dark", "font-weight-bold");

          dayItem.dataset.month = (month0b === 11 ? 0 : month0b + 1) + 1;
          dayItem.dataset.year = month0b === 11 ? year + 1 : year;
          dayItem.dataset.day = nextMonthDay;
          const nextMonthDataDate = `${
            dayItem.dataset.year
          }-${dayItem.dataset.month
            .toString()
            .padStart(2, "0")}-${dayItem.dataset.day
            .toString()
            .padStart(2, "0")}`;
          dayItem.dataset.date = nextMonthDataDate;
          const formattedDate = new Date(
            Date.UTC(
              dayItem.dataset.year,
              dayItem.dataset.month - 1,
              dayItem.dataset.day
            )
          ).toLocaleDateString("en-US", options);
          dayItem.setAttribute("aria-label", formattedDate);
          dayItem.id = `cell-${nextMonthDataDate}`;
          date++;
        }

        dayItem.appendChild(dayNumberSpan);

        // Add the focus event listener to the calendar-grid-item
        dayItem.addEventListener("focus", (event) => {
          dayNumberSpan.classList.add("focus");
          this.shadowRoot.querySelector(".calendar").classList.add("focus");
        });

        // Add click and keydown event listeners
        dayNumberSpan.addEventListener("click", this.handleDayClick.bind(this));
        dayNumberSpan.addEventListener(
          "keydown",
          this.handleEnterKeyPress.bind(this)
        );
        calendarGrid.appendChild(dayItem);
      }
    }
    this.setActiveState();
  }

  handleCalendarFocus() {
    const firstCalendarGridItem = this.shadowRoot.querySelector(
      ".calendar-grid-item span"
    );
    if (firstCalendarGridItem) {
      firstCalendarGridItem.classList.add("focus");
      firstCalendarGridItem.parentElement.focus(); // Move focus to the parent element
      this.shadowRoot.querySelector(".calendar").classList.add("focus");
    }
  }

  handleCalendarFocusOut(event) {
    const calendarDiv = this.shadowRoot.querySelector(".calendar");
    // If the newly focused element is not within the calendar, remove all focus classes
    if (
      !this.shadowRoot.querySelector(".calendar").contains(event.relatedTarget)
    ) {
      const allFocusedItems = this.shadowRoot.querySelectorAll(
        ".calendar-grid-item span.focus"
      );
      allFocusedItems.forEach((span) => {
        span.classList.remove("focus");
        calendarDiv.classList.remove("focus");
      });
    }
  }

  getFirstDayOfMonth(year, month) {
    return new Date(Date.UTC(year, month, 1)).getUTCDay();
  }

  formatDate(dateOrYear, month = null, day = null) {
    // Check if the function is called with separate year, month, and day parameters
    if (month !== null && day !== null) {
        const options = {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
        };
        const selectedDate = new Date(Date.UTC(dateOrYear, month - 1, day));
        return selectedDate.toLocaleDateString(undefined, options); // Long format with weekday
    }

    // Assume the first argument is a Date object if month and day are not provided
    const date = dateOrYear instanceof Date ? dateOrYear : new Date(dateOrYear);

    // Format based on the current `dateFormat` property
    if (this.dateFormat === "MM-DD-YYYY") {
        return this.formatDateMdy(date); // Format as MM-DD-YYYY
    }
    return this.formatDateYmd(date); // Default to YYYY-MM-DD
}


  formatDateForAriaLabel(date, isCurrentDay = false) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    if (isNaN(date)) {
      console.error("Invalid date provided to formatDateForAriaLabel");
      return "Invalid Date";
    }

    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    };
    const formattedDate = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    ).toLocaleDateString("en-US", options);

    return isCurrentDay ? `${formattedDate} (Today)` : formattedDate;
  }

  formatDateYmd(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // YYYY-MM-DD format
}

formatDateMdy(date) {
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${month}-${day}-${year}`; // MM-DD-YYYY format
}

  formatDateLong(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };
    return date.toLocaleDateString("en-US", options);
  }

  formatISODate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toISOString();
  }

  validateInput(value) {
    if (!value) {
      // If the input is empty, clear validation and warnings, do not show any message
      this.validation = false;
      this.validationMessage = "";
      this.warningMessage = "";
      this.requestUpdate();
      return;
    }

    // Patterns for both supported formats
    const datePickerPatternYMD = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
    const datePickerPatternMDY = /^\d{2}-\d{2}-\d{4}$/; // MM-DD-YYYY

    // Determine the current format
    const isYMDFormat = this.dateFormat === "YYYY-MM-DD";
    const isMDYFormat = this.dateFormat === "MM-DD-YYYY";

    // Validate based on the current format
    const isValid =
      (isYMDFormat && datePickerPatternYMD.test(value)) ||
      (isMDYFormat && datePickerPatternMDY.test(value));

    if (!isValid) {
      // If the format is invalid, display a message based on the current format
      this.validation = true;
      this.validationMessage = `Invalid date format. Please use ${this.dateFormat}.`;
      this.requestUpdate(); // Ensure the UI reflects changes
    } else {
      // If valid, clear validation messages
      this.validation = false;
      this.validationMessage = "";
      this.requestUpdate();
    }
  }

  // Call this method when the picker type is updated or initially loaded
  setDefaultWarningMessage() {
    this.warningMessage = "Please pick a date.";

    this.validation = this.validation; // Ensure validation is active
    this.requestUpdate(); // Trigger a re-render to display the message
  }

  prevMonth() {
    this.preventClose = true; // Prevent closing the dropdown
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.renderCalendar(this.currentMonth, this.currentYear);
  }

  nextMonth() {
    this.preventClose = true; // Prevent closing the dropdown
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.renderCalendar(this.currentMonth, this.currentYear);
  }

  prevYear() {
    this.preventClose = true; // Prevent closing the dropdown
    this.currentYear--;
    this.renderCalendar(this.currentMonth, this.currentYear);
  }

  nextYear() {
    this.preventClose = true; // Prevent closing the dropdown
    this.currentYear++;
    this.renderCalendar(this.currentMonth, this.currentYear);
  }

  //   currentDate() {
  //     this.preventClose = true; // Prevent closing the dropdown
  //     const today = new Date();
  //     this.selectedDate = today;
  //     this.currentMonth = today.getUTCMonth();
  //     this.currentYear = today.getUTCFullYear();
  //     this.renderCalendar(this.currentMonth, this.currentYear);
  //   }

  currentDate() {
    const today = new Date();
    this.selectedDate = today;
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();

    // Re-render the calendar with the current month and year
    this.renderCalendar(this.currentMonth, this.currentYear);

    // Reset the display to today's date
    const formattedDate = this.formatDate(today);
    this.updateInputField(formattedDate);
    this.updateSelectedDateDisplay(formattedDate);

    this.setActiveState(); // Highlight today's date on the calendar
  }

  handleKeyDown(event) {
    const inputField = this.shadowRoot.querySelector("input.form-control");

    // Handle Backspace to clear the input if it's empty
    if (event.key === "Backspace") {
      // Check if the input field becomes empty
      if (inputField.value.trim() === "") {
        this.clearInputField(); // Call the clear function to reset everything
        return;
      }
    }

    // Other keydown handling for arrows remains unchanged (navigation keys)
    const calendarGrid = this.shadowRoot.querySelector(".calendar-grid");
    let currentFocus = this.shadowRoot.activeElement;
    let calendarCells = calendarGrid.querySelectorAll(".calendar-grid-item");

    if (event.key.startsWith("Arrow")) {
      event.preventDefault();
      let index = Array.from(calendarCells).indexOf(currentFocus);

      if (index !== -1) {
        let newIndex = index;

        if (event.key === "ArrowUp") {
          if (index < 7) {
            this.prevMonth();
            calendarCells = this.shadowRoot.querySelectorAll(
              ".calendar-grid-item"
            );
            newIndex = calendarCells.length - 7 + index;
          } else {
            newIndex = index - 7;
          }
        } else if (event.key === "ArrowDown") {
          if (index >= calendarCells.length - 7) {
            this.nextMonth();
            calendarCells = this.shadowRoot.querySelectorAll(
              ".calendar-grid-item"
            );
            newIndex = index % 7;
          } else {
            newIndex = index + 7;
          }
        } else if (event.key === "ArrowLeft") {
          newIndex = index - 1;
          if (newIndex < 0) {
            this.prevMonth();
            calendarCells = this.shadowRoot.querySelectorAll(
              ".calendar-grid-item"
            );
            newIndex = calendarCells.length - 1;
          }
        } else if (event.key === "ArrowRight") {
          newIndex = index + 1;
          if (newIndex >= calendarCells.length) {
            this.nextMonth();
            calendarCells = this.shadowRoot.querySelectorAll(
              ".calendar-grid-item"
            );
            newIndex = 0;
          }
        }

        const targetCell = calendarCells[newIndex];
        const targetSpan = targetCell.querySelector("span");

        const previousFocusedSpan = this.shadowRoot.querySelector(
          ".calendar-grid-item span.focus"
        );
        if (previousFocusedSpan) {
          previousFocusedSpan.classList.remove("focus");
        }

        targetSpan.classList.add("focus");
        targetCell.focus();
        this.updateActiveDateElements();
      }
    } else if (event.key === "Enter" || event.key === " ") {
      this.handleEnterKeyPress(event);
    }
  }

  updateInitialContext() {
    if (!this.displayContextExamples) {
      return; // Skip updating the context if not displaying context examples
    }

    const today = new Date();
    const activeDateYMD = this.shadowRoot.querySelector(".active-date-ymd");
    const activeDateMDY = this.shadowRoot.querySelector(".active-date-mdy");
    const activeLongDate = this.shadowRoot.querySelector(
      ".active-formatted-date-long"
    );
    const activeIsoDate = this.shadowRoot.querySelector(
      ".active-formatted-iso"
    );

    if (!activeDateYMD || !activeDateMDY || !activeLongDate || !activeIsoDate) {
      console.error("One or more active date elements are missing");
      return;
    }

    activeDateYMD.textContent = this.formatDateYmd(today);
    activeDateMDY.textContent = this.formatDateMdy(today);
    activeLongDate.textContent = this.formatDateLong(today);
    activeIsoDate.textContent = this.formatISODate(today);
  }

  handleInteraction(event) {
    // Stop the event from propagating to the document click handler
    event.stopPropagation();

    const bFocusDiv = this.shadowRoot.querySelector(".b-focus");
    const isInputFocused =
      event.target === this.shadowRoot.querySelector("input");

    if (bFocusDiv) {
      if (isInputFocused) {
        // Handle input focus
        bFocusDiv.style.width = "100%";
        bFocusDiv.style.left = "0";
      } else {
        // Handle input blur
        bFocusDiv.style.width = "0";
        bFocusDiv.style.left = "50%";
      }
    }
  }

  handleDocumentClick() {
    if (!this.shadowRoot) return; // Ensure shadowRoot exists
    const bFocusDiv = this.shadowRoot.querySelector(".b-focus");
    if (bFocusDiv) {
      bFocusDiv.style.width = "0";
      bFocusDiv.style.left = "50%";
    }
  }

  // Ensure clearing input resets the datepicker state
  clearInputField() {
    this.selectedDate = null; // Clear the selected date
    this.updateInputField(""); // Clear input value
    this.updateSelectedDateDisplay("No date selected"); // Reset display

    // Reset the calendar to today's date
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();
    this.renderCalendar(this.currentMonth, this.currentYear);

    // Ensure no validation or warning messages are triggered
    this.validation = false;
    this.validationMessage = "";
    this.warningMessage = "";

    this.requestUpdate(); // Re-render the UI to reflect changes
  }

  updateInputField(value) {
    const inputField = this.shadowRoot.querySelector("input.form-control");
    if (inputField) {
      inputField.value = value;
    }
  }

  updateCalendarWithParsedDate(date) {
    // If the parsed date is invalid, reset everything
    if (!date || isNaN(date.getTime())) {
      this.clearInputField();
      return;
    }

    // Update selected date and re-render the calendar
    this.selectedDate = date;
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();
    this.renderCalendar(this.currentMonth, this.currentYear);

    // Format the date according to the dateFormat
    const formattedSelectedDate = this.formatDate(date);

    if (formattedSelectedDate !== "Invalid Date") {
      this.updateInputField(formattedSelectedDate);
      this.updateSelectedDateDisplay(formattedSelectedDate);
    }

    // Highlight the selected date on the calendar
    this.setActiveState();
  }

  handleDateSelect(event) {
    // Ensure formattedDate is a valid Date object
    const selectedDate = new Date(event.detail.formattedDate);

    // Get the year, month, and day values explicitly without any timezone offsets
    const year = selectedDate.getUTCFullYear();
    const month = String(selectedDate.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(selectedDate.getUTCDate()).padStart(2, "0");

    // Create a new date string in the desired format without applying timezone conversions
    const formattedSelectedDate = `${year}-${month}-${day}`;

    // Set the selectedDate property
    this.selectedDate = formattedSelectedDate;

    // Close the dropdown
    this.dropdownOpen = false;

    // Set the formatted date in the input element and focus the input
    if (this.inputElement) {
      this.inputElement.value = formattedSelectedDate;
      this.inputElement.focus();
    }

    // Perform validation on the selected date
    this.validateInput(this.selectedDate);

    // Remove validation error classes if input is valid
    if (!this.validation) {
      this.inputElement.classList.remove("is-invalid");
      const labelElement = this.shadowRoot.querySelector(
        `label[for="${this.inputId}"]`
      );
      const appendElement = this.shadowRoot.querySelector(
        ".pl-input-group-append"
      );
      const prependElement = this.shadowRoot.querySelector(
        ".pl-input-group-prepend"
      );

      // Remove 'invalid' classes from the label and input group elements
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

    // Destroy the popper (dropdown) after selection
    this.destroyPopper();
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

  handleNavigationClick(event) {
    this.preventClose = true;
  }

  renderDropdown() {
    return html`
      <div class="dropdown ${this.dropdownOpen ? "open" : ""}">
        <div
          class="dropdown-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="datepicker-desc"
        >
          ${this.renderDatePicker()}
        </div>
      </div>
    `;
  }

  renderInputGroup() {
    return html`
      <div class=${ifDefined(this.formLayout)}></div>
        <div
          class="form-group form-input-group-basic ${this.formLayout} ${
      this.formLayout === "horizontal" || this.formLayout === "inline"
        ? " row"
        : ""
    }"
        >
          <label
            class="form-control-label${this.required ? " required" : ""}${
      this.labelHidden ? " sr-only" : ""
    }${this.formLayout === "horizontal" ? " col-md-2 no-padding" : ""}${
      this.validation ? " invalid" : ""
    }"
            for=${ifDefined(this.inputId)}
            aria-hidden="true"
          >
            ${
              this.formLayout === "horizontal" || this.formLayout === "inline"
                ? `${this.label}:`
                : `${this.label}`
            }
          </label>
          <div
            class=${ifDefined(
              this.formLayout === "horizontal"
                ? "col-md-10 no-padding"
                : undefined
            )}
          >
            <div
              class="pl-input-group${
                this.size === "sm"
                  ? " pl-input-group-sm"
                  : this.size === "lg"
                  ? " pl-input-group-lg"
                  : ""
              }"
              role="group"
              aria-label="Date Picker Group"
            >
              ${
                this.prepend
                  ? html` <div
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
                  : ""
              }
              <input
                id="${this.inputId}"
                type="text"
                class="form-control${this.validation ? " is-invalid" : ""}"
                placeholder=${this.dateFormat}
                value=${
                  this.selectedDate ? this.formatDate(this.selectedDate) : ""
                }
                @input=${this.handleInputChange}
                ?disabled=${this.disabled}
                aria-label="Selected Date"
                aria-describedby="datepicker-desc"
              />
              ${
                this.append
                  ? html` <div
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
                  : ""
              }
            </div>
            ${
              this.validation
                ? html`
                    ${this.warningMessage
                      ? html`<div class="invalid-feedback warning">
                          ${this.warningMessage}
                        </div>`
                      : html`<div class="invalid-feedback validation">
                          ${this.validationMessage}
                        </div>`}
                  `
                : ""
            }
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
    return this.calendar ? this.renderDatePicker() : this.renderInputs();
  }
}

customElements.define("date-picker-new", DatePickerNew);
