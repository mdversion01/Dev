import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { formStyles } from "../form-styles.js";
import { toggleSwitchStyles } from "./toggle-switch-styles.js";

let lastInteractionWasKeyboard = false;

document.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    lastInteractionWasKeyboard = true;
  }
});

document.addEventListener("mousedown", () => {
  lastInteractionWasKeyboard = false;
});
document.addEventListener("touchstart", () => {
  lastInteractionWasKeyboard = false;
});

class ToggleSwitch extends LitElement {
  static styles = [formStyles, toggleSwitchStyles, css``];

  static properties = {
    checked: { type: Boolean },
    disabled: { type: Boolean },
    inputId: { type: String },
    inline: { type: Boolean },
    labelTxt: { type: String },
    newToggleTxt: { type: Object },
    noLabel: { type: Boolean },
    required: { type: Boolean },
    size: { type: String },
    switches: { type: Boolean },
    switchesArray: { type: Array },
    toggleTxt: { type: Boolean },
    value: { type: String },
    validation: { type: Boolean },
    validationMessage: { type: String },
    focusedSwitchId: { type: String },
    formLayout: { type: String },
    noPadFormGroup: { type: Boolean },
  };

  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
    this.inputId = "";
    this.inline = false;
    this.labelTxt = "";
    this.switches = false;
    this.switchesArray = [];
    this.newToggleTxt = { on: "On", off: "Off" };
    this.noLabel = false;
    this.toggleTxt = false;
    this.required = false;
    this.size = "";
    this.value = "";
    this.validation = false;
    this.validationMessage = "";
    this.focusedSwitchId = null;
    this.noPadFormGroup = false;
  }

  connectedCallback() {
    super.connectedCallback();

    // Access the formId and formLayout properties from the closest form-component
    const formComponent = this.closest("form-component");

    if (formComponent) {
      this.formLayout = formComponent.formLayout || "";
    }
  }

  toggleChecked(id) {
    if (this.switches) {
      const index = this.switchesArray.findIndex(
        (switchItem) => switchItem.id === id
      );
      if (index !== -1) {
        this.switchesArray[index] = {
          ...this.switchesArray[index],
          checked: !this.switchesArray[index].checked,
        };
        this.requestUpdate("switchesArray", [...this.switchesArray]);
      }
    } else {
      this.checked = !this.checked;
      this.dispatchEvent(
        new CustomEvent("checked-changed", {
          detail: { checked: this.checked },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  handleFocus(event) {
    if (lastInteractionWasKeyboard) {
      this.focusedSwitchId = event.target.id;
    }
    this.requestUpdate();
  }

  handleBlur() {
    this.focusedSwitchId = null;
    this.requestUpdate();
  }

  renderSwitch(switchData, parentId) {
    const toggleText = switchData.checked
      ? switchData.newToggleTxt?.on || this.newToggleTxt.on
      : switchData.newToggleTxt?.off || this.newToggleTxt.off;

    const showToggleText =
      switchData.toggleTxt !== undefined
        ? switchData.toggleTxt
        : this.toggleTxt; // Determine if toggle text should be shown

    const switchId = this.switches
      ? `${parentId}_option_${switchData.id}`
      : parentId;
    const validationMessageId = `${switchId}_validation_msg`;

    return html`
      <div
        class="custom-control custom-switch${switchData.size
          ? ` custom-control-${switchData.size}`
          : ""}${this.inline ? " custom-control-inline" : ""}"
      >
        <input
          type="checkbox"
          class="custom-control-input"
          id="${switchId}"
          @focus="${this.handleFocus}"
          @blur="${this.handleBlur}"
          aria-checked="${switchData.checked}"
          ?checked="${switchData.checked}"
          aria-disabled="${this.disabled || switchData.disabled}"
          ?disabled="${this.disabled || switchData.disabled}"
          ?required="${this.required || switchData.required}"
          @change="${() => this.toggleChecked(switchData.id)}"
          value="${ifDefined(switchData.value ? switchData.value : undefined)}"
          role="switch"
          aria-labelledby="${ifDefined(
            switchData.label ? switchId + "_label" : undefined
          )}"
          aria-describedby="${ifDefined(
            switchData.validation && !switchData.checked
              ? validationMessageId
              : undefined
          )}"
        />
        <label
          class="custom-control-label${switchData.validation &&
          !switchData.checked
            ? " invalid"
            : ""}"
          id="${switchId}_label"
          for="${switchId}"
        >
          ${switchData.label}${showToggleText
            ? html` <span class="toggleTxt-bold">${toggleText}</span>`
            : ""}${switchData.required
            ? html`<span class="required"></span>`
            : ""}</label
        >
        ${switchData.validation && !switchData.checked
          ? html`<div class="invalid-feedback">
              ${switchData.validationMessage}
            </div>`
          : ""}
      </div>
    `;
  }

  render() {
    const parentId = this.inputId + "_PLMG";

    const isFocused = this.switchesArray.some(
      (switchData) =>
        this.focusedSwitchId === `${parentId}_option_${switchData.id}`
    );

    if (this.switches && this.switchesArray.length > 0) {
      return html` <div
        class="form-group${this.formLayout === "inline"
          ? " form-toggle-inline"
          : ""}${this.noPadFormGroup ? " no-pad" : ""}"
      >
        <div
          role="group"
          tabindex="-1"
          class="no-focus-ring${isFocused ? " keyboard-focused" : ""}"
          id="${parentId}"
        >
          ${this.switchesArray.map((switchData) =>
            this.renderSwitch(switchData, parentId)
          )}
        </div>
      </div>`;
    } else {
      const singleSwitchFocused = this.focusedSwitchId === parentId;
      return html` <div
        class="form-group${this.formLayout === "inline"
          ? " form-toggle-inline"
          : ""}${this.noPadFormGroup ? " no-pad" : ""}"
      >
        <div class="${singleSwitchFocused ? "keyboard-focused" : ""}">
          ${this.renderSwitch(
            {
              id: this.inputId,
              checked: this.checked,
              label: this.labelTxt,
              disabled: this.disabled,
              required: this.required,
              size: this.size,
              validation: this.validation,
              validationMessage: this.validationMessage,
              toggleTxt: this.toggleTxt,
            },
            parentId
          )}
        </div>
      </div>`;
    }
  }

  clearSelections() {
    this.checked = false;
    if (this.switches) {
      this.switchesArray.forEach((switchItem) => {
        switchItem.checked = false;
        const inputElement = this.shadowRoot.querySelector(
          `#${this.inputId}_option_${switchItem.id}`
        );
        if (inputElement) {
          inputElement.checked = false;
        }
      });
    } else {
      const inputElement = this.shadowRoot.querySelector('input[type="checkbox"]');
      if (inputElement) {
        inputElement.checked = false;
      }
    }
    console.log('Clearing selections in toggle-switch', this);
    this.requestUpdate();
  }
}

customElements.define("toggle-switch", ToggleSwitch);
