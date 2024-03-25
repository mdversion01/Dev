import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { layoutStyles } from "../layout-styles.js";
import { formStyles } from "../form-styles.js";
import { inputFieldStyles } from "./input-field-styles.js";
import Fontawesome from "lit-fontawesome";

class InputField extends LitElement {
  static styles = [
    layoutStyles,
    inputFieldStyles,
    formStyles,
    Fontawesome,
    css``,
  ];

  static get properties() {
    return {
      disabled: { type: Boolean },
      formLayout: { type: String },
      formId: { type: String },
      inputId: { type: String },
      size: { type: String },
      label: { type: String },
      labelHidden: { type: Boolean },
      required: { type: Boolean },
      type: { type: String },
      validation: { type: Boolean },
      validationMessage: { type: String },
      value: { type: String },
    };
  }

  constructor() {
    super();
    this.disabled = false;
    this.formId = "";
    this.inputId = "";
    this.label = "";
    this.labelHidden = false;
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

  camelCase(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  }

  renderInputLabel(ids) {
    return html`
      <label
        class="form-control-label${this.required
          ? " required" : ""}${this.labelHidden ? " sr-only" : ""}${this
          .formLayout === "horizontal"
          ? " col-2 no-padding col-form-label"
          : ""}${this.validation ? " invalid" : ""}"
        for=${ifDefined(ids ? ids : undefined)}
        >${this.formLayout === "horizontal" || this.formLayout === "inline"
          ? `${this.label}:`
          : `${this.label}`}</label
      >
    `;
  }

  renderInput(ids, names) {
    return html`
      <div>
        <input
          type="${this.type || "text"}"
          class="form-control${this.validation ? " is-invalid" : ""}${this
            .size === "sm"
            ? " basic-input-sm"
            : this.size === "lg"
            ? " basic-input-lg"
            : ""}"
          placeholder="${this.labelHidden
            ? this.label || this.placeholder || "Placeholder Text"
            : this.label || this.placeholder || "Placeholder Text"}"
          id=${ifDefined(ids ? ids : undefined)}
          name=${ifDefined(names ? names : undefined)}
          value=${ifDefined(this.value ? this.value : undefined)}
          aria-label="${ifDefined(this.labelHidden ? names : undefined)}"
          aria-labelledby=${ifDefined(names ? names : undefined)}
          aria-describedby=${ifDefined(this.validation ? "validationMessage" : undefined)}
          ?disabled=${this.disabled}
            @input=${this.handleInput ? this.handleInput : undefined}
        />
        ${this.validation
          ? html`<div class="invalid-feedback form-text">
              ${this.validationMessage}
            </div>`
          : ""}
      </div>
    `;
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
            : ""}"
        >
          ${this.renderInputLabel(ids, names)}
          ${this.formLayout === "horizontal"
            ? html`<div class="col-10">${this.renderInput(ids, names)}</div>`
            : this.renderInput(ids, names)}
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

customElements.define("input-field-component", InputField);
