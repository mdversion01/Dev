import { LitElement, html, css } from "lit";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { popoverStyles } from "./popover-styles.js";

class PopoverComponent extends LitElement {
  static properties = {
    arrowOff: { type: Boolean },
    customClass: { type: String },
    title: { type: String },
    content: { type: String },
    placement: { type: String },
    plumage: { type: Boolean },
    variant: { type: String },
    visible: { type: Boolean },
    super: { type: Boolean },
    trigger: { type: String },
    fallbackPlacement: { type: String },
    offset: { type: Number },
    yOffset: { type: Number },
    target: { type: Object },
  };

  constructor() {
    super();
    this.arrowOff = false;
    this.customClass = "";
    this.title = "";
    this.content =
      "And here's some amazing content. It's very engaging. Right?";
    this.placement = "auto";
    this.plumage = false;
    this.variant = "";
    this.visible = false;
    this.trigger = "click";
    this.fallbackPlacement = "flip";
    this.offset = 0;
    this.yOffset = 0;
    this.super = false;
    this.target = null;
    this.popoverId = `popover_${Math.random().toString(36).substr(2, 9)}`;
    this.popoverElement = null;
    this.triggerElement = null;
    this.originatingTrigger = null; // Track the originating trigger
  }

  static styles = css``;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("slotchange", this.handleSlotChange.bind(this));

    if (!document.getElementById("popover-styles")) {
      const style = document.createElement("style");
      style.id = "popover-styles";
      style.innerHTML = popoverStyles.toString();
      document.head.appendChild(style);
    }

    window.addEventListener("resize", this.adjustPopoverPosition.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("slotchange", this.handleSlotChange.bind(this));
    this.removePopover();
    document.removeEventListener(
      "click",
      this.handleOutsideClick.bind(this),
      true
    );
    window.removeEventListener("resize", this.adjustPopoverPosition.bind(this));
  }

  firstUpdated() {
    this.setTriggerElement();
    if (this.triggerElement) {
      this.applyTriggers();
    } else {
      console.error("Trigger element not found");
    }
  }

  handleSlotChange() {
    this.setTriggerElement();
    if (this.triggerElement) {
      this.applyTriggers();
    } else {
      console.error("Trigger element not found");
    }
  }

  getColor(variant) {
    switch (variant) {
      case "primary":
        return "primary";
      case "secondary":
        return "secondary";
      case "success":
        return "success";
      case "danger":
        return "danger";
      case "info":
        return "info";
      case "warning":
        return "warning";
      case "dark":
        return "dark";
      default:
        return ""; // Default color if no variant or unrecognized variant
    }
  }

  setTriggerElement() {
    if (this.target) {
      if (typeof this.target === "string") {
        this.triggerElement = document.getElementById(this.target);
      } else if (this.target instanceof HTMLElement) {
        this.triggerElement = this.target;
      }
    } else {
      const slot = this.shadowRoot.querySelector("slot");
      if (slot) {
        const assignedElements = slot.assignedElements();
        if (assignedElements.length > 0) {
          this.triggerElement = assignedElements[0];
        }
      }
    }

    if (this.triggerElement) {
      const originalTitle = this.getAttribute("data-original-title");
      if (originalTitle) {
        this.title = originalTitle;
      }
    }

    if (!this.triggerElement.hasAttribute("tabindex")) {
      this.triggerElement.setAttribute("tabindex", "0");
    }

    this.triggerElement.setAttribute("aria-describedby", this.popoverId);
  }

  applyTriggers() {
    const triggers = this.trigger.split(" ");

    if (triggers.includes("click")) {
      this.triggerElement.addEventListener(
        "click",
        this.handleTriggerClick.bind(this)
      );
      this.triggerElement.addEventListener(
        "keydown",
        this.handleTriggerKeydown.bind(this)
      );
    }
    if (triggers.includes("hover")) {
      this.triggerElement.addEventListener(
        "mouseenter",
        this.showPopover.bind(this)
      );
      this.triggerElement.addEventListener(
        "mouseleave",
        this.hidePopover.bind(this)
      );
    }
    if (triggers.includes("focus")) {
      this.triggerElement.addEventListener(
        "focus",
        this.showPopover.bind(this)
      );
      this.triggerElement.addEventListener("blur", this.handleBlur.bind(this));
    }

    // Ensure hover and focus trigger properly handle keyboard navigation
    if (triggers.includes("hover") || triggers.includes("focus")) {
      this.triggerElement.addEventListener("focus", this.showPopover.bind(this));
      this.triggerElement.addEventListener("focusout", this.handleFocusOut.bind(this));
    }
  }

  handleTriggerClick(event) {
    event.preventDefault(); // Prevent default action to avoid scrolling
    this.originatingTrigger = event.currentTarget; // Track the originating trigger
    this.togglePopover();
    if (this.visible) {
      this.popoverElement.focus({ preventScroll: true });
    }
  }

