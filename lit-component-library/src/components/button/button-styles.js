import { css } from "lit";

export const buttonStyles = css`
  body {
    font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
    font-size: 16px;
  }

  button,
  input,
  select,
  textarea {
    background-color: transparent;
    border-style: none;
  }

  button,
  select {
    text-transform: none;
  }

  button {
    overflow: visible;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font: inherit;
  }

  [role="button"],
  [type="button"],
  [type="reset"],
  [type="submit"],
  button {
    cursor: pointer;
    color: inherit;
  }

  .pl-btn-flex {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .pl-btn-ripple {
    display: inline-block;
    position: relative;
    overflow: hidden;
    transition: all ease-in-out 0.5s;
  }

  .pl-btn-ripple::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 25%;
    height: 100%;
    width: 50%;
    background-color: #000;
    border-radius: 30%;
    opacity: 0;
    pointer-events: none;
    transition: all ease-in-out 1s;
    transform: scale(5, 5);
  }

  .pl-btn-ripple:active::after {
    padding: 0;
    margin: 0;
    opacity: 0.2;
    transition: 0s;
    transform: scale(0, 0);
  }

  /* Button styles */
  .pl-btn {
    align-items: center;
    background-color: #e7e7e7;
    border: 1px solid transparent;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.87);
    cursor: pointer;
    display: inline-flex;
    flex: 0 0 auto;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.0892857143em;
    justify-content: center;
    outline: 0;
    position: relative;
    text-decoration: none;
    text-indent: 0.0892857143em;
    transition-duration: 0.28s;
    transition-property: box-shadow, transform, opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
  }

  .pl-btn:hover {
    background-color: rgb(118, 118, 118);
    color: #fff;
    text-decoration: none;
  }

  .pl-btn:before {
    /* background-color: currentColor; */
    border-radius: inherit;
    bottom: 0;
    color: inherit;
    content: "";
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
  }

  .pl-btn:hover:before {
    opacity: 0.08;
  }

  .pl-btn.disabled,
  .pl-btn:disabled {
    opacity: 0.65;
  }

  .pl-btn:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem #8e8e8e;
  }

  .pl-btn.stripped {
    background-color: transparent !important;
    border-color: transparent !important;
    color: #333;
    height: auto !important;
    margin: 0 !important;
    padding: 0 !important;
    width: auto !important;
  }

  .pl-btn.stripped:hover {
    background-color: transparent !important;
    border-color: transparent !important;
    /* color: inherit !important; */
  }

  .pl-btn--block {
    display: flex;
    flex: 1 0 auto;
    min-width: 100% !important;
    max-width: none;
  }

  .pl-btn__content {
    align-items: center;
    color: inherit;
    display: flex;
    flex: 1 0 auto;
    justify-content: inherit;
    line-height: normal;
    position: relative;
    transition: inherit;
    transition-property: opacity;
  }

  .pl-btn.primary {
    background-color: #2680eb;
    border-color: #2680eb;
  }

  .pl-btn.primary:hover {
    background-color: #146dd7;
    border-color: #146dd7;
  }

  .pl-btn.primary.active,
  .pl-btn.primary:not(:disabled):not(.disabled).active,
  .pl-btn.primary:not(:disabled):not(.disabled):active {
    background-color: #1367cb;
    border-color: #1261c0;
  }

  .pl-btn.secondary {
    background-color: #909090;
    border-color: #909090;
  }

  .pl-btn.secondary:hover {
    background-color: #7d7d7d;
    border-color: #7d7d7d;
  }

  .pl-btn.secondary.active,
  .pl-btn.secondary:not(:disabled):not(.disabled).active,
  .pl-btn.secondary:not(:disabled):not(.disabled):active {
    background-color: #777;
    border-color: #707070;
  }

  .pl-btn.tertiary {
    background-color: #b9b9b9;
    border-color: #b9b9b9;
  }

  .pl-btn.tertiary:hover {
    background-color: #a6a6a6;
    border-color: #a6a6a6;
  }

  .pl-btn.active-blue {
    background-color: #909090;
    border-color: #838383;
    color: #252525;
  }

  .pl-btn.active-blue.active,
  .pl-btn.active-blue:hover {
    background-color: #5aa9fa;
    color: #252525;
  }

  .pl-btn.active-blue.active {
    border-color: #419cf9;
  }

  .pl-btn.icon-btn.active-blue.active {
    background-color: transparent;
    border-color: transparent;
    color: #419cf9;
  }

  .pl-btn.success {
    background-color: #2d9d78;
    border-color: #2d9d78;
  }

  .pl-btn.success:hover {
    background-color: #247f61;
    border-color: #247f61;
  }

  .pl-btn.danger {
    background-color: #e34850;
    border-color: #e34850;
  }

  .pl-btn.danger:hover {
    background-color: #de2730;
    border-color: #de2730;
  }

  .pl-btn.warning {
    background-color: #e68619;
    border-color: #e68619;
  }

  .pl-btn.warning:hover {
    background-color: #c47215;
    border-color: #c47215;
  }

  .pl-btn.info {
    background-color: #5aa9fa;
    border-color: #5aa9fa;
  }

  .pl-btn.info:hover {
    background-color: #3596f9;
    border-color: #3596f9;
  }

  .pl-btn.light {
    background-color: #f2f2f2;
    border-color: #f2f2f2;
    color: #212529;
  }

  .pl-btn.light:hover {
    background-color: #dfdfdf;
    border-color: #dfdfdf;
    color: #212529;
  }

  .pl-btn.dark {
    background-color: #323232;
    border-color: #252525;
  }

  .pl-btn.dark:hover {
    background-color: #505050;
    border-color: #252525;
  }

  .pl-btn.text-btn,
  .pl-btn.text,
  .pl-btn.btn-icon {
    background-color: transparent;
    border-color: transparent;
  }

  .pl-btn.text-btn:hover,
  .pl-btn.text:hover,
  .pl-btn.btn-icon:hover {
    color: rgba(0, 0, 0, 0.87);
  }

  .pl-btn.text-btn:hover {
    background-color: #e1e1e1;
  }

  .pl-btn.text-btn.primary--text,
  .pl-btn.text.primary--text,
  .pl-btn.btn-icon.primary--text {
    color: #2680eb;
  }

  .pl-btn.text-btn.primary--text:hover {
    background-color: #146dd7;
    border-color: #146dd7;
  }

  .pl-btn.text.primary--text:hover,
  .pl-btn.btn-icon.primary--text:hover {
    color: #146dd7;
  }

  .pl-btn.text-btn.primary--text:hover {
    color: #f2f2f2;
  }

  .pl-btn.text-btn.secondary--text,
  .pl-btn.text.secondary--text,
  .pl-btn.text-btn.secondary--text {
    color: #909090;
  }

  .pl-btn.text-btn.secondary--text:hover {
    color: #f2f2f2;
    background-color: #7d7d7d;
    border-color: #7d7d7d;
  }

  .pl-btn.text.secondary--text:hover,
  .pl-btn.btn-icon.secondary--text:hover {
    color: #7d7d7d;
  }

  .pl-btn.text-btn.tertiary--text,
  .pl-btn.text.tertiary--text,
  .pl-btn.text-btn.tertiary--text {
    color: #b9b9b9;
  }

  .pl-btn.text-btn.tertiary--text:hover {
    color: #f2f2f2;
    background-color: #a6a6a6;
    border-color: #a6a6a6;
  }

  .pl-btn.text.tertiary--text:hover,
  .pl-btn.btn-icon.tertiary--text:hover {
    color: #a6a6a6;
  }

  .pl-btn.text-btn.success--text,
  .pl-btn.text.success--text,
  .pl-btn.text-btn.success--text {
    color: #2d9d78;
  }

  .pl-btn.text-btn.success--text:hover {
    color: #f2f2f2;
    background-color: #247f61;
    border-color: #247f61;
  }

  .pl-btn.text.success--text:hover,
  .pl-btn.btn-icon.success--text:hover {
    color: #247f61;
  }

  .pl-btn.text-btn.danger--text,
  .pl-btn.text.danger--text,
  .pl-btn.text-btn.danger--text {
    color: #e34850;
  }

  .pl-btn.text-btn.danger--text:hover {
    color: #f2f2f2;
    background-color: #de2730;
    border-color: #de2730;
  }

  .pl-btn.text.danger--text:hover,
  .pl-btn.btn-icon.danger--text:hover {
    color: #de2730;
  }

  .pl-btn.text-btn.warning--text,
  .pl-btn.text.warning--text,
  .pl-btn.text-btn.warning--text {
    color: #e68619;
  }

  .pl-btn.text-btn.warning--text:hover {
    color: #f2f2f2;
    background-color: #c47215;
    border-color: #c47215;
  }

  .pl-btn.text.warning--text:hover,
  .pl-btn.btn-icon.warning--text:hover {
    color: #c47215;
  }

  .pl-btn.text-btn.info--text,
  .pl-btn.text.info--text,
  .pl-btn.text-btn.info--text {
    color: #5aa9fa;
  }

  .pl-btn.text-btn.info--text:hover {
    color: #f2f2f2;
    background-color: #3596f9;
    border-color: #3596f9;
  }

  .pl-btn.text.info--text:hover,
  .pl-btn.btn-icon.info--text:hover {
    color: #3596f9;
  }

  .pl-btn.text-btn.light--text,
  .pl-btn.text.light--text,
  .pl-btn.text-btn.light--text {
    color: #f2f2f2;
  }

  .pl-btn.text-btn.light--text:hover {
    color: #1f1f1f;
    background-color: #dfdfdf;
    border-color: #dfdfdf;
  }

  .pl-btn.text.light--text:hover,
  .pl-btn.btn-icon.light--text:hover {
    color: #dfdfdf;
  }

  .pl-btn.text-btn.dark--text,
  .pl-btn.text.dark--text,
  .pl-btn.text-btn.dark--text {
    color: #323232;
  }

  .pl-btn.text-btn.dark--text:hover {
    color: #f2f2f2;
    background-color: #505050;
    border-color: #252525;
  }

  .pl-btn.text.dark--text:hover,
  .pl-btn.btn-icon.dark--text:hover {
    color: #505050;
  }

  .pl-btn.xs {
    font-size: 0.625rem;
    height: 20px;
    min-width: 36px;
    padding: 0 8.8888888889px 2px !important;
  }

  .pl-btn.sm {
    font-size: 0.75rem;
    height: 28px;
    min-width: 50px;
    padding: 0 12.4444444444px !important;
  }

  .pl-btn.default,
  .pl-btn:not(.pl-btn.circle).pl-btn.default {
    height: 36px;
    min-width: 64px;
    padding: 0 16px;
  }

  .pl-btn.lg {
    font-size: 1.2rem;
    height: 44px;
    min-width: 78px;
    padding: 0 19.5555555556px !important;
  }

  .pl-btn:not(.pl-btn--outlined).accent,
  .pl-btn:not(.pl-btn--outlined).danger,
  .pl-btn:not(.pl-btn--outlined).info,
  .pl-btn:not(.pl-btn--outlined).primary,
  .pl-btn:not(.pl-btn--outlined).secondary,
  .pl-btn:not(.pl-btn--outlined).success,
  .pl-btn:not(.pl-btn--outlined).warning,
  .pl-btn:not(.pl-btn--outlined).dark {
    color: #fff;
  }

  .pl-btn.flat {
    border: none;
    box-shadow: none;
  }

  .pl-btn.pill {
    border-radius: 28px;
  }

  .pl-btn.square {
    border-radius: 0;
  }

  .pl-btn.circle {
    border-radius: 50%;
  }

  .pl-btn.is-elevated {
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
      0 1px 5px 0 rgb(0 0 0 / 12%);
  }

  .elevated-0 {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(0, 0, 0, 0.14),
      0 0 0 0 rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-1 {
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
      0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-2 {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-3 {
    box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2),
      0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-4 {
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
      0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-5 {
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
      0 5px 8px 0 rgba(0, 0, 0, 0.14), 0 1px 14px 0 rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-6 {
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
      0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-7 {
    box-shadow: 0 4px 5px -2px rgba(0, 0, 0, 0.2),
      0 7px 10px 1px rgba(0, 0, 0, 0.14), 0 2px 16px 1px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-8 {
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
      0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-9 {
    box-shadow: 0 5px 6px -3px rgba(0, 0, 0, 0.2),
      0 9px 12px 1px rgba(0, 0, 0, 0.14), 0 3px 16px 2px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-10 {
    box-shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.2),
      0 10px 14px 1px rgba(0, 0, 0, 0.14), 0 4px 18px 3px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-11 {
    box-shadow: 0 6px 7px -4px rgba(0, 0, 0, 0.2),
      0 11px 15px 1px rgba(0, 0, 0, 0.14), 0 4px 20px 3px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-12 {
    box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2),
      0 12px 17px 2px rgba(0, 0, 0, 0.14), 0 5px 22px 4px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-13 {
    box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2),
      0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-14 {
    box-shadow: 0 7px 9px -4px rgba(0, 0, 0, 0.2),
      0 14px 21px 2px rgba(0, 0, 0, 0.14), 0 5px 26px 4px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-15 {
    box-shadow: 0 8px 9px -5px rgba(0, 0, 0, 0.2),
      0 15px 22px 2px rgba(0, 0, 0, 0.14), 0 6px 28px 5px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-16 {
    box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
      0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-17 {
    box-shadow: 0 8px 11px -5px rgba(0, 0, 0, 0.2),
      0 17px 26px 2px rgba(0, 0, 0, 0.14), 0 6px 32px 5px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-18 {
    box-shadow: 0 9px 11px -5px rgba(0, 0, 0, 0.2),
      0 18px 28px 2px rgba(0, 0, 0, 0.14), 0 7px 34px 6px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-19 {
    box-shadow: 0 9px 12px -6px rgba(0, 0, 0, 0.2),
      0 19px 29px 2px rgba(0, 0, 0, 0.14), 0 7px 36px 6px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-20 {
    box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2),
      0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-21 {
    box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2),
      0 21px 33px 3px rgba(0, 0, 0, 0.14), 0 8px 40px 7px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-22 {
    box-shadow: 0 10px 14px -6px rgba(0, 0, 0, 0.2),
      0 22px 35px 3px rgba(0, 0, 0, 0.14), 0 8px 42px 7px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-23 {
    box-shadow: 0 11px 14px -7px rgba(0, 0, 0, 0.2),
      0 23px 36px 3px rgba(0, 0, 0, 0.14), 0 9px 44px 8px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-24 {
    box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
      0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12) !important;
  }

  .pl-btn.icon-btn {
    align-items: center;
    display: inline-flex;
    font-size: 1rem;
    height: 36px;
    justify-content: center;
    line-height: 1.2;
    text-align: center;
    width: 36px;
  }

  .pl-btn.fab,
  .pl-btn.icon-btn {
    min-height: 0;
    min-width: 0;
    padding: 0;
  }

  .pl-btn.icon-btn.regular-icon:hover {
    background-color: transparent;
    color: #4b9cf5;
  }

  .pl-btn.icon-btn.icon-lg {
    font-size: 0.875rem !important;
    height: 44px !important;
    width: 44px !important;
  }

  .pl-btn.icon-btn.large > i {
    font-size: 1.5rem !important;
  }

  .pl-btn.icon-btn.icon-sm {
    font-size: 0.75rem !important;
    height: 28px !important;
    width: 28px !important;
  }

  .pl-btn.icon-btn.small > i {
    font-size: 1rem !important;
  }

  .pl-btn.icon-btn.icon-xs {
    font-size: 0.75rem !important;
    height: 1.2rem !important;
    width: 1.2rem !important;
  }

  .pl-btn.icon-btn.x-small > i {
    font-size: 0.6rem !important;
  }

  .pl-btn--outlined {
    background-color: transparent;
    border: thin solid !important;
  }

  .pl-btn--outlined.accent {
    background-color: transparent;
    border-color: #2680eb;
    color: #2680eb;
  }

  .pl-btn--outlined.accent:hover {
    background-color: #2680eb;
    border-color: #2680eb;
    color: #fff;
  }

  .pl-btn--outlined.primary {
    background-color: transparent;
    border-color: #2680eb;
    color: #2680eb;
  }

  .pl-btn--outlined.primary:hover {
    background-color: #2680eb;
    border-color: #2680eb;
    color: #fff;
  }

  .pl-btn--outlined.secondary {
    background-color: transparent;
    border-color: #909090;
    color: #909090;
  }

  .pl-btn--outlined.secondary:hover {
    background-color: #909090;
    border-color: #909090;
    color: #fff;
  }

  .pl-btn--outlined.tertiary {
    background-color: transparent;
    border-color: #b9b9b9;
    color: #b9b9b9;
  }

  .pl-btn--outlined.tertiary:hover {
    background-color: #b9b9b9;
    border-color: #b9b9b9;
    color: #fff;
  }

  .pl-btn--outlined.success {
    background-color: transparent;
    border-color: #2d9d78;
    color: #2d9d78;
  }

  .pl-btn--outlined.success:hover {
    background-color: #2d9d78;
    border-color: #2d9d78;
    color: #fff;
  }

  .pl-btn--outlined.danger {
    background-color: transparent;
    border-color: #e34850;
    color: #e34850;
  }

  .pl-btn--outlined.danger:hover {
    background-color: #e34850;
    border-color: #e34850;
    color: #fff;
  }

  .pl-btn--outlined.warning {
    background-color: transparent;
    border-color: #e68619;
    color: #e68619;
  }

  .pl-btn--outlined.warning:hover {
    background-color: #e68619;
    border-color: #e68619;
    color: #fff;
  }

  .pl-btn--outlined.info {
    background-color: transparent;
    border-color: #5aa9fa;
    color: #5aa9fa;
  }

  .pl-btn--outlined.info:hover {
    background-color: #5aa9fa;
    border-color: #5aa9fa;
    color: #fff;
  }

  .pl-btn--outlined.light {
    background-color: transparent;
    border-color: #c5c5c5 !important;
  }

  .pl-btn--outlined.light:hover {
    background-color: #f2f2f2;
    border-color: #c5c5c5;
    color: #212529;
  }

  .pl-btn--outlined.dark {
    background-color: transparent;
    border-color: #323232;
    color: #323232;
  }

  .pl-btn--outlined.dark:hover {
    background-color: #323232;
    border-color: #323232;
    color: #fff;
  }

  .pl-btn.link {
    background-color: transparent;
    border-color: transparent;
    color: #2680eb;
  }

  .pl-btn.link:hover {
    background-color: transparent;
    border-color: transparent;
    color: #115bb4;
  }

  .pl-btn.disabled,
  .pl-btn:disabled {
    cursor: default;
    opacity: 0.65;
    pointer-events: none;
  }

  /* Button group styles */
  .pl-btn.pl-btn-group-start {
    border-radius: 4px 0 0 4px;
  }

  .pl-btn.pl-btn-group-end {
    border-radius: 0 4px 4px 0;
  }

  .pl-btn.pl-btn-group-vertical-start {
    border-radius: 4px 4px 0 0;
    width: 100%;
  }

  .pl-btn.pl-btn-group-vertical-end {
    border-radius: 0 0 4px 4px;
    width: 100%;
  }

  .pl-btn.pl-btn-group.pl-btn-group__btn,
  .pl-btn.pl-btn-group-vertical.pl-btn-group__btn {
    border-radius: 0;
    width: 100%;
  }

  .accordion-btn {
    text-align: left !important;
    justify-content: space-between;
    border-radius: 0;
    display: flex;
    width: 100%;
  }
  
`;
