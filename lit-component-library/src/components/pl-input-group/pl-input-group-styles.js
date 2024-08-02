import { css } from "lit";

export const plInputGroupStyles = css`
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
    height: 100%;
  }

  .pl-input-group-prepend {
    margin-right: -1px;
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

    min-height: 38px;
  }

  .pl-input-group-btn {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.275rem 0.75rem;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    white-space: nowrap;
    border: none;
    border-radius: 0;
    background-color: transparent;
    min-height: 28px;
    height: 100%;
  }

  /* .pl-input-group > .form-control {
    background-color: transparent;
    background-clip: padding-box;
    border: 0 solid rgb(202, 202, 202);
    border-radius: 0;
    color: rgb(56, 56, 56);
    display: block;
    font-size: 0.8333rem;
    font-weight: 400;
    line-height: 1.2;
    padding: 0.375rem 0.5rem 0.375rem 0;
    transition: border-color 0.15s ease-in-out 0s,
      box-shadow 0.15s ease-in-out 0s;
    width: calc(100% - 15px);
  } */

  .pl-input-group > .custom-file,
  .pl-input-group > .custom-select,
  .pl-input-group > .form-control {
    position: relative;
    flex: 1 1 auto;
    width: 1%;
    margin-bottom: 0;
    border: none;
  }

  .pl-input-group > .form-control:not(first-child) {
    padding-left: 0;
  }

  .pl-input-group > .form-control:first-child {
    padding-left: 0.5rem;
  }

  .pl-input-group-sm > .custom-select,
  .pl-input-group-sm > .form-control,
  .pl-input-group-sm > .pl-input-group-append > .pl-btn,
  .pl-input-group-sm > .pl-input-group-append > .pl-input-group-text,
  .pl-input-group-sm > .pl-input-group-prepend > .pl-btn,
  .pl-input-group-sm > .pl-input-group-prepend > .pl-input-group-text {
    padding: 0.25rem 0.5rem;
    font-size: 0.833rem;
    line-height: 1.5;
    min-height: 0;
  }

  .pl-input-group-sm > .form-control {
    padding: 0.25rem 0.5rem 0.25rem 0;
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
  }

  .pl-input-group-lg > .form-control {
    padding: 0.5rem 1rem 0.5rem 0;
  }

  .pl-input-group input:focus {
    box-shadow: none;
    outline: none;
  }

  .horizontal .form-pl-input-group label,
  .inline .form-pl-input-group label {
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

  .form-pl-input-group label {
    margin-bottom: 0.25rem !important;
  }

  .form-control:disabled,
  .form-control.disabled,
  .pl-input-group.disabled {
    background-color: rgb(245, 245, 245);
  }

  :disabled.b-focus,
  .disabled.b-focus {
    background-color: transparent;
  }

  .pl-input-group .form-control:invalid,
  .pl-input-group .form-control.is-invalid {
    background-position: right calc(-1.5em + 1.5rem) center;
  }

  .pl-input-group-prepend.is-invalid > .pl-input-group-text,
  .pl-input-group-append.is-invalid > .pl-input-group-text {
    color: #b30009;
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
    padding: 0 0.5rem 0 0.5rem;
  }
`;
