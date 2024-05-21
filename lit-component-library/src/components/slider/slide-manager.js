import { LitElement, html } from "lit";
import "./basic-slider.js";
import "./multi-range-slider.js";
import "./discrete-slider.js";

class SliderManager extends LitElement {
  static properties = {
    type: { type: String }, // 'basic', 'multi', or 'discrete'
    value: { type: Number },
    disabled: { type: Boolean, reflect: true },
    label: { type: String },
    hideTextBoxes: { type: Boolean },
    hideLeftTextBox: { type: Boolean },
    hideRightTextBox: { type: Boolean },
    sliderThumbLabel: { type: Boolean },
    snapToTicks: { type: Boolean },
    ticks: { type: Number },
    tickValues: { type: Array }, // Array of values for each tick
    tickLabels: { type: Boolean }, // Optional: Labels for each tick
    unit: { type: String },
    variant: { type: String },
    min: { type: Number, attribute: "min" },
    max: { type: Number, attribute: "max" },
    plumage: { type: Boolean },
    selectedIndex: { type: Number },
    stringValues: { type: Array },
    lowerValue: { type: Number },
    upperValue: { type: Number },
  };

  constructor() {
    super();
    this.type = "basic"; // default type
    this.label = "";
    this.value = 0;
    this.disabled = false;
    this.hideTextboxes = false;
    this.hideLeftTextBox = false;
    this.hideRightTextBox = false;
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
    this.selectedIndex = 0;
    this.stringValues = [];
    this.lowerValue = 25;
    this.upperValue = 75;
  }

  render() {
    switch (this.type) {
      case "basic":
        return html`<basic-range-slider
          .label="${this.label}"
          .value="${this.value}"
          .unit="${this.unit}"
          .min="${this.min}"
          .max="${this.max}"
          .plumage="${this.plumage}"
          .sliderThumbLabel="${this.sliderThumbLabel}"
          .snapToTicks="${this.snapToTicks}"
          .ticks="${this.ticks}"
          .tickLabels="${this.tickLabels}"
          .tickValues="${this.tickValues}"
          .variant="${this.variant}"
          .hideRightTextBox="${this.hideRightTextBox}"
          .disabled="${this.disabled}"
        ></basic-range-slider>`;
      case "multi":
        return html`<multi-range-slider
          .label="${this.label}"
          .value="${this.value}"
          .lowerValue="${this.lowerValue}"
          .upperValue="${this.upperValue}"
          .min="${this.min}"
          .max="${this.max}"
          .plumage="${this.plumage}"
          .sliderThumbLabel="${this.sliderThumbLabel}"
          .snapToTicks="${this.snapToTicks}"
          .ticks="${this.ticks}"
          .tickLabels="${this.tickLabels}"
          .tickValues="${this.tickValues}"
          .variant="${this.variant}"
          .hideRightTextBox="${this.hideRightTextBox}"
          .hideLeftTextBox="${this.hideLeftTextBox}"
          .hideTextboxes="${this.hideTextboxes}"
        ></multi-range-slider>`;
      case "discrete":
        return html`<discrete-slider
          .value="${this.value}"
          .sliderThumbLabel="${this.sliderThumbLabel}"
          .ticks="${this.ticks}"
          .tickLabels="${this.tickLabels}"
          .min="${this.min}"
          .max="${this.max}"
          .plumage="${this.plumage}"
          .variant="${this.variant}"
          .hideRightTextBox="${this.hideRightTextBox}"
          .selectedIndex="${this.selectedIndex}"
          .stringValues="${this.stringValues}"
        ></discrete-slider>`;
      default:
        return html`<p>Please specify a valid slider type.</p>`;
    }
  }
}

customElements.define("slider-manager", SliderManager);
