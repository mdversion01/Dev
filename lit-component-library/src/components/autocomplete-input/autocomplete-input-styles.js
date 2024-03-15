import { css } from "lit";

export const autocompleteInputStyles = css`
  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }

  input {
    width: 300px;
    padding: 10px;
    font-size: 16px;
  }
  .autocomplete-dropdown {
    position: absolute;
    width: 300px;
    max-height: 200px;
    overflow-y: auto;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: none;
    z-index: 1000;
  }

  .autocomplete-dropdown ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .autocomplete-dropdown-item {
    padding: 5px 10px;
    cursor: pointer;
  }
  .autocomplete-dropdown-item:hover {
    background-color: #f2f2f2;
  }

  .autocomplete-dropdown-item:active {
    background-color: #2680eb;
    color: #fff;
    text-decoration: none;
  }

  .autocomplete-dropdown-item.focused {
    background-color: #eee;
  }

  .autocomplete-dropdown-item.key-selected {
    background-color: #5a5a5a;
    color: #fff;
  }

  .ac-form-control {
    border-right: none;
  }

  .ac-combobox-container {
    margin-bottom: 0.25rem;
    position: relative;
  }

  .ac-multi-select-container {
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .ac-multi-select-container .form-control {
    border: none;
    padding: 0.375rem 0.75rem;
  }

  .ac-multi-select-container .pl-input-group .pl-input-group-append .pl-input-group-btn {
    border: none;
  }

  .pl-input-group-append {
    position: relative;
    z-index: 5;
  }

  .pl-input-group-append .pl-input-group-btn {
    color: #999999;
  }

  .pl-input-group-append .pl-input-group-btn.clear:hover {
    color: #b80000;
    outline: none;
  }

  .pl-input-group-append .pl-input-group-btn.clear:focus-visible {
    color: #b80000;
    outline: 1px solid #b80000;
  }

  .pl-input-group-append .pl-input-group-btn.add:hover {
    color: #008f0c;
    outline: none;
  }

  .pl-input-group-append .pl-input-group-btn.add:focus-visible {
    color: #008f0c;
    outline: 1px solid #008f0c;
  }

  .form-group {
    position: relative;
  }
`;
