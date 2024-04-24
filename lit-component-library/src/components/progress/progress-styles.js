import { css } from "lit";

export const progressStyles = css`
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

  :host {
    display: block;
  }

  .linear-progress {
    height: 20px;
    background-color: #e9ecef;
    border-radius: 0.25rem;
    line-height: 0;
    font-size: 0.75rem;
  }

  .progress-bar {
    height: 100%;
    background-color: #007bff;
    color: #fff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    transition: width 0.6s ease;
  }

  .linear-progress,
  .progress-bar {
    display: flex;
    overflow: hidden;
  }

  .progress-bar-striped {
    background-image: linear-gradient(
      45deg,
      hsla(0, 0%, 100%, 0.15) 25%,
      transparent 0,
      transparent 50%,
      hsla(0, 0%, 100%, 0.15) 0,
      hsla(0, 0%, 100%, 0.15) 75%,
      transparent 0,
      transparent
    );
    background-size: 1rem 1rem;
  }

  .progress-bar-animated {
    -webkit-animation: progress-bar-stripes 1s linear infinite;
    animation: progress-bar-stripes 1s linear infinite;
  }

  circle {
    fill: none;
    stroke: #007bff;
    // stroke-width: 8;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.6s ease;
  }

  svg {
    transform: rotate(-90deg);
    width: 100%;
    height: 100%;
  }

  .progress-circular {
    position: relative;
    display: inline-flex;
    vertical-align: middle;
    justify-content: center;
    align-items: center;
  }

  .v-progress-circular {
    margin: 1rem;
  }

  .progress-circular>svg {
    width: 100%;
    height: 100%;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
  }

  .progress-circular-spin > svg {
    -webkit-animation: progress-circular-rotate 1.4s linear infinite;
    animation: progress-circular-rotate 1.4s linear infinite;
    transform-origin: center center;
    transition: all 0.2s ease-in-out;
  }

  .progress-circular-spin .progress-circular-overlay {
    -webkit-animation: progress-circular-dash 1.4s ease-in-out infinite;
    animation: progress-circular-dash 1.4s ease-in-out infinite;
    stroke-linecap: round;
    stroke-dasharray: 80, 200;
    stroke-dashoffset: 0px;
  }

  .progress-circular-spin:not(.progress-circular-visible)
    .progress-circular-overlay,
  .progress-circular-spin:not(.progress-circular-visible) > svg {
    -webkit-animation-play-state: paused !important;
    animation-play-state: paused !important;
  }

  .progress-circular-info {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .progress-circular-underlay {
    stroke: hsla(0, 0%, 62%, 0.4);
    z-index: 1;
  }

  .progress-circular-overlay {
    stroke: currentColor;
    z-index: 2;
    transition: all 0.6s ease-in-out;
  }

  .bg-primary {
    background-color: #007bff !important;
    stroke: #007bff !important;
  }

  .bg-secondary {
    background-color: #6c757d !important;
    stroke: #6c757d !important;
  }

  .bg-success {
    background-color: #28a745 !important;
    stroke: #28a745 !important;
  }

  .bg-info {
    background-color: #17a2b8 !important;
    stroke: #17a2b8 !important;
  }

  .bg-warning {
    background-color: #ffc107 !important;
    stroke: #ffc107 !important;
    color: #000;
  }

  .bg-danger {
    background-color: #dc3545 !important;
    stroke: #dc3545 !important;
  }

  .bg-dark {
    background-color: #343a40 !important;
    stroke: #343a40 !important;
  }

  .primary-text {
    color: #007bff !important;
    caret-color: #007bff !important;
  }

  .secondary-text {
    color: #6c757d !important;
    caret-color: #6c757d !important;
  }

  .success-text {
    color: #28a745 !important;
    caret-color: #28a745 !important;
  }

  .info-text {
    color: #17a2b8 !important;
    caret-color: #17a2b8 !important;
  }

  .warning-text {
    color: #ffc107 !important;
    caret-color: #ffc107 !important;
  }

  .danger-text {
    color: #dc3545 !important;
    caret-color: #dc3545 !important;
  }

  .dark-text {
    color: #343a40 !important;
    caret-color: #343a40 !important;
  }

  .progress-text {
    padding: 0 4px;
  }

  @keyframes progress-bar-stripes {
    0% {
      background-position: 1rem 0;
    }
    100% {
      background-position: 0 0;
    }
  }

  @-webkit-keyframes progress-circular-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0px;
    }
    50% {
      stroke-dasharray: 100, 200;
      stroke-dashoffset: -15px;
    }
    to {
      stroke-dasharray: 100, 200;
      stroke-dashoffset: -124px;
    }
  }
  @keyframes progress-circular-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0px;
    }
    50% {
      stroke-dasharray: 100, 200;
      stroke-dashoffset: -15px;
    }
    to {
      stroke-dasharray: 100, 200;
      stroke-dashoffset: -124px;
    }
  }
  @-webkit-keyframes progress-circular-rotate {
    to {
      transform: rotate(1turn);
    }
  }
  @keyframes progress-circular-rotate {
    to {
      transform: rotate(1turn);
    }
  }
`;
