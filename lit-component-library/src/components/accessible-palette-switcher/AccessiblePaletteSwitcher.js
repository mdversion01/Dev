import { LitElement, html, css } from "lit";
import { palettes } from "./palettes.js"; // Import the palettes

class AccessiblePaletteSwitcher extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }

    body {
      background-color: var(--background-color, #f8f9fa);
      color: var(--gray-900, #000000);
    }

    .content {
      background-color: var(--background-color, #ffffff);
      color: var(--gray-900, #000000);
      padding: 20px;
      border-radius: 8px;
      transition: background-color 0.3s, color 0.3s;
    }

    button {
      background-color: var(--secondary-color, #007bff);
      color: var(--primary-color, #ffffff);
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s;
      outline: none;
    }

    button:focus {
      outline: 2px solid #000; /* Focus outline for accessibility */
    }

    select {
      padding: 8px;
      margin-top: 10px;
      border-radius: 4px;
      border: 1px solid #ccc;
      outline: none;
    }

    select:focus {
      outline: 2px solid #000; /* Focus outline for select */
    }

    .palette-example {
      margin-top: 20px;
    }

    .palette {
      display: flex;
      flex-wrap: wrap;
    }

    .color-block {
      margin: 5px;
      text-align: center;
    }

    .color-block .swatch {
      width: 100px;
      height: 50px;
      border-radius: 4px;
      position: relative;
      border: 2px solid transparent;
    }

    .color-block:focus-within .swatch {
      border: 2px solid #000; /* Focus outline on color swatch */
    }

    .hex-code {
      position: absolute;
      bottom: 5px;
      left: 5px;
      font-size: 0.8em;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 2px 5px;
      border-radius: 3px;
    }

    .color-name {
      font-family: monospace;
      font-size: 0.9em;
      color: var(--gray-900, #fff);
    }

    /* Define classes for each color */
    .gray-25 {
      background-color: var(--gray-25);
    }
    .gray-50 {
      background-color: var(--gray-50);
    }
    .gray-75 {
      background-color: var(--gray-75);
    }
    .gray-100 {
      background-color: var(--gray-100);
    }
    .gray-200 {
      background-color: var(--gray-200);
    }
    .gray-300 {
      background-color: var(--gray-300);
    }
    .gray-400 {
      background-color: var(--gray-400);
    }
    .gray-500 {
      background-color: var(--gray-500);
    }
    .gray-600 {
      background-color: var(--gray-600);
    }
    .gray-700 {
      background-color: var(--gray-700);
    }
    .gray-800 {
      background-color: var(--gray-800);
    }
    .gray-850 {
      background-color: var(--gray-850);
    }
    .gray-900 {
      background-color: var(--gray-900);
    }
    .blue-50 {
      background-color: var(--blue-50);
    }
    .blue-100 {
      background-color: var(--blue-100);
    }
    .blue-200 {
      background-color: var(--blue-200);
    }
    .blue-300 {
      background-color: var(--blue-300);
    }
    .blue-400 {
      background-color: var(--blue-400);
    }
    .blue-500 {
      background-color: var(--blue-500);
    }
    .blue-600 {
      background-color: var(--blue-600);
    }
    .blue-700 {
      background-color: var(--blue-700);
    }
    .blue-910 {
      background-color: var(--blue-910);
    }
    .blue-920 {
      background-color: var(--blue-920);
    }
    .red-200 {
      background-color: var(--red-200);
    }
    .red-400 {
      background-color: var(--red-400);
    }
    .red-500 {
      background-color: var(--red-500);
    }
    .red-600 {
      background-color: var(--red-600);
    }
    .red-700 {
      background-color: var(--red-700);
    }
    .red-910 {
      background-color: var(--red-910);
    }
    .red-920 {
      background-color: var(--red-920);
    }
    .orange-400 {
      background-color: var(--orange-400);
    }
    .orange-500 {
      background-color: var(--orange-500);
    }
    .orange-600 {
      background-color: var(--orange-600);
    }
    .orange-700 {
      background-color: var(--orange-700);
    }
    .green-200 {
      background-color: var(--green-200);
    }
    .green-400 {
      background-color: var(--green-400);
    }
    .green-500 {
      background-color: var(--green-500);
    }
    .green-600 {
      background-color: var(--green-600);
    }
    .green-700 {
      background-color: var(--green-700);
    }
    .yellow-200 {
      background-color: var(--yellow-200);
    }
    .yellow-400 {
      background-color: var(--yellow-400);
    }
    .brown-400 {
      background-color: var(--brown-400);
    }

    /* Contextual colors */
    .primary-color {
      background-color: var(--primary-color);
    }
    .secondary-color {
      background-color: var(--secondary-color);
    }
    .tertiary-color {
      background-color: var(--tertiary-color);
    }
    .informational-color {
      background-color: var(--informational-color);
    }
    .danger-color {
      background-color: var(--danger-color);
    }
    .warning-color {
      background-color: var(--warning-color);
    }
    .success-color {
      background-color: var(--success-color);
    }
  `;

  static properties = {
    selectedCategory: { type: String },
    selectedMode: { type: String },
  };

  constructor() {
    super();
    this.selectedCategory = "normal"; // Default palette
    this.selectedMode = "light"; // Default mode
  }

  firstUpdated() {
    this._applyPalette(this.selectedCategory, this.selectedMode); // Apply default palette
    this.requestUpdate(); // Ensure re-render after applying the palette
  }

  render() {
    const colors = [
      "gray-25", "gray-50", "gray-75", "gray-100", "gray-200", "gray-300", "gray-400", "gray-500", 
      "gray-600", "gray-700", "gray-800", "gray-850", "gray-900", "blue-50", "blue-100", "blue-200", 
      "blue-300", "blue-400", "blue-500", "blue-600", "blue-700", "red-200", "red-400", "red-500", 
      "red-600", "red-700", "red-910", "red-920", "orange-400", "orange-500", "orange-600", "orange-700", "green-200", 
      "green-400", "green-500", "green-600", "green-700", "yellow-200", "yellow-400", "brown-400"
    ];

    const contextualColors = ["primary-color", "secondary-color", "tertiary-color", "informational-color", "danger-color", "warning-color", "success-color"];
  
    return html` 
      <div class="content">
        <h1>Accessible Color Palette</h1>
        <p>Select a color blindness category and theme mode:</p>
  
        <label for="mode">Theme Mode: </label>
        <select id="mode" @change="${this._changeMode}">
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
        </select>
  
        <label for="category">Color Blindness Category: </label>
        <select id="category" @change="${this._changeCategory}">
          <option value="normal">Normal Vision</option>
          <option value="protanopia">Protanopia</option>
          <option value="deuteranopia">Deuteranopia</option>
          <option value="tritanopia">Tritanopia</option>
        </select>
  
        <div class="palette-example">
          <h2>Palette Preview:</h2>
          <div class="palette">
            ${colors.map(color => this._renderColorBlock(color))}
          </div>
          <div class="palette">
          ${contextualColors.map(color => this._renderColorBlock(color))}
          </div>
        </div>
      </div>`;
  }
  

  _renderColorBlock(className) {
    // Ensure the style is applied before calling getComputedStyle
    this.updateComplete.then(() => {
      const swatch = this.shadowRoot.querySelector(`.${className}`);
      if (swatch) {
        const colorValue = getComputedStyle(this)
          .getPropertyValue(`--${className}`)
          .trim();
        swatch.querySelector(".hex-code").textContent = colorValue;
      }
    });

    return html`
      <div class="color-block">
        <div class="swatch ${className}" tabindex="0" role="img" aria-label="${className} color">
          <div class="hex-code">#</div>
        </div>
        <div class="color-name">${className}</div>
      </div>
    `;
  }

  _changeCategory(event) {
    this.selectedCategory = event.target.value;
    this._applyPalette(this.selectedCategory, this.selectedMode);
  }

  _changeMode(event) {
    this.selectedMode = event.target.value;
    this._applyPalette(this.selectedCategory, this.selectedMode);
  }

  _applyPalette(category, mode) {
    // Fall back to "normal" and "light" if category or mode is invalid
    const palette =
      palettes[category] && palettes[category][mode]
        ? palettes[category][mode]
        : palettes["normal"]["light"];

    // Apply each CSS variable from the selected palette
    for (const [varName, varValue] of Object.entries(palette)) {
      this.style.setProperty(varName, varValue);
    }
  }
}

customElements.define("accessible-palette-switcher", AccessiblePaletteSwitcher);
