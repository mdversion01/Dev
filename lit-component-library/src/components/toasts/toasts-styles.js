import { css } from "lit";

export const toastStyles = css`
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

  /* :host {
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 1000;
  }

  :host([position="top-left"]) {
    top: 20px;
    left: 20px;
  }

  :host([position="top-right"]) {
    top: 20px;
    right: 20px;
  }

  :host([position="bottom-left"]) {
    bottom: 20px;
    left: 20px;
  }

  :host([position="bottom-right"]) {
    bottom: 20px;
    right: 20px;
  } */

  .d-none {
    display: none;
  }

  .toast-svg {
    width: 1em;
    height: 1em;
    vertical-align: -0.125rem;
    fill: currentcolor;
    margin-right: 5px;
  }

  .toast-body {
    padding: 0.75rem;
  }

  .toast {
    flex-basis: 350px;
    max-width: 350px;
    font-size: 0.875rem;
    background-clip: padding-box;
    backface-visibility: hidden;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Helvetica Neue, Arial, Noto Sans, Liberation Sans, sans-serif,
      Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    opacity: 0;
    border-radius: 0.25rem;
    animation: fadein 0.5s forwards;
    background-color: var(--toast-background-color, #fff);
    /* color: var(--toast-color, white); */
    z-index: 1;
    display: block;
    position: relative;
  }

  .toast.persistent {
    animation: fadein 0.5s forwards !important; /* Only apply fade-in animation */
    opacity: 1 !important; /* Ensure it stays visible */
  }

  .toast.fade-in,
  .pl-toast.fade-in {
    animation: fadein 0.5s forwards;
  }

  .toast.fade-out,
  .pl-toast.fade-out {
    animation: fadeout 0.5s forwards;
    pointer-events: none; /* Disable interactions during fade-out */
  }

  .toast.hide,
  .pl-toast.hide {
    display: none;
  }

  .toast.show,
  .pl-toast.show {
    display: block;
    opacity: 1;
  }

  .toast.showing,
  .pl-toast.showing {
    opacity: 1;
  }

  .toast:not(:last-child),
  .pl-toast:not(:last-child) {
    margin-bottom: 0.75rem;
  }

  .toast-header {
    display: flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    color: #6c757d;
    background-color: hsla(0, 0%, 100%, 0.85);
    background-clip: padding-box;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    border-top-left-radius: calc(0.25rem - 1px);
    border-top-right-radius: calc(0.25rem - 1px);
  }

  .toast-primary {
    background-color: rgba(230, 242, 255, 0.85);
    border-color: rgba(184, 218, 255, 0.85);
    color: #004085;
  }

  .toast-primary .toast-header {
    color: #004085;
    background-color: rgba(204, 229, 255, 0.85);
    border-bottom-color: rgba(184, 218, 255, 0.85);
  }

  .toast-primary.toast-solid {
    background-color: #e6f2ff;
  }

  .toast-secondary {
    background-color: rgba(239, 240, 241, 0.85);
    border-color: rgba(214, 216, 219, 0.85);
    color: #383d41;
  }

  .toast-secondary .toast-header {
    color: #383d41;
    background-color: rgba(226, 227, 229, 0.85);
    border-bottom-color: rgba(214, 216, 219, 0.85);
  }

  .toast-secondary.toast-solid {
    background-color: #eff0f1;
  }

  .toast-success {
    background-color: rgba(230, 245, 233, 0.85);
    border-color: rgba(195, 230, 203, 0.85);
    color: #155724;
  }

  .toast-success .toast-header {
    color: #155724;
    background-color: rgba(212, 237, 218, 0.85);
    border-bottom-color: rgba(195, 230, 203, 0.85);
  }

  .toast-success.toast-solid {
    background-color: #e6f5e9;
  }

  .toast-info {
    background-color: rgba(229, 244, 247, 0.85);
    border-color: rgba(190, 229, 235, 0.85);
    color: #0c5460;
  }

  .toast-info .toast-header {
    color: #0c5460;
    background-color: rgba(209, 236, 241, 0.85);
    border-bottom-color: rgba(190, 229, 235, 0.85);
  }

  .toast-info.toast-solid {
    background-color: #e5f4f7;
  }

  .toast-warning {
    background-color: rgba(255, 249, 231, 0.85);
    border-color: rgba(255, 238, 186, 0.85);
    color: #856404;
  }

  .toast-warning .toast-header {
    color: #856404;
    background-color: rgba(255, 243, 205, 0.85);
    border-bottom-color: rgba(255, 238, 186, 0.85);
  }

  .toast-warning.toast-solid {
    background-color: #fff9e7;
  }

  .toast-danger {
    background-color: rgba(252, 237, 238, 0.85);
    border-color: rgba(245, 198, 203, 0.85);
    color: #721c24;
  }

  .toast-danger .toast-header {
    color: #721c24;
    background-color: rgba(248, 215, 218, 0.85);
    border-bottom-color: rgba(245, 198, 203, 0.85);
  }

  .toast-danger.toast-solid {
    background-color: #fcedee;
  }

  .toast-light {
    background-color: hsla(0, 0%, 100%, 0.85);
    border-color: rgba(253, 253, 254, 0.85);
    color: #818182;
  }

  .toast-light .toast-header {
    color: #818182;
    background-color: hsla(0, 0%, 99.6%, 0.85);
    border-bottom-color: rgba(253, 253, 254, 0.85);
  }

  .toast-light.toast-solid {
    background-color: #fff;
  }

  .toast-dark {
    background-color: rgba(227, 229, 229, 0.85);
    border-color: rgba(198, 200, 202, 0.85);
    color: #1b1e21;
  }

  .toast-dark .toast-header {
    color: #1b1e21;
    background-color: rgba(214, 216, 217, 0.85);
    border-bottom-color: rgba(198, 200, 202, 0.85);
  }

  .toast-dark.toast-solid {
    background-color: #e3e5e5;
  }

  .text-bg-primary {
    color: #fff !important;
    background-color: rgba(13, 110, 253, 1) !important;
  }

  .text-bg-secondary {
    color: #fff !important;
    background-color: rgba(108, 117, 125, 1) !important;
  }

  .text-bg-danger {
    color: #fff !important;
    background-color: rgba(220, 53, 69, 1) !important;
  }

  .text-bg-warning {
    color: #000 !important;
    background-color: rgba(255, 193, 7, 1) !important;
  }

  .text-bg-success {
    color: #fff !important;
    background-color: rgba(25, 135, 84, 1) !important;
  }

  .text-bg-info {
    color: #000 !important;
    background-color: rgba(13, 202, 240, 1) !important;
  }

  .text-bg-dark {
    color: #fff !important;
    background-color: rgba(33, 37, 41, 1) !important;
  }

  .text-bg-light {
    color: #000 !important;
    background-color: rgba(248, 249, 250, 1) !important;
  }

  .text-bg-primary .close,
  .text-bg-secondary .close,
  .text-bg-danger .close,
  .text-bg-success .close,
  .text-bg-dark .close {
    color: #fff;
    opacity: 1;
  }

  .text-bg-primary .close:hover,
  .text-bg-secondary .close:hover,
  .text-bg-danger .close:hover,
  .text-bg-success .close:hover,
  .text-bg-dark .close:hover {
    text-decoration: none;
    opacity: 0.75;
  }

  .text-bg-warning .close,
  .text-bg-info .close,
  .text-bg-light .close {
    color: #000;
    opacity: 1;
  }

  .text-bg-warning .close:hover,
  .text-bg-info .close:hover,
  .text-bg-light .close:hover {
    text-decoration: none;
    opacity: 0.75;
  }

  .pl-toast {
    flex-basis: 350px;
    max-width: 350px;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Helvetica Neue, Arial, Noto Sans, Liberation Sans, sans-serif,
      Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    font-size: 0.875rem;
    background-clip: padding-box;
    backface-visibility: hidden;
    border: 1px solid #4b4b4b;
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
    opacity: 0;
    border-radius: 0.25rem;
    position: relative;
    display: block;
    z-index: 1;
  }

  .pl-toast {
    background-color: #cacaca;
    border-color: #4b4b4b;
    box-shadow: unset;
    max-width: unset;
    min-width: 34.375rem;
    animation: fadein 0.5s forwards;
  }

  .pl-toast-display {
    display: flex;
  }

  .pl-toast-content {
    width: 100%;
  }

  .pl-toast-content .toast-title {
    padding: 0.25rem 0 0.25rem 0.5rem !important;
  }

  .pl-toast-content .toast-title .header {
    font-size: 0.9375rem;
  }

  .pl-toast-content .toast-title .toast-body-text {
    font-size: 1.1875rem;
    padding: 1rem 0 0 1rem !important;
  }

  .pl-toast-content .toast-title .toast-data {
    margin-top: -0.25rem;
  }

  .pl-toast-icon {
    align-items: center;
    border-right: 1px solid #4b4b4b;
    display: flex;
    font-size: 2rem;
    padding: 0 0.25rem;
  }

  .pl-toast-content .pl-toast-icon {
    padding: 0.25rem !important;
  }

  .pl-toast-header {
    display: flex;
    align-items: center;
    padding: 0.25rem 0.5rem;
    background-color: hsla(0, 0%, 100%, 0.85);
    background-clip: padding-box;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    border-top-left-radius: calc(0.25rem - 1px);
    border-top-right-radius: calc(0.25rem - 1px);
  }

  .pl-toast-header {
    background-color: #cacaca;
    border: 0 !important;
    color: #2c2c2c;
    font-size: 0.9375rem;
    justify-content: space-between;
    padding-bottom: 0.25rem;
    /* pointer-events: none; */
  }

  .pl-toast-body {
    background-color: #cacaca;
    color: #2c2c2c;
    font-size: 0.8333rem;
    padding: 0.25rem 0.5rem;
  }

  .pl-toast:hover .pl-toast-body {
    background-color: #b3b3b3;
  }

  .toaster {
    z-index: 1100;
  }

  .toaster .toaster-slot,
  .pl-toaster .toaster-slot {
    position: relative;
    display: block;
  }

  .toaster .toaster-slot:empty,
  .pl-toaster .toaster-slot:empty {
    display: none !important;
  }

  .toaster.toaster-bottom-center,
  .toaster.toaster-bottom-full,
  .toaster.toaster-bottom-left,
  .toaster.toaster-bottom-right,
  .toaster.toaster-top-center,
  .toaster.toaster-top-full,
  .toaster.toaster-top-left,
  .toaster.toaster-top-right,
  .pl-toaster.toaster-bottom-center,
  .pl-toaster.toaster-bottom-full,
  .pl-toaster.toaster-bottom-left,
  .pl-toaster.toaster-bottom-right,
  .pl-toaster.toaster-top-center,
  .pl-toaster.toaster-top-full,
  .pl-toaster.toaster-top-left,
  .pl-toaster.toaster-top-right {
    position: fixed;
    left: 0.5rem;
    right: 0.5rem;
    margin: 0;
    padding: 0;
    height: 0;
    overflow: visible;
    z-index: 1100;
  }

  .toaster.toaster-bottom-center .toaster-slot,
  .toaster.toaster-bottom-full .toaster-slot,
  .toaster.toaster-bottom-left .toaster-slot,
  .toaster.toaster-bottom-right .toaster-slot,
  .toaster.toaster-top-center .toaster-slot,
  .toaster.toaster-top-full .toaster-slot,
  .toaster.toaster-top-left .toaster-slot,
  .toaster.toaster-top-right .toaster-slot {
    position: absolute;
    max-width: 350px;
    width: 100%;
    left: 0;
    right: 0;
    padding: 0;
    margin: 0;
    z-index: 1100;
  }

  .pl-toaster.toaster-bottom-center .toaster-slot,
  .pl-toaster.toaster-bottom-full .toaster-slot,
  .pl-toaster.toaster-bottom-left .toaster-slot,
  .pl-toaster.toaster-bottom-right .toaster-slot,
  .pl-toaster.toaster-top-center .toaster-slot,
  .pl-toaster.toaster-top-full .toaster-slot,
  .pl-toaster.toaster-top-left .toaster-slot,
  .pl-toaster.toaster-top-right .toaster-slot {
    position: absolute;
    max-width: 550px;
    width: 100%;
    left: 0;
    right: 0;
    padding: 0;
    margin: 0;
    z-index: 1100;
  }

  .toaster.toaster-bottom-full .toaster-slot,
  .toaster.toaster-bottom-full .toaster-slot .toast,
  .toaster.toaster-bottom-full .toaster-slot .toast,
  .toaster.toaster-top-full .toaster-slot,
  .toaster.toaster-top-full .toaster-slot .toast,
  .toaster.toaster-top-full .toaster-slot .toast,
  .pl-toaster.toaster-bottom-full .toaster-slot,
  .pl-toaster.toaster-bottom-full .toaster-slot .toast,
  .pl-toaster.toaster-bottom-full .toaster-slot .toast,
  .pl-toaster.toaster-top-full .toaster-slot,
  .pl-toaster.toaster-top-full .toaster-slot .toast,
  .pl-toaster.toaster-top-full .toaster-slot .toast {
    width: 100%;
    max-width: 100%;
  }

  .toaster.toaster-top-center,
  .toaster.toaster-top-full,
  .toaster.toaster-top-left,
  .toaster.toaster-top-right,
  .pl-toaster.toaster-top-center,
  .pl-toaster.toaster-top-full,
  .pl-toaster.toaster-top-left,
  .pl-toaster.toaster-top-right {
    top: 0;
  }

  .toaster.toaster-top-center .toaster-slot,
  .toaster.toaster-top-full .toaster-slot,
  .toaster.toaster-top-left .toaster-slot,
  .toaster.toaster-top-right .toaster-slot,
  .pl-toaster.toaster-top-center .toaster-slot,
  .pl-toaster.toaster-top-full .toaster-slot,
  .pl-toaster.toaster-top-left .toaster-slot,
  .pl-toaster.toaster-top-right .toaster-slot {
    top: 0.5rem;
  }

  .toaster.toaster-bottom-center,
  .toaster.toaster-bottom-full,
  .toaster.toaster-bottom-left,
  .toaster.toaster-bottom-right,
  .pl-toaster.toaster-bottom-center,
  .pl-toaster.toaster-bottom-full,
  .pl-toaster.toaster-bottom-left,
  .pl-toaster.toaster-bottom-right {
    bottom: 0;
  }

  .toaster.toaster-bottom-center .toaster-slot,
  .toaster.toaster-bottom-full .toaster-slot,
  .toaster.toaster-bottom-left .toaster-slot,
  .toaster.toaster-bottom-right .toaster-slot,
  .pl-toaster.toaster-bottom-center .toaster-slot,
  .pl-toaster.toaster-bottom-full .toaster-slot,
  .pl-toaster.toaster-bottom-left .toaster-slot,
  .pl-toaster.toaster-bottom-right .toaster-slot {
    bottom: 0.5rem;
  }

  .toaster.toaster-bottom-center .toaster-slot,
  .toaster.toaster-bottom-right .toaster-slot,
  .toaster.toaster-top-center .toaster-slot,
  .toaster.toaster-top-right .toaster-slot,
  .pl-toaster.toaster-bottom-center .toaster-slot,
  .pl-toaster.toaster-bottom-right .toaster-slot,
  .pl-toaster.toaster-top-center .toaster-slot,
  .pl-toaster.toaster-top-right .toaster-slot {
    margin-left: auto;
  }

  .toaster.toaster-bottom-center .toaster-slot,
  .toaster.toaster-bottom-left .toaster-slot,
  .toaster.toaster-top-center .toaster-slot,
  .toaster.toaster-top-left .toaster-slot,
  .pl-toaster.toaster-bottom-center .toaster-slot,
  .pl-toaster.toaster-bottom-left .toaster-slot,
  .pl-toaster.toaster-top-center .toaster-slot,
  .pl-toaster.toaster-top-left .toaster-slot {
    margin-right: auto;
  }

  .toaster.toaster-bottom-left .toast.toaster-enter-active,
  .toaster.toaster-bottom-left .toast.toaster-leave-active,
  .toaster.toaster-bottom-left .toast.toaster-move,
  .toaster.toaster-bottom-right .toast.toaster-enter-active,
  .toaster.toaster-bottom-right .toast.toaster-leave-active,
  .toaster.toaster-bottom-right .toast.toaster-move,
  .toaster.toaster-top-left .toast.toaster-enter-active,
  .toaster.toaster-top-left .toast.toaster-leave-active,
  .toaster.toaster-top-left .toast.toaster-move,
  .toaster.toaster-top-right .toast.toaster-enter-active,
  .toaster.toaster-top-right .toast.toaster-leave-active,
  .toaster.toaster-top-right .toast.toaster-move,
  .pl-toaster.toaster-bottom-left .toast.toaster-enter-active,
  .pl-toaster.toaster-bottom-left .toast.toaster-leave-active,
  .pl-toaster.toaster-bottom-left .toast.toaster-move,
  .pl-toaster.toaster-bottom-right .toast.toaster-enter-active,
  .pl-toaster.toaster-bottom-right .toast.toaster-leave-active,
  .pl-toaster.toaster-bottom-right .toast.toaster-move,
  .pl-toaster.toaster-top-left .toast.toaster-enter-active,
  .pl-toaster.toaster-top-left .toast.toaster-leave-active,
  .pl-toaster.toaster-top-left .toast.toaster-move,
  .pl-toaster.toaster-top-right .toast.toaster-enter-active,
  .pl-toaster.toaster-top-right .toast.toaster-leave-active,
  .pl-toaster.toaster-top-right .toast.toaster-move {
    transition: transform 0.175s;
  }

  .toaster.toaster-bottom-left .toast.toaster-enter-active .toast.fade,
  .toaster.toaster-bottom-left .toast.toaster-enter-to .toast.fade,
  .toaster.toaster-bottom-right .toast.toaster-enter-active .toast.fade,
  .toaster.toaster-bottom-right .toast.toaster-enter-to .toast.fade,
  .toaster.toaster-top-left .toast.toaster-enter-active .toast.fade,
  .toaster.toaster-top-left .toast.toaster-enter-to .toast.fade,
  .toaster.toaster-top-right .toast.toaster-enter-active .toast.fade,
  .toaster.toaster-top-right .toast.toaster-enter-to .toast.fade,
  .pl-toaster.toaster-bottom-left .toast.toaster-enter-active .toast.fade,
  .pl-toaster.toaster-bottom-left .toast.toaster-enter-to .toast.fade,
  .pl-toaster.toaster-bottom-right .toast.toaster-enter-active .toast.fade,
  .pl-toaster.toaster-bottom-right .toast.toaster-enter-to .toast.fade,
  .pl-toaster.toaster-top-left .toast.toaster-enter-active .toast.fade,
  .pl-toaster.toaster-top-left .toast.toaster-enter-to .toast.fade,
  .pl-toaster.toaster-top-right .toast.toaster-enter-active .toast.fade,
  .pl-toaster.toaster-top-right .toast.toaster-enter-to .toast.fade {
    transition-delay: 0.175s;
  }

  .toaster.toaster-bottom-left .toast.toaster-leave-active,
  .toaster.toaster-bottom-right .toast.toaster-leave-active,
  .toaster.toaster-top-left .toast.toaster-leave-active,
  .toaster.toaster-top-right .toast.toaster-leave-active,
  .pl-toaster.toaster-bottom-left .toast.toaster-leave-active,
  .pl-toaster.toaster-bottom-right .toast.toaster-leave-active,
  .pl-toaster.toaster-top-left .toast.toaster-leave-active,
  .pl-toaster.toaster-top-right .toast.toaster-leave-active {
    position: absolute;
    transition-delay: 0.175s;
  }

  .toaster.toaster-bottom-left .toast.toaster-leave-active .toast.fade,
  .toaster.toaster-bottom-right .toast.toaster-leave-active .toast.fade,
  .toaster.toaster-top-left .toast.toaster-leave-active .toast.fade,
  .toaster.toaster-top-right .toast.toaster-leave-active .toast.fade,
  .pl-toaster.toaster-bottom-left .toast.toaster-leave-active .toast.fade,
  .pl-toaster.toaster-bottom-right .toast.toaster-leave-active .toast.fade,
  .pl-toaster.toaster-top-left .toast.toaster-leave-active .toast.fade,
  .pl-toaster.toaster-top-right .toast.toaster-leave-active .toast.fade {
    transition-delay: 0s;
  }

  .close {
    float: right;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: #000;
    opacity: 0.5;
    background-color: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;
  }

  .close:hover {
    color: #000;
    text-decoration: none;
    opacity: 0.75;
  }

  a.close.disabled {
    pointer-events: none;
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
