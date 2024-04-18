import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { buttonStyles } from "../button/button-styles.js";
import { modalStyles } from "./modal-styles.js";
import {
  constructClassAttribute,
  getButtonTypeClass,
  getButtonShape,
} from "../utilities/sharedButtonUtils.js";

class ModalComponent extends LitElement {
  static styles = [buttonStyles, modalStyles, css``];

  static properties = {
    block: { type: Boolean },
    buttonText: { type: String },
    disabled: { type: Boolean },
    classNames: { type: String },
    id: { type: String },
    open: { type: Boolean },
    outlined: { type: Boolean },
    ripple: { type: Boolean },
    shape: { type: String },
    size: { type: String },
    styles: { type: String },
    variant: { type: String },

    // New properties
    modalTitle: { type: String },
    modalId: { type: String },
  };

  constructor() {
    super();

    this.block = false;
    this.buttonText = "Launch modal";
    this.classNames = "";
    this.disabled = false;
    this.id = "";
    this.open = false;
    this.outlined = false;
    this.ripple = false;
    this.styles = "";
    this.variant = "";

    // New properties
    this.modalTitle = "Modal title";
    this.modalId = "exampleModalLive";

  }

  render() {

    // Declare classAttribute before using it
    let classAttribute = "";
    // Construct class attribute with shared utility function
    classAttribute += constructClassAttribute({
      classNames: this.classNames,
      outlinedClass: this.outlined ? "pl-btn--outlined" : "",
      blockClass: this.block ? "pl-btn--block" : "",
      variant: this.variant,
      rippleEffect: this.ripple ? "pl-btn-ripple" : "",
      size: getButtonTypeClass(this.iconBtn, this.size),
      shape: getButtonShape(this.shape),
    });

    return html`
      <button
        type="button"
        class="pl-btn ${classAttribute}"
        data-toggle="modal"
        data-target="#${this.modalId}"
        @click="${this.openModal}"
        aria-label="${this.buttonText}"
        style="${ifDefined(this.styles ? this.styles : undefined)}"
        ?disabled="${this.disabled}"
        role="button"
      >
      ${this.buttonText}
      </button>
      <div
        class="modal-backdrop fade${this.open ? " open" : ""}"
        @click="${this.closeModal}"
      ></div>
      <div
        class="modal fade${this.open ? " open" : ""}"
        id="${this.modalId}"
        tabindex="-1"
        role="dialog"
        style="${this.open
          ? "display:block; padding-right: 17px;"
          : "display:none;"}"
        aria-labelledby="${this.modalId}Label"
        @click="${this.closeModal}"
      >
        <div
          class="modal-dialog"
          role="document"
          @click="${(e) => e.stopPropagation()}"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="${this.modalId}Label">
                ${this.modalTitle}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="${this.closeModal}"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <slot></slot>
              <!-- Use slot for content insertion -->
            </div>
            <div class="modal-footer">
              <button
                type="button"
                aria-label="${this.buttonText}"
                class="pl-btn btn-secondary sm"
                data-dismiss="modal"
                @click="${this.closeModal}"
              >
                Close
              </button>
              <slot name="footer"></slot>
              <!-- Use slot for additional button insertion -->
            </div>
          </div>
        </div>
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

customElements.define("modal-component", ModalComponent);
