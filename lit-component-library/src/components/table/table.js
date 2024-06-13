import { LitElement, html, css } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { classMap } from "lit/directives/class-map.js";
import { tableStyles } from "./table-styles.js";

class Table extends LitElement {
  static styles = [tableStyles, css``];

  static properties = {
    border: { type: Boolean },
    bordered: { type: Boolean },
    borderless: { type: Boolean },
    caption: { type: String },
    cloneFooter: { type: Boolean },
    dark: { type: Boolean },
    fields: { type: Array },
    fixed: { type: Boolean },
    headerDark: { type: Boolean },
    headerLight: { type: Boolean },
    hover: { type: Boolean },
    items: { type: Array },
    noBorderCollapsed: { type: Boolean },
    responsive: { type: Boolean },
    small: { type: Boolean },
    stacked: { type: Boolean },
    sticky: { type: Boolean },
    striped: { type: Boolean },
    tableVariant: { type: String },
    sortCriteria: { type: Array },
    sortable: { type: Boolean },
    expandedRows: { type: Array },
    selectMode: { type: String },
    selectedRows: { type: Array },
    selectedVariant: { type: String },
    sortField: { type: String },
    sortOrder: { type: String }
  };

  constructor() {
    super();
    this.border = false;
    this.bordered = false;
    this.borderless = false;
    this.caption = "";
    this.cloneFooter = false;
    this.dark = false;
    this.fields = [];
    this.fixed = false;
    this.headerDark = false;
    this.headerLight = false;
    this.hover = false;
    this.items = [];
    this.noBorderCollapsed = false;
    this.responsive = false;
    this.small = false;
    this.stacked = false;
    this.sticky = false;
    this.striped = false;
    this.tableVariant = "table";
    this.sortCriteria = [];
    this.sortable = false;
    this.expandedRows = [];
    this.selectMode = "";
    this.selectedRows = [];
    this.selectedVariant = "table-active";
    this.sortField = "";
    this.sortOrder = "asc";
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('sort-field-changed', this.handleFieldChanged.bind(this));
    this.addEventListener('sort-order-changed', this.handleOrderChanged.bind(this));
    console.log('Event listeners added');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('sort-field-changed', this.handleFieldChanged.bind(this));
    this.removeEventListener('sort-order-changed', this.handleOrderChanged.bind(this));
  }

  handleFieldChanged(event) {
    console.log('Sort field event triggered:', event.detail.value);
    this.sortField = event.detail.value;
    this.applySort();
  }

  handleOrderChanged(event) {
    console.log('Sort order event triggered:', event.detail.value);
    this.sortOrder = event.detail.value;
    this.applySort();
  }

  applySort() {
    if (!this.sortField) return;

    console.log('Applying sort:', this.sortField, this.sortOrder);
    this.sortCriteria = [{ key: this.sortField, order: this.sortOrder }];
    this.items = [...this.items].sort((a, b) => {
      const aValue = a[this.sortField];
      const bValue = b[this.sortField];
      const order = this.sortOrder === "asc" ? 1 : -1;

      if (aValue < bValue) return -order;
      if (aValue > bValue) return order;
      return 0;
    });
    console.log('Sorted items:', this.items);
    this.clearSelection();
    this.requestUpdate();

    // Dispatch custom events to update the select-field-components
    const sortFieldEvent = new CustomEvent('sort-field-updated', {
      detail: { value: this.sortField || '--none--' }
    });
    console.log('Dispatching sort-field-updated event:', sortFieldEvent);
    window.dispatchEvent(sortFieldEvent);

    const sortOrderEvent = new CustomEvent('sort-order-updated', {
      detail: { value: this.sortOrder || '--none--' }
    });
    console.log('Dispatching sort-order-updated event:', sortOrderEvent);
    window.dispatchEvent(sortOrderEvent);
  }

  clearSelection() {
    this.selectedRows = [];
    this.dispatchEvent(new CustomEvent("row-selected", { detail: [] }));
  }

  tableVariantColor(variant) {
    switch (variant) {
      case "primary":
        return "table-primary";
      case "secondary":
        return "table-secondary";
      case "success":
        return "table-success";
      case "danger":
        return "table-danger";
      case "info":
        return "table-info";
      case "warning":
        return "table-warning";
      case "dark":
        return "table-dark";
      case "light":
        return "table-light";
      default:
        return "";
    }
  }

  headertheme() {
    if (this.headerDark) {
      return "thead-dark";
    } else if (this.headerLight) {
      return "thead-light";
    }
    return "";
  }

