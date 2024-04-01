import { css } from "lit";

export const plAutocompleteInputStyles = css`
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

  .pl-autocomplete-dropdown {
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

  .pl-autocomplete-dropdown ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .pl-autocomplete-dropdown-item {
    padding: 5px 10px;
    cursor: pointer;
  }
  .pl-autocomplete-dropdown-item:hover {
    background-color: #f2f2f2;
  }

  .pl-autocomplete-dropdown-item:active {
    background-color: #2680eb;
    color: #fff;
    text-decoration: none;
  }

  .pl-autocomplete-dropdown-item.focused {
    background-color: #eee;
  }

  .pl-autocomplete-dropdown-item.key-selected {
    background-color: #5a5a5a;
    color: #fff;
  }

  .pl-autocomplete-dropdown-item.key-selected.focused {
    background-color: #3a3a3a;
    color: #fff;
  }

  .pl-ac-form-control {
    border-right: none;
  }

  .pl-ac-combobox-container {
    margin-bottom: 0.25rem;
    position: relative;
  }

  .pl-ac-multi-select-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .pl-ac-selected-items {
    display: flex;
    flex-wrap: wrap;
  }

  .pl-ac-multi-select-container .pl-input-group-append .pl-input-group-btn {
    border: none;
  }

  .pl-ac-basic-container,
  .pl-ac-input-container {
    display: flex;
    flex: 1 1 auto;
  }

  .pl-ac-input-container .pl-ac-input-group {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
  }

  .pl-ac-input-container .pl-ac-input-group .form-control {
    border: none !important;
    display: flex !important;
    flex: 1 1 200px;
    padding: 0.375rem 0.75rem;
    width: 200px;
  }

  .pl-ac-input-container .pl-ac-input-group > .form-control:first-child {
    padding-left: 0.5rem;
  }

  .pl-ac-input-container .pl-ac-input-group input:focus {
    box-shadow: none;
    outline: none;
  }

  .pl-autocomplete-dropdown-item.sm {
    font-size: 0.75rem;
  }

  .pl-autocomplete-dropdown-item.lg {
    font-size: 1.2rem;
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
    height: 100%;
    position: relative;
    z-index: 5;
  }

  .pl-input-group-append .pl-input-group-btn {
    color: #999999;
    padding: 0.275rem 0.75rem;
    background-color: transparent;
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
    color: #b30009;
    border-color: #b30009;
  }

  .form-group {
    position: relative;
  }
`;
