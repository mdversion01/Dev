import { LitElement, html, css } from "lit";

class TimePicker extends LitElement {
  static get properties() {
    return {
      timeIcon: { type: Object },
      timeDropdown: { type: Object },
      closeButton: { type: Object },
      hourDisplay: { type: Object },
      minuteDisplay: { type: Object },
      secondDisplay: { type: Object },
      ampmDisplay: { type: Object },
      timeInput: { type: Object },
      clearButton: { type: Object },
      validationMessage: { type: String },
      is24HourFormat: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.validationMessage = "";
    this.is24HourFormat = true;
  }

  connectedCallback() {
    super.connectedCallback();
    // Query for your elements once the element is attached to the DOM.
    this.timeIcon = this.shadowRoot.querySelector(".time-icon");
    this.timeDropdown = this.shadowRoot.querySelector(".time-dropdown");
    this.closeButton = this.shadowRoot.querySelector(".close-button");
    this.hourDisplay = this.shadowRoot.querySelector(".hour-display");
    this.minuteDisplay = this.shadowRoot.querySelector(".minute-display");
    this.secondDisplay = this.shadowRoot.querySelector(".second-display");
    this.ampmDisplay = this.shadowRoot.querySelector(".ampm-display");
    this.timeInput = this.shadowRoot.querySelector(".time-input");
    this.clearButton = this.shadowRoot.querySelector(".clear-button");
    const toggleButton = this.shadowRoot.querySelector(".toggle-button");
    const arrows = this.shadowRoot.querySelectorAll(".arrow");
    this.timeInput = this.shadowRoot.querySelector('#time-input');

    // Add event listeners
    console.log(this.timeIcon); // Check if this selects the time icon
    this.timeIcon.addEventListener("click", () => {
      console.log("Time icon clicked"); // Check if this message appears in the console
      this.timeDropdown.classList.toggle("hidden");
      this.timeDropdown.setAttribute(
        "aria-hidden",
        this.timeDropdown.classList.contains("hidden").toString()
      );
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (
        !this.timeIcon.contains(target) &&
        !this.timeDropdown.contains(target)
      ) {
        // Close the dropdown when the user clicks outside of it
        this.timeDropdown.classList.add("hidden");
        this.timeDropdown.setAttribute("aria-hidden", "true");
      }
    });

    // Call the function to handle the initial state
    this.toggleAMPMSpinner();

    // Event listener for the clear button
    clearButton.addEventListener("click", () => {
      // Reset the time input value to default based on the format
      timeInput.value = this.is24HourFormat ? "00:00:00 Z" : "12:00:00 AM";
      this.updateDropdown(); // Update the dropdown to match the cleared input value
      this.hideValidationMessage(); // Hide the validation message when the clear button is clicked
      this.hideWarningMessage(); // Hide the warning message when the clear button is clicked

      if (this.is24HourFormat) {
        this.shadowRoot.querySelector(".hour-display").textContent = "00";
        this.shadowRoot.querySelector(".ampm-display").textContent = " Z";
      } else {
        this.shadowRoot.querySelector(".hour-display").textContent = "12";
        this.shadowRoot.querySelector(".ampm-display").textContent = "AM";
      }
    });

    // Event listener for the arrow buttons (increment/decrement time)
    arrows.forEach((arrow) => {
      arrow.addEventListener("click", () => {
        const increment = arrow.classList.contains("up");
        const target = arrow.parentElement.querySelector(
          `.${arrow.dataset.type}-display`
        );
        this.incrementDecrement(target, increment);
      });
    });

    // Event listener for the close button
    closeButton.addEventListener("click", () => {
      this.timeDropdown.classList.add("hidden");
      this.timeDropdown.setAttribute("aria-hidden", "true");
    });

    // Event listener for the toggle button (change between 12-hour and 24-hour format)
    toggleButton.addEventListener("click", () => {
      this.is24HourFormat = !this.is24HourFormat; // Toggle the format
      this.toggleAMPMSpinner(); // Update the AM/PM spinner visibility based on the format
      this.formatTime(); // Format the time based on the new format
      this.hideValidationMessage(); // Hide the validation message when the format is changed
      this.hideWarningMessage(); // Hide the warning message when the format is changed
    });
  }

  toggleAMPMSpinner() {
    const ampmSpinner = this.shadowRoot.querySelector(".am-pm-spinner");
    const toggleButton = this.shadowRoot.querySelector(".toggle-button");
  
    if (!ampmSpinner || !toggleButton) {
      // Ensure that required elements are available
      return;
    }
  
    if (this.is24HourFormat) {
      ampmSpinner.classList.add("hidden");
      ampmSpinner.setAttribute("aria-hidden", "true");
      toggleButton.textContent = "Change to 12-Hour time";
    } else {
      ampmSpinner.classList.remove("hidden");
      ampmSpinner.setAttribute("aria-hidden", "false");
      toggleButton.textContent = "Change to 24-Hour time";
    }
    
    this.formatTime();
  }
  
  updated(changedProperties) {
    super.updated(changedProperties);
  
    if (changedProperties.has("is24HourFormat")) {
      // Handle format change when is24HourFormat property changes
      this.toggleAMPMSpinner();
    }
  }
  

  formatTime() {
    // Ensure that this.timeInput is not null before accessing its value property
    if (this.timeInput) {
      // Get the input value directly since you've already obtained a reference to the input field
      const inputValue = this.timeInput.value;
  
      // Define regular expressions for 12-hour and 24-hour time formats
      const timePattern = this.is24HourFormat
        ? /^(\d{1,2})(\d{1,2})?(\d{1,2})?$/
        : /^(\d{1,2})(\d{1,2})?(\d{1,2})? (\w{2})?/;
      const matches = inputValue.match(timePattern);
  
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
        this.hourDisplay.textContent = hours.toString().padStart(2, "0");
        this.minuteDisplay.textContent = minutes.toString().padStart(2, "0");
        this.secondDisplay.textContent = seconds.toString().padStart(2, "0");
        this.ampmDisplay.textContent = ampm;
      }
  
      // Update the input field after formatting the time
      this.updateInput();
    }
  }
  
