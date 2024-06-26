import { css } from "lit";

export const modalStyles = css`
  *,
  :after,
  :before {
    box-sizing: border-box;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 0.5rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
  }

  .h5,
  h5 {
    font-size: 1.25rem;
  }

  .fade {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0s linear 0.3s; /* Hide visibility at the end of the transition */
  }

  .fade.open {
    opacity: 1;
    visibility: visible;
    transition: opacity 0.3s, visibility 0s 0s; /* Show immediately, start opacity transition */
  }

  .modal-open {
    overflow: hidden;
  }

  .modal-open .modal {
    overflow-x: hidden;
    overflow-y: auto;
  }

  .modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1072;
    overflow: hidden;
    outline: 0;
    // display: block; /* Always part of the DOM, hidden by opacity */
    visibility: hidden; /* Start hidden */
    opacity: 0; /* Start fully transparent */
    transition: visibility 0s linear 0.3s, opacity 0.3s linear; /* Smooth fade in */
  }

  .modal.open {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.3s linear; /* Ensure visibility is immediate */
  }

  .modal-dialog {
    position: relative;
    /* width: auto;
    margin: 0.5rem;
    pointer-events: none; */
    transition: transform 0.3s ease-out; /* Smooth slide down */
    transform: translateY(-100vh); /* Start off-screen */
  }

  /* .modal.fade .modal-dialog {
    transition: -webkit-transform 0.3s ease-out;
    transition: transform 0.3s ease-out;
    transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
    -webkit-transform: translate(0, -25%);
    transform: translate(0, -25%);
  } */

  .modal.open .modal-dialog {
    transform: translateY(0); /* Slides into the viewport */
  }

  .modal-dialog-centered {
    display: flex;
    align-items: center;
    min-height: calc(100% - (0.5rem * 2));
  }

  .modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    outline: 0;
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1071;
    background-color: #000;

    visibility: hidden;
  }

  .modal-backdrop.fade {
    opacity: 0;
  }

  .modal-backdrop.open {
    opacity: 0.5;
    visibility: visible;
  }

  .modal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0.5rem;
    border-bottom: 1px solid #e9ecef;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
  }

  .modal-header .close {
    padding: 1rem;
    margin: -1rem -1rem -1rem auto;
  }

  .modal-title {
    margin-bottom: 0;
    line-height: 1.5;
  }

  .modal-body {
    position: relative;
    flex: 1 1 auto;
    padding: 1rem;
  }

  .modal-body.scrollable {
    max-height: calc(100vh - 145px);
    overflow-y: auto;
  }

  .modal-body.scrollable::-webkit-scrollbar {
    width: 12px;
    height: 10px;
  }

  .modal-body.scrollable::-webkit-scrollbar-thumb {
    background-color: #888;
    border: 2px solid transparent;
    border-radius: 9px;
    background-clip: content-box;
  }

  .modal-body.scrollable::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  .modal-body.scrollable::-webkit-scrollbar-track {
    background-color: #f5f5f5;
    border-radius: 10px;
  }

  .modal-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0.5rem;
    border-top: 1px solid #e9ecef;
  }

  .modal-footer > :not(:first-child) {
    margin-left: 0.25 rem;
  }

  .modal-footer > :not(:last-child) {
    margin-right: 0.25 rem;
  }

  .modal-scrollbar-measure {
    position: absolute;
    top: -9999px;
    width: 50px;
    height: 50px;
    overflow: scroll;
  }

  @media (min-width: 576px) {
    .modal-dialog {
      max-width: 500px;
      margin: 1.75rem auto;
    }

    .modal-dialog-centered {
      min-height: calc(100% - (1.75rem * 2));
    }
  }

  @media (min-width: 576px) {
    .modal-sm {
      max-width: 300px;
    }
  }

  @media (min-width: 992px) {
    .modal-lg {
      max-width: 800px;
    }
  }

  .close {
    float: right;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: 0.5;
  }

  button.close {
    padding: 0;
    background-color: transparent;
    border: 0;
    -webkit-appearance: none;
  }

  .close:not(:disabled):not(.disabled),
  .btn:not(:disabled):not(.disabled) {
    cursor: pointer;
  }
`;
