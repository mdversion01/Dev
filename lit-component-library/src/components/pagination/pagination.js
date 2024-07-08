import { LitElement, html, css } from "lit";
import { inputFieldStyles } from "../input-field/input-field-styles.js"; // Import your custom input field component
import { selectFieldStyles } from "../select-field/select-field-styles.js"; // Import your custom select field component
import { plSelectFieldStyles } from "../pl-select-field/pl-select-field-styles.js"; // Import your custom select field component
import { paginationStyles } from "./pagination-styles.js";
import "./standard-pagination.js";
import "./minimize-pagination.js";
import "./by-page-pagination.js";

class PaginationComponent extends LitElement {
  // Define the styles for the component
  static styles = [
    inputFieldStyles,
    selectFieldStyles,
    plSelectFieldStyles,
    paginationStyles,
    css``,
  ];

  // Define the properties for the component
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
    useMinimizePagination: { type: Boolean },
    useByPagePagination: { type: Boolean },
  };

  constructor() {
    super();
    this.paginationLayout = "";
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
    this.useMinimizePagination = false;
    this.useByPagePagination = false;
    this.pageSize = this.showSizeChanger
      ? this.pageSizeOptions
          .filter((size) => size !== "All")
          .sort((a, b) => a - b)[0]
      : 10;
  }

  // Method to handle page change events
  _changePage(e) {
    const { page } = e.detail;
    this.currentPage = page;
    this.dispatchEvent(
      new CustomEvent("page-changed", {
        detail: { page, pageSize: this.pageSize },
      })
    );
    if (this.onChange) {
      this.onChange(this.currentPage, this.pageSize);
    }
  }

  // Method to handle page size change events
  _handlePageSizeChange(e) {
    const newSize =
      e.target.value === "All" ? "All" : parseInt(e.target.value, 10);
    this.pageSize = newSize;
    this.currentPage = 1;
    this.dispatchEvent(
      new CustomEvent("page-size-changed", { detail: { pageSize: newSize } })
    );
    if (this.onShowSizeChange) {
      this.onShowSizeChange(this.currentPage, newSize);
    }
    this._changePage({ detail: { page: 1 } });
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

  // Render the page size changer select box
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

  // Render the Plumage style page size changer select box
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

  // Calculate and return the display range text
  get displayRange() {
    const startRow = (this.currentPage - 1) * this.pageSize + 1;
    const endRow = Math.min(this.currentPage * this.pageSize, this.totalRows);
    return `${startRow}-${endRow} of ${this.totalRows}`;
  }

  render() {
    if (this.showSizeChanger && this.paginationLayout === "start") {
      return html`
        <div class="pagination-split-layout${this.plumage ? " plumage" : ""}">
          <div class="pagination-cell start">
            ${this.useMinimizePagination
              ? html`<minimize-pagination
                  .currentPage="${this.currentPage}"
                  .totalPages="${this.totalPages}"
                  .goToButtons="${this.goToButtons}"
                  @change-page="${this._changePage}"
                  .size="${this.size}"
                  .plumage="${this.plumage}"
                ></minimize-pagination>`
              : this.useByPagePagination
              ? html`<by-page-pagination
                  .currentPage="${this.currentPage}"
                  .totalPages="${this.totalPages}"
                  .goToButtons="${this.goToButtons}"
                  @change-page="${this._changePage}"
                  .size="${this.size}"
                  .plumage="${this.plumage}"
                ></by-page-pagination>`
              : html`<standard-pagination
                  .currentPage="${this.currentPage}"
                  .totalPages="${this.totalPages}"
                  .hideGotoEndButtons="${this.hideGotoEndButtons}"
                  .goToButtons="${this.goToButtons}"
                  @change-page="${this._changePage}"
                  .size="${this.size}"
                  .plumage="${this.plumage}"
                ></standard-pagination>`}
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
              ? html`<minimize-pagination
                  .currentPage="${this.currentPage}"
                  .totalPages="${this.totalPages}"
                  .goToButtons="${this.goToButtons}"
                  @change-page="${this._changePage}"
                  .size="${this.size}"
                  .plumage="${this.plumage}"
                ></minimize-pagination>`
              : this.useByPagePagination
              ? html`<by-page-pagination
                  .currentPage="${this.currentPage}"
                  .totalPages="${this.totalPages}"
                  .goToButtons="${this.goToButtons}"
                  @change-page="${this._changePage}"
                  .size="${this.size}"
                  .plumage="${this.plumage}"
                ></by-page-pagination>`
              : html`<standard-pagination
                  .currentPage="${this.currentPage}"
                  .totalPages="${this.totalPages}"
                  .hideGotoEndButtons="${this.hideGotoEndButtons}"
                  .goToButtons="${this.goToButtons}"
                  @change-page="${this._changePage}"
                  .size="${this.size}"
                  .plumage="${this.plumage}"
                ></standard-pagination>`}
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
              ? html`<minimize-pagination
                  .currentPage="${this.currentPage}"
                  .totalPages="${this.totalPages}"
                  .goToButtons="${this.goToButtons}"
                  @change-page="${this._changePage}"
                  .size="${this.size}"
                  .plumage="${this.plumage}"
                ></minimize-pagination>`
              : this.useByPagePagination
              ? html`<by-page-pagination
                  .currentPage="${this.currentPage}"
                  .totalPages="${this.totalPages}"
                  .goToButtons="${this.goToButtons}"
                  @change-page="${this._changePage}"
                  .plumage="${this.plumage}"
                  .size="${this.size}"
                ></by-page-pagination>`
              : html`<standard-pagination
                  .currentPage="${this.currentPage}"
                  .totalPages="${this.totalPages}"
                  .hideGotoEndButtons="${this.hideGotoEndButtons}"
                  .goToButtons="${this.goToButtons}"
                  @change-page="${this._changePage}"
                  .size="${this.size}"
                  .plumage="${this.plumage}"
                ></standard-pagination>`}
          </div>
        </div>
      `;
    } else if (this.showSizeChanger && this.paginationLayout === "fill-left") {
      return html`
        <div class="pagination-split-layout${this.plumage ? " plumage" : ""}">
          <div class="pagination-cell fill">
            ${this.useMinimizePagination
              ? html`<minimize-pagination
                  .currentPage="${this.currentPage}"
                  .totalPages="${this.totalPages}"
                  .goToButtons="${this.goToButtons}"
                  @change-page="${this._changePage}"
                  .size="${this.size}"
                  .plumage="${this.plumage}"
                ></minimize-pagination>`
              : this.useByPagePagination
              ? html`<by-page-pagination
                  .currentPage="${this.currentPage}"
                  .totalPages="${this.totalPages}"
                  .goToButtons="${this.goToButtons}"
                  @change-page="${this._changePage}"
                  .size="${this.size}"
                  .plumage="${this.plumage}"
                ></by-page-pagination>`
              : html`<standard-pagination
                  .currentPage="${this.currentPage}"
                  .totalPages="${this.totalPages}"
                  .hideGotoEndButtons="${this.hideGotoEndButtons}"
                  .goToButtons="${this.goToButtons}"
                  @change-page="${this._changePage}"
                  .size="${this.size}"
                  .plumage="${this.plumage}"
                ></standard-pagination>`}
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
              ? html`<minimize-pagination
                  .currentPage="${this.currentPage}"
                  .totalPages="${this.totalPages}"
                  .goToButtons="${this.goToButtons}"
                  @change-page="${this._changePage}"
                  .size="${this.size}"
                  .plumage="${this.plumage}"
                ></minimize-pagination>`
              : this.useByPagePagination
              ? html`<by-page-pagination
                  .currentPage="${this.currentPage}"
                  .totalPages="${this.totalPages}"
                  .goToButtons="${this.goToButtons}"
                  @change-page="${this._changePage}"
                  .size="${this.size}"
                  .plumage="${this.plumage}"
                ></by-page-pagination>`
              : html`<standard-pagination
                  .currentPage="${this.currentPage}"
                  .totalPages="${this.totalPages}"
                  .hideGotoEndButtons="${this.hideGotoEndButtons}"
                  .goToButtons="${this.goToButtons}"
                  @change-page="${this._changePage}"
                  .size="${this.size}"
                  .plumage="${this.plumage}"
                ></standard-pagination>`}
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
            ? html`<minimize-pagination
                .currentPage="${this.currentPage}"
                .totalPages="${this.totalPages}"
                .goToButtons="${this.goToButtons}"
                @change-page="${this._changePage}"
                .size="${this.size}"
                .plumage="${this.plumage}"
              ></minimize-pagination>`
            : this.useByPagePagination
            ? html`<by-page-pagination
                .currentPage="${this.currentPage}"
                .totalPages="${this.totalPages}"
                .goToButtons="${this.goToButtons}"
                @change-page="${this._changePage}"
                .size="${this.size}"
                .plumage="${this.plumage}"
              ></by-page-pagination>`
            : html`<standard-pagination
                .currentPage="${this.currentPage}"
                .totalPages="${this.totalPages}"
                .hideGotoEndButtons="${this.hideGotoEndButtons}"
                .goToButtons="${this.goToButtons}"
                @change-page="${this._changePage}"
                .size="${this.size}"
                .plumage="${this.plumage}"
              ></standard-pagination>`}
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
