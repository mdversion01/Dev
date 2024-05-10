import { LitElement, html, css } from "lit";
import { sliderStyles } from "./slider-styles.js";

class CustomSlider extends LitElement {
  static styles = [
    sliderStyles,
    css`
      :host {
        display: block;
        padding: 16px;
      }
    `,
  ];

  static get properties() {
    return {
      label: { type: String },
      value: { type: Number },
      lowerValue: { type: Number },
      upperValue: { type: Number },
      min: { type: Number },
      max: { type: Number },
      steps: { type: Number },
      ticks: { type: Number },
      unit: { type: String },
      multiRangeSlider: { type: Boolean },
      rangeSlider: { type: Boolean },
      snapToSlider: { type: Boolean },
      dragging: { type: String },
      tickValues: { type: Array }, // Array of values for each tick
      tickLabels: { type: Array }, // Optional: Labels for each tick

      valuesArray: { type: Array }, // Array of values for each tick
    };
  }

  constructor() {
    super();
    this.label = "Adjust value";
    this.value = 30; // default value
    this.lowerValue = 25; // Initial lower value
    this.upperValue = 75; // Initial upper value
    this.min = 0;
    this.max = 100;
    this.ticks = 5;
    this.unit = "%";
    this.steps = 1;
    this.multiRangeSlider = false;
    this.rangeSlider = false;
    this.snapToSlider = false;
    this._mouseNearLower = false;
    this.dragging = null;
    this.tickValues = [0, 25, 50, 75, 100]; // Example tick positions
    this.tickLabels = ["0%", "25%", "50%", "75%", "100%"]; // Corresponding labels

    this.valuesArray = [0, 25, 50, 75, 100]; // Ensure this is set or handled dynamically
  }

  //   renderRangeSlider() {
  //     const valuePercent =
  //       ((this.value - this.min) / (this.max - this.min)) * 100; // Calculate the position as a percentage

  //     return html`
  //       <div dir="ltr" class="slider form-group">
  //         <label
  //           id="slider-input-label"
  //           for="slider-input"
  //           class="form-control-label"
  //           >${this.label} ${this.value}${this.unit}</label
  //         >
  //         <div class="slider-container">
  //           <div
  //             role="textbox"
  //             aria-readonly="true"
  //             aria-labelledby="slider-input-label"
  //             class="slider-value-left"
  //           >
  //             ${this.value}
  //           </div>
  //           <div class="slider-min-value">0</div>
  //           <div class="slider-controls">
  //             <div class="slider-track" style="width: ${valuePercent}%;"></div>
  //             ${this.ticks > 0
  //               ? html`
  //                   <div class="slider-ticks">
  //                     ${Array.from({ length: this.ticks }, (_, index) => {
  //                       const tickPosition =
  //                         ((index + 1) / (this.ticks + 1)) * 100;
  //                       return html`
  //                         <div
  //                           class="slider-tick"
  //                           style="left: ${tickPosition}%;"
  //                         ></div>
  //                       `;
  //                     })}
  //                   </div>
  //                 `
  //               : ""}
  //             <input
  //               type="range"
  //               class="slider-input"
  //               min="${this.min}"
  //               max="${this.max}"
  //               value="${this.value}"
  //               @input="${this._updateValue}"
  //               id="slider-input"
  //               aria-labelledby="slider-input-label"
  //               step="${this.steps}"
  //             />
  //             <div
  //               class="slider-thumb-label primary"
  //               style="position: absolute; left: ${valuePercent.toFixed(
  //                 0
  //               )}%; transform: translateX(-50%) translateY(60%) translateY(-100%) rotate(45deg);"
  //             >
  //               <div><span>${this.value}${this.unit}</span></div>
  //             </div>
  //             <div
  //               class="slider-track"
  //               style="width: ${100 - valuePercent}%;"
  //             ></div>
  //           </div>
  //           <div class="slider-max-value">100</div>
  //           <div
  //             role="textbox"
  //             aria-readonly="true"
  //             aria-labelledby="slider-input-label"
  //             class="slider-value-right"
  //           >
  //             ${this.value}
  //           </div>
  //         </div>
  //       </div>
  //     `;
  //   }