  updateInput() {
    // Ensure that this.timeInput is not null before updating the input field
    if (this.timeInput) {
      // Format the time and update the input field value based on the current format
      const hours = this.hourDisplay.textContent;
      const minutes = this.minuteDisplay.textContent;
      const seconds = this.secondDisplay.textContent;
      const ampm = this.ampmDisplay.textContent;
  
      const formattedTime = this.is24HourFormat
        ? `${hours}:${minutes}:${seconds}`
        : `${hours}:${minutes}:${seconds} ${ampm}`;
  
      this.timeInput.value = formattedTime;
    }
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

    target.textContent = isAMPM ? value : value.toString().padStart(2, "0");

    this.updateInput();
  }

  updateInput() {
    const hours = parseInt(this.hourDisplay.textContent, 10);
    const minutes = this.minuteDisplay.textContent.padStart(2, "0");
    const seconds = this.secondDisplay.textContent.padStart(2, "0");
    const ampm = this.is24HourFormat
      ? "Z"
      : this.ampmDisplay.textContent || "AM";

    const formattedHours = this.is24HourFormat
      ? hours.toString().padStart(2, "0")
      : (hours % 12 || 12).toString().padStart(2, "0");

    const selectedTime = this.is24HourFormat
      ? `${formattedHours}:${minutes}:${seconds} ${ampm}`
      : `${formattedHours}:${minutes}:${seconds} ${ampm}`;

    this.timeInput.value = selectedTime;
  }

