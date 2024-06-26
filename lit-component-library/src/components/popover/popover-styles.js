import { css } from "lit";

export const popoverStyles = css`
  *,
  :after,
  :before {
    box-sizing: border-box;
  }

  :after,
  :before {
    text-decoration: inherit;
    vertical-align: inherit;
  }

  /* .primary {
    background-color: #1867c0 !important;
  } */

  /* .secondary {
    background-color: #6c757d !important;
  } */

  /* .success {
    background-color: #28a745 !important;
  } */

  /* .info {
    background-color: #17a2b8 !important;
  } */

  /* .warning {
    background-color: #ffc107 !important;
    color: #000 !important;
  } */

  /* .danger {
    background-color: #dc3545 !important;
  } */

  /* .dark {
    background-color: #343a40 !important;
  } */

  .popover {
    position: absolute;
    z-index: 1070;
    display: block;
    max-width: 276px;
    padding: 1px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, sans-serif;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
    text-align: left;
    white-space: normal;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
  }

  .popover-header {
    padding: 0.5rem 0.75rem;
    margin-bottom: 0;
    font-size: 1rem;
    color: inherit;
    background-color: #f7f7f7;
    border-bottom: 1px solid #ebebeb;
    border-top-left-radius: calc(0.3rem - 1px);
    border-top-right-radius: calc(0.3rem - 1px);
  }

  .popover-body {
    padding: 0.5rem 0.75rem;
  }

  .popover {
  }

  .popover-top,
  .popover-topleft,
  .popover-topright {
    margin-bottom: 0.5rem;
  }

  .popover-bottom,
  .popover-bottomleft,
  .popover-bottomright {
    margin-top: 0.15rem;
  }

  .popover-left,
  .popover-lefttop,
  .popover-leftbottom {
    margin-right: 0;
  }

  .popover-right,
  .popover-righttop,
  .popover-rightbottom {
    margin-left: 0;
  }

  .popover-arrow {
    position: absolute;
    width: 1rem;
    height: 0.5rem;
    display: block;
  }

  .popover-arrow.top {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .popover-arrow.topleft {
    bottom: 0;
    left: 0;
    transform: translateX(50%);
  }

  .popover-arrow.topright {
    bottom: 0;
    right: 0;
    transform: translateX(-50%);
  }

  .popover-arrow.bottom {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .popover-arrow.bottomleft {
    top: 0;
    left: 0;
    transform: translateX(50%);
  }

  .popover-arrow.bottomright {
    top: 0;
    right: 0;
    transform: translateX(-50%);
  }

  .popover[data-popover-placement^="top"] > .popover-arrow,
  .popover[data-popover-placement^="topleft"] > .popover-arrow,
  .popover[data-popover-placement^="topright"] > .popover-arrow,
  .popover-top > .popover-arrow {
    bottom: calc(-1 * 0.5rem - 1px);
  }

  .popover[data-popover-placement^="top"] > .popover-arrow::after,
  .popover[data-popover-placement^="top"] > .popover-arrow::before,
  .popover[data-popover-placement^="topleft"] > .popover-arrow::after,
  .popover[data-popover-placement^="topleft"] > .popover-arrow::before,
  .popover[data-popover-placement^="topright"] > .popover-arrow::after,
  .popover[data-popover-placement^="topright"] > .popover-arrow::before,
  .popover-top > .popover-arrow::after,
  .popover-top > .popover-arrow::before {
    border-width: 0.5rem calc(1rem * 0.5) 0;
  }

  .popover[data-popover-placement^="top"] > .popover-arrow::before,
  .popover[data-popover-placement^="topleft"] > .popover-arrow::before,
  .popover[data-popover-placement^="topright"] > .popover-arrow::before,
  .popover-top > .popover-arrow::before {
    bottom: 0;
    border-top-color: rgba(0, 0, 0, 0.2);
  }

  .popover[data-popover-placement^="top"] > .popover-arrow::after,
  .popover[data-popover-placement^="topleft"] > .popover-arrow::after,
  .popover[data-popover-placement^="topright"] > .popover-arrow::after,
  .popover-top > .popover-arrow::after {
    bottom: 0.09rem;
    border-top-color: #fff;
  }

  .popover[data-popover-placement^="bottom"] > .popover-arrow,
  .popover[data-popover-placement^="bottomleft"] > .popover-arrow,
  .popover[data-popover-placement^="bottomright"] > .popover-arrow,
  .popover-bottom > .popover-arrow {
    top: calc(-1 * 0.5rem - 1px);
  }

  .popover[data-popover-placement^="bottom"] > .popover-arrow::after,
  .popover[data-popover-placement^="bottom"] > .popover-arrow::before,
  .popover[data-popover-placement^="bottomleft"] > .popover-arrow::after,
  .popover[data-popover-placement^="bottomleft"] > .popover-arrow::before,
  .popover[data-popover-placement^="bottomright"] > .popover-arrow::after,
  .popover[data-popover-placement^="bottomright"] > .popover-arrow::before,
  .popover-bottom > .popover-arrow::after,
  .popover-bottom > .popover-arrow::before {
    border-width: 0 calc(1rem * 0.5) 0.5rem;
  }

  .popover[data-popover-placement^="bottom"] > .popover-arrow::before,
  .popover[data-popover-placement^="bottomleft"] > .popover-arrow::before,
  .popover[data-popover-placement^="bottomright"] > .popover-arrow::before,
  .popover-bottom > .popover-arrow::before {
    top: 0;
    border-bottom-color: rgba(0, 0, 0, 0.175);
  }

  .popover[data-popover-placement^="bottom"] > .popover-arrow::after,
  .popover[data-popover-placement^="bottomleft"] > .popover-arrow::after,
  .popover[data-popover-placement^="bottomright"] > .popover-arrow::after,
  .popover-bottom > .popover-arrow::after {
    top: 0.09rem;
    border-bottom-color: #fff;
  }

  .popover-arrow.left {
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .popover-arrow.lefttop {
    right: 0;
    bottom: 0;
    transform: translateY(-50%);
  }

  .popover-arrow.leftbottom {
    right: 0;
    top: 0;
    transform: translateY(50%);
  }

  .popover[data-popover-placement^="left"] > .popover-arrow,
  .popover[data-popover-placement^="lefttop"] > .popover-arrow,
  .popover[data-popover-placement^="leftbottom"] > .popover-arrow,
  .popover-start > .popover-arrow {
    right: calc(-1 * 0.5rem - 1px);
    width: 0.5rem;
    height: 1rem;
  }

  .popover[data-popover-placement^="left"] > .popover-arrow::after,
  .popover[data-popover-placement^="left"] > .popover-arrow::before,
  .popover[data-popover-placement^="lefttop"] > .popover-arrow::after,
  .popover[data-popover-placement^="lefttop"] > .popover-arrow::before,
  .popover[data-popover-placement^="leftbottom"] > .popover-arrow::after,
  .popover[data-popover-placement^="leftbottom"] > .popover-arrow::before,
  .popover-start > .popover-arrow::after,
  .popover-start > .popover-arrow::before {
    border-width: calc(1rem * 0.5) 0 calc(1rem * 0.5) 0.5rem;
  }

  .popover[data-popover-placement^="left"] > .popover-arrow::before,
  .popover[data-popover-placement^="lefttop"] > .popover-arrow::before,
  .popover[data-popover-placement^="leftbottom"] > .popover-arrow::before,
  .popover-start > .popover-arrow::before {
    right: 0;
    border-left-color: rgba(0, 0, 0, 0.175);
  }

  .popover[data-popover-placement^="left"] > .popover-arrow::after,
  .popover[data-popover-placement^="lefttop"] > .popover-arrow::after,
  .popover[data-popover-placement^="leftbottom"] > .popover-arrow::after,
  .popover-start > .popover-arrow::after {
    right: 0.09rem;
    border-left-color: #fff;
  }

  .popover-arrow.right {
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .popover-arrow.righttop {
    left: 0;
    bottom: 0;
    transform: translateY(-50%);
  }

  .popover-arrow.rightbottom {
    left: 0;
    top: 0;
    transform: translateY(50%);
  }

  .popover .popover-arrow::after,
  .popover .popover-arrow::before {
    position: absolute;
    display: block;
    content: "";
    border-color: transparent;
    border-style: solid;
    border-width: 0;
  }

  .popover[data-popover-placement^="right"] > .popover-arrow,
  .popover[data-popover-placement^="righttop"] > .popover-arrow,
  .popover[data-popover-placement^="rightbottom"] > .popover-arrow,
  .popover-end > .popover-arrow {
    left: calc(-1 * 0.5rem - 1px);
    width: 0.5rem;
    height: 1rem;
  }

  .popover[data-popover-placement^="right"] > .popover-arrow::after,
  .popover[data-popover-placement^="right"] > .popover-arrow::before,
  .popover[data-popover-placement^="righttop"] > .popover-arrow::after,
  .popover[data-popover-placement^="righttop"] > .popover-arrow::before,
  .popover[data-popover-placement^="rightbottom"] > .popover-arrow::after,
  .popover[data-popover-placement^="rightbottom"] > .popover-arrow::before,
  .popover-end > .popover-arrow::after,
  .popover-end > .popover-arrow::before {
    border-width: calc(1rem * 0.5) 0.5rem calc(1rem * 0.5) 0;
  }

  .popover[data-popover-placement^="right"] > .popover-arrow::before,
  .popover[data-popover-placement^="righttop"] > .popover-arrow::before,
  .popover[data-popover-placement^="rightbottom"] > .popover-arrow::before,
  .popover-end > .popover-arrow::before {
    left: 0;
    border-right-color: rgba(0, 0, 0, 0.175);
  }

  .popover[data-popover-placement^="right"] > .popover-arrow::after,
  .popover[data-popover-placement^="righttop"] > .popover-arrow::after,
  .popover[data-popover-placement^="rightbottom"] > .popover-arrow::after,
  .popover-end > .popover-arrow::after {
    left: 0.09rem;
    border-right-color: #fff;
  }

  .fade {
    transition: opacity 0.15s linear;
  }

  .show {
    display: block !important;
    opacity: 1;
  }

  .plumage.popover {
    line-height: 1.2;
    text-align: start;
    text-decoration: none;
    text-shadow: none;
    text-transform: none;
    letter-spacing: normal;
    word-break: normal;
    word-spacing: normal;
    line-break: auto;
    font-size: 0.75rem;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: padding-box;
    border-radius: 0.25rem;
    padding: 0;
  }

  .plumage.popover .popover-header {
    font-size: 0.8333rem;
    border-bottom: 1px solid #ebebeb;
    background-color: #f0f0f0;
  }

  .plumage.popover .popover-arrow {
    margin: 0;
  }

  .plumage.popover .popover-arrow:before,
  .plumage.popover .popover-arrow:after {
    content: "";
    border-width: 0.5rem;
    border-style: solid;
    display: block;
    position: absolute;
    border-color: transparent;
  }

  .plumage.popover-arrow.top {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .plumage.popover-arrow.topleft {
    bottom: 0;
    left: 0;
    transform: translateX(50%);
  }

  .plumage.popover-arrow.topright {
    bottom: 0;
    right: 0;
    transform: translateX(-50%);
  }

  .plumage.popover-arrow.bottom {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .plumage.popover-arrow.bottomleft {
    top: 0;
    left: 0;
    transform: translateX(50%);
  }

  .plumage.popover-arrow.bottomright {
    top: 0;
    right: 0;
    transform: translateX(-50%);
  }

  .plumage.popover[data-popover-placement^="top"] > .popover-arrow,
  .plumage.popover[data-popover-placement^="topleft"] > .popover-arrow,
  .plumage.popover[data-popover-placement^="topright"] > .popover-arrow,
  .plumage.popover-top > .popover-arrow {
    bottom: calc(-1 * 0.5rem - 1px);
  }

  .plumage.popover[data-popover-placement^="top"] > .popover-arrow::after,
  .plumage.popover[data-popover-placement^="top"] > .popover-arrow::before,
  .plumage.popover[data-popover-placement^="topleft"] > .popover-arrow::after,
  .plumage.popover[data-popover-placement^="topleft"] > .popover-arrow::before,
  .plumage.popover[data-popover-placement^="topright"] > .popover-arrow::after,
  .plumage.popover[data-popover-placement^="topright"] > .popover-arrow::before,
  .plumage.popover-top > .popover-arrow::after,
  .plumage.popover-top > .popover-arrow::before {
    border-width: 0.5rem calc(1rem * 0.5) 0;
  }

  .plumage.popover[data-popover-placement^="top"] > .popover-arrow::before,
  .plumage.popover[data-popover-placement^="topleft"] > .popover-arrow::before,
  .plumage.popover[data-popover-placement^="topright"] > .popover-arrow::before,
  .plumage.popover-top > .popover-arrow::before {
    bottom: 0;
    border-top-color: rgba(0, 0, 0, 0.2);
  }

  .plumage.popover[data-popover-placement^="top"] > .popover-arrow::after,
  .plumage.popover[data-popover-placement^="topleft"] > .popover-arrow::after,
  .plumage.popover[data-popover-placement^="topright"] > .popover-arrow::after,
  .plumage.popover-top > .popover-arrow::after {
    bottom: 0.09rem;
    border-top-color: #fff;
  }

  .plumage.super-tooltip[data-popover-placement^="top"] > .popover-arrow::after,
  .plumage.super-tooltip[data-popover-placement^="topleft"]
    > .popover-arrow::after,
  .plumage.super-tooltip[data-popover-placement^="topright"]
    > .popover-arrow::after,
  .plumage.super-tooltip.popover-top > .popover-arrow::after {
    border-top-color: #e1e1e1;
  }

  .plumage.popover[data-popover-placement^="bottom"] > .popover-arrow,
  .plumage.popover[data-popover-placement^="bottomleft"] > .popover-arrow,
  .plumage.popover[data-popover-placement^="bottomright"] > .popover-arrow,
  .plumage.popover-bottom > .popover-arrow {
    top: calc(-1 * 0.5rem - 1px);
  }

  .plumage.popover[data-popover-placement^="bottom"] > .popover-arrow::after,
  .plumage.popover[data-popover-placement^="bottom"] > .popover-arrow::before,
  .plumage.popover[data-popover-placement^="bottomleft"]
    > .popover-arrow::after,
  .plumage.popover[data-popover-placement^="bottomleft"]
    > .popover-arrow::before,
  .plumage.popover[data-popover-placement^="bottomright"]
    > .popover-arrow::after,
  .plumage.popover[data-popover-placement^="bottomright"]
    > .popover-arrow::before,
  .plumage.popover-bottom > .popover-arrow::after,
  .plumage.popover-bottom > .popover-arrow::before {
    border-width: 0 calc(1rem * 0.5) 0.5rem;
  }

  .plumage.popover[data-popover-placement^="bottom"] > .popover-arrow::before,
  .plumage.popover[data-popover-placement^="bottomleft"]
    > .popover-arrow::before,
  .plumage.popover[data-popover-placement^="bottomright"]
    > .popover-arrow::before,
  .plumage.popover-bottom > .popover-arrow::before {
    top: 0;
    border-bottom-color: rgba(0, 0, 0, 0.175);
  }

  .plumage.popover[data-popover-placement^="bottom"] > .popover-arrow::after,
  .plumage.popover[data-popover-placement^="bottomleft"]
    > .popover-arrow::after,
  .plumage.popover[data-popover-placement^="bottomright"]
    > .popover-arrow::after,
  .plumage.popover-bottom > .popover-arrow::after {
    top: 0.09rem;
    border-bottom-color: #fff;
  }

  .plumage.super-tooltip[data-popover-placement^="bottom"]
    > .popover-arrow::after,
  .plumage.super-tooltip[data-popover-placement^="bottomleft"]
    > .popover-arrow::after,
  .plumage.super-tooltip[data-popover-placement^="bottomright"]
    > .popover-arrow::after,
  .plumage.super-tooltip.popover-bottom > .popover-arrow::after {
    border-bottom-color: #e1e1e1;
  }

  .plumage.popover-arrow.left {
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .plumage.popover-arrow.lefttop {
    right: 0;
    bottom: 0;
    transform: translateY(-50%);
  }

  .plumage.popover-arrow.leftbottom {
    right: 0;
    top: 0;
    transform: translateY(50%);
  }

  .plumage.popover[data-popover-placement^="left"] > .popover-arrow,
  .plumage.popover[data-popover-placement^="lefttop"] > .popover-arrow,
  .plumage.popover[data-popover-placement^="leftbottom"] > .popover-arrow,
  .plumage.popover-start > .popover-arrow {
    right: calc(-1 * 0.5rem - 1px);
    width: 0.5rem;
    height: 1rem;
  }

  .plumage.popover[data-popover-placement^="left"] > .popover-arrow::after,
  .plumage.popover[data-popover-placement^="left"] > .popover-arrow::before,
  .plumage.popover[data-popover-placement^="lefttop"] > .popover-arrow::after,
  .plumage.popover[data-popover-placement^="lefttop"] > .popover-arrow::before,
  .plumage.popover[data-popover-placement^="leftbottom"]
    > .popover-arrow::after,
  .plumage.popover[data-popover-placement^="leftbottom"]
    > .popover-arrow::before,
  .plumage.popover-start > .popover-arrow::after,
  .plumage.popover-start > .popover-arrow::before {
    border-width: calc(1rem * 0.5) 0 calc(1rem * 0.5) 0.5rem;
  }

  .plumage.popover[data-popover-placement^="left"] > .popover-arrow::before,
  .plumage.popover[data-popover-placement^="lefttop"] > .popover-arrow::before,
  .plumage.popover[data-popover-placement^="leftbottom"]
    > .popover-arrow::before,
  .plumage.popover-start > .popover-arrow::before {
    right: 0;
    border-left-color: rgba(0, 0, 0, 0.175);
  }

  .plumage.popover[data-popover-placement^="left"] > .popover-arrow::after,
  .plumage.popover[data-popover-placement^="lefttop"] > .popover-arrow::after,
  .plumage.popover[data-popover-placement^="leftbottom"]
    > .popover-arrow::after,
  .plumage.popover-start > .popover-arrow::after {
    right: 0.09rem;
    border-left-color: #fff;
  }

  .plumage.super-tooltip[data-popover-placement^="left"]
    > .popover-arrow::after,
  .plumage.super-tooltip[data-popover-placement^="lefttop"]
    > .popover-arrow::after,
  .plumage.super-tooltip[data-popover-placement^="leftbottom"]
    > .popover-arrow::after,
  .plumage.super-tooltip.popover-start > .popover-arrow::after {
    border-left-color: #e1e1e1;
  }

  .plumage.popover-arrow.right {
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .plumage.popover-arrow.righttop {
    left: 0;
    bottom: 0;
    transform: translateY(-50%);
  }

  .plumage.popover-arrow.rightbottom {
    left: 0;
    top: 0;
    transform: translateY(50%);
  }

  .plumage.popover .popover-arrow::after,
  .plumage.popover .popover-arrow::before {
    position: absolute;
    display: block;
    content: "";
    border-color: transparent;
    border-style: solid;
    border-width: 0;
  }

  .plumage.popover[data-popover-placement^="right"] > .popover-arrow,
  .plumage.popover[data-popover-placement^="righttop"] > .popover-arrow,
  .plumage.popover[data-popover-placement^="rightbottom"] > .popover-arrow,
  .plumage.popover-end > .popover-arrow {
    left: calc(-1 * 0.5rem - 1px);
    width: 0.5rem;
    height: 1rem;
  }

  .plumage.popover[data-popover-placement^="right"] > .popover-arrow::after,
  .plumage.popover[data-popover-placement^="right"] > .popover-arrow::before,
  .plumage.popover[data-popover-placement^="righttop"] > .popover-arrow::after,
  .plumage.popover[data-popover-placement^="righttop"] > .popover-arrow::before,
  .plumage.popover[data-popover-placement^="rightbottom"]
    > .popover-arrow::after,
  .plumage.popover[data-popover-placement^="rightbottom"]
    > .popover-arrow::before,
  .plumage.popover-end > .popover-arrow::after,
  .plumage.popover-end > .popover-arrow::before {
    border-width: calc(1rem * 0.5) 0.5rem calc(1rem * 0.5) 0;
  }

  .plumage.popover[data-popover-placement^="right"] > .popover-arrow::before,
  .plumage.popover[data-popover-placement^="righttop"] > .popover-arrow::before,
  .plumage.popover[data-popover-placement^="rightbottom"]
    > .popover-arrow::before,
  .plumage.popover-end > .popover-arrow::before {
    left: 0;
    border-right-color: rgba(0, 0, 0, 0.175);
  }

  .plumage.popover[data-popover-placement^="right"] > .popover-arrow::after,
  .plumage.popover[data-popover-placement^="righttop"] > .popover-arrow::after,
  .plumage.popover[data-popover-placement^="rightbottom"]
    > .popover-arrow::after,
  .plumage.popover-end > .popover-arrow::after {
    left: 0.09rem;
    border-right-color: #fff;
  }

  .plumage.super-tooltip[data-popover-placement^="right"]
    > .popover-arrow::after,
  .plumage.super-tooltip[data-popover-placement^="righttop"]
    > .popover-arrow::after,
  .plumage.super-tooltip[data-popover-placement^="rightbottom"]
    > .popover-arrow::after,
  .plumage.super-tooltip.popover-end > .popover-arrow::after {
    border-right-color: #e1e1e1;
  }

  .plumage.popover .popover-body {
    padding: 0.5rem 0.75rem;
    color: #383838;
  }

  .plumage.super-tooltip .popover-arrow:after {
    border-width: 0.5rem 0.5rem 0.5rem 0;
  }

  .plumage.popover .popover-body {
    padding: 0.4rem;
  }

  .plumage.popover .popover-body {
    padding: 0.25rem !important;
  }

  .plumage.super-tooltip .popover-body {
    color: #4b4b4b;
    border-radius: 0;
    background-color: #e1e1e1;
    padding: 0.4rem !important;
  }
   
  .popover:focus-visible,
  .popover .popover-body:focus,
  .popover .popover-body:focus-visible {
    outline: 0;
  }

  .popover.primary {
    border-color: #1867c0 !important;
  }

  .popover.primary .popover-header {
    background-color: #1867c0 !important;
    color: #fff !important;
  }

  .popover.primary[data-popover-placement^="top"] > .popover-arrow::before,
  .popover.primary[data-popover-placement^="topleft"] > .popover-arrow::before,
  .popover.primary[data-popover-placement^="topright"] > .popover-arrow::before,
  .popover-top.primary > .popover-arrow::before {
    border-top-color: #1867c0 !important;
  }

  .popover.primary[data-popover-placement^="bottom"] > .popover-arrow::before,
  .popover.primary[data-popover-placement^="bottomleft"]
    > .popover-arrow::before,
  .popover.primary[data-popover-placement^="bottomright"]
    > .popover-arrow::before,
  .popover-bottom.primary > .popover-arrow::before {
    border-bottom-color: #1867c0 !important;
  }

  .popover.primary[data-popover-placement^="left"] > .popover-arrow::before,
  .popover.primary[data-popover-placement^="lefttop"] > .popover-arrow::before,
  .popover.primary[data-popover-placement^="leftbottom"]
    > .popover-arrow::before,
  .popover-start.primary > .popover-arrow::before {
    border-left-color: #1867c0 !important;
  }

  .plumage.primary.super-tooltip[data-popover-placement^="left"]
    > .popover-arrow::after,
  .plumage.primary.super-tooltip[data-popover-placement^="leftbottom"]
    > .popover-arrow::after,
  .plumage.primary.super-tooltip.popover-start > .popover-arrow::after,
  .plumage.secondary.super-tooltip[data-popover-placement^="left"]
    > .popover-arrow::after,
  .plumage.secondary.super-tooltip[data-popover-placement^="leftbottom"]
    > .popover-arrow::after,
  .plumage.secondary.super-tooltip.popover-start > .popover-arrow::after,
  .plumage.danger.super-tooltip[data-popover-placement^="left"]
    > .popover-arrow::after,
  .plumage.danger.super-tooltip[data-popover-placement^="leftbottom"]
    > .popover-arrow::after,
  .plumage.danger.super-tooltip.popover-start > .popover-arrow::after,
  .plumage.warning.super-tooltip[data-popover-placement^="left"]
    > .popover-arrow::after,
  .plumage.warning.super-tooltip[data-popover-placement^="leftbottom"]
    > .popover-arrow::after,
  .plumage.warning.super-tooltip.popover-start > .popover-arrow::after,
  .plumage.success.super-tooltip[data-popover-placement^="left"]
    > .popover-arrow::after,
  .plumage.success.super-tooltip[data-popover-placement^="leftbottom"]
    > .popover-arrow::after,
  .plumage.success.super-tooltip.popover-start > .popover-arrow::after,
  .plumage.info.super-tooltip[data-popover-placement^="left"]
    > .popover-arrow::after,
  .plumage.info.super-tooltip[data-popover-placement^="leftbottom"]
    > .popover-arrow::after,
  .plumage.info.super-tooltip.popover-start > .popover-arrow::after,
  .plumage.dark.super-tooltip[data-popover-placement^="left"]
    > .popover-arrow::after,
  .plumage.dark.super-tooltip[data-popover-placement^="leftbottom"]
    > .popover-arrow::after,
  .plumage.dark.super-tooltip.popover-start > .popover-arrow::after {
    right: 0;
  }

  .plumage.primary.super-tooltip[data-popover-placement^="lefttop"]
    > .popover-arrow::after,
  .plumage.secondary.super-tooltip[data-popover-placement^="lefttop"]
    > .popover-arrow::after,
  .plumage.danger.super-tooltip[data-popover-placement^="lefttop"]
    > .popover-arrow::after,
  .plumage.warning.super-tooltip[data-popover-placement^="lefttop"]
    > .popover-arrow::after,
  .plumage.success.super-tooltip[data-popover-placement^="lefttop"]
    > .popover-arrow::after,
  .plumage.info.super-tooltip[data-popover-placement^="lefttop"]
    > .popover-arrow::after,
  .plumage.dark.super-tooltip[data-popover-placement^="lefttop"]
    > .popover-arrow::after {
    right: 0.09rem;
  }

  .plumage.primary.super-tooltip[data-popover-placement^="right"]
    > .popover-arrow::after,
  .plumage.primary.super-tooltip[data-popover-placement^="rightend"]
    > .popover-arrow::after,
  .plumage.primary.super-tooltip.popover-start > .popover-arrow::after,
  .plumage.secondary.super-tooltip[data-popover-placement^="right"]
    > .popover-arrow::after,
  .plumage.secondary.super-tooltip[data-popover-placement^="rightend"]
    > .popover-arrow::after,
  .plumage.secondary.super-tooltip.popover-start > .popover-arrow::after,
  .plumage.danger.super-tooltip[data-popover-placement^="right"]
    > .popover-arrow::after,
  .plumage.danger.super-tooltip[data-popover-placement^="rightend"]
    > .popover-arrow::after,
  .plumage.danger.super-tooltip.popover-start > .popover-arrow::after,
  .plumage.warning.super-tooltip[data-popover-placement^="right"]
    > .popover-arrow::after,
  .plumage.warning.super-tooltip[data-popover-placement^="rightend"]
    > .popover-arrow::after,
  .plumage.warning.super-tooltip.popover-start > .popover-arrow::after,
  .plumage.success.super-tooltip[data-popover-placement^="right"]
    > .popover-arrow::after,
  .plumage.success.super-tooltip[data-popover-placement^="rightend"]
    > .popover-arrow::after,
  .plumage.success.super-tooltip.popover-start > .popover-arrow::after,
  .plumage.info.super-tooltip[data-popover-placement^="right"]
    > .popover-arrow::after,
  .plumage.info.super-tooltip[data-popover-placement^="rightend"]
    > .popover-arrow::after,
  .plumage.info.super-tooltip.popover-start > .popover-arrow::after,
  .plumage.dark.super-tooltip[data-popover-placement^="right"]
    > .popover-arrow::after,
  .plumage.dark.super-tooltip[data-popover-placement^="rightend"]
    > .popover-arrow::after,
  .plumage.dark.super-tooltip.popover-start > .popover-arrow::after {
    left: 0;
  }

  .plumage.primary.super-tooltip[data-popover-placement^="righttop"]
    > .popover-arrow::after,
  .plumage.secondary.super-tooltip[data-popover-placement^="righttop"]
    > .popover-arrow::after,
  .plumage.danger.super-tooltip[data-popover-placement^="righttop"]
    > .popover-arrow::after,
  .plumage.warning.super-tooltip[data-popover-placement^="righttop"]
    > .popover-arrow::after,
  .plumage.success.super-tooltip[data-popover-placement^="righttop"]
    > .popover-arrow::after,
  .plumage.info.super-tooltip[data-popover-placement^="righttop"]
    > .popover-arrow::after,
  .plumage.dark.super-tooltip[data-popover-placement^="righttop"]
    > .popover-arrow::after {
    left: 0.09rem;
  }

  .plumage.primary.super-tooltip[data-popover-placement^="left"]
    > .popover-arrow::after,
  .plumage.primary.super-tooltip[data-popover-placement^="leftbottom"]
    > .popover-arrow::after,
  .plumage.primary.super-tooltip.popover-start > .popover-arrow::after {
    border-left-color: #1867c0;
  }

  .plumage.primary.super-tooltip[data-popover-placement^="lefttop"]
    > .popover-arrow::after,
  .plumage.secondary.super-tooltip[data-popover-placement^="lefttop"]
    > .popover-arrow::after,
  .plumage.danger.super-tooltip[data-popover-placement^="lefttop"]
    > .popover-arrow::after,
  .plumage.warning.super-tooltip[data-popover-placement^="lefttop"]
    > .popover-arrow::after,
  .plumage.success.super-tooltip[data-popover-placement^="lefttop"]
    > .popover-arrow::after,
  .plumage.info.super-tooltip[data-popover-placement^="lefttop"]
    > .popover-arrow::after,
  .plumage.dark.super-tooltip[data-popover-placement^="lefttop"]
    > .popover-arrow::after {
    border-left-color: #e1e1e1;
  }

  .plumage.primary.super-tooltip[data-popover-placement^="right"]
    > .popover-arrow::after,
  .plumage.primary.super-tooltip[data-popover-placement^="rightbottom"]
    > .popover-arrow::after,
  .plumage.primary.super-tooltip.popover-end > .popover-arrow::after {
    border-right-color: #1867c0;
  }

  .plumage.primary.super-tooltip[data-popover-placement^="righttop"]
    > .popover-arrow::after,
  .plumage.secondary.super-tooltip[data-popover-placement^="righttop"]
    > .popover-arrow::after,
  .plumage.danger.super-tooltip[data-popover-placement^="righttop"]
    > .popover-arrow::after,
  .plumage.warning.super-tooltip[data-popover-placement^="righttop"]
    > .popover-arrow::after,
  .plumage.success.super-tooltip[data-popover-placement^="righttop"]
    > .popover-arrow::after,
  .plumage.info.super-tooltip[data-popover-placement^="righttop"]
    > .popover-arrow::after,
  .plumage.dark.super-tooltip[data-popover-placement^="righttop"]
    > .popover-arrow::after {
    border-right-color: #e1e1e1;
  }

  .plumage.primary.super-tooltip[data-popover-placement^="bottom"]
    > .popover-arrow::after,
  .plumage.primary.super-tooltip[data-popover-placement^="bottomleft"]
    > .popover-arrow::after,
  .plumage.primary.super-tooltip[data-popover-placement^="bottomright"]
    > .popover-arrow::after,
  .plumage.primary.super-tooltip.popover-bottom > .popover-arrow::after {
    border-bottom-color: #1867c0;
  }

  .plumage.secondary.super-tooltip[data-popover-placement^="left"]
    > .popover-arrow::after,
  .plumage.secondary.super-tooltip[data-popover-placement^="leftbottom"]
    > .popover-arrow::after,
  .plumage.secondary.super-tooltip.popover-start > .popover-arrow::after {
    border-left-color: #6c757d;
  }

  .plumage.secondary.super-tooltip[data-popover-placement^="right"]
    > .popover-arrow::after,
  .plumage.secondary.super-tooltip[data-popover-placement^="rightbottom"]
    > .popover-arrow::after,
  .plumage.secondary.super-tooltip.popover-end > .popover-arrow::after {
    border-right-color: #6c757d;
  }

  .plumage.secondary.super-tooltip[data-popover-placement^="bottom"]
    > .popover-arrow::after,
  .plumage.secondary.super-tooltip[data-popover-placement^="bottomleft"]
    > .popover-arrow::after,
  .plumage.secondary.super-tooltip[data-popover-placement^="bottomright"]
    > .popover-arrow::after,
  .plumage.secondary.super-tooltip.popover-bottom > .popover-arrow::after {
    border-bottom-color: #6c757d;
  }

  .plumage.danger.super-tooltip[data-popover-placement^="left"]
    > .popover-arrow::after,
  .plumage.danger.super-tooltip[data-popover-placement^="leftbottom"]
    > .popover-arrow::after,
  .plumage.danger.super-tooltip.popover-start > .popover-arrow::after {
    border-left-color: #dc3545;
  }

  .plumage.danger.super-tooltip[data-popover-placement^="right"]
    > .popover-arrow::after,
  .plumage.danger.super-tooltip[data-popover-placement^="rightbottom"]
    > .popover-arrow::after,
  .plumage.danger.super-tooltip.popover-end > .popover-arrow::after {
    border-right-color: #dc3545;
  }

  .plumage.danger.super-tooltip[data-popover-placement^="bottom"]
    > .popover-arrow::after,
  .plumage.danger.super-tooltip[data-popover-placement^="bottomleft"]
    > .popover-arrow::after,
  .plumage.danger.super-tooltip[data-popover-placement^="bottomright"]
    > .popover-arrow::after,
  .plumage.danger.super-tooltip.popover-bottom > .popover-arrow::after {
    border-bottom-color: #dc3545;
  }

  .plumage.warning.super-tooltip[data-popover-placement^="left"]
    > .popover-arrow::after,
  .plumage.warning.super-tooltip[data-popover-placement^="leftbottom"]
    > .popover-arrow::after,
  .plumage.warning.super-tooltip.popover-start > .popover-arrow::after {
    border-left-color: #ffc107;
  }

  .plumage.warning.super-tooltip[data-popover-placement^="right"]
    > .popover-arrow::after,
  .plumage.warning.super-tooltip[data-popover-placement^="rightbottom"]
    > .popover-arrow::after,
  .plumage.warning.super-tooltip.popover-end > .popover-arrow::after {
    border-right-color: #ffc107;
  }

  .plumage.warning.super-tooltip[data-popover-placement^="bottom"]
    > .popover-arrow::after,
  .plumage.warning.super-tooltip[data-popover-placement^="bottomleft"]
    > .popover-arrow::after,
  .plumage.warning.super-tooltip[data-popover-placement^="bottomright"]
    > .popover-arrow::after,
  .plumage.warning.super-tooltip.popover-bottom > .popover-arrow::after {
    border-bottom-color: #ffc107;
  }

  .plumage.success.super-tooltip[data-popover-placement^="left"]
    > .popover-arrow::after,
  .plumage.success.super-tooltip[data-popover-placement^="leftbottom"]
    > .popover-arrow::after,
  .plumage.success.super-tooltip.popover-start > .popover-arrow::after {
    border-left-color: #28a745;
  }

  .plumage.success.super-tooltip[data-popover-placement^="right"]
    > .popover-arrow::after,
  .plumage.success.super-tooltip[data-popover-placement^="rightbottom"]
    > .popover-arrow::after,
  .plumage.success.super-tooltip.popover-end > .popover-arrow::after {
    border-right-color: #28a745;
  }

  .plumage.success.super-tooltip[data-popover-placement^="bottom"]
    > .popover-arrow::after,
  .plumage.success.super-tooltip[data-popover-placement^="bottomleft"]
    > .popover-arrow::after,
  .plumage.success.super-tooltip[data-popover-placement^="bottomright"]
    > .popover-arrow::after,
  .plumage.success.super-tooltip.popover-bottom > .popover-arrow::after {
    border-bottom-color: #28a745;
  }

  .plumage.info.super-tooltip[data-popover-placement^="left"]
    > .popover-arrow::after,
  .plumage.info.super-tooltip[data-popover-placement^="leftbottom"]
    > .popover-arrow::after,
  .plumage.info.super-tooltip.popover-start > .popover-arrow::after {
    border-left-color: #17a2b8;
  }

  .plumage.info.super-tooltip[data-popover-placement^="right"]
    > .popover-arrow::after,
  .plumage.info.super-tooltip[data-popover-placement^="rightbottom"]
    > .popover-arrow::after,
  .plumage.info.super-tooltip.popover-end > .popover-arrow::after {
    border-right-color: #17a2b8;
  }

  .plumage.info.super-tooltip[data-popover-placement^="bottom"]
    > .popover-arrow::after,
  .plumage.info.super-tooltip[data-popover-placement^="bottomleft"]
    > .popover-arrow::after,
  .plumage.info.super-tooltip[data-popover-placement^="bottomright"]
    > .popover-arrow::after,
  .plumage.info.super-tooltip.popover-bottom > .popover-arrow::after {
    border-bottom-color: #17a2b8;
  }

  .plumage.dark.super-tooltip[data-popover-placement^="left"]
    > .popover-arrow::after,
  .plumage.dark.super-tooltip[data-popover-placement^="leftbottom"]
    > .popover-arrow::after,
  .plumage.dark.super-tooltip.popover-start > .popover-arrow::after {
    border-left-color: #343a40;
  }

  .plumage.dark.super-tooltip[data-popover-placement^="right"]
    > .popover-arrow::after,
  .plumage.dark.super-tooltip[data-popover-placement^="rightbottom"]
    > .popover-arrow::after,
  .plumage.dark.super-tooltip.popover-end > .popover-arrow::after {
    border-right-color: #343a40;
  }

  .plumage.dark.super-tooltip[data-popover-placement^="bottom"]
    > .popover-arrow::after,
  .plumage.dark.super-tooltip[data-popover-placement^="bottomleft"]
    > .popover-arrow::after,
  .plumage.dark.super-tooltip[data-popover-placement^="bottomright"]
    > .popover-arrow::after,
  .plumage.dark.super-tooltip.popover-bottom > .popover-arrow::after {
    border-bottom-color: #343a40;
  }

  .popover.primary[data-popover-placement^="right"] > .popover-arrow::before,
  .popover.primary[data-popover-placement^="righttop"] > .popover-arrow::before,
  .popover.primary[data-popover-placement^="rightbottom"]
    > .popover-arrow::before,
  .popover-end.primary > .popover-arrow::before {
    border-right-color: #1867c0 !important;
  }

  .popover.secondary {
    border-color: #6c757d !important;
  }

  .popover.secondary .popover-header {
    background-color: #6c757d !important;
    color: #fff !important;
  }

  .popover.secondary[data-popover-placement^="top"] > .popover-arrow::before,
  .popover.secondary[data-popover-placement^="topleft"]
    > .popover-arrow::before,
  .popover.secondary[data-popover-placement^="topright"]
    > .popover-arrow::before,
  .popover-top.secondary > .popover-arrow::before {
    border-top-color: #6c757d !important;
  }

  .popover.secondary[data-popover-placement^="bottom"] > .popover-arrow::before,
  .popover.secondary[data-popover-placement^="bottomleft"]
    > .popover-arrow::before,
  .popover.secondary[data-popover-placement^="bottomright"]
    > .popover-arrow::before,
  .popover-bottom.secondary > .popover-arrow::before {
    border-bottom-color: #6c757d !important;
  }

  .popover.secondary[data-popover-placement^="left"] > .popover-arrow::before,
  .popover.secondary[data-popover-placement^="lefttop"]
    > .popover-arrow::before,
  .popover.secondary[data-popover-placement^="leftbottom"]
    > .popover-arrow::before,
  .popover-start.secondary > .popover-arrow::before {
    border-left-color: #6c757d !important;
  }

  .popover.secondary[data-popover-placement^="right"] > .popover-arrow::before,
  .popover.secondary[data-popover-placement^="righttop"]
    > .popover-arrow::before,
  .popover.secondary[data-popover-placement^="rightbottom"]
    > .popover-arrow::before,
  .popover-end.secondary > .popover-arrow::before {
    border-right-color: #6c757d !important;
  }

  .popover.success {
    border-color: #28a745 !important;
  }

  .popover.success .popover-header {
    background-color: #28a745 !important;
    color: #fff !important;
  }

  .popover.success[data-popover-placement^="top"] > .popover-arrow::before,
  .popover.success[data-popover-placement^="topleft"] > .popover-arrow::before,
  .popover.success[data-popover-placement^="topright"] > .popover-arrow::before,
  .popover-top.success > .popover-arrow::before {
    border-top-color: #28a745 !important;
  }

  .popover.success[data-popover-placement^="bottom"] > .popover-arrow::before,
  .popover.success[data-popover-placement^="bottomleft"]
    > .popover-arrow::before,
  .popover.success[data-popover-placement^="bottomright"]
    > .popover-arrow::before,
  .popover-bottom.success > .popover-arrow::before {
    border-bottom-color: #28a745 !important;
  }

  .popover.success[data-popover-placement^="left"] > .popover-arrow::before,
  .popover.success[data-popover-placement^="lefttop"] > .popover-arrow::before,
  .popover.success[data-popover-placement^="leftbottom"]
    > .popover-arrow::before,
  .popover-start.success > .popover-arrow::before {
    border-left-color: #28a745 !important;
  }

  .popover.success[data-popover-placement^="right"] > .popover-arrow::before,
  .popover.success[data-popover-placement^="righttop"] > .popover-arrow::before,
  .popover.success[data-popover-placement^="rightbottom"]
    > .popover-arrow::before,
  .popover-end.success > .popover-arrow::before {
    border-right-color: #28a745 !important;
  }

  .popover.danger {
    border-color: #dc3545 !important;
  }

  .popover.danger .popover-header {
    background-color: #dc3545 !important;
    color: #fff !important;
  }

  .popover.danger[data-popover-placement^="top"] > .popover-arrow::before,
  .popover.danger[data-popover-placement^="topleft"] > .popover-arrow::before,
  .popover.danger[data-popover-placement^="topright"] > .popover-arrow::before,
  .popover-top.danger > .popover-arrow::before {
    border-top-color: #dc3545 !important;
  }

  .popover.danger[data-popover-placement^="bottom"] > .popover-arrow::before,
  .popover.danger[data-popover-placement^="bottomleft"]
    > .popover-arrow::before,
  .popover.danger[data-popover-placement^="bottomright"]
    > .popover-arrow::before,
  .popover-bottom.danger > .popover-arrow::before {
    border-bottom-color: #dc3545 !important;
  }

  .popover.danger[data-popover-placement^="left"] > .popover-arrow::before,
  .popover.danger[data-popover-placement^="lefttop"] > .popover-arrow::before,
  .popover.danger[data-popover-placement^="leftbottom"]
    > .popover-arrow::before,
  .popover-start.danger > .popover-arrow::before {
    border-left-color: #dc3545 !important;
  }

  .popover.danger[data-popover-placement^="right"] > .popover-arrow::before,
  .popover.danger[data-popover-placement^="righttop"] > .popover-arrow::before,
  .popover.danger[data-popover-placement^="rightbottom"]
    > .popover-arrow::before,
  .popover-end.danger > .popover-arrow::before {
    border-right-color: #dc3545 !important;
  }

  .popover.info {
    border-color: #17a2b8 !important;
  }

  .popover.info .popover-header {
    background-color: #17a2b8 !important;
    color: #fff !important;
  }

  .popover.info[data-popover-placement^="top"] > .popover-arrow::before,
  .popover.info[data-popover-placement^="topleft"] > .popover-arrow::before,
  .popover.info[data-popover-placement^="topright"] > .popover-arrow::before,
  .popover-top.info > .popover-arrow::before {
    border-top-color: #17a2b8 !important;
  }

  .popover.info[data-popover-placement^="bottom"] > .popover-arrow::before,
  .popover.info[data-popover-placement^="bottomleft"] > .popover-arrow::before,
  .popover.info[data-popover-placement^="bottomright"] > .popover-arrow::before,
  .popover-bottom.info > .popover-arrow::before {
    border-bottom-color: #17a2b8 !important;
  }

  .popover.info[data-popover-placement^="left"] > .popover-arrow::before,
  .popover.info[data-popover-placement^="lefttop"] > .popover-arrow::before,
  .popover.info[data-popover-placement^="leftbottom"] > .popover-arrow::before,
  .popover-start.info > .popover-arrow::before {
    border-left-color: #17a2b8 !important;
  }

  .popover.info[data-popover-placement^="right"] > .popover-arrow::before,
  .popover.info[data-popover-placement^="righttop"] > .popover-arrow::before,
  .popover.info[data-popover-placement^="rightbottom"] > .popover-arrow::before,
  .popover-end.info > .popover-arrow::before {
    border-right-color: #17a2b8 !important;
  }

  .popover.warning {
    border-color: #ffc107 !important;
  }

  .popover.warning .popover-header {
    background-color: #ffc107 !important;
    color: #000 !important;
  }

  .popover.warning[data-popover-placement^="top"] > .popover-arrow::before,
  .popover.warning[data-popover-placement^="topleft"] > .popover-arrow::before,
  .popover.warning[data-popover-placement^="topright"] > .popover-arrow::before,
  .popover-top.warning > .popover-arrow::before {
    border-top-color: #ffc107 !important;
  }

  .popover.warning[data-popover-placement^="bottom"] > .popover-arrow::before,
  .popover.warning[data-popover-placement^="bottomleft"]
    > .popover-arrow::before,
  .popover.warning[data-popover-placement^="bottomright"]
    > .popover-arrow::before,
  .popover-bottom.warning > .popover-arrow::before {
    border-bottom-color: #ffc107 !important;
  }

  .popover.warning[data-popover-placement^="left"] > .popover-arrow::before,
  .popover.warning[data-popover-placement^="lefttop"] > .popover-arrow::before,
  .popover.warning[data-popover-placement^="leftbottom"]
    > .popover-arrow::before,
  .popover-start.warning > .popover-arrow::before {
    border-left-color: #ffc107 !important;
  }

  .popover.warning[data-popover-placement^="right"] > .popover-arrow::before,
  .popover.warning[data-popover-placement^="righttop"] > .popover-arrow::before,
  .popover.warning[data-popover-placement^="rightbottom"]
    > .popover-arrow::before,
  .popover-end.warning > .popover-arrow::before {
    border-right-color: #ffc107 !important;
  }

  .popover.dark {
    border-color: #343a40 !important;
  }

  .popover.dark .popover-header {
    background-color: #343a40 !important;
    color: #fff !important;
  }

  .popover.dark[data-popover-placement^="top"] > .popover-arrow::before,
  .popover.dark[data-popover-placement^="topleft"] > .popover-arrow::before,
  .popover.dark[data-popover-placement^="topright"] > .popover-arrow::before,
  .popover-top.dark > .popover-arrow::before {
    border-top-color: #343a40 !important;
  }

  .popover.dark[data-popover-placement^="bottom"] > .popover-arrow::before,
  .popover.dark[data-popover-placement^="bottomleft"] > .popover-arrow::before,
  .popover.dark[data-popover-placement^="bottomright"] > .popover-arrow::before,
  .popover-bottom.dark > .popover-arrow::before {
    border-bottom-color: #343a40 !important;
  }

  .popover.dark[data-popover-placement^="left"] > .popover-arrow::before,
  .popover.dark[data-popover-placement^="lefttop"] > .popover-arrow::before,
  .popover.dark[data-popover-placement^="leftbottom"] > .popover-arrow::before,
  .popover-start.dark > .popover-arrow::before {
    border-left-color: #343a40 !important;
  }

  .popover.dark[data-popover-placement^="right"] > .popover-arrow::before,
  .popover.dark[data-popover-placement^="righttop"] > .popover-arrow::before,
  .popover.dark[data-popover-placement^="rightbottom"] > .popover-arrow::before,
  .popover-end.dark > .popover-arrow::before {
    border-right-color: #343a40 !important;
  }
`;
