import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import Fontawesome from "lit-fontawesome";
import { buttonStyles } from "../button/button-styles";
import { inputGroupStyles } from "../input-group/input-group-styles";
import { inputFieldStyles } from "../input-field/input-field-styles";
import { utilitiesStyles } from "../utilities-styles";
import { timepickerStyles } from "./timepicker-styles";

class TimePicker extends LitElement {
  static styles = [
    Fontawesome,
    utilitiesStyles,
    buttonStyles,
    inputGroupStyles,
    inputFieldStyles,
    timepickerStyles,
    css``,
  ];

  static get properties() {
    return {
      ariaLabel: { type: String },
      ariaLabelledby: { type: String },
      id: { type: String },
      is24HourFormat: { type: Boolean },
      inputName: { type: String },
      size: { type: String },
      validationMessage: { type: String },
      display24HourOnly: { type: Boolean },
      display12HourOnly: { type: Boolean },
      hideTimepickerBtn: { type: Boolean },
      isValid: { type: Boolean },
      hideSeconds: { type: Boolean },
      inputWidth: { type: Number },
    };
  }

  constructor() {
    super();
    this.ariaLabel = "Time Picker";
    this.ariaLabelledby = "time-label";
    this.id = "time-input";
    this.inputName = "time";
    this.is24HourFormat = true;
    this.size = "";
    this.validationMessage = "";
    this.display24HourOnly = false;
    this.display12HourOnly = false;
    this.hideTimepickerBtn = false;
    this.isValid = true;
    this.hideSeconds = false;
    this.inputWidth = "";
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.display24HourOnly) {
      this.is24HourFormat = true;
    } else if (this.display12HourOnly) {
      this.is24HourFormat = false;
    }
  }

  render() {
    return html`
      <div class="time-picker">
        <label for="${this.id}" id="${this.ariaLabelledby}" class="sr-only"
          >Enter Time</label
        >
        <div
          class="pl-input-group${this.size === "sm"
            ? " pl-input-group-sm"
            : this.size === "lg"
            ? " pl-input-group-lg"
            : ""} mb-1"
        >
          <input
            type="text"
            id="${this.id}"
            name="${this.inputName}"
            class="form-control time-input"
            style=${ifDefined(this.inputWidth ? `width: ${this.inputWidth}px` : undefined)}
            placeholder="Enter Time"
            value="${this._getFormattedTime()}"
            role="textbox"
            aria-label="${this.ariaLabel}"
            aria-labelledby="${this.ariaLabelledby}"
            aria-controls="time-dropdown"
            aria-invalid="${!this.isValid}"
            aria-describedby="validation-message"
            maxlength="${this.is24HourFormat
              ? this.hideSeconds
                ? "5"
                : "8"
              : this.hideSeconds
              ? "8"
              : "11"}"
            @focus="${this._hideDropdown}"
            @input="${this._validateTimeInput}"
            @paste="${this._preventInvalidPaste}"
            @keypress="${this._handleEnterKey}"
            @keydown="${this._handleKeydown}"
          />
          <div class="pl-input-group-append">
            <button
              class="clear-button"
              aria-label="Clear Time"
              role="button"
              @click="${this._clearTime}"
            >
              <i class="fas fa-times-circle"></i>
            </button>
            ${this.hideTimepickerBtn
              ? ""
              : html`<button
                  class="time-icon pl-input-group-text pl-btn time-icon-btn"
                  aria-label="Open Timepicker"
                  role="button"
                  tabindex="0"
                  @click="${this._toggleDropdown}"
                  ?disabled="${!this.isValid}"
                >
                  <i class="fa fa-clock"></i>
                </button>`}
          </div>
        </div>

        <div
          class="validation-message ${this.validationMessage ? "" : "hidden"}"
          role="alert"
          id="validation-message"
        >
          ${this.validationMessage}
        </div>

        <div class="warning-message hidden" role="alert" id="warning-message">
          <i class="fa fa-exclamation-triangle"></i> Time values cannot exceed
          the limits.
        </div>

        <div
          class="time-dropdown${this.size === "sm"
            ? " sm"
            : this.size === "lg"
            ? " lg"
            : ""} hidden"
          role="listbox"
          aria-hidden="true"
          aria-labelledby="time-label"
          tabindex="0"
        >
          <div class="time-spinner-wrapper">
            <div class="time-spinner">
              <button
                class="arrow up"
                data-type="hour"
                aria-label="Increment Hour"
                role="button"
                @click="${this._increment}"
              >
                <i class="fas fa-chevron-up"></i>
              </button>
              <span
                class="hour-display"
                role="option"
                aria-selected="false"
                aria-activedescendant="active-hour"
                tabindex="0"
                id="active-hour"
              >
                00
              </span>
              <button
                class="arrow down"
                data-type="hour"
                aria-label="Decrement Hour"
                role="button"
                @click="${this._decrement}"
              >
                <i class="fas fa-chevron-down"></i>
              </button>
            </div>
            <div class="time-spinner-colon">
              <div class="dot"><i class="fa fa-circle"></i></div>
              <div class="dot"><i class="fa fa-circle"></i></div>
            </div>
            <div class="time-spinner">
              <button
                class="arrow up"
                data-type="minute"
                aria-label="Increment Minute"
                role="button"
                @click="${this._increment}"
              >
                <i class="fas fa-chevron-up"></i>
              </button>
              <span
                class="minute-display"
                role="option"
                aria-selected="false"
                aria-activedescendant="active-minute"
                tabindex="0"
                id="active-minute"
              >
                00
              </span>
              <button
                class="arrow down"
                data-type="minute"
                aria-label="Decrement Minute"
                role="button"
                @click="${this._decrement}"
              >
                <i class="fas fa-chevron-down"></i>
              </button>
            </div>
            ${this.hideSeconds
              ? ""
              : html`<div class="time-spinner-colon">
                    <div class="dot"><i class="fa fa-circle"></i></div>
                    <div class="dot"><i class="fa fa-circle"></i></div>
                  </div>
                  <div class="time-spinner">
                    <button
                      class="arrow up"
                      data-type="second"
                      aria-label="Increment Second"
                      role="button"
                      @click="${this._increment}"
                    >
                      <i class="fas fa-chevron-up"></i>
                    </button>
                    <span
                      class="second-display"
                      role="option"
                      aria-selected="false"
                      aria-activedescendant="active-second"
                      tabindex="0"
                      id="active-second"
                    >
                      00
                    </span>
                    <button
                      class="arrow down"
                      data-type="second"
                      aria-label="Decrement Second"
                      role="button"
                      @click="${this._decrement}"
                    >
                      <i class="fas fa-chevron-down"></i>
                    </button>
                  </div>`}

            <div class="time-spinner am-pm-spinner hidden">
              <button
                class="arrow up"
                data-type="ampm"
                aria-label="Increment AM/PM"
                role="button"
                @click="${this._increment}"
              >
                <i class="fas fa-chevron-up"></i>
              </button>
              <span
                class="ampm-display"
                role="option"
                aria-selected="false"
                tabindex="0"
                id="active-ampm"
                aria-activedescendant="active-ampm"
              >
                AM
              </span>
              <button
                class="arrow down"
                data-type="ampm"
                aria-label="Decrement AM/PM"
                role="button"
                @click="${this._decrement}"
              >
                <i class="fas fa-chevron-down"></i>
              </button>
            </div>
          </div>
          <div class="time-spinner-close">
            <button
              class="pl-btn pl-btn--outlined primary sm btntext close-button"
              aria-label="Close"
              @click="${this._hideDropdown}"
            >
              Close
            </button>
          </div>
        </div>
        ${!this.display24HourOnly && !this.display12HourOnly
          ? html`
              <button
                class="toggle-button pl-btn pl-btn--outlined default btntext sm mt-2"
                aria-label="Toggle 12/24 Hour Format"
                role="button"
                @click="${this._toggleFormat}"
                ?disabled="${!this.isValid}"
              >
                ${this.is24HourFormat
                  ? "Switch to 12 Hour Format"
                  : "Switch to 24 Hour Format"}
              </button>
            `
          : ""}
      </div>
    `;
  }

  firstUpdated() {
    this._setDefaultTime();
  }

  _toggleDropdown() {
    this._formatTime();
    const timeDropdown = this.shadowRoot.querySelector(".time-dropdown");
    timeDropdown.classList.toggle("hidden");
    timeDropdown.setAttribute(
      "aria-hidden",
      timeDropdown.classList.contains("hidden").toString()
    );
  }

  _hideDropdown() {
    const timeDropdown = this.shadowRoot.querySelector(".time-dropdown");
    timeDropdown.classList.add("hidden");
    timeDropdown.setAttribute("aria-hidden", "true");
  }

  _toggleFormat() {
    if (this.display24HourOnly || this.display12HourOnly) {
      return;
    }
    this._updateTimeFromInput(); // Ensure the current input is processed before toggling
    this.is24HourFormat = !this.is24HourFormat;
    this._convertTimeFormat();
    this._toggleAMPMSpinner();
    this._hideValidationMessage();
    this._hideWarningMessage();
    this._updateInput(); // Update input field value after toggling the format
  }

  _convertTimeFormat() {
    const timeInput = this.shadowRoot.querySelector(".time-input").value;
    let [hours, minutes, seconds] = timeInput.split(/[: ]/);
    const isPM = /PM$/.test(timeInput);
    let ampm = "";

    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);
    seconds = this.hideSeconds ? 0 : parseInt(seconds, 10);

    if (this.is24HourFormat) {
      if (isPM && hours < 12) {
        hours += 12;
      } else if (!isPM && hours === 12) {
        hours = 0;
      }
      ampm = "";
    } else {
      if (hours === 0) {
        hours = 12;
        ampm = "AM";
      } else if (hours === 12) {
        ampm = isPM ? "PM" : "AM";
      } else if (hours > 12) {
        hours -= 12;
        ampm = "PM";
      } else {
        ampm = "AM";
      }
    }

    this.shadowRoot.querySelector(".hour-display").textContent = hours
      .toString()
      .padStart(2, "0");
    this.shadowRoot.querySelector(".minute-display").textContent = minutes
      .toString()
      .padStart(2, "0");
    if (!this.hideSeconds) {
      this.shadowRoot.querySelector(".second-display").textContent = seconds
        .toString()
        .padStart(2, "0");
    }
    this.shadowRoot.querySelector(".ampm-display").textContent = ampm;
    this._updateInput();
  }

  _toggleAMPMSpinner() {
    const ampmSpinner = this.shadowRoot.querySelector(".am-pm-spinner");

    if (this.is24HourFormat || this.display24HourOnly) {
      ampmSpinner.classList.add("hidden");
      ampmSpinner.setAttribute("aria-hidden", "true");
    } else {
      ampmSpinner.classList.remove("hidden");
      ampmSpinner.setAttribute("aria-hidden", "false");
    }
  }

  _formatTime() {
    const timePattern = this.is24HourFormat
      ? this.hideSeconds
        ? /^(\d{1,2}):(\d{2})$/
        : /^(\d{1,2}):(\d{2}):(\d{2})$/
      : this.hideSeconds
      ? /^(\d{1,2}):(\d{2}) (AM|PM)$/
      : /^(\d{1,2}):(\d{2}):(\d{2}) (AM|PM)$/;
    const matches = this.shadowRoot
      .querySelector(".time-input")
      .value.match(timePattern);

    if (matches) {
      let hours = parseInt(matches[1], 10);
      const minutes = parseInt(matches[2], 10);
      const seconds = this.hideSeconds ? 0 : parseInt(matches[3], 10);

      this.shadowRoot.querySelector(".hour-display").textContent = hours
        .toString()
        .padStart(2, "0");
      this.shadowRoot.querySelector(".minute-display").textContent = minutes
        .toString()
        .padStart(2, "0");
      if (!this.hideSeconds) {
        this.shadowRoot.querySelector(".second-display").textContent = seconds
          .toString()
          .padStart(2, "0");
      }
      this._updateInput();
    }
  }

  _increment(event) {
    this._incrementDecrement(event, true);
  }

  _decrement(event) {
    this._incrementDecrement(event, false);
  }

  _incrementDecrement(event, increment) {
    const target = event.target
      .closest(".arrow")
      .parentElement.querySelector(
        `.${event.target.closest(".arrow").dataset.type}-display`
      );
    const isHour = target.classList.contains("hour-display");
    const isMinute = target.classList.contains("minute-display");
    const isSecond = target.classList.contains("second-display");
    const isAMPM = target.classList.contains("ampm-display");

    let value = isAMPM ? target.textContent : parseInt(target.textContent, 10);

    if (isAMPM) {
      value = increment
        ? value === "AM"
          ? "PM"
          : "AM"
        : value === "AM"
        ? "PM"
        : "AM";
    } else if (isHour || isMinute || isSecond) {
      if (increment) {
        value += 1;
        if (isHour) {
          if (this.is24HourFormat) {
            if (value === 24) {
              value = 0;
            }
          } else {
            if (value > 12) {
              value = 1;
            }
          }
        } else if ((isMinute || isSecond) && value > 59) {
          value = 0;
        }
      } else {
        value -= 1;
        if (isHour) {
          if (this.is24HourFormat) {
            if (value < 0) {
              value = 23;
            }
          } else {
            if (value < 1) {
              value = 12;
            }
          }
        } else if ((isMinute || isSecond) && value < 0) {
          value = 59;
        }
      }
    }

    target.textContent = isAMPM ? value : value.toString().padStart(2, "0");
    this._updateInput();
  }

  _updateInput() {
    const hours = parseInt(
      this.shadowRoot.querySelector(".hour-display").textContent,
      10
    );
    const minutes = this.shadowRoot
      .querySelector(".minute-display")
      .textContent.padStart(2, "0");
    const seconds = this.hideSeconds
      ? "00"
      : this.shadowRoot
          .querySelector(".second-display")
          .textContent.padStart(2, "0");
    const ampm = this.is24HourFormat
      ? ""
      : this.shadowRoot.querySelector(".ampm-display").textContent || "AM";

    const formattedHours = this.is24HourFormat
      ? hours.toString().padStart(2, "0")
      : (hours % 12 || 12).toString().padStart(2, "0");

    const selectedTime = this.is24HourFormat
      ? this.hideSeconds
        ? `${formattedHours}:${minutes}`
        : `${formattedHours}:${minutes}:${seconds}`
      : this.hideSeconds
      ? `${formattedHours}:${minutes} ${ampm}`
      : `${formattedHours}:${minutes}:${seconds} ${ampm}`;

    this.shadowRoot.querySelector(".time-input").value = selectedTime;
  }

  _updateDropdown() {
    const timePattern = this.is24HourFormat
      ? this.hideSeconds
        ? /^(\d{2}):(\d{2})$/
        : /^(\d{2}):(\d{2}):(\d{2})$/
      : this.hideSeconds
      ? /^(\d{2}):(\d{2}) (AM|PM)$/
      : /^(\d{2}):(\d{2}):(\d{2}) (AM|PM)$/;
    const matches = this.shadowRoot
      .querySelector(".time-input")
      .value.match(timePattern);

    if (matches) {
      let hours = parseInt(matches[1], 10);
      const minutes = parseInt(matches[2], 10);
      const seconds = this.hideSeconds ? 0 : parseInt(matches[3], 10);
      let ampm = this.is24HourFormat ? "" : matches[4];

      if (!this.is24HourFormat) {
        if (hours === 0) {
          hours = 12;
          ampm = "AM";
        } else if (hours === 12 && ampm === "PM") {
          ampm = "PM";
        } else if (hours === 12 && ampm === "AM") {
          ampm = "AM";
        } else if (hours > 12) {
          hours -= 12;
          ampm = "PM";
        } else {
          ampm = "AM";
        }
      }

      this.shadowRoot.querySelector(".hour-display").textContent = hours
        .toString()
        .padStart(2, "0");
      this.shadowRoot.querySelector(".minute-display").textContent = minutes
        .toString()
        .padStart(2, "0");
      if (!this.hideSeconds) {
        this.shadowRoot.querySelector(".second-display").textContent = seconds
          .toString()
          .padStart(2, "0");
      }
      this.shadowRoot.querySelector(".ampm-display").textContent = ampm;

      const ampmSpinner = this.shadowRoot.querySelector(".am-pm-spinner");
      if (this.is24HourFormat || this.display24HourOnly) {
        ampmSpinner.classList.add("hidden");
        ampmSpinner.setAttribute("aria-hidden", "true");
      } else {
        ampmSpinner.classList.remove("hidden");
        ampmSpinner.setAttribute("aria-hidden", "false");
      }
    }
  }

  _updateTimeFromInput() {
    let input = this.shadowRoot.querySelector(".time-input").value.trim();

    // Format the input to add leading zeros if necessary
    input = input
      .split(":")
      .map((part) => part.padStart(2, "0"))
      .join(":");

    if (!this._isValidInput(input)) {
      this.isValid = false;
      this._toggleButtons();
      return;
    }

    this.shadowRoot.querySelector(".time-input").value = input;

    this.isValid = true;
    this._toggleButtons();
    this._hideValidationMessage();
    this._hideWarningMessage();
    this._updateDropdown();
    // Ensure the AM/PM value is retained if the format is 12-hour
    const ampmMatch = input.match(/(AM|PM)$/);
    if (ampmMatch) {
      this.shadowRoot.querySelector(".ampm-display").textContent = ampmMatch[1];
    }
    // Update input field value after updating dropdown
    this._updateInput();
  }

  forceTimeUpdate() {
    this._updateTimeFromInput();
  }

  _validateTimeInput() {
    const input = this.shadowRoot.querySelector(".time-input").value.trim();
    this.isValid = this._isValidInput(input);
    this._toggleButtons();
  }

  _handleEnterKey(event) {
    if (event.key === "Enter" && this.isValid) {
      this._updateTimeFromInput();
    }
  }

  _handleKeydown(event) {
    const input = event.target;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    if (event.key === "Backspace" && start > 0) {
      event.preventDefault();
      const value = input.value;
      const before = value.substring(0, start - 1);
      const after = value.substring(end);
      input.value = before + after;
      input.setSelectionRange(start - 1, start - 1);
      this.isValid = true;
      this._toggleButtons();
    } else if (event.key === "Delete") {
      event.preventDefault();
    }
  }

  _clearTime() {
    const timeInput = this.shadowRoot.querySelector(".time-input");
    timeInput.value = this.is24HourFormat
      ? this.hideSeconds
        ? "00:00"
        : "00:00:00"
      : this.hideSeconds
      ? "12:00 AM"
      : "12:00:00 AM";
    this._updateDropdown();
    this._hideValidationMessage();
    this._hideWarningMessage();
    this.isValid = true;
    this._toggleButtons();

    if (this.is24HourFormat) {
      this.shadowRoot.querySelector(".hour-display").textContent = "00";
      this.shadowRoot.querySelector(".ampm-display").textContent = "";
    } else {
      this.shadowRoot.querySelector(".hour-display").textContent = "12";
      this.shadowRoot.querySelector(".ampm-display").textContent = "AM";
    }
    if (!this.hideSeconds) {
      this.shadowRoot.querySelector(".second-display").textContent = "00";
    }
  }

  _showValidationMessage(message) {
    this.validationMessage = message;
    this.requestUpdate(); // Ensure Lit renders the changes
  }

  _hideValidationMessage() {
    this.validationMessage = "";
    this.requestUpdate(); // Ensure Lit renders the changes
  }

  _isValidInput(input) {
    const timePattern = this.is24HourFormat
      ? this.hideSeconds
        ? /^(\d{1,2}):(\d{2})$/
        : /^(\d{1,2}):(\d{2}):(\d{2})$/
      : this.hideSeconds
      ? /^(\d{1,2}):(\d{2}) (AM|PM)$/
      : /^(\d{1,2}):(\d{2}):(\d{2}) (AM|PM)$/;
    const matches = input.match(timePattern);

    if (!matches) {
      this._showValidationMessage(
        this.is24HourFormat
          ? this.hideSeconds
            ? "Invalid time format. Correct format is 00:00."
            : "Invalid time format. Correct format is 00:00:00."
          : this.hideSeconds
          ? "Invalid time format. Correct format is 00:00 AM(or PM)."
          : "Invalid time format. Correct format is 00:00:00 AM(or PM)."
      );
      return false;
    }

    const hours = parseInt(matches[1], 10);
    const minutes = parseInt(matches[2], 10);
    const seconds = this.hideSeconds ? 0 : parseInt(matches[3], 10);
    const ampm = this.is24HourFormat ? "" : matches[4];

    if (
      (this.is24HourFormat && hours > 23) ||
      (!this.is24HourFormat && (hours > 12 || hours < 1))
    ) {
      this._showWarningMessage();
      return false;
    }

    if (minutes > 59 || (!this.hideSeconds && seconds > 59)) {
      this._showWarningMessage();
      return false;
    }

    this._hideValidationMessage();
    this._hideWarningMessage();
    return true;
  }

  _showWarningMessage() {
    const warningMessageElement =
      this.shadowRoot.querySelector(".warning-message");
    warningMessageElement.classList.remove("hidden");
  }

  _hideWarningMessage() {
    const warningMessageElement = this.shadowRoot.querySelector(".warning-message");
    if (warningMessageElement) {
      warningMessageElement.classList.add("hidden");
    }
  }

  _setDefaultTime() {
    const timeInput = this.shadowRoot.querySelector(".time-input");
    timeInput.value = this.is24HourFormat
      ? this.hideSeconds
        ? "00:00"
        : "00:00:00"
      : this.hideSeconds
      ? "12:00 AM"
      : "12:00:00 AM";
    this._updateDropdown();
  }

  _toggleButtons() {
    const toggleButton = this.shadowRoot.querySelector(".toggle-button");
    const timeIconBtn = this.shadowRoot.querySelector(".time-icon-btn");

    if (toggleButton) {
      if (this.isValid) {
        toggleButton.removeAttribute("disabled");
      } else {
        toggleButton.setAttribute("disabled", "disabled");
      }
    }

    if (timeIconBtn) {
      if (this.isValid) {
        timeIconBtn.removeAttribute("disabled");
      } else {
        timeIconBtn.setAttribute("disabled", "disabled");
      }
    }
  }

  _getFormattedTime() {
    const hourDisplay = this.shadowRoot.querySelector(".hour-display");
    const minuteDisplay = this.shadowRoot.querySelector(".minute-display");
    const secondDisplay = this.shadowRoot.querySelector(".second-display");
    const ampmDisplay = this.shadowRoot.querySelector(".ampm-display");

    const hours = hourDisplay ? hourDisplay.textContent : "00";
    const minutes = minuteDisplay ? minuteDisplay.textContent : "00";
    const seconds = this.hideSeconds
      ? ""
      : `:${secondDisplay ? secondDisplay.textContent : "00"}`;
    const ampm = this.is24HourFormat
      ? ""
      : ` ${ampmDisplay ? ampmDisplay.textContent : "AM"}`;

    return `${hours}:${minutes}${seconds}${ampm}`;
  }
}

customElements.define("time-picker", TimePicker);
