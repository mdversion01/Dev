import { css } from "lit";

export const paginationStyles = css`
  [type="button"]:not(:disabled),
  [type="reset"]:not(:disabled),
  [type="submit"]:not(:disabled),
  button:not(:disabled) {
    cursor: pointer;
  }

  [type="button"],
  [type="reset"],
  [type="submit"],
  button {
    -webkit-appearance: button;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  button {
    border-radius: 0;
  }

  *,
  :after,
  :before {
    box-sizing: border-box;
  }

  .pagination {
    align-items: center;
    display: flex;
    margin: 0;
    padding-left: 0;
    list-style: none;
    border-radius: 0.25rem;
  }

  .page-link {
    position: relative;
    display: block;
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    line-height: 1.25;
    color: #007bff;
    background-color: #fff;
    border: 1px solid #dee2e6;
  }

  .page-link:hover {
    z-index: 2;
    color: #0056b3;
    text-decoration: none;
    background-color: #e9ecef;
    border-color: #dee2e6;
  }

  .page-link:focus {
    z-index: 3;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  .page-item:first-child .page-link {
    margin-left: 0;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }

  .page-item:last-child .page-link {
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }

  .page-item.active .page-link {
    z-index: 3;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }

  .page-item.disabled .page-link {
    color: #6c757d;
    pointer-events: none;
    cursor: auto;
    background-color: #fff;
    border-color: #dee2e6;
  }

  .by-page .pages {
    padding: 0 0.25rem;
  }

  .by-page .pages .page-input {
    display: inline-block;
    margin-top: 3px;
    width: 2.5rem;
  }

  .by-page .page-item:nth-child(2) .page-link {
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }

  .by-page .page-item:nth-child(4) .page-link {
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }

  .plumage .pages {
    padding: 0 0.75rem;
    display: flex;
    align-items: center;
    font-size: 0.833rem;
  }

  .plumage .pages .page-input-wrapper {
    margin: 0 0.25rem;
  }

  .pagination-sm {
    font-size: 0.875rem;
  }

  .pagination-lg {
    font-size: 1.25rem;
  }

  .pagination-lg .page-link {
    padding: 0.5rem 1.25rem;
    line-height: 1.5;
  }

  .pagination-lg .page-item:first-child .page-link,
  .by-page.pagination-lg .page-item:nth-child(4) .page-link {
    border-top-left-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
  }

  .pagination-lg .page-item:last-child .page-link,
  .by-page.pagination-lg .page-item:nth-child(2) .page-link {
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }

  .pagination-sm .page-link {
    padding: 0.25rem 0.5rem;
    line-height: 1.5;
  }

  .pagination-sm .page-item:first-child .page-link,
  .by-page.pagination-sm .page-item:nth-child(4) .page-link {
    border-top-left-radius: 0.2rem;
    border-bottom-left-radius: 0.2rem;
  }

  .pagination-sm .page-item:last-child .page-link,
  .by-page.pagination-sm .page-item:nth-child(2) .page-link {
    border-top-right-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
  }

  .pagination-layout {
    margin: 0.625rem 0;
  }

  .pagination-split-layout {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-align: center;
    align-items: center;
    margin: 0.625rem 0;
  }

  .pagination-cell {
    display: flex;
    flex: 1 1 auto;
  }

  .pagination-cell.fill {
    display: block;
    align-items: center;
    width: 100%;
    flex: 1 1 50%;
  }

  .pagination-cell.end {
    justify-content: flex-end;
    align-items: center;
  }

  .pagination-cell.start {
    justify-content: flex-start;
    align-items: center;
  }

  .pagination-cell.center {
    justify-content: center;
    align-items: center;
  }

  .size-changer {
    display: flex;
    white-space: nowrap;
    align-items: baseline;
  }

  .size-changer-sm {
    font-size: 0.875rem;
    padding: 3px 0 0;
  }

  .size-changer-lg {
    font-size: 1.25rem;
  }

  .size-changer .select-lg {
    font-size: 110% !important;
  }

  .size-changer label {
    padding: 0 0.5rem;
  }

  .size-changer-lg label {
    font-size: 1rem;
  }

  .row-display {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .row-display.sm {
    font-size: 0.875rem;
  }

  .row-display.lg {
    font-size: 1.25rem;
  }

  .row-display.fill {
    padding: 0.625rem 0;
    text-align: center;
  }

  .justify-content-center {
    -ms-flex-pack: center !important;
    justify-content: center !important;
  }

  .justify-content-end {
    -ms-flex-pack: end !important;
    justify-content: flex-end !important;
  }

  .text-center {
    text-align: center !important;
  }

  .flex-fill {
    -ms-flex: 1 1 auto !important;
    flex: 1 1 auto !important;
  }

  .flex-fill50 {
    -ms-flex: 1 1 50% !important;
    flex: 1 1 50% !important;
  }

  .d-flex {
    display: -ms-flexbox !important;
    display: flex !important;
  }

  .flex-grow-1 {
    -ms-flex-positive: 1 !important;
    flex-grow: 1 !important;
  }

  .secondary .page-link {
    color: #333;
    background-color: #fff;
  }

  .secondary .page-link:hover {
    color: #333;
    background-color: #e9ecef;
  }

  .secondary .page-item.active .page-link {
    background-color: #909090;
    border-color: #909090;
    color: #fff;
  }

  .tertiary .page-link {
    color: #333;
    background-color: #fff;
  }

  .tertiary .page-link:hover {
    color: #333;
    background-color: #e9ecef;
  }

  .tertiary .page-item.active .page-link {
    background-color: #a6a6a6;
    border-color: #a6a6a6;
    color: #FFF;
  }

  .success .page-link {
    color: #247f61;
    background-color: #fff;
  }

  .success .page-link:hover {
    color: #2d9d78;
    background-color: #e9ecef;
  }

  .success .page-item.active .page-link {
    background-color: #247f61;
    border-color: #247f61;
    color: #FFF;
  }

  .warning .page-link {
    color: #c47215;
    background-color: #fff;
  }

  .warning .page-link:hover {
    color: #c47215;
    background-color: #e9ecef;
  }

  .warning .page-item.active .page-link {
    background-color: #e68619;
    border-color: #e68619;
    color: #FFF;
  }

  .danger .page-link {
    color: #de2730;
    background-color: #fff;
  }

  .danger .page-link:hover {
    color: #de2730;
    background-color: #e9ecef;
  }

  .danger .page-item.active .page-link {
    background-color: #de2730;
    border-color: #de2730;
    color: #FFF;
  }

  .info .page-link {
    color: #3596f9;
    background-color: #fff;
  }

  .info .page-link:hover {
    color: #3596f9;
    background-color: #e9ecef;
  }

  .info .page-item.active .page-link {
    background-color: #3596f9;
    border-color: #3596f9;
    color: #FFF;
  }

  .plumage .page-link {
    border-left: 1px solid rgb(222, 226, 230);
    border-right: 1px solid rgb(222, 226, 230);
    border-top: none;
    border-bottom: none;
  }

  .plumage .page-item:first-child .page-link {
    border-left: none;
    border-right: 1px solid rgb(222, 226, 230);
    border-top: none;
    border-bottom: none;
  }

  .plumage .page-item:last-child .page-link {
    border-left: 1px solid rgb(222, 226, 230);
    border-right: none;
    border-top: none;
    border-bottom: none;
  }

  .plumage .pagination-sm .page-link {
    padding: 0 0.5rem;
  }

  .plumage .size-changer-sm {
    font-size: 0.8333rem;
    padding: 0;
  }

  .plumage .row-display.sm {
    font-size: 0.833rem;
  }

  .plumage .row-display.lg {
    font-size: 1.25rem;
  }

  @media (max-width: 575.98px) {
    .bv-d-xs-down-none {
      display: none !important;
    }
  }
`;
