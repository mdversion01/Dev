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

class DatePicker extends LitElement {
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

      footer:focus-visible {
        outline: 0;
      }

    `,
  ];

  static get properties() {
    return {
      append: { type: Boolean },
      appendId: { type: String },
      calendar: { type: Boolean },
      currentMonth: { type: Number },
      currentSelectedDate: { type: Object },
      currentYear: { type: Number },
      dateFormat: { type: String }, // Property for date format
      disabled: { type: Boolean },
      displayContextExamples: { type: Boolean },
      dropdownOpen: { type: Boolean },
      formLayout: { type: String },
      icon: { type: String },
      inputId: { type: String },
      isCalendarFocused: { type: Boolean },
      label: { type: String },
      labelHidden: { type: Boolean },
      placeholder: { type: String },
      plumage: { type: Boolean },
      prepend: { type: Boolean },
      prependId: { type: String },
      previousSelectedDayElement: { type: Object },
      required: { type: Boolean },
      selectedDate: { type: Object },
      selectedMonth: { type: Number },
      selectedYear: { type: Number },
      shouldClearSelectedDate: { type: Boolean },
      size: { type: String },
      validation: { type: Boolean },
      validationMessage: { type: String },
      value: { type: String, reflect: true },
      warningMessage: { type: String },
    };
  }

  constructor() {
    super();
    this.addEventListener("reset-picker", this.resetCalendar);
    this.addEventListener("update-calendar", this.handleUpdateCalendar); // Listen for updates
    this.append = true;
    this.appendId = "";
    this.calendar = false;
    this.calendarIconElement = null;
    // Initialize currentSelectedDate to a valid Date object first
    this.currentSelectedDate = new Date();
    // Then, access its properties
    this.currentMonth = this.currentSelectedDate.getMonth();
    this.currentYear = this.currentSelectedDate.getFullYear();
    this.dateFormat = "YYYY-MM-DD"; // Default to YYYY-MM-DD format
    this.disabled = false;
    this.displayContextExamples = false;
    this.dropdownOpen = false;
    this.formLayout = "";
    this.handleOutsideClick = this.handleOutsideClick.bind(this); // Bind handleOutsideClick once to maintain the same reference
    this.icon = "fas fa-calendar-alt";
    this.inputId = "datepicker";
    this.isCalendarFocused = false;
    this.label = "Date Picker";
    this.labelHidden = false;
    this.placeholder = `${this.dateFormat}`;
    this.plumage = false;
    this.prepend = false;
    this.prependId = "";
    this.previousSelectedDayElement = null;
    this.required = false;
    this.selectedDate = null;
    this.selectedMonth = null;
    this.selectedYear = null;
    this.shouldClearSelectedDate = false;
    this.size = "";
    this.validation = false;
    this.validationMessage = "";
    this.value = "";
    this.warningMessage = "";
  }

  firstUpdated() {
    this.renderCalendar(this.currentMonth, this.currentYear);
    this.updateSelectedDateDisplay("No date selected");

    if (this.displayContextExamples) {
      this.updateInitialContext();
    }

    this.inputElement = this.shadowRoot.querySelector(".form-control");

    // Check if inputElement exists before adding event listeners
    if (this.inputElement) {
      // Add focus and blur events for the input and calendar button
      this.inputElement.addEventListener(
        "focus",
        this._addFocusClass.bind(this)
      );
      this.inputElement.addEventListener(
        "blur",
        this._removeFocusClass.bind(this)
      );

      // Retain the keydown event handler for backspace, arrow keys, etc.
      this.inputElement.addEventListener(
        "keydown",
        this.handleKeyDown.bind(this)
      );
    } else {
      console.error(".form-control not found in the DOM.");
    }

    const calendarButton = this.shadowRoot.querySelector(".calendar-button");

    if (calendarButton) {
      calendarButton.addEventListener("focus", this._addFocusClass.bind(this));
      calendarButton.addEventListener(
        "blur",
        this._removeFocusClass.bind(this)
      );
    }

    document.addEventListener("click", this.handleOutsideClick);
    document.removeEventListener("click", this.handleDocumentClick);

    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("update-calendar", this.updateCalendarWithDate);

    this.addEventListener("keydown", this.handleKeyDown);

    // document.addEventListener("click", this.handleDocumentClick);
    this.append = this.getAttribute("append") !== "false";
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("update-calendar", this.updateCalendarWithDate);
    this.removeEventListener("keydown", this.handleKeyDown);

    document.removeEventListener("click", this.handleOutsideClick);
    // document.removeEventListener("click", this.handleDocumentClick);
  }

  _addFocusClass() {
    const plInputGroupDiv = this.shadowRoot.querySelector(".pl-input-group");
    if (plInputGroupDiv) {
      plInputGroupDiv.classList.add("focus");
    }
  }

  _removeFocusClass() {
    const plInputGroupDiv = this.shadowRoot.querySelector(".pl-input-group");
    if (plInputGroupDiv) {
      plInputGroupDiv.classList.remove("focus");
    }
  }

  updated(changedProperties) {
    // Handle other property updates like dateFormat
    if (changedProperties.has("dateFormat")) {
      this.placeholder = this.dateFormat;
      this.updateInputFormat(); // Reformat input field based on date format change
    }

    super.updated(changedProperties); // Call the super updated method
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

      if (!inputValue) {
        this.clearInputField(); // Reset input and calendar
        this.updateSelectedDateDisplay(null); // Reset display
      } else {
        const parsedDate = this.parseDate(inputValue);
        if (parsedDate && !isNaN(parsedDate.getTime())) {
          this.updateCalendarWithParsedDate(parsedDate); // Sync calendar
          this.updateSelectedDateDisplay(parsedDate); // Update display
        } else {
          this.updateSelectedDateDisplay(null); // Handle invalid input
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
            offset: [0, 4],
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
    const inputElement = event.target;
    const inputValue = inputElement.value.trim();

    // Save the current cursor position
    let cursorPosition = inputElement.selectionStart;

    // Remove all non-numeric characters except dashes
    let rawValue = inputValue.replace(/[^0-9]/g, "");

    let formattedValue = "";

    const isYMDFormat = this.dateFormat === "YYYY-MM-DD";
    const isMDYFormat = this.dateFormat === "MM-DD-YYYY";

    // Handle YYYY-MM-DD format
    if (isYMDFormat) {
      if (rawValue.length <= 4) {
        formattedValue = rawValue; // Year part only
      } else if (rawValue.length <= 6) {
        formattedValue = `${rawValue.slice(0, 4)}-${rawValue.slice(4)}`; // Year and month
      } else {
        formattedValue = `${rawValue.slice(0, 4)}-${rawValue.slice(
          4,
          6
        )}-${rawValue.slice(6, 8)}`; // Full year, month, and day
      }
    }
    // Handle MM-DD-YYYY format
    else if (isMDYFormat) {
      if (rawValue.length <= 2) {
        formattedValue = rawValue; // Month part only
      } else if (rawValue.length <= 4) {
        formattedValue = `${rawValue.slice(0, 2)}-${rawValue.slice(2)}`; // Month and day
      } else {
        formattedValue = `${rawValue.slice(0, 2)}-${rawValue.slice(
          2,
          4
        )}-${rawValue.slice(4, 8)}`; // Full month, day, and year
      }
    }

    // Update the input field with the formatted value
    inputElement.value = formattedValue;

    // Adjust cursor position if necessary
    let newCursorPosition = cursorPosition;

    // Restore the cursor position only if we didn't add any extra formatting (like dashes)
    if (formattedValue.length > inputValue.length) {
      newCursorPosition++;
    } else if (formattedValue.length < inputValue.length) {
      newCursorPosition--;
    }

    inputElement.setSelectionRange(newCursorPosition, newCursorPosition);

    // Trigger validation dynamically based on the formatted input
    this.validateInput(formattedValue);
  }

  handleInputBlur(event) {
    const inputValue = event.target.value.trim();

    if (inputValue === "") {
      // Clear the input if it's empty
      this.clearInputField();
      return;
    }

    // Validate the input on blur
    this.validateInput(inputValue);

    // If validation fails, show the validation message but don't clear the input
    if (this.validation) {
      console.log("Validation failed: ", this.validationMessage);
      return; // Do not clear the input field or selected date, just show the error
    }

    // If the input passes validation, format and set the date
    const parsedDate = this.parseDate(inputValue);

    if (parsedDate) {
      // Format and update the input field with the parsed date
      const formattedSelectedDate = this.formatDate(parsedDate);
      this.updateInputField(formattedSelectedDate);
      this.updateSelectedDateDisplay(parsedDate);
      this.selectedDate = parsedDate;
      this.renderCalendar(this.currentMonth, this.currentYear);
    } else {
      console.log("Invalid input but not clearing the input.");
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

        // Strict check for valid year, month, and day ranges
        if (
          !isNaN(year) &&
          !isNaN(month) &&
          !isNaN(day) &&
          year.toString().length === 4 && // Ensure valid 4-digit year
          month >= 0 &&
          month < 12 && // Month between 0 and 11
          day > 0 &&
          day <= 31 // Day between 1 and 31 (basic check)
        ) {
          return new Date(year, month, day);
        }
      }
    } else if (this.dateFormat === "MM-DD-YYYY") {
      const partsMDY = input.split("-");
      if (partsMDY.length === 3) {
        const month = parseInt(partsMDY[0], 10) - 1; // Months are 0-based
        const day = parseInt(partsMDY[1], 10);
        const year = parseInt(partsMDY[2], 10);

        // Strict check for valid year, month, and day ranges
        if (
          !isNaN(month) &&
          !isNaN(day) &&
          !isNaN(year) &&
          year.toString().length === 4 && // Ensure valid 4-digit year
          month >= 0 &&
          month < 12 && // Month between 0 and 11
          day > 0 &&
          day <= 31 // Day between 1 and 31 (basic check)
        ) {
          return new Date(year, month, day);
        }
      }
    }

    // If parsing fails, return null
    return null;
  }

  renderDatePicker() {
    return html`
      <div
        class="dp-single-calendar${this.plumage ? " plumage" : ""}"
        aria-label="${this.ariaLabel || "Date Picker"}"
        role="region"
      >
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
            <footer
              class="border-top small text-muted text-center bg-light"
              tabindex="0"
            >
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

