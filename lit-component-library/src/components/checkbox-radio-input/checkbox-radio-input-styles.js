import { css } from "lit";

export const checkboxRadioStyles = css`
  label {
    display: inline-block;
    margin-bottom: 0.5rem;
  }

  .form-group {
    padding: 2px 15px;
  }

  .form-group {
    margin-bottom: 0;
  }

  .form-check {
    position: relative;
    display: block;
    padding-left: 1.25rem;
  }

  .form-check-input {
    position: absolute;
    margin-top: 0.1rem;
    margin-left: -1.25rem;
  }

  .form-check-input:disabled ~ .form-check-label {
    color: #6c757d;
  }

  .form-check-label {
    margin-bottom: 0;
  }

  .form-check-label.small,
  .custom-control-label.small {
    font-size: 12px;
  }

  .form-check-label.med,
  .custom-control-label.med {
    font-size: 14px;
  }

  .form-check-inline {
    display: inline-flex;
    align-items: center;
    padding-left: 0;
    margin-right: 0.75rem;
    height: 100%;
  }

  .form-check-inline .form-check-input {
    position: static;
    margin-top: 0;
    margin-right: 0.3125rem;
    margin-left: 0;
  }

  .form-check-inline .form-check-input {
    position: static;
    margin-top: 0;
    margin-right: 0.75rem;
    margin-left: 0;
  }

  .form-inline {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
  }

  .form-inline .form-check {
    width: 100%;
  }

  .form-group.form-check-inline {
    margin-right: 0;
  }

  .form-group.form-check-inline:first-child {
    padding-left: 15px;
  }

  .form-group.form-check-inline .form-check {
    padding-left: 0;
  }

  .form-group.form-check-inline .form-check-input {
    margin-right: 0;
  }

  input:disabled {
    cursor: default;
    background-color: -internal-light-dark(
      rgba(239, 239, 239, 0.3),
      rgba(59, 59, 59, 0.3)
    );
    color: -internal-light-dark(rgb(84, 84, 84), rgb(170, 170, 170));
    border-color: rgba(118, 118, 118, 0.3);
  }

  input[type="checkbox" i] {
    appearance: auto;
    box-sizing: border-box;
  }

  input[type="checkbox" i]:disabled {
    background-color: initial;
  }

  .form-check-input:disabled ~ .form-check-label {
    color: #6c757d;
  }

  .custom-control {
    position: relative;
    display: block;
    min-height: 1.5rem;
    padding-left: 1.5rem;
  }

  .custom-control-inline {
    display: inline-flex;
    margin-right: 1rem;
  }

  .custom-control-input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  .custom-control-input:checked ~ .custom-control-label::before {
    color: #fff;
    background-color: #007bff;
    content: "";
  }

  .custom-control-input:focus ~ .custom-control-label::before {
    box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgb(0 123 255 / 25%);
    content: "";
  }

  .custom-control-input:active ~ .custom-control-label::before {
    color: #fff;
    background-color: #b3d7ff;
    content: "";
  }

  .custom-control-input:disabled ~ .custom-control-label {
    color: #6c757d;
  }

  .custom-control-input:disabled ~ .custom-control-label::before {
    background-color: #e9ecef;
    content: "";
  }

  .custom-control-label {
    margin-bottom: 0;
  }

  .custom-control-label::before {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 1rem;
    height: 1rem;
    pointer-events: none;
    content: "";
    user-select: none;
    background-color: #dee2e6;
  }

  .custom-control-label::after {
    position: absolute;
    top: 0.01rem;
    left: 0;
    display: block;
    width: 1rem;
    height: 1rem;
    content: "";
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
  }

  .custom-checkbox .custom-control-label::before {
    border-radius: 0.25rem;
    content: "";
  }

  .custom-checkbox
    .custom-control-input:checked
    ~ .custom-control-label::before {
    background-color: #007bff;
    content: "";
  }

  .custom-checkbox
    .custom-control-input:checked
    ~ .custom-control-label::after {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E");
    content: "";
  }

  .custom-checkbox
    .custom-control-input:indeterminate
    ~ .custom-control-label::before {
    color: #fff;
    background-color: #007bff;
    content: "";
  }

  /* .custom-checkbox
        .custom-control-input:indeterminate
        ~ .custom-control-label::after {
        background-image: url('data:image/svg + xml;charset=utf8,%3Csvgxmlns="http://www.w3.org/2000/svg"viewBox="0 0 8 8"%3E%3Cpathfill="%23fff"d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z"/%3E%3C/svg%3E');
        content: "";
      } */

  .custom-checkbox
    .custom-control-input:disabled:checked
    ~ .custom-control-label::before {
    background-color: rgba(0, 123, 255, 0.5);
    content: "";
  }

  .custom-checkbox
    .custom-control-input:disabled:indeterminate
    ~ .custom-control-label::before {
    background-color: rgba(0, 123, 255, 0.5);
    content: "";
  }

  .custom-radio .custom-control-label::before {
    border-radius: 50%;
    content: "";
  }

  .custom-radio .custom-control-input:checked ~ .custom-control-label::before {
    background-color: #007bff;
    content: "";
  }

  .custom-radio .custom-control-input:checked ~ .custom-control-label::after {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='%23fff'/%3E%3C/svg%3E");
    content: "";
  }

  .custom-radio
    .custom-control-input:disabled:checked
    ~ .custom-control-label::before {
    background-color: #e9ecef;
    content: "";
  }

  .invalid-feedback {
    color: #e34850;
    /* display: none; */
    margin-top: 0.25rem;
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }

  .form-check-inline.was-validated + .invalid-feedback {
    padding: 0 0 0 30px;
    margin-top: -4px;
  }

  .invalid {
    color: #e34850;
  }

  .form-check-input.is-invalid ~ .form-check-label,
  .was-validated .form-check-input:invalid ~ .form-check-label,
  .custom-control-input.is-invalid ~ .custom-control-label,
  .was-validated .custom-control-input:invalid ~ .custom-control-label {
    color: #dc3545;
  }

  // Kick in the inline
  @include media-breakpoint-up(sm) {
    label {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0;
    }

    // Inline-block all the things for "inline"
    .form-group {
      display: flex;
      flex: 0 0 auto;
      flex-flow: row wrap;
      align-items: center;
      margin-bottom: 0;
    }

    .form-control {
      display: inline-block;
      width: auto;
      vertical-align: middle;
    }

    // Make static controls behave like regular ones
    .form-control-plaintext {
      display: inline-block;
    }

    .input-group {
      width: auto;
    }

    .form-check {
      display: flex;
      align-items: center;
      justify-content: center;
      width: auto;
      padding-left: 0;
    }

    .form-check-input {
      position: relative;
      margin-top: 0;
      margin-right: 0.75rem;
      margin-left: 0;
    }

    .custom-control {
      align-items: center;
      justify-content: center;
    }

    .custom-control-label {
      margin-bottom: 0;
    }
  }
`;
