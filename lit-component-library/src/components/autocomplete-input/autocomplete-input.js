import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { layoutStyles } from "../layout-styles.js";
import { formStyles } from "../form-styles.js";
import { inputFieldStyles } from "../input-field/input-field-styles.js";
import { inputGroupStyles } from "../input-group/input-group-styles.js";
import { autocompleteInputStyles } from "./autocomplete-input-styles.js";
import Fontawesome from "lit-fontawesome";

class AutocompleteInput extends LitElement {
  static styles = [
    layoutStyles,
    formStyles,
    inputFieldStyles,
    inputGroupStyles,
    autocompleteInputStyles,
    Fontawesome,
    css`
      :host {
        display: block;
      }
    `,
  ];

  static properties = {
    disabled: { type: Boolean },
    formLayout: { type: String },
    formId: { type: String },
    inputId: { type: String },
    addBtn: { type: Boolean },
    addIcon: { type: String },
    clearBtn: { type: Boolean },
    clearIcon: { type: String },
    size: { type: String },
    label: { type: String },
    labelHidden: { type: Boolean },
    multiselect: { type: Boolean },
    required: { type: Boolean },
    type: { type: String },
    validation: { type: Boolean },
    validationMessage: { type: String },
    options: { type: Array },
    focusedOptionIndex: { type: Number }, // New property to track focused option
  };

  constructor() {
    super();
    this.addBtn = false;
    this.addIcon = "";
    this.disabled = false;
    this.formLayout = "";
    this.formId = "";
    this.inputId = "";
    this.label = "";
    this.labelHidden = false;
    this.multiselect = false;
    this.size = "";
    this.clearBtn = false;
    this.clearIcon = "";
    this.required = false;
    this.type = "";
    this.validation = false;
    this.validationMessage = "";
    this.options = [];
    this.filteredOptions = [];
    this.inputValue = "";

    this.focusedOptionIndex = -1; // -1 means no option is focused
    this.selectedOptionIndex = -1; // Initialize selectedOptionIndex
  }

  camelCase(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  }

  connectedCallback() {
    super.connectedCallback();
    // Add an event listener to close the dropdown when clicking outside
    this.boundClickListener = this.handleClickOutside.bind(this);
    document.addEventListener("click", this.boundClickListener);
  }

  disconnectedCallback() {
    // Remove the event listener when the component is removed from the DOM
    document.removeEventListener("click", this.boundClickListener);
    super.disconnectedCallback();
  }

  handleClickOutside(event) {
    // Check if the click is outside of this component
    if (!this.shadowRoot.contains(event.composedPath()[0])) {
      this.filteredOptions = []; // Close the dropdown
      this.focusedOptionIndex = -1; // Remove focus from any dropdown option
      this.selectedOptionIndex = -1; // Reset selectedOptionIndex
      this.requestUpdate(); // Trigger re-render to apply changes
    }
  }

