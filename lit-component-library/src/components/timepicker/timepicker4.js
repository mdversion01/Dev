import { LitElement, html, css } from 'lit';

class TimePicker extends LitElement {
  static styles = css`
    /* Using Bootstrap 5 as main CSS framework */

    .example {
      position: relative;
      padding: 1rem;
      margin: 1rem;
      border: 1px solid #dee2e6;
    }

    .time-picker {
      position: relative;
    }

    .time-input,
    .time-icon {
      display: inline-block;
    }

    .time-icon {
      cursor: pointer;
      border-width: 0;
      border-left-width: 1px;
      border-left-color: #ccc;
    }

    .time-dropdown {
      position: absolute;
      top: 38px;
      background-color: #fff;
      border: 1px solid #ccc;
      padding: 5px;
      z-index: 1;
    }

    .time-dropdown.hidden {
      display: none;
    }

    .time-spinner {
      border: 1px solid #ccc;
      border-radius: 0.3rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      margin: 0 0.5rem;
    }

    .time-picker .input-group {
      border: 1px solid #ccc;
      border-radius: 0.375rem;
    }

    .time-picker .input-group .form-control {
      border: none;
    }

    .time-spinner-wrapper {
      display: flex;
      margin-bottom: 0.5rem;
    }

    .time-spinner.am-pm-spinner {
      border: 1px solid #ccc;
      border-radius: 0.3rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      margin: 0 0.5rem;
    }

    .am-pm-spinner.hidden {
      display: none;
    }

    .time-spinner-colon {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .time-spinner-colon .dot {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin: 0.5rem 0;
      font-size: 0.5rem;
    }

    .time-spinner-close {
      display: flex;
      justify-content: flex-end;
      width: 100%;
    }

    input[type='number'] {
      width: 40px;
    }

    button.arrow {
      align-items: center;
      cursor: pointer;
      display: flex;
      justify-content: center;
      padding: 0.25rem 0.5rem;
      border: none;
      background-color: #fff;
    }

    button.arrow:hover {
      background-color: #e1e1e1;
    }

    button.arrow.up {
      border-bottom: 1px solid #ccc;
      border-radius: 0.3rem 0.3rem 0 0;
    }
    button.arrow.down {
      border-top: 1px solid #ccc;
      border-radius: 0 0 0.3rem 0.3rem;
    }

    .clear-button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      padding: 0.25rem 0.5rem;
      color: #959595;
      margin-left: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      user-select: none;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    .clear-button:hover {
      color: #ac0000;
    }

    .validation-message,
    .warning-message {
      color: #ac0000;
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }
  `;

  constructor() {
    super();
    this.is24HourFormat = true;
    this.validationMessage = '';
    this.hours = '00';
    this.minutes = '00';
    this.seconds = '00';
    this.ampm = 'AM';
  }

  firstUpdated() {
    this.timeIcon = this.shadowRoot.querySelector('.time-icon');
    this.timeDropdown = this.shadowRoot.querySelector('.time-dropdown');
    this.closeButton = this.shadowRoot.querySelector('.close-button');
    this.hourDisplay = this.shadowRoot.querySelector('.hour-display');
    this.minuteDisplay = this.shadowRoot.querySelector('.minute-display');
    this.secondDisplay = this.shadowRoot.querySelector('.second-display');
    this.ampmDisplay = this.shadowRoot.querySelector('.ampm-display');
    this.timeInput = this.shadowRoot.querySelector('.time-input');
    this.clearButton = this.shadowRoot.querySelector('.clear-button');
    this.toggleButton = this.shadowRoot.querySelector('.toggle-button');

    this.timeIcon.addEventListener('click', this.toggleDropdown.bind(this));
    document.addEventListener('click', this.closeDropdown.bind(this));
    this.timeInput.addEventListener('focus', this.hideDropdown.bind(this));
    this.timeInput.addEventListener('input', this.updateTimeFromInput.bind(this));
    this.timeInput.addEventListener('paste', this.preventInvalidPaste.bind(this));
    this.timeInput.addEventListener('keypress', this.handleEnterKey.bind(this));
    this.clearButton.addEventListener('click', this.clearTime.bind(this));
    this.closeButton.addEventListener('click', this.hideDropdown.bind(this));
    this.toggleButton.addEventListener('click', this.toggleFormat.bind(this));

    this.shadowRoot.querySelectorAll('.arrow').forEach((arrow) => {
      arrow.addEventListener('click', (e) => this.incrementDecrement(e.target));
    });
  }

