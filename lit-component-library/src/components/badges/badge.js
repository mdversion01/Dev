import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { badgeStyles } from "./badge-styles";
// import Fontawesome from "lit-fontawesome";

class PlBadge extends LitElement {
  // static get styles() {
  //   return css``;
  // }

  static styles = [
    badgeStyles,
    // Fontawesome,
    // css``
  ];

  static get properties() {
    return {
      ariaPressed: { type: Boolean },
      badge: { type: Boolean },
      btnPosition: { type: String },
      bordered: { type: Boolean },
      classNames: { type: String },
      disabled: { type: Boolean },
      dot: { type: Boolean },
      inlineStyles: { type: String },
      outlined: { type: Boolean },
      iconBtn: { type: Boolean },
      // icon: { type: String },
      link: { type: Boolean },
      text: { type: Boolean },
      token: { type: Boolean },
      url: { type: String },
      block: { type: Boolean },
      title: { type: String },
      // For inline styles
      color: { type: String },
      absolute: { type: Boolean },
      left: { type: String },
      right: { type: String },
      top: { type: String },
      bottom: { type: String },
      fixed: { type: Boolean },
      zIndex: { type: String },
      inset: { type: Boolean },
      offsetX: { type: String },
      offsetY: { type: String },
    };
  }

  constructor() {
    super();
    this.ariaPressed = false;
    this.badge = false;
    this.bordered = false;
    this.btnPosition = "";
    this.classNames = "";
    this.disabled = false;
    this.dot = false;
    this.inlineStyles = "";
    this.outlined = false;
    this.iconBtn = false;
    // this.icon = "";
    this.link = false;
    this.text = false;
    this.token = false;
    this.url = "";
    this.block = false;
    this.title = "";
    // For inline styles
    this.color = "";
    this.absolute = false;
    this.left = "";
    this.right = "";
    this.top = "";
    this.bottom = "";
    this.fixed = false;
    this.zIndex = "";
    this.inset = false;
    this.offsetX = "";
    this.offsetY = "";
  }

