import { css } from "lit";

export const timepickerStyles = css`
  .hidden {
    display: none !important;
    visibility: hidden !important;
  }

  .time-picker {
    position: relative;
  }

  .time-input,
  .time-icon {
    display: inline-block;
  }

  .time-input {
    border-right: none !important;
  }

  .time-icon {
    cursor: pointer;
  }

  .time-icon-btn {
    background-color: transparent;
    color: #6c757d;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.375rem 0.75rem;
    font-size: 1rem !important;
    font-weight: 400;
    line-height: 1.5;
  }

  .time-dropdown {
    position: absolute;
    top: 38px;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 5px;
    z-index: 1;
  }

  .time-dropdown.sm {
    padding: 5px 0;
    top: 30px;
  }

  .time-dropdown.sm .hour-display,
  .time-dropdown.sm .minute-display,
  .time-dropdown.sm .second-display,
  .time-dropdown.sm .ampm-display {
    font-size: 0.875rem;
  }

  .time-dropdown.sm .time-spinner button {
    font-size: 0.875rem !important;
  }

  .time-dropdown.sm .time-spinner-colon .dot {
    font-size: 0.35rem;
  }

  .time-dropdown.lg {
    top: 44px;
  }

  .time-dropdown.hidden {
    display: none;
  }

  .time-spinner {
    border: 1px solid #ccc;
    border-radius: 0.3rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 0.5rem;
  }

  .time-spinner-wrapper {
    display: flex;
    margin-bottom: 0.5rem;
  }

  .time-spinner.am-pm-spinner {
    border: 1px solid #ccc;
    border-radius: 0.3rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 0.5rem;
  }

  .am-pm-spinner.hidden {
    display: none;
  }

  .time-spinner-colon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .time-spinner-colon .dot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0.5rem 0;
    font-size: 0.5rem;
  }

  .time-spinner-close {
    padding: 0 5px 0 0;
    text-align: right;
  }

  .time-dropdown.sm .time-spinner-close button {
    padding: 0 5px !important;
  }

  input[type="number"] {
    width: 40px;
  }

  button.arrow {
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 0.25rem 0.5rem;
    border: none;
    background-color: #fff;
  }

  button.arrow:hover {
    background-color: #e1e1e1;
  }

  button.arrow.up {
    border-bottom: 1px solid #ccc;
    border-radius: 0.3rem 0.3rem 0 0;
  }
  button.arrow.down {
    border-top: 1px solid #ccc;
    border-radius: 0 0 0.3rem 0.3rem;
  }

  .clear-button {
    background-color: transparent;
    border-top: 1px solid rgb(206, 212, 218);
    border-bottom: 1px solid rgb(206, 212, 218);
    border-right: none;
    border-left: none;
    border-radius: 0;
    cursor: pointer;
    color: #959595;
    margin-left: 0;
    min-height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    user-select: none;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .pl-input-group-sm .clear-button {
    min-height: 30px;
  }

  .time-picker .pl-input-group-append button:last-child {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    border-top-right-radius: 0.2rem !important;
    border-bottom-right-radius: 0.2rem !important;
    border: 1px solid #ccc;
  }

  .time-picker .pl-input-group-sm input {
    padding: 0.2rem 0.5rem;
  }

  .time-picker .pl-input-group-sm > .custom-select,
  .pl-input-group-sm > .form-control:not(textarea) {
    height: calc(1em + 0.25rem + 4px) !important;
  }

  .time-picker .pl-input-group-lg > .custom-select,
  .pl-input-group-lg > .form-control:not(textarea) {
    height: 1.5em !important;
  }

  .time-picker .pl-input-group-lg .pl-input-group-append {
    height: inherit;
  }

  .time-picker .pl-input-group-lg .pl-input-group-append button {
    font-size: 1.125rem !important;
  }

  .clear-button:hover,
  .clear-button:focus,
  .plumage .clear-button:hover,
  .plumage .clear-button:focus {
    color: #ac0000;
  }

  .validation-message,
  .warning-message {
    color: #ac0000;
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }

  .fa-sr-only,
  .fa-sr-only-focusable:not(:focus),
  .sr-only,
  .sr-only-focusable:not(:focus) {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  .fa-sr-only,
  .fa-sr-only-focusable:not(:focus),
  .sr-only,
  .sr-only-focusable:not(:focus) {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .plumage .clear-button {
    background-color: transparent;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-radius: 0px;
    cursor: pointer;
    color: rgb(149, 149, 149);
    margin-left: 0px;
    min-height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.375rem 0.5rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    user-select: none;
    transition: color 0.15s ease-in-out 0s,
      background-color 0.15s ease-in-out 0s, border-color 0.15s ease-in-out 0s,
      box-shadow 0.15s ease-in-out 0s;
  }

  .plumage .pl-input-group-sm .clear-button {
    min-height: 28px;
  }

  .plumage .time-icon-btn {
    background-color: transparent;
    font-weight: 400;
    line-height: 1.5;
    padding: 0px !important;
    color: rgb(149, 149, 149) !important;
    border: none !important;
    align-items: center;
    border-radius: 50% !important;
    cursor: pointer;
    display: flex;
    font-size: 1rem !important;
    justify-content: center;
    min-height: 28px;
  }

  .plumage .time-icon-btn:hover,
  .plumage .time-icon-btn:focus {
    background-color: transparent;
    text-decoration: none;
    color: rgb(82, 82, 82) !important;
  }

  .plumage .time-icon-btn:focus {
    outline: 0;
    box-shadow: rgb(142, 142, 142) 0 0 0 0 !important;
  }

  .plumage .time-picker .pl-input-group-append button:last-child {
    border: none;
    border-radius: 0 !important;
  }

  /* Underline the input */
  .plumage .b-underline {
    background-color: #ccc;
    display: block;
    height: 1px;
    position: relative;
    transition: 0.4s;
    width: 100%;
  }

  .plumage .b-focus {
    background-color: #2680eb;
    bottom: 0;
    height: 1px;
    left: 50%;
    position: absolute;
    transition: 0.4s;
    width: 0;
  }
`;
