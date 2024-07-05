import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { layoutStyles } from "../layout-styles.js";
import { formStyles } from "../form-styles.js";
import { plInputFieldStyles } from "./pl-input-field-styles.js";
import Fontawesome from "lit-fontawesome";

class PlInputField extends LitElement {
  static styles = [
    layoutStyles,
    formStyles,
    plInputFieldStyles,
    Fontawesome,
    css``,
  ];

  static get properties() {
    return {
      disabled: { type: Boolean },
      formId: { type: String },
      formLayout: { type: String },
      inputId: { type: String },
      size: { type: String },
      label: { type: String },
      labelHidden: { type: Boolean },
      required: { type: Boolean },
      // search: { type: Boolean },
      validation: { type: Boolean },
      validationMessage: { type: String },
      value: { type: String },
    };
  }

  constructor() {
    super();
    this.disabled = false;
    this.formId = "";
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.inputId = "";
    this.label = "";
    this.labelHidden = false;
    this.required = false;
    // this.search = false;
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

  handleDocumentClick() {
    const bFocusDiv = this.shadowRoot.querySelector(".b-focus");
    if (bFocusDiv) {
      bFocusDiv.style.width = "0";
      bFocusDiv.style.left = "50%";
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

  render() {
    const ids = this.camelCase(this.inputId).replace(/ /g, "");
    const names = this.camelCase(this.label).replace(/ /g, "");

    return html`
      <div class="plumage${this.formLayout ? ` ${this.formLayout}` : ""}">
        <div
          class="form-group row${this.formLayout ? ` ${this.formLayout}` : ""}"
        >
          <label
            class="form-control-label${this.required ? " required" : ""}${this
              .labelHidden
              ? " sr-only"
              : ""}${this.formLayout === "horizontal"
              ? " col-2 no-padding"
              : ""}${this.validation ? " invalid" : ""}"
            for=${ifDefined(ids ? ids : undefined)}
            >${this.formLayout === "horizontal" || this.formLayout === "inline"
              ? `${this.label}:`
              : `${this.label}`}</label
          >

          <div
            class=${ifDefined(
              this.formLayout === "horizontal" ? "col-10 no-padding" : undefined
            )}
          >
            <div
              class="pl-input-container"
              @click="${this.handleInteraction}"
              role="presentation"
              aria-labelledby=${ifDefined(names ? names : undefined)}
            >
              <input
                type="${this.type || "text"}"
                class="pl-form-control${this.validation ? " is-invalid" : ""}${this
                  .size === "sm"
                  ? " pl-input-sm"
                  : this.size === "lg"
                  ? " pl-input-lg"
                  : ""}"
                placeholder="${this.labelHidden
                  ? this.label || this.placeholder || "Placeholder Text"
                  : this.label || this.placeholder || "Placeholder Text"}"
                id=${ifDefined(ids ? ids : undefined)}
                name=${ifDefined(names ? names : undefined)}
                value=${ifDefined(this.value ? this.value : undefined)}
                aria-label=${ifDefined(this.labelHidden ? names : undefined)}
                aria-labelledby=${ifDefined(names ? names : undefined)}
                aria-describedby=${ifDefined(
                  this.validation ? "validationMessage" : undefined
                )}
                ?disabled=${this.disabled}
                @focus="${this.handleInteraction}"
                @blur="${this.handleDocumentClick}"
                @input=${this.handleInput}
              />
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
              ${this.validation
                ? html`<div class="invalid-feedback">
                    ${this.validationMessage}
                  </div>`
                : ""}
            </div>
          </div>
        </div>
      </div>
    `;
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

customElements.define("pl-input-field-component", PlInputField);
