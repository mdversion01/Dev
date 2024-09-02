import { LitElement, html, css } from "lit";
import Fontawesome from "lit-fontawesome";
import { formStyles } from "../form-styles.js";
import { inputFieldStyles } from "../input-field/input-field-styles";
import { inputGroupStyles } from "../input-group/input-group-styles.js";
import { buttonStyles } from "../button/button-styles";

// Import the date-picker, date-range-picker, and date-range-time-picker components
import "./datepicker";
import "./daterangepicker";
import "./dateRangeTimePicker"; // Import the new component

class DatePickerManager extends LitElement {
  static styles = [
    Fontawesome,
    formStyles,
    buttonStyles,
    inputFieldStyles,
    inputGroupStyles,
    css`
      .input-group {
        display: flex;
        align-items: center;
      }

      .calendar-button {
        background-color: transparent;
        border-top: 1px solid rgb(206, 212, 218);
        border-bottom: 1px solid rgb(206, 212, 218);
        border-right: 1px solid rgb(206, 212, 218);
        border-left: none;
        border-radius: 0 0.2rem 0.2rem 0;
        cursor: pointer;
        color: rgb(149, 149, 149);
        margin-left: 0px;
        min-height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        user-select: none;
        transition: color 0.15s ease-in-out 0s,
          background-color 0.15s ease-in-out 0s,
          border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
      }

      .dropdown {
        position: relative;
      }

      .dropdown-content {
        display: none;
        position: absolute;
        background-color: white;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
        padding: 5px;
        border-radius: 3px;
      }

      .dropdown.open .dropdown-content {
        display: block;
      }
    `,
  ];

  static get properties() {
    return {
      selectedPicker: { type: String }, // "datepicker", "daterange", or "daterangetime"
      dropdownOpen: { type: Boolean },
      selectedDate: { type: String }, // For single date
      selectedStartDate: { type: String }, // For date range start
      selectedEndDate: { type: String }, // For date range end
      startTime: { type: String }, // For time in date range time picker
      endTime: { type: String }, // For time in date range time picker
      dateFormat: { type: String }, // Property for date format
      joinBy: { type: String }, // Property for date range separator
      is24HourFormat: { type: Boolean }, // Property for 24-hour time format
    };
  }

  constructor() {
    super();
    this.selectedPicker = "datepicker"; // Default to datepicker
    this.dropdownOpen = false;
    this.selectedDate = ""; // For single date picker
    this.selectedStartDate = ""; // For date range picker
    this.selectedEndDate = ""; // For date range picker
    this.startTime = ""; // For start time in date range time picker
    this.endTime = ""; // For end time in date range time picker
    this.dateFormat = "YYYY-MM-DD"; // Default to YYYY-MM-DD format
    this.inputElement = null; // To store the reference to the input element
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.preventClose = false; // To prevent immediate close on button click
    this.joinBy = " - "; // Default separator for date range
    this.is24HourFormat = true; // Default to 24-hour time
  }

  set is24HourFormat(value) {
    const oldValue = this._is24HourFormat;
    this._is24HourFormat = value;
    console.log("is24HourFormat set to:", value);
    this.requestUpdate("is24HourFormat", oldValue);
  }

  get is24HourFormat() {
    return this._is24HourFormat;
  }

  firstUpdated() {
    this.inputElement = this.shadowRoot.querySelector(".form-control");
    document.addEventListener("click", this.handleOutsideClick);

    // Listen for the reset event from the date pickers
    this.shadowRoot.addEventListener(
      "reset-picker",
      this.clearInputField.bind(this)
    );

    // Toggle the is24HourFormat after 2 seconds to test if the property is being observed correctly
    setTimeout(() => {
      this.is24HourFormat = !this.is24HourFormat;
      console.log(
        "Toggled is24HourFormat in DatePickerManager:",
        this.is24HourFormat
      );
    }, 2000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.handleOutsideClick);
  }

  clearInputField() {
    if (this.inputElement) {
      this.inputElement.value = "";
      this.selectedDate = "";
      this.selectedStartDate = "";
      this.selectedEndDate = "";
      this.startTime = "";
      this.endTime = "";
    }
  }

  handleOutsideClick(event) {
    if (!this.preventClose) {
      const dropdown = this.shadowRoot.querySelector(".dropdown");
      if (dropdown && !dropdown.contains(event.target)) {
        this.dropdownOpen = false;
      }
    }
    this.preventClose = false;
  }

  toggleDropdown(event) {
    this.preventClose = true;
    this.dropdownOpen = !this.dropdownOpen;
  }