  toggleDropdown() {
    this.timeDropdown.classList.toggle('hidden');
    this.timeDropdown.setAttribute(
      'aria-hidden',
      this.timeDropdown.classList.contains('hidden').toString()
    );
  }

  closeDropdown(event) {
    const target = event.target;
    if (!this.timeIcon.contains(target) && !this.timeDropdown.contains(target)) {
      this.timeDropdown.classList.add('hidden');
      this.timeDropdown.setAttribute('aria-hidden', 'true');
    }
  }

  hideDropdown() {
    this.timeDropdown.classList.add('hidden');
    this.timeDropdown.setAttribute('aria-hidden', 'true');
  }

  toggleFormat() {
    this.is24HourFormat = !this.is24HourFormat;
    this.toggleAMPMSpinner();
    this.formatTime();
    this.hideValidationMessage();
    this.hideWarningMessage();
  }

  toggleAMPMSpinner() {
    const ampmSpinner = this.shadowRoot.querySelector('.am-pm-spinner');

    if (this.is24HourFormat) {
      ampmSpinner.classList.add('hidden');
      ampmSpinner.setAttribute('aria-hidden', 'true');
      this.ampm = ' Z';
    } else {
      ampmSpinner.classList.remove('hidden');
      ampmSpinner.setAttribute('aria-hidden', 'false');
    }

    this.formatTime();
  }

  formatTime() {
    let hours = parseInt(this.hourDisplay.textContent, 10);
    const minutes = parseInt(this.minuteDisplay.textContent, 10);
    const seconds = parseInt(this.secondDisplay.textContent, 10);
    let ampm = this.ampm;

    if (!this.is24HourFormat) {
      if (hours === 0 && ampm === 'AM') {
        hours = 12;
      } else if (ampm === 'PM' && hours !== 12) {
        hours += 12;
      } else if (ampm === 'AM' && hours === 12) {
        hours = 0;
      }
    } else {
      if (hours === 0) {
        ampm = 'AM';
        hours = 12;
      } else if (hours === 12) {
        ampm = 'PM';
      } else if (hours > 12) {
        ampm = 'PM';
      }
    }

    this.hourDisplay.textContent = hours.toString().padStart(2, '0');
    this.minuteDisplay.textContent = minutes.toString().padStart(2, '0');
    this.secondDisplay.textContent = seconds.toString().padStart(2, '0');
    this.ampmDisplay.textContent = ampm;

    this.updateInput();
  }

  updateInput() {
    const hours = parseInt(this.hourDisplay.textContent, 10);
    const minutes = this.minuteDisplay.textContent.padStart(2, '0');
    const seconds = this.secondDisplay.textContent.padStart(2, '0');
    const ampm = this.is24HourFormat ? 'Z' : this.ampmDisplay.textContent || 'AM';

    const formattedHours = this.is24HourFormat
      ? hours.toString().padStart(2, '0')
      : (hours % 12 || 12).toString().padStart(2, '0');

    const selectedTime = this.is24HourFormat
      ? `${formattedHours}:${minutes}:${seconds} ${ampm}`
      : `${formattedHours}:${minutes}:${seconds} ${ampm}`;

    this.timeInput.value = selectedTime;
  }

  updateTimeFromInput() {
    const timePattern = this.is24HourFormat
      ? /^(\d{1,2})(?::(\d{1,2})(?::(\d{1,2}))?)?$/
      : /^(\d{1,2})(?::(\d{1,2})(?::(\d{1,2}))?)? (\w{2})?$/;
    const matches = this.timeInput.value.match(timePattern);

    if (matches) {
      let hours = parseInt(matches[1], 10);
      const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
      const seconds = matches[3] ? parseInt(matches[3], 10) : 0;
      let ampm = this.is24HourFormat ? 'AM' : (matches[4] || 'AM').toUpperCase();

      if (!this.is24HourFormat) {
        if (hours === 12) {
          ampm = 'PM';
        } else if (hours > 12) {
          ampm = 'PM';
          hours -= 12;
        }
      }

      this.hourDisplay.textContent = hours.toString().padStart(2, '0');
      this.minuteDisplay.textContent = minutes.toString().padStart(2, '0');
      this.secondDisplay.textContent = seconds.toString().padStart(2, '0');
      this.ampmDisplay.textContent = ampm;
    }
  }