  renderRangeSlider() {
    const valuePercent = ((this.value - this.min) / (this.max - this.min)) * 100; // Calculate the position as a percentage

    return html`
      <div dir="ltr" class="slider form-group">
        <label id="slider-input-label" class="form-control-label">
          ${this.label} ${this.value.toFixed(0)}${this.unit}
        </label>
        <div class="slider-container">
          <div class="slider-controls">
            <div class="slider-background-track" style="width: 100%;"></div>
            <div class="slider-moving-track" style="width: ${valuePercent.toFixed(0)}%;"></div>
            <div
              class="slider-thumb-container primary"
              style="left: ${valuePercent.toFixed(0)}%; transition: all 0.1s cubic-bezier(0.25, 0.8, 0.5, 1) 0s;"
              @mousedown="${this.dragStart}"
            >
              <div class="slider-thumb primary"></div>

              <div
                class="slider-thumb-label primary"
                style="position: absolute; left: ${this.value.toFixed(0)}%; transform: translateX(-50%) translateY(30%) translateY(-100%) rotate(45deg);"
              >
                <div>
                  <span>${this.value.toFixed(0)}${this.unit}</span>
                </div>
              </div>
            </div>
            ${this.ticks > 0 ? html`
              <div class="slider-ticks">
                ${this.tickValues.map((tick, index) => {
                  const pos = ((tick - this.min) / (this.max - this.min)) * 100;
                  return html`
                    <div class="slider-tick" style="left: ${pos}%; top: calc(50% - 10px);"></div>
                    <div class="slider-tick-label" style="left: ${pos}%; transform: translateX(-50%);">${this.tickLabels[index] || tick}</div>
                  `;
                })}
              </div>
            ` : ""}
          </div>
          <div class="slider-max-value">${this.max}${this.unit}</div>
          <div
            role="textbox"
            aria-readonly="true"
            aria-labelledby="slider-input-label"
            class="slider-value-right"
          >
            ${this.value.toFixed(0)}
          </div>
        </div>
      </div>
    `;
}

dragStart(event) {
    event.preventDefault();
    this.initialX = event.clientX;
    this.dragging = true;
    const thumbContainer = this.shadowRoot.querySelector('.slider-thumb-container');
    thumbContainer.classList.add('slider-thumb-container-active');
  
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
    const thumbContainer = this.shadowRoot.querySelector('.slider-thumb-container');
    thumbContainer.classList.remove('slider-thumb-container-active');
    window.removeEventListener("mousemove", this.dragMove);
    window.removeEventListener("mouseup", this.dragStop);
};

updatePosition(event) {
    const sliderRect = this.shadowRoot.querySelector('.slider-container').getBoundingClientRect();
    let newPos = event.clientX - sliderRect.left;
    let newPositionPercent = (newPos / sliderRect.width) * 100;
    newPositionPercent = Math.max(0, Math.min(newPositionPercent, 100));

    if (this.snapToSlider) {
        newPositionPercent = this.calculateSnapPosition(newPositionPercent);
    }

    this.value = ((newPositionPercent / 100) * (this.max - this.min)) + this.min;
    this.requestUpdate();
}

calculateSnapPosition(positionPercent) {
    const closest = this.tickValues.reduce((prev, curr) => {
        const prevDist = Math.abs(((prev - this.min) / (this.max - this.min) * 100) - positionPercent);
        const currDist = Math.abs(((curr - this.min) / (this.max - this.min) * 100) - positionPercent);
        return (prevDist < currDist ? prev : curr);
    });
    return ((closest - this.min) / (this.max - this.min)) * 100;
}