  formatDate(date, format) {
    const options = {};
    switch (format) {
      case "YYYY-MM-DD":
        options.year = "numeric";
        options.month = "2-digit";
        options.day = "2-digit";
        break;
      case "MM-DD-YYYY":
        options.year = "numeric";
        options.month = "2-digit";
        options.day = "2-digit";
        break;
    }
    return new Date(date)
      .toLocaleDateString("en-US", options)
      .replace(/(\d+)\/(\d+)\/(\d+)/, (match, m, d, y) => {
        return format === "YYYY-MM-DD" ? `${y}-${m}-${d}` : `${m}-${d}-${y}`;
      });
  }

  handleDateSelect(event) {
    this.selectedDate = this.formatDate(
      event.detail.formattedDate,
      this.dateFormat
    );
    this.dropdownOpen = false;
    if (this.inputElement) {
      this.inputElement.value = this.selectedDate;
      this.inputElement.focus();
    }
  }

  handleDateRangeSelect(event) {
    this.selectedStartDate = this.formatDate(
      event.detail.startDate,
      this.dateFormat
    );
    this.selectedEndDate = this.formatDate(
      event.detail.endDate,
      this.dateFormat
    );
    this.dropdownOpen = false;
    if (this.inputElement) {
      this.inputElement.value =
        this.selectedStartDate && this.selectedEndDate
          ? `${this.selectedStartDate} ${
              this.joinBy === "to" ? " to " : this.joinBy
            } ${this.selectedEndDate}`
          : "";
      this.inputElement.focus();
    }
  }

  handleDateRangeTimeSelect(event) {
    this.selectedStartDate = this.formatDate(
      event.detail.startDate,
      this.dateFormat
    );
    this.selectedEndDate = this.formatDate(
      event.detail.endDate,
      this.dateFormat
    );
    this.startTime = event.detail.startTime;
    this.endTime = event.detail.endTime;
    this.dropdownOpen = false;
    if (this.inputElement) {
      this.inputElement.value =
        this.selectedStartDate &&
        this.selectedEndDate &&
        this.startTime &&
        this.endTime
          ? `${this.selectedStartDate} ${this.startTime} ${this.joinBy} ${this.selectedEndDate} ${this.endTime}`
          : "";
      this.inputElement.focus();
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
          .dateFormat=${this.dateFormat}
        ></date-picker>
      `;
    } else if (this.selectedPicker === "daterange") {
      return html`
        <date-range-picker
          @date-range-updated=${this.handleDateRangeSelect}
          @click=${this.handleNavigationClick}
          .dateFormat=${this.dateFormat}
        ></date-range-picker>
      `;
    } else if (this.selectedPicker === "daterangetime") {
      return html`
        <date-range-time-picker
          @date-time-updated=${this.handleDateRangeTimeSelect}
          @click=${this.handleNavigationClick}
          .dateFormat=${this.dateFormat}
          .is24HourFormat=${this.is24HourFormat}
        ></date-range-time-picker>
      `;
    }
  }

  render() {
    return html`
      <div class="pl-input-group">
        <input
          type="text"
          class="form-control"
          placeholder=${this.selectedPicker === "daterange"
            ? `${this.dateFormat}${this.joinBy}${this.dateFormat}`
            : this.selectedPicker === "daterangetime"
            ? `${this.dateFormat} HH:MM ${this.joinBy} ${this.dateFormat} HH:MM`
            : this.dateFormat}
          value=${this.selectedPicker === "datepicker"
            ? this.selectedDate
            : this.selectedPicker === "daterange"
            ? this.selectedStartDate && this.selectedEndDate
              ? `${this.selectedStartDate}${this.joinBy}${this.selectedEndDate}`
              : ""
            : this.selectedPicker === "daterangetime"
            ? this.selectedStartDate &&
              this.selectedEndDate &&
              this.startTime &&
              this.endTime
              ? `${this.selectedStartDate} ${this.startTime}${this.joinBy}${this.selectedEndDate} ${this.endTime}`
              : ""
            : ""}
          @input=${this.handleInputChange}
        />
        <div class="pl-input-group-append">
          <button
            @click=${this.toggleDropdown}
            class="calendar-button pl-btn pl-input-group-text"
          >
            <i class="fas fa-calendar-alt"></i>
          </button>
        </div>
      </div>

      <div class="dropdown ${this.dropdownOpen ? "open" : ""}">
        <div class="dropdown-content">${this.renderPicker()}</div>
      </div>
    `;
  }
}

customElements.define("datepicker-manager", DatePickerManager);
