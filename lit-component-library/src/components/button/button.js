import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { buttonStyles } from "./button-styles";

class PlButton extends LitElement {
   static styles = [
    buttonStyles,
    css``
  ];

  static get properties() {
    return {
      absolute: { type: Boolean },
      ariaLabel: { type: String },
      block: { type: Boolean },
      bottom: { type: String },
      btnIcon: { type: Boolean },
      btnText: { type: String },
      classNames: { type: String },
      disabled: { type: Boolean },
      end: { type: Boolean },
      fixed: { type: Boolean },
      groupBtn: { type: Boolean },
      iconBtn: { type: Boolean },
      slotLeft: { type: Boolean },
      slotRight: { type: Boolean },
      styles: { type: String },
      left: { type: String },
      link: { type: Boolean },
      outlined: { type: Boolean },
      pressed: { type: Boolean },
      right: { type: String },
      ripple: { type: Boolean },
      shape: { type: String },
      size: { type: String },
      start: { type: Boolean },
      text: { type: Boolean },
      textBtn: { type: Boolean },
      title: { type: String },
      top: { type: String },
      url: { type: String },
      variant: { type: String },
      vertical: { type: Boolean },
      zIndex: { type: String },

      isOpen: { type: Boolean },
      targetId: { type: String },
      accordion: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.absolute = false;
    this.ariaLabel = "";
    this.block = false;
    this.bottom = "";
    this.btnIcon = false;
    this.btnText = "Button";
    this.classNames = "";
    this.disabled = false;
    this.end = false;
    this.fixed = false;
    this.groupBtn = false;
    this.iconBtn = false;
    this.slotLeft = false;
    this.slotRight = false;
    this.styles = "";
    this.left = "";
    this.link = false;
    this.outlined = false;
    this.pressed = false;
    this.right = "";
    this.ripple = false;
    this.shape = "";
    this.size = "";
    this.start = false;
    this.text = false;
    this.textBtn = false;
    this.title = "";
    this.top = "";
    this.url = "";
    this.variant = "";
    this.vertical = false;
    this.zIndex = "";

    this.isOpen = false;
    this.targetId = "";
    this.accordion = false;
  }

  renderLinkButton(
    classAttribute,
    size,
    styles,
    content,
    colorVariants,
    pressed,
    url
  ) {
    return html`
      <a
        class="${classAttribute}"
        style=${ifDefined(styles ? styles : undefined)}
        href="${this.url || "#"}"
        role="button"
        @click="${this._handleClick}"
        aria-label="${this.btnText || "Button"}"
        ?disabled="${this.disabled}"
      >
        ${content}
      </a>
    `;
  }

  renderTextButton(
    classAttribute,
    size,
    styles,
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
        class="${classAttribute} text-btn"
        style=${ifDefined(styles ? styles : undefined)}
        @click="${this._handleClick}"
        aria-label="${this.btnText || "Button"}"
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
    styles,
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
        class="${classAttribute} text"
        style=${ifDefined(styles ? styles : undefined)}
        @click="${this._handleClick}"
        aria-label="${this.btnText || "Button"}"
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
    styles,
    content,
    colorVariants,
    pressed,
    title
  ) {
    return html`
      <button
        aria-pressed="${pressed}"
        class="${classAttribute} icon-btn"
        style=${ifDefined(styles ? styles : undefined)}
        @click="${this._handleClick}"
        aria-label="${this.ariaLabel || "Button"}"
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
    styles,
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
        class="${classAttribute} btn-icon"
        style=${ifDefined(styles ? styles : undefined)}
        @click="${this._handleClick}"
        aria-label="${this.ariaLabel || "Button"}"
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
    styles,
    content,
    colorVariants,
    pressed,
    title,
    ripple
  ) {
    return html`
      <button
        aria-pressed="${pressed}"
        class="${classAttribute}"
        style="${ifDefined(styles ? styles : undefined)}"
        @click="${this._handleClick}"
        aria-label="${this.btnText || "Button"}"
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
      case "pl-size":
        buttonSize = "pl-size";
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

    let buttonGroup = "";
    switch (this.vertical) {
      case true:
        buttonGroup = "pl-btn-group-vertical";
        break;
      default:
        buttonGroup = "pl-btn-group";
    }

    const groupDirection = `${buttonGroup}`;
    const placement = this.start
      ? `${buttonGroup}-start`
      : this.end
      ? `${buttonGroup}-end`
      : !this.start || !this.end
      ? "pl-btn-group__btn"
      : "";
    const size = `${buttonTypeClass}`;
    const shape = `${buttonShape}`;
    const variant = `${this.variant}`;
    const outlinedClass = this.outlined ? "pl-btn--outlined" : "";
    const blockClass = this.block ? "pl-btn--block" : "";
    const content = this.iconBtn || this.btnIcon
      ? html`<slot></slot>`
      : html`${this.slotLeft ? html`<slot></slot>` : ""}<span class="pl-btn__content">${this.btnText}</span>${this.slotRight ? html`<slot></slot>` : ""}`;

    const rippleEffect = this.ripple ? "pl-btn-ripple" : "";

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

    const styles = `${this.styles} ${dynamicStyles}`.trim();

    // Construct class attribute with conditional inclusion of classes
    let classAttribute = "pl-btn";
    classAttribute += this.classNames ? ` ${this.classNames}` : "";
    classAttribute += outlinedClass ? ` ${outlinedClass}` : "";
    classAttribute += blockClass ? ` ${blockClass}` : "";
    classAttribute += variant ? ` ${variant}` : "";
    classAttribute += rippleEffect ? ` ${rippleEffect}` : "";
    classAttribute += size ? ` ${size}` : "";
    classAttribute += shape ? ` ${shape}` : "";
    classAttribute += this.groupBtn ? ` ${groupDirection}` : "";
    classAttribute += this.groupBtn ? ` ${placement}` : "";
    classAttribute += this._getClassNames() ? ` ${this._getClassNames()}` : "";

    if (this.link) {
      return this.renderLinkButton(
        classAttribute,
        size,
        styles,
        content,
        colorVariants,
        pressed,
        this.url
      );
    } else if (this.textBtn) {
      return this.renderTextButton(
        classAttribute,
        size,
        styles,
        content,
        colorVariants,
        pressed
      );
    } else if (this.text) {
      return this.renderTextAsButton(
        classAttribute,
        size,
        styles,
        content,
        colorVariants,
        pressed
      );
    } else if (this.iconBtn) {
      return this.renderIconButton(
        classAttribute,
        size,
        styles,
        content,
        colorVariants,
        pressed,
        this.title
      );
    } else if (this.btnIcon) {
      return this.renderIconAsButton(
        classAttribute,
        size,
        styles,
        content,
        colorVariants,
        pressed,
        this.title
      );
    } else {
      return this.renderDefaultButton(
        classAttribute,
        size,
        styles,
        content,
        colorVariants,
        pressed,
        this.title,
        rippleEffect
      );
    }
  }

  _handleClick() {
    // console.log('Button clicked');  // Useful for debugging
    this.dispatchEvent(new CustomEvent('custom-click', {
      bubbles: true,
      composed: true,  // Allows the event to cross shadow DOM boundaries
      detail: { message: 'Button clicked!' }  // Optional detail object
    }));
  }

  _getClassNames() {
    const excludedProperties = [
      "additionalstyles",
      "aria-pressed",
      "arialabel",
      "pressed",
      "btnicon",
      "buttongroup",
      "classattribute",
      "disabled",
      "end",
      "groupbtn",
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
      "slot",
      "start",
      "title",
      "block",
      "variant",
      "absolute",
      "left",
      "right",
      "top",
      "bottom",
      "fixed",
      "vertical",
      "zindex",
      "data-toggle",
      "aria-expanded",
      "aria-controls",
      "class",
      "data-target",
      "isOpen",
      "targetId",
      // Add other property names to be excluded from the class here
    ];

    return Array.from(this.attributes)
      .map((attr) => attr.name)
      .filter((name) => !excludedProperties.includes(name))
      .join(" ");
  }
}

customElements.define("pl-button", PlButton);
