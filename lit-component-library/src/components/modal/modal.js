import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { modalStyles } from "./modal-styles.js";

class Modal extends LitElement {
    static styles = [modalStyles, css`
     :host {
      display: block;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }
    :host([open]) {
      visibility: visible;
      opacity: 1;
    }
    
    `];
  
  static get properties() {
    return {
      open: { type: Boolean }
    };
  }
  
  constructor() {
    super();
    this.open = false;
  }

  render() {
    return html`
      <div class="modal-backdrop" @click="${this.close}"></div>
      <div class="modal-content">
        <slot></slot>
      </div>
    `;
  }

  openModal() {
    this.open = true;
  }

  closeModal() {
    this.open = false;
  }
}

customElements.define("modal-component", Modal);