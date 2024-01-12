import { css } from "lit";

export const dividerStyles = css`
  [class^="pl-divider"],
  [class*=" pl-divider"] {
    font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
    font-size: 14px;
    box-sizing: border-box;
  }

  [class^="pl-divider"]::before,
  [class*=" pl-divider"]::before,
  [class^="pl-divider"]::after,
  [class*=" pl-divider"]::after {
    box-sizing: border-box;
  }

  [class^="pl-divider"] [class^="pl-divider"],
  [class*=" pl-divider"] [class^="pl-divider"],
  [class^="pl-divider"] [class*=" pl-divider"],
  [class*=" pl-divider"] [class*=" pl-divider"] {
    box-sizing: border-box;
  }

  [class^="pl-divider"] [class^="pl-divider"]::before,
  [class*=" pl-divider"] [class^="pl-divider"]::before,
  [class^="pl-divider"] [class*=" pl-divider"]::before,
  [class*=" pl-divider"] [class*=" pl-divider"]::before,
  [class^="pl-divider"] [class^="pl-divider"]::after,
  [class*=" pl-divider"] [class^="pl-divider"]::after,
  [class^="pl-divider"] [class*=" pl-divider"]::after,
  [class*=" pl-divider"] [class*=" pl-divider"]::after {
    box-sizing: border-box;
  }

  .pl-divider {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    list-style: none;
    font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
    border-block-start: 1px solid rgba(5, 5, 5, 0.15);
  }

  .pl-divider-vertical {
    position: relative;
    top: -0.06em;
    display: inline-block;
    height: 0.9em;
    margin-inline: 8px;
    margin-block: 0;
    vertical-align: middle;
    border-top: 0;
    border-inline-start: 1px solid rgba(5, 5, 5, 0.15);
  }

  .pl-divider-horizontal {
    display: flex;
    clear: both;
    width: 100%;
    min-width: 100%;
    margin: 24px 0;
  }

  .pl-divider-horizontal.pl-divider-with-text {
    display: flex;
    align-items: center;
    margin: 16px 0;
    color: rgba(0, 0, 0, 0.88);
    font-weight: 500;
    font-size: 16px;
    white-space: nowrap;
    text-align: center;
    border-block-start: 0 rgba(5, 5, 5, 0.15);
  }

  .pl-divider-horizontal.pl-divider-with-text::before,
  .pl-divider-horizontal.pl-divider-with-text::after {
    position: relative;
    width: 50%;
    border-block-start: 1px solid transparent;
    border-block-start-color: inherit;
    border-block-end: 0;
    transform: translateY(50%);
    content: "";
  }

  .pl-divider-horizontal.pl-divider-with-text-left::before {
    width: calc(0.05 * 100%);
  }

  .pl-divider-horizontal.pl-divider-with-text-left::after {
    width: calc(100% - 0.05 * 100%);
  }

  .pl-divider-horizontal.pl-divider-with-text-right::before {
    width: calc(100% - 0.05 * 100%);
  }

  .pl-divider-horizontal.pl-divider-with-text-right::after {
    width: calc(0.05 * 100%);
  }

  .pl-divider .pl-divider-inner-text {
    display: inline-block;
    padding-block: 0;
    padding-inline: 1em;
  }

  .pl-divider-dashed {
    background: none;
    border-color: rgba(5, 5, 5, 0.15);
    border-style: dashed;
    border-width: 1px 0 0;
  }

  .pl-divider-horizontal.pl-divider-with-text.pl-divider-dashed::before,
  .pl-divider-horizontal.pl-divider-with-text.pl-divider-dashed::after {
    border-style: dashed none none;
  }

  .pl-divider-vertical.pl-divider-dashed {
    border-inline-start-width: 1px;
    border-inline-end: 0;
    border-block-start: 0;
    border-block-end: 0;
  }

  .pl-divider-plain.pl-divider-with-text {
    color: rgba(0, 0, 0, 0.88);
    font-weight: normal;
    font-size: 14px;
  }

  .pl-divider-horizontal.pl-divider-with-text-left.pl-divider-no-default-orientation-margin-left::before {
    width: 0;
  }

  .pl-divider-horizontal.pl-divider-with-text-left.pl-divider-no-default-orientation-margin-left::after {
    width: 100%;
  }

  .pl-divider-horizontal.pl-divider-with-text-left.pl-divider-no-default-orientation-margin-left
    .pl-divider-inner-text {
    padding-inline-start: 0;
  }

  .pl-divider-horizontal.pl-divider-with-text-right.pl-divider-no-default-orientation-margin-right::before {
    width: 100%;
  }

  .pl-divider-horizontal.pl-divider-with-text-right.pl-divider-no-default-orientation-margin-right::after {
    width: 0;
  }

  .pl-divider-horizontal.pl-divider-with-text-right.pl-divider-no-default-orientation-margin-right
    .pl-divider-inner-text {
    padding-inline-end: 0;
  }
`;
