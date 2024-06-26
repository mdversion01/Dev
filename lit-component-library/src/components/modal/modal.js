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
    btnText: { type: String },
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
    scrollableBody: { type: Boolean },
    modalTitle: { type: String },
    modalId: { type: String },
    modalLg: { type: Boolean },
    modalSm: { type: Boolean },
    scrollLongContent: { type: Boolean },
    verticallyCentered: { type: Boolean },
  };

  constructor() {
    super();

    this.block = false;
    this.btnText = "Launch modal";
    this.classNames = "";
    this.disabled = false;
    this.id = "";
    this.open = false;
    this.outlined = false;
    this.ripple = false;
    this.styles = "";
    this.variant = "";

    // New properties
    this.scrollableBody = false;
    this.modalTitle = "Modal title";
    this.modalId = "exampleModalLive";
    this.modalLg = false;
    this.modalSm = false;
    this.scrollLongContent = false;
    this.verticallyCentered = false;
  }

  firstUpdated() {
    this.shadowRoot.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.closeModal();
      } else if (event.key === "Tab") {
        this.trapFocus(event);
      }
    });
  }

  trapFocus(event) {
    const focusableElements = this.shadowRoot.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      // if shift key pressed for shift + tab combination
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      // if tab key is pressed
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
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
        aria-label="${this.btnText}"
        style="${ifDefined(this.styles ? this.styles : undefined)}"
        ?disabled="${this.disabled}"
        role="button"
      >
        ${this.btnText}
      </button>
      <div
        class="modal-backdrop${this.open ? " open" : ""} fade"
        @click="${this.closeModal}"
      ></div>
      <div
        class="modal${this.open ? " open" : ""} fade"
        id="${this.modalId}"
        tabindex="-1"
        role="dialog"
        style="${this.open
          ? "display:block; padding-right: 17px;"
          : "display:none;"}${this.scrollLongContent
          ? " overflow-x: hidden; overflow-y: auto;"
          : ""}"
        aria-labelledby="${this.modalId}Label"
        aria-modal="true"
        @click="${this.closeModal}"
      >
        <div
          class="modal-dialog ${this.verticallyCentered
            ? "modal-dialog-centered"
            : ""}${this.modalLg ? " modal-lg" : ""}${this.modalSm
            ? " modal-sm"
            : ""}"
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
            <div class="modal-body${this.scrollableBody ? " scrollable" : ""}">
              <slot></slot>
              <!-- Use slot for content insertion -->
            </div>
            <div class="modal-footer">
              <button
                type="button"
                aria-label="Cancel"
                class="pl-btn btn-secondary sm"
                data-dismiss="modal"
                @click="${this.closeModal}"
              >
                Cancel
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
    this.updateComplete.then(() => {
      this.shadowRoot.querySelector(".modal-dialog").focus(); // Focus the modal dialog or a specific element within it
    });
  }

  closeModal() {
    this.open = false;
  }
}

customElements.define("modal-component", ModalComponent);
