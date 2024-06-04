import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { tooltipStyles } from './tooltip-styles.js';

class TooltipComponent extends LitElement {
  
  static properties = {
    message: { type: String },
    position: { type: String },
    visible: { type: Boolean },
    htmlContent: { type: Boolean },
    title: { type: [String, Function] },
    trigger: { type: String },
    animation: { type: Boolean },
    container: { type: String },
    customClass: { type: [String, Function] },
    variant: { type: String },
  };

  constructor() {
    super();
    this.message = ''; // default message if title attribute is not present
    this.position = 'top'; // default position
    this.visible = false;
    this.htmlContent = false;
    this.trigger = 'hover focus';
    this.animation = true; // default animation state
    this.container = null; // default container
    this.customClass = ''; // default custom class
    this.variant = ''; // default variant
    this.tooltipId = `tooltip_${Math.random().toString(36).substr(2, 9)}`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.position = this.getAttribute('data-placement') || this.position;
    this.htmlContent = this.hasAttribute('data-html');
    this.title = this.getAttribute('title') || this.getAttribute('data-original-title') || this.message;
    this.trigger = this.getAttribute('data-trigger') || this.trigger;
    this.animation = this.hasAttribute('data-animation')
      ? this.getAttribute('data-animation') !== 'false'
      : true;
    this.container = this.getAttribute('data-container') || this.container;
    this.customClass = this.getAttribute('data-custom-class') || this.customClass;
    this.variant = this.getAttribute('data-variant') || this.variant;
    window.addEventListener('scroll', this.handleScroll, true);

    // Inject tooltip styles into the document head
    if (!document.getElementById('tooltip-styles')) {
      const style = document.createElement('style');
      style.id = 'tooltip-styles';
      style.innerHTML = tooltipStyles.toString();
      document.head.appendChild(style);
    }
  }

