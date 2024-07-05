import { LitElement, html, css } from "lit";
import { paginationStyles } from "./pagination-styles.js";
import { inputFieldStyles } from "../input-field/input-field-styles.js"; // Import your custom input field component
import { plInputFieldStyles } from "../pl-input-field/pl-input-field-styles.js"; // Import your custom input field component
import { formStyles } from "../form-styles.js";

class ByPagePagination extends LitElement {
  static styles = [
    formStyles,
    paginationStyles,
    inputFieldStyles,
    plInputFieldStyles,
  ];

  static properties = {
    currentPage: { type: Number },
    totalPages: { type: Number },
    goToButtons: { type: String },
    size: { type: String },
    paginationLayout: { type: String },
    plumage: { type: Boolean },
  };

  constructor() {
    super();
    this.currentPage = 1;
    this.totalPages = 1;
    this.goToButtons = "";
    this.size = "";
    this.paginationLayout = "";
    this.plumage = false;
  }

  _firstPage() {
    this.dispatchEvent(new CustomEvent("change-page", { detail: { page: 1 } }));
  }

  _prevPage() {
    if (this.currentPage > 1) {
      this.dispatchEvent(
        new CustomEvent("change-page", {
          detail: { page: this.currentPage - 1 },
        })
      );
    }
  }

  _nextPage() {
    if (this.currentPage < this.totalPages) {
      this.dispatchEvent(
        new CustomEvent("change-page", {
          detail: { page: this.currentPage + 1 },
        })
      );
    }
  }

  _lastPage() {
    this.dispatchEvent(
      new CustomEvent("change-page", { detail: { page: this.totalPages } })
    );
  }

  _handleInputPageChange(e) {
    const newPage = parseInt(e.target.value, 10);
    if (!isNaN(newPage) && newPage >= 1 && newPage <= this.totalPages) {
      this.dispatchEvent(
        new CustomEvent("change-page", { detail: { page: newPage } })
      );
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._handleDocumentClick = this.handleDocumentClick.bind(this);
    document.addEventListener("click", this._handleDocumentClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this._handleDocumentClick);
  }

  handleFocus(event) {
    this.isSelectFocused = true;
    const bFocusDiv = this.shadowRoot.querySelector(".b-focus");
    if (bFocusDiv) {
      bFocusDiv.style.width = "100%";
      bFocusDiv.style.left = "0";
    }
  }

  handleBlur(event) {
    this.isSelectFocused = false;
    setTimeout(() => {
      if (!this.isSelectFocused) {
        const bFocusDiv = this.shadowRoot.querySelector(".b-focus");
        if (bFocusDiv) {
          bFocusDiv.style.width = "0";
          bFocusDiv.style.left = "50%";
        }
      }
    }, 100);
  }

  handleDocumentClick(event) {
    if (!this.isSelectFocused) {
      const bFocusDiv = this.shadowRoot.querySelector(".b-focus");
      if (bFocusDiv) {
        bFocusDiv.style.width = "0";
        bFocusDiv.style.left = "50%";
      }
    }
  }

  render() {
    return html`<ul
      role="menubar"
      aria-disabled="false"
      aria-label="Pagination"
      class="pagination by-page b-pagination${this.size === "sm"
        ? " pagination-sm"
        : this.size === "lg"
        ? " pagination-lg"
        : ""}${this.paginationLayout === "center"
        ? " justify-content-center"
        : this.paginationLayout === "end"
        ? " justify-content-end"
        : ""}${this.plumage ? " plumage" : ""}"
    >
      <li
        role="presentation"
        aria-hidden="${this.currentPage === 1}"
        class="page-item${this.currentPage === 1 ? " disabled" : ""}"
      >
        <button
          role="menuitem"
          type="button"
          tabindex="${this.currentPage === 1 ? "-1" : "0"}"
          aria-label="Go to first page"
          aria-controls="${this.id}"
          class="page-link"
          @click="${this._firstPage}"
          ?disabled="${this.currentPage === 1}"
        >
          ${this.goToButtons === "text" ? "First" : "«"}
        </button>
      </li>
      <li
        role="presentation"
        aria-hidden="${this.currentPage === 1}"
        class="page-item${this.currentPage === 1 ? " disabled" : ""}"
      >
        <button
          role="menuitem"
          type="button"
          tabindex="${this.currentPage === 1 ? "-1" : "0"}"
          aria-label="Go to previous page"
          aria-controls="${this.id}"
          class="page-link"
          @click="${this._prevPage}"
          ?disabled="${this.currentPage === 1}"
        >
          ${this.goToButtons === "text" ? "Prev" : "‹"}
        </button>
      </li>
      <li role="presentation" aria-hidden="true" class="page-item">
        <div class="pages">
          Page
          ${this.plumage
            ? html`<div
                class="pl-input-container page-input-wrapper"
                role="presentation"
                aria-labelledby="pageNumberField"
              >
                <label class="sr-only" for="pageNumberField">Page number</label>
                <input
                  type="text"
                  class="pl-form-control page-input${this.size === "sm"
                    ? " pl-input-sm"
                    : this.size === "lg"
                    ? " pl-input-lg"
                    : ""}"
                  aria-label="Page number"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  id="paginationInput"
                  aria-labelledby="paginationInputLabel paginationDescription"
                  .value="${this.currentPage}"
                  @change="${this._handleInputPageChange}"
                  @focus="${this.handleFocus}"
                  @blur="${this.handleBlur}"
                />
                <div class="b-underline" role="presentation">
                  <div
                    class="b-focus"
                    role="presentation"
                    aria-hidden="true"
                  ></div>
                </div>
              </div>`
            : html`<label class="sr-only" for="pageNumberField"
                  >Page number</label
                ><input
                  type="text"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  id="paginationInput"
                  aria-label="Page number"
                  aria-labelledby="paginationInputLabel paginationDescription"
                  class="form-control page-input${this.size === "sm"
                    ? " basic-input-sm"
                    : this.size === "lg"
                    ? " basic-input-lg"
                    : ""}"
                  .value="${this.currentPage}"
                  @change="${this._handleInputPageChange}"
                />`}
          of ${this.totalPages}
        </div>
      </li>
      <li
        role="presentation"
        aria-hidden="${this.currentPage === this.totalPages}"
        class="page-item${this.currentPage === this.totalPages
          ? " disabled"
          : ""}"
      >
        <button
          role="menuitem"
          type="button"
          tabindex="${this.currentPage === this.totalPages ? "-1" : "0"}"
          aria-label="Go to next page"
          aria-controls="${this.id}"
          class="page-link"
          @click="${this._nextPage}"
          ?disabled="${this.currentPage === this.totalPages}"
        >
          ${this.goToButtons === "text" ? "Next" : "›"}
        </button>
      </li>
      <li
        role="presentation"
        aria-hidden="${this.currentPage === this.totalPages}"
        class="page-item${this.currentPage === this.totalPages
          ? " disabled"
          : ""}"
      >
        <button
          role="menuitem"
          type="button"
          tabindex="${this.currentPage === this.totalPages ? "-1" : "0"}"
          aria-label="Go to last page"
          aria-controls="${this.id}"
          class="page-link"
          @click="${this._lastPage}"
          ?disabled="${this.currentPage === this.totalPages}"
        >
          ${this.goToButtons === "text" ? "Last" : "»"}
        </button>
      </li>
    </ul>`;
  }
}

customElements.define("by-page-pagination", ByPagePagination);
