// src/components/table/table.js
import { LitElement, html, css } from "lit";
import { tableStyles } from "./table-styles.js";

class Table extends LitElement {
  static styles = [tableStyles, css`
    /* th[aria-sort="ascending"]::after {
      content: "▲";
      margin-left: 0.5em;
    }

    th[aria-sort="descending"]::after {
      content: "▼";
      margin-left: 0.5em;
    }

    th[aria-sort="none"]::after {
      content: "⇅";
      margin-left: 0.5em;
    } */
  `];

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
    sortable: { type: Boolean }, // New property to enable or disable sorting
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
    this.sortable = false; // Default sorting to false
  }

  get normalizedFields() {
    if (this.fields.length > 0) {
      return this.fields.map(field => {
        if (typeof field === 'string') {
          return { key: field, label: this.formatHeader(field), sortable: false, variant: "" };
        }
        return {
          key: field.key,
          label: field.label || this.formatHeader(field.key),
          sortable: field.sortable || false,
          variant: field.variant || ""
        };
      });
    } else if (this.items.length > 0) {
      return Object.keys(this.items[0])
        .filter(key => key !== '_cellVariants' && key !== '_rowVariant' && key !== '_showDetails')
        .map(key => ({ key, label: this.formatHeader(key), sortable: false, variant: "" }));
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

  headertheme() {
    if (this.headerDark) {
      return "thead-dark";
    } else if (this.headerLight) {
      return "thead-light";
    }
    return "";
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

  sortItems(key) {
    if (!this.sortable) return;

    const existingSort = this.sortCriteria.find(criteria => criteria.key === key);

    if (existingSort) {
      existingSort.order = existingSort.order === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortCriteria.push({ key, order: 'asc' });
    }

    this.items = [...this.items].sort((a, b) => {
      for (const criteria of this.sortCriteria) {
        const aValue = a[criteria.key];
        const bValue = b[criteria.key];
        const order = criteria.order === 'asc' ? 1 : -1;

        if (aValue < bValue) return -order;
        if (aValue > bValue) return order;
      }
      return 0;
    });

    this.requestUpdate();
  }

  getAriaSort(key) {
    if (!this.sortable) return null;

    const criteria = this.sortCriteria.find(c => c.key === key);
    if (criteria) {
      return criteria.order === 'asc' ? 'ascending' : 'descending';
    }
    return 'none';
  }

  renderSortIndicator(key) {
    if (!this.sortable) return '';

    const criteria = this.sortCriteria.find(c => c.key === key);
    if (criteria) {
      const index = this.sortCriteria.indexOf(criteria) + 1;
      return html`<sup>${index}</sup>`;
    }
    return '';
  }

  renderDetails(row, rowIndex) {
    return html`<slot
      name="row-details"
      .rowData="${row}"
      .rowIndex="${rowIndex}"
    ></slot>`;
  }

  renderTable() {
    const tableVariantColor = this.tableVariantColor(this.tableVariant);
    return html`
      <table
        role="table"
        aria-colcount="${this.normalizedFields.length}"
        class="table b-table${this.hover ? " table-hover" : ""}${this.striped
          ? " table-striped"
          : ""}${this.bordered ? " table-bordered" : ""}${this.borderless
          ? " table-borderless"
          : ""}${this.border ? " table-bordered" : ""}${this.small
          ? " table-sm"
          : ""}${this.dark ? " table-dark" : ""}${this.fixed
          ? " b-table-fixed"
          : ""}${this.noBorderCollapsed
          ? " b-table-no-border-collapse"
          : ""}${this.caption === "top" ? " b-table-caption-top" : ""}${this
          .stacked
          ? " b-table-stacked"
          : ""}${" " + tableVariantColor}"
      >
        ${this.caption === "top"
          ? html`<caption>
              <slot name="caption"></slot>
            </caption>`
          : ""}
        <thead role="rowgroup" class="${this.headertheme()}">
          <tr role="row">
            ${this.normalizedFields.map(({ key, label, sortable, variant }, index) =>
              sortable && this.sortable
                ? html`<th
                    role="columnheader"
                    scope="col"
                    aria-colindex="${index + 1}"
                    aria-sort="${this.getAriaSort(key)}"
                    class="${this.tableVariantColor(variant)}"
                    @click="${() => this.sortItems(key)}"
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
        </thead>
        <tbody role="rowgroup">
          ${this.items.flatMap((row, rowIndex) => {
            const rowVariantClass = row._rowVariant ? this.tableVariantColor(row._rowVariant) : "";
            return [
              html`
                <tr role="row" class="${rowVariantClass}">
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
                    <tr role="row" class="row-details">
                      <td colspan="${this.normalizedFields.length}">
                        ${this.renderDetails(row, rowIndex)}
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
              <tr role="row">
                ${this.normalizedFields.map(({ key, label, variant }, index) =>
                  html`<th
                    role="columnheader"
                    scope="col"
                    aria-colindex="${index + 1}"
                    class="${this.tableVariantColor(variant)}"
                  >
                    ${label}
                  </th>`
                )}
              </tr>
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
}

customElements.define("table-component", Table);
