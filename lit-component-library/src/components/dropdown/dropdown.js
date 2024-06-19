import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { layoutStyles } from "../layout-styles.js";
import { formStyles } from "../form-styles.js";
import { buttonStyles } from "../button/button-styles.js";
import { dropdownStyles } from "./dropdown-styles.js";
import {
  constructClassAttribute,
  getButtonTypeClass,
  getButtonShape,
} from "../utilities/sharedButtonUtils.js";
// import Popper from "popper.js";
import { createPopper } from "@popperjs/core";
import "../icon/icon.js";

function generateUUID() {
  return "xx-4x-yx-yy".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

class Dropdown extends LitElement {
  static styles = [
    layoutStyles,
    buttonStyles,
    dropdownStyles,
    formStyles,
    css``,
  ];

  static get properties() {
    return {
      alignMenuRight: { type: Boolean },
      block: { type: Boolean },
      buttonText: { type: String },
      disabled: { type: Boolean },
      dotsIcon: { type: Boolean },
      gearIcon: { type: Boolean },
      id: { type: String },
      items: { type: Array },
      iconDropDown: { type: Boolean },
      outlined: { type: Boolean },
      pressed: { type: Boolean },
      ripple: { type: Boolean },
      showDropdown: { type: Boolean },
      shape: { type: String },
      size: { type: String },
      styles: { type: String },
      focusedIndex: { type: Number },
      variant: { type: String },
      listType: { type: String }, // Added listType property
      subMenuListType: { type: String }, // Added subMenuListType property
    };
  }

  constructor() {
    super();
    // Initialize default properties
    this.alignMenuRight = false;
    this.block = false;
    this.buttonText = "Dropdown";
    this.disabled = false;
    this.dotsIcon = false;
    this.gearIcon = false;
    this.id = "";
    this.iconDropDown = false;
    this.outlined = false;
    this.pressed = false;
    this.ripple = false;
    this.showDropdown = false;
    this.styles = "";
    this.focusedIndex = -1;
    this.variant = "";
    this.listType = "default"; // Default value for listType
    this.subMenuListType = "default"; // Default value for subMenuListType

    // Bind event handlers
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);

    // Popper instance for dropdown positioning
    this.popper = null;
    this.updatePopper = this.updatePopper.bind(this); // Bind updatePopper here

    this.instanceId = `dropdown-${generateUUID()}`;
  }

  // Lifecycle callbacks
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.handleOutsideClick);
    document.addEventListener("keydown", this.handleKeyPress);
    window.addEventListener("scroll", this.updatePopper, true);
    window.addEventListener("resize", this.updatePopper);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.handleOutsideClick);
    document.removeEventListener("keydown", this.handleKeyPress);
    window.removeEventListener("scroll", this.updatePopper, true);
    window.removeEventListener("resize", this.updatePopper);
  }

  updated(changedProperties) {
    if (changedProperties.has("alignRight") && this.showDropdown) {
      this.createPopper(); // Recreate the Popper with the new alignment
    }
  }

  createPopper() {
    const button = this.shadowRoot.querySelector(`#${this.instanceId}-toggle`);
    const menu = this.shadowRoot.querySelector(`#${this.instanceId}-menu`);

    if (!button || !menu) {
      return;
    }

    // Check if the dropdown-menu-right class is present
    const placement = menu.classList.contains("dropdown-menu-right")
      ? "bottom-end"
      : "bottom-start";

    if (this.popper) {
      this.popper.destroy();
    }

    // Dynamically set the placement based on the class presence
    this.popper = createPopper(button, menu, {
      placement: placement,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 0], // Adjust this offset as needed
          },
        },
        {
          name: "preventOverflow",
          options: {
            boundary: "viewport",
          },
        },
      ],
    });
  }

  updatePopper() {
    if (this.popper) {
      this.popper.update();
    }
  }

  renderBasicDropdown(classAttribute) {
    return html`
      <button
        class="dropdown-toggle ${classAttribute}"
        id="${this.instanceId}-toggle"
        aria-controls="${this.instanceId}-menu"
        aria-label="${this.buttonText}"
        aria-haspopup="true"
        aria-expanded="${this.showDropdown ? "true" : "false"}"
        @click="${(event) => this.toggleDropdown(event)}"
        style="${ifDefined(this.styles ? this.styles : undefined)}"
        ?disabled="${this.disabled}"
        role="button"
      >
        ${this.buttonText}
        <div class="dropdown-caret">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            class="custom-fill-color"
            role="img"
            aria-label="Caret"
          >
            <path
              d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
            />
          </svg>
        </div>
      </button>
    `;
  }

  renderMenuIconDropdown(classAttribute, dotsIcon, gearIcon) {
    return html`
      <button
        class="dropdown-toggle ${classAttribute}${this.iconDropDown
          ? " icon-menu"
          : ""}"
        id="${this.instanceId}-toggle"
        aria-controls="${this.instanceId}-menu"
        aria-label="${this.buttonText}"
        aria-haspopup="true"
        aria-expanded="${this.showDropdown ? "true" : "false"}"
        @click="${(event) => this.toggleDropdown(event)}"
        style="${ifDefined(this.styles ? this.styles : undefined)}"
        ?disabled="${this.disabled}"
        role="button"
      >
        ${this.gearIcon ? gearIcon : dotsIcon}
      </button>
    `;
  }

  isSubmenuOpen(index) {
    if (index && !isNaN(index)) {
      const submenuSelector = `.dropdown-menu.dropdown-submenu-${index}`;
      const submenu = this.shadowRoot.querySelector(submenuSelector);
      return submenu && submenu.classList.contains("show");
    } else {
      return false; // Assume submenu is not open if index is invalid
    }
  }

  attachSubmenuEventListeners() {
    const submenuToggles = this.shadowRoot.querySelectorAll(
      ".dropdown-submenu-toggle"
    );
    submenuToggles.forEach((toggle, index) => {
      const submenu = toggle.nextElementSibling;
      if (submenu) {
        submenu.addEventListener("mouseleave", () => {
          this.handleSubmenuLeave(index);
        });
      }
    });
  }

  showSubmenu(submenuAnchor) {
    const submenu = submenuAnchor.nextElementSibling;

    if (submenu) {
      submenu.classList.add("show");
      submenu.classList.remove("hidden");
      // Recreate Popper for the submenu
      this.createSubmenuPopper(submenuAnchor, submenu);
    }
  }

  renderDropdownMenu(caretRightIcon) {
    return html`
      <div
        class="dropdown-menu${this.showDropdown ? " show" : ""} ${this
          .shape}${this.alignMenuRight ? " dropdown-menu-right" : ""}"
        id="${this.instanceId}-menu"
        aria-labelledby="${this.instanceId}-toggle"
        role="menu"
      >
        ${this.items
          ? this.items.map(
              (item, index) =>
                html`
                  ${item.isDivider
                    ? html`<div class="dropdown-divider"></div>`
                    : item.submenu
                    ? html`
                        <div
                          class="dropdown-submenu dropdown-submenu-${index}"
                          aria-labelledby="submenuToggle-${index}"
                          role="menu"
                          @mouseenter="${() => this.handleSubmenuEnter(index)}"
                          @mouseleave="${() => this.handleSubmenuLeave(index)}"
                        >
                          <a
                            class="dropdown-item ${this
                              .size} dropdown-submenu-toggle dropdown-submenu-${index}"
                            data-index="${index}"
                            role="option"
                            tabindex="${this.showDropdown ? "0" : "-1"}"
                            id="submenuToggle-${index}"
                            aria-haspopup="true"
                            aria-expanded="${this.isSubmenuOpen(index)
                              ? "true"
                              : "false"}"
                          >
                            ${this.alignMenuRight
                              ? html`<div class="caret-right">
                                  ${caretRightIcon}
                                </div>`
                              : ""}
                            ${item.name}
                            ${this.alignMenuRight
                              ? ""
                              : html`<div class="caret-right">
                                  ${caretRightIcon}
                                </div>`}
                          </a>
                          ${this.renderSubmenu(item.submenu, index)}
                        </div>
                      `
                    : this.renderDropdownItem(item, index, this.listType)}
                `
            )
          : html``}
      </div>
    `;
  }

  renderDropdownItem(item, index, type) {
    if (type === "links") {
      return html`
        <a
          class="dropdown-item ${this.size}"
          href="${item.path}"
          @click="${() => this.handleItemClick(index)}"
          role="option"
          tabindex="${this.showDropdown ? "0" : "-1"}"
          @mouseenter="${() => this.handleItemHover(index)}"
        >
          ${item.name}
        </a>
      `;
    } else {
      // Default type, which allows custom HTML
      return html`
        <div
          class="dropdown-item ${this.size}"
          role="option"
          tabindex="${this.showDropdown ? "0" : "-1"}"
          @mouseenter="${() => this.handleItemHover(index)}"
        >
          ${item.content ? item.content : item.name}
        </div>
      `;
    }
  }

  renderSubmenu(submenuItems, parentIndex) {
    return html`
      <div
        class="dropdown-menu sub dropdown-submenu-${parentIndex} hidden ${this
          .alignMenuRight
          ? " dropdown-menu-right"
          : ""}"
        data-index="${parentIndex}"
        role="menu"
        style="${ifDefined(this.styles ? this.styles : undefined)}"
        aria-labelledby="submenuToggle-${parentIndex}"
      >
        ${submenuItems.map(
          (subitem, subIndex) =>
            html`
              ${subitem.isDivider
                ? html`<div class="dropdown-divider"></div>`
                : this.renderDropdownItem(subitem, subIndex, this.subMenuListType)}
            `
        )}
      </div>
    `;
  }

  handleSubmenuEnter(index) {
    this.focusedIndex = index;
    this.updatePopper(); // Update Popper on submenu hover
  }

  handleOutsideClick(event) {
    const isOutsideMainDropdown = !this.contains(event.target);
    const isOutsideSubmenu = !event.target.closest(".dropdown-submenu");

    if (isOutsideMainDropdown && isOutsideSubmenu) {
      this.showDropdown = false;
      this.focusedIndex = -1;
      this.closeAllSubmenus();

      // Destroy Popper when dropdown is closed
      if (this.popper) {
        this.popper.destroy();
        this.popper = null;
      }

      // Destroy Submenu Popper when main dropdown is closed
      if (this.submenuPopper) {
        this.submenuPopper.destroy();
        this.submenuPopper = null;
      }
    }
  }

  // Add this method to handle item hover events
  handleItemHover(index) {
    this.focusedIndex = index;
  }

  // Add these methods to handle submenu hover events
  handleSubmenuEnter(index) {
    this.focusedIndex = index;

    const submenuToggle = this.shadowRoot.querySelector(
      `.dropdown-submenu-${index} .dropdown-submenu-toggle`
    );

    this.showSubmenu(submenuToggle);
  }

  render() {
    this.updatePopper(); // Update Popper on render
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

    const dotsIcon = html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 192 512"
        class="custom-fill-color"
        role="img"
        aria-label="Menu Options"
      >
        <path
          d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"
        />
      </svg>
    `;

    const gearIcon = html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        class="custom-fill-color"
        role="img"
        aria-label="Menu Options"
      >
        <path
          d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4 .6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"
        />
      </svg>
    `;

    const caretRightIcon = html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 192 512"
        class="custom-fill-color"
        role="img"
        aria-label="Menu Options"
      >
        <path
          d="M0 384.7V127.3c0-17.8 21.5-26.7 34.1-14.1l128.7 128.7c7.8 7.8 7.8 20.5 0 28.3L34.1 398.8C21.5 411.4 0 402.5 0 384.7z"
        />
      </svg>
    `;

    return html`
      <div class="dropdown" id="${this.instanceId}">
        ${this.iconDropDown
          ? this.renderMenuIconDropdown(classAttribute, dotsIcon, gearIcon)
          : this.renderBasicDropdown(classAttribute)}
        ${this.renderDropdownMenu(caretRightIcon)}
      </div>
    `;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown) {
      this.focusedIndex = -1;
      this.blurButton();
      this.createPopper(); // Create Popper when dropdown is opened
    } else {
      this.focusedIndex = -1;
    }
  }

  blurButton() {
    const button = this.shadowRoot.querySelector(".dropdown-toggle");
    if (button) {
      button.blur();
    }
  }

  handleKeyPress(event) {
    if (!this.showDropdown) return;

    // Filter only visible items for keyboard navigation
    const items = Array.from(
      this.shadowRoot.querySelectorAll(".dropdown-item:not(.disabled)")
    ).filter((item) => {
      // Check if the item is within a hidden submenu
      const submenu = item.closest(".dropdown-menu.sub.hidden");
      return !submenu; // Only include items not in a hidden submenu
    });

    // let newIndex = this.focusedIndex;
    let newIndex = -1; // Initialize newIndex

    const currentItem = items[this.focusedIndex]; // The currently focused item
    const currentSubmenuIndex = currentItem
      ? this.findSubmenuIndexOf(currentItem)
      : -1; // Index of the submenu containing the current item

    // Handle navigation within submenus specifically
    const openSubmenu = this.shadowRoot.querySelector(
      ".dropdown-menu.sub.show"
    );
    if (openSubmenu) {
      this.navigateSubmenu(event);
    } else {
      // Handle keypress for main menu items
      switch (event.key) {
        case "ArrowDown":
        case "Tab":
          event.preventDefault();
          newIndex = (this.focusedIndex + 1) % items.length;
          if (newIndex === 0 && currentSubmenuIndex !== -1) {
            // Attempting to navigate past the last item in a submenu
            this.closeSubmenu(currentSubmenuIndex); // Close the current submenu
            // Optionally, move focus to the next item after the submenu in the main menu
            newIndex = this.getNextFocusableItemIndexOutsideSubmenu(
              currentSubmenuIndex,
              items
            );
          }
          break;
        case "ArrowUp":
          event.preventDefault();
          newIndex =
            this.focusedIndex - 1 < 0
              ? items.length - 1
              : this.focusedIndex - 1;
          if (newIndex === items.length - 1 && currentSubmenuIndex !== -1) {
            // Attempting to navigate before the first item in a submenu
            this.closeSubmenu(currentSubmenuIndex); // Close the current submenu
            // Optionally, move focus to the previous item before the submenu in the main menu
            newIndex = this.getPreviousFocusableItemIndexOutsideSubmenu(
              currentSubmenuIndex,
              items
            );
          }
          break;
        case "ArrowRight":
          // Allow entering a submenu
          this.handleArrowRight(event);
          break;
        case "Enter":
          // Activate the focused menu item
          if (this.focusedIndex !== -1) {
            this.handleItemClick(this.focusedIndex);
          }
          break;
        case "Escape":
          // Close the dropdown
          this.handleEscape();
          break;
      }
    }

    if (newIndex >= 0 && newIndex < items.length) {
      items[newIndex].focus();
      this.focusedIndex = items.indexOf(items[newIndex]); // Update focusedIndex based on visible items
    }
  }

  navigateSubmenu(event) {
    // Identify the currently active or focused submenu
    const submenu = this.shadowRoot.querySelector(".dropdown-menu.sub.show");
    if (!submenu) return; // Exit if no submenu is currently open

    const items = submenu.querySelectorAll(".dropdown-item:not(.disabled)");
    const currentIndex = Array.from(items).indexOf(
      submenu.querySelector(".dropdown-item:focus")
    );
    let newIndex = currentIndex;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault(); // Prevent page scroll
        newIndex = (currentIndex + 1) % items.length; // Wrap around at the end
        break;
      case "ArrowUp":
        event.preventDefault(); // Prevent page scroll
        newIndex = (currentIndex - 1 + items.length) % items.length; // Wrap around to the end if at the start
        break;
      case "ArrowLeft":
        this.handleArrowLeft();
        break;
      case "Escape":
        // Close the dropdown
        this.handleEscape();
        break;
      default:
        // Handle other keys (e.g., Escape or ArrowLeft for closing submenu) if needed
        return; // Exit the function for keys we're not handling here
    }

    if (newIndex >= 0 && newIndex < items.length) {
      items[newIndex].focus(); // Move focus to the new item
    }
  }

  navigateMainMenu(event, direction) {
    const items = this.shadowRoot.querySelectorAll(
      ".dropdown-item:not(.disabled):not([hidden])"
    );
    let currentIndex = this.focusedIndex;
    let newIndex;

    if (direction === "next") {
      newIndex = currentIndex + 1 < items.length ? currentIndex + 1 : 0;
    } else if (direction === "prev") {
      newIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : items.length - 1;
    }

    // Update focusedIndex and focus the new item
    if (typeof newIndex === "number" && items[newIndex]) {
      this.focusedIndex = newIndex; // Update the focusedIndex to the new index
      items[newIndex].focus(); // Set focus on the new item
    }
  }

  // Additional methods used in handleKeyPress
  handleArrowRight(event) {
    const currentFocus = this.shadowRoot.activeElement;
    if (
      currentFocus &&
      currentFocus.classList.contains("dropdown-submenu-toggle")
    ) {
      event.preventDefault();
      const index = parseInt(currentFocus.dataset.index, 10);
      if (!isNaN(index) && !this.isSubmenuOpen(index)) {
        this.toggleSubmenuVisibilityAndPopper(index, true);
      }
    }
  }

  handleArrowLeft() {
    const submenuTriggers = this.shadowRoot.querySelectorAll(
      ".dropdown-submenu-toggle"
    );
    const activeSubmenu = [...submenuTriggers].find((trigger) =>
      this.isSubmenuOpen(trigger.dataset.index)
    );
    if (activeSubmenu) {
      this.closeSubmenu(activeSubmenu.dataset.index);
      activeSubmenu.focus(); // Focus back to the submenu trigger
    }
  }

  handleEscape() {
    this.showDropdown = false;
    this.closeAllSubmenus();
    this.focusedIndex = -1;
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }

    // Set focus back to the toggle button
    const toggleButton = this.shadowRoot.querySelector(".dropdown-toggle");
    if (toggleButton) {
      toggleButton.focus();
    }
  }

  // Utility method to find the next focusable item index outside the current submenu
  getNextFocusableItemIndexOutsideSubmenu(currentSubmenuIndex, items) {
    // Implement logic to find the next focusable item index in the main menu after exiting a submenu
    // This may involve finding the parent menu item of the current submenu and moving to the next item in the main menu
    // For simplicity, this function returns a valid index or -1 if no such item exists
    return -1; // Placeholder return value
  }

  // Utility method to find the previous focusable item index outside the current submenu
  getPreviousFocusableItemIndexOutsideSubmenu(currentSubmenuIndex, items) {
    // Implement logic similar to getNextFocusableItemIndexOutsideSubmenu for finding the previous item
    return -1; // Placeholder return value
  }

  findSubmenuIndexOf(element) {
    let currentElement = element;
    while (
      currentElement &&
      typeof currentElement.matches === "function" &&
      !currentElement.matches(".dropdown")
    ) {
      if (currentElement.matches(".dropdown-submenu")) {
        return parseInt(currentElement.dataset.index, 10);
      }
      currentElement = currentElement.parentNode;
    }
    return -1; // Element is not in a submenu or not a valid element
  }

  getNextFocusableItemIndex(currentIndex, direction, items) {
    let nextIndex = currentIndex + direction;
    const itemCount = items.length;

    // Loop to find the next focusable item index
    while (nextIndex >= 0 && nextIndex < itemCount) {
      if (
        !items[nextIndex].hasAttribute("disabled") &&
        !items[nextIndex].classList.contains("hidden")
      ) {
        return nextIndex;
      }
      nextIndex += direction;
    }
    // If no focusable item is found, return the current index
    return currentIndex;
  }

  toggleSubmenuVisibilityAndPopper(index, shouldShow) {
    const submenu = this.shadowRoot.querySelector(
      `.dropdown-menu.dropdown-submenu-${index}`
    );
    if (!submenu) return;

    if (shouldShow) {
      submenu.classList.add("show");
      submenu.classList.remove("hidden");
      // Update tabindex for submenu items to make them focusable
      submenu
        .querySelectorAll(".dropdown-item")
        .forEach((item) => item.setAttribute("tabindex", "0"));
      this.createSubmenuPopper(submenu.previousElementSibling, submenu);
    } else {
      submenu.classList.remove("show");
      submenu.classList.add("hidden");
      // Update tabindex for submenu items to make them not focusable
      submenu
        .querySelectorAll(".dropdown-item")
        .forEach((item) => item.setAttribute("tabindex", "-1"));
      if (submenu._popper) {
        submenu._popper.destroy();
        submenu._popper = null;
      }
    }
  }

  createSubmenuPopper(submenuAnchor, submenu) {
    if (submenu._popper) {
      submenu._popper.destroy();
    }

    // Determine the main menu's alignment to decide on the submenu's placement
    const isMainDropdownRightAligned = this.alignMenuRight; // or check the class directly if not using a property

    // Set the placement based on the main dropdown's alignment
    const placement = isMainDropdownRightAligned ? "left-start" : "right-start";
    const submenuOffset = isMainDropdownRightAligned ? [0, 0] : [0, 0];

    submenu._popper = createPopper(submenuAnchor, submenu, {
      placement: placement,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: submenuOffset, // Adjust this offset as needed
          },
        },
        {
          name: "preventOverflow",
          options: {
            boundary: "viewport",
          },
        },
      ],
    });
  }

  toggleSubmenu(open) {
    const submenu = this.shadowRoot.querySelector(
      `.dropdown-submenu-${this.focusedIndex} .dropdown-menu`
    );

    if (submenu) {
      if (open) {
        submenu.classList.add("show");
        submenu.classList.remove("hidden");
        // Recreate Popper for the submenu
        this.createSubmenuPopper(submenu.previousElementSibling, submenu);
      } else {
        submenu.classList.remove("show");
        submenu.classList.add("hidden");
        // Destroy Popper when submenu is closed
        if (this.submenuPopper) {
          this.submenuPopper.destroy();
          this.submenuPopper = null;
        }
      }
    }
  }

  handleSubmenuLeave(index) {
    // Close submenu on leave
    this.closeSubmenu(index);

    // Destroy submenu Popper
    this.destroySubmenuPopper(index);
  }

  destroySubmenuPopper(index) {
    const submenu = this.shadowRoot.querySelector(
      `.dropdown-menu.dropdown-submenu-${index}`
    );
    if (submenu && submenu._popper) {
      submenu._popper.destroy();
      submenu._popper = null;
    }
  }

  // Add this method to close the submenu
  closeSubmenu(submenuIndex) {
    const submenu = this.shadowRoot.querySelector(
      `.dropdown-menu.sub.dropdown-submenu-${submenuIndex}`
    );
    if (submenu && submenu.classList.contains("show")) {
      submenu.classList.remove("show");
      submenu.classList.add("hidden");
      // Reset inline styles that may have been set by Popper.js
      submenu.removeAttribute("style");
      // Destroy Popper for the submenu, if applicable
      if (this.submenuPopper) {
        this.submenuPopper.destroy();
        this.submenuPopper = null;
      }
    }
  }

  closeAllSubmenus() {
    const submenus = this.shadowRoot.querySelectorAll(`.dropdown-menu.sub`);
    submenus.forEach((submenu) => {
      // Remove the 'show' class to hide the submenu
      submenu.classList.remove("show");
      submenu.classList.add("hidden");
      // Reset inline styles that may have been set by Popper.js
      submenu.removeAttribute("style");

      // Check if this submenu has an associated Popper instance and destroy it
      if (submenu._popper) {
        submenu._popper.destroy();
        submenu._popper = null; // Clear the reference to the destroyed Popper instance
      }
    });
  }

  handleItemClick(index) {
    this.showDropdown = false;
    this.focusedIndex = -1;

    // Destroy Popper when item is clicked
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }
  }

  handleCheckboxChange(event, index) {
    const isChecked = event.target.checked;
    this.dispatchEvent(
      new CustomEvent("checkbox-change", {
        detail: { index, isChecked },
        bubbles: true,
        composed: true,
      })
    );
  }

  handleToggleChange(event, index) {
    const isChecked = event.target.checked;
    this.dispatchEvent(
      new CustomEvent("toggle-change", {
        detail: { index, isChecked },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("dropdown-component", Dropdown);
