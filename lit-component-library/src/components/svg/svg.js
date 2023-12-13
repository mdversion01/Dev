import { LitElement, html } from "lit";

class Svg extends LitElement {
  static get properties() {
    return {
      fill: { type: String },
      width: { type: Number },
      height: { type: Number },
      ariaHidden: { type: Boolean },
      ariaLabel: { type: String },
      svgMargin: { type: String },
    };
  }

  constructor() {
    super();
    this.fill = "currentColor";
    this.width = 0;
    this.height = 0;
    this.ariaHidden = false;
    this.ariaLabel = "";
    this.svgMargin = "";
  }

  updated(changedProperties) {
    if (changedProperties.has("fill")) {
      this._updateFill();
    }
    if (changedProperties.has("width") || changedProperties.has("height")) {
      this._updateDimensions();
    }
    if (changedProperties.has("ariaHidden") || changedProperties.has("ariaLabel")) {
      this._updateAria();
    }
  }

  _updateFill() {
    const slot = this.shadowRoot.querySelector("slot");
    const nodes = slot.assignedNodes();

    nodes.forEach(node => {
      if (node.nodeName === "svg") {
        node.setAttribute("fill", this.fill);
      }
    });
  }

  _updateDimensions() {
    const slot = this.shadowRoot.querySelector("slot");
    const nodes = slot.assignedNodes();

    nodes.forEach(node => {
      if (node.nodeName === "svg") {
        if (this.width) {
          node.setAttribute("width", this.width);
        }
        if (this.height) {
          node.setAttribute("height", this.height);
        }
      }
    });
  }

  _updateAria() {
    const slot = this.shadowRoot.querySelector("slot");
    const nodes = slot.assignedNodes();

    nodes.forEach(node => {
      if (node.nodeName === "svg") {
        if (this.ariaHidden) {
          node.setAttribute("aria-hidden", this.ariaHidden);
        } else {
          node.removeAttribute("aria-hidden");
        }
        if (this.ariaLabel) {
          node.setAttribute("aria-label", this.ariaLabel);
        } else {
          node.removeAttribute("aria-label");
        }
      }
    });
  }

  firstUpdated() {
    this._wrapSvgWithSpan();
  }

  _wrapSvgWithSpan() {
    const slot = this.shadowRoot.querySelector('slot');
    slot.addEventListener('slotchange', () => {
      const assignedNodes = slot.assignedNodes();
      const svg = Array.from(assignedNodes).find(node => node.tagName === 'svg');
      if (svg && (this.svgMargin === 'left' || this.svgMargin === 'right')) {
        const span = document.createElement('span');
        span.classList.add(this.svgMargin === 'left' ? 'mr-1' : 'ml-1');
        svg.parentNode.insertBefore(span, svg);
        span.appendChild(svg);
      }
    });
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define("svg-component", Svg);