  updateSelectedDateDisplay(date) {
    const selectedDateDisplay =
      this.shadowRoot.querySelector(".selected-date bdi");

    // If the date is a string, attempt to convert it to a Date object
    if (typeof date === "string") {
      date = new Date(date);
    }

    // Check if date is valid (either Date object or valid string converted to Date)
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      // Display "No date selected" if no valid date is provided
      selectedDateDisplay.textContent = "No date selected";
    } else {
      // If a valid date is provided, format it as a long date
      const formattedLongDate = this.formatDateLong(date);

      selectedDateDisplay.textContent = formattedLongDate;
    }
  }

  updateSelectedDateElements(formattedDate) {
    if (!this.displayContextExamples) {
      return;
    }

    const date = new Date(formattedDate);

    const selectedDateYmd = this.formatDateYmd(date);
    const selectedDateMdy = this.formatDateMdy(date);
    const selectedFormatted = this.formatDateLong(date); // Long format for display
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
      console.warn("Element with class .selected-date-Mdy not found.");
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

    // Update the header (bdi element) with the long format
    this.updateSelectedDateDisplay(date);
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

      // Correctly format and update the elements
      activeDateYMD.textContent = this.formatDateYmd(date); // YYYY-MM-DD
      activeDateMDY.textContent = this.formatDateMdy(date); // MM-DD-YYYY
      activeLongDate.textContent = this.formatDateLong(date); // Long format (weekday, month, day, year)
      activeIsoDate.textContent = this.formatISODate(date); // ISO format
    } else {
      // If no date is focused, reset the context display
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

    let formattedDate = ""; // Define formattedDate to prevent errors

    if (!isActive) {
      this.clearActiveState(); // Ensure other active states are cleared

      // Add active state to the clicked day
      clickedSpan.classList.add("active", "btn-primary", "focus");

      // Add aria-label for accessibility to show the selected state
      const selectedDateElement = this.shadowRoot.getElementById(
        `cell-${dayContainer.dataset.date}`
      );
      if (selectedDateElement) {
        const existingAriaLabel =
          selectedDateElement.getAttribute("aria-label");
        selectedDateElement.setAttribute(
          "aria-label",
          `${existingAriaLabel} (Selected)`
        );
        selectedDateElement.setAttribute("aria-selected", "true");
        selectedDateElement.setAttribute("aria-current", "date");
      }

      // Update selected date properties
      this.selectedMonth = parseInt(dayContainer.dataset.month, 10);
      this.selectedYear = parseInt(dayContainer.dataset.year, 10);
      const selectedDay = parseInt(clickedSpan.textContent, 10);

      // Use local time instead of UTC to avoid timezone issues
      this.selectedDate = new Date(
        this.selectedYear,
        this.selectedMonth - 1,
        selectedDay
      );

      // Ensure the selected date is valid
      if (isNaN(this.selectedDate.getTime())) {
        console.error("Invalid date selected");
        return;
      }

      // Get the long-formatted date for the header display
      const selectedFormattedLong = this.formatDateLong(this.selectedDate);
      const formattedSelectedDate = this.getDateFormatMethod(
        this.dateFormat
      ).call(this, this.selectedDate);

      this.updateInputField(formattedSelectedDate);

      // Always update the selected date display (header) with the long format
      this.updateSelectedDateDisplay(selectedFormattedLong);
      this.updateSelectedDateElements(selectedFormattedLong);
      this.updateActiveDateElements();
      this.currentSelectedDate = new Date(
        this.selectedYear,
        this.selectedMonth - 1,
        selectedDay
      );
      this.updateSelectedDateElements(selectedFormattedLong);

      // Set focus on the calendar
      this.shadowRoot.querySelector(".calendar").classList.add("focus");
      this.isCalendarFocused = true;

      // Update aria-activedescendant for accessibility
      formattedDate = `${this.selectedDate.getFullYear()}-${String(
        this.selectedDate.getMonth() + 1
      ).padStart(2, "0")}-${String(this.selectedDate.getDate()).padStart(
        2,
        "0"
      )}`;

      this.shadowRoot
        .querySelector(".calendar")
        .setAttribute("aria-activedescendant", `cell-${formattedDate}`);

      // Dispatch the date-selected event with the long formatted date
      this.dispatchEvent(
        new CustomEvent("date-selected", {
          detail: { formattedDate: selectedFormattedLong },
          bubbles: true,
          composed: true,
        })
      );
    }

    // Prevent toggling off the selected day
    if (isActive) {
      return;
    }

    // Handle previous/next month date selections
    if (isPreviousMonthDay || isNextMonthDay) {
      this.currentMonth += isNextMonthDay ? 1 : -1;
      if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear++;
      }
      this.renderCalendar(this.currentMonth, this.currentYear);

      // Recalculate the `formattedDate` for the newly rendered month
      this.selectedDate = new Date(
        this.currentYear,
        this.currentMonth,
        parseInt(clickedSpan.textContent, 10)
      );
      formattedDate = `${this.selectedDate.getFullYear()}-${String(
        this.selectedDate.getMonth() + 1
      ).padStart(2, "0")}-${String(this.selectedDate.getDate()).padStart(
        2,
        "0"
      )}`;
    }

    // Now safely use `formattedDate` after it has been defined/redefined
    const newFocusCell = this.shadowRoot.querySelector(
      `.calendar-grid-item[data-date="${formattedDate}"]`
    );
    if (newFocusCell) {
      newFocusCell.querySelector("span").focus();
    }

    this.setActiveState();
  }

  // Add a helper method to update the input field
  updateInputField(formattedDate) {
    const inputField = this.shadowRoot.querySelector("input.form-control");
    if (inputField) {
      inputField.value = formattedDate; // Use short format for input field
    }
  }

  updateInputFormat() {
    if (this.selectedDate) {
      const formattedSelectedDate = this.getDateFormatMethod(
        this.dateFormat
      ).call(this, this.selectedDate);
      this.updateInputField(formattedSelectedDate); // Update the input value
      this.updateSelectedDateDisplay(this.formatDateLong(this.selectedDate)); // Update display
    }
    // Update placeholder with current date format
    this.placeholder = this.dateFormat;
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

        // Close the dropdown after the date selection
        this.toggleDropdown();
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
    // Clear previous messages
    this.validationMessage = "";
    this.validation = false;

    // Helper function to trigger validation error
    const triggerValidation = (message) => {
      this.validation = true;
      this.validationMessage = message;
      this.requestUpdate(); // Ensures that the error message is reflected in the UI
    };

    let parts, year, month, day;

    // Parse the input based on the date format
    if (this.dateFormat === "YYYY-MM-DD") {
      parts = value.split("-");
      year = parts[0] ? parts[0] : null;
      month = parts[1] ? parseInt(parts[1], 10) : null;
      day = parts[2] ? parseInt(parts[2], 10) : null;

      // Validate year: must be present and exactly 4 digits
      if (
        year === null ||
        year.length < 4 ||
        isNaN(parseInt(year, 10)) ||
        parseInt(year, 10) < 1900
      ) {
        triggerValidation(
          "Year is required, must be 4 digits, and must be greater than or equal to 1900."
        );
        return;
      }

      // Validate month if present or empty (i.e. being deleted)
      if (month === null || isNaN(month) || month < 1 || month > 12) {
        triggerValidation("Month is required and must be between 01 and 12.");
        return;
      }

      // Validate day if present or empty (i.e. being deleted)
      if (day === null || isNaN(day) || day < 1 || day > 31) {
        triggerValidation("Day is required and must be between 01 and 31.");
        return;
      }
    } else if (this.dateFormat === "MM-DD-YYYY") {
      parts = value.split("-");
      month = parts[0] ? parseInt(parts[0], 10) : null;
      day = parts[1] ? parseInt(parts[1], 10) : null;
      year = parts[2] ? parts[2] : null;

      // Validate month: must be present and between 01 and 12, or trigger validation when deleted
      if (month === null || isNaN(month) || month < 1 || month > 12) {
        triggerValidation("Month is required and must be between 01 and 12.");
        return;
      }

      // Validate day: must be present and between 01 and 31, or trigger validation when deleted
      if (day === null || isNaN(day) || day < 1 || day > 31) {
        triggerValidation("Day is required and must be between 01 and 31.");
        return;
      }

      // Validate year: it should be present and exactly 4 digits
      if (
        year === null ||
        year.length < 4 ||
        isNaN(parseInt(year, 10)) ||
        parseInt(year, 10) < 1900
      ) {
        triggerValidation(
          "Year is required, must be 4 digits, and must be greater than or equal to 1900."
        );
        return;
      }
    }

    // If all checks pass, clear validation
    this.validation = false;
    this.validationMessage = "";
    this.requestUpdate();
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

    // Handle Backspace: Only clear the input if it's not empty, avoid triggering date navigation
    if (event.key === "Backspace") {
      if (inputField.value.trim() === "") {
        this.clearInputField(); // Reset everything if input is empty
        return; // Exit to prevent further key handling
      }
    }

    // Handle other key events (like arrow navigation) only when the calendar is focused
    const calendarGrid = this.shadowRoot.querySelector(".calendar-grid");
    const currentFocus = this.shadowRoot.activeElement;

    if (!calendarGrid || !calendarGrid.contains(currentFocus)) {
      return; // Do nothing if the calendar grid is not focused
    }

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
    const isGroupFocused =
      event.target === this.shadowRoot.querySelector(".calendar-button");

    if (bFocusDiv) {
      if (isInputFocused || isGroupFocused) {
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
    // If the event contains a formatted date, use it
    const formattedDate = event.detail?.formattedDate
      ? new Date(event.detail.formattedDate)
      : new Date(
          this.currentYear,
          this.currentMonth,
          event.target.dataset.day // If selected via calendar
        );

    // Extract year, month, and day
    const year = formattedDate.getUTCFullYear();
    const month = String(formattedDate.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(formattedDate.getUTCDate()).padStart(2, "0");

    // Create a formatted date string (YYYY-MM-DD)
    const formattedSelectedDate = `${year}-${month}-${day}`;

    // Set the selectedDate property
    this.selectedDate = formattedDate;

    // Close the dropdown
    this.dropdownOpen = false;

    // Update the input field with the formatted date and focus the input
    if (this.inputElement) {
      this.inputElement.value = formattedSelectedDate;
      this.inputElement.focus();
    }

    // Perform validation on the selected date
    this.validateInput(formattedSelectedDate);

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

    // Update the selected date display
    this.updateSelectedDateDisplay(formattedSelectedDate);

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
      <div class="dropdown${this.dropdownOpen ? " open" : ""}">
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

  renderAppend() {
    return html`
      <div class="pl-input-group-append">
        <button
          @click=${this.toggleDropdown}
          class="calendar-button pl-btn pl-input-group-text${this.validation
            ? " is-invalid"
            : ""}"
          aria-label="Toggle Calendar Picker"
          aria-haspopup="dialog"
          aria-expanded=${this.dropdownOpen ? "true" : "false"}
          ?disabled=${this.disabled}
        >
          <i class="${this.icon}"></i>
        </button>
      </div>
    `;
  }

  renderPrepend() {
    return html` <div class="pl-input-group-prepend">
      <button
        @click=${this.toggleDropdown}
        class="calendar-button pl-btn pl-input-group-text${this.validation
          ? " is-invalid"
          : ""}"
        aria-label="Toggle Calendar Picker"
        aria-haspopup="dialog"
        aria-expanded=${this.dropdownOpen ? "true" : "false"}
        ?disabled=${this.disabled}
      >
        <i class="${this.icon}"></i>
      </button>
    </div>`;
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
              }${this.validation ? " is-invalid" : ""}"
              role="group"
              aria-label="Date Picker Group"
            >
              ${this.prepend ? this.renderPrepend() : ""}
              <div class="drp-input-field">
                <input
                  id="${this.inputId}"
                  type="text"
                  class="form-control${this.validation ? " is-invalid" : ""}"
                  placeholder=${this.placeholder}
                  value=${
                    this.selectedDate ? this.formatDate(this.selectedDate) : ""
                  }
                  @input=${this.handleInputChange}
                  @blur=${this.handleInputBlur}
                  ?disabled=${this.disabled}
                  aria-label="Selected Date"
                  aria-describedby="datepicker-desc"
                />
                ${
                  this.selectedDate
                    ? html`<button
                        @click=${() => this.clearInputField()}
                        class="clear-input-button${this.validation
                          ? " is-invalid"
                          : ""}"
                        aria-label="Clear Field"
                        role="button"
                      >
                        <i class="fas fa-times-circle"></i>
                      </button>`
                    : ""
                }
              </div>
              ${this.append ? this.renderAppend() : ""}
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
              ? html`<div class="pl-input-group-prepend">
                  <button
                    @click=${this.toggleDropdown}
                    class="calendar-button pl-btn pl-input-group-text${this
                      .validation
                      ? " is-invalid"
                      : ""}"
                    aria-label="Toggle Calendar Picker"
                    aria-haspopup="dialog"
                    aria-expanded=${this.dropdownOpen ? "true" : "false"}
                    ?disabled=${this.disabled}
                    @focus="${this.handleInteraction}"
                    @blur="${this.handleDocumentClick}"
                  >
                    <i class="${this.icon}"></i>
                  </button>
                </div>`
              : ""}
            <div class="drp-input-field">
              <input
                id="${this.inputId}"
                type="text"
                class="form-control${this.validation ? " is-invalid" : ""}"
                placeholder=${this.placeholder}
                value=${this.selectedDate
                  ? this.formatDate(this.selectedDate)
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
              ${this.selectedDate
                ? html`<button
                    @click=${() => this.clearInputField()}
                    class="clear-input-button"
                    aria-label="Clear Field"
                    role="button"
                  >
                    <i class="fas fa-times-circle"></i>
                  </button>`
                : ""}
            </div>
            ${this.append
              ? html`<div class="pl-input-group-append">
                  <button
                    @click=${this.toggleDropdown}
                    class="calendar-button pl-btn pl-input-group-text${this
                      .validation
                      ? " is-invalid"
                      : ""}"
                    aria-label="Toggle Calendar Picker"
                    aria-haspopup="dialog"
                    aria-expanded=${this.dropdownOpen ? "true" : "false"}
                    ?disabled=${this.disabled}
                    @focus="${this.handleInteraction}"
                    @blur="${this.handleDocumentClick}"
                  >
                    <i class="${this.icon}"></i>
                  </button>
                </div>`
              : ""}
          </div>
          <div
            class="b-underline${this.validation ? " invalid" : ""}"
            role="presentation"
          >
            <div
              class="b-focus${this.disabled ? " disabled" : ""}${this.validation
                ? " invalid"
                : ""}"
              role="presentation"
              aria-hidden="true"
            ></div>
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

customElements.define("date-picker", DatePicker);
