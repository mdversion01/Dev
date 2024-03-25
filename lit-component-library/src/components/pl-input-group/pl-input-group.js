import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { layoutStyles } from "../layout-styles.js";
import { plInputFieldStyles } from "../pl-input-field/pl-input-field-styles.js";
import { plInputGroupStyles } from "./pl-input-group-styles.js";
import { formStyles } from "../form-styles.js";
import Fontawesome from "lit-fontawesome";

class PlInputGroup extends LitElement {
  static styles = [
    layoutStyles,
    plInputFieldStyles,
    plInputGroupStyles,
    formStyles,
    Fontawesome,
    css``,
  ];

  static get properties() {
    return {
      append: { type: Boolean },
      appendId: { type: String },
      disabled: { type: Boolean },
      formId: { type: String },
      formLayout: { type: String },
      icon: { type: String },
      inputId: { type: String },
      label: { type: String },
      labelHidden: { type: Boolean },
      placeholder: { type: String },
      prepend: { type: Boolean },
      prependId: { type: String },
      required: { type: Boolean },
      plumageSearch: { type: Boolean },
      size: { type: String },
      type: { type: String },
      validation: { type: Boolean },
      validationMessage: { type: String },
      value: { type: String },
    };
  }

  constructor() {
    super();
    this.append = false;
    this.appendId = "";
    this.disabled = false;
    this.formId = "";
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.icon = "";
    this.inputId = "";
    this.label = "";
    this.labelHidden = false;
    this.placeholder = "";
    this.prepend = false;
    this.prependId = "";
    this.required = false;
    this.type = "";
    this.plumageSearch = false;
    this.validation = false;
    this.validationMessage = "";
    this.value = "";
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.handleDocumentClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.handleDocumentClick);
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

  connectedCallback() {
    super.connectedCallback();

    // Access the formId and formLayout properties from the closest form-component
    const formComponent = this.closest("form-component");

    if (formComponent) {
      this.formId = formComponent.formId || "";
      this.formLayout = formComponent.formLayout || "";
      console.log("formId: ", this.formId);
      console.log("formLayout: ", this.formLayout);
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has("formId")) {
      const input = this.shadowRoot.querySelector("formField");
      if (input) {
        // Check if formId is not a symbol before setting the attribute
        if (typeof this.formId !== "symbol") {
          input.setAttribute("form", this.formId);
        } else {
          input.removeAttribute("form"); // Remove the form attribute if formId is a symbol
        }
      }
    }
  }

  handleInput(event) {
    const formId = this.formId;

    // Set the form attribute using event delegation
    if (formId !== undefined && typeof formId !== "symbol") {
      const form = event.target.form || document.getElementById(formId);
      if (form) {
        event.target.form = form;
      }
    } else {
      event.target.form = null;
    }
  }

  camelCase(str) {
    // Using replace method with regEx
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  }

  handleInputChange(event) {
    this.value = event.target.value;
  }

  clearInput() {
    this.value = ""; // Update the reactive property
    const inputElement = this.shadowRoot.querySelector(".search-bar");
    if (inputElement) {
      inputElement.value = ""; // Clear the input element directly
    }
  }

