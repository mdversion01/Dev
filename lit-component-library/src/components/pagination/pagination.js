import { LitElement, html, css } from "lit";
import { paginationStyles } from "./pagination-styles.js";
import { selectFieldStyles } from "../select-field/select-field-styles.js"; // Import your custom select field component
import { plSelectFieldStyles } from "../pl-select-field/pl-select-field-styles.js"; // Import your custom select field component
import { inputFieldStyles } from "../input-field/input-field-styles.js"; // Import your custom input field component

class PaginationComponent extends LitElement {
  static styles = [
    inputFieldStyles,
    selectFieldStyles,
    plSelectFieldStyles,
    paginationStyles,
    css``,
  ];

  static properties = {
    paginationLayout: { type: String },
    currentPage: { type: Number },
    totalPages: { type: Number },
    limit: { type: Number },
    goToButtons: { type: String },
    hideGotoEndButtons: { type: Boolean },
    hideEllipsis: { type: Boolean },
    id: { type: String },
    pageSize: { type: Number },
    pageSizeOptions: { type: Array },
    showDisplayRange: { type: Boolean },
    showSizeChanger: { type: Boolean },
    size: { type: String },
    onChange: { type: Function },
    onShowSizeChange: { type: Function },
    formLayout: { type: String },
    plumage: { type: Boolean },
    totalRows: { type: Number },
    useMinimizePagination: { type: Boolean }, // New property for minimized pagination
    useByPagePagination: { type: Boolean }, // New property for by-page pagination
  };

  constructor() {
    super();
    this.paginationLayout = ""; // new property for pagination layout 'center', 'end', 'fill' OR when used with showSizeChanger 'start', 'center', 'end', 'fill-left', 'fill-right'
    this.currentPage = 1;
    this.totalPages = 1;
    this.limit = 3;
    this.goToButtons = "";
    this.hideGotoEndButtons = false;
    this.hideEllipsis = false;
    this.id = "";
    this.pageSizeOptions = [10, 20, 50, 100, "All"];
    this.showDisplayRange = false;
    this.showSizeChanger = false;
    this.size = "";
    this.formLayout = "";
    this.plumage = false;
    this.totalRows = 0;
    this.useMinimizePagination = false; // Initialize the new property
    this.useByPagePagination = false; // Initialize the new property
    this.pageSize = this.showSizeChanger
      ? this.pageSizeOptions
          .filter((size) => size !== "All")
          .sort((a, b) => a - b)[0]
      : 10;
  }

  _changePage(page) {
    this.currentPage = page;
    this.dispatchEvent(
      new CustomEvent("page-changed", {
        detail: { page: this.currentPage, pageSize: this.pageSize },
      })
    );
    if (this.onChange) {
      this.onChange(this.currentPage, this.pageSize);
    }
  }

  _nextPage() {
    if (this.currentPage < this.totalPages) {
      this._changePage(this.currentPage + 1);
    }
  }

  _prevPage() {
    if (this.currentPage > 1) {
      this._changePage(this.currentPage - 1);
    }
  }

  _firstPage() {
    this._changePage(1);
  }

  _lastPage() {
    this._changePage(this.totalPages);
  }

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
        aria-controls="${this.id}"
        aria-label="Go to page ${page}"
        aria-checked="${this.currentPage === page}"
        tabindex="0"
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

  _handlePageSizeChange(e) {
    const newSize =
      e.target.value === "All" ? "All" : parseInt(e.target.value, 10);
    this.pageSize = newSize;
    this.currentPage = 1; // Reset to first page when page size changes
    this.dispatchEvent(
      new CustomEvent("page-size-changed", { detail: { pageSize: newSize } })
    );
    if (this.onShowSizeChange) {
      this.onShowSizeChange(this.currentPage, newSize);
    }
    this._changePage(1); // Trigger page change with updated page size
  }

