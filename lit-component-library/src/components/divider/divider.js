import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { dividerStyles } from "./divider-styles.js";

class Divider extends LitElement {
  static styles = [dividerStyles, css``];

  static get properties() {
    return {
      dashed: { type: Boolean },
      orientation: { type: String },
      orientationMargin: { type: String },
      plain: { type: Boolean },
      styles: { type: String },
      type: { type: String }, // horizontal, vertical
    };
  }

  constructor() {
    super();
    this.dashed = false;
    this.plain = false;
    this.styles = "";
    this.type = "horizontal";
  }

  renderDivider(styles) {
    return html`
      <div
        class="pl-divider pl-divider-horizontal${this.dashed
          ? " pl-divider-dashed"
          : ""}"
        role="separator"
      ></div>
    `;
  }

  renderVerticalDividers(styles) {
    return html`
      <div
        class="pl-divider pl-divider-vertical"
        role="separator"
      ></div>
    `;
  }

  renderDividerWithText(styles) {
    return html`
      <div
        class="pl-divider pl-divider-horizontal pl-divider-with-text${this.plain
          ? " pl-divider-plain"
          : ""}${this.dashed ? " pl-divider-dashed" : ""}"
        role="separator"
      >
        <span class="pl-divider-inner-text" style=${ifDefined(styles ? styles : undefined)}>
          <slot></slot>
        </span>
      </div>
    `;
  }

  renderDividerWithTextLeft(styles) {
    return html`
      <div
        class="pl-divider pl-divider-horizontal pl-divider-with-text pl-divider-with-text-left${this
          .plain
          ? " pl-divider-plain"
          : ""}${this.dashed ? " pl-divider-dashed" : ""}${this.orientationMargin === "left" ? " pl-divider-no-default-orientation-margin-left" : ""}"
        role="separator"
      >
        <span class="pl-divider-inner-text" style=${ifDefined(styles ? styles : undefined)}>
          <slot></slot>
        </span>
      </div>
    `;
  }

  renderDividerWithTextRight(styles) {
    return html`
      <div
        class="pl-divider pl-divider-horizontal pl-divider-with-text pl-divider-with-text-right${this
          .plain
          ? " pl-divider-plain"
          : ""}${this.dashed ? " pl-divider-dashed" : ""}${this.orientationMargin === "right" ? " pl-divider-no-default-orientation-margin-right" : ""}"
        role="separator"
      >
        <span class="pl-divider-inner-text" style=${ifDefined(styles ? styles : undefined)}>
          <slot></slot>
        </span>
      </div>
    `;
  }

  renderDividerWithTextCenter(styles) {
    return html`
      <div
        class="pl-divider pl-divider-horizontal pl-divider-with-text pl-divider-with-text-center${this
          .plain
          ? " pl-divider-plain"
          : ""}${this.dashed ? " pl-divider-dashed" : ""}"
        role="separator"
      >
        <span class="pl-divider-inner-text" style=${ifDefined(styles ? styles : undefined)}>
          <slot></slot>
        </span>
      </div>
    `;
  }

  render() {
    if (this.orientation === "left") {
      return this.renderDividerWithTextLeft();
    } else if (this.orientation === "right") {
      return this.renderDividerWithTextRight();
    } else if (this.orientation === "center") {
      return this.renderDividerWithTextCenter();
    } else if (this.type === "vertical") {
      return this.renderVerticalDividers();
    } else {
      return this.renderDivider();
    }
  }

  _getClassNames() {
    const excludedProperties = [];
  }
}

customElements.define("pl-divider", Divider);