  incrementDecrement(target) {
    const increment = target.classList.contains('up');
    const display = target.parentElement.querySelector('span');
    const isHour = display.classList.contains('hour-display');
    const isMinute = display.classList.contains('minute-display');
    const isSecond = display.classList.contains('second-display');
    const isAMPM = display.classList.contains('ampm-display');

    let value = isAMPM ? display.textContent : parseInt(display.textContent, 10);

    if (isAMPM) {
      value = increment ? (value === 'AM' ? 'PM' : 'AM') : (value === 'AM' ? 'PM' : 'AM');
    } else if (isHour || isMinute || isSecond) {
      if (increment) {
        value += 1;
        if (isHour) {
          if (this.is24HourFormat && value === 24) {
            value = 0;
          } else if (!this.is24HourFormat && value > 12) {
            value = 1;
          }
        } else if ((isMinute || isSecond) && value > 59) {
          value = 0;
        }
      } else {
        value -= 1;
        if (isHour) {
          if (this.is24HourFormat && value === -1) {
            value = 23;
          } else if (!this.is24HourFormat && value < 1) {
            value = 12;
          }
        } else if ((isMinute || isSecond) && value < 0) {
          value = 59;
        }
      }
    }

    display.textContent = isAMPM ? value : value.toString().padStart(2, '0');
    this.updateInput();
  }

  clearTime() {
    this.timeInput.value = this.is24HourFormat ? '00:00:00 Z' : '12:00:00 AM';
    this.updateDropdown();
    this.hideValidationMessage();
    this.hideWarningMessage();
    this.hourDisplay.textContent = this.is24HourFormat ? '00' : '12';
    this.ampmDisplay.textContent = this.is24HourFormat ? ' Z' : 'AM';
  }

  preventInvalidPaste(event) {
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('text');
    if (!this.isValidInput(pastedData)) {
      event.preventDefault();
    }
  }

  handleEnterKey(event) {
    if (event.key === 'Enter') {
      const isValid = this.isValidInput(event.target.value);
      if (isValid) {
        this.formatTime();
        this.timeDropdown.classList.add('hidden');
        this.timeDropdown.setAttribute('aria-hidden', 'true');
      } else {
        this.showValidationMessage(
          this.is24HourFormat
            ? 'Invalid time format. Correct format is 00:00:00 Z.'
            : 'Invalid time format. Correct format is 00:00:00 AM(or PM).'
        );
      }
    }
  }

  isValidInput(input) {
    const timePattern = this.is24HourFormat
      ? /^(\d{1,2})(?::(\d{1,2})(?::(\d{1,2}))?( Z)?)?$/
      : /^(\d{1,2})(?::(\d{1,2})(?::(\d{1,2}))? (\w{2})?)?$/;
    const matches = input.match(timePattern);

    if (!matches || /^(AM|PM)$/i.test(input)) {
      this.showValidationMessage(
        this.is24HourFormat
          ? 'Invalid time format. Correct format is 00:00:00 Z.'
          : 'Invalid time format. Correct format is 00:00:00 AM(or PM).'
      );
      return false;
    }

    const hours = parseInt(matches[1], 10);
    const minutes = matches[3] ? parseInt(matches[3], 10) : 0;
    const seconds = matches[5] ? parseInt(matches[5], 10) : 0;
    const ampm = this.is24HourFormat ? 'AM' : (matches[6] || 'AM').toUpperCase();

    if ((this.is24HourFormat && hours > 23) || (!this.is24HourFormat && hours > 12)) {
      this.showWarningMessage();
      return false;
    }

    if (minutes > 59 || seconds > 59) {
      this.showWarningMessage();
      return false;
    }

    this.hideValidationMessage();
    this.hideWarningMessage();
    return true;
  }

  showValidationMessage(message) {
    this.validationMessage = message;
    const validationMessageElement = this.shadowRoot.querySelector('.validation-message');
    validationMessageElement.textContent = this.validationMessage;
    validationMessageElement.style.display = 'block';
  }

  hideValidationMessage() {
    this.validationMessage = '';
    const validationMessageElement = this.shadowRoot.querySelector('.validation-message');
    validationMessageElement.style.display = 'none';
  }

  showWarningMessage() {
    const warningMessageElement = this.shadowRoot.querySelector('.warning-message');
    warningMessageElement.style.display = 'block';
  }

