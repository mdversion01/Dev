import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { layoutStyles } from "../layout-styles.js";
import { formStyles } from "./form-component-styles.js";
import Fontawesome from "lit-fontawesome";

class Form extends LitElement {
  static styles = [layoutStyles, formStyles, Fontawesome, css``];

  static get properties() {
    return {
      action: { type: String },
      fieldset: { type: Boolean },
      formLayout: { type: String },
      formId: { type: String },
      legend: { type: Boolean },
      legendPosition: { type: String },
      legendTxt: { type: String },
      method: { type: String },
      outsideOfForm: { type: Boolean },
      // styling properties
      bcolor: { type: String },
      bradius: { type: Number },
      bstyle: { type: String },
      bwidth: { type: Number },
      styles: { type: String },
    };
  }

  constructor() {
    super();
    this.action = "";
    this.fieldset = false;
    this.formId = "";
    this.legend = false;
    this.legendTxt = "";
    this.outsideOfForm = false;
    // styling properties
    this.bcolor = "";
    this.bradius = "";
    this.bstyle = "";
    this.bwidth = "";
    this.styles = "";
  }

  renderFromBase() {
    return html`
      ${this.outsideOfForm
        ? html`
            <div form=${ifDefined(this.formId ? this.formId : undefined)}>
              <slot name="input" .formLayout="${this.formLayout}"></slot>
            </div>
          `
        : html`
            <form
              class=${ifDefined(
                this.formLayout === "horizontal"
                  ? "horizontal"
                  : this.formLayout === "inline"
                  ? "inline"
                  : undefined
              )}
              action=${ifDefined(this.action ? this.action : undefined)}
              id=${ifDefined(this.id ? this.id : undefined)}
              method=${ifDefined(this.method ? this.method : undefined)}
            >
              <slot name="input" .formLayout="${this.formLayout}"></slot>
            </form>
          `}
    `;
  }

  renderFormWithFieldset(styles) {
    return html`
      ${this.outsideOfForm
        ? html`
            <fieldset style=${ifDefined(styles ? styles : undefined)} form=${ifDefined(this.formId ? this.formId : undefined)}>
              ${this.legend
                ? html`<legend class="${this.legendPosition || `left`}">
                    ${this.legendTxt || "Add Title Here"}
                  </legend>`
                : ""}
              <slot name="input" .formLayout="${this.formLayout}"></slot>
            </fieldset>
          `
        : html`
            <form
              class=${ifDefined(
                this.formLayout === "horizontal"
                  ? "horizontal"
                  : this.formLayout === "inline"
                  ? "inline"
                  : undefined
              )}
              action=${ifDefined(this.action ? this.action : undefined)}
              id=${ifDefined(this.id ? this.id : undefined)}
              method=${ifDefined(this.method ? this.method : undefined)}
            >
              <fieldset style=${ifDefined(styles ? styles : undefined)}>
                ${this.legend
                  ? html`<legend class="${this.legendPosition || `left`}">
                      ${this.legendTxt || "Add Title Here"}
                    </legend>`
                  : ""}
                <slot name="input" .formLayout="${this.formLayout}"></slot>
              </fieldset>
            </form>
          `}
    `;
  }

  render() {
    const dynamicStyles = [
      this.bcolor && `border-color: ${ifDefined(this.bcolor ? `${this.bcolor};` : undefined)}`,
      this.bstyle && `border-style: ${ifDefined(this.bstyle ? `${this.bstyle};` : undefined)}`,
      this.bwidth && `border-width: ${ifDefined(this.bwidth ? `${this.bwidth}px;` : undefined)}`,
      this.bradius && `border-radius: ${ifDefined(this.bradius ? `${this.bradius}px;` : undefined)}`,
    ]
      .filter((style) => style) // Remove falsy values (undefined, empty strings)
      .join(" "); // Join the styles with a space

    const styles = `${this.styles} ${dynamicStyles}`.trim();

    if (this.fieldset) {
      return this.renderFormWithFieldset(styles);
    } else {
      return this.renderFromBase();
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

customElements.define("form-component", Form);