  handleInput(event) {
    // For 'keydown' events, handle navigation
    if (event.type === "keydown") {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault(); // Prevent the cursor from moving
          this.navigateOptions(1); // Move focus down
          break;
        case "ArrowUp":
          event.preventDefault(); // Prevent the cursor from moving
          this.navigateOptions(-1); // Move focus up
          break;
        case "Enter":
          // Select the focused option
          if (this.focusedOptionIndex !== -1) {
            this.handleSelectOption(
              this.filteredOptions[this.focusedOptionIndex]
            );
            this.focusedOptionIndex = -1; // Reset focus
          }
          break;
        // Handle other keys as necessary
      }
    } else {
      // Handle input events for filtering options
      this.inputValue = event.target.value;
      this.filterOptions();
    }
  }

  navigateOptions(direction) {
    // Update focused option based on direction
    const newIndex = this.focusedOptionIndex + direction;
    if (newIndex >= 0 && newIndex < this.filteredOptions.length) {
      this.focusedOptionIndex = newIndex;
      this.requestUpdate();
    }
  }

  handleSelectOption(option) {
    this.inputValue = option;
    this.filteredOptions = [];
    this.focusedOptionIndex = -1; // Reset focus when option is selected
    this.selectedOptionIndex = -1; // Reset selectedOptionIndex
    this.requestUpdate(); // Ensure the component re-renders without the dropdown
  }

  filterOptions() {
    if (this.inputValue.length > 0) {
      this.filteredOptions = this.options.filter((option) =>
        option.toLowerCase().includes(this.inputValue.toLowerCase())
      );
    } else {
      // Close the dropdown by clearing filtered options
      this.filteredOptions = [];
      this.focusedOptionIndex = -1; // Reset focus when closing dropdown
    }
    this.requestUpdate(); // Trigger re-render
  }

  clearInput() {
    this.inputValue = ""; // Clear the input field
    this.filteredOptions = []; // Close the dropdown
    this.focusedOptionIndex = -1; // Remove focus from any dropdown option
    this.selectedOptionIndex = -1; // Reset selectedOptionIndex
    this.requestUpdate(); // Trigger re-render to apply changes
  }

  renderInputLabel(ids) {
    return html`
      <label
        class="form-control-label${this.labelHidden ? " sr-only" : ""}${this
          .formLayout === "horizontal"
          ? " col-2 no-padding col-form-label"
          : ""}${this.validation ? " invalid" : ""}"
        for=${ifDefined(ids ? ids : undefined)}
        >${this.formLayout === "horizontal" || this.formLayout === "inline"
          ? `${this.label}:`
          : `${this.label}`}${this.required
          ? html`<span class="required">*</span>`
          : ""}</label
      >
    `;
  }

  renderInput(ids, names) {
    return html`
      <div>
        <div class="pl-input-group">
          <input
            class="form-control${this.addBtn ||
            (this.clearBtn && this.inputValue.length > 0)
              ? " ac-form-control"
              : ""}${this.validation ? " is-invalid" : ""}${this.size === "sm"
              ? " basic-input-sm"
              : this.size === "lg"
              ? " basic-input-lg"
              : ""}"
            type="text"
            placeholder="${this.labelHidden
              ? this.label || this.placeholder || "Placeholder Text"
              : this.label || this.placeholder || "Placeholder Text"}"
            id=${ifDefined(ids ? ids : undefined)}
            name=${ifDefined(names ? names : undefined)}
            @input=${this.handleInput}
            @keydown=${(e) => this.handleKeydown(e)}
            .value=${this.inputValue}
            ?disabled=${this.disabled}
          />
          ${this.clearBtn && this.inputValue.length > 0
            ? html` <div class="pl-input-group-append">
                <button
                  class="pl-input-group-btn clear"
                  role="button"
                  aria-label="Clear input"
                  title="Clear input"
                  @click=${this.clearInput}
                >
                  <i class="${this.clearIcon || "fas fa-times"}"></i>
                </button>
              </div>`
            : ""}
          ${this.addBtn
            ? html` <div class="pl-input-group-append">
                <button
                  class="pl-input-group-btn add"
                  role="button"
                  aria-label="Add selected item"
                  title="Add selected item"
                >
                  <i class="${this.addIcon || "fas fa-plus"}"></i>
                </button>
              </div>`
            : ""}
        </div>
      </div>
    `;
  }

  renderMultiInput(ids, names) {
    return html`
      <div>
        <div class="ac-multi-select-container">
        <div class="pl-input-group">
          <input
            class="form-control${this.addBtn ||
            (this.clearBtn && this.inputValue.length > 0)
              ? " ac-form-control"
              : ""}${this.validation ? " is-invalid" : ""}${this.size === "sm"
              ? " basic-input-sm"
              : this.size === "lg"
              ? " basic-input-lg"
              : ""}"
            type="text"
            placeholder="${this.labelHidden
              ? this.label || this.placeholder || "Placeholder Text"
              : this.label || this.placeholder || "Placeholder Text"}"
            id=${ifDefined(ids ? ids : undefined)}
            name=${ifDefined(names ? names : undefined)}
            @input=${this.handleInput}
            @keydown=${(e) => this.handleKeydown(e)}
            .value=${this.inputValue}
            ?disabled=${this.disabled}
          />
          ${this.clearBtn && this.inputValue.length > 0
            ? html` <div class="pl-input-group-append">
                <button
                  class="pl-input-group-btn clear"
                  role="button"
                  aria-label="Clear input"
                  title="Clear input"
                  @click=${this.clearInput}
                >
                  <i class="${this.clearIcon || "fas fa-times"}"></i>
                </button>
              </div>`
            : ""}
          ${this.addBtn
            ? html` <div class="pl-input-group-append">
                <button
                  class="pl-input-group-btn add"
                  role="button"
                  aria-label="Add selected item"
                  title="Add selected item"
                >
                  <i class="${this.addIcon || "fas fa-plus"}"></i>
                </button>
              </div>`
            : ""}
        </div>
        </div>
      </div>
    `;
  }

  renderDropdown() {
    if (this.filteredOptions.length === 0) return null;

    return html`
      <div class="autocomplete-dropdown">
        <ul role="listbox" tabindex="-1">
          ${this.filteredOptions.map(
            (option, index) => html`
              <li
                class=${`autocomplete-dropdown-item ${
                  index === this.focusedOptionIndex ? "focused" : ""
                }${index === this.selectedOptionIndex ? "key-selected" : ""}`}
                @click=${() => this.handleSelectOption(option)}
                @keydown=${(e) => this.handleOptionKeydown(e, index)}
                tabindex="-1"
                role="option"
              >
                ${option}
              </li>
            `
          )}
        </ul>
      </div>
    `;
  }

  handleOptionKeydown(event, index) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.handleSelectOption(this.filteredOptions[index]);
      // Additional logic for handling Enter on a dropdown item if necessary
    }
  }

  handleKeydown(event) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault(); // Prevent the cursor from moving
        this.navigateOptions(1); // Move focus down
        break;
      case "ArrowUp":
        event.preventDefault(); // Prevent the cursor from moving
        this.navigateOptions(-1); // Move focus up
        break;
      case "Enter":
        event.preventDefault();
        if (this.focusedOptionIndex !== -1) {
          this.selectedOptionIndex = this.focusedOptionIndex; // Update selectedOptionIndex
          this.handleSelectOption(
            this.filteredOptions[this.focusedOptionIndex]
          );
          this.focusedOptionIndex = -1; // Optionally reset focusedOptionIndex if needed
          this.requestUpdate();
        }
        break;
      // Optionally handle other keys
    }
  }

  render() {
    const ids = this.camelCase(this.inputId).replace(/ /g, "");
    const names = this.camelCase(this.label).replace(/ /g, "");

    return html`
      <div class="${this.formLayout ? ` ${this.formLayout}` : ""}">
        <div
          class="form-group${this.formLayout === "horizontal"
            ? ` row`
            : this.formLayout === "inline"
            ? ` row inline`
            : ""}
            ${this.multiselect ? "ac-combobox-container" : ""}"
        >
          ${this.label ? this.renderInputLabel(ids) : ""}
          ${this.multiselect
            ? this.formLayout === "horizontal"
              ? html`
                  <div class="col-10">${this.renderMultiInput(ids, names)}</div>
                `
              : this.renderMultiInput(ids, names)
            : this.formLayout === "horizontal"
            ? html` <div class="col-10">${this.renderInput(ids, names)}</div> `
            : this.renderInput(ids, names)}
          ${this.renderDropdown()}
        </div>
      </div>
    `;
  }
}

customElements.define("autocomplete-input", AutocompleteInput);
