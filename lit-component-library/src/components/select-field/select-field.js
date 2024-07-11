// SelectField Component

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
      classes: { type: String },
      custom: { type: Boolean },
      defaultTxt: { type: String },
      defaultOptionTxt: { type: String },
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
      withTable: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.classes = "";
    this.custom = false;
    this.defaultTxt = "";
    this.defaultOptionTxt = "Select an option";
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
    this.value = "none";
    this.options = [];
    this.withTable = false; // New property to determine if used with table
  }

  connectedCallback() {
    super.connectedCallback();

    const formComponent = this.closest("form-component");

    if (formComponent) {
      this.formId = formComponent.formId || "";
      this.formLayout = formComponent.formLayout || "";
    }

    if (this.withTable) {
      window.addEventListener(
        "sort-field-updated",
        this.updateSortField.bind(this)
      );
      window.addEventListener(
        "sort-order-updated",
        this.updateSortOrder.bind(this)
      );
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.withTable) {
      window.removeEventListener(
        "sort-field-updated",
        this.updateSortField.bind(this)
      );
      window.removeEventListener(
        "sort-order-updated",
        this.updateSortOrder.bind(this)
      );
    }
  }

  updateSortField(event) {
    if (this.id.includes("sortField")) {
      this.value = event.detail.value || "none";
      this.requestUpdate();
    }
  }

  updateSortOrder(event) {
    if (this.id.includes("sortOrder")) {
      this.value = event.detail.value || "asc"; // Default to 'asc'
      this.requestUpdate();
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has("formId")) {
      const input = this.shadowRoot.querySelector("formField");
      if (input) {
        if (typeof this.formId !== "symbol") {
          input.setAttribute("form", this.formId);
        } else {
          input.removeAttribute("form");
        }
      }
    }

    if (changedProperties.has("value")) {
      const selectElement = this.shadowRoot.querySelector("select");
      if (selectElement) {
        selectElement.value = this.value;
        // Force the select element to re-render to ensure the value is correctly displayed
        selectElement.selectedIndex = -1;
        selectElement.value = this.value;
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
            : ""}${this.classes ? ` ${this.classes}` : ""}"
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
          @change="${this.handleChange}"
        >
          ${this.id.includes("sortField")
            ? html`<option value="none" aria-label="none">--none--</option>`
            : ""}
          ${this.options
            ? this.options.map(
                (option) =>
                  html`<option
                    ?selected=${option.value === this.value}
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
    this.value = event.target.value; // Update the value property
    this.dispatchEvent(
      new CustomEvent("change", { detail: { value: this.value } })
    );
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
    const excludedProperties = [];

    return Array.from(this.attributes)
      .map((attr) => attr.name)
      .filter((name) => !excludedProperties.includes(name))
      .join(" ");
  }
}

customElements.define("select-field-component", SelectField);
