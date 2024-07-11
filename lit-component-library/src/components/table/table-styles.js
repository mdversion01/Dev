import { css } from "lit";

export const tableStyles = css`
  *,
  :after,
  :before {
    box-sizing: border-box;
  }

  caption {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    color: #6c757d;
    text-align: left;
    caption-side: bottom;
  }

  sub,
  sup {
    position: relative;
    font-size: 75%;
    line-height: 0;
    vertical-align: baseline;
  }

  sup {
    top: -0.5em;
    left: -0.25em;
    font-size: 0.625rem !important;
  }

  .reset-sort-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ctitle%3Esort-variant-remove%3C/title%3E%3Cpath d='M3 13H15V11H3M3 6V8H21V6M3 18H9V16H3V18M22.54 16.88L20.41 19L22.54 21.12L21.12 22.54L19 20.41L16.88 22.54L15.47 21.12L17.59 19L15.47 16.88L16.88 15.47L19 17.59L21.12 15.46L22.54 16.88' /%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: 24px 24px;
    width: 28px;
    height: 28px;
    background-color: transparent;
    padding: 0;
    margin: 0;
    transform: scaleY(-1);
  }

  .details-row > td > div {
    transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out;
    overflow: hidden;
    max-height: 0;
    opacity: 0;
  }

  .details-row[expanded] > td > div {
    max-height: 100vh;
    opacity: 1;
  }

  .caret-icon {
    transition: transform 0.3s ease-in-out;
  }

  .rotate-down {
    transform: rotate(90deg);
  }

  .rotate-up {
    transform: rotate(0deg);
  }

  .details-row,
  .details-row > td {
    padding: 0 !important;
  }

  .details {
    padding: 5px 15px;
  }

  .caret-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 512'%3E%3Cpath d='M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6 .1 34z'/%3E%3C/svg%3E");
    background-position: center center;
    background-repeat: no-repeat;
    width: 16px;
    height: 16px;
    margin: 0;
    padding: 0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transparent;
  }

  .toggle-col {
    width: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }
  th {
    text-align: inherit;
    text-align: -webkit-match-parent;
  }

  /* th {
    background-color: #f2f2f2;
  } */
  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  .table {
    width: 100%;
    margin-bottom: 1rem;
    color: #212529;
  }

  .table th {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
  }

  .table td {
    padding: 0.5rem;
    border-top: 1px solid #dee2e6;
  }

  .table thead th {
    vertical-align: bottom;
    border-bottom: 1px solid #dee2e6;
    background-color: #fff;
  }
  .table tbody + tbody {
    border-top: 2px solid #dee2e6;
  }
  .table-sm td,
  .table-sm th {
    padding: 0.3rem;
    font-size: 0.875rem;
  }
  .table-bordered,
  .table-bordered td,
  .table-bordered th {
    border: 1px solid #dee2e6;
  }
  .table-bordered thead td,
  .table-bordered thead th {
    border-bottom-width: 2px;
  }
  .table-borderless tbody + tbody,
  .table-borderless td,
  .table-borderless th,
  .table-borderless thead th {
    border: 0;
  }
  /* .table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  } */

  .table-striped tbody tr.striped-row {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  .table-striped tbody tr.striped-row-dark {
    background-color: rgba(255, 255, 255, 0.05);
  }

  .table-hover tbody tr:hover {
    color: #212529;
    background-color: rgba(0, 0, 0, 0.075);
  }
  .table-primary,
  .table-primary > td,
  .table-primary > th {
    background-color: #b8daff;
  }
  .table-primary tbody + tbody,
  .table-primary td,
  .table-primary th,
  .table-primary thead th {
    border-color: #7abaff;
  }
  .table-hover .table-primary:hover,
  .table-hover .table-primary:hover > td,
  .table-hover .table-primary:hover > th {
    background-color: #9fcdff;
  }
  .table-secondary,
  .table-secondary > td,
  .table-secondary > th {
    background-color: #d6d8db;
  }
  .table-secondary tbody + tbody,
  .table-secondary td,
  .table-secondary th,
  .table-secondary thead th {
    border-color: #b3b7bb;
  }
  .table-hover .table-secondary:hover,
  .table-hover .table-secondary:hover > td,
  .table-hover .table-secondary:hover > th {
    background-color: #c8cbcf;
  }
  .table-success,
  .table-success > td,
  .table-success > th {
    background-color: #c3e6cb;
  }
  .table-success tbody + tbody,
  .table-success td,
  .table-success th,
  .table-success thead th {
    border-color: #8fd19e;
  }
  .table-hover .table-success:hover,
  .table-hover .table-success:hover > td,
  .table-hover .table-success:hover > th {
    background-color: #b1dfbb;
  }
  .table-info,
  .table-info > td,
  .table-info > th {
    background-color: #bee5eb;
  }
  .table-info tbody + tbody,
  .table-info td,
  .table-info th,
  .table-info thead th {
    border-color: #86cfda;
  }
  .table-hover .table-info:hover,
  .table-hover .table-info:hover > td,
  .table-hover .table-info:hover > th {
    background-color: #abdde5;
  }
  .table-warning,
  .table-warning > td,
  .table-warning > th {
    background-color: #ffeeba;
  }
  .table-warning tbody + tbody,
  .table-warning td,
  .table-warning th,
  .table-warning thead th {
    border-color: #ffdf7e;
  }
  .table-hover .table-warning:hover,
  .table-hover .table-warning:hover > td,
  .table-hover .table-warning:hover > th {
    background-color: #ffe8a1;
  }
  .table-danger,
  .table-danger > td,
  .table-danger > th {
    background-color: #f5c6cb;
  }
  .table-danger tbody + tbody,
  .table-danger td,
  .table-danger th,
  .table-danger thead th {
    border-color: #ed969e;
  }
  .table-hover .table-danger:hover,
  .table-hover .table-danger:hover > td,
  .table-hover .table-danger:hover > th {
    background-color: #f1b0b7;
  }
  .table-light,
  .table-light > td,
  .table-light > th {
    background-color: #fdfdfe;
  }
  .table-light tbody + tbody,
  .table-light td,
  .table-light th,
  .table-light thead th {
    border-color: #fbfcfc;
  }
  .table-hover .table-light:hover,
  .table-hover .table-light:hover > td,
  .table-hover .table-light:hover > th {
    background-color: #ececf6;
  }
  .table-dark,
  .table-dark > td,
  .table-dark > th {
    background-color: #c6c8ca;
  }
  .table-dark tbody + tbody,
  .table-dark td,
  .table-dark th,
  .table-dark thead th {
    border-color: #95999c;
  }
  .table-hover .table-dark:hover,
  .table-hover .table-dark:hover > td,
  .table-hover .table-dark:hover > th {
    background-color: #b9bbbe;
  }
  .table-active,
  .table-active > td,
  .table-active > th,
  .table-hover .table-active:hover,
  .table-hover .table-active:hover > td,
  .table-hover .table-active:hover > th {
    background-color: rgba(0, 0, 0, 0.075);
  }
  .table .thead-dark th {
    color: #fff;
    background-color: #343a40;
    border-color: #454d55;
  }
  .table .thead-light th {
    color: #495057;
    background-color: #e9ecef;
    border-color: #dee2e6;
  }
  .table-dark {
    color: #fff;
    background-color: #343a40;
  }
  .table-dark td,
  .table-dark th,
  .table-dark thead th {
    border-color: #454d55;
  }
  .table-dark.table-bordered {
    border: 0;
  }
  .table-dark.table-striped tbody tr:nth-of-type(odd) {
    background-color: hsla(0, 0%, 100%, 0.05);
  }
  .table-dark.table-hover tbody tr:hover {
    color: #fff;
    background-color: hsla(0, 0%, 100%, 0.075);
  }
  @media (max-width: 575.98px) {
    .table-responsive-sm {
      display: block;
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    .table-responsive-sm > .table-bordered {
      border: 0;
    }
  }
  @media (max-width: 767.98px) {
    .table-responsive-md {
      display: block;
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    .table-responsive-md > .table-bordered {
      border: 0;
    }
  }
  @media (max-width: 991.98px) {
    .table-responsive-lg {
      display: block;
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    .table-responsive-lg > .table-bordered {
      border: 0;
    }
  }
  @media (max-width: 1199.98px) {
    .table-responsive-xl {
      display: block;
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    .table-responsive-xl > .table-bordered {
      border: 0;
    }
  }
  .table-responsive {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .table-responsive > .table-bordered {
    border: 0;
  }

  .d-table {
    display: table !important;
  }
  .d-table-row {
    display: table-row !important;
  }
  .d-table-cell {
    display: table-cell !important;
  }
  .d-sm-table {
    display: table !important;
  }
  .d-sm-table-row {
    display: table-row !important;
  }
  .d-sm-table-cell {
    display: table-cell !important;
  }
  .d-md-table {
    display: table !important;
  }
  .d-md-table-row {
    display: table-row !important;
  }
  .d-md-table-cell {
    display: table-cell !important;
  }
  .d-lg-table {
    display: table !important;
  }
  .d-lg-table-row {
    display: table-row !important;
  }
  .d-lg-table-cell {
    display: table-cell !important;
  }
  .d-xl-table {
    display: table !important;
  }
  .d-xl-table-row {
    display: table-row !important;
  }
  .d-xl-table-cell {
    display: table-cell !important;
  }
  .d-print-table {
    display: table !important;
  }
  .d-print-table-row {
    display: table-row !important;
  }
  .d-print-table-cell {
    display: table-cell !important;
  }

  @media print {
    .table {
      border-collapse: collapse !important;
    }
    .table td,
    .table th {
      background-color: #fff !important;
    }
    .table-bordered td,
    .table-bordered th {
      border: 1px solid #dee2e6 !important;
    }
    .table-dark {
      color: inherit;
    }
    .table-dark tbody + tbody,
    .table-dark td,
    .table-dark th,
    .table-dark thead th {
      border-color: #dee2e6;
    }
    .table .thead-dark th {
      color: inherit;
      border-color: #dee2e6;
    }
    tr {
      page-break-inside: avoid;
    }
  }

  /* b-table */
  /*!
 * BootstrapVue Custom CSS (https://bootstrap-vue.org)
 */

  .table.b-table.b-table-fixed {
    table-layout: fixed;
  }
  .table.b-table.b-table-no-border-collapse {
    border-collapse: separate;
    border-spacing: 0;
  }
  .table.b-table[aria-busy="true"] {
    opacity: 0.55;
  }
  .table.b-table > tbody > tr.b-table-details > td {
    border-top: none !important;
  }
  .table.b-table > caption {
    caption-side: bottom;
  }
  .table.b-table.b-table-caption-top > caption {
    caption-side: top !important;
  }
  .table.b-table > tbody > .table-active,
  .table.b-table > tbody > .table-active > td,
  .table.b-table > tbody > .table-active > th {
    background-color: rgba(0, 0, 0, 0.075);
  }
  .table.b-table.table-hover > tbody > tr.table-active:hover td,
  .table.b-table.table-hover > tbody > tr.table-active:hover th {
    color: #212529;
    background-image: linear-gradient(
      rgba(0, 0, 0, 0.075),
      rgba(0, 0, 0, 0.075)
    );
    background-repeat: no-repeat;
  }
  .table.b-table > tbody > .bg-active,
  .table.b-table > tbody > .bg-active > td,
  .table.b-table > tbody > .bg-active > th {
    background-color: hsla(0, 0%, 100%, 0.075) !important;
  }
  .table.b-table.table-hover.table-dark > tbody > tr.bg-active:hover td,
  .table.b-table.table-hover.table-dark > tbody > tr.bg-active:hover th {
    color: #fff;
    background-image: linear-gradient(
      hsla(0, 0%, 100%, 0.075),
      hsla(0, 0%, 100%, 0.075)
    );
    background-repeat: no-repeat;
  }
  .b-table-sticky-header,
  .table-responsive,
  [class*="table-responsive-"] {
    margin-bottom: 1rem;
  }
  .b-table-sticky-header > .table,
  .table-responsive > .table,
  [class*="table-responsive-"] > .table {
    margin-bottom: 0;
  }
  .b-table-sticky-header {
    overflow-y: auto;
    max-height: 300px;
  }
  @media print {
    .b-table-sticky-header {
      overflow-y: visible !important;
      max-height: none !important;
    }
  }
  @supports (position: sticky) {
    .b-table-sticky-header > .table.b-table > thead > tr > th {
      position: sticky;
      top: 0;
      z-index: 2;
    }
    .b-table-sticky-header
      > .table.b-table
      > tbody
      > tr
      > .b-table-sticky-column,
    .b-table-sticky-header
      > .table.b-table
      > tfoot
      > tr
      > .b-table-sticky-column,
    .b-table-sticky-header
      > .table.b-table
      > thead
      > tr
      > .b-table-sticky-column,
    .table-responsive > .table.b-table > tbody > tr > .b-table-sticky-column,
    .table-responsive > .table.b-table > tfoot > tr > .b-table-sticky-column,
    .table-responsive > .table.b-table > thead > tr > .b-table-sticky-column,
    [class*="table-responsive-"]
      > .table.b-table
      > tbody
      > tr
      > .b-table-sticky-column,
    [class*="table-responsive-"]
      > .table.b-table
      > tfoot
      > tr
      > .b-table-sticky-column,
    [class*="table-responsive-"]
      > .table.b-table
      > thead
      > tr
      > .b-table-sticky-column {
      position: sticky;
      left: 0;
    }
    .b-table-sticky-header
      > .table.b-table
      > thead
      > tr
      > .b-table-sticky-column,
    .table-responsive > .table.b-table > thead > tr > .b-table-sticky-column,
    [class*="table-responsive-"]
      > .table.b-table
      > thead
      > tr
      > .b-table-sticky-column {
      z-index: 5;
    }
    .b-table-sticky-header
      > .table.b-table
      > tbody
      > tr
      > .b-table-sticky-column,
    .b-table-sticky-header
      > .table.b-table
      > tfoot
      > tr
      > .b-table-sticky-column,
    .table-responsive > .table.b-table > tbody > tr > .b-table-sticky-column,
    .table-responsive > .table.b-table > tfoot > tr > .b-table-sticky-column,
    [class*="table-responsive-"]
      > .table.b-table
      > tbody
      > tr
      > .b-table-sticky-column,
    [class*="table-responsive-"]
      > .table.b-table
      > tfoot
      > tr
      > .b-table-sticky-column {
      z-index: 2;
    }
    .table.b-table > tbody > tr > .table-b-table-default,
    .table.b-table > tfoot > tr > .table-b-table-default,
    .table.b-table > thead > tr > .table-b-table-default {
      color: #212529;
      background-color: #fff;
    }
    .table.b-table.table-dark > tbody > tr > .bg-b-table-default,
    .table.b-table.table-dark > tfoot > tr > .bg-b-table-default,
    .table.b-table.table-dark > thead > tr > .bg-b-table-default {
      color: #fff;
      background-color: #343a40;
    }
    .table.b-table.table-striped
      > tbody
      > tr:nth-of-type(odd)
      > .table-b-table-default {
      background-image: linear-gradient(
        rgba(0, 0, 0, 0.05),
        rgba(0, 0, 0, 0.05)
      );
      background-repeat: no-repeat;
    }
    .table.b-table.table-striped.table-dark
      > tbody
      > tr:nth-of-type(odd)
      > .bg-b-table-default {
      background-image: linear-gradient(
        hsla(0, 0%, 100%, 0.05),
        hsla(0, 0%, 100%, 0.05)
      );
      background-repeat: no-repeat;
    }
    .table.b-table.table-hover > tbody > tr:hover > .table-b-table-default {
      color: #212529;
      background-image: linear-gradient(
        rgba(0, 0, 0, 0.075),
        rgba(0, 0, 0, 0.075)
      );
      background-repeat: no-repeat;
    }
    .table.b-table.table-hover.table-dark
      > tbody
      > tr:hover
      > .bg-b-table-default {
      color: #fff;
      background-image: linear-gradient(
        hsla(0, 0%, 100%, 0.075),
        hsla(0, 0%, 100%, 0.075)
      );
      background-repeat: no-repeat;
    }
  }
  .table.b-table
    > tfoot
    > tr
    > [aria-sort]
    .sort-icon
    .table.b-table
    > thead
    > tr
    > [aria-sort]
    .sort-icon {
    cursor: pointer;
    /* background-image: none;
    background-repeat: no-repeat;
    background-size: 0.65em 1em; */

    background-size: 0.65rem 1rem;
    background-repeat: no-repeat;
    background-position: right 0.375rem center;
    padding-left: unset;
    padding-right: calc(0.75rem + 0.75rem);
  }
  .table.b-table > tfoot > tr > [aria-sort]:not(.b-table-sort-icon-left),
  .table.b-table > thead > tr > [aria-sort]:not(.b-table-sort-icon-left) {
    background-position: right 0.375rem center;
    padding-right: calc(0.75rem + 0.65em);
  }
  .table.b-table > tfoot > tr > [aria-sort].b-table-sort-icon-left,
  .table.b-table > thead > tr > [aria-sort].b-table-sort-icon-left {
    background-position: left 0.375rem center;
    padding-left: calc(0.75rem + 0.65em);
  }
  .table.b-table > tfoot > tr > [aria-sort="none"] .sort-icon,
  .table.b-table > thead > tr > [aria-sort="none"] .sort-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='%23383838' opacity='0.3' d='M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z'/%3E%3C/svg%3E");

    background-size: 0.65rem 1rem;
    background-repeat: no-repeat;
    background-position: right 0.375rem center;
    padding-left: unset;
    padding-right: calc(0.75rem + 0.75rem);
    height: 22px;
  }
  .table.b-table > tfoot > tr > [aria-sort="ascending"] .sort-icon,
  .table.b-table > thead > tr > [aria-sort="ascending"] .sort-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='%23383838' d='M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z'/%3E%3Cpath fill='%23383838' opacity='0.3' d='M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z'/%3E%3C/svg%3E");

    background-size: 0.65rem 1rem;
    background-repeat: no-repeat;
    background-position: right 0.375rem center;
    padding-left: unset;
    padding-right: calc(0.75rem + 0.75rem);
  }
  .table.b-table > tfoot > tr > [aria-sort="descending"] .sort-icon,
  .table.b-table > thead > tr > [aria-sort="descending"] .sort-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='%23383838' opacity='0.3' d='M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z'/%3E%3Cpath fill='%23383838' d='M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z'/%3E%3C/svg%3E");

    background-size: 0.65rem 1rem;
    background-repeat: no-repeat;
    background-position: right 0.375rem center;
    padding-left: unset;
    padding-right: calc(0.75rem + 0.75rem);
  }
  .table.b-table.table-dark > tfoot > tr > [aria-sort="none"] .sort-icon,
  .table.b-table.table-dark > thead > tr > [aria-sort="none"] .sort-icon,
  .table.b-table > .thead-dark > tr > [aria-sort="none"] .sort-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='%23FFFFFF' opacity='0.3' d='M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z'/%3E%3C/svg%3E");

    background-size: 0.65rem 1rem;
    background-repeat: no-repeat;
    background-position: right 0.375rem center;
    padding-left: unset;
    padding-right: calc(0.75rem + 0.75rem);
    height: 22px;
  }
  .table.b-table.table-dark > tfoot > tr > [aria-sort="ascending"] .sort-icon,
  .table.b-table.table-dark > thead > tr > [aria-sort="ascending"] .sort-icon,
  .table.b-table > .thead-dark > tr > [aria-sort="ascending"] .sort-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='%23FFFFFF' d='M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z'/%3E%3Cpath fill='%23FFFFFF' opacity='0.3' d='M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z'/%3E%3C/svg%3E");

    background-size: 0.65rem 1rem;
    background-repeat: no-repeat;
    background-position: right 0.375rem center;
    padding-left: unset;
    padding-right: calc(0.75rem + 0.75rem);
  }
  .table.b-table.table-dark > tfoot > tr > [aria-sort="descending"] .sort-icon,
  .table.b-table.table-dark > thead > tr > [aria-sort="descending"] .sort-icon,
  .table.b-table > .thead-dark > tr > [aria-sort="descending"] .sort-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='%23FFFFFF' opacity='0.3' d='M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z'/%3E%3Cpath fill='%23FFFFFF' d='M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z'/%3E%3C/svg%3E");

    background-size: 0.65rem 1rem;
    background-repeat: no-repeat;
    background-position: right 0.375rem center;
    padding-left: unset;
    padding-right: calc(0.75rem + 0.75rem);
  }
  .table.b-table > tfoot > tr > .table-dark[aria-sort="none"] .sort-icon,
  .table.b-table > thead > tr > .table-dark[aria-sort="none"] .sort-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='%23FFFFFF' opacity='0.3' d='M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z'/%3E%3C/svg%3E");

    background-size: 0.65rem 1rem;
    background-repeat: no-repeat;
    background-position: right 0.375rem center;
    padding-left: unset;
    padding-right: calc(0.75rem + 0.75rem);
    height: 22px;
  }
  .table.b-table > tfoot > tr > .table-dark[aria-sort="ascending"] .sort-icon,
  .table.b-table > thead > tr > .table-dark[aria-sort="ascending"] .sort-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='%23FFFFFF' d='M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z'/%3E%3Cpath fill='%23FFFFFF' opacity='0.3' d='M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z'/%3E%3C/svg%3E");

    background-size: 0.65rem 1rem;
    background-repeat: no-repeat;
    background-position: right 0.375rem center;
    padding-left: unset;
    padding-right: calc(0.75rem + 0.75rem);
  }
  .table.b-table > tfoot > tr > .table-dark[aria-sort="descending"] .sort-icon,
  .table.b-table > thead > tr > .table-dark[aria-sort="descending"] .sort-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='%23FFFFFF' opacity='0.3' d='M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z'/%3E%3Cpath fill='%23FFFFFF' d='M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z'/%3E%3C/svg%3E");

    background-size: 0.65rem 1rem;
    background-repeat: no-repeat;
    background-position: right 0.375rem center;
    padding-left: unset;
    padding-right: calc(0.75rem + 0.75rem);
  }
  .table.b-table.table-sm
    > tfoot
    > tr
    > [aria-sort]:not(.b-table-sort-icon-left),
  .table.b-table.table-sm
    > thead
    > tr
    > [aria-sort]:not(.b-table-sort-icon-left) {
    background-position: right 0.15rem center;
    padding-right: calc(0.3rem + 0.65em);
  }
  .table.b-table.table-sm > tfoot > tr > [aria-sort].b-table-sort-icon-left,
  .table.b-table.table-sm > thead > tr > [aria-sort].b-table-sort-icon-left {
    background-position: left 0.15rem center;
    padding-left: calc(0.3rem + 0.65em);
  }
  .table.b-table.b-table-selectable:not(.b-table-selectable-no-click)
    > tbody
    > tr {
    cursor: pointer;
  }
  .table.b-table.b-table-selectable:not(
      .b-table-selectable-no-click
    ).b-table-selecting.b-table-select-range
    > tbody
    > tr {
    user-select: none;
  }
  @media (max-width: 575.98px) {
    .table.b-table.b-table-stacked-sm {
      display: block;
      width: 100%;
    }
    .table.b-table.b-table-stacked-sm > caption,
    .table.b-table.b-table-stacked-sm > tbody,
    .table.b-table.b-table-stacked-sm > tbody > tr,
    .table.b-table.b-table-stacked-sm > tbody > tr > td,
    .table.b-table.b-table-stacked-sm > tbody > tr > th {
      display: block;
    }
    .table.b-table.b-table-stacked-sm > tfoot,
    .table.b-table.b-table-stacked-sm > tfoot > tr.b-table-bottom-row,
    .table.b-table.b-table-stacked-sm > tfoot > tr.b-table-top-row,
    .table.b-table.b-table-stacked-sm > thead,
    .table.b-table.b-table-stacked-sm > thead > tr.b-table-bottom-row,
    .table.b-table.b-table-stacked-sm > thead > tr.b-table-top-row {
      display: none;
    }
    .table.b-table.b-table-stacked-sm > caption {
      caption-side: top !important;
    }
    .table.b-table.b-table-stacked-sm > tbody > tr > [data-label]:before {
      content: attr(data-label);
      width: 40%;
      float: left;
      text-align: right;
      overflow-wrap: break-word;
      font-weight: 700;
      font-style: normal;
      padding: 0 0.5rem 0 0;
      margin: 0;
    }
    .table.b-table.b-table-stacked-sm > tbody > tr > [data-label]:after {
      display: block;
      clear: both;
      content: "";
    }
    .table.b-table.b-table-stacked-sm > tbody > tr > [data-label] > div {
      display: inline-block;
      width: 60%;
      padding: 0 0 0 0.5rem;
      margin: 0;
    }
    .table.b-table.b-table-stacked-sm > tbody > tr.bottom-row,
    .table.b-table.b-table-stacked-sm > tbody > tr.top-row {
      display: none;
    }
    .table.b-table.b-table-stacked-sm > tbody > tr > :first-child,
    .table.b-table.b-table-stacked-sm > tbody > tr > [rowspan] + td,
    .table.b-table.b-table-stacked-sm > tbody > tr > [rowspan] + th {
      border-top-width: 3px;
    }
  }
  @media (max-width: 767.98px) {
    .table.b-table.b-table-stacked-md {
      display: block;
      width: 100%;
    }
    .table.b-table.b-table-stacked-md > caption,
    .table.b-table.b-table-stacked-md > tbody,
    .table.b-table.b-table-stacked-md > tbody > tr,
    .table.b-table.b-table-stacked-md > tbody > tr > td,
    .table.b-table.b-table-stacked-md > tbody > tr > th {
      display: block;
    }
    .table.b-table.b-table-stacked-md > tfoot,
    .table.b-table.b-table-stacked-md > tfoot > tr.b-table-bottom-row,
    .table.b-table.b-table-stacked-md > tfoot > tr.b-table-top-row,
    .table.b-table.b-table-stacked-md > thead,
    .table.b-table.b-table-stacked-md > thead > tr.b-table-bottom-row,
    .table.b-table.b-table-stacked-md > thead > tr.b-table-top-row {
      display: none;
    }
    .table.b-table.b-table-stacked-md > caption {
      caption-side: top !important;
    }
    .table.b-table.b-table-stacked-md > tbody > tr > [data-label]:before {
      content: attr(data-label);
      width: 40%;
      float: left;
      text-align: right;
      overflow-wrap: break-word;
      font-weight: 700;
      font-style: normal;
      padding: 0 0.5rem 0 0;
      margin: 0;
    }
    .table.b-table.b-table-stacked-md > tbody > tr > [data-label]:after {
      display: block;
      clear: both;
      content: "";
    }
    .table.b-table.b-table-stacked-md > tbody > tr > [data-label] > div {
      display: inline-block;
      width: 60%;
      padding: 0 0 0 0.5rem;
      margin: 0;
    }
    .table.b-table.b-table-stacked-md > tbody > tr.bottom-row,
    .table.b-table.b-table-stacked-md > tbody > tr.top-row {
      display: none;
    }
    .table.b-table.b-table-stacked-md > tbody > tr > :first-child,
    .table.b-table.b-table-stacked-md > tbody > tr > [rowspan] + td,
    .table.b-table.b-table-stacked-md > tbody > tr > [rowspan] + th {
      border-top-width: 3px;
    }
  }
  @media (max-width: 991.98px) {
    .table.b-table.b-table-stacked-lg {
      display: block;
      width: 100%;
    }
    .table.b-table.b-table-stacked-lg > caption,
    .table.b-table.b-table-stacked-lg > tbody,
    .table.b-table.b-table-stacked-lg > tbody > tr,
    .table.b-table.b-table-stacked-lg > tbody > tr > td,
    .table.b-table.b-table-stacked-lg > tbody > tr > th {
      display: block;
    }
    .table.b-table.b-table-stacked-lg > tfoot,
    .table.b-table.b-table-stacked-lg > tfoot > tr.b-table-bottom-row,
    .table.b-table.b-table-stacked-lg > tfoot > tr.b-table-top-row,
    .table.b-table.b-table-stacked-lg > thead,
    .table.b-table.b-table-stacked-lg > thead > tr.b-table-bottom-row,
    .table.b-table.b-table-stacked-lg > thead > tr.b-table-top-row {
      display: none;
    }
    .table.b-table.b-table-stacked-lg > caption {
      caption-side: top !important;
    }
    .table.b-table.b-table-stacked-lg > tbody > tr > [data-label]:before {
      content: attr(data-label);
      width: 40%;
      float: left;
      text-align: right;
      overflow-wrap: break-word;
      font-weight: 700;
      font-style: normal;
      padding: 0 0.5rem 0 0;
      margin: 0;
    }
    .table.b-table.b-table-stacked-lg > tbody > tr > [data-label]:after {
      display: block;
      clear: both;
      content: "";
    }
    .table.b-table.b-table-stacked-lg > tbody > tr > [data-label] > div {
      display: inline-block;
      width: 60%;
      padding: 0 0 0 0.5rem;
      margin: 0;
    }
    .table.b-table.b-table-stacked-lg > tbody > tr.bottom-row,
    .table.b-table.b-table-stacked-lg > tbody > tr.top-row {
      display: none;
    }
    .table.b-table.b-table-stacked-lg > tbody > tr > :first-child,
    .table.b-table.b-table-stacked-lg > tbody > tr > [rowspan] + td,
    .table.b-table.b-table-stacked-lg > tbody > tr > [rowspan] + th {
      border-top-width: 3px;
    }
  }
  @media (max-width: 1199.98px) {
    .table.b-table.b-table-stacked-xl {
      display: block;
      width: 100%;
    }
    .table.b-table.b-table-stacked-xl > caption,
    .table.b-table.b-table-stacked-xl > tbody,
    .table.b-table.b-table-stacked-xl > tbody > tr,
    .table.b-table.b-table-stacked-xl > tbody > tr > td,
    .table.b-table.b-table-stacked-xl > tbody > tr > th {
      display: block;
    }
    .table.b-table.b-table-stacked-xl > tfoot,
    .table.b-table.b-table-stacked-xl > tfoot > tr.b-table-bottom-row,
    .table.b-table.b-table-stacked-xl > tfoot > tr.b-table-top-row,
    .table.b-table.b-table-stacked-xl > thead,
    .table.b-table.b-table-stacked-xl > thead > tr.b-table-bottom-row,
    .table.b-table.b-table-stacked-xl > thead > tr.b-table-top-row {
      display: none;
    }
    .table.b-table.b-table-stacked-xl > caption {
      caption-side: top !important;
    }
    .table.b-table.b-table-stacked-xl > tbody > tr > [data-label]:before {
      content: attr(data-label);
      width: 40%;
      float: left;
      text-align: right;
      overflow-wrap: break-word;
      font-weight: 700;
      font-style: normal;
      padding: 0 0.5rem 0 0;
      margin: 0;
    }
    .table.b-table.b-table-stacked-xl > tbody > tr > [data-label]:after {
      display: block;
      clear: both;
      content: "";
    }
    .table.b-table.b-table-stacked-xl > tbody > tr > [data-label] > div {
      display: inline-block;
      width: 60%;
      padding: 0 0 0 0.5rem;
      margin: 0;
    }
    .table.b-table.b-table-stacked-xl > tbody > tr.bottom-row,
    .table.b-table.b-table-stacked-xl > tbody > tr.top-row {
      display: none;
    }
    .table.b-table.b-table-stacked-xl > tbody > tr > :first-child,
    .table.b-table.b-table-stacked-xl > tbody > tr > [rowspan] + td,
    .table.b-table.b-table-stacked-xl > tbody > tr > [rowspan] + th {
      border-top-width: 3px;
    }
  }
  .table.b-table.b-table-stacked {
    display: block;
    width: 100%;
  }
  .table.b-table.b-table-stacked > caption,
  .table.b-table.b-table-stacked > tbody,
  .table.b-table.b-table-stacked > tbody > tr,
  .table.b-table.b-table-stacked > tbody > tr > td,
  .table.b-table.b-table-stacked > tbody > tr > th {
    display: block;
  }
  .table.b-table.b-table-stacked > tfoot,
  .table.b-table.b-table-stacked > tfoot > tr.b-table-bottom-row,
  .table.b-table.b-table-stacked > tfoot > tr.b-table-top-row,
  .table.b-table.b-table-stacked > thead,
  .table.b-table.b-table-stacked > thead > tr.b-table-bottom-row,
  .table.b-table.b-table-stacked > thead > tr.b-table-top-row {
    display: none;
  }
  .table.b-table.b-table-stacked > caption {
    caption-side: top !important;
  }
  .table.b-table.b-table-stacked > tbody > tr > [data-label]:before {
    content: attr(data-label);
    width: 40%;
    float: left;
    text-align: right;
    overflow-wrap: break-word;
    font-weight: 700;
    font-style: normal;
    padding: 0 0.5rem 0 0;
    margin: 0;
  }
  .table.b-table.b-table-stacked > tbody > tr > [data-label]:after {
    display: block;
    clear: both;
    content: "";
  }
  .table.b-table.b-table-stacked > tbody > tr > [data-label] > div {
    display: inline-block;
    width: 60%;
    padding: 0 0 0 0.5rem;
    margin: 0;
  }
  .table.b-table.b-table-stacked > tbody > tr.bottom-row,
  .table.b-table.b-table-stacked > tbody > tr.top-row {
    display: none;
  }
  .table.b-table.b-table-stacked > tbody > tr > :first-child,
  .table.b-table.b-table-stacked > tbody > tr > [rowspan] + td,
  .table.b-table.b-table-stacked > tbody > tr > [rowspan] + th {
    border-top-width: 3px;
  }

  .select-col {
    width: 1.75rem;
    text-align: center;
    padding: 0 !important;
    vertical-align: middle !important;
  }

  .select-row-btns {
    background-repeat: no-repeat;
    background-size: 1.25rem 1.25rem;
    background-position: center;
    width: 1.25rem;
    height: 1.25rem;
    margin: 5px 0 0 5px;
    border: none;
    background-color: transparent;
  }

  .table-sm .select-row-btns {
    background-size: 1rem 1rem;
    width: 1rem;
    height: 1rem;
    margin: 4px 0px 0px 3px;
  }

  .check-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath d='M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 400H48V80h352v352zm-35.9-241.7L191.5 361.5c-4.7 4.7-12.3 4.6-17-.1l-90.8-91.5c-4.7-4.7-4.6-12.3 .1-17l22.7-22.5c4.7-4.7 12.3-4.6 17 .1l59.8 60.3 141.4-140.2c4.7-4.7 12.3-4.6 17 .1l22.5 22.7c4.7 4.7 4.6 12.3-.1 17z'/%3E%3C/svg%3E");
  }

  .partial-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath d='M108 284c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h232c6.6 0 12 5.4 12 12v32c0 6.6-5.4 12-12 12H108zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-48 346V86c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v340c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z'/%3E%3C/svg%3E");
  }

  .square-outline-icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath d='M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h340c3.3 0 6 2.7 6 6v340c0 3.3-2.7 6-6 6z'/%3E%3C/svg%3E");
  }

  .plumage table {
    border-collapse: collapse;
  }

  .plumage .table {
    width: 100%;
    margin-bottom: 0.25rem;
    color: #383838;
  }

  .plumage table,
  .plumage .table-sm {
    font-size: 0.8333rem;
    font-weight: 300;
    line-height: 1.1;
  }

  .plumage th {
    font-weight: 400;
    line-height: 1.2;
  }

  .plumage .table th,
  .plumage .table td {
    font-size: 0.8333rem;
    padding: 0.5rem;
    vertical-align: top;
    border-top: 1px solid #f5f5f5;
  }

  .plumage .table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #f5f5f5;
  }

  .plumage .table-sm th,
  .plumage .table-sm td {
    padding: 0.3rem;
  }

  .plumage .table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .plumage .table-hover tbody tr:hover {
    color: #383838;
    background-color: rgba(0, 0, 0, 0.075);
  }

  .plumage .table-sm .select-row-btns {
    margin: 3px 0 0 4px;
  }
`;
