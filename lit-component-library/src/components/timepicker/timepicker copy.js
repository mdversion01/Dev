import { LitElement, html, css, property } from 'lit';

class TimePicker extends LitElement {
  @property({ type: Boolean }) is24HourFormat = true;

  // Declare other properties and initialize them as needed
  @property({ type: String }) validationMessage = "";
  @property({ type: String }) hourDisplay = "00";
  @property({ type: String }) minuteDisplay = "00";
  @property({ type: String }) secondDisplay = "00";
  @property({ type: String }) ampmDisplay = " Z";

  toggleAMPMSpinner() {
    const ampmSpinner = this.shadowRoot.querySelector(".am-pm-spinner");
    const toggleButton = this.shadowRoot.querySelector(".toggle-button");

    if (this.is24HourFormat) {
      ampmSpinner.classList.add("hidden");
      ampmSpinner.setAttribute("aria-hidden", "true");

      // Convert 12-hour time to 24-hour time for the dropdown
      let hours = parseInt(this.hourDisplay, 10);
      const ampm = this.ampmDisplay;

      if (ampm === "AM" && hours === 12) {
        hours = 0; // Handle 12:00:00 AM
      } else if (ampm === "PM" && hours !== 12) {
        hours += 12; // Add 12 hours for PM times other than 12:00:00 PM
      }

      const formattedHours = hours.toString().padStart(2, "0");

      this.hourDisplay = formattedHours;
      this.ampmDisplay = " Z"; // Display 'Z' for 24-hour format
    } else {
      ampmSpinner.classList.remove("hidden");
      ampmSpinner.setAttribute("aria-hidden", "false");

      let hours = parseInt(this.hourDisplay, 10);
      const ampm = hours >= 12 ? "PM" : "AM";

      // Convert 24-hour time to 12-hour time for the dropdown
      if (hours === 0) {
        hours = 12; // Handle 00:00:00
      } else if (hours > 12) {
        hours -= 12; // Subtract 12 hours for PM times
      }

      const formattedHours = hours.toString().padStart(2, "0");

      this.hourDisplay = formattedHours;
      this.ampmDisplay = ampm;
    }

    // Update the format without toggling 'is24HourFormat' here
    this.formatTime();
  }

  formatTime() {
    // Define regular expressions for 12-hour and 24-hour time formats
    const timePattern = this.is24HourFormat
      ? /^(\d{1,2})(\d{1,2})?(\d{1,2})?$/
      : /^(\d{1,2})(\d{1,2})?(\d{1,2})? (\w{2})?$/;
    const matches = this.timeInput.value.match(timePattern);

    if (matches) {
      let hours = parseInt(matches[1], 10);
      const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
      const seconds = matches[3] ? parseInt(matches[3], 10) : 0;
      let ampm = this.is24HourFormat
        ? " Z"
        : (matches[4] || "AM").toUpperCase();

      // Convert the time format if needed
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

      // Update the display elements with the formatted time
      this.hourDisplay = hours.toString().padStart(2, "0");
      this.minuteDisplay = minutes.toString().padStart(2, "0");
      this.secondDisplay = seconds.toString().padStart(2, "0");
      this.ampmDisplay = ampm;
    }

    // Update the input field after formatting the time
    this.updateInput();
  }

