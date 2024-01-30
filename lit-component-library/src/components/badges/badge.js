import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { badgeStyles } from "./badge-styles";
import { colorStyles } from "../../styles/colors.js";
// import Fontawesome from "lit-fontawesome";

// Constants for string literals
const PL_BADGE = "pl-badge";
const PL_BADGE_BADGE = "pl-badge__badge";
const PL_BADGE_WRAPPER = "pl-badge__wrapper";
const PL_BADGE_DOT = "pl-badge--dot";
const ICON_CLASS = "icon";

class PlBadge extends LitElement {
  static styles = [colorStyles, badgeStyles];

  static get properties() {
    return {
      absolute: { type: Boolean },
      bdgPosition: { type: String },
      bordered: { type: Boolean },
      bottom: { type: String },
      classNames: { type: String },
      color: { type: String },
      disabled: { type: Boolean },
      dot: { type: Boolean },
      icon: { type: Boolean },
      styles: { type: String },
      inlineStyles: { type: String },
      inset: { type: Boolean },
      left: { type: String },
      offsetX: { type: String },
      offsetY: { type: String },
      outlined: { type: Boolean },
      right: { type: String },
      shape: { type: String },
      size: { type: String },
      token: { type: Boolean },
      top: { type: String },
      variant: { type: String },
      zIndex: { type: String },
    };
  }

  constructor() {
    super();
    this.absolute = false;
    this.bdgPosition = "";
    this.bordered = false;
    this.bottom = "";
    this.classNames = "";
    this.color = "";
    this.disabled = false;
    this.dot = false;
    this.icon = false;
    this.styles = "";
    this.inlineStyles = "";
    this.inset = false;
    this.left = "";
    this.offsetX = "12";
    this.offsetY = "12";
    this.outlined = false;
    this.right = "";
    this.token = false;
    this.top = "";
    this.variant = "";
    this.zIndex = "";
  }

  // render() {
  renderBadgeToken(
    tokenClassAttribute,
    colorClassAttribute,
    styles,
    bordered
  ) {
    return html`
      <div
        class="${PL_BADGE} ${PL_BADGE_BADGE} ${colorClassAttribute} ${bordered}"
        ?disabled="${this.disabled}"
      >
        <slot></slot>
        <span class="${PL_BADGE_WRAPPER}">
          <span
            aria-atomic="true"
            aria-label="${this.label || "Badge"}"
            aria-live="polite"
            class="${tokenClassAttribute}"
            role="status"
            style=${ifDefined(styles ? styles : undefined)}
          >
            <slot name="token"></slot>
          </span>
        </span>
      </div>
    `;
  }

  renderDotBadge(tokenClassAttribute, styles) {
    return html`
      <div
        class="${PL_BADGE_BADGE} ${PL_BADGE_DOT}"
        ?disabled="${this.disabled}"
      >
        <slot></slot>
        <span class="${PL_BADGE_WRAPPER}">
          <span
            aria-atomic="true"
            aria-label="${this.label || "Badge"}"
            aria-live="polite"
            class="${tokenClassAttribute}"
            role="status"
            style=${ifDefined(styles ? styles : undefined)}
          >
          </span>
        </span>
      </div>
    `;
  }

  renderPositionedBadge(classAttribute) {
    return html`
      <div
        class="${classAttribute} ${this.bdgPosition === "left"
          ? "mr-1"
          : "ml-1"}"
        ?disabled="${this.disabled}"
      >
        <slot></slot>
      </div>
    `;
  }

  renderDefaultBadge(classAttribute) {
    return html`
      <div class="${classAttribute}" ?disabled="${this.disabled}" style=${ifDefined(this.inlineStyles ? this.inlineStyles : undefined)}>
        <slot></slot>
        ${this.icon
          ? html`<span class="${ICON_CLASS}"
              ><slot name="${ICON_CLASS}"></slot
            ></span>`
          : ""}
      </div>
    `;
  }

