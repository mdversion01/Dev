import { css } from "lit";
import { buttonStyles } from "../button/button-styles.js";

export const buttonGroupStyles = css`
  .pl-btn-group,
  .pl-btn-group-vertical {
    position: relative;
    display: -ms-inline-flexbox;
    display: inline-flex;
    vertical-align: middle;

    border-radius: 4px;
    overflow: hidden;
  }

  .pl-btn-group > .pl-btn-group:not(:last-child) > .pl-btn,
  .pl-btn-group > .pl-btn:not(:last-child):not(.dropdown-toggle) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    /* border: 1px solid red; */
  }

  .pl-btn-group-vertical > ::slotted(pl-button),
  .pl-btn-group > ::slotted(pl-button) {
    position: relative;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
  }
`;