  hideWarningMessage() {
    const warningMessageElement = this.shadowRoot.querySelector('.warning-message');
    warningMessageElement.style.display = 'none';
  }

  render() {
    return html`
      <div class="example col-md-4" aria-labelledby="timepicker-label">
        <div class="time-picker">
          <label for="time-input" id="time-label" class="sr-only">Enter Time</label>
          <div class="input-group mb-1">
            <input
              type="text"
              class="form-control time-input"
              placeholder="Enter Time"
              aria-label="Time"
              role="textbox"
              aria-labelledby="time-label"
              aria-controls="time-dropdown"
              aria-invalid="false"
              aria-describedby="validation-message"
            />
            <button class="clear-button" aria-label="Clear Time" role="button">
              <i class="fa-regular fa-circle-xmark"></i>
            </button>
            <button
              class="time-icon input-group-text btn btn-outline-secondary"
              aria-label="Open Timepicker"
              role="button"
              tabindex="0"
            >
              <i class="fa-solid fa-clock"></i>
            </button>
          </div>
          <div
            class="validation-message"
            style="display: none"
            role="alert"
            id="validation-message"
          ></div>
          <div
            class="warning-message"
            style="display: none"
            role="alert"
            id="warning-message"
          >
            <i class="fa-solid fa-exclamation-triangle"></i> Time values cannot exceed the limits.
          </div>
          <div
            class="time-dropdown hidden"
            role="listbox"
            aria-hidden="true"
            aria-labelledby="time-label"
            tabindex="0"
          >
            <div class="time-spinner-wrapper">
              <div class="time-spinner">
                <button class="arrow up" data-type="hour" aria-label="Increment Hour" role="button">
                  <i class="fa-solid fa-chevron-up"></i>
                </button>
                <span class="hour-display" role="option" aria-selected="false" aria-activedescendant="active-hour" tabindex="0" id="active-hour">00</span>
                <button class="arrow down" data-type="hour" aria-label="Decrement Hour" role="button">
                  <i class="fa-solid fa-chevron-down"></i>
                </button>
              </div>
              <div class="time-spinner-colon">
                <div class="dot"><i class="fa-solid fa-circle"></i></div>
                <div class="dot"><i class="fa-solid fa-circle"></i></div>
              </div>
              <div class="time-spinner">
                <button class="arrow up" data-type="minute" aria-label="Increment Minute" role="button">
                  <i class="fa-solid fa-chevron-up"></i>
                </button>
                <span class="minute-display" role="option" aria-selected="false" aria-activedescendant="active-minute" tabindex="0" id="active-minute">00</span>
                <button class="arrow down" data-type="minute" aria-label="Decrement Minute" role="button">
                  <i class="fa-solid fa-chevron-down"></i>
                </button>
              </div>
              <div class="time-spinner-colon">
                <div class="dot"><i class="fa-solid fa-circle"></i></div>
                <div class="dot"><i class="fa-solid fa-circle"></i></div>
              </div>
              <div class="time-spinner">
                <button class="arrow up" data-type="second" aria-label="Increment Second" role="button">
                  <i class="fa-solid fa-chevron-up"></i>
                </button>
                <span class="second-display" role="option" aria-selected="false" aria-activedescendant="active-second" tabindex="0" id="active-second">00</span>
                <button class="arrow down" data-type="second" aria-label="Decrement Second" role="button">
                  <i class="fa-solid fa-chevron-down"></i>
                </button>
              </div>
              <div class="time-spinner am-pm-spinner">
                <button class="arrow up" data-type="ampm" aria-label="Increment AM/PM" role="button">
                  <i class="fa-solid fa-chevron-up"></i>
                </button>
                <span class="ampm-display" role="option" aria-selected="false" tabindex="0" id="active-ampm" aria-activedescendant="active-ampm">AM</span>
                <button class="arrow down" data-type="ampm" aria-label="Decrement AM/PM" role="button">
                  <i class="fa-solid fa-chevron-down"></i>
                </button>
              </div>
            </div>
            <div class="time-spinner-close">
              <button class="btn btn-outline-primary btn-sm close-button" aria-label="Close">Close</button>
            </div>
          </div>
          <button class="toggle-button btn btn-outline-secondary btn-sm mt-2" aria-label="Toggle 12/24 Hour Format" role="button">Toggle 12/24 Hour Format</button>
        </div>
      </div>
    `;
  }
}

customElements.define('time-picker', TimePicker);
