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
    error: { type: Boolean },
    errorMessage: { type: String },
    size: { type: String },
    label: { type: String },
    labelHidden: { type: Boolean },
    multiSelect: { type: Boolean },
    multipleSelections: { type: Boolean },
    required: { type: Boolean },
    type: { type: String },
    validation: { type: Boolean },
    validationMessage: { type: String },
    options: { type: Array },
    focusedOptionIndex: { type: Number }, // New property to track focused option
    selectedItems: { type: Array },
  };

  constructor() {
    super();
    this.addBtn = false;
    this.addIcon = "";
    this.disabled = false;
    this.error = false;
    this.errorMessage = "";
    this.formLayout = "";
    this.formId = "";
    this.inputId = "";
    this.label = "";
    this.labelHidden = false;
    this.multiSelect = false;
    this.multipleSelections = false;
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

    this.selectedItems = [];

    this.multiSelectedOptions = new Set(); // Track selected options in multi-select dropdown
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
    if (!this.shadowRoot.contains(event.composedPath()[0])) {
      this.filteredOptions = [];
      this.focusedOptionIndex = -1;
      if (this.multiSelect) {
        // Clear selections only if desired. If not, remove the next line.
        this.multiSelectedOptions.clear();
      }
      this.requestUpdate();
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
          if (this.multiSelect) {
            console.log("multiSelect");
            if (this.focusedOptionIndex !== -1) {
              this.handleMultiSelectOption(
                this.filteredOptions[this.focusedOptionIndex]
              );
              this.focusedOptionIndex = -1; // Reset focus
            }
          } else {
            console.log("not multiSelect");
            if (this.focusedOptionIndex !== -1) {
              this.handleSelectOption(
                this.filteredOptions[this.focusedOptionIndex]
              );
              this.focusedOptionIndex = -1; // Reset focus
            }
          }
          break;
        // Handle other keys as necessary
      }
    } else {
      // Handle input events for filtering options
      this.inputValue = event.target.value;
      this.filterOptions();

      // Update validation only if it's explicitly being used.
      if (this.required || this.validation) {
        this.validation = false;
      }

      // Reset error state on input change.
      this.error = false;
      this.errorMessage = "";

      this.requestUpdate();
    }
  }

  navigateOptions(direction) {
    // Update focused option based on direction
    const newIndex = this.focusedOptionIndex + direction;
    if (newIndex >= 0 && newIndex < this.filteredOptions.length) {
      this.focusedOptionIndex = newIndex;
      this.requestUpdate();
    }

    this.ensureOptionInView(newIndex);
  }

  async navigateMultiOptions(direction) {
    let newIndex = this.focusedOptionIndex + direction;
    const optionsCount = this.filteredOptions.length;

    if (newIndex < 0) {
      newIndex = optionsCount - 1;
    } else if (newIndex >= optionsCount) {
      newIndex = 0;
    }

    this.focusedOptionIndex = newIndex;

    // Await the completion of any updates to ensure DOM is in final state
    await this.updateComplete;

    this.ensureOptionInView(newIndex);
  }

  // Helper method to ensure the selected item is scrolled into view
  ensureOptionInView(index) {
    const items = this.shadowRoot.querySelectorAll('.autocomplete-dropdown-item');
    if (index >= 0 && index < items.length) {
        const item = items[index];
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });

        // Optional: if you also want to set focus, ensure item is focusable
        // item.focus();
    }
}

  handleSelectOption(option) {
    if (this.multipleSelections) {
      if (this.selectedItems.includes(option)) {
        // Set error for duplicate selection in multi-select mode
        this.error = true;
        this.errorMessage = "This item has already been selected.";
      } else {
        // Add item to selectedItems array if not already included
        this.selectedItems.push(option);
        this.error = false; // Clear previous error state
      }
      this.inputValue = ""; // Clear input field for further entries
    } else {
      // For non-multipleSelections, directly assign the selected option
      this.inputValue = option;
    }

    this.filteredOptions = [];
    this.focusedOptionIndex = -1;
    this.selectedOptionIndex = -1; // Ensure no option appears as 'key-selected'
    this.requestUpdate();
  }

  handleMultiSelectOption(option) {
    // Toggle selection for the option in multi-select mode
    const optionIndex = this.selectedItems.indexOf(option);
    if (optionIndex > -1) {
      // If already selected, remove from selection
      this.selectedItems.splice(optionIndex, 1);
    } else {
      // If not selected, add to selection
      this.selectedItems.push(option);
    }
    // Keep the focusedOptionIndex unchanged to stay at the current scroll position
    // Only update the dropdown list to reflect the current selection state
    //this.filteredOptions = [...this.filteredOptions];
    // Force update to reflect changes in the selection
    this.selectedItems = [...this.selectedItems];
    // No need to reset focusedOptionIndex here as we want to maintain position
    this.requestUpdate();
  }

  async updateComplete() {
    await super.updateComplete;
    // Ensure the previously focused item is visible
    this.ensureOptionInView(this.focusedOptionIndex);
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
    // Clear the input field
    this.inputValue = "";
    // Close the dropdown
    this.filteredOptions = [];
    this.focusedOptionIndex = -1;
    this.selectedOptionIndex = -1;
    // Clear selections in multiSelect mode or if multipleSelections is enabled
    if (this.multiSelect || this.multipleSelections) {
      this.multiSelectedOptions.clear();
      // Also clear selectedItems to remove selections from the UI
      this.selectedItems = [];
    }
    // Reset validation, if used
    if (this.required || this.validation) {
      this.validation = true;
    }
    // Reset error state
    this.error = false;
    this.errorMessage = "";
    // Trigger a UI update
    this.requestUpdate();
  }

  removeItem(itemToRemove) {
    this.selectedItems = this.selectedItems.filter(
      (item) => item !== itemToRemove
    );
    this.requestUpdate();
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
            ? html` <div
                class="pl-input-group-append${this.validation
                  ? " is-invalid"
                  : ""}"
              >
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
        </div>
        ${this.validation
          ? html`<div class="invalid-feedback">${this.validationMessage}</div>`
          : ""}
      </div>
    `;
  }

  renderSelectedItems() {
    return this.selectedItems.map(
      (item) => html`
        <span class="badge">
          <span>${item}</span>
          <button
            @click=${() => this.removeItem(item)}
            data-tag="${item}"
            role="button"
            class="remove-btn"
            title="Remove Tag"
            aria-label="Remove Tag"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
              />
            </svg>
          </button>
        </span>
      `
    );
  }

  renderMultipleSelections(ids, names) {
    return html`
      <div class="ac-multi-select-container">
        <div class="ac-selected-items">${this.renderSelectedItems()}</div>

        <div class="ac-input-container">
          <div class="ac-input-group">
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
              @keydown=${this.multiSelect
                ? (e) => this.handleMultiKeydown(e)
                : (e) => this.handleKeydown(e)}
              .value=${this.inputValue}
              ?disabled=${this.disabled}
            />
            ${this.clearBtn &&
            (this.inputValue.length > 0 || this.selectedItems.length > 0)
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
          </div>
        </div>
      </div>
      ${this.error
        ? html`<div class="error-message">${this.errorMessage}</div>`
        : ""}
      ${this.validation
        ? html`<div class="invalid-feedback">${this.validationMessage}</div>`
        : ""}
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
                class=${`autocomplete-dropdown-item${
                  this.size === "sm" ? " sm" : this.size === "lg" ? " lg" : ""
                }${index === this.focusedOptionIndex ? " focused" : ""}${
                  index === this.selectedOptionIndex ? " key-selected" : ""
                }`}
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

  renderMultiSelectDropdown() {
    if (this.filteredOptions.length === 0) return null;
    return html`
      <div class="autocomplete-dropdown">
        <ul role="listbox" tabindex="-1">
          ${this.filteredOptions.map(
            (option, index) => html`
              <li
                class=${`autocomplete-dropdown-item ${
                  this.size === "sm" ? " sm" : this.size === "lg" ? " lg" : ""
                } ${
                  this.selectedItems.includes(option) ? " key-selected" : ""
                } ${this.focusedOptionIndex === index ? " focused" : ""}`}
                @click=${() => this.handleClickMultiOption(option)}
                @keydown=${(e) => this.handleMultiOptionKeydown(e, index)}
                tabindex="0"
                role="option"
                aria-selected=${this.selectedItems.includes(option)
                  ? "true"
                  : "false"}
              >
                ${option}
              </li>
            `
          )}
        </ul>
      </div>
    `;
  }

  handleClickOption(option) {
    // Check if the option is already selected
    if (this.selectedItems.includes(option)) {
      // Option is already selected, remove it from selectedItems
      this.selectedItems = this.selectedItems.filter((item) => item !== option);
    } else {
      // Option is not selected, add it to selectedItems
      this.selectedItems.push(option);
    }
    // Clear the input field after adding or removing an option
    this.inputValue = "";
    this.requestUpdate(); // Reflect changes in the UI
  }

  handleAddSelectedItems() {
    // Add the selected items from the Set to the selectedItems array
    this.multiSelectedOptions.forEach((option) => {
      if (!this.selectedItems.includes(option)) {
        this.selectedItems.push(option);
      }
    });
    this.multiSelectedOptions.clear(); // Clear selections
    this.filteredOptions = []; // Optionally close dropdown
    this.requestUpdate(); // Update UI
  }

  handleOptionKeydown(event, index) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.handleSelectOption(this.filteredOptions[index]);
      // Additional logic for handling Enter on a dropdown item if necessary
    }
  }

  handleMultiOptionKeydown(e, index) {
    e.preventDefault();
    switch (e.key) {
      case "Enter":
        this.toggleMultiSelectItem(
          this.filteredOptions[this.focusedOptionIndex]
        );
        break;
      case "ArrowUp":
      case "ArrowDown":
        const direction = e.key === "ArrowDown" ? 1 : -1;
        this.navigateMultiOptions(direction);
        break;
      // Include other necessary cases, if any.
    }
  }

  toggleMultiSelectItem(option) {
    const index = this.selectedItems.indexOf(option);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(option);
    }
    // Use LitElement's way to force update arrays or objects
    this.selectedItems = [...this.selectedItems];
    this.requestUpdate("selectedItems");
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

  handleMultiKeydown(event) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault(); // Prevent cursor movement
        this.navigateOptions(1); // Navigate down
        break;
      case "ArrowUp":
        event.preventDefault(); // Prevent cursor movement
        this.navigateOptions(-1); // Navigate up
        break;
      case "Enter":
        event.preventDefault();
        if (this.multiSelect && this.focusedOptionIndex !== -1) {
          // For multi-select mode, use the specific multi-select handler
          this.handleMultiSelectOption(
            this.filteredOptions[this.focusedOptionIndex]
          );
          this.focusedOptionIndex = -1; // Reset focused option
        } else if (!this.multiSelect && this.focusedOptionIndex !== -1) {
          // For single-select mode, use the generic select handler
          this.handleSelectOption(
            this.filteredOptions[this.focusedOptionIndex]
          );
          this.focusedOptionIndex = -1; // Reset focused option
        }
        this.requestUpdate();
        break;
      // Add other case handlers as needed
    }
  }

  handleClickMultiOption(option) {
    const index = this.selectedItems.indexOf(option);
    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(option);
    }
    // Force update for selectedItems changes
    this.selectedItems = [...this.selectedItems];
    this.requestUpdate();
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
            : ""}${this.multiSelect ? " ac-combobox-container" : ""}"
        >
          ${this.label ? this.renderInputLabel(ids) : ""}
          ${this.multiSelect
            ? html`<div
                class="${this.formLayout === "horizontal" ? "col-10" : ""}"
              >
                ${this.renderMultipleSelections(ids, names)}
                ${this.renderMultiSelectDropdown()}
              </div>`
            : this.renderMultipleSelections(ids, names)
            ? html`<div
                class="${this.formLayout === "horizontal" ? "col-10" : ""}"
              >
                ${this.renderMultipleSelections(ids, names)}
                ${this.renderDropdown()}
              </div>`
            : this.formLayout === "horizontal"
            ? html`<div class="col-10">
                ${this.renderInput(ids, names)} ${this.renderDropdown()}
              </div>`
            : this.formLayout === "inline"
            ? html`<div>
                ${this.multiSelect
                  ? this.renderMultipleSelections(ids, names)
                  : this.multipleSelections
                  ? this.renderMultipleSelections(ids, names)
                  : this.renderInput(ids, names)}
                ${this.renderDropdown()}
              </div>`
            : html`${this.multiSelect
                ? this.renderMultipleSelections(ids, names)
                : this.multipleSelections
                ? this.renderMultipleSelections(ids, names)
                : this.renderInput(ids, names)}
              ${this.renderDropdown()}`}
        </div>
      </div>
    `;
  }
}

customElements.define("autocomplete-input", AutocompleteInput);
