import { LitElement, html, css } from "lit";
import Fontawesome from "lit-fontawesome";
import { formStyles } from "../form-styles.js";
import { inputFieldStyles } from "../input-field/input-field-styles";
import { inputGroupStyles } from "../input-group/input-group-styles.js";
import { buttonStyles } from "../button/button-styles";
import { createPopper } from "@popperjs/core";

import "./datepicker";
import "./daterangepicker";
import "./dateRangeTimePicker";

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

      .dropdown-wrapper {
        position: relative;
      }

      .dropdown {
        z-index: 1;
        width: inherit;
      }

      .dropdown-content {
        display: none;
        background-color: white;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding: 5px;
        border-radius: 3px;
      }

      .dropdown.open .dropdown-content {
        display: block;
        width: inherit;
      }
    `,
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
  }

  firstUpdated() {
    this.inputElement = this.shadowRoot.querySelector(".form-control");
    document.addEventListener("click", this.handleOutsideClick);

    this.shadowRoot.addEventListener(
      "reset-picker",
      this.clearInputField.bind(this)
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.handleOutsideClick);
  }

  clearInputField(event) {
    if (this.inputElement) {
      this.inputElement.value = "";
      this.selectedDate = "";
      this.selectedStartDate = "";
      this.selectedEndDate = "";
      this.startTime = "";
      this.endTime = "";

      if (event && event.detail && event.detail.clearDuration) {
        this.duration = ""; // Clear the duration
      }
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
      placement: 'bottom-start',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 2],
          },
        },
        {
          name: 'preventOverflow',
          options: {
            boundary: 'viewport',
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
    this.destroyPopper();
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
          ? `${this.selectedStartDate} ${this.joinBy} ${this.selectedEndDate}`
          : "";
      this.inputElement.focus();
    }
    this.destroyPopper();
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
    this.destroyPopper();
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
          aria-label="Single Date Picker"
        ></date-picker>
      `;
    } else if (this.selectedPicker === "daterange") {
      return html`
        <date-range-picker
          @date-range-updated=${this.handleDateRangeSelect}
          @click=${this.handleNavigationClick}
          .dateFormat=${this.dateFormat}
          aria-label="Date Range Picker"
        ></date-range-picker>
      `;
    } else if (this.selectedPicker === "daterangetime") {
      return html`
        <date-range-time-picker
          @date-time-updated=${this.handleDateRangeTimeSelect}
          @click=${this.handleNavigationClick}
          .dateFormat=${this.dateFormat}
          .is24HourFormat=${this.is24HourFormat}
          .showDuration=${this.showDuration}
          aria-label="Date Range and Time Picker"
        ></date-range-time-picker>
      `;
    }
  }

  render() {
    return html`
      <div class="dropdown-wrapper">
        <div class="pl-input-group" role="group" aria-label="Date Picker Group">
          <label
            class="sr-only"
            for="${this.inputId}"
            aria-hidden="true"
            >Date Picker</label
          >
          <input
            id="${this.inputId}"
            type="text"
            class="form-control"
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
                ? `${this.selectedStartDate} ${this.startTime} ${this.joinBy} ${
                    this.selectedEndDate
                  } ${this.endTime} ${
                    this.showDuration && this.duration
                      ? `(${this.duration})`
                      : ""
                  }`
                : ""
              : ""}
            @input=${this.handleInputChange}
            aria-label="Selected Date"
            aria-describedby="datepicker-desc"
          />
          <div class="pl-input-group-append">
            <button
              @click=${this.toggleDropdown}
              class="calendar-button pl-btn pl-input-group-text"
              aria-label="Toggle Calendar Picker"
              aria-haspopup="dialog"
              aria-expanded=${this.dropdownOpen ? "true" : "false"}
            >
              <i class="fas fa-calendar-alt"></i>
            </button>
          </div>
        </div>

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
      </div>
    `;
  }
}

customElements.define("datepicker-manager", DatePickerManager);
