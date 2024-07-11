import { LitElement, html, css } from "lit";
import { paginationStyles } from "./pagination-styles.js";

class StandardPagination extends LitElement {
  // Define styles for the component
  static styles = [paginationStyles];

  // Define properties with their types
  static properties = {
    currentPage: { type: Number }, // Current active page
    totalPages: { type: Number }, // Total number of pages
    hideGotoEndButtons: { type: Boolean }, // Whether to hide 'First' and 'Last' buttons
    goToButtons: { type: String }, // Type of 'go to' buttons: text or symbols
    size: { type: String }, // Size of pagination: sm, lg, or default
    paginationLayout: { type: String }, // Layout of pagination: center, end, fill, etc.
    hideEllipsis: { type: Boolean }, // Whether to hide ellipsis between page numbers
    limit: { type: Number }, // Limit of visible page buttons
    paginationVariantColor: { type: String }, // Color variant of pagination
    plumage: { type: Boolean }, // Custom style flag
  };

  constructor() {
    super();
    // Initialize default property values
    this.currentPage = 1;
    this.totalPages = 1;
    this.hideGotoEndButtons = false;
    this.goToButtons = "";
    this.size = "";
    this.paginationLayout = "";
    this.hideEllipsis = false;
    this.limit = 3;
    this.paginationVariantColor = "";
    this.plumage = false;
  }

  // Method to dispatch a custom event when the page is changed
  _changePage(page) {
    this.dispatchEvent(
      new CustomEvent("change-page", {
        detail: { page },
      })
    );
  }

  // Method to navigate to the next page
  _nextPage() {
    if (this.currentPage < this.totalPages) {
      this._changePage(this.currentPage + 1);
    }
  }

  // Method to navigate to the previous page
  _prevPage() {
    if (this.currentPage > 1) {
      this._changePage(this.currentPage - 1);
    }
  }

  // Method to navigate to the first page
  _firstPage() {
    this._changePage(1);
  }

  // Method to navigate to the last page
  _lastPage() {
    this._changePage(this.totalPages);
  }

  // Method to render ellipsis
  _renderEllipsis(key) {
    return this.hideEllipsis
      ? ""
      : html`<li
          role="separator"
          class="page-item disabled bv-d-xs-down-none${this.paginationLayout ===
            "fill" ||
          this.paginationLayout === "fill-left" ||
          this.paginationLayout === "fill-right"
            ? " flex-fill d-flex"
            : ""}"
        >
          <span
            class="page-link${this.paginationLayout === "fill" ||
            this.paginationLayout === "fill-left" ||
            this.paginationLayout === "fill-right"
              ? " flex-fill d-flex"
              : ""
              ? " flex-grow-1"
              : ""}"
            >...</span
          >
        </li>`;
  }

  // Method to render a single page button
  _renderPageButton(page) {
    return html`<li
      role="presentation"
      class="page-item${this.currentPage === page ? " active" : ""}${this
        .paginationLayout === "fill" ||
      this.paginationLayout === "fill-left" ||
      this.paginationLayout === "fill-right"
        ? " flex-fill d-flex"
        : ""}"
    >
      <button
        role="menuitemradio"
        type="button"
        aria-controls="pagination"
        aria-label="Go to page ${page}"
        aria-checked="${this.currentPage === page}"
        tabindex="${this.currentPage === page ? "-1" : "0"}"
        class="page-link${this.paginationLayout === "fill" ||
        this.paginationLayout === "fill-left" ||
        this.paginationLayout === "fill-right"
          ? " flex-grow-1"
          : ""}"
        @click="${() => this._changePage(page)}"
        ?disabled="${this.currentPage === page}"
      >
        ${page}
      </button>
    </li>`;
  }