  get normalizedFields() {
    if (this.fields.length > 0) {
      return this.fields.map((field) => {
        if (typeof field === "string") {
          return {
            key: field,
            label: this.formatHeader(field),
            sortable: false,
            variant: "",
          };
        }
        return {
          key: field.key,
          label: field.label || this.formatHeader(field.key),
          sortable: field.sortable || false,
          variant: field.variant || "",
        };
      });
    } else if (this.items.length > 0) {
      return Object.keys(this.items[0])
        .filter(
          (key) =>
            key !== "_cellVariants" &&
            key !== "_rowVariant" &&
            key !== "_showDetails" &&
            key !== "_additionalInfo"
        )
        .map((key) => ({
          key,
          label: this.formatHeader(key),
          sortable: false,
          variant: "",
        }));
    } else {
      return [];
    }
  }

  formatHeader(key) {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  sortItems(event, key) {
    if (!this.sortable) return;

    const existingSort = this.sortCriteria.find(
      (criteria) => criteria.key === key
    );

    if (event.ctrlKey || event.metaKey) {
      if (existingSort) {
        if (existingSort.order === "asc") {
          existingSort.order = "desc";
        } else if (existingSort.order === "desc") {
          this.sortCriteria = this.sortCriteria.filter((c) => c.key !== key);
        } else {
          this.sortCriteria.push({ key, order: "asc" });
        }
      } else {
        this.sortCriteria.push({ key, order: "asc" });
      }
    } else {
      this.sortCriteria = [];
      if (existingSort) {
        if (existingSort.order === "asc") {
          this.sortCriteria = [{ key, order: "desc" }];
        } else if (existingSort.order === "desc") {
          this.sortCriteria = [];
        } else {
          this.sortCriteria = [{ key, order: "asc" }];
        }
      } else {
        this.sortCriteria = [{ key, order: "asc" }];
      }
    }

    if (this.sortCriteria.length === 0) {
      this.sortField = "";
      this.sortOrder = "";
    } else {
      this.sortField = this.sortCriteria[0]?.key;
      this.sortOrder = this.sortCriteria[0]?.order;
    }

    this.items = [...this.items].sort((a, b) => {
      for (const criteria of this.sortCriteria) {
        const aValue = a[criteria.key];
        const bValue = b[criteria.key];
        const order = criteria.order === "asc" ? 1 : -1;

        if (aValue < bValue) return -order;
        if (aValue > bValue) return order;
      }
      return 0;
    });

    this.clearSelection();
    this.requestUpdate();

    const sortFieldEvent = new CustomEvent('sort-field-updated', {
      detail: { value: this.sortField || '--none--' }
    });
    console.log('Dispatching sort-field-updated event:', sortFieldEvent);
    window.dispatchEvent(sortFieldEvent);

    const sortOrderEvent = new CustomEvent('sort-order-updated', {
      detail: { value: this.sortOrder || '--none--' }
    });
    console.log('Dispatching sort-order-updated event:', sortOrderEvent);
    window.dispatchEvent(sortOrderEvent);
  }

  getAriaSort(key) {
    if (!this.sortable) return null;

    const criteria = this.sortCriteria.find((c) => c.key === key);
    if (criteria) {
      return criteria.order === "asc"
        ? "ascending"
        : criteria.order === "desc"
        ? "descending"
        : "none";
    }
    return "none";
  }

  renderSortIndicator(key) {
    if (!this.sortable) return "";

    const criteria = this.sortCriteria.find((c) => c.key === key);
    if (criteria) {
      const order =
        criteria.order === "asc"
          ? "ascending"
          : criteria.order === "desc"
          ? "descending"
          : "none";
      const index =
        this.sortCriteria.length > 1
          ? this.sortCriteria.indexOf(criteria) + 1
          : "";
      return html`<i class="sort-icon ${order}"></i>${index
          ? html`<sup>${index}</sup>`
          : ""}`;
    }
    return html`<i class="sort-icon none"></i>`;
  }

  evaluateTemplateLiteral(template, data) {
    return new Function("return `" + template + "`;").call(data);
  }

  renderDetails(row) {
    const content = row._additionalInfo
      ? this.evaluateTemplateLiteral(row._additionalInfo, row)
      : "No additional information";
    return html` <div class="details">${unsafeHTML(content)}</div> `;
  }

  renderTableHeader() {
    const hasDetailsRows = this.items.some((row) => row._showDetails);

    let headerIconClass;
    if (this.selectedRows.length === this.items.length) {
      headerIconClass = "check-icon";
    } else if (this.selectedRows.length > 0) {
      headerIconClass = "partial-icon";
    } else {
      headerIconClass = "square-outline-icon";
    }

    return html`
      <tr role="row">
        ${["single", "multi", "range"].includes(this.selectMode)
          ? html` <th class="select-col" @click="${this.selectAllRows}">
              <button class="${headerIconClass} select-row-btns"></button>
            </th>`
          : ""}
        ${hasDetailsRows ? html`<th class="toggle-col"></th>` : ""}
        ${this.normalizedFields.map(
          ({ key, label, sortable, variant }, index) =>
            sortable && this.sortable
              ? html`<th
                  role="columnheader"
                  scope="col"
                  aria-colindex="${index + 1}"
                  aria-sort="${this.getAriaSort(key)}"
                  class="${this.tableVariantColor(variant)}"
                  @click="${(event) => this.sortItems(event, key)}"
                  style="cursor: pointer;"
                >
                  ${label} ${this.renderSortIndicator(key)}
                </th>`
              : html`<th
                  role="columnheader"
                  scope="col"
                  aria-colindex="${index + 1}"
                  class="${this.tableVariantColor(variant)}"
                >
                  ${label}
                </th>`
        )}
      </tr>
    `;
  }

  renderTable() {
    const tableVariantColor = this.tableVariantColor(this.tableVariant);
    const hasDetailsRows = this.items.some((row) => row._showDetails);

    const selectableClasses = {
      "b-table-select-single": this.selectMode === "single",
      "b-table-select-multi": this.selectMode === "multi",
      "b-table-select-range": this.selectMode === "range",
      "b-table-selecting": this.selectedRows.length > 0,
    };

    const baseClasses = {
      table: true,
      "b-table": true,
      "table-hover": this.hover,
      "table-striped": this.striped,
      "table-bordered": this.bordered,
      "table-borderless": this.borderless,
      "table-sm": this.small,
      "table-dark": this.dark,
      "b-table-fixed": this.fixed,
      "b-table-no-border-collapse": this.noBorderCollapsed,
      "b-table-caption-top": this.caption === "top",
      "b-table-stacked": this.stacked,
    };

    const combinedClasses = {
      ...baseClasses,
      ...selectableClasses,
      [tableVariantColor]: true,
    };

    return html`
      <table
        role="table"
        aria-colcount="${this.normalizedFields.length +
        (hasDetailsRows ? 1 : 0) +
        (["single", "multi", "range"].includes(this.selectMode) ? 1 : 0)}"
        aria-multiselectable="${this.selectMode !== "single"}"
        class=${classMap(combinedClasses)}
      >
        ${this.caption === "top"
          ? html`<caption>
              <slot name="caption"></slot>
            </caption>`
          : ""}
        <thead role="rowgroup" class="${this.headertheme()}">
          ${this.renderTableHeader()}
        </thead>
        <tbody role="rowgroup">
          ${this.items.flatMap((row, rowIndex) => {
            const rowVariantClass = row._rowVariant
              ? this.tableVariantColor(row._rowVariant)
              : "";
            const isSelected = this.selectedRows.includes(row);
            const isExpanded = this.expandedRows.includes(rowIndex);
            return [
              html`
                <tr
                  role="row"
                  class="${rowVariantClass} ${isSelected
                    ? "b-table-row-selected " + this.selectedVariant
                    : ""}"
                  tabindex="0"
                  aria-selected="${isSelected ? "true" : "false"}"
                >
                  ${["single", "multi", "range"].includes(this.selectMode)
                    ? html` <td
                        class="select-col"
                        @click="${(event) => this.selectRow(event, rowIndex)}"
                      >
                        ${isSelected
                          ? html`<button class="check-icon select-row-btns"></button>`
                          : html`<button class="square-outline-icon select-row-btns"></button>`}
                      </td>`
                    : ""}
                  ${row._showDetails
                    ? html`<td
                        @click="${() => this.toggleDetails(rowIndex)}"
                        style="cursor: pointer;"
                      >
                        <button
                          class="caret-icon ${isExpanded
                            ? "rotate-down"
                            : "rotate-up"}"
                        ></button>
                      </td>`
                    : hasDetailsRows
                    ? html`<td></td>`
                    : ""}
                  ${this.normalizedFields.map(({ key, variant }, index) => {
                    const cell = row[key];
                    const cellVariant =
                      row._cellVariants && row._cellVariants[key]
                        ? this.tableVariantColor(row._cellVariants[key])
                        : this.tableVariantColor(variant);
                    return html`<td
                      aria-colindex="${index + 1}"
                      role="cell"
                      class="${cellVariant}"
                    >
                      ${cell}
                    </td>`;
                  })}
                </tr>
              `,
              row._showDetails
                ? html`
                    <tr
                      role="row"
                      class="details-row"
                      ?expanded="${isExpanded}"
                    >
                      <td
                        colspan="${this.normalizedFields.length +
                        1 +
                        (["single", "multi", "range"].includes(this.selectMode)
                          ? 1
                          : 0)}"
                      >
                        <div>${this.renderDetails(row)}</div>
                      </td>
                    </tr>
                  `
                : null,
            ];
          })}
        </tbody>
        ${this.caption === "bottom"
          ? html`<caption>
              <slot name="caption"></slot>
            </caption>`
          : ""}
        ${this.cloneFooter
          ? html` <tfoot role="rowgroup" class="${this.headertheme()}">
              ${this.renderTableHeader()}
            </tfoot>`
          : ""}
      </table>
    `;
  }

  render() {
    if (this.responsive) {
      return html`<div class="table-responsive">${this.renderTable()}</div>`;
    } else if (this.sticky) {
      return html`<div class="b-table-sticky-header">
        ${this.renderTable()}
      </div>`;
    } else {
      return this.renderTable();
    }
  }

  updated(changedProperties) {
    if (changedProperties.has("items")) {
      this.items.forEach((row, index) => {
        if (row._showDetails) {
          this.dispatchEvent(
            new CustomEvent("render-row-details", {
              detail: { rowData: row, rowIndex: index },
              bubbles: true,
              composed: true,
            })
          );
        }
      });
    }
  }

  resetSort() {
    this.sortCriteria = [];
    this.sortField = "";
    this.sortOrder = "";
    this.clearSelection();
    this.requestUpdate();

    const sortFieldEvent = new CustomEvent('sort-field-updated', {
      detail: { value: '--none--' }
    });
    console.log('Dispatching sort-field-updated event:', sortFieldEvent);
    window.dispatchEvent(sortFieldEvent);

    const sortOrderEvent = new CustomEvent('sort-order-updated', {
      detail: { value: '--none--' }
    });
    console.log('Dispatching sort-order-updated event:', sortOrderEvent);
    window.dispatchEvent(sortOrderEvent);
  }

  toggleDetails(rowIndex) {
    const index = this.expandedRows.indexOf(rowIndex);
    if (index === -1) {
      this.expandedRows = [...this.expandedRows, rowIndex];
    } else {
      this.expandedRows = this.expandedRows.filter((i) => i !== rowIndex);
    }
    this.requestUpdate();
  }

  selectRow(event, rowIndex) {
    const row = this.items[rowIndex];
    if (this.selectMode === "single") {
      if (this.selectedRows.includes(row)) {
        this.selectedRows = [];
      } else {
        this.selectedRows = [row];
      }
    } else if (this.selectMode === "multi") {
      if (this.selectedRows.includes(row)) {
        this.selectedRows = this.selectedRows.filter((r) => r !== row);
      } else {
        this.selectedRows = [...this.selectedRows, row];
      }
    } else if (this.selectMode === "range") {
      if (event.shiftKey) {
        const lastSelectedIndex = this.items.indexOf(
          this.selectedRows[this.selectedRows.length - 1]
        );
        const rangeStart = Math.min(lastSelectedIndex, rowIndex);
        const rangeEnd = Math.max(lastSelectedIndex, rowIndex);
        const rangeRows = this.items.slice(rangeStart, rangeEnd + 1);
        this.selectedRows = Array.from(
          new Set([...this.selectedRows, ...rangeRows])
        );
      } else if (event.ctrlKey || event.metaKey) {
        if (this.selectedRows.includes(row)) {
          this.selectedRows = this.selectedRows.filter((r) => r !== row);
        } else {
          this.selectedRows = [...this.selectedRows, row];
        }
      } else {
        this.selectedRows = [row];
      }
    }
    this.requestUpdate();
    this.dispatchEvent(
      new CustomEvent("row-selected", { detail: this.selectedRows })
    );
  }

  selectAllRows() {
    if (
      this.selectedRows.length === this.items.length ||
      this.selectedRows.length > 0
    ) {
      this.clearSelection();
    } else {
      this.selectedRows = [...this.items];
      this.dispatchEvent(
        new CustomEvent("row-selected", { detail: this.selectedRows })
      );
    }
    this.requestUpdate();
  }
}

customElements.define("table-component", Table);
