import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { layoutStyles } from "../layout-styles.js";
import { plInputFieldStyles } from "../pl-input-field/pl-input-field-styles.js";
import { inputGroupStyles } from "./input-group-styles.js";
import { formStyles } from "../form-styles.js"; 
import Fontawesome from "lit-fontawesome";

class InputGroup extends LitElement {
  static styles = [
    layoutStyles,
    formStyles,
    plInputFieldStyles,
    inputGroupStyles,
    Fontawesome,
    css``,
  ];

  static get properties() {
    return {
      append: { type: Boolean },
      appendId: { type: String },
      disabled: { type: Boolean },
      formLayout: { type: String },
      icon: { type: String },
      inputSize: { type: String },
      label: { type: String },
      labelHidden: { type: Boolean },
      placeholder: { type: String },
      prepend: { type: Boolean },
      prependId: { type: String },
      required: { type: Boolean },
      search: { type: Boolean },
      size: { type: String },
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
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.icon = "";
    this.label = "";
    this.labelHidden = false;
    this.placeholder = "";
    this.prepend = false;
    this.prependId = "";
    this.required = false;
    this.search = false;
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

  renderInputGroup(ids) {
    return html`
      <div class=${ifDefined(this.formLayout ? this.formLayout : undefined)}>
        <div class="form-group form-input-group-basic row ${this.formLayout}">
          <label
            class="form-control-label${this.labelHidden ? " sr-only" : ""}${this
              .formLayout === "horizontal"
              ? " col-md-2 no-padding"
              : ""}${this.validation ? " invalid" : ""}"
            for=${ifDefined(ids ? ids : undefined)}
            >${this.formLayout === "horizontal" || this.formLayout === "inline"
              ? `${this.label}:`
              : `${this.label}`}${this.required
              ? html`<span class="required">*</span>`
              : ""}</label
          >
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
                : ""}"
            >
              ${this.prepend
                ? html`<div class="pl-input-group-prepend${this.validation
                      ? " is-invalid"
                      : ""}">
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
                type="text"
                class="form-control${this.validation ? " is-invalid" : ""}"
                placeholder="${this.placeholder || this.label || ""}"
                aria-labelledby=${ifDefined(ids ? ids : undefined)}
                aria-describedby=${ifDefined(ids ? ids : undefined)}
              />
              ${this.append
                ? html`<div class="pl-input-group-append${this.validation
                      ? " is-invalid"
                      : ""}">
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

  render() {
    const ids = this.camelCase(this.label).replace(/ /g, "");

    return this.renderInputGroup(ids);
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

customElements.define("input-group-component", InputGroup);
