import { LitElement, html, css } from 'lit';
import { layoutStyles } from '../layout-styles.js';
import { formStyles } from '../form-styles.js';
import { dropdownStyles } from './dropdown-styles.js';
import Popper from 'popper.js';

class Dropdown extends LitElement {
  static styles = [layoutStyles, dropdownStyles, formStyles, css``];

  static get properties() {
    return {
      items: { type: Array },
      showDropdown: { type: Boolean },
      focusedIndex: { type: Number },
    };
  }

  constructor() {
    super();
    this.showDropdown = false;
    this.focusedIndex = -1;

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
    document.addEventListener('click', this.handleOutsideClick);
    document.addEventListener('keydown', this.handleKeyPress);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick);
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  createPopper() {
    const button = this.shadowRoot.querySelector('.dropdown-toggle');
    const menu = this.shadowRoot.querySelector('.dropdown-menu');

    if (!button || !menu) {
      return;
    }

    if (this.popper) {
      this.popper.destroy();
    }

    this.popper = new Popper(button, menu, {
      placement: 'bottom-start',
    });
  }

  updatePopper() {
    if (this.popper) {
      this.popper.update();
    }
  }

  handleOutsideClick(event) {
    if (!this.contains(event.target)) {
      this.showDropdown = false;
      this.focusedIndex = -1;

      // Destroy Popper when dropdown is closed
      if (this.popper) {
        this.popper.destroy();
        this.popper = null;
      }
    }
  }

  calculateTransformStyles() {
    // Not needed anymore
  }

  render() {
    this.updatePopper(); // Update Popper on render
    return html`
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          aria-haspopup="true"
          aria-expanded="${this.showDropdown ? 'true' : 'false'}"
          @click="${this.toggleDropdown}"
        >
          Dropdown button
        </button>
        <div
          class="dropdown-menu${this.showDropdown ? ' show' : ''}"
          aria-labelledby="dropdownMenuButton"
        >
          ${this.items
            ? this.items.map(
                (item, index) =>
                  html`<a
                    class="dropdown-item"
                    href="${item.path}"
                    @click="${() => this.handleItemClick(index)}"
                    tabindex="${this.showDropdown ? '0' : '-1'}"
                  >
                    ${item.name}
                  </a>`
              )
            : html``}
        </div>
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
    const button = this.shadowRoot.querySelector('.dropdown-toggle');
    if (button) {
      button.blur();
    }
  }

  handleKeyPress(event) {
    if (this.showDropdown) {
      const dropdownItems = this.shadowRoot.querySelectorAll('.dropdown-item');

      switch (event.key) {
        case 'ArrowDown':
          this.focusedIndex =
            this.focusedIndex < dropdownItems.length - 1
              ? this.focusedIndex + 1
              : 0;
          break;
        case 'ArrowUp':
          this.focusedIndex =
            this.focusedIndex > 0
              ? this.focusedIndex - 1
              : dropdownItems.length - 1;
          break;
        case 'Enter':
          if (this.focusedIndex !== -1) {
            // Add your logic here for handling the Enter key press
            console.log(
              `Enter pressed on item: ${this.items[this.focusedIndex].name}`
            );

            // Close the dropdown
            this.showDropdown = false;
            this.focusedIndex = -1;

            // Use setTimeout to delay focusing on the button
            setTimeout(() => {
              this.focusButton();
            }, 0);
          }
          break;
        case 'Escape':
          this.showDropdown = false;
          this.focusedIndex = -1;
          break;
        case 'Tab':
          event.preventDefault(); // Prevent default tab behavior
          if (this.focusedIndex === dropdownItems.length - 1) {
            this.showDropdown = false;
            this.focusedIndex = -1;
            this.focusButton(); // Reset focus to the button
          } else {
            this.focusedIndex =
              this.focusedIndex < dropdownItems.length - 1
                ? this.focusedIndex + 1
                : 0;
          }
          break;
      }

      // Remove the focused-item class from all items
      dropdownItems.forEach((item) => {
        item.classList.remove('focused-item');
      });

      // Add the focused-item class to the focused item
      if (this.focusedIndex !== -1) {
        dropdownItems[this.focusedIndex].classList.add('focused-item');
      }
    }
  }

  focusButton() {
    const button = this.shadowRoot.querySelector('.dropdown-toggle');
    if (button) {
      button.focus();
    }
  }

  handleItemClick(index) {
    console.log(`Item clicked: ${this.items[index].name}`);
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
      const dropdownItems = this.shadowRoot.querySelectorAll('.dropdown-item');
      if (dropdownItems.length > 0) {
        dropdownItems[0].focus();
      }
    }
  }
}

customElements.define('dropdown-component', Dropdown);
