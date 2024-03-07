import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { robotoFont } from "../../styles/Roboto/roboto-font.js";
import { layoutStyles } from "../layout-styles.js";
import { formStyles } from "../form-styles.js";
import { buttonStyles } from "../button/button-styles.js";
import { dropdownStyles } from "./dropdown-styles.js";
import {
  constructClassAttribute,
  getButtonTypeClass,
  getButtonShape,
} from "../utilities/sharedButtonUtils.js";
import Popper from "popper.js";
import "../icon/icon.js";

class Dropdown extends LitElement {
  static styles = [
    robotoFont,
    layoutStyles,
    buttonStyles,
    dropdownStyles,
    formStyles,
    css``,
  ];

  static get properties() {
    return {
      block: { type: Boolean },
      buttonText: { type: String },
      disabled: { type: Boolean },
      dotsIcon: { type: Boolean },
      gearIcon: { type: Boolean },
      id: { type: String },
      items: { type: Array },
      menuIcon: { type: Boolean },
      outlined: { type: Boolean },
      pressed: { type: Boolean },
      ripple: { type: Boolean },
      showDropdown: { type: Boolean },
      shape: { type: String },
      size: { type: String },
      styles: { type: String },
      focusedIndex: { type: Number },
      variant: { type: String },
    };
  }

  constructor() {
    super();
    // Initialize default properties
    this.block = false;
    this.buttonText = "Dropdown button";
    this.disabled = false;
    this.dotsIcon = false;
    this.gearIcon = false;
    this.id = "";
    this.menuIcon = false;
    this.outlined = false;
    this.pressed = false;
    this.ripple = false;
    this.showDropdown = false;
    this.styles = "";
    this.focusedIndex = -1;
    this.variant = "";

    // Bind event handlers
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);

