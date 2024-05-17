import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { sliderStyles } from "./slider-styles.js";

class BasicRangeSlider extends LitElement {
  static styles = [
    sliderStyles,
    css`
      :host {
        display: block;
        padding: 16px;
      }

      :host([focused]) .slider-thumb {
        border: 2px solid blue; /* Custom focus styling */
      }
    `,
  ];

  static properties = {
    label: { type: String },
    value: { type: Number },
    hideTextBoxes: { type: Boolean },
    hideLeftTextBox: { type: Boolean },
    hideRightTextBox: { type: Boolean },
    min: { type: Number },
    max: { type: Number },
    sliderThumbLabel: { type: Boolean },
    snapToTicks: { type: Boolean },
    ticks: { type: Number },
    tickValues: { type: Array }, // Array of values for each tick
    tickLabels: { type: Boolean }, // Optional: Labels for each tick
    unit: { type: String },
    variant: { type: String },
  };

  constructor() {
    super();
    this.label = "";
    this.value = 0;
    this.hideTextboxes = false;
    this.hideLeftTextBox = false;
    this.hideRightTextBox = false;
    this.min = 0;
    this.max = 100;
    this.sliderThumbLabel = false;
    this.snapToTicks = false;
    this.ticks = "";
    this.tickValues = []; // Example tick positions
    this.tickLabels = false; // Corresponding labels
    this.unit = "";
    this.variant = "";
  }

  getColor(variant) {
    switch (variant) {
      case "primary":
        return "primary";
      case "secondary":
        return "secondary";
      case "success":
        return "success";
      case "danger":
        return "danger";
      case "info":
        return "info";
      case "warning":
        return "warning";
      case "dark":
        return "dark";
      default:
        return ""; // Default color if no variant or unrecognized variant
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // Initialize focusable and add tabindex
    this.setAttribute("tabindex", "0");
    this.addEventListener("keydown", this.handleKeyDown);
    this.addEventListener("keyup", this.handleKeyUp);
    this.addEventListener("focus", this.handleFocus);
    this.addEventListener("blur", this.handleBlur);
  }

  handleKeyDown(event) {
    let increment = 0;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        increment = this.findNearestTick(this.value, 1);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        increment = this.findNearestTick(this.value, -1);
        break;
      case "Home":
        this.value = this.min;
        this.requestUpdate();
        break;
      case "End":
        this.value = this.max;
        this.requestUpdate();
        break;
      default:
        return; // Ignore other keys
    }

    if (increment !== 0) {
      this.value = Math.max(
        this.min,
        Math.min(this.max, this.value + increment)
      );
      this.requestUpdate();
    }
    event.preventDefault(); // Prevent the default action (scroll / move caret)
    const thumbContainer = this.shadowRoot.querySelector(
      ".slider-thumb-container"
    );
    thumbContainer.classList.add("slider-thumb-container-active");
  }

  handleKeyUp(event) {
    // Manage key up events if needed
    const thumbContainer = this.shadowRoot.querySelector(
      ".slider-thumb-container"
    );
    thumbContainer.classList.remove("slider-thumb-container-active");
  }

  findNearestTick(currentValue, direction) {
    if (!this.snapToTicks || this.tickValues.length === 0) {
      return direction; // Move by 1 if no ticks defined or snapping is off
    }
    const currentIndex = this.tickValues.indexOf(currentValue);
    if (currentIndex === -1) {
      // Find the closest tick if current value is not a tick
      const closest = this.tickValues.reduce((prev, curr) =>
        Math.abs(curr - currentValue) < Math.abs(prev - currentValue)
          ? curr
          : prev
      );
      return closest - currentValue;
    } else {
      // Find the next tick in the specified direction
      const newIndex = currentIndex + direction;
      if (newIndex >= 0 && newIndex < this.tickValues.length) {
        return this.tickValues[newIndex] - currentValue;
      }
    }
    return 0;
  }