  render() {
    // List of color classes to append '--text'
    const colorClasses = [
      "primary",
      "secondary",
      "tertiary",
      "success",
      "danger",
      "warning",
      "info",
      "light",
      "dark",
    ]; // Add your color classes here

    const outlinedBadge = this.outlined ? "pl-badge--outlined" : "";
    const outlinedToken = this.outlined ? "outlined" : "";
    const bordered = this.bordered ? "token-bordered" : "";
    // const content = this.iconBtn
    //   ? html`<slot></slot>`
    //   : html`<span class="pl-badge__content"><slot></slot></span>`;
    // const ripple = this.iconBtn ? "" : "pl-badge-ripple";

    const dynamicStyles = [
      this.color && `color: ${this.color};`,
      this.absolute && `position: absolute;`,
      this.left && `left: ${this.left}px;`,
      this.right && `right: ${this.right}px;`,
      this.top && `top: ${this.top}px;`,
      this.bottom && `bottom: ${this.bottom}px;`,
      this.fixed && `position: fixed;`,
      this.zIndex && `z-index: ${this.zIndex};`,
      this.inset &&
        `inset: auto auto calc(100% - ${this.offsetX}px) calc(100% - ${this.offsetY}px);`,
    ]
      .filter((style) => style) // Remove falsy values (undefined, empty strings)
      .join(" "); // Join the styles with a space

    const inlineStyles = `${this.inlineStyles} ${dynamicStyles}`.trim();

    // Construct class attribute with conditional inclusion of classes
    let classAttribute = this.token ? "pl-badge__badge" : "pl-badge";
    classAttribute += this.classNames ? ` ${this.classNames}` : "";
    classAttribute += this.token
      ? outlinedToken
        ? ` ${outlinedToken}`
        : ""
      : outlinedBadge
      ? ` ${outlinedBadge}`
      : "";
    classAttribute += this._getClassNames() ? ` ${this._getClassNames()}` : "";
    classAttribute += bordered ? ` ${bordered}` : "";

    let tokenClassAttribute = "pl-badge__token";
    tokenClassAttribute += this.classNames ? ` ${this.classNames}` : "";
    tokenClassAttribute += outlinedToken ? ` ${outlinedToken}` : "";
    tokenClassAttribute += this._getClassNames()
      ? ` ${this._getClassNames()}`
      : "";

    if (this.token) {
      return html`
        <div class="${classAttribute}" ?disabled="${this.disabled}">
          <slot></slot>
          <span class="pl-badge__wrapper">
            <span
              aria-atomic="true"
              aria-label="${this.label || "Badge"}"
              aria-live="polite"
              class="${tokenClassAttribute}"
              role="status"
              style=${ifDefined(inlineStyles ? inlineStyles : undefined)}
            >
              <slot name="token"></slot>
            </span>
          </span>
        </div>
      `;
    } else if (this.dot) {
      return html`
        <div class="pl-badge__badge pl-badge--dot" ?disabled="${this.disabled}">
          <slot></slot>
          <span class="pl-badge__wrapper">
            <span
              aria-atomic="true"
              aria-label="${this.label || "Badge"}"
              aria-live="polite"
              class="${tokenClassAttribute}"
              role="status"
              style=${ifDefined(inlineStyles ? inlineStyles : undefined)}
            >
            </span>
          </span>
        </div>
      `;
    } else {
      return html`
        <div class="${classAttribute} ${this.btnPosition === "left" ? 'mr-1' : 'ml-1'}" ?disabled="${this.disabled}">
          <slot></slot>
        </div>
      `;
    }

    // if (this.link) {
    //   return html`
    //     <a
    //       class="${classAttribute}"
    //       style=${ifDefined(inlineStyles ? inlineStyles : undefined)}
    //       href="${this.url || "#"}"
    //       role="button"
    //       @click="${this._handleClick}"
    //       aria-label="${this.label || "Button"}"
    //       ?disabled="${this.disabled}"
    //     >
    //       ${content}
    //     </a>
    //   `;
    //   } else if (this.text) {
    //   for (const colorClass of colorClasses) {
    //     if (classAttribute.includes(colorClass)) {
    //       classAttribute += ` ${colorClass}--text`;
    //       classAttribute = classAttribute.replace(colorClass, "");
    //     }
    //   }
    //   return html`
    //     <button
    //       aria-pressed="${ariaPressedAttr}"
    //       class="${classAttribute} text"
    //       style=${ifDefined(inlineStyles ? inlineStyles : undefined)}
    //       @click="${this._handleClick}"
    //       aria-label="${this.label || "Button"}"
    //       role="button"
    //       ?disabled="${this.disabled}"
    //     >
    //       ${content}
    //     </button>
    //   `;
    // } else if (this.iconBtn) {
    //   return html`
    //     <button
    //       aria-pressed="${ariaPressedAttr}"
    //       class="${classAttribute} icon-btn"
    //       style=${ifDefined(inlineStyles ? inlineStyles : undefined)}
    //       @click="${this._handleClick}"
    //       aria-label="${this.label || "Button"}"
    //       title=${ifDefined(this.title ? this.title : undefined)}
    //       role="button"
    //       ?disabled="${this.disabled}"
    //     >
    //       ${content}
    //     </button>
    //   `;
    // } else {
    //   return html`
    //     <div
    //       aria-pressed="${ariaPressedAttr}"
    //       class="${classAttribute} ${ripple}"
    //       style="${ifDefined(inlineStyles ? inlineStyles : undefined)}"
    //       @click="${this._handleClick}"
    //       aria-label="${this.label || "Button"}"
    //       title="${ifDefined(this.title ? this.title : undefined)}"
    //       role="button"
    //       ?disabled="${this.disabled}"
    //     >
    //       ${content}
    //     </div>
    //   `;
    // }
  }

  _handleClick() {
    this.dispatchEvent(new CustomEvent("custom-click", { bubbles: true }));
  }

  _getClassNames() {
    const excludedProperties = [
      "additionalstyles",
      "aria-pressed",
      "ariapressed",
      "bordered",
      "disabled",
      "dot",
      "inlinestyles",
      "dynamicstyles",
      "outlined",
      "link",
      "text",
      "token",
      "url",
      // "icon",
      "iconbtn",
      "title",
      // "btnwithicon",
      // "btniconposition",
      "block",
      "color",
      "absolute",
      "left",
      "right",
      "top",
      "bottom",
      "fixed",
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

customElements.define("pl-badge", PlBadge);
