import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { layoutStyles } from "../layout-styles.js";
import { formStyles } from "./form-styles.js";
import Fontawesome from "lit-fontawesome";

class Form extends LitElement {
  static styles = [
    layoutStyles,
    formStyles,
    Fontawesome,
    css``,
  ];

  static get properties() {
    return {
      formLayout: { type: String },
    };
  }

  constructor() {
    super();
  }

  render() {

    return html`
        <form class="${
            this.formLayout === "horizontal"
            ? " horizontal"
            : this.formLayout === "inline"
            ? " inline"
            : ""
        }"> 
        
            <slot></slot>
        </form>
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

customElements.define("form-component", Form);
