import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { sliderStyles } from "./slider-styles.js";

class DiscreteSlider extends LitElement {
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
    disabled: { type: Boolean, reflect: true },
    hideTextBoxes: { type: Boolean },
    hideLeftTextBox: { type: Boolean },
    hideRightTextBox: { type: Boolean },
    label: { type: String },
    min: { type: Number, attribute: "min" },
    max: { type: Number, attribute: "max" },
    plumage: { type: Boolean },
    selectedIndex: { type: Number },
    stringValues: { type: Array },
    ticks: { type: Number },
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
    this.min = 0; // Ensure proper default initialization
    this.max = 100; // Ensure proper default initialization
    this.plumage = false;
    this.selectedIndex = 0;
    this.stringValues = [];
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

  handleFocus() {
    const thumb = this.shadowRoot.querySelector(".slider-thumb");
    thumb.classList.add("focused");
  }

  handleBlur() {
    const thumb = this.shadowRoot.querySelector(".slider-thumb");
    thumb.classList.remove("focused");
  }

  handleKeyDown(event) {
    if (this.disabled) return;
    let newIndex;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        newIndex = Math.min(
          this.selectedIndex + 1,
          this.stringValues.length - 1
        );
        break;
      case "ArrowLeft":
      case "ArrowDown":
        newIndex = Math.max(this.selectedIndex - 1, 0);
        break;
      case "Home":
        newIndex = 0;
        break;
      case "End":
        newIndex = this.stringValues.length - 1;
        break;
      default:
        return; // Exit if the key isn't handled
    }

    event.preventDefault(); // Prevent the default action to stop scrolling the page
    this.selectValue(newIndex); // Update the slider based on the new index

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

  selectValue(index) {
    this.selectedIndex = index; // Update the selected index
    this.requestUpdate(); // Request an update to re-render the component

    // Dispatch the custom event with detailed information about the current state
    this.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: {
          selectedIndex: this.selectedIndex,
          value: this.stringValues[this.selectedIndex], // Numeric or actual value if needed
          stringValue: this.stringValues[this.selectedIndex], // String representation of the value
        },
      })
    );
  }

  render() {
    const valuePercent =
      (this.selectedIndex / (this.stringValues.length - 1)) * 100;
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
              style="width: ${valuePercent.toFixed(0)}%;"
            ></div>
            <div
              class="${this.disabled ? '' : 'slider-thumb-container'} ${this.getColor(this.variant)}"
              style="left: ${valuePercent.toFixed(
                0
              )}%; transition: all 0.1s cubic-bezier(0.25, 0.8, 0.5, 1) 0s;"
              @mousedown="${this.dragStart}"
              @keydown="${this.handleKeyDown}"
            >
            ${this.plumage ? html`
            <div
                class="slider-handle ${this.getColor(this.variant)}"
                role="slider"
                aria-label="Slider thumb"
              ></div>
              ` : html`
            <div
                class="slider-thumb ${this.getColor(this.variant)}"
                role="slider"
                aria-label="Slider thumb"
              ></div>
              `}
              
            </div>
            <div class="slider-ticks">
              ${this.stringValues.map((tick, index) => {
                const pos = (index / (this.stringValues.length - 1)) * 100;
                return html`
                  <div
                    class="slider-tick"
                    style="left: ${(index / (this.stringValues.length - 1)) *
                    100}%; top: calc(50% - 10px);"
                    @click="${() => this.selectValue(index)}"
                  ></div>
                  ${this.tickLabels
                    ? html`<div
                        class="slider-tick-label"
                        style="left: ${(index /
                          (this.stringValues.length - 1)) *
                        100}%;; transform: translateX(-50%);"
                      >
                        ${tick}
                      </div>`
                    : ""}
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
    if (this.disabled) return;
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

    // Calculate index based on the current position percent, clamped to the bounds of stringValues array
    let newIndex = Math.round(
      (newPositionPercent / 100) * (this.stringValues.length - 1)
    );
    newIndex = Math.max(0, Math.min(newIndex, this.stringValues.length - 1)); // Further clamping to ensure index is within bounds
    this.selectValue(newIndex);

    this.value = (newPositionPercent / 100) * (this.max - this.min) + this.min;
    this.requestUpdate();
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
}

customElements.define("discrete-slider", DiscreteSlider);
