// src/components/table/table.js
import { LitElement, html, css } from "lit";
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
  };

  constructor() {
    super();
    this.border = false;
    this.bordered = false;
    this.borderless = false;
    this.caption = "";
    this.cloneFooter = false;
    this.dark = false;
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
        return ""; // Default color if no variant or unrecognized variant
    }
  }

  renderTable() {
    const tableVariantColor = this.tableVariantColor(this.tableVariant);
    return html`
      <table
        role="table"
        aria-colcount="${this.items.length > 0
          ? Object.keys(this.items[0]).filter(key => key !== '_cellVariants' && key !== '_rowVariant').length
          : 0}"
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
          : ""}${this.caption === "top" ? " b-table-caption-top" : ""}${this.stacked
          ? " b-table-stacked"
          : ""}${" " + tableVariantColor}"
      >
        ${this.caption === "top"
          ? html`<caption>
              <slot name="caption"></slot>
            </caption>`
          : ""}
        ${this.stacked
          ? html`
              <tbody role="rowgroup">
                ${this.items.map((row) => {
                  const rowVariantClass = row._rowVariant ? this.tableVariantColor(row._rowVariant) : "";
                  return html`
                    <tr role="row" class="${rowVariantClass}">
                      ${Object.entries(row)
                        .filter(([key]) => key !== '_cellVariants' && key !== '_rowVariant')
                        .map(([key, cell], index) => {
                          const variant =
                            row._cellVariants && row._cellVariants[key]
                              ? this.tableVariantColor(row._cellVariants[key])
                              : "";
                          return html`<td
                            aria-colindex="${index + 1}"
                            data-label="${this.formatHeader(key)}"
                            role="cell"
                            class="${variant}"
                          >
                            <div>${cell}</div>
                          </td>`;
                        })}
                    </tr>
                  `;
                })}
              </tbody>
            `
          : html` <thead role="rowgroup" class="${this.headertheme()}">
                <tr role="row">
                  ${this.items.length > 0
                    ? Object.keys(this.items[0])
                        .filter(key => key !== '_cellVariants' && key !== '_rowVariant')
                        .map(
                          (key, index) =>
                            html`<th
                              role="columnheader"
                              scope="col"
                              aria-colindex="${index + 1}"
                            >
                              ${this.formatHeader(key)}
                            </th>`
                        )
                    : ""}
                </tr>
              </thead>
              <tbody role="rowgroup">
                ${this.items.map((row) => {
                  const rowVariantClass = row._rowVariant ? this.tableVariantColor(row._rowVariant) : "";
                  return html`
                    <tr role="row" class="${rowVariantClass}">
                      ${Object.entries(row)
                        .filter(([key]) => key !== '_cellVariants' && key !== '_rowVariant')
                        .map(([key, cell], index) => {
                          const variant =
                            row._cellVariants && row._cellVariants[key]
                              ? this.tableVariantColor(row._cellVariants[key])
                              : "";
                          return html`<td
                            aria-colindex="${index + 1}"
                            role="cell"
                            class="${variant}"
                          >
                            ${cell}
                          </td>`;
                        })}
                    </tr>
                  `;
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
                      ${this.items.length > 0
                        ? Object.keys(this.items[0])
                            .filter(key => key !== '_cellVariants' && key !== '_rowVariant')
                            .map(
                              (key, index) =>
                                html`<th
                                  role="columnheader"
                                  scope="col"
                                  aria-colindex="${index + 1}"
                                >
                                  ${this.formatHeader(key)}
                                </th>`
                            )
                        : ""}
                    </tr>
                  </tfoot>`
                : ""}`}
      </table>
    `;
  }

  render() {
    if (this.responsive) {
      return html`<div class="table-responsive">${this.renderTable()}</div>`;
    } else if (this.sticky) {
      return html`<div class="b-table-sticky-header">${this.renderTable()}</div>`;
    } else {
      return this.renderTable();
    }
  }
}

customElements.define("table-component", Table);
