import { css } from "lit";

export const plInputFieldStyles = css`
*, ::after, ::before {
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

  .pl-input-container {
    position: relative;
    text-align: left;
  }

  .horizontal .pl-input-container,
  .inline .pl-input-container {
    padding: 0 15px;
  }

  .form-group.pl-input-container {
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

  label .required {
    color: rgb(227, 72, 80);
    font-size: 1.2rem;
    position: absolute;
    top: -4px;
  }

  .horizontal label .required,
  .inline label .required {
    top: 8px;
    right: 2px;
  }

  .horizontal .form-group .form-control-label.invalid,
  .inline .form-group .form-control-label.invalid {
    position: relative;
    align-items: normal;
    padding-top: 12px;
  }

  .form-group .form-control-label,
  .form-group label {
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.1;
    margin-bottom: 0;
  }

  .form-control {
    background-color: transparent;
    background-clip: padding-box;
    border: 0 solid #cacaca;
    border-radius: 0;
    color: #383838;
    display: block;
    font-size: 0.8333rem;
    font-weight: 400;
    line-height: 1.2;
    /* height: calc(1.2em + 0.75rem); */
    padding: 0.375rem 0.5rem;
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

  .pl-input-container input {
    border: none;
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

  .pl-input-container input:focus {
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
    color: #e34850;
    /* display: none; */
    margin-top: 0.25rem;
    font-size: 0.75rem;
  }

  .invalid {
    color: #e34850;
  }

  .invalid.b-underline,
  .invalid.b-focus {
    background-color: #e34850;
  }

  .form-control:invalid,
  .form-control.is-invalid {
    border-color: #e34850;
    padding-right: calc(1.5em + 0.75rem);
    background-repeat: no-repeat;
    background-position: center right calc(-1em + 1.5rem);
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23e34850' viewBox='0 0 24 24'%3e%3cpath d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0 18c4.411 0 8-3.589 8-8s-3.589-8-8-8-8 3.589-8 8 3.589 8 8 8z'/%3e%3cpath d='M13 7h-2v6h2V7zm0 8h-2v2h2v-2z'/%3e%3c/svg%3e");
  }

  .form-control.is-invalid::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #e34850;
  }
  .form-control.is-invalid:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #e34850;
    opacity: 1;
  }
  .form-control.is-invalid::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #e34850;
    opacity: 1;
  }
  .form-control.is-invalid:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #e34850;
  }
  .form-control.is-invalid::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #e34850;
  }

  .form-control.is-invalid::placeholder {
    /* Most modern browsers support this now. */
    color: #e34850;
  }

  .pl-input-container > .pl-input-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    line-height: 1.5;
    border-radius: 0.2rem;
    min-height: 0px;
  }

  .pl-input-container > .pl-input-lg {
    padding: 0.5rem 0.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
    border-radius: 0.3rem;
  }

  [class^="ant-form"],
  [class*=" ant-form"] {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 14px;
    box-sizing: border-box;
  }

  .ant-form-item {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    list-style: none;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    margin-bottom: 24px;
    vertical-align: top;
  }

  [class^="ant-row"],
  [class*=" ant-row"] {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 14px;
    box-sizing: border-box;
  }

  .ant-row {
    display: flex;
    flex-flow: row wrap;
    min-width: 0;
  }

  .form-vertical .ant-form-item-row {
    flex-direction: column;
  }

  [class^="ant-form"] [class^="ant-form"],
  [class*=" ant-form"] [class^="ant-form"],
  [class^="ant-form"] [class*=" ant-form"],
  [class*=" ant-form"] [class*=" ant-form"] {
    box-sizing: border-box;
  }

  .ant-form-item .ant-form-item-label {
    flex-grow: 0;
    overflow: hidden;
    white-space: nowrap;
    text-align: end;
    vertical-align: middle;
  }

  .form-horizontal .ant-form-item-label {
    flex-grow: 0;
  }

  .form-inline .ant-form-item {
    flex: none;
    margin-inline-end: 16px;
    margin-bottom: 0;
  }

  .form-inline .ant-form-item-row {
    flex-wrap: nowrap;
  }

  .ant-form-item .ant-form-item-label {
    flex-grow: 0;
    overflow: hidden;
    white-space: nowrap;
    text-align: end;
    vertical-align: middle;
  }

  .ant-form-item .ant-form-item-label > label {
    position: relative;
    display: inline-flex;
    align-items: center;
    max-width: 100%;
    height: 32px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
  }

  .form-vertical .ant-form-item-label > label {
    height: auto;
  }

  .ant-form-item .ant-form-item-label > label::after {
    content: ":";
    position: relative;
    margin-block: 0;
    margin-inline-start: 2px;
    margin-inline-end: 8px;
  }

  .form-vertical .ant-form-item-label,
  .ant-col-24.ant-form-item-label,
  .ant-col-xl-24.ant-form-item-label {
    padding: 0 0 8px;
    margin: 0;
    white-space: initial;
    text-align: start;
  }

  .form-vertical .ant-form-item-label {
    flex-basis: auto;
    justify-content: left;
  }

  .ant-form-item .ant-form-item-control {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .form-horizontal .ant-form-item-control {
    flex: 1 1 0;
    min-width: 0;
  }

  .ant-form-item .ant-form-item-control-input {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 32px;
  }

  .ant-form-item .ant-form-item-control-input-content {
    flex: auto;
    max-width: 100%;
  }

  .form-vertical .ant-form-item .ant-form-item-control {
    width: 100%;
  }

  [class^="ant-input"],
  [class*=" ant-input"] {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 14px;
    box-sizing: border-box;
  }

  .ant-input {
    box-sizing: border-box;
    margin: 0;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    list-style: none;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    position: relative;
    display: inline-block;
    width: 100%;
    min-width: 0;
    border-radius: 6px;
    transition: all 0.2s;
  }

  .ant-input-outlined {
    //background: #ffffff;
    border-width: 1;
    border-style: solid;
    border-color: transparent;
  }

  .ant-input-outlined:focus,
  .ant-input-outlined:focus-within {
    // border-color: #1677ff;
    box-shadow: none;
    outline: 0;
    background-color: #ffffff;
  }

  .ant-input:placeholder-shown {
    text-overflow: ellipsis;
  }
`;
