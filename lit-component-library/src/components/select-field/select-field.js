import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { layoutStyles } from "../layout-styles.js";
import { formStyles } from "../form-styles.js";
import { selectFieldStyles } from "./select-field-styles.js";
import Fontawesome from "lit-fontawesome";

class SelectField extends LitElement {
  static styles = [
    layoutStyles,
    selectFieldStyles,
    formStyles,
    Fontawesome,
    css``,
  ];

  static get properties() {
    return {
      custom: { type: Boolean },
      defaultTxt: { type: String },
      disabled: { type: Boolean },
      formLayout: { type: String },
      formId: { type: String },
      selectFieldId: { type: String },
      options: { type: Array },
      selected: { type: Boolean },
      size: { type: String },
      label: { type: String },
      labelHidden: { type: Boolean },
      multiple: { type: Boolean },
      required: { type: Boolean },
      validation: { type: Boolean },
      validationMessage: { type: String },
      value: { type: String },
    };
  }

  constructor() {
    super();
    this.custom = false;
    this.defaultTxt = "";
    this.disabled = false;
    this.formId = "";
    this.selectFieldId = "";
    this.label = "";
    this.labelHidden = false;
    this.multiple = false;
    this.required = false;
    this.selected = false;
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

  renderSelectLabel(ids, names) {
    return html`
      <label
        class="form-control-label${this.required ? " required" : ""}${this
          .labelHidden
          ? " sr-only"
          : ""}${this.formLayout === "horizontal"
          ? " col-2 no-padding col-form-label"
          : ""}${this.validation ? " invalid" : ""}"
        for=${ifDefined(ids ? ids : undefined)}
        >${this.formLayout === "horizontal" || this.formLayout === "inline"
          ? `${this.label}:`
          : `${this.label}`}</label
      >
    `;
  }

  renderSelectField(ids, names) {
    return html`
      <div>
        <select
          id=${ifDefined(ids ? ids : undefined)}
          class="${this.custom
            ? "custom-select"
            : "form-select"} form-control${this.validation
            ? " is-invalid"
            : ""}${this.size === "sm"
            ? " select-sm"
            : this.size === "lg"
            ? " select-lg"
            : ""}"
          ?multiple=${this.multiple}
          ?disabled=${this.disabled}
          aria-label=${ifDefined(names ? names : undefined)}
          aria-labelledby=${ifDefined(names ? names : undefined)}
          aria-describedby=${ifDefined(
            this.validation ? "validationMessage" : undefined
          )}
          ?required=${this.required}
          aria-invalid=${this.validation}
          aria-multiselectable=${this.multiple}
          role=${this.multiple ? "combobox" : "listbox"}
        >
          ${this.options
            ? this.options.map(
                (option) =>
                  html`<option
                    ?selected=${this.selected}
                    value=${option.value}
                    aria-label=${option.name}
                  >
                    ${option.name}
                  </option>`
              )
            : html``}
        </select>
        ${this.validation
          ? html`<div class="invalid-feedback form-text">
              ${this.validationMessage}
            </div>`
          : ""}
      </div>
    `;
  }

  handleChange(event) {
    console.log('Selected value:', event.target.value);
    this.dispatchEvent(new CustomEvent('change', { detail: { value: event.target.value } }));
  }

  render() {
    const ids = this.camelCase(this.selectFieldId).replace(/ /g, "");
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
          ${this.renderSelectLabel(ids, names)}
          ${this.formLayout === "horizontal"
            ? html`<div class="col-10">
                ${this.renderSelectField(ids, names)}
              </div>`
            : this.renderSelectField(ids, names)}
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

customElements.define("select-field-component", SelectField);