  _handleInputPageChange(e) {
    const newPage = parseInt(e.target.value, 10);
    if (!isNaN(newPage) && newPage >= 1 && newPage <= this.totalPages) {
      this._changePage(newPage);
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

  handleInteraction(event) {
    event.stopPropagation();
  }

  handleFocus(event) {
    this.isSelectFocused = true; // Set the flag to true when the select field is focused
    const bFocusDiv = this.shadowRoot.querySelector(".b-focus");
    if (bFocusDiv) {
      bFocusDiv.style.width = "100%";
      bFocusDiv.style.left = "0";
    }
  }

  handleBlur(event) {
    this.isSelectFocused = false; // Set the flag to false when the select field is blurred
    // Use a timeout to delay the collapse to ensure the focus event doesn't interfere with the document click
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

  renderSizeChanger() {
    return html`<div
      class="size-changer${this.size === "sm"
        ? " size-changer-sm"
        : this.size === "lg"
        ? " size-changer-lg"
        : ""}"
    >
      <label for="pageSize">Items per page: </label>
      <select
        id="pageSize"
        @change="${this._handlePageSizeChange}"
        class="form-select form-control ${this.size === "sm"
          ? "select-sm"
          : this.size === "lg"
          ? "select-lg"
          : ""}"
        aria-label="selectField"
        aria-labelledby="selectField"
        aria-invalid="false"
        aria-multiselectable="false"
        role="listbox"
      >
        ${this.pageSizeOptions.map(
          (size) =>
            html`<option value="${size}" ?selected="${this.pageSize === size}">
              ${size}
            </option>`
        )}
      </select>
    </div>`;
  }

  renderPlumageStyleSizeChanger() {
    return html`
      <div
        class="size-changer${this.size === "sm"
          ? " size-changer-sm"
          : this.size === "lg"
          ? " size-changer-lg"
          : ""}"
      >
        <label for="pageSize">Items per page: </label>
        <div
          class="pl-input-container"
          role="presentation"
          aria-labelledby="selectField"
        >
          <select
            id="pageSize"
            class="form-select form-control ${this.size === "sm"
              ? "select-sm"
              : this.size === "lg"
              ? "select-lg"
              : ""}"
            aria-label="selectField"
            aria-labelledby="selectField"
            aria-invalid="false"
            aria-multiselectable="false"
            role="listbox"
            @focus="${this.handleFocus}"
            @blur="${this.handleBlur}"
            @change="${this._handlePageSizeChange}"
          >
            ${this.pageSizeOptions.map(
              (size) =>
                html`<option
                  value="${size}"
                  ?selected="${this.pageSize === size}"
                >
                  ${size}
                </option>`
            )}
          </select>

          <div class="b-underline" role="presentation">
            <div class="b-focus" role="presentation" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    `;
  }

  get displayRange() {
    const startRow = (this.currentPage - 1) * this.pageSize + 1;
    const endRow = Math.min(this.currentPage * this.pageSize, this.totalRows);
    return `${startRow}-${endRow} of ${this.totalRows}`;
  }

  renderPagination() {
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
        : ""}"
    >
      ${!this.hideGotoEndButtons
        ? html`<li
              role="presentation"
              aria-hidden="true"
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
                tabindex="-1"
                aria-label="Go to first page"
                aria-controls="${this.id}"
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
              aria-hidden="true"
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
                tabindex="-1"
                aria-label="Go to previous page"
                aria-controls="${this.id}"
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
              class="page-item${this.currentPage === this.totalPages
                ? " disabled"
                : ""}${this.paginationLayout === "fill" ||
              this.paginationLayout === "fill-left" ||
              this.paginationLayout === "fill-right"
                ? " flex-fill d-flex"
                : ""}"
              aria-hidden="true"
            >
              <button
                role="menuitem"
                type="button"
                tabindex="-1"
                aria-label="Go to next page"
                aria-controls="${this.id}"
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
              class="page-item${this.currentPage === this.totalPages
                ? " disabled"
                : ""}${this.paginationLayout === "fill" ||
              this.paginationLayout === "fill-left" ||
              this.paginationLayout === "fill-right"
                ? " flex-fill d-flex"
                : ""}"
              aria-hidden="true"
            >
              <button
                role="menuitem"
                type="button"
                tabindex="-1"
                aria-label="Go to last page"
                aria-controls="${this.id}"
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

  renderMinimizePagination() {
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
        : ""}"
    >
      <li
        role="presentation"
        aria-hidden="true"
        class="page-item${this.currentPage === 1 ? " disabled" : ""}"
      >
        <button
          role="menuitem"
          type="button"
          tabindex="-1"
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
        aria-hidden="true"
        class="page-item${this.currentPage === 1 ? " disabled" : ""}"
      >
        <button
          role="menuitem"
          type="button"
          tabindex="-1"
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
        class="page-item${this.currentPage === this.totalPages
          ? " disabled"
          : ""}"
        aria-hidden="true"
      >
        <button
          role="menuitem"
          type="button"
          tabindex="-1"
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
        class="page-item${this.currentPage === this.totalPages
          ? " disabled"
          : ""}"
        aria-hidden="true"
      >
        <button
          role="menuitem"
          type="button"
          tabindex="-1"
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

  renderByPagePagination() {
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
        : ""}"
    >
      <li
        role="presentation"
        aria-hidden="true"
        class="page-item${this.currentPage === 1 ? " disabled" : ""}"
      >
        <button
          role="menuitem"
          type="button"
          tabindex="-1"
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
        aria-hidden="true"
        class="page-item${this.currentPage === 1 ? " disabled" : ""}"
      >
        <button
          role="menuitem"
          type="button"
          tabindex="-1"
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
        <input
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          id="paginationInput"
          aria-labelledby="paginationInputLabel paginationDescription"
          class="form-control page-input${this.size === "sm" ? " basic-input-sm" : this.size === "lg" ? " basic-input-lg" : ""}"
          .value="${this.currentPage}"
          @change="${this._handleInputPageChange}"
        />
        of ${this.totalPages}
        </div>
      </li>
      <li
        role="presentation"
        class="page-item${this.currentPage === this.totalPages
          ? " disabled"
          : ""}"
        aria-hidden="true"
      >
        <button
          role="menuitem"
          type="button"
          tabindex="-1"
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
        class="page-item${this.currentPage === this.totalPages
          ? " disabled"
          : ""}"
        aria-hidden="true"
      >
        <button
          role="menuitem"
          type="button"
          tabindex="-1"
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

  render() {
    if (this.showSizeChanger && this.paginationLayout === "start") {
      return html`
        <div class="pagination-split-layout${this.plumage ? " plumage" : ""}">
          <div class="pagination-cell start">
            ${this.useMinimizePagination
              ? this.renderMinimizePagination()
              : this.useByPagePagination
              ? this.renderByPagePagination()
              : this.renderPagination()}
          </div>
          ${this.showDisplayRange
            ? html`<div
                class="pagination-cell row-display${this.size === "sm"
                  ? " sm"
                  : this.size === "lg"
                  ? " lg"
                  : ""}"
              >
                ${this.displayRange}
              </div>`
            : ""}
          <div class="pagination-cell end">
            ${this.plumage
              ? this.renderPlumageStyleSizeChanger()
              : this.renderSizeChanger()}
          </div>
        </div>
      `;
    } else if (this.showSizeChanger && this.paginationLayout === "center") {
      return html`
        <div class="pagination-split-layout${this.plumage ? " plumage" : ""}">
          <div class="pagination-cell center">
            ${this.useMinimizePagination
              ? this.renderMinimizePagination()
              : this.useByPagePagination
              ? this.renderByPagePagination()
              : this.renderPagination()}
          </div>
          ${this.showDisplayRange
            ? html`<div
                class="pagination-cell row-display${this.size === "sm"
                  ? " sm"
                  : this.size === "lg"
                  ? " lg"
                  : ""}"
              >
                ${this.displayRange}
              </div>`
            : ""}
          <div class="pagination-cell center">
            ${this.plumage
              ? this.renderPlumageStyleSizeChanger()
              : this.renderSizeChanger()}
          </div>
        </div>
      `;
    } else if (this.showSizeChanger && this.paginationLayout === "end") {
      return html`
        <div class="pagination-split-layout${this.plumage ? " plumage" : ""}">
          <div class="pagination-cell start">
            ${this.plumage
              ? this.renderPlumageStyleSizeChanger()
              : this.renderSizeChanger()}
          </div>
          ${this.showDisplayRange
            ? html`<div
                class="pagination-cell row-display${this.size === "sm"
                  ? " sm"
                  : this.size === "lg"
                  ? " lg"
                  : ""}"
              >
                ${this.displayRange}
              </div>`
            : ""}
          <div class="pagination-cell end">
            ${this.useMinimizePagination
              ? this.renderMinimizePagination()
              : this.useByPagePagination
              ? this.renderByPagePagination()
              : this.renderPagination()}
          </div>
        </div>
      `;
    } else if (this.showSizeChanger && this.paginationLayout === "fill-left") {
      return html`
        <div class="pagination-split-layout${this.plumage ? " plumage" : ""}">
          <div class="pagination-cell fill">
            ${this.useMinimizePagination
              ? this.renderMinimizePagination()
              : this.useByPagePagination
              ? this.renderByPagePagination()
              : this.renderPagination()}
          </div>
          ${this.showDisplayRange
            ? html`<div
                class="pagination-cell row-display${this.size === "sm"
                  ? " sm"
                  : this.size === "lg"
                  ? " lg"
                  : ""}"
              >
                ${this.displayRange}
              </div>`
            : ""}
          <div class="pagination-cell">
            ${this.plumage
              ? this.renderPlumageStyleSizeChanger()
              : this.renderSizeChanger()}
          </div>
        </div>
      `;
    } else if (this.showSizeChanger && this.paginationLayout === "fill-right") {
      return html`
        <div class="pagination-split-layout${this.plumage ? " plumage" : ""}">
          <div class="pagination-cell start">
            ${this.plumage
              ? this.renderPlumageStyleSizeChanger()
              : this.renderSizeChanger()}
          </div>
          ${this.showDisplayRange
            ? html`<div
                class="pagination-cell row-display${this.size === "sm"
                  ? " sm"
                  : this.size === "lg"
                  ? " lg"
                  : ""}"
              >
                ${this.displayRange}
              </div>`
            : ""}
          <div class="pagination-cell fill d-flex end">
            ${this.useMinimizePagination
              ? this.renderMinimizePagination()
              : this.useByPagePagination
              ? this.renderByPagePagination()
              : this.renderPagination()}
          </div>
        </div>
      `;
    } else {
      return html`
        <div
          class="pagination-layout${this.plumage ? " plumage" : ""}${this
            .paginationLayout === "fill"
            ? ""
            : " d-flex"}"
        >
          ${this.useMinimizePagination
            ? this.renderMinimizePagination()
            : this.useByPagePagination
            ? this.renderByPagePagination()
            : this.renderPagination()}
          ${this.showDisplayRange
            ? html`<div
                class="pagination-cell row-display${this.size === "sm"
                  ? " sm"
                  : this.size === "lg"
                  ? " lg"
                  : ""}${this.paginationLayout === "fill"
                  ? " fill"
                  : this.paginationLayout === "center"
                  ? " justify-content-center flex-fill50"
                  : this.paginationLayout === "end" || this.paginationLayout
                  ? " justify-content-end"
                  : ""}"
              >
                ${this.displayRange}
              </div>`
            : ""}
        </div>
      `;
    }
  }
}

customElements.define("pagination-component", PaginationComponent);
