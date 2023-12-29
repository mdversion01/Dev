import { LitElement, html, css } from "lit";
import "../button/button.js"; // Import the PlButton component
import { buttonGroupStyles } from "./button-group-styles.js"; // Import the button group styles

class ButtonGroup extends LitElement {
  static styles = [
      buttonGroupStyles,
      css`
        ::slotted(pl-button) {
          width: 100%;
          margin: 0;
        }
      `,
    ];
    

  static get properties() {
    return {
      ariaLabel: { type: String },
      classNames: { type: String },
      vertical: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.ariaLabel = "";
    this.classNames = "";
    this.vertical = false;
  }

  renderButtonGroup(
    classAttribute,
  ) {
    return html`
      <div role="group" aria-label="${this.ariaLabel || "Button Group"}" class="${classAttribute}">
        <slot name="buttons"></slot>
      </div>
    `;
  }

  renderButtonGroupVertical(
    classAttribute,
  ) { // Add this method
    return html`
      <div role="group" aria-label="${this.ariaLabel || "Button Group"}" class="${classAttribute}">
        <slot name="buttons"></slot>
      </div>
    `;
  }

  render() {

    // Construct class attribute with conditional inclusion of classes
    let classAttribute = this.vertical ? "pl-btn-group-vertical" : "pl-btn-group";
    classAttribute += this.classNames ? ` ${this.classNames}` : "";
    classAttribute += this._getClassNames() ? ` ${this._getClassNames()}` : "";

    // Render the button group
    if (this.vertical) {
      return this.renderButtonGroupVertical(
        classAttribute,
      );
    } else {
      return this.renderButtonGroup(
        classAttribute,
      );
    }
  }

  _getClassNames() {
    const excludedProperties = [
      "ariaLabel",
      "classnames",
      "slot",
      "vertical",
    ];
  }
}

customElements.define("button-group", ButtonGroup);
