import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "../button/button.js";
import "../icon/icon.js";
import { collapseStyles } from "./collapse-styles.js";
import Fontawesome from "lit-fontawesome";

class Collapse extends LitElement {
  static styles = [collapseStyles, Fontawesome, css``];

  static get properties() {
    return {
      targetId: { type: String },
      isOpen: { type: Boolean },
      buttonText: { type: String },
      isTransitioning: { type: Boolean },
      targetHeight: { type: Number },
      collapseButton: { type: Boolean },
      accordion: { type: Boolean },
      contentTxtSize: { type: String },
      // For button component
      classNames: { type: String },
      outlined: { type: Boolean },
      block: { type: Boolean },
      variant: { type: String },
      size: { type: String },
      disabled: { type: Boolean },
      ripple: { type: Boolean },
      link: { type: Boolean },
      icon: {
        type: String,
        converter: {
          fromAttribute: (value, type) => {
            // Convert the comma-separated string to an array
            return value.split(",").map((item) => item.trim());
          },
          toAttribute: (value, type) => {
            // Convert the array back to a comma-separated string
            return value.join(", ");
          },
        },
      },
    };
  }

constructor() {
    super();
    const { 
            targetId = "",
            isOpen = false,
            isTransitioning = false,
            buttonText = "Toggle",
            targetHeight = 0,
            collapseButton = false,
            accordion = false,
            classAttribute = "",
            contentTxtSize = "",
            // For button component
            classNames = "",
            outlined = false,
            block = false,
            variant = "",
            size = "",
            disabled = false,
            ripple = false,
            link = false,
            icon = ["fas fa-angle-down"]
        } = this;

     Object.assign(this, {
            targetId,
            isOpen,
            isTransitioning,
            buttonText,
            targetHeight,
            collapseButton,
            accordion,
            classAttribute,
            contentTxtSize,
            // For button component
            classNames,
            outlined,
            block,
            variant,
            size,
            disabled,
            ripple,
            icon,
            link
     });
}

async toggleCollapse(event) {
  if (!this.targetId) {
    console.error("No target ID provided");
    return;
  }
  this.targetId = event.currentTarget.dataset.target;
  const target = this.shadowRoot.querySelector(`#${this.targetId}`);
  if (!target) return;

  this.isTransitioning = true;
  this.isOpen = !this.isOpen;

  if (this.isOpen) {
      this.targetHeight = target.scrollHeight;
  }

  setTimeout(() => {
      this.isTransitioning = false;
      this.requestUpdate();
  }, 350); // Adjust this value to match the transition duration
}

  updateClassAttribute() {
    this.classAttribute = this.classNames ? ` ${this.classNames}` : "";
    this.classAttribute += this.outlined ? " pl-btn--outlined" : "";
    this.classAttribute += this.block ? " pl-btn--block" : "";
    this.classAttribute += this.variant ? ` ${this.variant}` : "";
    this.classAttribute += this.size ? ` ${this.size}` : "";
  }

  textSizing() {
    switch (this.contentTxtSize) {
      case "lg":
        return "text-large";
      case "default":
        return "text-default";
      case "sm":
        return "text-small";
      case "xs":
        return "text-xsmall";
      case "xl":
        return "text-xlarge";
      case "xxl":
        return "text-xxlarge";
      default:
        return "";
    }
  }

  renderToggleButton() {
    this.updateClassAttribute();
    return html`
      <pl-button
        @custom-click="${this.toggleCollapse}"
        aria-expanded=${this.isOpen}
        aria-controls="${this.targetId}"
        class="${this.isOpen ? "collapsed" : ""} ${this.classAttribute}"
        data-toggle="collapse"
        data-target="${this.targetId}"
        variant="${this.variant}"
        size="${this.size}"
        .styles=${[
          css`
            overflow-anchor: none;
          `,
        ]}
        ?disabled="${this.disabled}"
        ?outlined="${this.outlined}"
        ?ripple="${this.ripple}"
        ?block="${this.block}"
        .isOpen="${this.isOpen}"
        .targetId="${this.targetId}"
      >
        <slot name="button-text"></slot>
      </pl-button>
    `;
  }

  renderToggleLink() {
    return html`
      <pl-button
        link
        aria-controls="${this.targetId}"
        data-toggle="collapse"
        data-target="${this.targetId}"
        @custom-click="${this.toggleCollapse}"
        .isOpen="${this.isOpen}"
        .targetId="${this.targetId}"
        url="#${this.targetId}"
      >
        <slot name="button-text"></slot>
      </pl-button>
    `;
  };

  renderAccordionButton() {
    this.updateClassAttribute();
    const displayIcon = this.icon.length === 1 ? this.icon[0] : this.icon[this.isOpen ? 0 : 1];
    return html`
      <pl-button
        @custom-click="${this.toggleCollapse}"
        aria-expanded=${this.isOpen}
        aria-controls="${this.targetId}"
        class="${this.isOpen ? "collapsed" : ""} ${this.classAttribute}"
        data-toggle="collapse"
        data-target="${this.targetId}"
        variant="${this.variant}"
        size="${this.size}"
        .styles=${[
          css`
            overflow-anchor: none;
          `,
        ]}
        ?disabled="${this.disabled}"
        ?outlined="${this.outlined}"
        .block="${this.block}"
        .isOpen="${this.isOpen}"
        .targetId="${this.targetId}"
        ?accordion-btn="${this.accordion}"
      >
        <slot name="expansion-header"></slot>
        <div class=${this.isOpen ? "rotate-down" : "rotate-up"}>
          <icon-component icon="${displayIcon}"></icon-component>
        </div>
      </pl-button>
    `;
  }

  renderAccordionExpansionCard() {
    return html` 
        <div class="expansion-card">
            ${this.renderAccordionButton()} ${this.renderExapnsionContentArea()}
        </div>
    `;
  }

  renderExapnsionContentArea() {
    return html`
      <div
        id="${this.targetId}"
        class=${this.isOpen
          ? "collapse show"
          : this.isTransitioning
          ? "collapse collapsing"
          : "collapse"}
        style=${this.isTransitioning ? `height: ${this.targetHeight}px;` : ""}
      >
        <div
          class="${this.accordion ? "expansion-body" : "expansion-card expansion-body"} ${this.contentTxtSize ? this.textSizing() : ""}"
        >
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }

  render() {
    if (this.accordion) {
      return html` <div class="accordion">
        ${this.renderAccordionExpansionCard()}
      </div>`;
    } else if (this.link) {
      return html` <div class="expansion-wrapper">
        ${this.renderToggleLink()} ${this.renderExapnsionContentArea()}
      </div>`;
    } else {
      return html` <div class="expansion-wrapper">
        ${this.renderToggleButton()} ${this.renderExapnsionContentArea()}
      </div>`;
    }
  }

  _getClassNames() {
    const excludedProperties = [
      "targetId",
      "isOpen",
      "buttonText",
      "isTransitioning",
      "targetHeight",
      "classNames",
      "outlined",
      "block",
      "variant",
      "size",
      "disabled",
      "ripple",
      "icon",
      "accordion",
      "contentTxtSize",
      // Add other property names to be excluded from the class here
    ];

    return Array.from(this.attributes)
      .map((attr) => attr.name)
      .filter((name) => !excludedProperties.includes(name))
      .join(" ");
  }
}

customElements.define("collapse-component", Collapse);
