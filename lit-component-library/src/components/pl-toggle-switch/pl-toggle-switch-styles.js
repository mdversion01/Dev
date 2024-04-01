import { css } from "lit";

export const toggleSwitchStyles = css`
  *,
  :after,
  :before {
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

  input[type="checkbox"],
  input[type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }

  label {
    display: inline-block;
    margin-bottom: 0.5rem;

    font-size: 0.75rem;
  }

  .custom-control {
    position: relative;
    z-index: 1;
    display: block;
    min-height: 1.5rem;
    padding-left: 1.5rem;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }

  .custom-switch {
    padding-left: 2.25rem;
  }

  .custom-control-inline {
    align-items: center;
    display: inline-flex;
    margin-right: 1rem;
  }

  .custom-control-input {
    position: absolute;
    left: 0;
    z-index: -1;
    width: 1rem;
    /* height: 1.25rem; */
    height: 0.99998rem;
    opacity: 0;
  }

  .custom-control-label {
    position: relative;
    margin-bottom: 0;
    vertical-align: top;
  }

  .custom-control-label:before {
    pointer-events: none;
    background-color: #6e6e6e;
    border: 1px solid #4b4b4b;

    // Dark mode
    /* background-color: #5a5a5a;
    border: 1px solid #323232; */
  }

  .custom-control-label:after,
  .custom-control-label:before {
    position: absolute;
    top: 0.00002rem;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    content: "";
  }

  .custom-control-label:before,
  .custom-file-label,
  .custom-select {
    transition: background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .custom-switch .custom-control-label:before {
    height: 0.75rem;
    top: 0.0625rem;
    width: 0.75rem;
  }

  .custom-switch .custom-control-label:before {
    left: -2.25rem;
    width: 1.75rem;
    pointer-events: all;
    border-radius: 0.5rem;
  }

  .custom-control-label:after,
  .custom-control-label:before {
    position: absolute;
    top: 0;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    content: "";
  }

  .custom-control-label:after {
    background: 50%/50% 50% no-repeat;
  }

  .custom-control-label .toggleTxt-bold {
    font-weight: bold;
  }

  .custom-switch .custom-control-label:after {
    // top: calc(0.25rem + 2px);
    top: 2px;
    left: calc(-2.282rem + 2px);
    width: calc(1rem - 4px);
    height: calc(1rem - 4px);
    background-color: #adb5bd;
    border-radius: 0.5rem;
    transition: background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
      -webkit-transform 0.15s ease-in-out;
    transition: transform 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: transform 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
      -webkit-transform 0.15s ease-in-out;
  }

  .custom-switch .custom-control-label:after {
    top: 0.0625rem;
    background-color: #cacaca;
    /* Dark mode */
    /* background-color: #b9b9b9; */
  }

  .custom-control-input:checked ~ .custom-control-label:before {
    color: #cacaca;
    border-color: #4b4b4b;
    background-color: #007bff;
  }

  .custom-switch .custom-control-input:checked ~ .custom-control-label:after {
    background-color: #cacaca;
    transform: translateX(0.8rem);
  }

  .custom-control-input:disabled ~ .custom-control-label:before,
  .custom-control-input[disabled] ~ .custom-control-label:before {
    background-color: #cacaca;
  }

  .custom-control-input:disabled:checked ~ .custom-control-label::before {
    background-color: rgba(38, 128, 235, 0.5);
  }

  .custom-control-input:disabled:checked ~ .custom-control-label::before {
    border: 1px solid #8e8e8e;
  }

  .custom-control-input:disabled:checked ~ .custom-control-label::after,
  .custom-control-input:disabled ~ .custom-control-label::after {
    background-color: #8e8e8e;
  }

  /* .custom-control-sm {
    padding-left: 1.96875rem;
  }

  .custom-control-sm .custom-control-label,
  .input-group-sm .custom-switch .custom-control-label {
    font-size: 0.8333rem;
    line-height: 1.5;
  }

  .custom-control-sm .custom-control-label:before,
  .input-group-sm .custom-switch .custom-control-label:before {
    top: 0.21875rem;
    left: -1.96875rem;
    width: 1.53125rem;
    height: 0.875rem;
    border-radius: 0.4375rem;
  }

  .custom-control-sm .custom-control-label:after,
  .input-group-sm .custom-switch .custom-control-label:after {
    top: calc(0.21875rem + 2px);
    left: calc(-1.96875rem + 2px);
    width: calc(0.875rem - 4px);
    height: calc(0.875rem - 4px);
    border-radius: 0.4375rem;
    background-size: 50% 50%;
  } */

  .custom-control-md {
    padding-left: 1.96875rem;
  }

  .custom-control-md .custom-control-label,
  .input-group-md .custom-switch .custom-control-label {
    font-size: 1rem;
    line-height: 1.5;
    padding-left: 5px;
  }

  .custom-control-md .custom-control-label:before,
  .input-group-md .custom-switch .custom-control-label:before {
    top: 0.21875rem;
    left: -1.9rem;
    width: 1.85rem;
    height: 0.9rem;
    border-radius: 0.5rem;
  }

  .custom-control-md
    .custom-control-input:checked
    ~ .custom-control-label::after {
    background-color: #cacaca;
    transform: translateX(0.95rem);
  }

  .custom-control-md .custom-control-label:after,
  .input-group-md .custom-switch .custom-control-label:after {
    top: calc(0.2rem + 2px);
    left: calc(-1.98rem + 2px);
    width: calc(1rem - 4px);
    height: calc(1rem - 4px);
    border-radius: 0.5rem;
    background-size: 50% 50%;
  }

  .custom-control-lg,
  .input-group-lg .custom-switch {
    padding-left: 2.8125rem;
  }

  .custom-control-lg .custom-control-label,
  .input-group-lg .custom-switch .custom-control-label {
    font-size: 1.125rem;
    line-height: 1.5;
  }

  .custom-control-lg .custom-control-label:before,
  .input-group-lg .custom-switch .custom-control-label:before {
    top: 0.175rem;
    height: 1.25rem;
    left: -2.8125rem;
    width: 2.5rem;
    border-radius: 0.625rem;
  }

  .custom-control-lg
    .custom-control-input:checked
    ~ .custom-control-label::after {
    background-color: #cacaca;
    transform: translateX(1.25rem);
  }

  .custom-control-lg .custom-control-label:after,
  .input-group-lg .custom-switch .custom-control-label:after {
    top: calc(0.175rem + 2px);
    // left: calc(-2.8125rem + 2px);
    left: calc(-2.8rem + 2px);
    width: calc(1.25rem - 4px);
    height: calc(1.25rem - 4px);
    border-radius: 0.625rem;
    background-size: 50% 50%;
  }

  // Plumage custom styles

  .pl-custom-control-label::after,
  .pl-custom-control-label::before {
    position: absolute;
    top: 0.0625rem;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 0.75rem;
    content: "";
  }

  .pl-custom-control-input:checked ~ .pl-custom-control-label::before {
    color: rgb(255, 255, 255);
    border-color: #323232;
    background-color: #2680eb;
  }

  .pl-custom-switch .pl-custom-control-label::after {
    top: calc(0.025 rem + 1 px);
    left: calc(-2.25 rem + 2 px);
    width: calc(1 rem - 4 px);
    height: calc(1 rem - 4 px);
    background-color: rgb(173, 181, 189);
    border-radius: 0.5 rem;
    transition: transform 0.15s ease-in-out 0s,
      background-color 0.15s ease-in-out 0s, border-color 0.15s ease-in-out 0s,
      box-shadow 0.15s ease-in-out 0s, -webkit-transform 0.15s ease-in-out 0s;
  }

  .pl-custom-control-input:disabled ~ .pl-custom-control-label:before,
  .pl-custom-control-input[disabled] ~ .pl-custom-control-label:before {
    background-color: #cacaca;
    border: 1px solid #8e8e8e;
  }

  .pl-custom-control-input:disabled ~ .pl-custom-control-label:after,
  .pl-custom-control-input[disabled] ~ .pl-custom-control-label:after {
    background-color: #8e8e8e;
  }

  .custom-switch .invalid-feedback {
    color: #b30009;
    /* display: none; */
    margin-top: 0.15rem;
    margin-bottom: 0.25rem;
    font-size: 0.75rem;
  }

  .custom-switch .invalid {
    color: #b30009;
  }

  .custom-switch .invalid.custom-control-label:before {
    border-color: #b30009;
  }

  .no-focus-ring:focus {
    outline: none;
  }

  [tabindex="-1"]:focus:not(:focus-visible) {
    outline: 0 !important;
  }

  /* .custom-control-input:focus + .custom-control-label {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  } */

  .keyboard-focused .custom-control-input:focus + .custom-control-label {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Example focus style */
  }
`;