  incrementDecrement(target, increment) {
    const isHour = target.classList.contains("hour-display");
    const isMinute = target.classList.contains("minute-display");
    const isSecond = target.classList.contains("second-display");
    const isAMPM = target.classList.contains("ampm-display");

    let value = isAMPM ? target.textContent : parseInt(target.textContent, 10);

    if (isAMPM) {
      if (this.is24HourFormat && value === " Z") {
        value = increment ? "AM" : "PM";
      } else {
        value = increment
          ? value === "AM"
            ? "PM"
            : "AM"
          : value === "AM"
          ? "PM"
          : "AM";
      }
    } else if (isHour || isMinute || isSecond) {
      if (increment) {
        value += 1;
        if (isHour) {
          // Handle the 12-hour format boundary
          if (this.is24HourFormat) {
            if (value === 24) {
              value = 1;
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
          // Handle the 12-hour format boundary
          if (this.is24HourFormat) {
            if (value === 0) {
              value = 23;
            }
          } else {
            if (value < 1) {
              value = 12;
            }
          }
        } else if ((isHour || isMinute || isSecond) && value < 0) {
          value = 59;
        }
      }
    }

    if (isAMPM) {
      target.textContent = value;
    } else {
      target.textContent = value.toString().padStart(2, "0");
    }

    this.updateInput();
  }

  updateInput() {
    const hours = parseInt(this.hourDisplay, 10);
    const minutes = this.minuteDisplay.padStart(2, "0");
    const seconds = this.secondDisplay.padStart(2, "0");
    const ampm = this.is24HourFormat ? "Z" : this.ampmDisplay || "AM";

    const formattedHours = this.is24HourFormat
      ? hours.toString().padStart(2, "0")
      : (hours % 12 || 12).toString().padStart(2, "0");

    const selectedTime = this.is24HourFormat
      ? `${formattedHours}:${minutes}:${seconds} ${ampm}`
      : `${formattedHours}:${minutes}:${seconds} ${ampm}`;

    this.timeInput.value = selectedTime;
  }

  // Your component's constructor
  constructor() {
    super();

    // Initialize your properties here
    this.is24HourFormat = true; // Set the default format to 24-hour
    this.validationMessage = ""; // Initialize the validation message to an empty string
  }

  static styles = css`
    /* Your CSS styles go here */
  `;

  render() {
    return html`
      <link
        rel="stylesheet"
        href="../../node_modules/bootstrap/dist/css/bootstrap.css"
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
      <script src="../../node_modules/bootstrap/dist/js/bootstrap.js"></script>
      <script src="../../node_modules@popperjscorelibpopper.js"></script>
    `;
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);

    // Get references to important elements
    const incrementHourBtn = this.shadowRoot.querySelector(
      '.arrow.up[data-type="hour"]'
    );
    const decrementHourBtn = this.shadowRoot.querySelector(
      '.arrow.down[data-type="hour"]'
    );

    // Add event listeners for incrementing and decrementing hours
    incrementHourBtn.addEventListener("click", () => {
      this.incrementHour();
    });

    decrementHourBtn.addEventListener("click", () => {
      this.decrementHour();
    });

    // Get references to other increment/decrement buttons and add event listeners if needed

    const toggleFormatBtn = this.shadowRoot.querySelector(".toggle-button");
    toggleFormatBtn.addEventListener("click", () => {
      this.toggleAMPMSpinner();
    });
  }

  // Utility function to update the time input field
  updateInputField(hour, minute, second, ampm) {
    const timeInput = this.shadowRoot.querySelector(".time-input");
    // Format the time and update the input field value
    timeInput.value = `${hour}:${minute}:${second} ${ampm}`;
  }

  // Utility function to increment the hour
  incrementHour() {
    // Get the current time input value
    const timeInput = this.shadowRoot.querySelector(".time-input");
    const [hour, minute, second, ampm] = timeInput.value.split(/:| /);

    // Parse the current hour as an integer
    let currentHour = parseInt(hour, 10);

    // Determine the current AM/PM
    const isAM = ampm === "AM";
    const isPM = ampm === "PM";

    if (this.is24HourFormat) {
      // Handle 24-hour format
      // Increment the hour (roll over from 23 to 0 if needed)
      if (currentHour < 23) {
        currentHour = currentHour + 1;
      } else {
        currentHour = 0;
      }
    } else {
      // Handle 12-hour format
      // Increment the hour (roll over from 12 to 1) and toggle AM/PM
      if (currentHour < 12) {
        currentHour = currentHour + 1;
      } else if (currentHour === 12) {
        currentHour = 1;
      }
      if (currentHour === 12 && isAM) {
        ampm = "PM";
      } else if (currentHour === 12 && isPM) {
        ampm = "AM";
      }
    }

    // Convert the hour back to a string
    let newHour = currentHour.toString().padStart(2, "0");

    // Update the time input field
    this.updateInputField(newHour, minute, second, ampm);
  }

  // Utility function to decrement the hour
  decrementHour() {
    // Get the current time input value
    const timeInput = this.shadowRoot.querySelector(".time-input");
    const [hour, minute, second, ampm] = timeInput.value.split(/:| /);

    // Parse the current hour as an integer
    let currentHour = parseInt(hour, 10);

    // Determine the current AM/PM
    const isAM = ampm === "AM";
    const isPM = ampm === "PM";

    if (this.is24HourFormat) {
      // Handle 24-hour format
      // Decrement the hour (roll over from 0 to 23 if needed)
      if (currentHour > 0) {
        currentHour = currentHour - 1;
      } else {
        currentHour = 23;
      }
    } else {
      // Handle 12-hour format
      // Decrement the hour (roll over from 1 to 12) and toggle AM/PM
      if (currentHour > 1) {
        currentHour = currentHour - 1;
      } else if (currentHour === 1) {
        currentHour = 12;
      }
      if (currentHour === 12 && isAM) {
        ampm = "PM";
      } else if (currentHour === 12 && isPM) {
        ampm = "AM";
      }
    }

    // Convert the hour back to a string
    let newHour = currentHour.toString().padStart(2, "0");

    // Update the time input field
    this.updateInputField(newHour, minute, second, ampm);
  }

  // Utility function to toggle between AM and PM
  toggleAMPMSpinner() {
    // Get the current time input value
    const timeInput = this.shadowRoot.querySelector(".time-input");
    const [hour, minute, second, ampm] = timeInput.value.split(/:| /);

    // Toggle AM to PM or PM to AM
    const newAMPM = ampm === "AM" ? "PM" : "AM";

    // Update the time input field
    this.updateInputField(hour, minute, second, newAMPM);
  }
}

customElements.define("time-picker", TimePicker);