  calculateStepSize() {
    if (!this.valuesArray || this.valuesArray.length < 2) {
      console.error("valuesArray is not defined or has insufficient data");
      return 1; // Return a default step size or handle this case appropriately
    }
    return (this.max - this.min) / (this.valuesArray.length - 1);
  }

  renderSnapToTicksSlider() {
    if (!this.valuesArray || this.valuesArray.length === 0) {
      return html`<p>Loading or error in setup...</p>`; // Placeholder or error message
    }

    const valuePercent =
      ((this.value - this.min) / (this.max - this.min)) * 100; // Calculate the position as a percentage

    return html`
      <div dir="ltr" class="slider form-group">
        <label
          id="slider-input-label"
          for="slider-input"
          class="form-control-label"
          >${this.label} ${this.value}${this.unit}</label
        >
        <div class="slider-container">
          <div
            role="textbox"
            aria-readonly="true"
            aria-labelledby="slider-input-label"
            class="slider-value-left"
          >
            ${this.value}
          </div>
          <div class="slider-min-value">0</div>
          <div class="slider-controls">
            <div class="slider-track" style="width: ${valuePercent}%;"></div>
            ${this.tickValues.length > 0
              ? html`
                  <div class="slider-ticks">
                    ${this.tickValues.map((value, index) => {
                      const position =
                        ((value - this.min) / (this.max - this.min)) * 100;
                      return html`
                        <div
                          class="slider-tick"
                          style="left: ${position}%; position: absolute;"
                        >
                          <span
                            class="slider-tick-label"
                            style="position: relative; left: -50%; top: -20px;"
                          >
                            ${this.tickLabels[index] || value}
                          </span>
                        </div>
                      `;
                    })}
                  </div>
                `
              : ""}
            <input
              type="range"
              class="slider-input"
              min="${this.min}"
              max="${this.max}"
              value="${this.value}"
              @input="${this._updateValue}"
              id="slider-input"
              list="tickmarks"
              step="${this.calculateStepSize()}"
            />
            <datalist id="tickmarks">
              ${this.valuesArray.map((value, index) => {
                const position =
                  (index / (this.valuesArray.length - 1)) *
                    (this.max - this.min) +
                  this.min;
                return html`<option value="${position}">${value}</option>`;
              })}
            </datalist>
            <div
              class="slider-thumb-label primary"
              style="position: absolute; left: ${valuePercent.toFixed(
                0
              )}%; transform: translateX(-50%) translateY(60%) translateY(-100%) rotate(45deg);"
            >
              <div><span>${this.value}${this.unit}</span></div>
            </div>
            <div
              class="slider-track"
              style="width: ${100 - valuePercent}%;"
            ></div>
          </div>
          <div class="slider-max-value">100</div>
          <div
            role="textbox"
            aria-readonly="true"
            aria-labelledby="slider-input-label"
            class="slider-value-right"
          >
            ${this.value}
          </div>
        </div>
      </div>
    `;
  }

  updated(changedProperties) {
    if (
      changedProperties.has("valuesArray") &&
      this.valuesArray &&
      this.valuesArray.length > 1
    ) {
      this.requestUpdate(); // Re-trigger rendering if necessary
    }
  }

  firstUpdated() {
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

    if (thumb === "lower" && value < this.upperValue) {
      this.lowerValue = value;
      this.requestUpdate();
      this.dispatchEvent(
        new CustomEvent("value-changed", {
          detail: { lowerValue: this.lowerValue },
        })
      );
    } else if (thumb === "upper" && value > this.lowerValue) {
      this.upperValue = value;
      this.requestUpdate();
      this.dispatchEvent(
        new CustomEvent("value-changed", {
          detail: { upperValue: this.upperValue },
        })
      );
    }
  }

