import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { sliderStyles } from "./slider-styles.js";

class MultiRangeSlider extends LitElement {
  static styles = [
    sliderStyles,
    css`
      :host {
        display: block;
        padding: 16px;
      }
    `,
  ];

  static properties = {
    disabled: { type: Boolean, reflect: true },
    hideTextBoxes: { type: Boolean },
    hideLeftTextBox: { type: Boolean },
    hideRightTextBox: { type: Boolean },
    label: { type: String },
    lowerValue: { type: Number },
    upperValue: { type: Number },
    min: { type: Number },
    max: { type: Number },
    plumage: { type: Boolean },
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
    this.disabled = false;
    this.hideTextboxes = false;
    this.hideLeftTextBox = false;
    this.hideRightTextBox = false;
    this.label = "";
    this.lowerValue = 25;
    this.upperValue = 75;
    this.min = 0;
    this.max = 100;
    this.plumage = false;
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
    this.addEventListener("focus", this.handleFocus);
    this.addEventListener("blur", this.handleBlur);
    this.addEventListener("keydown", this.handleKeyDown);
    this.addEventListener("keyup", this.handleKeyUp);
  }

  firstUpdated() {
    super.firstUpdated();
    this.setAttribute("tabindex", "0");
    this.sliderArea = this.shadowRoot.querySelector(".slider-container");
    this.lowerThumb = this.shadowRoot.querySelector(".lower-thumb");
    this.upperThumb = this.shadowRoot.querySelector(".upper-thumb");

    [this.lowerThumb, this.upperThumb].forEach((thumb) => {
      thumb.addEventListener("mousedown", (e) =>
        this.startDrag(e, thumb === this.lowerThumb ? "lower" : "upper")
      );
    });

    window.addEventListener("mouseup", this.stopDrag.bind(this));
    window.addEventListener("mousemove", this.doDrag.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    [this.lowerThumb, this.upperThumb].forEach((thumb) => {
      thumb.removeEventListener("mousedown", this.startDrag);
    });
    window.removeEventListener("mouseup", this.stopDrag);
    window.removeEventListener("mousemove", this.doDrag);
  }

  startDrag(e, thumb) {
    if (this.disabled) return;
    e.preventDefault(); // This might still be necessary for some browsers.
    this.dragging = thumb; // Mark which thumb is being dragged.

    // Add active class right away to give immediate visual feedback.
    if (thumb === "lower") {
      this.lowerThumb.classList.add("slider-thumb-container-active");
    } else {
      this.upperThumb.classList.add("slider-thumb-container-active");
    }

    // Listen to mousemove to start updating only when the mouse starts moving.
    window.addEventListener("mousemove", this.tempDrag.bind(this));
    window.addEventListener("mouseup", this.tempStopDrag.bind(this));
  }

  tempDrag(e) {
    if (!this.dragging) return;
    let rect = this.sliderArea.getBoundingClientRect();
    let x = e.clientX - rect.left;
    this.updateValue(x, this.dragging);
  }

  tempStopDrag(e) {
    window.removeEventListener("mousemove", this.tempDrag.bind(this));
    window.removeEventListener("mouseup", this.tempStopDrag.bind(this));
    this.stopDrag();
  }

  doDrag(e) {
    if (!this.dragging) return; // Only proceed if dragging is active.

    let rect = this.sliderArea.getBoundingClientRect();
    let x = e.clientX - rect.left; // Continue updating based on the current mouse position.
    this.updateValue(x, this.dragging); // Update the value based on which thumb is being dragged.
  }

  stopDrag() {
    this.dragging = false;
    this.lowerThumb?.classList.remove("slider-thumb-container-active");
    this.upperThumb?.classList.remove("slider-thumb-container-active");
  }

  updateValue(x, thumb) {
    let rect = this.sliderArea.getBoundingClientRect();
    let value = (x / rect.width) * (this.max - this.min) + this.min;
    value = Math.max(this.min, Math.min(this.max, value));

    if (this.snapToTicks) {
      let positionPercent = ((value - this.min) / (this.max - this.min)) * 100;
      let snappedPositionPercent = this.calculateSnapPosition(positionPercent);
      value = (snappedPositionPercent / 100) * (this.max - this.min) + this.min;
    }

    if (thumb === "lower") {
      if (value < this.upperValue) {
        this.lowerValue = value;
      }
    } else if (thumb === "upper") {
      if (value > this.lowerValue) {
        this.upperValue = value;
      }
    }

    this.requestUpdate();
    this.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { lowerValue: this.lowerValue, upperValue: this.upperValue },
      })
    );
  }

  handleMouseDown(event) {
    // Determine which thumb is being clicked on and start dragging.
    const target = event.target;
    const isLowerThumb = target.classList.contains("lower-thumb");
    const isUpperThumb = target.classList.contains("upper-thumb");

    if (isLowerThumb || isUpperThumb) {
      this.startDrag(event, isLowerThumb ? "lower" : "upper");
    }
  }

  handleFocus(event) {
    if (this.focused) {
      // Set focus on the lower thumb by default or based on some condition
      if (this.lowerThumb && this.upperThumb) {
        this.setThumbFocusability(this.lowerThumb, true);
      }
    }
  }

  handleBlur(event) {
    if (this.lowerThumb && this.upperThumb) {
      this.setThumbFocusability(this.lowerThumb, false);
      this.setThumbFocusability(this.upperThumb, false);
    }
    this.focused = false;
  }

  handleGlobalFocus = (event) => {
    // Check if the focus has moved outside the slider
    if (!this.contains(event.target)) {
      this.handleBlur();
    }
  };

  handleKeyDown(event) {
    if (this.disabled) return;
    if (
      event.key.startsWith("Arrow") ||
      event.key === "Home" ||
      event.key === "End"
    ) {
      this.moveThumb(event);
      event.preventDefault(); // Prevent scrolling and other default behaviors
    }
  }

  handleKeyUp(event) {
    if (
      event.key.startsWith("Arrow") ||
      event.key === "Home" ||
      event.key === "End"
    ) {
      // Remove active class from both thumb containers when key is released
      this.removeActiveClass(".slider-thumb-container.upper-thumb");
      this.removeActiveClass(".slider-thumb-container.lower-thumb");
    }
  }

  moveThumb(event) {
    let increment = this.calculateIncrement();
    let thumbContainerSelector;

    switch (event.key) {
      case "ArrowUp":
        // Attempt to move upper thumb up
        if (this.upperValue < this.max) {
          this.upperValue = Math.min(this.max, this.upperValue + increment);
          if (this.snapToTicks) {
            this.upperValue = this.snapValueToTick(this.upperValue);
          }
          if (this.upperValue <= this.lowerValue + increment) {
            this.upperValue = Math.min(this.max, this.lowerValue + increment);
          }
        }
        thumbContainerSelector = ".slider-thumb-container.upper-thumb";
        break;
      case "ArrowDown":
        // Attempt to move upper thumb down
        if (this.upperValue > this.lowerValue + increment) {
          this.upperValue = Math.max(
            this.lowerValue + increment,
            this.upperValue - increment
          );
          if (this.snapToTicks) {
            this.upperValue = this.snapValueToTick(this.upperValue);
          }
        }
        thumbContainerSelector = ".slider-thumb-container.upper-thumb";
        break;
      case "ArrowRight":
        // Attempt to move lower thumb up
        if (this.lowerValue < this.upperValue - increment) {
          this.lowerValue = Math.min(
            this.upperValue - increment,
            this.lowerValue + increment
          );
          if (this.snapToTicks) {
            this.lowerValue = this.snapValueToTick(this.lowerValue);
          }
        }
        thumbContainerSelector = ".slider-thumb-container.lower-thumb";
        break;
      case "ArrowLeft":
        // Attempt to move lower thumb down
        if (this.lowerValue > this.min) {
          this.lowerValue = Math.max(this.min, this.lowerValue - increment);
          if (this.snapToTicks) {
            this.lowerValue = this.snapValueToTick(this.lowerValue);
          }
        }
        thumbContainerSelector = ".slider-thumb-container.lower-thumb";
        break;
      case "Home":
        this.lowerValue = this.min;
        this.upperValue = Math.max(
          this.min + increment,
          this.lowerValue + increment
        );
        thumbContainerSelector = ".slider-thumb-container.lower-thumb";
        break;
      case "End":
        this.upperValue = this.max;
        this.lowerValue = Math.min(
          this.max - increment,
          this.upperValue - increment
        );
        thumbContainerSelector = ".slider-thumb-container.upper-thumb";
        break;
    }

    this.requestUpdate();
    this.dispatchEvent(
      new CustomEvent("range-update", {
        detail: { lowerValue: this.lowerValue, upperValue: this.upperValue },
      })
    );

    if (thumbContainerSelector) {
      this.addActiveClass(thumbContainerSelector);
    }
  }

  addActiveClass(selector) {
    const thumbContainer = this.shadowRoot.querySelector(selector);
    if (thumbContainer) {
      thumbContainer.classList.add("slider-thumb-container-active");
    }
  }

  removeActiveClass(selector) {
    const thumbContainer = this.shadowRoot.querySelector(selector);
    if (thumbContainer) {
      thumbContainer.classList.remove("slider-thumb-container-active");
    }
  }

  setThumbFocusability(thumb, isActive) {
    if (thumb) {
      thumb.setAttribute("tabindex", isActive ? "0" : "-1");
      // If focused, ensure the thumb receives focus
      if (isActive) {
        thumb.focus();
      }
    }
  }

  calculateIncrement() {
    return this.snapToTicks && this.tickValues.length > 1
      ? this.tickValues[1] - this.tickValues[0]
      : 1;
  }

  snapValueToTick(value) {
    return this.tickValues.reduce(
      (prev, curr) =>
        Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev,
      this.tickValues[0] || this.min
    );
  }

  calculateSnapPosition(positionPercent) {
    const closestTickValue = this.tickValues.reduce((prev, curr) => {
      const prevDist = Math.abs(
        ((prev - this.min) / (this.max - this.min)) * 100 - positionPercent
      );
      const currDist = Math.abs(
        ((curr - this.min) / (this.max - this.min)) * 100 - positionPercent
      );
      return prevDist < currDist ? prev : curr;
    });
    return ((closestTickValue - this.min) / (this.max - this.min)) * 100;
  }

  render() {
    const lowerPercent =
      ((this.lowerValue - this.min) / (this.max - this.min)) * 100;
    const upperPercent =
      ((this.upperValue - this.min) / (this.max - this.min)) * 100;
    return html`
      <div
        dir="ltr"
        class="slider"
        aria-label="${ifDefined(this.label || undefined)}"
        role="slider"
        aria-valuemin="${ifDefined(this.min || undefined)}"
        aria-valuemax="${ifDefined(this.max || undefined)}"
        aria-valuenow="${ifDefined(this.value || undefined)}"
        aria-orientation="horizontal"
        disabled="${ifDefined(this.disabled || undefined)}"
      >
        ${this.sliderThumbLabel
          ? ""
          : this.label === ""
          ? ""
          : html`<label id="slider-input-label" class="form-control-label">
              ${this.label}
              ${(upperPercent - lowerPercent).toFixed(0)}${this.unit}
            </label>`}
        <div class="slider-container">
          <div
            role="textbox"
            aria-readonly="true"
            aria-labelledby="slider-input-label"
            class="slider-value-left${this.hideTextBoxes || this.hideLeftTextBox
              ? " hidden"
              : ""}"
          >
            ${this.lowerValue.toFixed(0)}
          </div>
          <div class="slider-min-value">${this.min}${this.unit}</div>

          <div class="slider-controls">
            <div
              class="${this.disabled ? '' : 'slider-thumb-container'} lower-thumb ${this.getColor(
                this.variant
              )}"
              style="transition: all 0.1s cubic-bezier(0.25, 0.8, 0.5, 1) 0s; left: calc(${lowerPercent.toFixed(
                0
              )}% - 5px);"
              @mousedown="${(e) => this.startDrag(e, "lower")}"
            >
              ${this.plumage
                ? html`
                    <div
                      class="slider-handle ${this.getColor(this.variant)}"
                      style="left: ${lowerPercent.toFixed(0)}%"
                      role="slider"
                      aria-valuemin="${this.min}"
                      aria-valuemax="${this.max}"
                      aria-valuenow="${this.lowerValue}"
                      aria-label="Lower value"
                      tabindex="0"
                    ></div>
                  `
                : html`
                    <div
                      class="slider-thumb ${this.getColor(this.variant)}"
                      style="left: ${lowerPercent.toFixed(0)}%"
                      role="slider"
                      aria-valuemin="${this.min}"
                      aria-valuemax="${this.max}"
                      aria-valuenow="${this.lowerValue}"
                      aria-label="Lower value"
                      tabindex="0"
                    ></div>
                  `}
              ${this.sliderThumbLabel
                ? html` <div
                    class="slider-thumb-label ${this.getColor(this.variant)}"
                    style="position: absolute; left: ${lowerPercent.toFixed(
                      0
                    )}%; transform: translateX(-30%) translateY(30%) translateY(-100%) rotate(45deg);"
                  >
                    <div>
                      <span>${this.lowerValue.toFixed(0)}${this.unit}</span>
                    </div>
                  </div>`
                : ""}
            </div>
            <div
              class="slider-track multi ${this.getColor(this.variant)}"
              style="width: ${lowerPercent.toFixed(0)}%;"
              @mousedown="${(e) => this.startDrag(e, "track")}"
            ></div>
            <div
              class="slider-track multi ${this.getColor(this.variant)}"
              style="left: ${lowerPercent.toFixed(0)}%; right: ${100 -
              upperPercent.toFixed(0)}%;"
              @mousedown="${(e) => this.startDrag(e, "track")}"
            ></div>

            <div
              class="${this.disabled ? '' : 'slider-thumb-container'} upper-thumb ${this.getColor(
                this.variant
              )}"
              style="transition: all 0.1s cubic-bezier(0.25, 0.8, 0.5, 1) 0s; left: calc(${upperPercent.toFixed(
                0
              )}% - 8px);"
              @mousedown="${(e) => this.startDrag(e, "upper")}"
            >
              ${this.plumage
                ? html` <div
                    class="slider-handle ${this.getColor(this.variant)}"
                    style="left: calc(${upperPercent.toFixed(0)}% + 3px);"
                    role="slider"
                    aria-valuemin="${this.min}"
                    aria-valuemax="${this.max}"
                    aria-valuenow="${this.upperValue}"
                    aria-label="Upper value"
                    tabindex="0"
                  ></div>`
                : html` <div
                    class="slider-thumb ${this.getColor(this.variant)}"
                    style="left: calc(${upperPercent.toFixed(0)}% + 3px);"
                    role="slider"
                    aria-valuemin="${this.min}"
                    aria-valuemax="${this.max}"
                    aria-valuenow="${this.upperValue}"
                    aria-label="Upper value"
                    tabindex="0"
                  ></div>`}
              ${this.sliderThumbLabel
                ? html` <div
                    class="slider-thumb-label ${this.getColor(this.variant)}"
                    style="position: absolute; left: calc(${upperPercent.toFixed(
                      0
                    )}% + 3px); transform: translateX(-30%) translateY(30%) translateY(-100%) rotate(45deg);"
                  >
                    <div>
                      <span>${this.upperValue.toFixed(0)}${this.unit}</span>
                    </div>
                  </div>`
                : ""}
            </div>
            <div
              class="slider-track multi"
              style="width: ${100 - upperPercent.toFixed(0)}%;"
              @mousedown="${(e) => this.startDrag(e, "track")}"
            ></div>
            ${this.ticks > 0
              ? html`
                  <div class="slider-ticks">
                    ${this.tickValues.map((tick, index) => {
                      const pos =
                        ((tick - this.min) / (this.max - this.min)) * 100;
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
                              ${this.tickValues[index] || tick}${this.unit ||
                              ""}
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
            class="slider-value-right${this.hideTextBoxes ||
            this.hideRightTextBox
              ? " hidden"
              : ""}"
          >
            ${this.upperValue.toFixed(0)}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("multi-range-slider", MultiRangeSlider);
