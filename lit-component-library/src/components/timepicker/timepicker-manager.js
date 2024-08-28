import { LitElement, html, css } from "lit";
import "./timepicker"; // Ensure correct paths to your components
import "./plTimepicker"; // Ensure correct paths to your components

class TimepickerManager extends LitElement {
  
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
      usePlTimePicker: { type: Boolean },
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
    this.usePlTimePicker = false; // Default to TimePicker
    this.inputWidth = 100;
  }

  render() {
    return html`
      ${this.usePlTimePicker
        ? html`<pl-time-picker
        .ariaLabel="${this.ariaLabel}"
        .ariaLabelledby="${this.ariaLabelledby}"
        .id="${this.id}"
        .inputName="${this.inputName}"
        .is24HourFormat="${this.is24HourFormat}"
        .size="${this.size}"
        .validationMessage="${this.validationMessage}"
        .display24HourOnly="${this.display24HourOnly}"
        .display12HourOnly="${this.display12HourOnly}"
        .hideTimepickerBtn="${this.hideTimepickerBtn}"
        .isValid="${this.isValid}"
        .hideSeconds="${this.hideSeconds}"
        .inputWidth="${this.inputWidth}"
        ></pl-time-picker>`
        : html`<time-picker
        .ariaLabel="${this.ariaLabel}"
        .ariaLabelledby="${this.ariaLabelledby}"
        .id="${this.id}"
        .inputName="${this.inputName}"
        .is24HourFormat="${this.is24HourFormat}"
        .size="${this.size}"
        .validationMessage="${this.validationMessage}"
        .display24HourOnly="${this.display24HourOnly}"
        .display12HourOnly="${this.display12HourOnly}"
        .hideTimepickerBtn="${this.hideTimepickerBtn}"
        .isValid="${this.isValid}"
        .hideSeconds="${this.hideSeconds}"
        .inputWidth="${this.inputWidth}"
        ></time-picker>`}
    `;
  }
}

customElements.define("timepicker-manager", TimepickerManager);