  renderMultiRangeSlider() {
    let lowerPercent = (this.lowerValue / this.max) * 100;
    let upperPercent = (this.upperValue / this.max) * 100;

    const valuePercent =
      ((this.value - this.min) / (this.max - this.min)) * 100; // Calculate the position as a percentage

    return html`
      <div dir="ltr" class="slider form-group">
        <label id="slider-input-label" class="form-control-label"
          >${this.label}
          ${(upperPercent - lowerPercent).toFixed(0)}${this.unit}</label
        >
        <div class="slider-container">
          <div
            role="textbox"
            aria-readonly="true"
            aria-labelledby="slider-input-label"
            class="slider-value-left"
          >
            ${this.lowerValue.toFixed(0)}
          </div>
          <div class="slider-min-value">0</div>
          <div class="slider-controls">
            <div
              tabindex="-1"
              class="slider-thumb-container lower-thumb primary"
              style="transition: all 0.1s cubic-bezier(0.25, 0.8, 0.5, 1) 0s; left: calc(${lowerPercent.toFixed(
                0
              )}% - 5px);"
              @mousedown="${(e) => this.startDrag(e, "lower")}"
            >
              <div
                class="slider-thumb primary"
                style="left: ${lowerPercent.toFixed(0)}%"
              ></div>
              <div
                class="slider-thumb-label primary"
                style="position: absolute; left: ${lowerPercent.toFixed(
                  0
                )}%; transform: translateX(-30%) translateY(30%) translateY(-100%) rotate(45deg);"
              >
                <div>
                  <span>${this.lowerValue.toFixed(0)}${this.unit}</span>
                </div>
              </div>
            </div>
            <div
              class="slider-track multi"
              style="width: ${lowerPercent.toFixed(0)}%;"
              @mousedown="${(e) => this.startDrag(e, "track")}"
            ></div>
            <div
              class="slider-track multi"
              style="left: ${lowerPercent.toFixed(0)}%; right: ${100 -
              upperPercent.toFixed(0)}%;"
              @mousedown="${(e) => this.startDrag(e, "track")}"
            ></div>

            <div
              tabindex="-1"
              class="slider-thumb-container upper-thumb primary"
              style="transition: all 0.1s cubic-bezier(0.25, 0.8, 0.5, 1) 0s; left: calc(${upperPercent.toFixed(
                0
              )}% - 8px);"
              @mousedown="${(e) => this.startDrag(e, "upper")}"
            >
              <div
                class="slider-thumb primary"
                style="left: ${upperPercent.toFixed(0)}%"
              ></div>

              <div
                class="slider-thumb-label primary"
                style="position: absolute; left: ${upperPercent.toFixed(
                  0
                )}%; transform: translateX(-30%) translateY(30%) translateY(-100%) rotate(45deg);"
              >
                <div>
                  <span>${this.upperValue.toFixed(0)}${this.unit}</span>
                </div>
              </div>
            </div>
            <div
              class="slider-track multi"
              style="width: ${100 - upperPercent.toFixed(0)}%;"
              @mousedown="${(e) => this.startDrag(e, "track")}"
            ></div>

            ${this.ticks > 0
              ? html`<div class="slider-ticks">
                  ${Array.from({ length: this.ticks }, (_, index) => {
                    // Calculate position for each tick
                    const tickPosition = (index / (this.ticks - 1)) * 100; // Adjusted formula
                    return html`
                      <div
                        class="slider-tick"
                        style="left: ${tickPosition.toFixed(0)}%;
                        top: calc(50% - 10px);"
                      >
                        <div class="slider-tick-label">${this.tickLabel} X</div>
                      </div>
                    `;
                  })}
                </div>`
              : ""}
          </div>
          <div class="slider-max-value">100</div>
          <div
            role="textbox"
            aria-readonly="true"
            aria-labelledby="slider-input-label"
            class="slider-value-right"
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
    } else if (this.snapToSlider) {
      return this.renderSnapToTicksSlider();
    } else {
      return html`<p>
        Please set either multiRangeSlider, snapToSlider or rangeSlider to true.
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
