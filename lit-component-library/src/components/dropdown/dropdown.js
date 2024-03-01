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
    this.block = false;
    this.buttonText = "Dropdown button";
    this.disabled = false;
    this.dotsIcon = false;
    this.gearIcon = false;
    this.groupBtn = false;
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

    // Initialize Popper
    this.popper = null;
  }

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

  updated(changedProperties) {
    super.updated(changedProperties);

    // Check if items or showDropdown property has changed
    if (
      changedProperties.has("items") ||
      changedProperties.has("showDropdown")
    ) {
      this.attachSubmenuEventListeners();
    }
  }

  attachSubmenuEventListeners() {
    const submenuAnchors = this.shadowRoot.querySelectorAll(
      ".dropdown-submenu .dropdown-submenu-toggle"
    );

    submenuAnchors.forEach((submenuAnchor, index) => {
      submenuAnchor.addEventListener("mouseenter", (event) => {
        this.showSubmenu(submenuAnchor);
      });

      submenuAnchor.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight" && !this.isSubmenuOpen(submenuAnchor)) {
          event.preventDefault();
          this.showSubmenu(submenuAnchor);
        } else if (
          event.key === "ArrowLeft" &&
          this.isSubmenuOpen(submenuAnchor)
        ) {
          event.preventDefault();
          this.hideSubmenu(submenuAnchor.nextElementSibling);
        }
      });

      // Use 'mouseleave' event on the parent submenu instead of submenuAnchor
      const submenu = submenuAnchor.nextElementSibling;
      if (submenu) {
        submenu.addEventListener("mouseleave", () => {
          // this.hideSubmenu(submenu);
          this.handleSubmenuLeave(index);
        });
      }
    });
  }

  showSubmenu(submenuAnchor) {
    console.log("Submenu shown for:", submenuAnchor);

    const submenu = submenuAnchor.nextElementSibling;

    if (submenu) {
      submenu.classList.add("show");
      // Recreate Popper for the submenu
      this.createSubmenuPopper(submenuAnchor, submenu);
    }
  }

  hideSubmenu(submenu) {
    if (submenu) {
      submenu.classList.remove("show");
      // Destroy Popper when submenu is closed
      if (this.submenuPopper) {
        this.submenuPopper.destroy();
        this.submenuPopper = null;
      }
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
                            href="${item.path}"
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
        class="dropdown-menu dropdown-submenu-${parentIndex} ${this
          .focusedIndex === parentIndex && this.showDropdown
          ? "show"
          : ""}"
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
                      href="${subitem.path}"
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

  handleSubmenuLeave(index) {
    const submenuToggle = this.shadowRoot.querySelector(
      `.dropdown-submenu-${index} .dropdown-submenu-toggle`
    );

    if (submenuToggle) {
      submenuToggle.classList.remove("focused-item");
    }

    // Close submenu on leave
    this.closeSubmenu(index);

    // Destroy submenu Popper
    this.destroySubmenuPopper(index);
  }

  destroySubmenuPopper(index) {
    const submenuAnchor = this.shadowRoot.querySelector(
      `.dropdown-submenu-${index} .dropdown-submenu-toggle`
    );
    const submenu = this.shadowRoot.querySelector(
      `.dropdown-submenu-${index} .dropdown-menu`
    );

    if (submenuAnchor && submenu) {
      if (submenuAnchor && submenu) {
        // Use Popper.js to destroy the submenu Popper instance
        const submenuPopper = this.getSubmenuPopper(submenuAnchor);
        if (submenuPopper) {
          submenuPopper.destroy();
          submenuPopper = null;
        }
      }
    }
  }

  getSubmenuPopper(submenuAnchor) {
    // Use Popper.js to retrieve the existing submenu Popper instance
    return submenuAnchor._popper;
  }

  closeSubmenu(index) {
    this.toggleSubmenu(index, false);
  }

  handleOutsideClick(event) {
    const isOutsideMainDropdown = !this.contains(event.target);
    const isOutsideSubmenu = !event.target.closest(".dropdown-submenu");

    if (isOutsideMainDropdown && isOutsideSubmenu) {
      const focusedItems = this.shadowRoot.querySelectorAll(".focused-item");

      focusedItems.forEach((item) => {
        item.classList.remove("focused-item");
      });

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
    // let openSubmenu = false;

    if (this.showDropdown) {
      const dropdownItems = this.shadowRoot.querySelectorAll(".dropdown-item");

      switch (event.key) {
        case "ArrowDown":
        case "Tab":
          event.preventDefault();
          if (this.inSubmenu) {
            // Navigate down within the submenu
            const nextSubmenuItem = this.getNextSubmenuItem();
            if (nextSubmenuItem) {
              nextSubmenuItem.focus();
            }
          } else {
            // Navigate down within the main menu
            // Add your logic to navigate down within the main menu
            event.preventDefault();
            this.focusNextItem(dropdownItems);
          }
          break;
        case "ArrowUp":
          event.preventDefault();
          if (this.inSubmenu) {
            // Navigate up within the submenu
            const previousSubmenuItem = this.getPreviousSubmenuItem();
            if (previousSubmenuItem) {
              previousSubmenuItem.focus();
            }
          } else {
            // Navigate up within the main menu
            event.preventDefault();
            this.focusPreviousItem(dropdownItems);
          }
          break;
        case "ArrowRight":
          event.preventDefault();
          const submenuIndex = this.focusedIndex + 1;
        
          const submenuAnchorSelector = `.dropdown-submenu-${submenuIndex} .dropdown-submenu-toggle`;
          const submenuAnchor = this.shadowRoot.querySelector(submenuAnchorSelector);
        
          const submenuSelector = `.dropdown-submenu-${submenuIndex} .dropdown-menu`;
          const submenu = this.shadowRoot.querySelector(submenuSelector);
          
          if (submenu) {
            // Open the submenu
            this.createSubmenuPopper(submenuAnchor, submenu);
            this.toggleSubmenu(true);
        
            // Add focused-item class to the first item in the submenu after a delay
            setTimeout(() => {
              const firstSubmenuItem = submenu.querySelector(".dropdown-item");
              if (firstSubmenuItem) {
                firstSubmenuItem.classList.add("focused-item");
              }
            }, 50); // Adjust the delay as needed
          }
          break;
        case "ArrowLeft":
          event.preventDefault();
         // this.closeOrToggleSubmenu();
          this.focusPreviousItem(dropdownItems);
          if (this.inSubmenu) {
            // Close the submenu
            this.toggleSubmenu(false);
          }
          break;
        case "Tab":
          event.preventDefault();
          this.focusNextVisibleItem(dropdownItems);
          break;
        case "Enter":
          if (this.focusedIndex !== -1) {
            this.handleItemClick(this.focusedIndex);
          }
          break;
        case "Escape":
          this.showDropdown = false;
          this.focusedIndex = -1;
          break;
      }

      this.updateFocusedItemClass(dropdownItems);
    }
  }

  getNextSubmenuItem() {
    // Get the currently focused submenu item
    const focusedSubmenuItem = document.activeElement;

    // Check if there is a submenu and it has items
    if (focusedSubmenuItem && focusedSubmenuItem.submenu) {
      // Get all submenu items within the current submenu
      const submenuItems =
        focusedSubmenuItem.submenu.querySelectorAll(".dropdown-item");

      // Find the index of the focused item
      const focusedIndex = Array.from(submenuItems).indexOf(focusedSubmenuItem);

      // Return the next submenu item or null if it's the last item
      return submenuItems[focusedIndex + 1] || null;
    }

    return null;
  }

  getPreviousSubmenuItem() {
    // Get the currently focused submenu item
    const focusedSubmenuItem = document.activeElement;

    // Check if there is a submenu and it has items
    if (focusedSubmenuItem && focusedSubmenuItem.submenu) {
      // Get all submenu items within the current submenu
      const submenuItems =
        focusedSubmenuItem.submenu.querySelectorAll(".dropdown-item");

      // Find the index of the focused item
      const focusedIndex = Array.from(submenuItems).indexOf(focusedSubmenuItem);

      // Return the previous submenu item or null if it's the first item
      return submenuItems[focusedIndex - 1] || null;
    }

    return null;
  }

  focusNextVisibleItem(dropdownItems) {
    let newIndex = (this.focusedIndex + 1) % dropdownItems.length;

    // Skip over hidden or disabled items
    while (
      dropdownItems[newIndex].classList.contains("hidden") ||
      dropdownItems[newIndex].disabled
    ) {
      newIndex = (newIndex + 1) % dropdownItems.length;
    }

    this.focusedIndex = newIndex;
  }

  focusPreviousVisibleItem(dropdownItems) {
    let newIndex =
      (this.focusedIndex - 1 + dropdownItems.length) % dropdownItems.length;

    // Skip over hidden or disabled items
    while (
      dropdownItems[newIndex].classList.contains("hidden") ||
      dropdownItems[newIndex].disabled
    ) {
      newIndex = (newIndex - 1 + dropdownItems.length) % dropdownItems.length;
    }

    this.focusedIndex = newIndex;
  }

  focusNextItem(dropdownItems) {
    const itemCount = dropdownItems.length;
    let newIndex = (this.focusedIndex + 1) % itemCount;

    // Increment index to skip over submenu items or hidden items
    while (
      dropdownItems[newIndex] &&
      (dropdownItems[newIndex].classList.contains("submenu-item") ||
        !dropdownItems[newIndex]
          .closest(".dropdown-menu")
          .classList.contains("show"))
    ) {
      newIndex = (newIndex + 1) % itemCount;
    }

    this.focusedIndex = newIndex;
  }

  focusPreviousItem(dropdownItems) {
    const itemCount = dropdownItems.length;
    let newIndex = (this.focusedIndex - 1 + itemCount) % itemCount;

    // Decrement index to skip over submenu items or hidden items
    while (
      dropdownItems[newIndex] &&
      (dropdownItems[newIndex].classList.contains("submenu-item") ||
        !dropdownItems[newIndex]
          .closest(".dropdown-menu")
          .classList.contains("show"))
    ) {
      newIndex = (newIndex - 1 + itemCount) % itemCount;
    }

    this.focusedIndex = newIndex;
  }

  updateFocusedItemClass(dropdownItems) {
    dropdownItems.forEach((item, index) => {
      item.classList.toggle("focused-item", index === this.focusedIndex);
    });
  }

  closeOrToggleSubmenu() {
    if (this.focusedIndex !== -1 && this.items[this.focusedIndex]?.submenu) {
      const submenu = this.shadowRoot.querySelector(
        `.dropdown-submenu-${this.focusedIndex} .dropdown-menu`
      );

      if (submenu) {
        const isSubmenuOpen = submenu.classList.contains("show");
        if (isSubmenuOpen) {
          this.closeSubmenu();
        } else {
          this.openSubmenu();
        }
      }
    }
  }

  // createSubmenuPopper(submenuAnchor, submenu) {
  //   console.log("Submenu Popper created for:", submenuAnchor);

  //   // Use Popper.js to create a new Popper instance for the submenu
  //   if (this.submenuPopper) {
  //     this.submenuPopper.destroy();
  //   }

  //   this.submenuPopper = new Popper(submenuAnchor, submenu, {
  //     placement: "right-start", // Adjust the placement as needed
  //   });
  // }

  createSubmenuPopper(submenuAnchor, submenu) {

    // Use Popper.js to create a new Popper instance for the submenu
    if (this.submenuPopper) {
      this.submenuPopper.destroy();
    }

    // Ensure both submenuAnchor and submenu are valid elements
    if (submenuAnchor && submenu && typeof Popper === "function") {
      // Remove focused-item class from the previous submenu anchor
      if (this.previousSubmenuAnchor) {
        this.previousSubmenuAnchor.classList.remove("focused-item");
      }
  
      // Use Popper.js to create a new Popper instance for the submenu
      // You may need to adjust the placement and other options based on your needs
      this.submenuPopper = new Popper(submenuAnchor, submenu, {
        placement: "right-start",
      });
  
      // Add the 'show' class to the submenu
      submenu.classList.add("show");
  
      // Remove focused-item class from submenuAnchor after a short delay
      setTimeout(() => {
        submenuAnchor.classList.remove("focused-item");
      }, 50); // Adjust the delay as needed
  
    } else {
      console.error(
        "Invalid submenuAnchor or submenu. Popper cannot be created.",
        submenuAnchor,
        submenu
      );
    }
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

  // Add this method to find the parent submenu index
  findParentSubmenuIndex(index) {
    const currentItem = this.items[index];

    if (currentItem && currentItem.isSubmenu) {
      const parentItem = this.items.find((item) =>
        item.submenu.includes(currentItem)
      );
      return parentItem ? this.items.indexOf(parentItem) : -1;
    }

    return -1;
  }

  handleSubmenuLeave() {
    const submenuToggle = this.shadowRoot.querySelector(
      `.dropdown-submenu-${this.focusedIndex} .dropdown-submenu-toggle`
    );

    if (submenuToggle) {
      submenuToggle.classList.remove("focused-item");
    }

    // Close submenu on leave
    this.closeSubmenu();

    // Destroy submenu Popper
    this.destroySubmenuPopper();
  }

  // Add this method to destroy the submenu Popper
  destroySubmenuPopper() {
    if (this.submenuPopper) {
      this.submenuPopper.destroy();
      this.submenuPopper = null;
    }
  }

  // Add this method to close the submenu
  closeSubmenu() {
    if (this.focusedIndex !== -1) {
      this.toggleSubmenu(false);
      this.destroySubmenuPopper(); // Destroy submenu Popper
    }
  }

  focusButton() {
    const button = this.shadowRoot.querySelector(".dropdown-toggle");
    if (button) {
      button.focus();
    }
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

  focusFirstMenuItem() {
    if (this.focusedIndex === -1 && this.showDropdown) {
      const dropdownItems = this.shadowRoot.querySelectorAll(".dropdown-item");
      if (dropdownItems.length > 0) {
        dropdownItems[0].focus();
      }
    }
  }
}

customElements.define("dropdown-component", Dropdown);
