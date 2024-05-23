import { LitElement, html, css } from "lit";
import { timepickerStyles } from "./timepicker-styles.js";

class TimePicker extends LitElement {
  static styles = [ timepickerStyles, css`
    /* Add your component styles here */
  `];

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener("DOMContentLoaded", () => {
      const timeIcon = this.shadowRoot.querySelector(".time-icon");
      const timeDropdown = this.shadowRoot.querySelector(".time-dropdown");
      const closeButton = this.shadowRoot.querySelector(".close-button");
      const hourDisplay = this.shadowRoot.querySelector(".hour-display");
      const minuteDisplay = this.shadowRoot.querySelector(".minute-display");
      const secondDisplay = this.shadowRoot.querySelector(".second-display");
      const ampmDisplay = this.shadowRoot.querySelector(".ampm-display");
      const timeInput = this.shadowRoot.querySelector(".time-input");
      const clearButton = this.shadowRoot.querySelector(".clear-button");

      let validationMessage = ""; // Variable to store the validation message

      // Toggle the visibility of the time dropdown when the time icon is clicked
      timeIcon.addEventListener("click", () => {
        timeDropdown.classList.toggle("hidden");
        timeDropdown.setAttribute(
          "aria-hidden",
          timeDropdown.classList.contains("hidden").toString()
        );
      });

      // Function to close the dropdown when the user clicks outside of it
      document.addEventListener("click", (event) => {
        const target = event.target;
        if (!timeIcon.contains(target) && !timeDropdown.contains(target)) {
          timeDropdown.classList.add("hidden");
          timeDropdown.setAttribute("aria-hidden", "true");
        }
      });

      let is24HourFormat = true; // Set this to 'false' for 12-hour format

      // Function to update the validation message based on the input time
      const updateValidationMessage = () => {
        const validationMessageElement = this.shadowRoot.querySelector(
          ".validation-message"
        );
        validationMessageElement.textContent = validationMessage;

        if (validationMessage) {
          validationMessageElement.style.display = "block";
          timeInput.setAttribute("aria-invalid", "true");
        } else {
          validationMessageElement.style.display = "none";
          timeInput.setAttribute("aria-invalid", "false");
        }
      };

      // Function to format the time and update the input field
      const formatTime = () => {
        const hours = hourDisplay.textContent.padStart(2, "0");
        const minutes = minuteDisplay.textContent.padStart(2, "0");
        const seconds = secondDisplay.textContent.padStart(2, "0");
        const ampm = ampmDisplay.textContent.trim();

        const formattedTime = is24HourFormat
          ? `${hours}:${minutes}:${seconds}`
          : `${hours}:${minutes}:${seconds} ${ampm}`;

        timeInput.value = formattedTime;
        timeInput.setAttribute("aria-invalid", "false");
        validationMessage = "";
        updateValidationMessage();
      };

      // Function to toggle the AM/PM spinner and format the time based on the format (12-hour or 24-hour)
      const toggleAMPMSpinner = () => {
        const ampmSpinner = this.shadowRoot.querySelector(".am-pm-spinner");
        const toggleButton = this.shadowRoot.querySelector(".toggle-button");

        if (is24HourFormat) {
          ampmSpinner.classList.add("hidden");
          ampmSpinner.setAttribute("aria-hidden", "true");

          // Convert 12-hour time to 24-hour time for the dropdown
          let hours = parseInt(hourDisplay.textContent, 10);
          const ampm = ampmDisplay.textContent;

          if (ampm === "AM" && hours === 12) {
            hours = 0; // Handle 12:00:00 AM
          } else if (ampm === "PM" && hours !== 12) {
            hours += 12; // Add 12 hours for PM times other than 12:00:00 PM
          }

          const formattedHours = hours.toString().padStart(2, "0");

          hourDisplay.textContent = formattedHours;
          ampmDisplay.textContent = " Z"; // Display 'Z' for 24-hour format
          timeInput.placeholder = "Enter Time";
          toggleButton.textContent = "Change to 12-Hour time";
        } else {
          ampmSpinner.classList.remove("hidden");
          ampmSpinner.setAttribute("aria-hidden", "false");

          let hours = parseInt(hourDisplay.textContent, 10);
          const ampm = hours >= 12 ? "PM" : "AM";

          // Convert 24-hour time to 12-hour time for the dropdown
          if (hours === 0) {
            hours = 12; // Handle 00:00:00
          } else if (hours > 12) {
            hours -= 12; // Subtract 12 hours for PM times
          }

          const formattedHours = hours.toString().padStart(2, "0");

          hourDisplay.textContent = formattedHours;
          ampmDisplay.textContent = ampm;
          timeInput.placeholder = "Enter Time"; // Placeholder for 12-hour format
          toggleButton.textContent = "Change to 24-Hour time";
        }

        // Update the format without toggling 'is24HourFormat' here
        formatTime();
      };

      // Call the function initially to handle the initial state
      toggleAMPMSpinner();

      // Function to validate the time input and update the validation message
      const validateTime = () => {
        const hours = parseInt(hourDisplay.textContent, 10);
        const minutes = parseInt(minuteDisplay.textContent, 10);
        const seconds = parseInt(secondDisplay.textContent, 10);

        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
          validationMessage =
            "Invalid time format. Please enter valid numbers.";
        } else if (
          hours < 0 ||
          hours > 23 ||
          minutes < 0 ||
          minutes > 59 ||
          seconds < 0 ||
          seconds > 59
        ) {
          validationMessage = "Time values must be within the valid range.";
        } else {
          validationMessage = "";
        }

        updateValidationMessage();
      };

      // Event listener for arrow buttons to increment/decrement time values
      const handleArrowButtonClick = (event) => {
        const { type } = event.target.dataset;

        if (type === "hour") {
          const increment = event.target.classList.contains("up") ? 1 : -1;
          let hours = parseInt(hourDisplay.textContent, 10);
          hours = (hours + increment + 24) % 24;
          hourDisplay.textContent = hours.toString().padStart(2, "0");
        } else if (type === "minute") {
          // Handle minutes
        } else if (type === "second") {
          // Handle seconds
        } else if (type === "ampm") {
          // Handle AM/PM toggle
          const newAMPM = ampmDisplay.textContent.trim() === "AM" ? "PM" : "AM";
          ampmDisplay.textContent = newAMPM;
        }

        // Format and validate the time after each button click
        formatTime();
        validateTime();
      };

      // Event listener for the close button to close the time dropdown
      closeButton.addEventListener("click", () => {
        timeDropdown.classList.add("hidden");
        timeDropdown.setAttribute("aria-hidden", "true");
      });

      // Event listener for the clear button to reset the time
      clearButton.addEventListener("click", () => {
        hourDisplay.textContent = "00";
        minuteDisplay.textContent = "00";
        secondDisplay.textContent = "00";
        ampmDisplay.textContent = "AM";

        // Format and validate the time after clearing
        formatTime();
        validateTime();
      });

      // Event listener for the input field to show the time dropdown
      timeInput.addEventListener("click", () => {
        timeDropdown.classList.toggle("hidden");
        timeDropdown.setAttribute(
          "aria-hidden",
          timeDropdown.classList.contains("hidden").toString()
        );
      });

      // Event listener for the toggle button to switch between 12-hour and 24-hour format
      const toggleButton = this.shadowRoot.querySelector(".toggle-button");
      toggleButton.addEventListener("click", () => {
        is24HourFormat = !is24HourFormat;
        toggleAMPMSpinner();
        formatTime();
        validateTime();
      });

      // Function to update the time values from the input field
      const updateTimeFromInput = () => {
        const inputTime = timeInput.value.trim();

        if (inputTime) {
          const [inputHours, inputMinutes, inputSeconds] = inputTime.split(":");
          hourDisplay.textContent = inputHours.padStart(2, "0");
          minuteDisplay.textContent = inputMinutes.padStart(2, "0");
          secondDisplay.textContent = inputSeconds.padStart(2, "0");
          ampmDisplay.textContent = "AM"; // Set default AM for 24-hour format
        }
      };

      const updateDropdown = () => {
        const timePattern = is24HourFormat
          ? /^(\d{2}):(\d{2}):(\d{2})( Z)?$/
          : /^(\d{2}):(\d{2}):(\d{2}) (\w{2})?$/;
        const matches = timeInput.value.match(timePattern);

        console.log("Input value:", timeInput.value);
        console.log("Matches for updateDropdown():", matches);

        if (matches) {
          let hours = parseInt(matches[1], 10);
          const minutes = parseInt(matches[2], 10);
          const seconds = parseInt(matches[3], 10);
          let ampm = is24HourFormat ? "AM" : matches[4]?.toUpperCase() || "AM";

          if (!is24HourFormat) {
            if (hours === 0 && ampm === "AM") {
              ampm = "PM";
            } else if (hours > 12) {
              ampm = "PM";
              hours -= 12;
            }
          }

          // Update the display elements with the parsed time
          hourDisplay.textContent = hours.toString().padStart(2, "0");
          minuteDisplay.textContent = minutes.toString().padStart(2, "0");
          secondDisplay.textContent = seconds.toString().padStart(2, "0");
          ampmDisplay.textContent = ampm;

          // Update the AM/PM spinner in the dropdown
          const ampmSpinner = document.querySelector(".am-pm-spinner");
          const toggleButton = document.querySelector(".toggle-button");
          if (is24HourFormat) {
            ampmSpinner.classList.add("hidden");
            ampmSpinner.setAttribute("aria-hidden", "true");
            toggleButton.textContent = "Change to 12-Hour time";
          } else {
            ampmSpinner.classList.remove("hidden");
            ampmSpinner.setAttribute("aria-hidden", "false");
            toggleButton.textContent = "Change to 24-Hour time";
          }

          // Special case: If the input matches 12-hour format and is "12:00:00 AM" or "12:00:00 PM",
          // update the AM/PM spinner text to match the input
          if (
            is24HourFormat === false &&
            hours === 12 &&
            minutes === 0 &&
            seconds === 0
          ) {
            ampmDisplay.textContent = ampm;
          }
        }
      }

      // Event listeners for arrow buttons to increment/decrement time values
      document.querySelectorAll(".arrow").forEach((arrow) => {
        arrow.addEventListener("click", handleArrowButtonClick);
      });

      // Event listener for typing in the input field to update the time values
      timeInput.addEventListener("input", () => {
        updateTimeFromInput();
        updateDropdown();
        hideValidationMessage();
        hideWarningMessage();

        const hours = parseInt(hourDisplay.textContent, 10);
        const minutes = parseInt(minuteDisplay.textContent, 10);
        const seconds = parseInt(secondDisplay.textContent, 10);

        if (
          (is24HourFormat && (hours > 23 || minutes > 59 || seconds > 59)) ||
          (!is24HourFormat && (hours > 12 || minutes > 59 || seconds > 59))
        ) {
          showWarningMessage();
        } else {
          hideWarningMessage();
        }
      });

      // Event listener for typing in the AM/PM spinner to update the time values
      const ampmSpinner = this.shadowRoot.querySelector(".am-pm-spinner");
      ampmSpinner.addEventListener("input", () => {
        toggleAMPMSpinner();
        formatTime();
        validateTime();
      });
    });
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
}

customElements.define("time-picker", TimePicker);