  handleTriggerKeydown(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default action to avoid scrolling
      this.originatingTrigger = event.currentTarget; // Track the originating trigger
      this.togglePopover();
      if (this.visible) {
        this.popoverElement.focus({ preventScroll: true });
      }
    }
  }

  handleOutsideClick(event) {
    if (
      this.visible &&
      this.popoverElement &&
      !this.popoverElement.contains(event.target) &&
      !this.triggerElement.contains(event.target)
    ) {
      this.hidePopover();
    }
  }

  handleBlur() {
    document.addEventListener(
      "click",
      this.handleOutsideClick.bind(this),
      true
    );
  }

  handleFocusOut(event) {
    if (!this.triggerElement.contains(event.relatedTarget)) {
      this.hidePopover();
    }
  }

  togglePopover() {
    this.visible = !this.visible;
    if (this.visible) {
      this.showPopover();
    } else {
      this.hidePopover();
    }
  }

  showPopover() {
    this.visible = true;
    this.createPopoverElement();
    requestAnimationFrame(() => {
      this.adjustPopoverPosition();
      if (this.trigger === "click") {
        this.popoverElement.focus({ preventScroll: true });
      }
    });

    if (this.trigger.includes("hover") || this.trigger.includes("focus")) {
      // Remove tabindex attributes if the trigger is hover or focus
      this.popoverElement.querySelectorAll("[tabindex]").forEach((el) => {
        el.removeAttribute("tabindex");
      });
    } else {
      this.popoverElement.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    document.addEventListener(
      "click",
      this.handleOutsideClick.bind(this),
      true
    );
  }

  hidePopover() {
    this.visible = false;
    this.removePopover();
    document.removeEventListener(
      "click",
      this.handleOutsideClick.bind(this),
      true
    );
    if (this.originatingTrigger) {
      this.originatingTrigger.focus({ preventScroll: true });
    }
  }

  handleKeyDown(event) {
    if (event.key === "Tab" && this.visible) {
      const focusableElements = this.popoverElement.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          if (this.originatingTrigger) {
            this.originatingTrigger.focus({ preventScroll: true });
          }
          this.hidePopover();
        }
      }
    }

    // Close popover on Escape key
    if (event.key === "Escape") {
      this.hidePopover();
    }
  }

  getPopoverContent() {
    return this.title;
  }

  createPopoverElement() {
    if (!this.popoverElement) {
      this.popoverElement = document.createElement("div");
      this.popoverElement.id = this.popoverId;
      this.popoverElement.classList.add(
        "popover",
        `popover-${this.placement}`,
        "fade",
        "show"
      );
      if (this.plumage) {
        this.popoverElement.classList.add("plumage");
      }
      if (this.super) {
        this.popoverElement.classList.add("super-tooltip");
      }
      this.popoverElement.setAttribute("role", "tooltip");
      this.popoverElement.setAttribute(
        "data-popover-placement",
        this.placement
      );
      if (!(this.trigger.includes("hover") || this.trigger.includes("focus"))) {
        this.popoverElement.setAttribute("tabindex", "-1");
      }
      let arrowHtml = this.arrowOff ? "" : '<div class="popover-arrow"></div>';
      let headerHtml = this.title
        ? `<h3 class="popover-header">${this.getPopoverContent()}</h3>`
        : "";
      this.popoverElement.innerHTML = `
        ${arrowHtml}
        ${headerHtml}
        <div class="popover-body" ${!(this.trigger.includes("hover") || this.trigger.includes("focus")) ? 'tabindex="0"' : ''}>${this.content}</div>
      `;
      document.body.appendChild(this.popoverElement);
    }
  }

  removePopover() {
    if (this.popoverElement) {
      this.popoverElement.removeEventListener("keydown", this.handleKeyDown.bind(this));
      document.body.removeChild(this.popoverElement);
      this.popoverElement = null;
    }
  }

  adjustPopoverPosition() {
    if (!this.triggerElement || !this.popoverElement || !this.visible) {
      return;
    }

    const triggerRect = this.triggerElement.getBoundingClientRect();
    const popoverRect = this.popoverElement.getBoundingClientRect();
    const popoverArrow = this.popoverElement.querySelector(".popover-arrow");
    const baseOffset = 10 + this.offset;

    let top, left;

    const calculatePosition = (placement) => {
      const placementClasses = {
        top: "popover-top",
        bottom: "popover-bottom",
        left: "popover-left",
        right: "popover-right",
        topright: "popover-topright",
        topleft: "popover-topleft",
        bottomright: "popover-bottomright",
        bottomleft: "popover-bottomleft",
        lefttop: "popover-lefttop",
        leftbottom: "popover-leftbottom",
        righttop: "popover-righttop",
        rightbottom: "popover-rightbottom",
      };

      const variantClass = this.getColor(this.variant);

      this.popoverElement.className = `popover fade show ${
        placementClasses[placement]
      }${this.plumage ? " plumage" : ""}${this.super ? " super-tooltip" : ""}${
        variantClass ? ` ${variantClass}` : ""
      }${this.customClass ? ` ${this.customClass}` : ""}`;

      switch (placement) {
        case "top":
          top = triggerRect.top - popoverRect.height - baseOffset;
          left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
          if (!this.arrowOff) popoverArrow.className = "popover-arrow top";
          break;
        case "bottom":
          top = triggerRect.bottom + baseOffset;
          left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
          if (!this.arrowOff) popoverArrow.className = "popover-arrow bottom";
          break;
        case "left":
          top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
          left = triggerRect.left - popoverRect.width - baseOffset;
          if (!this.arrowOff) popoverArrow.className = "popover-arrow left";
          break;
        case "right":
          top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
          left = triggerRect.right + baseOffset;
          if (!this.arrowOff) popoverArrow.className = "popover-arrow right";
          break;
        case "topright":
          top = triggerRect.top - popoverRect.height - baseOffset;
          left = triggerRect.left - popoverRect.width + triggerRect.width;
          if (!this.arrowOff) popoverArrow.className = "popover-arrow topright";
          break;
        case "topleft":
          top = triggerRect.top - popoverRect.height - baseOffset;
          left = triggerRect.left;
          if (!this.arrowOff) popoverArrow.className = "popover-arrow topleft";
          break;
        case "bottomright":
          top = triggerRect.bottom + baseOffset;
          left = triggerRect.left - popoverRect.width + triggerRect.width;
          if (!this.arrowOff)
            popoverArrow.className = "popover-arrow bottomright";
          break;
        case "bottomleft":
          top = triggerRect.bottom + baseOffset;
          left = triggerRect.left;
          if (!this.arrowOff)
            popoverArrow.className = "popover-arrow bottomleft";
          break;
        case "lefttop":
          top = triggerRect.bottom - popoverRect.height + this.yOffset;
          left = triggerRect.left - popoverRect.width - baseOffset;
          if (!this.arrowOff) popoverArrow.className = "popover-arrow lefttop";
          break;
        case "leftbottom":
          top = triggerRect.top + this.yOffset;
          left = triggerRect.left - popoverRect.width - baseOffset;
          if (!this.arrowOff)
            popoverArrow.className = "popover-arrow leftbottom";
          break;
        case "righttop":
          top = triggerRect.bottom - popoverRect.height + this.yOffset;
          left = triggerRect.right + baseOffset;
          if (!this.arrowOff) popoverArrow.className = "popover-arrow righttop";
          break;
        case "rightbottom":
          top = triggerRect.top + this.yOffset;
          left = triggerRect.right + baseOffset;
          if (!this.arrowOff)
            popoverArrow.className = "popover-arrow rightbottom";
          break;
        default: // auto
          top = triggerRect.bottom + baseOffset;
          left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
          if (!this.arrowOff) popoverArrow.className = "popover-arrow bottom";
          break;
      }
      this.popoverElement.setAttribute("data-popover-placement", placement);
    };

    const isInViewport = (top, left, popoverRect) => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      return (
        top >= 0 &&
        left >= 0 &&
        top + popoverRect.height <= viewportHeight &&
        left + popoverRect.width <= viewportWidth
      );
    };

    calculatePosition(this.placement);
    if (!isInViewport(top, left, popoverRect)) {
      const fallbackPlacements = Array.isArray(this.fallbackPlacement)
        ? this.fallbackPlacement
        : [this.fallbackPlacement];

      for (const fallback of fallbackPlacements) {
        if (fallback === "flip") {
          const oppositePlacement = {
            top: "bottom",
            bottom: "top",
            left: "right",
            right: "left",
            topleft: "bottomleft",
            topright: "bottomright",
            bottomleft: "topleft",
            bottomright: "topright",
            lefttop: "righttop",
            leftbottom: "rightbottom",
            righttop: "lefttop",
            rightbottom: "leftbottom",
          }[this.placement];

          calculatePosition(oppositePlacement);
          if (isInViewport(top, left, popoverRect)) {
            break;
          }
        } else if (
          fallback === "clockwise" ||
          fallback === "counterclockwise"
        ) {
          const placements = [
            "top",
            "topright",
            "righttop",
            "right",
            "rightbottom",
            "bottomright",
            "bottom",
            "bottomleft",
            "leftbottom",
            "left",
            "lefttop",
            "topleft",
          ];
          const startIndex = placements.indexOf(this.placement);
          const direction = fallback === "clockwise" ? 1 : -1;

          for (let i = 1; i < placements.length; i++) {
            const nextPlacement =
              placements[
                (startIndex + i * direction + placements.length) %
                  placements.length
              ];
            calculatePosition(nextPlacement);
            if (isInViewport(top, left, popoverRect)) {
              break;
            }
          }
        } else {
          calculatePosition(fallback);
          if (isInViewport(top, left, popoverRect)) {
            break;
          }
        }
      }
    }

    this.popoverElement.style.top = `${top + window.scrollY}px`;
    this.popoverElement.style.left = `${left + window.scrollX}px`;
  }

  render() {
    return html` <slot></slot> `;
  }
}

customElements.define("popover-component", PopoverComponent);
