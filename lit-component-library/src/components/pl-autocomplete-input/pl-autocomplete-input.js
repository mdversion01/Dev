import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { layoutStyles } from "../layout-styles.js";
import { formStyles } from "../form-styles.js";
import { plInputFieldStyles } from "../pl-input-field/pl-input-field-styles.js";
import { plInputGroupStyles } from "../pl-input-group/pl-input-group-styles.js";
import { plAutocompleteInputStyles } from "./pl-autocomplete-input-styles.js";
import Fontawesome from "lit-fontawesome";

class PlAutocompleteInput extends LitElement {
  static styles = [
    layoutStyles,
    formStyles,
    plInputFieldStyles,
    plInputGroupStyles,
    plAutocompleteInputStyles,
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

    // Add a new property to track the last focused index before an update
    // Initialize in your constructor
    this.lastFocusedIndexBeforeUpdate = -1;
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
    document.addEventListener("click", this.handleDocumentClick);
  }

  disconnectedCallback() {
    // Remove the event listener when the component is removed from the DOM
    document.removeEventListener("click", this.boundClickListener);
    super.disconnectedCallback();
    document.removeEventListener("click", this.handleDocumentClick);
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
            if (this.focusedOptionIndex !== -1) {
              this.handleMultiSelectOption(
                this.filteredOptions[this.focusedOptionIndex]
              );
              this.focusedOptionIndex = -1; // Reset focus
            }
          } else {
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
    const items = this.shadowRoot.querySelectorAll(
      ".pl-autocomplete-dropdown-item"
    );
    if (index >= 0 && index < items.length) {
      const item = items[index];
      item.scrollIntoView({ block: "nearest", behavior: "smooth" });

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

  // Adjust handleMultiSelectOption to save focused index before update
  async handleMultiSelectOption(option) {
    const optionIndex = this.selectedItems.indexOf(option);
    if (optionIndex > -1) {
      this.selectedItems.splice(optionIndex, 1);
    } else {
      this.selectedItems.push(option);
    }

    // Save focused index before update
    this.lastFocusedIndexBeforeUpdate = this.focusedOptionIndex;

    this.selectedItems = [...this.selectedItems];
    await this.requestUpdate();

    // Restoration now occurs in updated()
  }

  // Adjusted updated method
  updated(changedProperties) {
    super.updated(changedProperties);
    if (this.lastFocusedIndexBeforeUpdate >= 0) {
      this.focusedOptionIndex = this.lastFocusedIndexBeforeUpdate;
      this.ensureOptionInView(this.focusedOptionIndex);
      this.lastFocusedIndexBeforeUpdate = -1; // Reset to avoid reusing
    }

    // Additional logic for accessibility improvements, like managing aria-activedescendant, can be added here
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

  clearInputField() {
    // Only clear the input field
    this.inputValue = "";
    // Trigger a UI update to reflect the cleared input field
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
        class="form-control-label${this.required ? " required" : ""}${this
          .labelHidden
          ? " sr-only"
          : ""}${this.formLayout === "horizontal"
          ? " col-md-2 no-padding col-form-label"
          : ""}${this.validation ? " invalid" : ""}"
        for=${ifDefined(ids ? ids : undefined)}
        >${this.formLayout === "horizontal" || this.formLayout === "inline"
          ? html`${this.label}:`
          : html`${this.label}`}
      </label>
    `;
  }

  renderInput(ids, names) {
    return html`
      <div class="pl-ac-basic-container">
        <div class="pl-input-group">
          <input
            aria-label="${ifDefined(this.labelHidden ? names : undefined)}"
            aria-labelledby=${ifDefined(names ? names : undefined)}
            aria-describedby=${ifDefined(
              this.validation ? "validationMessage" : undefined
            )}
            class="form-control${this.clearBtn && this.inputValue.length > 0
              ? " pl-ac-form-control"
              : ""}${this.validation ? " is-invalid" : ""}${this.size === "sm"
              ? " pl-input-sm"
              : this.size === "lg"
              ? " pl-input-lg"
              : ""}"
            type="text"
            placeholder="${this.labelHidden
              ? this.label || this.placeholder || "Placeholder Text"
              : this.label || this.placeholder || "Placeholder Text"}"
            id=${ifDefined(ids ? ids : undefined)}
            name=${ifDefined(names ? names : undefined)}
            @focus="${this.handleInteraction}"
            @blur="${this.handleDocumentClick}"
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

          <div
            class="b-underline${this.validation ? " invalid" : ""}"
            role="presentation"
          >
            <div
              class="b-focus${this.disabled ? " disabled" : ""}${this.validation
                ? " invalid"
                : ""}"
              role="presentation"
              aria-hidden="true"
            ></div>
          </div>
        </div>
      </div>
      ${this.validation
        ? html`<div class="invalid-feedback">${this.validationMessage}</div>`
        : ""}
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
      <div class="pl-ac-multi-select-container">
        <div class="pl-ac-selected-items">${this.renderSelectedItems()}</div>

