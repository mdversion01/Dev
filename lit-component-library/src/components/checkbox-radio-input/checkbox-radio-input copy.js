import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { layoutStyles } from "../layout-styles.js";
import { checkboxRadioStyles } from "./checkbox-radio-input-styles.js";
import Fontawesome from "lit-fontawesome";

class CheckboxRadioInput extends LitElement {
  static styles = [layoutStyles, checkboxRadioStyles, Fontawesome, css``];

  static get properties() {
    return {
      checked: { type: Boolean },
      checkbox: { type: Boolean },
      disabled: { type: Boolean },
      inputId: { type: String },
      noLabel: { type: Boolean },
      labelTxt: { type: String },
      name: { type: String },
      radio: { type: Boolean },
      radioGroup: { type: Boolean },
      radioGroupOptions: { type: Array },
      selectedValue: { type: String },
      validation: { type: Boolean },
      validationMessage: { type: String },
      value: { type: String },
      inline: { type: Boolean },

      //   formLayout: { type: String },
      //   outsideOfForm: { type: Boolean },
      //   // styling properties
      //   bcolor: { type: String },
      //   bradius: { type: Number },
      //   bstyle: { type: String },
      //   bwidth: { type: Number },
      //   styles: { type: String },
    };
  }

  constructor() {
    super();
    this.checked = false;
    this.checkbox = false;
    this.disabled = false;
    this.inputId = "";
    this.noLabel = false;
    this.labelTxt = "";
    this.name = "";
    this.radio = false;
    this.radioGroup = false;
    // this.radioGroupOptions = [];
    this.selectedValue = "";
    this.validation = false;
    this.validationMessage = "";
    this.value = "";
    this.inline = false;

    // this.outsideOfForm = false;
    // styling properties
    // this.bcolor = "";
    // this.bradius = "";
    // this.bstyle = "";
    // this.bwidth = "";
    // this.styles = "";
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
    this.addEventListener("change", this.handleInputChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("change", this.handleInputChange);
  }

  handleInputChange() {
    // Update the validation property to false when an input changes
    this.validation = false;
  }

  renderCheckbox(ids, names) {
    return html`
      <div class="form-group${this.inline ? " form-check-inline" : ""}${this.validation ? " was-validated" : ""}">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=${ifDefined(this.value)}
            id=${ifDefined(ids ? ids : undefined)}
            aria-label=${ifDefined(!this.label ? this.labelTxt : undefined)}
            ?disabled=${this.disabled}
            ?required=${this.validation}
            @change="${this.handleInputChange}"
          />
          ${this.noLabel
            ? ""
            : html`<label
                class="form-check-label"
                for=${ifDefined(ids ? ids : undefined)}
                >${this.labelTxt}</label
              >`}

              ${this.validation
          ? html`<div class="invalid-feedback form-text">
              ${this.validationMessage}
            </div>`
          : ""}
        </div>
       
      </div>
    `;
  }

  renderRadio(ids, names) {
    return html`
      <div class="form-group${this.inline ? " form-check-inline" : ""}${this.validation ? " was-validated" : ""}">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name=${ifDefined(names ? names : undefined)}
            id=${ifDefined(ids ? ids : undefined)}
            value=${ifDefined(this.value)}
            ?checked=${this.checked}
            aria-label=${ifDefined(!this.label ? this.labelTxt : undefined)}
            ?disabled=${this.disabled}
            ?required=${this.validation}
            @change="${this.handleInputChange}"
          />
          ${this.noLabel
            ? ""
            : html`<label
                class="form-check-label"
                for=${ifDefined(ids ? ids : undefined)}
                >${this.labelTxt}</label
              >`}
              ${this.validation
          ? html`<div class="invalid-feedback form-text">
              ${this.validationMessage}
            </div>`
          : ""}
        </div>
        
      </div>
    `;
  }

  renderRadioGroup(names) {
    return html`
      ${this.radioGroupOptions
        ? this.radioGroupOptions.map(
            (option) => html`
              <div class="form-group${this.inline ? " form-check-inline" : ""}${this.validation ? " was-validated" : ""}">
                <div
                  class="form-check"
                >
                  <input
                    class="form-check-input${this.noLabel
                      ? " position-static"
                      : ""}"
                    type="radio"
                    name=${ifDefined(names ? names : undefined)}
                    id=${ifDefined(option.inputId ? option.inputId : undefined)}
                    value=${ifDefined(option.value)}
                    ?checked=${option.checked
                      ? option.checked
                      : true
                      ? this.selectedValue === option.value
                      : false}
                    aria-label=${ifDefined(
                      !this.noLabel ? this.labelTxt : undefined
                    )}
                    @change="${this.handleRadioGroupChange}"
                    ?disabled=${option.disabled}
                    ?required=${this.validation}
                  />
                  ${this.noLabel
                    ? ""
                    : html`<label
                        class="form-check-label"
                        for=${ifDefined(
                          option.inputId ? option.inputId : undefined
                        )}
                        >${option.labelTxt}</label
                      >`}
                </div>
                ${this.validation
                  ? html`<div class="invalid-feedback form-text">
                      ${this.validationMessage}
                    </div>`
                  : ""}
              </div>
            `
          )
        : html``}
    `;
  }

  handleRadioGroupChange(event) {
    const target = event.target;
    if (target.checked) {
      this.selectedValue = target.value;
      this.dispatchEvent(
        new CustomEvent("value-changed", { detail: this.selectedValue })
      );
    }
  }

  updated(changedProperties) {
    if (changedProperties.has("radioGroupOptions")) {
      // Trigger a re-render when radioGroupOptions changes
      this.requestUpdate();
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    const ids = this.camelCase(this.inputId).replace(/ /g, "");
    const names = this.camelCase(this.name).replace(/ /g, "");

    if (this.checkbox) {
      return html`${this.renderCheckbox(ids, names)}`;
    }

    if (this.radio) {
      return html`${this.renderRadio(ids, names)}`;
    }

    if (this.radioGroup) {
      return html`${this.renderRadioGroup(names)}`;
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

customElements.define("checkbox-radio-input-component", CheckboxRadioInput);
