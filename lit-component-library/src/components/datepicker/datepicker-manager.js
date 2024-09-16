import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import Fontawesome from "lit-fontawesome";
import { formStyles } from "../form-styles.js";
import { inputFieldStyles } from "../input-field/input-field-styles";
import { inputGroupStyles } from "../input-group/input-group-styles.js";
import { plInputGroupStyles } from "../pl-input-group/pl-input-group-styles.js";
import { buttonStyles } from "../button/button-styles";
import { datepickerStyles } from "./datepicker-styles";
import { createPopper } from "@popperjs/core";

import "./datepicker";
import "./daterangepicker";
import "./dateRangeTimePicker";
import { faL } from "@fortawesome/free-solid-svg-icons";

class DatePickerManager extends LitElement {
  static styles = [
    Fontawesome,
    formStyles,
    buttonStyles,
    inputFieldStyles,
    inputGroupStyles,
    plInputGroupStyles,
    datepickerStyles,
    css``,
  ];

  static get properties() {
    return {
      selectedPicker: { type: String },
      dropdownOpen: { type: Boolean },
      selectedDate: { type: String },
      selectedStartDate: { type: String },
      selectedEndDate: { type: String },
      startTime: { type: String },
      endTime: { type: String },
      dateFormat: { type: String },
      joinBy: { type: String },
      is24HourFormat: { type: Boolean },
      showDuration: { type: Boolean },
      duration: { type: String },
      inputId: { type: String },
      plumage: { type: Boolean },
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
    };
  }

  constructor() {
    super();
    this.selectedPicker = "datepicker"; // Default to datepicker
    this.dropdownOpen = false;
    this.selectedDate = "";
    this.selectedStartDate = "";
    this.selectedEndDate = "";
    this.startTime = "";
    this.endTime = "";
    this.dateFormat = "YYYY-MM-DD";
    this.inputElement = null;
    this.popperInstance = null;
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.preventClose = false;
    this.joinBy = " - ";
    this.is24HourFormat = true;
    this.showDuration = false;
    this.duration = "";
    this.inputId = "datepicker";
    this.plumage = false;
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

    // Set default warning message based on selected picker
    this.setDefaultWarningMessage();
  }

  firstUpdated() {
    this.inputElement = this.shadowRoot.querySelector(".form-control");
    document.addEventListener("click", this.handleOutsideClick);

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
    this.append = this.getAttribute("append") !== "false";
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.handleOutsideClick);
    document.removeEventListener("click", this.handleDocumentClick);
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

