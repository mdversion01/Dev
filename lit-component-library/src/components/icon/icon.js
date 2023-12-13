import { LitElement, html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { iconStyles } from "./icon-styles";
import Fontawesome from "lit-fontawesome";

class Icon extends LitElement {
  static styles = [
    iconStyles,
    Fontawesome,
    // Additional styles if needed
  ];

  static get properties() {
    return {
      icon: { type: String },
      iconPosition: { type: String },
      iconSize: { type: String }, // New sizeClass property
      size: { type: Number },
      svg: { type: Boolean },
      color: { type: String }, // New color property
      ariaLabel: { type: String },
      ariaHidden: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.icon = "";
    this.iconPosition = "";
    this.iconSize = ""; // uses css class sizes
    this.size = ""; // Default size for inline style
    this.svg = false;
    this.color = ""; // Default color for inline style
    this.ariaLabel = "";
    this.ariaHidden = false;
  }

  render() {
    const iconPositionClass = this.iconPosition ? "ml-1" : "mr-1";

    if (this.iconPosition === "left") {
      return html`
        <i
          class="${this.icon} ${this.iconSize} mr-1"
          aria-hidden="${this.ariaHidden ? "false" : "true"}"
          aria-label=${ifDefined(this.ariaLabel ? this.ariaLabel : undefined)}
          style=${ifDefined(
            this.getSizeStyle() ? this.getSizeStyle() : undefined
          )}
        ></i>
      `;
    } else if (this.iconPosition === "right") {
      return html`
        <i
          class="${this.icon} ${this.iconSize} ml-1"
          aria-hidden="${this.ariaHidden ? "false" : "true"}"
          aria-label=${ifDefined(this.ariaLabel ? this.ariaLabel : undefined)}
          style=${ifDefined(
            this.getSizeStyle() ? this.getSizeStyle() : undefined
          )}
        ></i>
      `;
    } else {
      return html`
        <i
          class="${this.icon} ${this.iconSize}"
          aria-hidden="${this.ariaHidden ? "false" : "true"}"
          aria-label=${ifDefined(this.ariaLabel ? this.ariaLabel : undefined)}
          style=${ifDefined(
            this.getSizeStyle() ? this.getSizeStyle() : undefined
          )}
        ></i>
      `;
    }
  }

  getSizeStyle() {
    let style = "";
    if (this.size) {
      style += `font-size: ${this.size}px;`;
    }
    if (this.color) {
      style += `color: ${this.color};`;
    }
    return style;
  }
}

customElements.define("icon-component", Icon);