  firstUpdated() {
    this.applyTriggers();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this.handleScroll, true);
    this.removeTooltipElement();
  }

  getColor(variant) {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'secondary';
      case 'success':
        return 'success';
      case 'danger':
        return 'danger';
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      case 'dark':
        return 'dark';
      default:
        return ''; // Default color if no variant or unrecognized variant
    }
  }

  applyTriggers() {
    const triggers = this.trigger.split(' ');
    const slotElement = this.shadowRoot.querySelector('slot');

    const addEventListeners = (assignedElements) => {
      if (assignedElements.length > 0) {
        const triggerElement = assignedElements[0];
        triggerElement.setAttribute('tabindex', '0'); // Make the element focusable
        triggerElement.setAttribute('data-toggle', 'tooltip');
        triggerElement.setAttribute('data-placement', this.position);
        triggerElement.setAttribute('aria-describedby', this.tooltipId);

        if (triggers.includes('click')) {
          triggerElement.addEventListener('click', this.showTooltip.bind(this));
          document.addEventListener('click', this.handleOutsideClick.bind(this), true);
        }
        if (triggers.includes('hover')) {
          triggerElement.addEventListener('mouseenter', this.showTooltip.bind(this));
          triggerElement.addEventListener('mouseleave', this.hideTooltip.bind(this));
        }
        if (triggers.includes('focus')) {
          triggerElement.addEventListener('focus', this.showTooltip.bind(this));
          triggerElement.addEventListener('blur', this.hideTooltip.bind(this));
        }
      }
    };

    // Initial check for assigned elements
    const assignedElements = slotElement.assignedElements();
    addEventListeners(assignedElements);

    // Add event listener for future slot changes
    slotElement.addEventListener('slotchange', () => {
      const assignedElements = slotElement.assignedElements();
      addEventListeners(assignedElements);
    });
  }

  handleScroll = () => {
    if (this.trigger.includes('click') && this.visible) {
      this.hideTooltip();
    }
  };

  handleOutsideClick(event) {
    const triggerElement = this.shadowRoot.querySelector('slot').assignedElements()[0];
    if (this.visible && !this.tooltipElement.contains(event.target) && !triggerElement.contains(event.target)) {
      this.hideTooltip();
    }
  }

  showTooltip(event) {
    if (this.trigger.includes('manual')) return;
    // Only show the tooltip if the event is the trigger element itself
    if (event && event.target !== this.shadowRoot.querySelector('slot').assignedElements()[0]) return;
    this.visible = true;
    this.createTooltipElement();
    requestAnimationFrame(() => {
      this.adjustTooltipPosition();
    });
  }

  hideTooltip() {
    if (this.trigger.includes('manual')) return;
    this.visible = false;
    this.removeTooltipElement();
  }

  createTooltipElement() {
    if (!this.tooltipElement) {
      const triggerElement = this.shadowRoot.querySelector('slot').assignedElements()[0];

      this.tooltipElement = document.createElement('div');
      this.tooltipElement.id = this.tooltipId;
      this.tooltipElement.classList.add('tooltip', `tooltip-${this.position}`, 'fade', 'show');
      if (this.animation) {
        this.tooltipElement.classList.add('animated');
      }
      if (this.customClass) {
        const customClasses = typeof this.customClass === 'function' ? this.customClass.call(this) : this.customClass;
        customClasses.split(' ').forEach(cls => this.tooltipElement.classList.add(cls));
      }
      if (this.variant) {
        const variantClass = this.getColor(this.variant);
        if (variantClass) {
          this.tooltipElement.classList.add(variantClass);
        }
      }
      this.tooltipElement.setAttribute('role', 'tooltip');
      this.tooltipElement.setAttribute('aria-live', 'assertive');
      this.tooltipElement.innerHTML = `
        <div class="tooltip-arrow ${this.getColor(this.variant)} ${this.customClass}"></div>
        <div class="tooltip-inner ${this.getColor(this.variant)} ${this.customClass}" id="${this.tooltipId}-content">${this.getTooltipContent()}</div>
      `;
      document.body.appendChild(this.tooltipElement);
    }
  }

  removeTooltipElement() {
    if (this.tooltipElement) {
      document.body.removeChild(this.tooltipElement);
      this.tooltipElement = null;
    }
  }

  adjustTooltipPosition() {
    const triggerElement = this.shadowRoot.querySelector('slot').assignedElements()[0];
    if (!triggerElement || !this.tooltipElement) return;

    const triggerRect = triggerElement.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();

    const offset = 10;
    let top, left;

    const spaceAbove = triggerRect.top;
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceLeft = triggerRect.left;
    const spaceRight = window.innerWidth - triggerRect.right;

    let position = this.position;

    if (position === 'auto') {
      const maxSpace = Math.max(spaceAbove, spaceBelow, spaceLeft, spaceRight);

      switch (maxSpace) {
        case spaceAbove:
          position = 'top';
          break;
        case spaceBelow:
          position = 'bottom';
          break;
        case spaceLeft:
          position = 'left';
          break;
        case spaceRight:
          position = 'right';
          break;
      }
    }

    switch (position) {
      case 'top':
        if (tooltipRect.height + offset > spaceAbove && spaceBelow > spaceAbove) {
          position = 'bottom';
        }
        break;
      case 'bottom':
        if (tooltipRect.height + offset > spaceBelow && spaceAbove > spaceBelow) {
          position = 'top';
        }
        break;
      case 'left':
        if (tooltipRect.width + offset > spaceLeft && spaceRight > spaceLeft) {
          position = 'right';
        }
        break;
      case 'right':
        if (tooltipRect.width + offset > spaceRight && spaceLeft > spaceRight) {
          position = 'left';
        }
        break;
    }

    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - offset;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + offset;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'left':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.left - tooltipRect.width - offset;
        break;
      case 'right':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.right + offset;
        break;
    }

    this.tooltipElement.style.top = `${top + window.scrollY}px`;
    this.tooltipElement.style.left = `${left + window.scrollX}px`;
    this.tooltipElement.classList.remove('tooltip-top', 'tooltip-bottom', 'tooltip-left', 'tooltip-right');
    this.tooltipElement.classList.add(`tooltip-${position}`);
  }

  getTooltipContent() {
    const triggerElement = this.shadowRoot.querySelector('slot').assignedElements()[0];
    const content = triggerElement.getAttribute('data-original-title') || this.title;
    return this.htmlContent ? unsafeHTML(content) : content;
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('tooltip-component', TooltipComponent);
