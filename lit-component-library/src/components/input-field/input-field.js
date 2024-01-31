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
      inputId: { type: String },
      size: { type: String },
      label: { type: String },
      labelHidden: { type: Boolean },
      required: { type: Boolean },
      // search: { type: Boolean },
      type: { type: String },
      validation: { type: Boolean },
      validationMessage: { type: String },
      value: { type: String },
    };
  }

  constructor() {
    super();
    this.disabled = false;
    this.inputId = "";
    this.label = "";
    this.labelHidden = false;
    this.required = false;
    // this.search = false;
    this.type = "", 
    this.validation = false;
    this.validationMessage = "";
    this.value = "";
  }

  camelCase(str) {
    // Using replace method with regEx
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
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
          aria-labelledby=${ifDefined(names ? names : undefined)}
          ?disabled=${this.disabled}
        />
        ${this.validation
          ? html`<div class="invalid-feedback form-text">
              ${this.validationMessage}
            </div>`
          : ""}
      </div>
    `;
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