    // Popper instance for dropdown positioning
    this.popper = null;
  }

  // Lifecycle callbacks
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.handleOutsideClick);
    document.addEventListener("keydown", this.handleKeyPress);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.handleOutsideClick);
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  createPopper() {
    const button = this.shadowRoot.querySelector("#dropdown-toggle");
    const menu = this.shadowRoot.querySelector("#dropdown-menu");

    if (!button || !menu) {
      return;
    }

    if (this.popper) {
      this.popper.destroy();
    }

    this.popper = new Popper(button, menu, {
      placement: "bottom-start",
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
        type="button"
        id="${this.id}"
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
        class="dropdown-toggle ${classAttribute}${this.menuIcon
          ? " icon-menu"
          : ""}"
        type="button"
        id="${this.id}"
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
      console.error(`Invalid index value for isSubmenuOpen: ${index}`);
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
      // Recreate Popper for the submenu
      this.createSubmenuPopper(submenuAnchor, submenu);
    }
  }

  renderDropdownMenu(caretRightIcon) {
    return html`
      <div
        class="dropdown-menu ${this.showDropdown ? "show" : ""} ${this.shape}"
        aria-labelledby="${this.id}"
        role="listbox"
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
                          @mouseenter="${() => this.handleSubmenuEnter(index)}"
                          @mouseleave="${() => this.handleSubmenuLeave(index)}"
                        >
                          <a
                            class="dropdown-item ${this
                              .size} dropdown-submenu-toggle dropdown-submenu-${index}"
                            data-index="${index}"
                            role="option"
                            tabindex="${this.showDropdown ? "0" : "-1"}"
                            id="submenu-toggle-${index}"
                          >
                            ${item.name}
                            <div class="caret-right">${caretRightIcon}</div>
                          </a>
                          ${this.renderSubmenu(item.submenu, index)}
                        </div>
                      `
                    : html`
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
                      `}
                `
            )
          : html``}
      </div>
    `;
  }

  renderSubmenu(submenuItems, parentIndex) {
    return html`
      <div
        class="dropdown-menu sub dropdown-submenu-${parentIndex}"
        data-index="${parentIndex}"
        role="listbox"
        style="${ifDefined(this.styles ? this.styles : undefined)}"
      >
        ${submenuItems.map(
          (subitem, subIndex) =>
            html`
              ${subitem.isDivider
                ? html`<div class="dropdown-divider"></div>`
                : html`
                    <a
                      class="dropdown-item ${this.size}"
                      @click="${() =>
                        this.handleItemClick(subIndex, parentIndex)}"
                      role="option"
                      tabindex="${this.showDropdown ? "0" : "-1"}"
                    >
                      ${subitem.name}
                    </a>
                  `}
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

    this.updatePopper(); // Update Popper on render

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
      <div class="dropdown">
        ${this.menuIcon
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

  // Modify the handleKeyPress method
  handleKeyPress(event) {
    if (!this.showDropdown) return;

    const items = Array.from(
      this.shadowRoot.querySelectorAll(
        ".dropdown-item:not(.disabled):not(.hidden)"
      )
    );
    const currentFocus = this.shadowRoot.activeElement;
    let newIndex = this.focusedIndex;

    const isSubmenuTrigger = event.target.classList.contains(
      "dropdown-submenu-toggle"
    );
    if (isSubmenuTrigger && event.key === "ArrowRight") {
      event.preventDefault();
      const index = parseInt(event.target.dataset.index, 10); // Convert to integer
      if (!isNaN(index)) {
        if (!this.isSubmenuOpen(index)) {
          this.showSubmenu(index); // Assuming you adapt showSubmenu to work with index
        }
      } else {
        console.error("Invalid index or index not found on submenu trigger.");
      }
    }

    const submenuTriggers = this.shadowRoot.querySelectorAll(
      ".dropdown-submenu-toggle"
    );

    switch (event.key) {
      case "ArrowDown":
      case "Tab":
        event.preventDefault(); // Prevent the screen from scrolling
        newIndex = this.getNextFocusableItemIndex(this.focusedIndex, 1, items);
        this.focusItemAtIndex(newIndex, items);
        break;
      case "ArrowUp":
        event.preventDefault(); // Prevent the screen from scrolling
        newIndex = this.getNextFocusableItemIndex(this.focusedIndex, -1, items);
        this.focusItemAtIndex(newIndex, items);
        break;
      case "ArrowRight":
        if (
          currentFocus &&
          currentFocus.classList.contains("dropdown-submenu-toggle")
        ) {
          event.preventDefault();
          const index = currentFocus.dataset.index;
          this.toggleSubmenuVisibilityAndPopper(index, true);
        }
        break;
      case "ArrowLeft":
        event.preventDefault();
        const activeSubmenu = [...submenuTriggers].find((trigger) =>
          this.isSubmenuOpen(trigger.dataset.index)
        );
        if (activeSubmenu) {
          this.closeSubmenu(activeSubmenu.dataset.index);
          activeSubmenu.focus(); // Focus back to the submenu trigger
        }
        break;
      case "Tab":
        event.preventDefault();
        this.focusItemAtIndex(newIndex, items);
        break;
      case "Enter":
        if (this.focusedIndex !== -1) {
          this.handleItemClick(this.focusedIndex);
        }
        break;
      case "Escape":
        event.preventDefault(); // Prevent the default action for the Escape key
      this.showDropdown = false; // Close the main dropdown menu
      this.closeAllSubmenus(); // Close all submenus and reset them
      this.focusedIndex = -1; // Reset the focus index
      
      // Destroy the main Popper instance if it exists
      if (this.popper) {
        this.popper.destroy();
        this.popper = null;
      }

      // Optionally, you can focus the dropdown toggle button after closing
      this.blurButton(); // or another method to focus the button
      break;
    }

    // Ensure newIndex is correctly set for focus management
    if (newIndex !== this.focusedIndex) {
      this.focusItemAtIndex(newIndex, items);
    }
  }

  focusItemAtIndex(index, items) {
    if (index >= 0 && index < items.length) {
      items[index].focus();
      this.focusedIndex = index;
    }
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
      this.createSubmenuPopper(submenu.previousElementSibling, submenu);
    } else {
      submenu.classList.remove("show");
      if (submenu._popper) {
        submenu._popper.destroy();
        submenu._popper = null;
      }
    }
  }

  createSubmenuPopper(submenuAnchor, submenu) {
    if (submenu._popper) submenu._popper.destroy();

    submenu._popper = new Popper(submenuAnchor, submenu, {
      placement: "right-start",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 10],
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
        // Recreate Popper for the submenu
        this.createSubmenuPopper(submenu.previousElementSibling, submenu);
      } else {
        submenu.classList.remove("show");
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
  closeSubmenu(index) {
    const submenu = this.shadowRoot.querySelector(
      `.dropdown-menu.dropdown-submenu-${index}`
    );
    if (submenu && submenu.classList.contains("show")) {
      submenu.classList.remove("show");
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
}

customElements.define("dropdown-component", Dropdown);
