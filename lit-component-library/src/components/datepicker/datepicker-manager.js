import { LitElement, html, css } from "lit";
import Fontawesome from "lit-fontawesome";
import { formStyles } from "../form-styles.js";

class DatePickerManager extends LitElement {
  static styles = [
    Fontawesome,
    formStyles,
    css`
      .input-group {
        display: flex;
        align-items: center;
      }

      .calendar-button {
        background: none;
        border: none;
        cursor: pointer;
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
      }

      .dropdown.open .dropdown-content {
        display: block;
      }
    `,
  ];

  static get properties() {
    return {
      selectedPicker: { type: String },
      dropdownOpen: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.selectedPicker = "datepicker"; // Default picker
    this.dropdownOpen = false;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectPicker(picker) {
    this.selectedPicker = picker;
    this.dropdownOpen = false;
  }

  renderPicker() {
    switch (this.selectedPicker) {
      case "daterangepicker":
        return html`<date-range-picker></date-range-picker>`;
      case "datetimerangepicker":
        return html`<date-range-time-picker></date-range-time-picker>`;
      case "datepicker":
      default:
        return html`<date-picker></date-picker>`;
    }
  }

  render() {
    return html`
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Select a date"
          readonly
        />
        <button @click=${this.toggleDropdown} class="calendar-button">
          <i class="fas fa-calendar-alt"></i>
        </button>
      </div>

      <div class="dropdown ${this.dropdownOpen ? "open" : ""}">
        <div class="dropdown-content">
          <button @click=${() => this.selectPicker("datepicker")}>
            Date Picker
          </button>
          <button @click=${() => this.selectPicker("daterangepicker")}>
            Date Range Picker
          </button>
          <button @click=${() => this.selectPicker("datetimerangepicker")}>
            Date Range Time Picker
          </button>
          <div>${this.renderPicker()}</div>
        </div>
      </div>
    `;
  }
}

customElements.define("datepicker-manager", DatePickerManager);
