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

  .dropdown-toggle.lg {
    padding: 0 12px !important;
  }

  .dropdown-toggle.sm {
    padding: 0 6px !important;
  }

  .dropdown-toggle.default {
    padding: 0 8px !important;
  }

  .dropdown-caret {
    width: 0.75rem;
    justify-content: flex-end;
    margin-top: 6px;
    margin-left: 8px;
    margin-right: 2px;
  }

  .custom-fill-color {
    fill: currentColor; /* Set your desired fill color */
  }

  .dropdown-toggle.sm .dropdown-caret {
    margin-top: 3px;
  }

  .dropdown-toggle.icon-menu {
    background-color: transparent;
    border: none;
    border-radius: 0;
  }

  .dropdown-toggle.icon-menu:hover {
    background-color: transparent;
    color: #767676;
  }

  .dropdown-toggle.icon-menu.default {
    width: 36px !important;
    min-width: 36px !important;
    height: 36px;
    padding: 0 !important;
  }

  .dropdown-toggle.icon-menu svg {
    width: 60%; /* 100% of the parent */
    height: 60%; /* 100% of the parent */
  }

  .dropdown-toggle.icon-menu.sm {
    width: 28px;
    min-width: 28px;
    height: 28px;
    padding: 0 !important;
  }

  .dropdown-toggle.icon-menu.lg {
    width: 44px;
    min-width: 44px;
    height: 44px;
    padding: 0 !important;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    display: none;
    float: left;
    min-width: 10rem;
    padding: 0.05rem 0;
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

  .dropdown-menu,
  .dropdown-submenu .dropdown-menu {
    visibility: hidden;
  }

  .dropdown-menu.show,
  .dropdown-submenu .dropdown-menu.show {
    display: block;
    opacity: 1;
    visibility: visible;
  }

  .dropdown-divider {
    height: 0;
    margin: 0.25rem 0;
    overflow: hidden;
    border-top: 1px solid #e9ecef;
  }

  .dropdown-menu.square {
    border-radius: 0;
  }

  .dropdown-menu.pill {
    border-radius: 12px;
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

  .dropdown-item.sm {
    font-size: 0.75rem;
  }

  .dropdown-item.lg {
    font-size: 1.2rem;
  }

  .dropdown-item:focus,
  .dropdown-item:hover {
    color: #16181b !important;
    text-decoration: none !important;
    background-color: #f8f9fa !important;
    outline: 0;
  }

  .dropdown-item.active,
  .dropdown-item:active {
    color: #fff;
    text-decoration: none;
    background-color: #007bff;
  }

  .dropdown-submenu {
    position: relative;
  }

  /* .dropdown-submenu > .dropdown-menu {
    top: -0.225rem;
    left: 100%;
    position: absolute;
  } */

  .dropdown-submenu-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .caret-right {
    width: 0.35rem;
    justify-content: flex-end;
    margin: 2px 0 -2px 4px;
  }

  .dropdown-menu-right .dropdown-submenu {
    display: flex;
    align-items: center;
  }

  .dropdown-menu-right .caret-right {
    width: 0.35rem;
    justify-content: flex-start;
    margin: -2px 4px 2px 4px;
    transform: rotate(180deg);
  }

  .dropdown-menu-right .dropdown-item {
    text-align: right;
  }

  .dropdown-menu-right .dropdown-submenu-toggle.dropdown-item {
    justify-content: flex-end;
  }
  
  /* Add a new class to the focused item in JavaScript */
  .dropdown-item:focus-visible {
    background-color: #f8f9fa;
    color: #16181b;
    outline: 1px solid #007bff;
    /* tabindex: 0; */
  }

  .hidden {
    display: none;
    visibility: hidden;
  }
`;
