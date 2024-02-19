import { css } from "lit";

export const dropdownStyles = css`
  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }

  .dropdown,
  .dropup {
    position: relative;
    display: inline-block;
  }

  .dropdown-toggle::after {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 0.255em;
    vertical-align: 0.255em;
    content: "";
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    display: none;
    float: left;
    min-width: 10rem;
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
  }

  .dropdown-menu.show {
    display: block;
  }

  a {
    color: #007bff;
    text-decoration: none;
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
  }

  .dropdown-item {
    display: block;
    width: 100%;
    padding: 0.25rem 0.5rem;
    clear: both;
    font-weight: 400;
    color: #212529;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
  }

  .dropdown-item:focus,
  .dropdown-item:hover {
    color: #16181b !important;
    text-decoration: none !important;
    background-color: #f8f9fa !important;
    outline: 0;
  }

  /* Add a new class to the focused item in JavaScript */
  .focused-item {
    background-color: #f8f9fa;
    color: #16181b;
    outline: 1px solid #007bff;
    tabindex: 0;
  }

  .dropdown-item.active,
  .dropdown-item:active {
    color: #fff;
    text-decoration: none;
    background-color: #007bff;
  }
`;
