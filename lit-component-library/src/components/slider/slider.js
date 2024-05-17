import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { sliderStyles } from "./slider-styles.js";

class CustomSlider extends LitElement {
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

  static get properties() {
    return {
      discreteSlider: { type: Boolean },
      label: { type: String },
      value: { type: Object },
      focused: { type: Boolean },
      hideTextBoxes: { type: Boolean },
      hideLeftTextBox: { type: Boolean },
      hideRightTextBox: { type: Boolean },
      lowerValue: { type: Number },
      upperValue: { type: Number },
      min: { type: Number },
      max: { type: Number },
      multiRangeSlider: { type: Boolean },
      rangeSlider: { type: Boolean },
      sliderThumbLabel: { type: Boolean },
      snapToSlider: { type: Boolean },
      dragging: { type: String },
      snapToTicks: { type: Boolean },
      stringValues: { type: Array },
      selectedIndex: { type: Number },
      ticks: { type: Number },
      tickValues: { type: Array }, // Array of values for each tick
      tickLabels: { type: Boolean }, // Optional: Labels for each tick
      unit: { type: String },
      variant: { type: String },
    };
  }

  constructor() {
    super();
    this.discreteSlider = false;
    this.focused = false;
    this.hideTextboxes = false;
    this.hideLeftTextBox = false;
    this.hideRightTextBox = false;
    this.label = "";
    this.lowerValue = 0; // Initial lower value
    this.upperValue = 100; // Initial upper value
    this.min = "";
    this.max = "";
    this.multiRangeSlider = false;
    this.rangeSlider = false;
    this.sliderThumbLabel = false;
    this.snapToSlider = false;
    this._mouseNearLower = false;
    this.dragging = null;
    this.snapToTicks = false;
    this.stringValues = []; // Default string values
    this.selectedIndex = 0; // Start with the first index
    this.ticks = "";
    this.tickValues = []; // Example tick positions
    this.tickLabels = false; // Corresponding labels
    this.unit = "";
    this.variant = "";

    if (this.discreteSlider) {
      this.value = this.stringValues[this.selectedIndex];
    } else {
      this.value = 0;
    }
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

  // Method to calculate position based on the value type
  calculatePosition(value) {
    if (typeof value === "number") {
      return ((value - this.min) / (this.max - this.min)) * 100;
    }
    return null; // Default fallback if needed
  }

  renderRangeSlider() {
    const valuePercent =
      ((this.value - this.min) / (this.max - this.min)) * 100; // Calculate the position as a percentage

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
              @touchstart="${this.dragStart}"
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

  renderDiscreteSlider() {
    const valuePercent =
      (this.selectedIndex / (this.stringValues.length - 1)) * 100;

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
        ${this.label === ""
          ? ""
          : html` <label id="slider-input-label" class="form-control-label">
              ${this.label} ${this.stringValues[this.selectedIndex]}
            </label>`}
        <div class="slider-container">
          <div class="slider-controls">
            <div class="slider-background-track" style="width: 100%;"></div>
            <div
              class="slider-moving-track ${this.getColor(this.variant)}"
              style="width: ${valuePercent}%;"
            ></div>
            <div
              class="slider-thumb-container ${this.getColor(this.variant)}"
              style="left: ${valuePercent.toFixed(
                0
              )}%; transition: all 0.1s cubic-bezier(0.25, 0.8, 0.5, 1) 0s;"
              @mousedown="${this.dragStart}"
              @touchstart="${this.dragStart}"
            >
              <div class="slider-thumb ${this.getColor(this.variant)}"></div>
            </div>
            <div class="slider-ticks">
              ${this.stringValues.map((tick, index) => {
                const pos = (index / (this.stringValues.length - 1)) * 100;
                return html`
                  <div
                    class="slider-tick"
                    style="left: ${pos}%; top: calc(50% - 10px);"
                    @click="${() => this.selectValue(index)}"
                  ></div>
                  <div
                    class="slider-tick-label"
                    style="left: ${pos}%; transform: translateX(-50%);"
                  >
                    ${tick}
                  </div>
                `;
              })}
            </div>
          </div>
          <div
            role="textbox"
            aria-readonly="true"
            aria-labelledby="slider-input-label"
            class="slider-value-right${this.hideRightTextBox ? " hidden" : ""}"
          >
            ${this.stringValues[this.selectedIndex]}
          </div>
        </div>
      </div>
    `;
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

    if (this.discreteSlider) {
      // Calculate index based on the current position percent, clamped to the bounds of stringValues array
      let newIndex = Math.round(
        (newPositionPercent / 100) * (this.stringValues.length - 1)
      );
      newIndex = Math.max(0, Math.min(newIndex, this.stringValues.length - 1)); // Further clamping to ensure index is within bounds
      this.selectValue(newIndex);
    } else {
      // Apply snap logic based on the snapToTicks property
      if (this.snapToTicks) {
        newPositionPercent = this.calculateSnapPosition(newPositionPercent);
      }

      this.value =
        (newPositionPercent / 100) * (this.max - this.min) + this.min;
      this.requestUpdate();
    }
  }
  

  selectValue(index) {
    this.selectedIndex = index;
    this.value = this.stringValues[this.selectedIndex];
    this.requestUpdate();
    this.dispatchEvent(
      new CustomEvent("value-changed", { detail: { value: this.value } })
    );
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

  firstUpdated() {
    super.firstUpdated();
    this.setAttribute("tabindex", "0"); // Make the slider focusable

    this.addEventListener("focus", () => (this.focused = true));
    this.addEventListener("blur", () => (this.focused = false));
    this.addEventListener("keydown", this.handleKeyDown);

    this.sliderArea = this.shadowRoot.querySelector(".slider-container");
    this.lowerThumb = this.shadowRoot.querySelector(".lower-thumb");
    this.upperThumb = this.shadowRoot.querySelector(".upper-thumb");

    // Properly setup event listeners with the right context ('this' binding)
    if (this.lowerThumb) {
      this.lowerThumb.addEventListener("mousedown", (e) =>
        this.startDrag(e, "lower")
      );
    }
    if (this.upperThumb) {
      this.upperThumb.addEventListener("mousedown", (e) =>
        this.startDrag(e, "upper")
      );
    }

    window.addEventListener("mouseup", this.stopDrag.bind(this));
    window.addEventListener("mousemove", this.doDrag.bind(this));
  }

  startDrag(e, thumb) {
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

  renderMultiRangeSlider() {
    let lowerPercent = (this.lowerValue / this.max) * 100;
    let upperPercent = (this.upperValue / this.max) * 100;

    const valuePercent =
      ((this.value - this.min) / (this.max - this.min)) * 100; // Calculate the position as a percentage

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
              tabindex="-1"
              class="slider-thumb-container lower-thumb ${this.getColor(
                this.variant
              )}"
              style="transition: all 0.1s cubic-bezier(0.25, 0.8, 0.5, 1) 0s; left: calc(${lowerPercent.toFixed(
                0
              )}% - 5px);"
              @mousedown="${(e) => this.startDrag(e, "lower")}"
              @touchstart="${(e) => this.startDrag(e, "lower")}"
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
              @touchstart="${(e) => this.startDrag(e, "track")}"
            ></div>
            <div
              class="slider-track multi ${this.getColor(this.variant)}"
              style="left: ${lowerPercent.toFixed(0)}%; right: ${100 -
              upperPercent.toFixed(0)}%;"
              @mousedown="${(e) => this.startDrag(e, "track")}"
              @touchstart="${(e) => this.startDrag(e, "track")}"
            ></div>

            <div
              tabindex="-1"
              class="slider-thumb-container upper-thumb ${this.getColor(
                this.variant
              )}"
              style="transition: all 0.1s cubic-bezier(0.25, 0.8, 0.5, 1) 0s; left: calc(${upperPercent.toFixed(
                0
              )}% - 8px);"
              @mousedown="${(e) => this.startDrag(e, "upper")}"
              @touchstart="${(e) => this.startDrag(e, "upper")}"
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
              @touchstart="${(e) => this.startDrag(e, "track")}"
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

  render() {
    if (this.multiRangeSlider) {
      return this.renderMultiRangeSlider();
    } else if (this.rangeSlider) {
      return this.renderRangeSlider();
    } else if (this.discreteSlider) {
      return this.renderDiscreteSlider();
    } else {
      return html`<p>
        Please set either rangeSlider or multiRangeSlider in your component.
      </p>`;
    }
  }

  _updateLowerValue(e) {
    const newLowerValue = Number(e.target.value);
    if (newLowerValue < this.upperValue) {
      this.lowerValue = newLowerValue;
      this.requestUpdate();
      this._dispatchValueChangeEvent();
    }
  }

  _updateUpperValue(e) {
    const newUpperValue = Number(e.target.value);
    if (newUpperValue > this.lowerValue) {
      this.upperValue = newUpperValue;
      this.requestUpdate();
      this._dispatchValueChangeEvent();
    }
  }

  _dispatchValueChangeEvent() {
    this.dispatchEvent(
      new CustomEvent("range-changed", {
        detail: { lowerValue: this.lowerValue, upperValue: this.upperValue },
      })
    );
  }

  _updateValue(e) {
    this.value = e.target.value;
    this.requestUpdate();
    this.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value: this.value },
      })
    );
  }
}

customElements.define("custom-slider", CustomSlider);
