import { css } from "lit";

export const checkboxRadioStyles = css`
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

  .position-static {
    position: static !important;
  }

  label {
    display: inline-block;
    margin-bottom: 0.5rem;
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
    color: $text-muted;
  }

  .form-check-label {
    margin-bottom: 0;
  }

  .form-check-inline {
    display: inline-flex;
    align-items: center;
    padding-left: 0;
    margin-right: 0.75rem;
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
