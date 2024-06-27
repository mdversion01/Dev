import { LitElement, html, css } from "lit";

class PaginationComponent extends LitElement {
  static properties = {
    currentPage: { type: Number },
    totalPages: { type: Number },
    limit: { type: Number },
    hideGotoEndButtons: { type: Boolean },
    hideEllipsis: { type: Boolean },
    pageSize: { type: Number },
    pageSizeOptions: { type: Array },
    showSizeChanger: { type: Boolean },
    size: { type: String },
    onChange: { type: Function },
    onShowSizeChange: { type: Function },
  };

  constructor() {
    super();
    this.currentPage = 1;
    this.totalPages = 1;
    this.limit = 5;
    this.hideGotoEndButtons = false;
    this.hideEllipsis = false;
    this.pageSize = 10;
    this.pageSizeOptions = [10, 20, 50, 100, "All"];
    this.showSizeChanger = true;
    this.size = "default";
  }

  static styles = css`
    .pagination {
      display: flex;
      list-style-type: none;
      padding: 0;
    }
    .pagination li {
      margin: 0 5px;
    }
    .pagination button {
      padding: 5px 10px;
    }
    .size-changer {
      margin-left: auto;
    }
  `;

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
    return this.hideEllipsis ? "" : html`<li><span>...</span></li>`;
  }

  _renderPageButton(page) {
    return html`
      <li>
        <button
          @click="${() => this._changePage(page)}"
          ?disabled="${this.currentPage === page}"
        >
          ${page}
        </button>
      </li>
    `;
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

  render() {
    return html`
      <ul class="pagination">
        ${!this.hideGotoEndButtons
          ? html`
              <li>
                <button
                  @click="${this._firstPage}"
                  ?disabled="${this.currentPage === 1}"
                >
                  First
                </button>
              </li>
              <li>
                <button
                  @click="${this._prevPage}"
                  ?disabled="${this.currentPage === 1}"
                >
                  Previous
                </button>
              </li>
            `
          : ""}
        ${this._generatePageButtons()}
        ${!this.hideGotoEndButtons
          ? html`
              <li>
                <button
                  @click="${this._nextPage}"
                  ?disabled="${this.currentPage === this.totalPages}"
                >
                  Next
                </button>
              </li>
              <li>
                <button
                  @click="${this._lastPage}"
                  ?disabled="${this.currentPage === this.totalPages}"
                >
                  Last
                </button>
              </li>
            `
          : ""}
      </ul>
      ${this.showSizeChanger
        ? html`
            <div class="size-changer">
              <label for="pageSize">Items per page: </label>
              <select id="pageSize" @change="${this._handlePageSizeChange}">
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
            </div>
          `
        : ""}
    `;
  }
}

customElements.define("pagination-component", PaginationComponent);
