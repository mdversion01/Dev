import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { buttonStyles } from "./button-styles";
// import { buttonGroupStyles } from "../button-group/button-group-styles.js";
// import Fontawesome from "lit-fontawesome";

class PlButton extends LitElement {
  // static get styles() {
  //   return css``;
  // }

  static styles = [
    buttonStyles,
    // buttonGroupStyles,
    // Fontawesome,
    // css``
  ];

  static get properties() {
    return {
      absolute: { type: Boolean },
      block: { type: Boolean },
      bottom: { type: String },
      btnIcon: { type: Boolean },
      classNames: { type: String },
      disabled: { type: Boolean },
      fixed: { type: Boolean },
      iconBtn: { type: Boolean },
      inlineStyles: { type: String },
      left: { type: String },
      link: { type: Boolean },
      outlined: { type: Boolean },
      pressed: { type: Boolean },
      right: { type: String },
      shape: { type: String },
      size: { type: String },
      text: { type: Boolean },
      textBtn: { type: Boolean },
      title: { type: String },
      top: { type: String },
      url: { type: String },
      variant: { type: String },
      zIndex: { type: String },
    };
  }

  constructor() {
    super();
    this.absolute = false;
    this.block = false;
    this.bottom = "";
    this.btnIcon = false;
    this.classNames = "";
    this.disabled = false;
    this.fixed = false;
    this.iconBtn = false;
    this.inlineStyles = "";
    this.left = "";
    this.link = false;
    this.outlined = false;
    this.pressed = false;
    this.right = "";
    this.shape = "";
    this.size = "";
    this.text = false;
    this.textBtn = false;
    this.title = "";
    this.top = "";
    this.url = "";
    this.variant = "";
    this.zIndex = "";
  }

  renderLinkButton(
    classAttribute,
    size,
    inlineStyles,
    content,
    colorVariants,
    pressed,
    url
  ) {
    return html`
      <a
        class="${classAttribute} ${size}"
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
  }

  renderTextButton(
    classAttribute,
    size,
    inlineStyles,
    content,
    colorVariants,
    pressed
  ) {
    for (const colorVariant of colorVariants) {
      if (classAttribute.includes(colorVariant)) {
        classAttribute += ` ${colorVariant}--text`;
        classAttribute = classAttribute.replace(colorVariant, "");
      }
    }
    return html`
      <button
        aria-pressed="${pressed}"
        class="${classAttribute} ${size} text-btn"
        style=${ifDefined(inlineStyles ? inlineStyles : undefined)}
        @click="${this._handleClick}"
        aria-label="${this.label || "Button"}"
        role="button"
        ?disabled="${this.disabled}"
      >
        ${content}
      </button>
    `;
  }

  renderTextAsButton(
    classAttribute,
    size,
    inlineStyles,
    content,
    colorVariants,
    pressed
  ) {
    for (const colorVariant of colorVariants) {
      if (classAttribute.includes(colorVariant)) {
        classAttribute += ` ${colorVariant}--text`;
        classAttribute = classAttribute.replace(colorVariant, "");
      }
    }
    return html`
      <button
        aria-pressed="${pressed}"
        class="${classAttribute} ${size} text"
        style=${ifDefined(inlineStyles ? inlineStyles : undefined)}
        @click="${this._handleClick}"
        aria-label="${this.label || "Button"}"
        role="button"
        ?disabled="${this.disabled}"
      >
        ${content}
      </button>
    `;
  }

  renderIconButton(
    classAttribute,
    size,
    inlineStyles,
    content,
    colorVariants,
    pressed,
    title
  ) {
    return html`
      <button
        aria-pressed="${pressed}"
        class="${classAttribute} ${size} icon-btn"
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
  }

