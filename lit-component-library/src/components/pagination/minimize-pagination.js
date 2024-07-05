import { LitElement, html, css } from "lit";
import { paginationStyles } from "./pagination-styles.js";

class MinimizePagination extends LitElement {
  static styles = [paginationStyles];

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

  render() {
    return html`<ul
      role="menubar"
      aria-disabled="false"
      aria-label="Pagination"
      class="pagination b-pagination${this.size === "sm"
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
          tabindex="0"
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
          tabindex="0"
          aria-label="Go to previous page"
          aria-controls="${this.id}"
          class="page-link"
          @click="${this._prevPage}"
          ?disabled="${this.currentPage === 1}"
        >
          ${this.goToButtons === "text" ? "Prev" : "‹"}
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
          tabindex="0"
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
          tabindex="0"
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

customElements.define("minimize-pagination", MinimizePagination);