  clearInputField(event) {
    if (this.inputElement) {
      this.inputElement.value = "";
      this.selectedDate = "";
      this.selectedStartDate = "";
      this.selectedEndDate = "";
      this.startTime = "";
      this.endTime = "";

      // Clear any duration if needed
      if (event && event.detail && event.detail.clearDuration) {
        this.duration = "";
      }

      // Set default warning message based on the selected picker
      this.setDefaultWarningMessage();

      // Reset validationMessage (so it's not shown)
      this.validationMessage = "";

      // Add 'is-invalid' and 'invalid' classes to input and label
      this.inputElement.classList.add("is-invalid");
      const labelElement = this.shadowRoot.querySelector(
        'label[for="' + this.inputId + '"]'
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

      // Dispatch the reset-picker event to child components (calendars)
      if (!event || !event.detail || !event.detail.preventReset) {
        this.shadowRoot
          .querySelectorAll(
            "date-picker, date-range-picker, date-range-time-picker"
          )
          .forEach((picker) => {
            picker.dispatchEvent(
              new CustomEvent("reset-picker", {
                bubbles: false,
                composed: true,
                detail: { preventReset: true },
              })
            );
          });
      }

      this.requestUpdate(); // Update the UI to reflect the new warning message
    }
  }

  handleOutsideClick(event) {
    if (!this.preventClose) {
      const dropdown = this.shadowRoot.querySelector(".dropdown");
      if (dropdown && !dropdown.contains(event.target)) {
        this.dropdownOpen = false;
        this.destroyPopper();
      }
    }
    this.preventClose = false;
  }

  toggleDropdown(event) {
    this.preventClose = true;
    this.dropdownOpen = !this.dropdownOpen;
    if (this.dropdownOpen) {
      this.createPopperInstance();
    } else {
      this.destroyPopper();
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
  formatDate(date, format) {
    // Ensure that the date is a valid Date object
    if (!(date instanceof Date)) {
      date = new Date(date); // Convert to Date object if not already
    }

    // Check if the date is valid after conversion
    if (isNaN(date)) {
      console.error("Invalid date provided to formatDate:", date);
      return "Invalid Date";
    }

    // Use local date methods to avoid timezone shift
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");

    if (format === "YYYY-MM-DD") {
      return `${year}-${month}-${day}`;
    } else if (format === "MM-DD-YYYY") {
      return `${month}-${day}-${year}`;
    }

    // Fallback to locale-aware formatting using default options
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date
      .toLocaleDateString("en-US", options)
      .replace(/(\d+)\/(\d+)\/(\d+)/, (match, m, d, y) => {
        return format === "YYYY-MM-DD" ? `${y}-${m}-${d}` : `${m}-${d}-${y}`;
      });
  }

  validateInput(value) {
    const datePickerPattern = /^(?:\d{4}-\d{2}-\d{2}|\d{2}-\d{2}-\d{4})$/;
    const dateRangePattern =
      /^(?:\d{4}-\d{2}-\d{2}|\d{2}-\d{2}-\d{4})[\s-]+(?:to|\-)[\s]+(?:\d{4}-\d{2}-\d{2}|\d{2}-\d{2}-\d{4})$/;
    const dateRangeTimePattern =
      /^(?:\d{2}-\d{2}-\d{4} \d{2}:\d{2})(?: AM| PM)?[\s-]+(?:to|\-)[\s]+(?:\d{2}-\d{2}-\d{4} \d{2}:\d{2})(?: AM| PM)?(?: \(\d+d \d+h\))?$/;

    let isValid = false;
    if (this.selectedPicker === "datepicker") {
      isValid = datePickerPattern.test(value);
    } else if (this.selectedPicker === "daterange") {
      isValid = dateRangePattern.test(value);
    } else if (this.selectedPicker === "daterangetime") {
      isValid = dateRangeTimePattern.test(value);
    }

    if (!value) {
      // If input is empty, show the warning message based on the selected picker
      this.setDefaultWarningMessage();
    } else if (!isValid) {
      // If format is invalid, show the validation message
      this.validation = true;
      this.validationMessage = "Invalid date format.";
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
    switch (this.selectedPicker) {
      case "datepicker":
        this.warningMessage = "Please pick a date.";
        break;
      case "daterange":
        this.warningMessage = "Please pick a date range.";
        break;
      case "daterangetime":
        this.warningMessage = "Please pick a date and time range.";
        break;
      default:
        this.warningMessage = "Please provide a valid selection.";
        break;
    }

    this.validation = this.validation; // Ensure validation is active
    this.requestUpdate(); // Trigger a re-render to display the message
  }

  // When selectedPicker changes, ensure the correct warning message is set
  updated(changedProperties) {
    if (changedProperties.has("selectedPicker")) {
      this.setDefaultWarningMessage(); // Ensure correct warning message when picker changes
    }
  }

  handleInputChange(event) {
    const value = event.target.value.trim();

    // If the input is cleared
    if (value === "") {
      this.clearInputField(); // Reset the field and show validation
      return;
    }

    // Validate the input
    this.validateInput(value);

    // Update properties based on picker type
    if (this.selectedPicker === "datepicker") {
      this.selectedDate = value;
    } else if (this.selectedPicker === "daterange") {
      const dates = value.split(this.joinBy);
      if (dates.length === 2) {
        this.selectedStartDate = dates[0].trim();
        this.selectedEndDate = dates[1].trim();
      }
    } else if (this.selectedPicker === "daterangetime") {
      const dateTimeParts = value.split(this.joinBy);
      if (dateTimeParts.length === 2) {
        const startDateTime = dateTimeParts[0].trim().split(" ");
        const endDateTime = dateTimeParts[1].trim().split(" ");

        if (startDateTime.length === 2) {
          this.selectedStartDate = startDateTime[0];
          this.startTime = startDateTime[1];
        }
        if (endDateTime.length === 2) {
          this.selectedEndDate = endDateTime[0];
          this.endTime = endDateTime[1];
        }
      }
    }
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

  handleDateRangeTimeSelect(event) {
    // Manually extract the date components
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

    this.selectedStartDate = this.formatDate(startDate, this.dateFormat);
    this.selectedEndDate = this.formatDate(endDate, this.dateFormat);
    this.startTime = event.detail.startTime;
    this.endTime = event.detail.endTime;
    this.duration = event.detail.duration || "";
    this.dropdownOpen = false;

    if (this.inputElement) {
      this.inputElement.value =
        this.selectedStartDate &&
        this.selectedEndDate &&
        this.startTime &&
        this.endTime
          ? `${this.selectedStartDate} ${this.startTime} ${this.joinBy} ${
              this.selectedEndDate
            } ${this.endTime} ${
              this.showDuration && this.duration ? `(${this.duration})` : ""
            }`
          : "";
      this.inputElement.focus();
    }

    this.validateInput(this.inputElement.value);

    this.removeValidationClasses();
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

  renderPicker() {
    if (this.selectedPicker === "datepicker") {
      return html`
        <date-picker
          @date-selected=${this.handleDateSelect}
          @click=${this.handleNavigationClick}
          .plumage=${this.plumage}
          .dateFormat=${this.dateFormat}
          aria-label="Single Date Picker"
        ></date-picker>
      `;
    } else if (this.selectedPicker === "daterange") {
      return html`
        <date-range-picker
          @date-range-updated=${this.handleDateRangeSelect}
          @click=${this.handleNavigationClick}
          .plumage=${this.plumage}
          .dateFormat=${this.dateFormat}
          aria-label="Date Range Picker"
        ></date-range-picker>
      `;
    } else if (this.selectedPicker === "daterangetime") {
      return html`
        <date-range-time-picker
          @date-time-updated=${this.handleDateRangeTimeSelect}
          @click=${this.handleNavigationClick}
          .plumage=${this.plumage}
          .dateFormat=${this.dateFormat}
          .is24HourFormat=${this.is24HourFormat}
          .showDuration=${this.showDuration}
          aria-label="Date Range and Time Picker"
        ></date-range-time-picker>
      `;
    }
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
          ${this.renderPicker()}
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

  render() {
    return html`
      <div class="dropdown-wrapper">
        ${this.plumage ? this.renderPlInputGroup() : this.renderInputGroup()}
        ${this.renderDropdown()}
      </div>
    `;
  }
}

customElements.define("datepicker-manager", DatePickerManager);
