import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { progressStyles } from "./progress-styles.js";

class Progress extends LitElement {
  static styles = [progressStyles, css``];

  static get properties() {
    return {
      animated: { type: Boolean },
      bars: { type: Array },
      circular: { type: Boolean },
      height: { type: Number },
      max: { type: Number },
      multi: { type: Boolean },
      precision: { type: Number },
      progressAlign: { type: String },
      rotate: { type: Number },
      showProgress: { type: Boolean },
      showValue: { type: Boolean },
      size: { type: Number },
      spin: { type: Boolean },
      striped: { type: Boolean },
      styles: { type: String },
      value: { type: Number },
      variant: { type: String },
      width: { type: Number, attribute: "width" },
    };
  }

  constructor() {
    super();
    this.animated = false;
    this.bars = [];
    this.variant = "";
    this.height = 20;
    this.max = 100;
    this.multi = false;
    this.precision = 0;
    this.progressAlign = "";
    this.rotate = undefined;
    this.showProgress = false;
    this.showValue = false;
    this.size = 80;
    this.spin = false;
    this.striped = false;
    this.styles = "";
    this.value = 0;
    this.circular = false;
    this.width = 4;
  }

  getColorBg(variant) {
    switch (variant) {
      case "primary":
        return "bg-primary";
      case "secondary":
        return "bg-secondary";
      case "success":
        return "bg-success";
      case "danger":
        return "bg-danger";
      case "info":
        return "bg-info";
      case "warning":
        return "bg-warning";
      case "dark":
        return "bg-dark";
      default:
        return "bg-primary"; // Default color if no variant or unrecognized variant
    }
  }

  getColorText(variant) {
    switch (variant) {
      case "primary":
        return "primary-text";
      case "secondary":
        return "secondary-text";
      case "success":
        return "success-text";
      case "danger":
        return "danger-text";
      case "info":
        return "info-text";
      case "warning":
        return "warning-text";
      case "dark":
        return "dark-text";
      default:
        return "primary-text"; // Default color if no variant or unrecognized variant
    }
  }

  render() {
    console.log(this.bars);

    if (this.circular) {
      const radius = 20;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (this.value / 100) * circumference;
      const cxCy = radius + this.width / 2;
      const viewBox = cxCy * 2;
      
      const styleString = this.size
        ? `height: ${this.size}px; width: ${this.size}px;`
        : undefined;
      const rotateStyle = this.rotate
        ? `transform: rotate(${this.rotate}deg)`
        : `transform: rotate(0deg)`;
      const blackText = this.variant === "warning" ? "color: #000;" : "";
      return html`
        <div
          class="progress-circular ${this.spin
            ? "progress-circular-spin progress-circular-visible"
            : ""} ${this.getColorText(this.variant)}"
          style="${ifDefined(styleString)}"
          role="progressbar"
          aria-valuemin="${0}"
          aria-valuemax="${this.max}"
        >
          ${this.spin
            ? html` <svg
                viewBox="0 0 ${viewBox} ${viewBox}"
                style="${ifDefined(rotateStyle)}"
              >
                <circle
                  fill="transparent"
                  cx="${cxCy}"
                  cy="${cxCy}"
                  r="${radius}"
                  class="progress-circular-overlay"
                  stroke-width="${this.width}"
                  stroke-dasharray="${circumference}"
                  stroke-dashoffset="${offset}"
                ></circle>
              </svg>`
            : html`
                <svg
                  viewBox="0 0 ${viewBox} ${viewBox}"
                  style="${ifDefined(rotateStyle)}"
                >
                  <circle
                    fill="transparent"
                    cx="${cxCy}"
                    cy="${cxCy}"
                    r="${radius}"
                    stroke-width="${this.width}"
                    stroke-dasharray="${circumference}"
                    stroke-dashoffset="0"
                    class="progress-circular-underlay"
                  ></circle>
                  <circle
                    cx="${cxCy}"
                    cy="${cxCy}"
                    r="${radius}"
                    class="progress-circular-overlay"
                    stroke-width="${this.width}"
                    stroke-dasharray="${circumference}"
                    stroke-dashoffset="${offset}"
                  ></circle>
                </svg>
              `}

          <div class="progress-circular-info" style=${ifDefined(blackText)}>
            ${this.showProgress
              ? html`
                  ${((this.value / this.max) * 100).toFixed(this.precision)}%
                `
              : this.showValue && this.value > 0 && this.value < 100
              ? html` ${(this.value / 2).toFixed(this.precision)}% `
              : html``}
          </div>
        </div>
      `;
    } else if (this.multi) {
      return html`
        <div class="linear-progress" style="height: ${this.height}px;">
          ${this.bars.map(
            (bar, index) => html`
              <div
                class="progress-bar ${this.getColorBg(bar.variant)}${bar.striped
                  ? " progress-bar-striped"
                  : ""} ${bar.animated ? " progress-bar-animated" : ""}"
                style="width: ${bar.value}%;"
                role="progressbar"
                aria-valuenow="${bar.value}"
                aria-valuemin="${0}"
                aria-valuemax="${bar.max || this.max}"
              >
                ${bar.progressAlign === "left"
                  ? html`<slot name="bar-${index}"></slot>`
                  : ""}
                ${bar.showProgress
                  ? html`
                      <span class="progress-text">
                        ${((bar.value / (bar.max || this.max)) * 100).toFixed(
                          bar.precision || this.precision
                        )}%
                      </span>
                    `
                  : bar.showValue && bar.value > 0 && bar.value < 100
                  ? html`
                      <span class="progress-text">
                        ${(bar.value / 2).toFixed(
                          bar.precision || this.precision
                        )}%
                      </span>
                    `
                  : html`<slot name="bar-${index}"></slot>`}
                ${bar.progressAlign === "right"
                  ? html`<slot name="bar-${index}"></slot>`
                  : ""}
              </div>
            `
          )}
        </div>
      `;
    } else {
      return html`
        <div class="linear-progress" style="height: ${this.height}px;">
          <div
            class="progress-bar ${this.getColorBg(this.variant)}${this.striped
              ? " progress-bar-striped"
              : this.animated
              ? "  progress-bar-striped progress-bar-animated"
              : ""}"
            role="progressbar"
            style="width: ${this.value}%;"
            aria-valuenow="${this.value}"
            aria-valuemin="0"
            aria-valuemax="${this.max}"
          >
            ${this.progressAlign === "right" ? html`<slot></slot>` : ""}
            ${this.showProgress
              ? html`
                  <span class="progress-text">
                    ${((this.value / this.max) * 100).toFixed(this.precision)}%
                  </span>
                `
              : this.showValue && this.value > 0 && this.value < 100
              ? html`
                  <span class="progress-text">
                    ${(this.value / 2).toFixed(this.precision)}%
                  </span>
                `
              : html`<slot></slot>`}
            ${this.progressAlign === "left" ? html`<slot></slot>` : ""}
          </div>
        </div>
      `;
    }
  }

}

customElements.define("progress-component", Progress);