  render() {
    // size attribute
    let badgeSize = "";
    switch (this.size) {
      case "xs":
        badgeSize = "xs";
        break;
      case "sm":
        badgeSize = "sm";
        break;
      case "lg":
        badgeSize = "lg";
        break;
      default:
        // For 'default' or any other unspecified size
        badgeSize = "default";
    }

    // shape attribute
    let badgeShape = "";
    switch (this.shape) {
      case "pill":
        badgeShape = "pill";
        break;
      case "circle":
        badgeShape = "circle";
        break;
      case "square":
        badgeShape = "square";
        break;
      case "rounded":
        badgeShape = "rounded";
        break;
      default:
        // For 'default' or any other unspecified shape
        badgeShape = "";
    }

    const size = `${badgeSize}`;
    const shape = `${badgeShape}`;
    const outlinedBadge = this.outlined ? "pl-badge--outlined" : "";
    const outlinedToken = this.outlined ? "outlined" : "";
    const bordered = this.bordered ? "token-bordered" : "";
    const variant = `${this.variant}`;

    const dynamicStyles = [
      this.color && `color: ${this.color};`,
      this.absolute && `position: absolute;`,
      this.left && `left: ${this.left}px;`,
      this.right && `right: ${this.right}px;`,
      this.top && `top: ${this.top}px;`,
      this.bottom && `bottom: ${this.bottom}px;`,
      this.zIndex && `z-index: ${this.zIndex};`,
      this.inset &&
        `inset: auto auto calc(100% - ${this.offsetX}px) calc(100% - ${this.offsetY}px);`,
    ]
      .filter((style) => style) // Remove falsy values (undefined, empty strings)
      .join(" "); // Join the styles with a space

    const styles = `${this.styles} ${dynamicStyles}`.trim();

    // Construct class attribute with conditional inclusion of classes
    let classAttribute = this.token ? PL_BADGE_BADGE : PL_BADGE;
    classAttribute += this.classNames ? ` ${this.classNames}` : "";
    classAttribute += this.token
      ? outlinedToken
        ? ` ${outlinedToken}`
        : ""
      : outlinedBadge
      ? ` ${outlinedBadge}`
      : "";
    classAttribute += this.outlined ? " outlined" : "";
    classAttribute += variant ? ` ${variant}` : "";
    classAttribute += size ? ` ${size}` : "";
    classAttribute += shape ? ` ${shape}` : "";
    classAttribute += this._getClassNames() ? ` ${this._getClassNames()}` : "";
    classAttribute += bordered ? ` ${bordered}` : "";

    let tokenClassAttribute = "pl-badge__token";
    tokenClassAttribute += this.classNames ? ` ${this.classNames}` : "";
    tokenClassAttribute += outlinedToken ? ` ${outlinedToken}` : "";
    tokenClassAttribute += variant ? ` ${variant}` : "";
    tokenClassAttribute += size ? ` ${size}` : "";
    tokenClassAttribute += shape ? ` ${shape}` : "";
    tokenClassAttribute += this._getClassNames()
      ? ` ${this._getClassNames()}`
      : "";

    let colorClassAttribute = "";
    colorClassAttribute += this._getColorClassNames()
      ? ` ${this._getColorClassNames()}`
      : "";

    if (this.token) {
      return this.renderBadgeToken(
        tokenClassAttribute,
        colorClassAttribute,
        styles,
        bordered
      );
    } else if (this.dot) {
      return this.renderDotBadge(tokenClassAttribute, styles);
    } else if (this.bdgPosition) {
      return this.renderPositionedBadge(classAttribute);
    } else {
      return this.renderDefaultBadge(classAttribute);
    }
  }

  _handleClick() {
    this.dispatchEvent(new CustomEvent("custom-click", { bubbles: true }));
  }

  _getColorClassNames() {
    const excludedProperties = [
      "amber",
      "blue",
      "blue-grey",
      "brown",
      "cyan",
      "deep-orange",
      "deep-purple",
      "green",
      "grey",
      "indigo",
      "light-blue",
      "light-green",
      "lime",
      "orange",
      "pink",
      "purple",
      "red",
      "teal",
      "yellow",
      "white",
      "black",
      "absolute",
      "left",
      "right",
      "top",
      "bottom",
      "zindex",
      "inset",
      "offsety",
      "offsetx",
      "outlined",
      "round",
      "rounded",
      "token",
      "primary",
      "secondary",
      "tertiary",
      "success",
      "danger",
      "warning",
      "info",
      "light",
      "dark",
      "bordered",
      "dot",
      "shape",
      "size",
      "styles",
      "variant",
      "inlinestyles",
      "dynamicstyles",
      "is-elevated",
      "elevated-0",
      "elevated-1",
      "elevated-2",
      "elevated-3",
      "elevated-4",
      "elevated-5",
      "elevated-6",
      "elevated-7",
      "elevated-8",
      "elevated-9",
      "elevated-10",
      "elevated-11",
      "elevated-12",
      "elevated-13",
      "elevated-14",
      "elevated-15",
      "elevated-16",
      "elevated-17",
      "elevated-18",
      "elevated-19",
      "elevated-20",
      "elevated-21",
      "elevated-22",
      "elevated-23",
      "elevated-24",
      // Add other property names to be excluded from the class here
    ];

    return Array.from(this.attributes)
      .map((attr) => attr.name)
      .filter((name) => !excludedProperties.includes(name))
      .join(" ");
  }

  _getClassNames() {
    const excludedProperties = [
      "additionalstyles",
      "aria-pressed",
      "ariapressed",
      "bdgposition",
      "bordered",
      "dot",
      "inlinestyles",
      "dynamicstyles",
      "outlined",
      "token",
      "icon",
      "block",
      "shape",
      "size",
      "styles",
      "variant",
      "color",
      "absolute",
      "left",
      "right",
      "top",
      "bottom",
      "zindex",
      "inset",
      "offsety",
      "offsetx",
      // Add other property names to be excluded from the class here
    ];

    return Array.from(this.attributes)
      .map((attr) => attr.name)
      .filter((name) => !excludedProperties.includes(name))
      .join(" ");
  }
}

customElements.define(PL_BADGE, PlBadge);