  // Method to generate the page buttons
  _generatePageButtons() {
    const buttons = [];
    const halfLimit = Math.floor((this.limit - 1) / 2);

    let startPage = Math.max(1, this.currentPage - halfLimit);
    let endPage = Math.min(this.totalPages, startPage + this.limit - 1);

    if (endPage - startPage < this.limit - 1) {
      startPage = Math.max(1, endPage - this.limit + 1);
    }

    if (startPage > 1) {
      buttons.push(this._renderPageButton(1));
      if (startPage > 2) {
        buttons.push(this._renderEllipsis("start"));
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(this._renderPageButton(i));
    }

    if (endPage < this.totalPages) {
      if (endPage < this.totalPages - 1) {
        buttons.push(this._renderEllipsis("end"));
      }
      buttons.push(this._renderPageButton(this.totalPages));
    }

    return buttons;
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
        ? " justify-content-center flex-fill50"
        : this.paginationLayout === "end"
        ? " justify-content-end"
        : this.paginationLayout === "fill"
        ? " text-center"
        : ""}${this.paginationVariantColor ? " " + this.paginationVariantColor : ""}${this.plumage ? " plumage" : ""}"
    >
      ${!this.hideGotoEndButtons
        ? html`<li
              role="presentation"
              aria-hidden="${this.currentPage === 1}"
              class="page-item${this.currentPage === 1 ? " disabled" : ""}${this
                .paginationLayout === "fill" ||
              this.paginationLayout === "fill-left" ||
              this.paginationLayout === "fill-right"
                ? " flex-fill d-flex"
                : ""}"
            >
              <button
                role="menuitem"
                type="button"
                tabindex="${this.currentPage === 1 ? '-1' : '0'}"
                aria-label="Go to first page"
                aria-controls="pagination"
                class="page-link${this.paginationLayout === "fill" ||
                this.paginationLayout === "fill-left" ||
                this.paginationLayout === "fill-right"
                  ? " flex-grow-1"
                  : ""}"
                @click="${this._firstPage}"
                ?disabled="${this.currentPage === 1}"
              >
                ${this.goToButtons === "text" ? "First" : "«"}
              </button>
            </li>
            <li
              role="presentation"
              aria-hidden="${this.currentPage === 1}"
              class="page-item${this.currentPage === 1 ? " disabled" : ""}${this
                .paginationLayout === "fill" ||
              this.paginationLayout === "fill-left" ||
              this.paginationLayout === "fill-right"
                ? " flex-fill d-flex"
                : ""}"
            >
              <button
                role="menuitem"
                type="button"
                tabindex="${this.currentPage === 1 ? '-1' : '0'}"
                aria-label="Go to previous page"
                aria-controls="pagination"
                class="page-link${this.paginationLayout === "fill" ||
                this.paginationLayout === "fill-left" ||
                this.paginationLayout === "fill-right"
                  ? " flex-grow-1"
                  : ""}"
                @click="${this._prevPage}"
                ?disabled="${this.currentPage === 1}"
              >
                ${this.goToButtons === "text" ? "Prev" : "‹"}
              </button>
            </li>`
        : ""}
      ${this._generatePageButtons()}
      ${!this.hideGotoEndButtons
        ? html`<li
              role="presentation"
              aria-hidden="${this.currentPage === this.totalPages}"
              class="page-item${this.currentPage === this.totalPages
                ? " disabled"
                : ""}${this.paginationLayout === "fill" ||
              this.paginationLayout === "fill-left" ||
              this.paginationLayout === "fill-right"
                ? " flex-fill d-flex"
                : ""}"
            >
              <button
                role="menuitem"
                type="button"
                tabindex="${this.currentPage === this.totalPages ? '-1' : '0'}"
                aria-label="Go to next page"
                aria-controls="pagination"
                class="page-link${this.paginationLayout === "fill" ||
                this.paginationLayout === "fill-left" ||
                this.paginationLayout === "fill-right"
                  ? " flex-grow-1"
                  : ""}"
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
                : ""}${this.paginationLayout === "fill" ||
              this.paginationLayout === "fill-left" ||
              this.paginationLayout === "fill-right"
                ? " flex-fill d-flex"
                : ""}"
            >
              <button
                role="menuitem"
                type="button"
                tabindex="${this.currentPage === this.totalPages ? '-1' : '0'}"
                aria-label="Go to last page"
                aria-controls="pagination"
                class="page-link${this.paginationLayout === "fill" ||
                this.paginationLayout === "fill-left" ||
                this.paginationLayout === "fill-right"
                  ? " flex-grow-1"
                  : ""}"
                @click="${this._lastPage}"
                ?disabled="${this.currentPage === this.totalPages}"
              >
                ${this.goToButtons === "text" ? "Last" : "»"}
              </button>
            </li>`
        : ""}
    </ul>`;
  }
}

customElements.define("standard-pagination", StandardPagination);