  renderIconAsButton(
    classAttribute,
    size,
    inlineStyles,
    content,
    colorVariants,
    pressed,
    title
  ) {
    for (const colorVariant of colorVariants) {
      if (classAttribute.includes(colorVariant)) {
        classAttribute += ` ${colorVariant}--text`;
        classAttribute = classAttribute.replace(colorVariant, "");
      }
    }
    return html`
      <button
        aria-pressed="${pressed}"
        class="${classAttribute} ${size} btn-icon"
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
  }

  renderDefaultButton(
    classAttribute,
    size,
    inlineStyles,
    content,
    colorVariants,
    pressed,
    title,
    ripple
  ) {
    return html`
      <button
        aria-pressed="${pressed}"
        class="${classAttribute} ${size} ${ripple}"
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

  render() {
    // List of color classes to append '--text'
    const colorVariants = [
      "primary",
      "secondary",
      "tertiary",
      "success",
      "danger",
      "warning",
      "info",
      "light",
      "dark",
    ]; // Add your color classes hereS

    // size attribute
    let buttonSize = "";
    switch (this.size) {
      case "xs":
        buttonSize = "xs";
        break;
      case "sm":
        buttonSize = "sm";
        break;
      case "lg":
        buttonSize = "lg";
        break;
      default:
        // For 'default' or any other unspecified size
        buttonSize = "default";
    }

    let buttonTypeClass = "";
    if (this.iconBtn) {
      // If it's an icon button
      buttonTypeClass = `icon-${buttonSize}`;
    } else {
      // If it's a regular button
      buttonTypeClass = `${buttonSize}`;
    }

    // shape attribute
    let buttonShape = "";
    switch (this.shape) {
      case "pill":
        buttonShape = "pill";
        break;
      case "circle":
        buttonShape = "circle";
        break;
      case "square":
        buttonShape = "square";
        break;
      default:
        // For 'default' or any other unspecified shape
        buttonShape = "";
    }

    // Combine sizeClass and buttonTypeClass to get the final class for the button
    const size = `${buttonTypeClass}`;
    const shape = `${buttonShape}`;
    const variant = `${this.variant}`;
    const outlinedClass = this.outlined ? "pl-btn--outlined" : "";
    const blockClass = this.block ? "pl-btn--block" : "";
    const content = this.iconBtn
      ? html`<slot></slot>`
      : html`<span class="pl-btn__content"><slot></slot></span>`;

    const ripple = this.iconBtn ? "" : "pl-btn-ripple";

    // aria-pressed attribute
    const pressed = ifDefined(
      this.pressed === "true" || this.pressed === "false"
        ? this.pressed
        : undefined
    );

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
    classAttribute += variant ? ` ${variant}` : "";
    classAttribute += shape ? ` ${shape}` : "";
    classAttribute += this._getClassNames() ? ` ${this._getClassNames()}` : "";

    if (this.link) {
      return this.renderLinkButton(
        classAttribute,
        size,
        inlineStyles,
        content,
        colorVariants,
        pressed,
        this.url
      );
    } else if (this.textBtn) {
      return this.renderTextButton(
        classAttribute,
        size,
        inlineStyles,
        content,
        colorVariants,
        pressed
      );
    } else if (this.text) {
      return this.renderTextAsButton(
        classAttribute,
        size,
        inlineStyles,
        content,
        colorVariants,
        pressed
      );
    } else if (this.iconBtn) {
      return this.renderIconButton(
        classAttribute,
        size,
        inlineStyles,
        content,
        colorVariants,
        pressed,
        this.title
      );
    } else if (this.btnIcon) {
      return this.renderIconAsButton(
        classAttribute,
        size,
        inlineStyles,
        content,
        colorVariants,
        pressed,
        this.title
      );
    } else {
      return this.renderDefaultButton(
        classAttribute,
        size,
        inlineStyles,
        content,
        colorVariants,
        pressed,
        this.title,
        ripple
      );
    }
  }

  _handleClick() {
    this.dispatchEvent(new CustomEvent("custom-click", { bubbles: true }));
  }

  _getClassNames() {
    const excludedProperties = [
      "additionalstyles",
      "aria-pressed",
      "pressed",
      "btnicon",
      "disabled",
      "inlinestyles",
      "dynamicstyles",
      "outlined",
      "link",
      "size",
      "text",
      "url",
      "icon",
      "iconbtn",
      "shape",
      "title",
      "block",
      "variant",
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
