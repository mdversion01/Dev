import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { buttonStyles } from "./button-styles";
// import Fontawesome from "lit-fontawesome";

class PlButton extends LitElement {
  // static get styles() {
  //   return css``;
  // }

  static styles = [
    buttonStyles,
    // Fontawesome,
    // css``
  ];

  static get properties() {
    return {
      ariaPressed: { type: Boolean },
      btnIcon: { type: Boolean },
      classNames: { type: String },
      disabled: { type: Boolean },
      inlineStyles: { type: String },
      outlined: { type: Boolean },
      iconBtn: { type: Boolean },
      link: { type: Boolean },
      text: { type: Boolean },
      textBtn: { type: Boolean },
      url: { type: String },
      block: { type: Boolean },
      title: { type: String },
      // For inline styles
      absolute: { type: Boolean },
      left: { type: String },
      right: { type: String },
      top: { type: String },
      bottom: { type: String },
      fixed: { type: Boolean },
      zIndex: { type: String },
    };
  }

  constructor() {
    super();
    this.ariaPressed = false;
    this.btnIcon = false;
    this.classNames = "";
    this.disabled = false;
    this.inlineStyles = "";
    this.outlined = false;
    this.iconBtn = false;
    this.link = false;
    this.text = false;
    this.textBtn = false;
    this.url = "";
    this.block = false;
    this.title = "";
    // For inline styles
    this.absolute = false;
    this.left = "";
    this.right = "";
    this.top = "";
    this.bottom = "";
    this.fixed = false;
    this.zIndex = "";
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

    const ariaPressedAttr = ifDefined(
      this.ariaPressed === "true" || this.ariaPressed === "false"
        ? this.ariaPressed
        : undefined
    );
    const outlinedClass = this.outlined ? "pl-btn--outlined" : "";
    const blockClass = this.block ? "pl-btn--block" : "";
    const content = this.iconBtn
      ? html`<slot></slot>`
      : html`<span class="pl-btn__content"><slot></slot></span>`;
    
    const ripple = this.iconBtn ? "" : "pl-btn-ripple";
    
    const dynamicStyles = [
      this.absolute && `position: absolute;`,
      this.left && `left: ${this.left}px;`,
      this.right && `right: ${this.right}px;`,
      this.top && `top: ${this.top}px;`,
      this.bottom && `bottom: ${this.bottom}px;`,
      this.fixed && `position: fixed;`,
      this.zIndex && `z-index: ${this.zIndex};`,
    ]
      .filter((style) => style) // Remove falsy values (undefined, empty strings)
      .join(" "); // Join the styles with a space

    const inlineStyles = `${this.inlineStyles} ${dynamicStyles}`.trim();

    // Construct class attribute with conditional inclusion of classes
    let classAttribute = "pl-btn";
    classAttribute += this.classNames ? ` ${this.classNames}` : "";
    classAttribute += outlinedClass ? ` ${outlinedClass}` : "";
    classAttribute += blockClass ? ` ${blockClass}` : "";
    classAttribute += this._getClassNames() ? ` ${this._getClassNames()}` : "";

    if (this.link) {
      return html`
        <a
          class="${classAttribute}"
          style=${ifDefined(inlineStyles ? inlineStyles : undefined)}
          href="${this.url || "#"}"
          role="button"
          @click="${this._handleClick}"
          aria-label="${this.label || "Button"}"
          ?disabled="${this.disabled}"
        >
          ${content}
        </a>
      `;
      } else if (this.textBtn) {
      for (const colorClass of colorClasses) {
        if (classAttribute.includes(colorClass)) {
          classAttribute += ` ${colorClass}--text`;
          classAttribute = classAttribute.replace(colorClass, "");
        }
      }
      return html`
        <button
          aria-pressed="${ariaPressedAttr}"
          class="${classAttribute} text-btn"
          style=${ifDefined(inlineStyles ? inlineStyles : undefined)}
          @click="${this._handleClick}"
          aria-label="${this.label || "Button"}"
          role="button"
          ?disabled="${this.disabled}"
        >
          ${content}
        </button>
      `;
    } else if (this.text) {
      for (const colorClass of colorClasses) {
        if (classAttribute.includes(colorClass)) {
          classAttribute += ` ${colorClass}--text`;
          classAttribute = classAttribute.replace(colorClass, "");
        }
      }
      return html`
        <button
          aria-pressed="${ariaPressedAttr}"
          class="${classAttribute} text"
          style=${ifDefined(inlineStyles ? inlineStyles : undefined)}
          @click="${this._handleClick}"
          aria-label="${this.label || "Button"}"
          role="button"
          ?disabled="${this.disabled}"
        >
          ${content}
        </button>
      `;
    } else if (this.iconBtn) {
      return html`
        <button
          aria-pressed="${ariaPressedAttr}"
          class="${classAttribute} icon-btn"
          style=${ifDefined(inlineStyles ? inlineStyles : undefined)}
          @click="${this._handleClick}"
          aria-label="${this.label || "Button"}"
          title=${ifDefined(this.title ? this.title : undefined)}
          role="button"
          ?disabled="${this.disabled}"
        >
          ${content}
        </button>
      `;
    } else if (this.btnIcon) {
      for (const colorClass of colorClasses) {
        if (classAttribute.includes(colorClass)) {
          classAttribute += ` ${colorClass}--text`;
          classAttribute = classAttribute.replace(colorClass, "");
        }
      }
      return html`
        <button
          aria-pressed="${ariaPressedAttr}"
          class="${classAttribute} btn-icon"
          style=${ifDefined(inlineStyles ? inlineStyles : undefined)}
          @click="${this._handleClick}"
          aria-label="${this.label || "Button"}"
          title=${ifDefined(this.title ? this.title : undefined)}
          role="button"
          ?disabled="${this.disabled}"
        >
          ${content}
        </button>
      `;
    } else {
      return html`
        <button
          aria-pressed="${ariaPressedAttr}"
          class="${classAttribute} ${ripple}"
          style="${ifDefined(inlineStyles ? inlineStyles : undefined)}"
          @click="${this._handleClick}"
          aria-label="${this.label || "Button"}"
          title="${ifDefined(this.title ? this.title : undefined)}"
          role="button"
          ?disabled="${this.disabled}"
        >
          ${content}
        </button>
      `;
    }
  }

  _handleClick() {
    this.dispatchEvent(new CustomEvent("custom-click", { bubbles: true }));
  }

  _getClassNames() {
    const excludedProperties = [
      "additionalstyles",
      "aria-pressed",
      "ariapressed",
      "btnicon",
      "disabled",
      "inlinestyles",
      "dynamicstyles",
      "outlined",
      "link",
      "text",
      "url",
      "iconbtn",
      "title",
      "block",
      "absolute",
      "left",
      "right",
      "top",
      "bottom",
      "fixed",
      "zindex",
      // Add other property names to be excluded from the class here
    ];

    return Array.from(this.attributes)
      .map((attr) => attr.name)
      .filter((name) => !excludedProperties.includes(name))
      .join(" ");
  }
}

customElements.define("pl-button", PlButton);
