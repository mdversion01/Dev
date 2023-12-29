import { html, css, LitElement } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { cardStyles } from "./card-styles.js";

class CardComponent extends LitElement {
  static styles = [
    cardStyles,
    css`
      :host {
        font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.2;
        text-align: left;
      }
    `,
  ];

  static get properties() {
    return {
      actions: { type: Boolean },
      altText: { type: String },
      cardMaxWidth: { type: String },
      classNames: { type: String },
      img: { type: Boolean },
      imgSrc: { type: String },
      inlineStyles: { type: String },
      noFooter: { type: Boolean },
      noHeader: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.actions = false;
    this.altText = ""; // add alt text to image
    this.cardMaxWidth = "20"; // Change the width of the card
    this.classNames = "";
    this.img = false;
    this.imgSrc = ""; // add image to card
    this.inlineStyles = ""; // add inline styles
    this.noFooter = false; // remove footer from card
    this.noHeader = false; // remove header from card
  }

  render() {
    // Construct class attribute with conditional inclusion of classes
    let classAttribute = "pl-card";
    classAttribute += this.classNames ? ` ${this.classNames}` : "";
    classAttribute += this._getClassNames() ? ` ${this._getClassNames()}` : "";

    const inlineStyles = `${this.inlineStyles}`.trim();
    const maxWidth = `max-width: ${this.cardMaxWidth}rem`;
    const imgHeight = `height: ${this.imgHeight || "11.25rem"};`.trim();
    const cardImageStyles = `${imgHeight} width: 100%; display: block;`.trim();

    return html`
      <div class="${classAttribute}" style="${maxWidth} ${inlineStyles}">
        ${this.img
          ? html`
              <img
                src="${this.imgSrc}"
                class="pl-card-img-top"
                alt=${ifDefined(this.altText ? this.altText : undefined)}
                style="${cardImageStyles}"
              />
            `
          : ""}
        ${this.noHeader
          ? ""
          : html`
              <div class="pl-card-header">
                <slot name="header"></slot>
              </div>
            `}
        <div class="pl-card-body">
          <h4 class="pl-card-title">
            <slot name="title"></slot>
          </h4>

          <div class="pl-card-text">
            <slot name="text"></slot>
          </div>
        </div>

        ${this.actions
          ? html`
              <div class="pl-card-actions">
                <slot name="actions"></slot>
              </div>
            `
          : ""}
        ${this.noFooter
          ? ""
          : html`
              <div class="pl-card-footer">
                <slot name="footer"></slot>
              </div>
            `}
      </div>
    `;
  }

  _getClassNames() {
    const excludedProperties = [
      "actions",
      "alttext",
      "cardmaxwidth",
      "img",
      "imgsrc",
      "inlinestyles",
      "nofooter",
      "noheader",
    ];

    return Array.from(this.attributes)
      .map((attr) => attr.name)
      .filter((name) => !excludedProperties.includes(name))
      .join(" ");
  }
}

customElements.define("card-component", CardComponent);
