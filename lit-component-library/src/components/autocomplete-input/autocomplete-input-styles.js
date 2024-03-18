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
    min-width: 150px;
    max-width: 300px;
    max-height: 200px;
    overflow-y: auto;
    background-color: #fff;
    border: 1px solid #ccc;
    margin-top: 1px;
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

  .ac-selected-items {
    display: flex;
    flex-wrap: wrap;
  }

  .ac-multi-select-container .pl-input-group-append .pl-input-group-btn {
    border: none;
  }

  .ac-input-container {
    display: flex;
    flex: 1 1 auto;
  }

  .ac-input-container .ac-input-group {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
  }

  .ac-input-container .ac-input-group .form-control {
    border: none;
    display: flex !important;
    flex: 1 1 200px;
    padding: 0.375rem 0.75rem;
    width: 200px;
  }

  .error-message {
    color: red;
    margin-top: 4px;
    font-size: 11px;
  }

  .badge {
    align-items: center;
    background-color: transparent !important;
    border: 1px solid #8e8e8e !important;
    border-radius: 1rem;
    color: #000000;
    display: flex;
    font-size: 0.75rem;
    height: 30px;
    justify-content: center;
    margin: 0.25rem;
    padding: 0.35rem 0.5rem;
    position: relative;
  }

  .badge span {
    cursor: pointer;
    margin-right: 0.5rem;
    margin-top: -0.1rem;
  }

  .badge .remove-btn {
    background-color: transparent;
    border: none;
    border-radius: 25%;
    margin: 0;
    padding: 0;
    height: 16px;
    width: 16px;
  }

  .badge .remove-btn svg {
    cursor: pointer;
    fill: #666666;
    height: 1rem;
    position: relative;
    width: 1rem;
    z-index: 1;
  }

  .badge .remove-btn:hover svg,
  .badge .remove-btn:focus svg {
    fill: #ff5d6d;
    outline: none;
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

  .pl-input-group-append.is-invalid > .pl-input-group-btn.clear {
    color: rgb(227, 72, 80);
    border-color: rgb(227, 72, 80);
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
