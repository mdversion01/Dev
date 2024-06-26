import { css } from "lit";

export const formStyles = css`
  *,
  ::after,
  ::before {
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

  .required:after {
    content: "*";
    color: #b30009;
    margin-left: 5px;
    /* margin-left: -10px; */
    margin-left: 2px;
    margin-top: -2px;
    margin-right: 5px;
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

  form {
    margin: 0;
    padding: 0;
    width: 100%;
  }

  legend {
    padding: 0 10px;
  }

  legend.left {
    text-align: left;
  }

  legend.right {
    text-align: right;
  }

  legend.center {
    text-align: center;
  }

  fieldset {
    border: 1px solid #ccc;
    border-radius: 5px;
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

  input[type="checkbox"],
  input[type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }

  .position-static {
    position: static !important;
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

  .no-pad {
    padding: 0 !important;
  }

  .form-toggle-inline {
    display: inline-flex;
    align-items: center;
    padding-left: 0px;
    margin-right: 0.75rem;
    height: 100%;
    padding-top: 6px;
    padding-bottom: 0;
  }

  // Plumage Search Bar

  /* .search-bar-container {
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
  } */
`;