  renderInputGroup(ids, names) {
    return html`
      <div class="plumage${this.formLayout ? ` ${this.formLayout}` : ""}">
        <div
          class="form-group form-pl-input-group${this.formLayout ===
          "horizontal"
            ? ` row`
            : this.formLayout === "inline"
            ? ` row inline`
            : ""}"
        >
          <label
            class="form-control-label${this.required ? " required" : ""}${this
              .labelHidden
              ? " sr-only"
              : ""}${this.formLayout === "horizontal"
              ? " col-md-2 no-padding"
              : ""}${this.validation ? " invalid" : ""}"
            for=${ifDefined(ids ? ids : undefined)}
            >${this.formLayout === "horizontal" || this.formLayout === "inline"
              ? html`${this.label}:`
              : html`${this.label}`}
          </label>
          <div
            class=${ifDefined(
              this.formLayout === "horizontal"
                ? "col-md-10 no-padding"
                : undefined
            )}
          >
            <div
              class="pl-input-group${this.size === "sm"
                ? " pl-input-group-sm"
                : this.size === "lg"
                ? " pl-input-group-lg"
                : ""}${this.disabled ? " disabled" : ""}"
              @click="${this.handleInteraction}"
            >
              ${this.prepend
                ? html`<div
                    class="pl-input-group-prepend${this.validation
                      ? " is-invalid"
                      : ""}"
                  >
                    ${this.icon
                      ? html`<span class="pl-input-group-text"
                          ><i class="${this.icon}"></i
                        ></span>`
                      : html`<span
                          class="pl-input-group-text"
                          id=${ifDefined(
                            this.prependId ? this.prependId : undefined
                          )}
                          ><slot name="prepend"></slot
                        ></span>`}
                  </div>`
                : ""}
              <input
                type="${this.type || "text"}"
                class="form-control${this.validation ? " is-invalid" : ""}"
                placeholder="${this.labelHidden
                  ? this.label || this.placeholder || "Placeholder Text"
                  : this.label || this.placeholder || "Placeholder Text"}"
                id=${ifDefined(ids ? ids : undefined)}
                name=${ifDefined(names ? names : undefined)}
                value=${ifDefined(this.value ? this.value : undefined)}
                aria-label=${ifDefined(this.label ? this.label : undefined)}
                aria-labelledby=${ifDefined(names ? names : undefined)}
                aria-describedby=${ifDefined(
                  this.validation ? "validationMessage" : undefined
                )}
                ?disabled=${this.disabled}
                @focus="${this.handleInteraction}"
                @blur="${this.handleDocumentClick}"
                @input=${this.handleInput}
              />
              ${this.append
                ? html`<div
                    class="pl-input-group-append${this.validation
                      ? " is-invalid"
                      : ""}"
                  >
                    ${this.icon
                      ? html`<span class="pl-input-group-text"
                          ><i class="${this.icon}"></i
                        ></span>`
                      : html`<span
                          class="pl-input-group-text"
                          id=${ifDefined(
                            this.appendId ? this.appendId : undefined
                          )}
                          ><slot name="append"></slot
                        ></span>`}
                  </div>`
                : ""}

              <div
                class="b-underline${this.validation ? " invalid" : ""}"
                role="presentation"
              >
                <div
                  class="b-focus${this.disabled ? " disabled" : ""}${this
                    .validation
                    ? " invalid"
                    : ""}"
                  role="presentation"
                  aria-hidden="true"
                ></div>
              </div>
            </div>
            ${this.validation
              ? html`<div class="invalid-feedback">
                  ${this.validationMessage}
                </div>`
              : ""}
          </div>
        </div>
      </div>
    `;
  }

  renderPlumageSearchBar(ids, names) {
    return html`
      <div class="pl-input-group search-bar-container mb-3">
        <div class="pl-input-group-prepend" id="prepend-search">
          <span class="search-bar-icon">
            <i class="fas fa-search"></i>
          </span>
        </div>
        <input
          type="text"
          class="form-control search-bar"
          placeholder="${this.placeholder || "Search"}"
          id=${ifDefined(ids ? ids : undefined)}
          name=${ifDefined(names ? names : undefined)}
          value=${ifDefined(this.value ? this.value : undefined)}
          aria-label="${this.label || "Search"}"
          aria-describedby="prepend-search"
          @input="${this.handleInputChange}"
        />
        ${this.value && !this.disabled
          ? html`
              <span class="clear-icon" @click="${this.clearInput}">
                <i class="fas fa-times"></i>
              </span>
            `
          : ""}
      </div>
    `;
  }

  render() {
    const ids = this.camelCase(this.inputId).replace(/ /g, "");
    const names = this.camelCase(this.label).replace(/ /g, "");

    if (this.plumageSearch) {
      return this.renderPlumageSearchBar(ids, names);
    } else {
      return this.renderInputGroup(ids, names);
    }
  }

  _getClassNames() {
    const excludedProperties = [
      // Add other property names to be excluded from the class here
    ];

    return Array.from(this.attributes)
      .map((attr) => attr.name)
      .filter((name) => !excludedProperties.includes(name))
      .join(" ");
  }
}

customElements.define("pl-input-group-component", PlInputGroup);
