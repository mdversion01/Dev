import { css } from "lit";

export const inputGroupStyles = css`
  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    -webkit-clip-path: inset(50%);
    clip-path: inset(50%);
    border: 0;
  }

  .sr-only-focusable:active,
  .sr-only-focusable:focus {
    position: static;
    width: auto;
    height: auto;
    overflow: visible;
    clip: auto;
    white-space: normal;
    -webkit-clip-path: none;
    clip-path: none;
  }

  *,
  ::after,
  ::before {
    box-sizing: border-box;
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

  button,
  input {
    overflow: visible;
  }

  .pl-input-group {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    width: 100%;
  }

  .pl-input-group-append,
  .pl-input-group-prepend {
    display: flex;
  }

  .pl-input-group-prepend {
    margin-right: -1px;
  }

  .pl-input-group-append,
  .pl-input-group-prepend {
    display: flex;
  }

  .pl-input-group-append {
    margin-left: -1px;
  }

  .pl-input-group-text {
    display: flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    text-align: center;
    white-space: nowrap;
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;

    min-height: 38px;
  }

  .pl-input-group
    > .pl-input-group-append:last-child
    > .pl-btn:not(:last-child):not(.dropdown-toggle),
  .pl-input-group
    > .pl-input-group-append:last-child
    > .pl-input-group-text:not(:last-child),
  .pl-input-group > .pl-input-group-append:not(:last-child) > .pl-btn,
  .pl-input-group
    > .pl-input-group-append:not(:last-child)
    > .pl-input-group-text,
  .pl-input-group > .pl-input-group-prepend > .pl-btn,
  .pl-input-group > .pl-input-group-prepend > .pl-input-group-text {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .pl-input-group > .pl-input-group-append > .pl-btn,
  .pl-input-group > .pl-input-group-append > .pl-input-group-text,
  .pl-input-group
    > .pl-input-group-prepend:first-child
    > .btn:not(:first-child),
  .pl-input-group
    > .pl-input-group-prepend:first-child
    > .pl-input-group-text:not(:first-child),
  .pl-input-group > .pl-input-group-prepend:not(:first-child) > .pl-btn,
  .pl-input-group
    > .pl-input-group-prepend:not(:first-child)
    > .pl-input-group-text {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .pl-input-group > .custom-file,
  .pl-input-group > .custom-select,
  .pl-input-group > .form-control {
    position: relative;
    flex: 1 1 auto;
    width: 1%;
    margin-bottom: 0;
  }

  .pl-input-group > .custom-select:not(:first-child),
  .pl-input-group > .form-control:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .pl-input-group > .custom-select:not(:last-child),
  .pl-input-group > .form-control:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .pl-input-group-sm > .custom-select,
  .pl-input-group-sm > .form-control,
  .pl-input-group-sm > .pl-input-group-append > .pl-btn,
  .pl-input-group-sm > .pl-input-group-append > .pl-input-group-text,
  .pl-input-group-sm > .pl-input-group-prepend > .pl-btn,
  .pl-input-group-sm > .pl-input-group-prepend > .pl-input-group-text {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    line-height: 1.5;
    border-radius: 0.2rem;
    min-height: 0;
  }

  .pl-input-group-sm > .custom-select,
  .pl-input-group-sm > .form-control:not(textarea) {
    height: calc(1.5em + 0.5rem + 2px);
  }

  .pl-input-group-lg > .custom-select,
  .pl-input-group-lg > .form-control,
  .pl-input-group-lg > .pl-input-group-append > .pl-btn,
  .pl-input-group-lg > .pl-input-group-append > .pl-input-group-text,
  .pl-input-group-lg > .pl-input-group-prepend > .pl-btn,
  .pl-input-group-lg > .pl-input-group-prepend > .pl-input-group-text {
    padding: 0.5rem 1rem;
    font-size: 1.125rem;
    line-height: 1.5;
    border-radius: 0.3rem;
  }

  .pl-input-group-lg > .custom-select,
  .pl-input-group-lg > .form-control:not(textarea) {
    height: calc(1.5em + 1rem + 2px);
  }

  .horizontal .form-input-group-basic label,
  .inline .form-input-group-basic label {
    display: flex;
    align-items: center;
    justify-content: right;
    font-size: 0.8333rem;
    margin-bottom: 0 !important;
    padding-right: 8px !important;
  }

  .horizontal .pl-input-group,
  .inline .pl-input-group {
    padding: 0 15px 0 0;
  }

  .form-input-group-basic label {
    margin-bottom: 0.25rem !important;
  }

  .form-control {
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
  }

  .pl-input-group-prepend.is-invalid > .pl-input-group-text,
  .pl-input-group-append.is-invalid > .pl-input-group-text {
    color: rgb(227, 72, 80);
    border-color: rgb(227, 72, 80);
  }

  .form-control:invalid,
  .form-control.is-invalid {
    border-color: rgb(227, 72, 80);
    padding-right: calc(1.5em + 0.75rem);
    background-repeat: no-repeat;
    background-position: right calc(-1em + 1.5rem) center;
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    background-image: url(
      data:image/svg + xml,
      %3csvgxmlns="http://www.w3.org/2000/svg"fill="%23e34850"viewBox="0 0 24 24"%3e%3cpathd="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0 18c4.411 0 8-3.589 8-8s-3.589-8-8-8-8 3.589-8 8 3.589 8 8 8z"/%3e%3cpathd="M13 7h-2v6h2V7zm0 8h-2v2h2v-2z"/%3e%3c/svg%3e
    );
  }

  .invalid {
    color: rgb(227, 72, 80);
  }

  [type="search"] {
    outline-offset: -2px;
    -webkit-appearance: none;
  }

  .search-bar-container {
    align-items: center;
    background-color: #e1e1e1;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    color: #383838;
    display: flex;
    max-height: 2.5rem;
    padding: 0;
    width: unset;
  }

  .search-bar-container:focus,
  .search-bar-container:hover,
  .search-bar-container:focus-within {
    background-color: #eaeaea;
    border: 1px solid #2680eb;
  }

  .search-bar-container .form-control {
    border: 1px solid transparent;
  }

  .search-bar-container .form-control:focus {
    background-color: transparent;
    /* border-color: #9bc4f6; */
    color: #383838;
    outline: 0;
    box-shadow: none;
  }

  .search-bar {
    box-shadow: none;
    display: inline-block;
    flex: auto;
    padding: 0.188rem;
    width: 8rem;
  }

  .search-bar-container .clear-icon {
    padding: 0 0.25rem;
  }

  .search-bar-icon {
    color: #8e8e8e;
    display: inline-block;
    font-size: 0.75rem;
    line-height: 50%;
    padding: 0 0.25rem;
  }
`;
