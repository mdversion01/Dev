import { LitElement, html, css } from "lit";
import "../button/button.js"; // Import the PlButton component
import { buttonStyles } from "../button/button-styles.js"; // Import the PlButton component
import { buttonGroupStyles } from "./button-group-styles.js"; // Import the button group styles

class ButtonGroup extends LitElement {
  static styles = [
    buttonGroupStyles,
    buttonStyles,
    // css``
  ];

  static get properties() {
    return {
        
    };
  }

  constructor() {
    super();
    
}
     

  render() {
    return html`
      <div role="group" aria-label="Basic example" class="pl-btn-group">
        <slot name="buttons"></slot>
      </div>
    `;
  }
}

customElements.define("button-group", ButtonGroup);
