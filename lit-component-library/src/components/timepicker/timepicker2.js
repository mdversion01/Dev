import { LitElement, html, css, property } from 'lit-element';

class TimePicker extends LitElement {
  @property({ type: String }) value = '';

  @property({ type: Boolean }) is24HourFormat = true;

  @property({ type: String }) validationMessage = '';

  @property({ type: Boolean }) showDropdown = false;

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      this.updateTimeFromInput();
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      this.updateTimeFromInput();
    }
  }

  render() {
    return html`
    <link
        rel="stylesheet"
        href="../../../node_modules/bootstrap/dist/css/bootstrap.css"
      />
      <link rel="stylesheet" href="./timepicker.css" />
      
      <!-- Your HTML goes here -->
      <!-- Timepicker component starts here -->
      <div class="example col-md-4" aria-labelledby="timepicker-label">
        <div class="time-picker">
          <!-- Input group for the timepicker -->
          <label for="time-input" id="time-label" class="sr-only"
            >Enter Time</label
          >
          <div class="input-group mb-1">
            <input
              id="time-input"
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
            <!-- Clear button to reset the time -->
            <button class="clear-button" aria-label="Clear Time" role="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path
                  d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
                />
              </svg>
            </button>
            <!-- Time icon button to open the timepicker dropdown -->
            <button
              class="time-icon input-group-text btn btn-outline-secondary"
              aria-label="Open Timepicker"
              role="button"
              tabindex="0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path
                  d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                />
              </svg>
            </button>
          </div>

          <!-- Validation message for displaying errors -->
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path
                d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
              />
            </svg>
            Time values cannot exceed the limits.
          </div>

          <!-- Dropdown container for the timepicker -->
          <div
            class="time-dropdown hidden"
            role="listbox"
            aria-hidden="true"
            aria-labelledby="time-label"
            tabindex="0"
          >
            <div class="time-spinner-wrapper">
              <!-- Spinner for hours -->
              <div class="time-spinner">
                <button
                  class="arrow up"
                  data-type="hour"
                  aria-label="Increment Hour"
                  role="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
                    />
                  </svg>
                </button>
                <span
                  class="hour-display"
                  role="option"
                  aria-selected="false"
                  aria-activedescendant="active-hour"
                  tabindex="0"
                  id="active-hour"
                  >00</span
                >
                <button
                  class="arrow down"
                  data-type="hour"
                  aria-label="Decrement Hour"
                  role="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                    />
                  </svg>
                </button>
              </div>
              <div class="time-spinner-colon">
                <div class="dot">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
                    />
                  </svg>
                </div>
                <div class="dot">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
                    />
                  </svg>
                </div>
              </div>
              <!-- Colon between hours and minutes -->
              <!-- Spinner for minutes -->
              <div class="time-spinner">
                <button
                  class="arrow up"
                  data-type="minute"
                  aria-label="Increment Minute"
                  role="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
                    />
                  </svg>
                </button>
                <span
                  class="minute-display"
                  role="option"
                  aria-selected="false"
                  aria-activedescendant="active-minute"
                  tabindex="0"
                  id="active-minute"
                  >00</span
                >
                <button
                  class="arrow down"
                  data-type="minute"
                  aria-label="Decrement Minute"
                  role="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                    />
                  </svg>
                </button>
              </div>
              <div class="time-spinner-colon">
                <div class="dot">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
                    />
                  </svg>
                </div>
                <div class="dot">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
                    />
                  </svg>
                </div>
              </div>
              <!-- Colon between minutes and seconds -->
              <!-- Spinner for seconds -->
              <div class="time-spinner">
                <button
                  class="arrow up"
                  data-type="second"
                  aria-label="Increment Second"
                  role="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
                    />
                  </svg>
                </button>
                <span
                  class="second-display"
                  role="option"
                  aria-selected="false"
                  aria-activedescendant="active-second"
                  tabindex="0"
                  id="active-second"
                  >00</span
                >
                <button
                  class="arrow down"
                  data-type="second"
                  aria-label="Decrement Second"
                  role="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                    />
                  </svg>
                </button>
              </div>

              <!-- AM/PM spinner (visible for 12-hour format) -->
              <div class="time-spinner am-pm-spinner">
                <button
                  class="arrow up"
                  data-type="ampm"
                  aria-label="Increment AM/PM"
                  role="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
                    />
                  </svg>
                </button>
                <span
                  class="ampm-display"
                  role="option"
                  aria-selected="false"
                  tabindex="0"
                  id="active-ampm"
                  aria-activedescendant="active-ampm"
                  >AM</span
                >

                <button
                  class="arrow down"
                  data-type="ampm"
                  aria-label="Decrement AM/PM"
                  role="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class="time-spinner-close">
              <button
                class="btn btn-outline-primary btn-sm close-button"
                aria-label="Close"
              >
                Close
              </button>
            </div>
          </div>

          <!-- Toggle button to switch between 12-hour and 24-hour format -->
          <button
            class="toggle-button btn btn-outline-secondary btn-sm mt-2"
            aria-label="Toggle 12/24 Hour Format"
            role="button"
          >
            Toggle 12/24 Hour Format
          </button>
        </div>
      </div>
      <!-- Timepicker component ends here -->
      <!-- JS dependencies for the timepicker component -->
      <script src="../../../node_modules/bootstrap/dist/js/bootstrap.js"></script>
      <script src="../../../node_modules@popperjscorelibpopper.js"></script>
    `;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  clearTime() {
    this.value = this.is24HourFormat ? '00:00:00 Z' : '12:00:00 AM';
    this.updateTimeFromInput();
    this.hideValidationMessage();
    this.hideWarningMessage();
  }

  toggleFormat() {
    this.is24HourFormat = !this.is24HourFormat;
    this.toggleAMPMSpinner();
    this.formatTime();
    this.hideValidationMessage();
    this.hideWarningMessage();
  }

  toggleAMPMSpinner() {
    const amPmSpinner = this.shadowRoot.querySelector('.am-pm-spinner'); // Replace with the actual selector
  
    if (this.is24HourFormat) {
      amPmSpinner.style.display = 'none';
    } else {
      amPmSpinner.style.display = 'block';
    }
  }
  

  formatTime() {
    const timeInput = this.shadowRoot.querySelector('.time-input'); // Replace with the actual selector
    const timePattern = this.is24HourFormat
      ? /^(\d{1,2})(\d{1,2})?(\d{1,2})?$/
      : /^(\d{1,2})(\d{1,2})?(\d{1,2})? (\w{2})?$/;
    const matches = timeInput.value.match(timePattern);
  
    if (matches) {
      let hours = parseInt(matches[1], 10);
      const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
      const seconds = matches[3] ? parseInt(matches[3], 10) : 0;
      let ampm = this.is24HourFormat ? " Z" : (matches[4] || "AM").toUpperCase();
  
      if (!this.is24HourFormat) {
        if (hours === 0 && ampm === "AM") {
          hours = 12;
        } else if (ampm === "PM" && hours < 12) {
          hours += 12;
        } else if (ampm === "AM" && hours === 12) {
          hours = 0;
        }
      } else {
        if (hours === 0) {
          ampm = "AM";
          hours = 12;
        } else if (hours === 12) {
          ampm = "PM";
        } else if (hours > 12) {
          ampm = "PM";
        }
      }
  
      this.hourDisplay = hours.toString().padStart(2, "0");
      this.minuteDisplay = minutes.toString().padStart(2, "0");
      this.secondDisplay = seconds.toString().padStart(2, "0");
      this.ampmDisplay = ampm;
    }
  
    // Update the input field after formatting the time
    this.updateInput();
  }
  

  updateTimeFromInput() {
    const timeInput = this.shadowRoot.querySelector('.time-input'); // Replace with the actual selector
    const timePattern = this.is24HourFormat
      ? /^(\d{1,2})(\d{1,2})?(\d{1,2})?$/
      : /^(\d{1,2})(\d{1,2})?(\d{1,2})? (\w{2})?$/;
    const matches = timeInput.value.match(timePattern);
  
    if (matches) {
      let hours = parseInt(matches[1], 10);
      const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
      const seconds = matches[3] ? parseInt(matches[3], 10) : 0;
      let ampm = this.is24HourFormat ? " Z" : (matches[4] || "AM").toUpperCase();
  
      if (!this.is24HourFormat) {
        if (hours === 0 && ampm === "AM") {
          hours = 12;
        } else if (ampm === "PM" && hours < 12) {
          hours += 12;
        } else if (ampm === "AM" && hours === 12) {
          hours = 0;
        }
      } else {
        if (hours === 0) {
          ampm = "AM";
          hours = 12;
        } else if (hours === 12) {
          ampm = "PM";
        } else if (hours > 12) {
          ampm = "PM";
        }
      }
  
      this.hour = hours;
      this.minute = minutes;
      this.second = seconds;
      this.ampm = ampm;
    }
  }
  

  hideValidationMessage() {
    this.validationMessage = '';
  }
  

  hideWarningMessage() {
    this.showWarning = false;
  }
  

  handleInput(event) {
    this.value = event.target.value;
    this.updateTimeFromInput();
    this.hideValidationMessage();
    this.hideWarningMessage();

    // Check if the entered values exceed the limits
    const hours = parseInt(this.hourDisplay.textContent, 10);
    const minutes = parseInt(this.minuteDisplay.textContent, 10);
    const seconds = parseInt(this.secondDisplay.textContent, 10);

    if (
      (this.is24HourFormat && (hours > 23 || minutes > 59 || seconds > 59)) ||
      (!this.is24HourFormat && (hours > 12 || minutes > 59 || seconds > 59))
    ) {
      this.showWarningMessage(); // Show the warning message
    } else {
      this.hideWarningMessage(); // Hide the warning message
    }
  }

  showWarningMessage() {
    this.showWarning = true;
  }
  
}

customElements.define('time-picker', TimePicker);