        <div class="pl-ac-input-container">
          <div class="pl-ac-input-group">
            <input
              aria-label="${ifDefined(this.labelHidden ? names : undefined)}"
              aria-labelledby=${ifDefined(names ? names : undefined)}
              aria-describedby=${ifDefined(
                this.validation
                  ? this.validationMessage
                  : this.error
                  ? this.errorMessage
                  : undefined
              )}
              class="form-control${this.addBtn ||
              (this.clearBtn && this.inputValue.length > 0)
                ? " pl-ac-form-control"
                : ""}${this.validation ? " is-invalid" : ""}${this.size === "sm"
                ? " pl-input-sm"
                : this.size === "lg"
                ? " pl-input-lg"
                : ""}"
              type="text"
              placeholder="${this.labelHidden
                ? this.label || this.placeholder || "Placeholder Text"
                : this.label || this.placeholder || "Placeholder Text"}"
              id=${ifDefined(ids ? ids : undefined)}
              name=${ifDefined(names ? names : undefined)}
              @focus="${this.handleInteraction}"
              @blur="${this.handleDocumentClick}"
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
      <div
        class="b-underline${this.validation ? " invalid" : ""}"
        role="presentation"
      >
        <div
          class="b-focus${this.disabled ? " disabled" : ""}${this.validation
            ? " invalid"
            : ""}"
          role="presentation"
          aria-hidden="true"
        ></div>
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
      <div class="pl-autocomplete-dropdown">
        <ul role="listbox" tabindex="-1">
          ${this.filteredOptions.map(
            (option, index) => html`
              <li
                class=${`pl-autocomplete-dropdown-item${
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
      <div class="pl-autocomplete-dropdown">
        <ul role="listbox" tabindex="-1">
          ${this.filteredOptions.map(
            (option, index) => html`
              <li
                class=${`pl-autocomplete-dropdown-item ${
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

  handleInteraction(event) {
    // Stop the event from propagating to the document click handler
    event.stopPropagation();

    const bFocusDiv = this.shadowRoot.querySelector(".b-focus");
    const isInputFocused =
      event.target === this.shadowRoot.querySelector("input");

    if (bFocusDiv) {
      if (isInputFocused) {
        // Handle input focus
        bFocusDiv.style.width = "100%";
        bFocusDiv.style.left = "0";
      } else {
        // Handle input blur
        bFocusDiv.style.width = "0";
        bFocusDiv.style.left = "50%";
      }
    }
  }

  handleDocumentClick() {
    const bFocusDiv = this.shadowRoot.querySelector(".b-focus");
    if (bFocusDiv) {
      bFocusDiv.style.width = "0";
      bFocusDiv.style.left = "50%";
    }
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
      case "Esc":
      case "Escape":
        event.preventDefault();
        this.clearInputField();
        this.closeDropdown();
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
        if (this.focusedOptionIndex >= 0) {
          // Set aria-activedescendant for accessibility
          const inputElement =
            this.shadowRoot.querySelector("input[type='text']");
          const activeDescendantId = `option-${this.focusedOptionIndex}`;
          if (inputElement) {
            inputElement.setAttribute(
              "aria-activedescendant",
              activeDescendantId
            );
          }

          // Handle selection based on multiSelect status
          if (this.multiSelect) {
            this.handleMultiSelectOption(
              this.filteredOptions[this.focusedOptionIndex]
            );
          } else {
            this.handleSelectOption(
              this.filteredOptions[this.focusedOptionIndex]
            );
          }

          // Reset focused option
          this.focusedOptionIndex = -1;

          // Request an update to reflect changes
          this.requestUpdate();
        }
        break;
      case "Esc":
      case "Escape":
        event.preventDefault();
        this.clearInputField();
        this.closeDropdown();
        break;
      // Add other case handlers as needed
    }
  }

  closeDropdown() {
    this.filteredOptions = [];
    this.focusedOptionIndex = -1;
    this.requestUpdate();
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

  // render() {
  //   const ids = this.camelCase(this.inputId).replace(/ /g, "");
  //   const names = this.camelCase(this.label).replace(/ /g, "");

  //   return html`
  //     <div class="plumage${this.formLayout ? ` ${this.formLayout}` : ""}">
  //       <div
  //         class="form-group${this.formLayout === "horizontal"
  //           ? ` row`
  //           : this.formLayout === "inline"
  //           ? ` row inline`
  //           : ""}${this.multiSelect ? " pl-ac-combobox-container" : ""}"
  //       >
  //         ${this.label ? this.renderInputLabel(ids) : ""}
  //         ${this.multiSelect
  //           ? html`<div
  //               class="${this.formLayout === "horizontal" ? "col-10" : ""}"
  //             >
  //               ${this.renderMultipleSelections(ids, names)}
  //               ${this.renderMultiSelectDropdown()}
  //             </div>`
  //           : this.renderMultipleSelections(ids, names)
  //           ? html`<div
  //               class="${this.formLayout === "horizontal" ? "col-10" : ""}"
  //             >
  //               ${this.renderMultipleSelections(ids, names)}
  //               ${this.renderDropdown()}
  //             </div>`
  //           : this.formLayout === "horizontal"
  //           ? html`<div class="col-10">
  //               ${this.renderInput(ids, names)} ${this.renderDropdown()}
  //             </div>`
  //           : this.formLayout === "inline"
  //           ? html`<div>
  //               ${this.multiSelect
  //                 ? this.renderMultipleSelections(ids, names)
  //                 : this.multipleSelections
  //                 ? this.renderMultipleSelections(ids, names)
  //                 : this.renderInput(ids, names)}
  //               ${this.renderDropdown()}
  //             </div>`
  //           : html`${this.multiSelect
  //               ? this.renderMultipleSelections(ids, names)
  //               : this.multipleSelections
  //               ? this.renderMultipleSelections(ids, names)
  //               : this.renderInput(ids, names)}
  //             ${this.renderDropdown()}`}
  //       </div>
  //     </div>
  //   `;
  // }

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
          <div class="${this.formLayout === "horizontal" ? "col-10" : ""}">
            ${this.multiSelect || this.multipleSelections
              ? this.renderMultipleSelections(ids, names)
              : this.renderInput(ids, names)}
            ${this.multiSelect
              ? this.renderMultiSelectDropdown()
              : this.renderDropdown()}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("pl-autocomplete-input", PlAutocompleteInput);
