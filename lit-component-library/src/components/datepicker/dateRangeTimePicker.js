import { LitElement, html, css } from "lit";
import Fontawesome from "lit-fontawesome";
import { datepickerStyles } from "./datepicker-styles.js";
import { utilitiesStyles } from "../utilities-styles.js";
import { formStyles } from "../form-styles.js";
import { selectFieldStyles } from "../select-field/select-field-styles.js";
import { plSelectFieldStyles } from "../pl-select-field/pl-select-field-styles.js";
import { plInputFieldStyles } from "../pl-input-field/pl-input-field-styles.js";

class DateRangeTimePicker extends LitElement {
  static styles = [
    Fontawesome,
    formStyles,
    selectFieldStyles,
    plSelectFieldStyles,
    plInputFieldStyles,
    utilitiesStyles,
    datepickerStyles,
    css``,
  ];

  static get properties() {
    return {
      ariaLabel: { type: String },
      dateFormat: { type: String },
      startTime: { type: String },
      endTime: { type: String },
      is24HourFormat: { type: Boolean },
      okButtonDisabled: { type: Boolean },
      showDuration: { type: Boolean },
      startDate: { type: Object },
      endDate: { type: Object },
      plumage: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.ariaLabel = "";
    this.dateFormat = "Y-m-d";
    this.startDate = null;
    this.endDate = null;
    this.is24HourFormat = true;
    this._setDefaultTimes();
    this.currentStartMonth = new Date().getMonth();
    this.currentStartYear = new Date().getFullYear();
    this.currentEndMonth = this.currentStartMonth + 1;
    this.currentEndYear = this.currentStartYear;
    this.focusedDate = new Date();
    this.okButtonDisabled = true;
    this.showDuration = false;
    this.plumage = false;

    // Add this flag to prevent recursion
    this.isResetting = false;

    if (this.currentEndMonth > 11) {
      this.currentEndMonth = 0;
      this.currentEndYear += 1;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.is24HourFormat = this.getAttribute("is24HourFormat") !== "false";
    this._setDefaultTimes();
    document.addEventListener("click", this.handleDocumentClick);

    // Listen for the reset-picker event
    this.addEventListener("reset-picker", this.resetCalendar);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.handleDocumentClick);

    // Remove the reset-picker event listener when the component is disconnected
    this.removeEventListener("reset-picker", this.resetCalendar);
  }

  updated(changedProperties) {
    if (changedProperties.has("is24HourFormat")) {
      this._setDefaultTimes();
    }
  }

  _setDefaultTimes() {
    if (this.is24HourFormat) {
      this.startTime = "00:00";
      this.endTime = "00:00";
    } else {
      this.startTime = "12:00";
      this.endTime = "12:00";
    }
    this.requestUpdate(); // Ensure the UI updates with the new time values
  }

  firstUpdated() {
    this.syncMonthYearSelectors();
  }

  renderSelects() {
    return html`
      <label id="monthSelectField" class="sr-only visually-hidden" for="months">
        Select Month
      </label>
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

      <label id="yearSelectField" class="sr-only visually-hidden" for="year">
        Select Year
      </label>
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
      <div class="pl-input-container mr-2" @click="${this.handleInteraction}">
        <label
          id="monthSelectField"
          class="sr-only visually-hidden"
          for="months"
        >
          Select Month
        </label>
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

      <div class="pl-input-container mr-2" @click="${this.handleInteraction}">
        <label id="yearSelectField" class="sr-only visually-hidden" for="year">
          Select Year
        </label>
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

  render() {
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
            aria-controls="calendar-grid-${this.currentStartMonth}-${this
              .currentStartYear}"
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
                    detail: { clearDuration: true },
                  })
                )}
              class="reset-btn"
              class="reset-btn"
              aria-label="Reset Calendar"
              aria-controls="calendar-grid-${this.currentStartMonth}-${this
                .currentStartYear}"
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
            aria-controls="calendar-grid-${this.currentStartMonth}-${this
              .currentStartYear}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path
                d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5 45.3 0l160 160z"
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
            ${this.renderCalendar(
              this.currentStartMonth,
              this.currentStartYear
            )}
            ${this.renderCalendar(this.currentEndMonth, this.currentEndYear)}
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
          >
            <div id="date-ranges" class="date-ranges">
              <span class="start-end-ranges">
                <span class="start-date">N/A</span>
                ${this.plumage
                  ? html`
                      <div
                        class="pl-input-container"
                        @click="${this.handleInteraction}"
                        role="presentation"
                        aria-labelledby="start-time"
                      >
                        <input
                          type="text"
                          class="form-control time-input"
                          .value="${this.is24HourFormat
                            ? this.startTime
                            : this.formatTime(this.startTime)}"
                          @input="${this._handleTimeInputChange}"
                          @focus="${this.handleInteraction}"
                          @blur="${this.handleDocumentClick}"
                          data-type="start"
                          maxlength="5"
                          aria-label="Start Time"
                          aria-invalid="${this._isValidTime(this.startTime)
                            ? "false"
                            : "true"}"
                        />
                        <div class="b-underline" role="presentation">
                          <div
                            class="b-focus"
                            role="presentation"
                            aria-hidden="true"
                          ></div>
                        </div>
                      </div>
                    `
                  : html`
                      <input
                        type="text"
                        class="form-control time-input"
                        .value="${this.is24HourFormat
                          ? this.startTime
                          : this.formatTime(this.startTime)}"
                        @input="${this._handleTimeInputChange}"
                        data-type="start"
                        maxlength="5"
                        aria-label="Start Time"
                        aria-invalid="${this._isValidTime(this.startTime)
                          ? "false"
                          : "true"}"
                      />
                    `}
                ${!this.is24HourFormat
                  ? html`<span
                      class="am-pm-toggle"
                      @click="${this._toggleAmPm}"
                      data-type="start"
                      role="button"
                      aria-label="Toggle AM/PM"
                    >
                      ${this._getAmPm(this.startTime)}
                    </span>`
                  : ""}
                <span class="to-spacing">to</span>
                <span class="end-date">N/A</span>
                ${this.plumage
                  ? html` <div
                      class="pl-input-container"
                      @click="${this.handleInteraction}"
                      role="presentation"
                      aria-labelledby="start-time"
                    >
                      <input
                        type="text"
                        class="form-control time-input"
                        .value="${this.is24HourFormat
                          ? this.endTime
                          : this.formatTime(this.endTime)}"
                        @input="${this._handleTimeInputChange}"
                        @focus="${this.handleInteraction}"
                        @blur="${this.handleDocumentClick}"
                        data-type="end"
                        maxlength="5"
                        aria-label="End Time"
                        aria-invalid="${this._isValidTime(this.endTime)
                          ? "false"
                          : "true"}"
                      />
                      <div class="b-underline" role="presentation">
                        <div
                          class="b-focus"
                          role="presentation"
                          aria-hidden="true"
                        ></div>
                      </div>
                    </div>`
                  : html` <input
                      type="text"
                      class="form-control time-input"
                      .value="${this.is24HourFormat
                        ? this.endTime
                        : this.formatTime(this.endTime)}"
                      @input="${this._handleTimeInputChange}"
                      data-type="end"
                      maxlength="5"
                      aria-label="End Time"
                      aria-invalid="${this._isValidTime(this.endTime)
                        ? "false"
                        : "true"}"
                    />`}
                ${!this.is24HourFormat
                  ? html`<span
                      class="am-pm-toggle"
                      @click="${this._toggleAmPm}"
                      data-type="end"
                      role="button"
                      aria-label="Toggle AM/PM"
                    >
                      ${this._getAmPm(this.endTime)}
                    </span>`
                  : ""}
              </span>
              ${this.showDuration ? html`<span class="duration"></span>` : ""}
            </div>
            <div class="warning-message hide" aria-live="assertive"></div>
          </div>
        </div>

        <div class="ok-button">
          <button
            @click="${this._handleOkClick}"
            class="btn btn-primary"
            ?disabled="${this.okButtonDisabled}"
            aria-disabled="${this.okButtonDisabled ? "true" : "false"}"
            aria-label="Confirm date and time selection"
          >
            OK
          </button>
        </div>
      </div>
    `;
  }

  handleInteraction(event) {
    event.stopPropagation();
    const container = event.target.closest(".pl-input-container");
    const bFocusDiv = container ? container.querySelector(".b-focus") : null;

    if (bFocusDiv) {
      if (
        event.target.tagName.toLowerCase() === "select" ||
        event.target.tagName.toLowerCase() === "input"
      ) {
        bFocusDiv.style.width = "100%";
        bFocusDiv.style.left = "0";
      } else {
        bFocusDiv.style.width = "0";
        bFocusDiv.style.left = "50%";
      }
    }
  }

  handleFocus(event) {
    this.handleInteraction(event);
  }

  handleBlur(event) {
    this.handleDocumentClick();
  }

  handleDocumentClick() {
    if (this.shadowRoot) {
      const bFocusDivs = this.shadowRoot.querySelectorAll(".b-focus");

      if (bFocusDivs.length > 0) {
        bFocusDivs.forEach((bFocusDiv) => {
          bFocusDiv.style.width = "0";
          bFocusDiv.style.left = "50%";
        });
      }
    }
  }

  _handleTimeInputChange(event) {
    const inputType = event.target.dataset.type;
    let timeValue = event.target.value.replace(/[^0-9]/g, "");

    const cursorPosition = event.target.selectionStart;

    if (timeValue.length === 0) {
      if (inputType === "start") {
        this.startTime = "";
      } else if (inputType === "end") {
        this.endTime = "";
      }
      this._validateTime();
      this._updateOkButtonState();
      this.requestUpdate();
      return;
    }

    if (timeValue.length < 3) {
      event.target.value = timeValue;
      event.target.setSelectionRange(cursorPosition, cursorPosition);
      return;
    }

    if (timeValue.length >= 3) {
      timeValue = `${timeValue.slice(0, 2)}:${timeValue.slice(2, 4)}`;
    }

    timeValue = timeValue.slice(0, 5);

    if (inputType === "start") {
      this.startTime = timeValue;
    } else if (inputType === "end") {
      this.endTime = timeValue;
    }

    const timesValid = this._validateTime();

    event.target.value = timeValue;

    const newCursorPosition = Math.min(cursorPosition, timeValue.length);
    event.target.setSelectionRange(newCursorPosition, newCursorPosition);

    this._updateOkButtonState();
    this._updateDuration();
  }

  _validateTime() {
    const warningMessageElement =
      this.shadowRoot.querySelector(".warning-message");
    warningMessageElement.classList.add("hide");
    warningMessageElement.textContent = "";

    if (!this.startTime || !this.endTime) {
      warningMessageElement.textContent = "Times cannot be empty.";
      warningMessageElement.classList.remove("hide");
      return false;
    }

    if (this.startTime && !this._isValidTime(this.startTime)) {
      warningMessageElement.textContent =
        "Start time is invalid. Format - HH:MM and values cannot exceed the limits.";
      warningMessageElement.classList.remove("hide");
      return false;
    }

    if (this.endTime && !this._isValidTime(this.endTime)) {
      warningMessageElement.textContent =
        "End time is invalid. Format - HH:MM and values cannot exceed the limits.";
      warningMessageElement.classList.remove("hide");
      return false;
    }

    return true;
  }

  _isValidTime(time) {
    const timePattern24 = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const timePattern12 = /^(0[1-9]|1[0-2]):([0-5]\d)$/;
    return this.is24HourFormat
      ? timePattern24.test(time)
      : timePattern12.test(time);
  }

  _getAmPm(time) {
    const hours = parseInt(time.split(":")[0], 10);
    return hours >= 12 ? "PM" : "AM";
  }

  _toggleAmPm(event) {
    const inputType = event.target.dataset.type;
    let time = inputType === "start" ? this.startTime : this.endTime;

    let [hours, minutes] = time.split(":");
    let period = this._getAmPm(time);

    if (period === "AM") {
      period = "PM";
    } else {
      period = "AM";
    }

    if (hours === "12") {
      hours = period === "AM" ? "00" : "12";
    } else {
      if (period === "PM" && hours !== "12") {
        hours = (parseInt(hours, 10) + 12).toString().padStart(2, "0");
      } else if (period === "AM" && hours !== "12") {
        hours = (parseInt(hours, 10) - 12).toString().padStart(2, "0");
      }
    }

    const updatedTime = `${hours}:${minutes}`;

    if (inputType === "start") {
      this.startTime = updatedTime;
    } else if (inputType === "end") {
      this.endTime = updatedTime;
    }

    this.requestUpdate();
    this._updateDuration();
  }

  _toggleTimeAmPm(time) {
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);

    if (!this.is24HourFormat) {
      if (hours === 12) {
        hours = 0;
      } else if (hours === 0) {
        hours = 12;
      } else {
        hours = hours >= 12 ? hours - 12 : hours + 12;
      }
    } else {
      hours = hours >= 12 ? hours - 12 : hours + 12;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  }

  formatTime(time) {
    if (!time) return "";

    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);

    if (!this.is24HourFormat) {
      const ampm = this._getAmPm(time);
      if (hours === 0) {
        hours = 12;
      } else if (hours > 12) {
        hours -= 12;
      }
      return `${hours.toString().padStart(2, "0")}:${minutes}`;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  }

  _convertTo24HourFormat(time, ampm) {
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);
    if (ampm === "PM" && hours !== 12) {
      hours += 12;
    } else if (ampm === "AM" && hours === 12) {
      hours = 0;
    }
    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  }

  _handleOkClick() {
    const warningMessageElement =
      this.shadowRoot.querySelector(".warning-message");
    warningMessageElement.textContent = "";

    if (!this.startTime || !this.endTime) {
      warningMessageElement.textContent = "Times cannot be empty.";
      return;
    }

    const formattedStartDate = this.startDate
      ? this.formatDateAccordingToSelectedFormat(this.startDate)
      : null;

    const formattedEndDate = this.endDate
      ? this.formatDateAccordingToSelectedFormat(this.endDate)
      : null;

    if (!formattedStartDate || !formattedEndDate) {
      console.error("Invalid date range selection");
      return;
    }

    const formattedStartTime = this.is24HourFormat
      ? this.startTime
      : `${this.formatTime(this.startTime)} ${this._getAmPm(this.startTime)}`;

    const formattedEndTime = this.is24HourFormat
      ? this.endTime
      : `${this.formatTime(this.endTime)} ${this._getAmPm(this.endTime)}`;

    let durationText = "";

    if (this.showDuration && this.startDate && this.endDate) {
      const startDateTime = new Date(
        `${this.startDate.toISOString().split("T")[0]}T${this.startTime}`
      );
      const endDateTime = new Date(
        `${this.endDate.toISOString().split("T")[0]}T${this.endTime}`
      );

      const diffMs = endDateTime - startDateTime;
      const diffHours = Math.round(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHours / 24);
      const remainingHours = diffHours % 24;

      if (diffDays > 0) {
        durationText += `${diffDays}d `;
      }
      durationText += `${remainingHours}h`;
    }

    this.duration = this.showDuration ? durationText : "";

    this.dispatchEvent(
      new CustomEvent("date-time-updated", {
        detail: {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          duration: this.duration,
        },
      })
    );
  }

  formatDateAccordingToSelectedFormat(date) {
    if (!date) return null;

    switch (this.dateFormat) {
      case "Y-m-d":
        return this.formatDateYmd(date);
      case "M-d-Y":
        return this.formatDateMDY(date);
      case "Long Date":
        return this.formatDateLong(date);
      case "ISO":
        return this.formatISODate(date);
      default:
        return this.formatDateYmd(date);
    }
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

  resetCalendar(event) {
    if (this.isResetting) {
      return; // Prevent further recursion
    }

    this.isResetting = true; // Set flag to indicate we are resetting

    const now = new Date();
    this.startDate = null;
    this.endDate = null;
    this.duration = "";
    this._setDefaultTimes(); // Reset start and end times to default values
    this.currentStartMonth = now.getMonth();
    this.currentStartYear = now.getFullYear();
    this.currentEndMonth = this.currentStartMonth + 1;
    this.currentEndYear = this.currentStartYear;
    this.okButtonDisabled = true;
    this.startTime = this.is24HourFormat ? "00:00" : "12:00";
    this.endTime = this.is24HourFormat ? "00:00" : "12:00";

    if (this.currentEndMonth > 11) {
      this.currentEndMonth = 0;
      this.currentEndYear++;
    }

    const durationElement = this.shadowRoot.querySelector(".duration");
    if (durationElement) {
      durationElement.textContent = "";
    }

    // Dispatch a reset-picker event to all child components if necessary
    if (!event || !event.detail || !event.detail.preventReset) {
      this.dispatchEvent(
        new CustomEvent("reset-picker", {
          bubbles: true,
          composed: true,
          detail: { clearDuration: true, preventReset: true },
        })
      );
    }

    // Force the calendar to re-render the UI
    this.requestUpdate(); // Request an update to trigger a re-render

    this.updateComplete // Wait for the update to complete
      .then(() => {
        this.syncMonthYearSelectors(); // Ensure the month and year selectors are reset
        this.updateSelectedRange(); // Ensure the selected range is cleared
        this.isResetting = false; // Reset the flag after everything is done
      })
      .catch((error) => {
        console.error("Error in resetCalendar:", error);
        this.isResetting = false; // Reset the flag even if there's an error
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
      if (!event.shiftKey) {
        event.preventDefault();
        this.shadowRoot.querySelector(".time-input")?.focus();
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

    this.updateSelectedRange();
    this._updateOkButtonState();
    this.requestUpdate();
    this._updateDuration();
  }

  updateSelectedRange() {
    const allItems = this.shadowRoot.querySelectorAll(".calendar-grid-item");

    allItems.forEach((item) => {
      const itemDate = new Date(item.getAttribute("data-date"));
      const spanElement = item.querySelector("span");

      item.classList.remove("selected-range", "selected-range-active");
      spanElement.classList.remove("focus");

      if (
        this.isDateInRange(itemDate) &&
        !item.classList.contains("previous-month-day") &&
        !item.classList.contains("next-month-day")
      ) {
        item.classList.add("selected-range");
      }

      if (
        this.isStartOrEndDate(itemDate) &&
        !item.classList.contains("previous-month-day") &&
        !item.classList.contains("next-month-day")
      ) {
        item.classList.add("selected-range-active");
      }
    });

    this.updateDisplayedDateRange();
  }

  updateDisplayedDateRange() {
    const startDateElement = this.shadowRoot.querySelector(".start-date");
    const endDateElement = this.shadowRoot.querySelector(".end-date");

    const formattedStartDate = this.startDate
      ? this.formatDateAccordingToSelectedFormat(this.startDate)
      : "N/A";

    const formattedEndDate = this.endDate
      ? this.formatDateAccordingToSelectedFormat(this.endDate)
      : "N/A";

    startDateElement.textContent = formattedStartDate;
    endDateElement.textContent = formattedEndDate;
  }

  isToday(date) {
    const today = new Date();
    return (
      date.getUTCFullYear() === today.getUTCFullYear() &&
      date.getUTCMonth() === today.getUTCMonth() &&
      date.getUTCDate() === today.getUTCDate()
    );
  }

  isDateInRange(date) {
    return (
      this.startDate &&
      this.endDate &&
      date >= this.startDate &&
      date <= this.endDate
    );
  }

  isStartOrEndDate(date) {
    return (
      (this.startDate && date.getTime() === this.startDate.getTime()) ||
      (this.endDate && date.getTime() === this.endDate.getTime())
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
    const timesValid = this._validateTime();

    this.okButtonDisabled = !(startDateValid && endDateValid && timesValid);
  }

  _updateDuration() {
    if (!this.showDuration) {
      return;
    }

    const durationElement = this.shadowRoot.querySelector(".duration");

    if (
      durationElement &&
      this.startDate &&
      this.endDate &&
      this.startTime &&
      this.endTime
    ) {
      const startDateTime = new Date(
        `${this.startDate.toISOString().split("T")[0]}T${this.startTime}`
      );
      const endDateTime = new Date(
        `${this.endDate.toISOString().split("T")[0]}T${this.endTime}`
      );

      const diffMs = endDateTime - startDateTime;
      const diffHours = Math.round(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHours / 24);
      const remainingHours = diffHours % 24;

      let durationText = "";
      if (diffDays > 0) {
        durationText += `${diffDays}d `;
      }
      durationText += `${remainingHours}h`;

      durationElement.textContent = `(${durationText})`;
    } else if (durationElement) {
      durationElement.textContent = "";
    }
  }
}

customElements.define("date-range-time-picker", DateRangeTimePicker);