  render() {
    const valuePercent =
      ((this.value - this.min) / (this.max - this.min)) * 100;
    return html`
      <div
        dir="ltr"
        class="slider form-group"
        aria-label="${ifDefined(this.label || undefined)}"
        role="slider"
        aria-valuemin="${ifDefined(this.min || undefined)}"
        aria-valuemax="${ifDefined(this.max || undefined)}"
        aria-valuenow="${ifDefined(this.value || undefined)}"
        aria-orientation="horizontal"
      >
        ${this.sliderThumbLabel
          ? ""
          : this.label === ""
          ? ""
          : html`<label id="slider-input-label" class="form-control-label">
              ${this.label} ${this.value.toFixed(0)}${this.unit}
            </label>`}
        <div class="slider-container">
          <div class="slider-min-value">${this.min}${this.unit}</div>
          <div class="slider-controls">
            <div class="slider-background-track" style="width: 100%;"></div>
            <div
              class="slider-moving-track ${this.getColor(this.variant)}"
              style="width: ${valuePercent.toFixed(0)}%;"
            ></div>
            <div
              class="slider-thumb-container ${this.getColor(this.variant)}"
              style="left: ${valuePercent.toFixed(
                0
              )}%; transition: all 0.1s cubic-bezier(0.25, 0.8, 0.5, 1) 0s;"
              @mousedown="${this.dragStart}"
            >
              <div class="slider-thumb ${this.getColor(this.variant)}"></div>

              ${this.sliderThumbLabel
                ? html` <div
                    class="slider-thumb-label ${this.getColor(this.variant)}"
                    style="position: absolute; left: ${this.value.toFixed(
                      0
                    )}%; transform: translateX(-50%) translateY(30%) translateY(-100%) rotate(45deg);"
                  >
                    <div>
                      <span>${this.value.toFixed(0)}${this.unit}</span>
                    </div>
                  </div>`
                : ""}
            </div>

            ${this.ticks > 0
              ? html`
                  <div class="slider-ticks">
                    ${this.tickValues.map((tick, index) => {
                      const pos =
                        typeof tick === "number"
                          ? this.calculatePosition(tick)
                          : (index / (this.tickValues.length - 1)) * 100;
                      return html`
                        <div
                          class="slider-tick"
                          style="left: ${pos}%; top: calc(50% - 10px);"
                        ></div>
                        ${this.tickLabels
                          ? html` <div
                              class="slider-tick-label"
                              style="left: ${pos}%; transform: translateX(-50%);"
                            >
                              ${tick}${typeof tick === "number"
                                ? this.unit
                                : ""}
                            </div>`
                          : ""}
                      `;
                    })}
                  </div>
                `
              : ""}
          </div>
          <div class="slider-max-value">${this.max}${this.unit}</div>
          <div
            role="textbox"
            aria-readonly="true"
            aria-labelledby="slider-input-label"
            class="slider-value-right${this.hideRightTextBox ? " hidden" : ""}"
          >
            ${this.value.toFixed(0)}
          </div>
        </div>
      </div>
    `;
  }

  handleFocus() {
    this.shadowRoot.querySelector(".slider-thumb").classList.add("focused");
    //this.shadowRoot.querySelector('.slider-thumb-container').classList.add('slider-thumb-container-active');
  }

  handleBlur() {
    this.shadowRoot.querySelector(".slider-thumb").classList.remove("focused");
    // this.shadowRoot.querySelector('.slider-thumb-container').classList.remove('slider-thumb-container-active');
  }

  // Method to calculate position based on the value type
  calculatePosition(value) {
    if (typeof value === "number") {
      return ((value - this.min) / (this.max - this.min)) * 100;
    }
    return null; // Default fallback if needed
  }

  dragStart(event) {
    event.preventDefault();
    this.initialX = event.clientX;
    this.dragging = true;
    const thumbContainer = this.shadowRoot.querySelector(
      ".slider-thumb-container"
    );
    thumbContainer.classList.add("slider-thumb-container-active");

    // Attach event listeners
    window.addEventListener("mousemove", this.dragMove);
    window.addEventListener("mouseup", this.dragStop);
  }

  dragMove = (event) => {
    if (!this.dragging) return;
    this.updatePosition(event);
  };

  dragStop = () => {
    this.dragging = false;
    const thumbContainer = this.shadowRoot.querySelector(
      ".slider-thumb-container"
    );
    thumbContainer.classList.remove("slider-thumb-container-active");
    window.removeEventListener("mousemove", this.dragMove);
    window.removeEventListener("mouseup", this.dragStop);
  };

  updatePosition(event) {
    const sliderRect = this.shadowRoot
      .querySelector(".slider-container")
      .getBoundingClientRect();
    let newPos = event.clientX - sliderRect.left;
    let newPositionPercent = (newPos / sliderRect.width) * 100;
    newPositionPercent = Math.max(0, Math.min(newPositionPercent, 100));

    // Apply snap logic based on the snapToTicks property
    if (this.snapToTicks && this.tickValues.length > 0) {
      newPositionPercent = this.calculateSnapPosition(newPositionPercent);
    }

    this.value = (newPositionPercent / 100) * (this.max - this.min) + this.min;
    this.requestUpdate();
  }

  calculateSnapPosition(positionPercent) {
    const closestTickValue = this.tickValues.reduce((prev, curr) => {
      const prevPos = ((prev - this.min) / (this.max - this.min)) * 100;
      const currPos = ((curr - this.min) / (this.max - this.min)) * 100;
      return Math.abs(prevPos - positionPercent) <
        Math.abs(currPos - positionPercent)
        ? prev
        : curr;
    });
    return ((closestTickValue - this.min) / (this.max - this.min)) * 100;
  }
}

customElements.define("basic-range-slider", BasicRangeSlider);
