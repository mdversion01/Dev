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
      formId: { type: String },
      formLayout: { type: String },
      icon: { type: String },
      inputId: { type: String },
      inputSize: { type: String },
      label: { type: String },
      labelHidden: { type: Boolean },
      otherContent: { type: Boolean },
      placeholder: { type: String },
      prepend: { type: Boolean },
      prependId: { type: String },
      required: { type: Boolean },
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
    this.icon = "";
    this.inputId = "";
    this.label = "";
    this.labelHidden = false;
    this.otherContent = false;
    this.placeholder = "";
    this.prepend = false;
    this.prependId = "";
    this.required = false;
    this.type = "";
    this.validation = false;
    this.validationMessage = "";
    this.value = "";
  }

  connectedCallback() {
    super.connectedCallback();

    // Access the formId and formLayout properties from the closest form-component
    const formComponent = this.closest("form-component");

    if (formComponent) {
      this.formId = formComponent.formId || "";
      this.formLayout = formComponent.formLayout || "";
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
    this.value = event.target.value;
    this.dispatchEvent(
      new CustomEvent("change", { detail: { value: this.value } })
    );
  }

  handleClear() {
    console.log("handleClear triggered");
    this.value = "";
    const inputElement = this.shadowRoot.querySelector("input");
    if (inputElement) {
      inputElement.value = "";
      this.dispatchEvent(new CustomEvent("change", { detail: { value: "" } }));
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

  renderInputGroup(ids, names) {
    return html`
      <div class=${ifDefined(this.formLayout ? this.formLayout : undefined)}>
        <div class="form-group form-input-group-basic row ${this.formLayout}">
          <label
            class="form-control-label${this.required ? " required" : ""}${this
              .labelHidden
              ? " sr-only"
              : ""}${this.formLayout === "horizontal"
              ? " col-md-2 no-padding"
              : ""}${this.validation ? " invalid" : ""}"
            for=${ifDefined(ids ? ids : undefined)}
            >${this.formLayout === "horizontal" || this.formLayout === "inline"
              ? `${this.label}:`
              : `${this.label}`}</label
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
                ? html`<div
                    class="pl-input-group-prepend${this.validation
                      ? " is-invalid"
                      : ""}"
                  >
                    ${this.icon
                      ? html`<span class="pl-input-group-text"
                          ><i class="${this.icon}"></i
                        ></span>`
                      : this.otherContent
                      ? html`<slot name="prepend"></slot>`
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
                  ? this.placeholder || this.label || "Placeholder Text"
                  : this.placeholder || this.label || "Placeholder Text"}"
                id=${ifDefined(ids ? ids : undefined)}
                name=${ifDefined(names ? names : undefined)}
                value=${ifDefined(this.value ? this.value : undefined)}
                aria-label=${ifDefined(names ? names : undefined)}
                aria-labelledby=${ifDefined(names ? names : undefined)}
                aria-describedby=${ifDefined(
                  this.validation ? "validationMessage" : undefined
                )}
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
                      : this.otherContent
                      ? html`<span class="pl-btn"
                          ><slot name="append"></slot></span>` : 
                      html`<span
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
    const ids = this.camelCase(this.inputId).replace(/ /g, "");
    const names = this.camelCase(this.label).replace(/ /g, "");
    return this.renderInputGroup(ids, names);
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
