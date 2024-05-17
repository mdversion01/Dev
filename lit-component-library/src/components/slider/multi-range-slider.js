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
    hideTextBoxes: { type: Boolean },
    hideLeftTextBox: { type: Boolean },
    hideRightTextBox: { type: Boolean },
    label: { type: String },
    lowerValue: { type: Number },
    upperValue: { type: Number },
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
    this.hideTextboxes = false;
    this.hideLeftTextBox = false;
    this.hideRightTextBox = false;
    this.label = "";
    this.lowerValue = 25;
    this.upperValue = 75;
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
    this.setAttribute("tabindex", "0");
    this.addEventListener("mousedown", this.handleMouseDown.bind(this)); // Bind this to ensure correct context
    this.addEventListener("focus", this.handleFocus);
    this.addEventListener("blur", this.handleBlur);
    this.addEventListener("keydown", this.handleKeyDown);
    this.addEventListener("keyup", this.handleKeyUp);
  }

  firstUpdated() {
    super.firstUpdated();
    this.sliderArea = this.shadowRoot.querySelector(".slider-container");
    this.lowerThumb = this.shadowRoot.querySelector(".lower-thumb");
    this.upperThumb = this.shadowRoot.querySelector(".upper-thumb");

    // Setup the focusability once the component is fully loaded
    this.setThumbFocusability(this.lowerThumb, true);
    this.setThumbFocusability(this.upperThumb, false);

    // Add event listeners for mouse drag
    this.addEventListeners();
  }

  addEventListeners() {
    this.lowerThumb.addEventListener("mousedown", e => this.startDrag(e, "lower"));
    this.upperThumb.addEventListener("mousedown", e => this.startDrag(e, "upper"));
    window.addEventListener("mouseup", this.stopDrag.bind(this));
    window.addEventListener("mousemove", this.doDrag.bind(this));
  }

  removeEventListeners() {
    this.lowerThumb.removeEventListener("mousedown", this.startDrag);
    this.upperThumb.removeEventListener("mousedown", this.startDrag);
    window.removeEventListener("mouseup", this.stopDrag);
    window.removeEventListener("mousemove", this.doDrag);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListeners();
  }

  startDrag(e, thumb) {
    e.preventDefault();
    this.dragging = thumb;

    const thumbElement = thumb === "lower" ? this.lowerThumb : this.upperThumb;
    thumbElement.classList.add("slider-thumb-container-active");

    // Ensure thumb focusability is adjusted
    this.setThumbFocusability(thumbElement, true);
  }

  doDrag(e) {
    if (!this.dragging || !this.sliderArea) return;
    const rect = this.sliderArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    this.updateValue(x, this.dragging);
  }

  stopDrag() {
    const activeThumb = this.dragging === "lower" ? this.lowerThumb : this.upperThumb;
    activeThumb.classList.remove("slider-thumb-container-active");
    this.dragging = null;
  }

  updateValue(x, thumb) {
    if (!this.sliderArea) return; // Ensure sliderArea is defined

    const rect = this.sliderArea.getBoundingClientRect();
    let value = ((x - rect.left) / rect.width) * (this.max - this.min) + this.min; // Convert x position to value

    // Constrain the value within the slider range
    value = Math.max(this.min, Math.min(value, this.max));

    // If snap to ticks is enabled, adjust the value to the nearest tick
    if (this.snapToTicks) {
        value = this.snapValueToTick(value);
    }

    // Update the value while ensuring that lowerValue does not exceed upperValue and vice versa
    if (thumb === "lower") {
        if (value < this.upperValue) {
            this.lowerValue = value;
        } else {
            this.lowerValue = this.upperValue;
        }
    } else if (thumb === "upper") {
        if (value > this.lowerValue) {
            this.upperValue = value;
        } else {
            this.upperValue = this.lowerValue;
        }
    }

    // Ensure the values do not cross each other
    this.lowerValue = Math.min(this.lowerValue, this.upperValue);
    this.upperValue = Math.max(this.lowerValue, this.upperValue);

    // Trigger a component update and dispatch an event
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent("value-changed", {
        detail: {
            lowerValue: this.lowerValue,
            upperValue: this.upperValue
        }
    }));
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
        this.upperValue = Math.min(this.max, this.upperValue + increment);
        thumbContainerSelector = ".slider-thumb-container.upper-thumb";
        if (this.upperValue <= this.lowerValue)
          this.upperValue = this.lowerValue + increment;
        break;
      case "ArrowDown":
        this.upperValue = Math.max(
          this.lowerValue,
          this.upperValue - increment
        );
        thumbContainerSelector = ".slider-thumb-container.upper-thumb";
        break;
      case "ArrowRight":
        this.lowerValue = Math.min(
          this.upperValue,
          this.lowerValue + increment
        );
        thumbContainerSelector = ".slider-thumb-container.lower-thumb";
        break;
      case "ArrowLeft":
        this.lowerValue = Math.max(this.min, this.lowerValue - increment);
        thumbContainerSelector = ".slider-thumb-container.lower-thumb";
        if (this.lowerValue >= this.upperValue)
          this.lowerValue = this.upperValue - increment;
        break;
      case "Home":
        this.lowerValue = this.min;
        this.upperValue = Math.min(this.min + increment, this.max);
        thumbContainerSelector = event.shiftKey
          ? ".slider-thumb-container.lower-thumb"
          : ".slider-thumb-container.upper-thumb";
        break;
      case "End":
        this.upperValue = this.max;
        this.lowerValue = Math.max(this.max - increment, this.min);
        thumbContainerSelector = event.shiftKey
          ? ".slider-thumb-container.upper-thumb"
          : ".slider-thumb-container.lower-thumb";
        break;
    }

    if (this.snapToTicks) {
      this.lowerValue = this.snapValueToTick(this.lowerValue);
      this.upperValue = this.snapValueToTick(this.upperValue);
    }

    this.lowerValue = Math.max(
      this.min,
      Math.min(this.lowerValue, this.upperValue)
    );
    this.upperValue = Math.min(
      this.max,
      Math.max(this.upperValue, this.lowerValue)
    );

    this.requestUpdate();
    this.dispatchEvent(
      new CustomEvent("range-update", {
        detail: { lowerValue: this.lowerValue, upperValue: this.upperValue },
      })
    );

    // Add active class to the appropriate thumb container
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
    return this.tickValues.reduce((prev, curr) =>
        Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev, this.tickValues[0] || this.min);
}

  render() {
    const lowerPercent =
      ((this.lowerValue - this.min) / (this.max - this.min)) * 100;
    const upperPercent =
      ((this.upperValue - this.min) / (this.max - this.min)) * 100;
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
              class="slider-thumb-container lower-thumb ${this.getColor(
                this.variant
              )}"
              style="transition: all 0.1s cubic-bezier(0.25, 0.8, 0.5, 1) 0s; left: calc(${lowerPercent.toFixed(
                0
              )}% - 5px);"
              @mousedown="${(e) => this.startDrag(e, "lower")}"
            >
              <div
                class="slider-thumb ${this.getColor(this.variant)}"
                style="left: ${lowerPercent.toFixed(0)}%"
              ></div>
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
              class="slider-thumb-container upper-thumb ${this.getColor(
                this.variant
              )}"
              style="transition: all 0.1s cubic-bezier(0.25, 0.8, 0.5, 1) 0s; left: calc(${upperPercent.toFixed(
                0
              )}% - 8px);"
              @mousedown="${(e) => this.startDrag(e, "upper")}"
            >
              <div
                class="slider-thumb ${this.getColor(this.variant)}"
                style="left: calc(${upperPercent.toFixed(0)}% + 3px);"
              ></div>
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