  updateDropdown() {
    const timePattern = this.is24HourFormat
      ? /^(\d{2}):(\d{2}):(\d{2})( Z)?$/
      : /^(\d{2}):(\d{2}):(\d{2}) (\w{2})?$/;
    const matches = this.timeInput.value.match(timePattern);

    if (matches) {
      let hours = parseInt(matches[1], 10);
      const minutes = parseInt(matches[2], 10);
      const seconds = parseInt(matches[3], 10);
      let ampm = this.is24HourFormat ? "AM" : matches[4]?.toUpperCase() || "AM";

      if (!this.is24HourFormat) {
        if (hours === 0 && ampm === "AM") {
          ampm = "PM";
        } else if (hours > 12) {
          ampm = "PM";
          hours -= 12;
        }
      }

      this.hourDisplay.textContent = hours.toString().padStart(2, "0");
      this.minuteDisplay.textContent = minutes.toString().padStart(2, "0");
      this.secondDisplay.textContent = seconds.toString().padStart(2, "0");
      this.ampmDisplay.textContent = ampm;

      const ampmSpinner = this.shadowRoot.querySelector(".am-pm-spinner");
      const toggleButton = this.shadowRoot.querySelector(".toggle-button");

      if (this.is24HourFormat) {
        ampmSpinner.classList.add("hidden");
        ampmSpinner.setAttribute("aria-hidden", "true");
        toggleButton.textContent = "Change to 12-Hour time";
      } else {
        ampmSpinner.classList.remove("hidden");
        ampmSpinner.setAttribute("aria-hidden", "false");
        toggleButton.textContent = "Change to 24-Hour time";
      }

      if (
        this.is24HourFormat === false &&
        hours === 12 &&
        minutes === 0 &&
        seconds === 0
      ) {
        this.ampmDisplay.textContent = ampm;
      }
    }
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
      let ampm = this.is24HourFormat
        ? "AM"
        : (matches[4] || "AM").toUpperCase();

      if (!this.is24HourFormat) {
        if (hours === 12) {
          ampm = "PM";
        } else if (hours > 12) {
          ampm = "PM";
          hours -= 12;
        }
      }

      this.hourDisplay.textContent = hours.toString().padStart(2, "0");
      this.minuteDisplay.textContent = minutes.toString().padStart(2, "0");
      this.secondDisplay.textContent = seconds.toString().padStart(2, "0");
      this.ampmDisplay.textContent = ampm;
    }
  }

  validateAndFormatTime() {
    const isValid = this.isValidInput(this.timeInput.value);
    if (isValid) {
      this.formatTime();
      this.timeDropdown.classList.add("hidden");
      this.timeDropdown.setAttribute("aria-hidden", "true");
    }
  }

  showValidationMessage(message) {
    this.validationMessage = message;
    const validationMessageElement = this.shadowRoot.querySelector(
      ".validation-message"
    );
    validationMessageElement.textContent = this.validationMessage;
    validationMessageElement.style.display = "block";
  }

  hideValidationMessage() {
    this.validationMessage = "";
    const validationMessageElement = this.shadowRoot.querySelector(
      ".validation-message"
    );
    validationMessageElement.style.display = "none";
  }

  isValidInput(input) {
    const timePattern = this.is24HourFormat
      ? /^(\d{1,2})(?::(\d{1,2})(?::(\d{1,2))( Z)?)?$/
      : /^(\d{1,2})(?::(\d{1,2})(?::(\d{1,2)) (\w{2})?)?$/;
    const matches = input.match(timePattern);

    // If the input doesn't match the time pattern or is 'AM' or 'PM', display a validation message and return false
    if (!matches || /^(AM|PM)$/i.test(input)) {
      this.showValidationMessage(
        this.is24HourFormat
          ? "Invalid time format. Correct format is 00:00:00 Z."
          : "Invalid time format. Correct format is 00:00:00 AM(or PM)."
      );
      return false;
    }

    const hours = parseInt(matches[1], 10);
    const minutes = matches[3] ? parseInt(matches[3], 10) : 0;
    const seconds = matches[5] ? parseInt(matches[5], 10) : 0;
    const ampm = this.is24HourFormat
      ? "AM"
      : (matches[6] || "AM").toUpperCase();

    // Show a warning message if the input values exceed the limits
    if (
      (this.is24HourFormat && hours > 23) ||
      (!this.is24HourFormat && hours > 12)
    ) {
      this.showWarningMessage();
      return false;
    }

    if (minutes > 59 || seconds > 59) {
      this.showWarningMessage();
      return false;
    }

    // Hide the validation and warning messages if the input is valid and return true
    this.hideValidationMessage();
    this.hideWarningMessage();
    return true;
  }

  showWarningMessage() {
    const warningMessageElement =
      this.shadowRoot.querySelector(".warning-message");
    warningMessageElement.style.display = "block";
  }

  hideWarningMessage() {
    const warningMessageElement =
      this.shadowRoot.querySelector(".warning-message");
    warningMessageElement.style.display = "none";
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has("is24HourFormat")) {
      // Handle format change when is24HourFormat property changes
      this.toggleAMPMSpinner();
    }
  }

  // Event listeners for the time input field
  connectedCallback() {
    super.connectedCallback();
  
    // Query for your elements once the element is attached to the DOM.
    this.timeInput = this.shadowRoot.querySelector("#time-input");
  
    if (this.timeInput) {
      this.timeInput.addEventListener("focus", () => {
        this.toggleDropdown(true);
      });
  
      this.timeInput.addEventListener("input", (event) => {
        this.updateTimeFromInput();
        this.updateDropdown();
        this.hideValidationMessage();
        this.hideWarningMessage();
  
        const hours = parseInt(this.hourDisplay.textContent, 10);
        const minutes = parseInt(this.minuteDisplay.textContent, 10);
        const seconds = parseInt(this.secondDisplay.textContent, 10);
  
        if (
          (this.is24HourFormat &&
            (hours > 23 || minutes > 59 || seconds > 59)) ||
          (!this.is24HourFormat && (hours > 12 || minutes > 59 || seconds > 59))
        ) {
          this.showWarningMessage();
        } else {
          this.hideWarningMessage();
        }
      });
  
      this.timeInput.addEventListener("paste", (event) => {
        const clipboardData = event.clipboardData || window.clipboardData;
        const pastedData = clipboardData.getData("text");
        if (!this.isValidInput(pastedData)) {
          event.preventDefault();
        }
      });
  
      this.timeInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          const isValid = this.isValidInput(event.target.value);
          if (isValid) {
            if (this.is24HourFormat) {
              this.formatTime();
            } else {
              this.updateInput();
            }
            this.toggleDropdown(false);
          } else {
            this.showValidationMessage(
              this.is24HourFormat
                ? "Invalid time format. Correct format is 00:00:00 Z."
                : "Invalid time format. Correct format is 00:00:00 AM(or PM)."
            );
          }
        }
      });
    }
  }

  static styles = css`
    /* Your CSS styles go here */
  `;

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
}

customElements.define("time-picker", TimePicker);
