import { css } from "lit";

export const inputFieldStyles = css`
  
  input {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    margin: 0;
  }

  input {
    overflow: visible;
  }

  .form-group {
    padding: 5px 15px;
  }

  .form-group {
    margin-bottom: 0.25rem;
  }

  .form-group {
    text-align: left;
  }

  .horizontal .form-group {
    padding: 5px;
  }

  .basic-input-container {
    position: relative;
    text-align: left;
  }

  .horizontal .basic-input-container,
  .inline .basic-input-container {
    padding: 0 15px;
  }

  .form-group.basic-input-container {
    margin-bottom: 0.25rem;
  }

  label {
    display: inline-block;
    margin-bottom: 0.5rem;
  }

  .horizontal label,
  .inline label {
    display: flex;
    align-items: center;
    justify-content: right;
    margin-bottom: 0;
    position: relative;
  }

  label {
    font-size: 0.75rem;
    position: relative;
  }

  .horizontal .form-group .form-control-label.invalid,
  .inline .form-group .form-control-label.invalid {
    position: relative;
    align-items: normal;
    padding-top: 12px;
  }

  .col-form-label {
    padding-top: calc(0.375rem + 1px);
    padding-bottom: calc(0.375rem + 1px);
    margin-bottom: 0;
    font-size: inherit;
    line-height: 1.5;
  }

  .form-group .form-control-label,
  .form-group label {
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.1;
    margin-bottom: 0.25rem;
  }

  .horizontal .form-group .form-control-label,
  .horizontal .form-group label,
  .inline .form-group .form-control-label,
  .inline .form-group label {
    margin-bottom: 0;
    white-space: nowrap;
  }

  .inline .form-group .form-control-label,
  .inline .form-group label {
    padding: 0 0.5rem;
  }

  .form-control {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    width: 100%;
  }

  .form-control:disabled {
    background-color: #f5f5f5;
  }

  .form-control.input-sm {
    padding: 4px 0.5rem;
    font-size: 0.8333rem;
  }

  .form-control.input-lg {
    padding: 8px 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
  }

  .basic-input-container input {
    /* border: none; */
    font-size: 0.9375rem;
    font-weight: 300;
    line-height: 1.2;
    transition: border-color 0.25s ease;
  }

  .form-control:focus {
    background-color: transparent;
    border-color: #9bc4f6;
    color: #383838;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
  }

  .basic-input-container input:focus {
    /* border-bottom: 1px solid #2680eb; */
    box-shadow: none;
    outline: none;
  }

  /* Underline the input */
  .b-underline {
    background-color: #ccc;
    display: block;
    height: 1px;
    position: relative;
    transition: 0.4s;
    width: 100%;
  }

  .b-focus {
    background-color: #2680eb;
    bottom: 0;
    height: 1px;
    left: 50%;
    position: absolute;
    transition: 0.4s;
    width: 0;
  }

  :disabled.b-focus,
  .disabled.b-focus {
    background-color: transparent;
  }

  .invalid-feedback {
    color: #b30009;
    /* display: none; */
    margin-top: 0.25rem;
    font-size: 0.75rem;
  }

  .invalid {
    color: #b30009;
  }

  .invalid.b-underline,
  .invalid.b-focus {
    background-color: #b30009;
  }

  .form-control:invalid,
  .form-control.is-invalid {
    border-color: #b30009;
    padding-right: calc(1.5em + 0.75rem);
    background-repeat: no-repeat;
    background-position: center right calc(-1em + 1.5rem);
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23e34850' viewBox='0 0 24 24'%3e%3cpath d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0 18c4.411 0 8-3.589 8-8s-3.589-8-8-8-8 3.589-8 8 3.589 8 8 8z'/%3e%3cpath d='M13 7h-2v6h2V7zm0 8h-2v2h2v-2z'/%3e%3c/svg%3e");
  }

  .form-control.is-invalid::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #b30009;
  }
  .form-control.is-invalid:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #b30009;
    opacity: 1;
  }
  .form-control.is-invalid::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #b30009;
    opacity: 1;
  }
  .form-control.is-invalid:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #b30009;
  }
  .form-control.is-invalid::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #b30009;
  }

  .form-control.is-invalid::placeholder {
    /* Most modern browsers support this now. */
    color: #b30009;
  }

  .basic-input-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    line-height: 1.5;
    border-radius: 0.2rem;
    min-height: 0px;
  }

  .basic-input-lg {
    padding: 0.5rem 0.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
    border-radius: 0.3rem;
  }
`;