//   tempDrag(e) {
//     // Check if dragging is active and if sliderArea is defined
//     if (!this.dragging || !this.sliderArea) return;

//     const rect = this.sliderArea.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     this.updateValue(x, this.dragging);
//   }

//   startDrag(e, thumb) {
//     e.preventDefault();
//     this.dragging = thumb;

//     // Ensure elements are defined before adding classes or setting styles
//     const targetThumb = thumb === "lower" ? this.lowerThumb : this.upperThumb;
//     if (targetThumb) {
//       targetThumb.classList.add("slider-thumb-container-active");
//     }

//     window.addEventListener("mousemove", this.tempDrag.bind(this));
//     window.addEventListener("mouseup", this.tempStopDrag.bind(this));
//   }

//   tempStopDrag(e) {
//     window.removeEventListener("mousemove", this.tempDrag.bind(this));
//     window.removeEventListener("mouseup", this.tempStopDrag.bind(this));
//     this.stopDrag();
//   }
//   doDrag(e) {
//     if (!this.dragging) return; // Only proceed if dragging is active.

//     let rect = this.sliderArea.getBoundingClientRect();
//     let x = e.clientX - rect.left; // Continue updating based on the current mouse position.
//     this.updateValue(x, this.dragging); // Update the value based on which thumb is being dragged.
//   }

//   stopDrag() {
//     if (this.lowerThumb) {
//       this.lowerThumb.classList.remove("slider-thumb-container-active");
//     }
//     if (this.upperThumb) {
//       this.upperThumb.classList.remove("slider-thumb-container-active");
//     }
//     this.dragging = false;
//   }

//   updateValue(x, thumb) {
//     if (!this.sliderArea) return; // Safeguard against undefined sliderArea

//     const rect = this.sliderArea.getBoundingClientRect();
//     let value = (x / rect.width) * (this.max - this.min) + this.min;

//     if (this.snapToTicks) {
//       value = this.snapValueToTick(value);
//     }

//     // Update the appropriate value based on which thumb is being dragged
//     if (thumb === "lower" && value < this.upperValue) {
//       this.lowerValue = value;
//     } else if (thumb === "upper" && value > this.lowerValue) {
//       this.upperValue = value;
//     }

//     this.requestUpdate();
//     this.dispatchEvent(
//       new CustomEvent("value-changed", {
//         detail: { lowerValue: this.lowerValue, upperValue: this.upperValue },
//       })
//     );
//   }

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
}

customElements.define("multi-range-slider", MultiRangeSlider);
