import { css } from "lit";

export const sliderStyles = css`
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

  .primary {
    background-color: #1867c0 !important;
    border-color: #1867c0 !important;
    color: #1867c0;
  }

  .secondary {
    background-color: #6c757d !important;
    border-color: #6c757d !important;
    color: #6c757d;
  }

  .success {
    background-color: #28a745 !important;
    border-color: #28a745 !important;
    color: #28a745;
  }

  .info {
    background-color: #17a2b8 !important;
    border-color: #17a2b8 !important;
    color: #17a2b8;
  }

  .warning {
    background-color: #ffc107 !important;
    border-color: #ffc107 !important;
    color: #ffc107;
  }

  .danger {
    background-color: #dc3545 !important;
    border-color: #dc3545 !important;
    color: #dc3545;
  }

  .dark {
    background-color: #343a40 !important;
    border-color: #343a40 !important;
    color: #343a40;
  }

  .form-group {
    padding: 5px;
    margin-bottom: 1rem;
  }

  label {
    font-size: 0.75rem;
    display: inline-block;
    margin-bottom: 0.5rem;
  }

  .slider {
    display: block;
    min-width: 6.25rem;
    /* overflow: hidden; */
    padding-bottom: 0.975rem;
    user-select: none;
    z-index: 1;
  }

  .slider {
    flex: 1;
  }

  .slider-container {
    display: flex;
  }

  .slider-controls {
    margin-left: 0.62501rem;
    margin-right: 0.62501rem;
    align-items: center;
    display: flex;
    height: 1.250025rem;
    position: relative;
    vertical-align: top;
    width: calc(100% - 1.25003rem);
    z-index: auto;
  }

  .slider-controls {
    flex: 1;
  }

  .slider-background-track {
    position: absolute;
    height: 0.125rem;
    background-color: #ccc; /* Light grey background */
    width: 100%;
  }

  .slider-moving-track {
    position: absolute;
    height: 0.125rem;
    background-color: #383838; /* Blue color for the selected range */
    transition: width 0.1s ease; /* Smooth transition for the moving track */
  }

  .slider-track {
    height: 0.125rem;
    position: absolute;
    pointer-events: auto;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    transition: all 0.05s ease 0s;
  }

  [dir="ltr"] .slider-track {
    left: 0;
  }

  [dir="ltr"] .slider-track {
    right: auto;
  }

  .slider-track::before {
    border-radius: 0;
    content: "";
    display: block;
    height: 100%;
  }

  .slider-track ~ .slider-track {
    padding-bottom: 0;
    padding-top: 0;
  }

  [dir="ltr"] .slider-track ~ .slider-track {
    left: auto;
  }

  [dir="ltr"] .slider-track ~ .slider-track {
    right: 0;
  }

  [dir="ltr"] .slider-track ~ .slider-track,
  [dir="rtl"] .slider-track ~ .slider-track {
    padding-left: 0;
    padding-right: 0;
  }

  .slider-track::before {
    border-radius: 0;
    content: "";
    display: block;
    height: 100%;
  }

  .slider-track::before {
    background-color: #b3b3b3; /* #6e6e6e */
  }

  .slider.slider-range
    .slider-track:not(:first-of-type):not(:last-of-type)::before,
  [dir="ltr"].slider:not(.slider-range):not(.slider-no-fill)
    .slider-track:first-of-type::before,
  [dir="rtl"].slider:not(.slider-range):not(.slider-no-fill)
    .slider-track:last-of-type::before {
    background-color: #383838; /* #f2f2f2 */
  }

  .slider-track.multi:first-of-type::before,
  .slider-track.multi:last-of-type::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #b3b3b3;
    border-radius: 0;
    display: block;
  }

  .slider-track.multi:nth-of-type(3)::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: currentColor;
  }

  .slider-ticks {
    left: 0;
    height: 2px;
    width: 100%;
    position: absolute;
  }

  .slider-tick {
    background-color: rgba(0, 0, 0, 0.5);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    border-radius: 0;
    opacity: 1;
    position: absolute;
    background-color: #999999;
    border-radius: 1px;
    height: 0.4375rem;
    width: 0.125rem;
    margin: 0;
  }

  .slider-tick-label {
    color: rgb(108, 117, 125);
    font-size: 0.75rem;
    position: absolute;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    white-space: nowrap;
  }

  .slider-tick-label {
    top: 20px;
  }

  .slider-tick-label {
    transform: none;
  }

  .slider-tick-label {
    transform: translateX(-50%);
  }

  .slider-thumb {
    position: absolute;
    width: 0.875rem;
    height: 0.875rem;
    background-color: #383838;
    border-radius: 10px;
    transform: translateX(-50%);
    cursor: pointer;
    user-select: none;
    border: 0;
    cursor: grab;
    margin: 0;
    pointer-events: auto;
    transform: translate(0, 0);
    transition: transform 0.11s cubic-bezier(0.2, 0, 0.38, 0.9),
      background-color 0.11s cubic-bezier(0.2, 0, 0.38, 0.9);
    z-index: 2;
  }

  .slider-thumb-container {
    position: absolute;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  }

  .slider-thumb-container-active {
    z-index: 10; // Ensure the active thumb is above the other for interaction
  }

  .slider-thumb-container {
    outline: none;
    top: 50%;
  }

  .slider-thumb {
    width: 12px;
    height: 12px;
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .slider-thumb,
  .slider-thumb:before {
    position: absolute;
    border-radius: 50%;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  }

  .slider-thumb:before {
    content: "";
    color: inherit;
    width: 36px;
    height: 36px;
    background: currentColor;
    opacity: 0.3;
    left: -12px;
    top: -12px;
    transform: scale(0.1);
    pointer-events: none;
  }

  .slider-thumb:after {
    content: "";
    width: 42px;
    height: 42px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .slider-thumb-container-active .slider-thumb::before {
    transform: scale(1.5) !important;
  }

  .slider-thumb-container:hover .slider-thumb::before {
    transform: scale(1);
  }

  .slider[disabled] {
    opacity: 0.5; /* Dim the slider to indicate it's disabled */
    pointer-events: none; /* Disable all interactions */
  }

  .slider[disabled]
    .slider-container
    .slider-controls
    .slider-thumb-container:hover
    .slider-thumb::before {
    transform: scale(0);
  }

  .slider-handle {
    border-radius: 50%;
    border-style: solid;
    border-width: 0;
    box-sizing: border-box;
    cursor: grab;
    display: inline-block;
    height: 0.875rem;
    margin: 0;
    outline: none;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.11s cubic-bezier(0.2, 0, 0.38, 0.9),
      background-color 0.11s cubic-bezier(0.2, 0, 0.38, 0.9);
    width: 0.875rem;
    z-index: 2;
  }

  .slider-handle:before {
    border-radius: 50%;
    content: "";
    display: block;
    height: 0.875rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: box-shadow 0.11s cubic-bezier(0.2, 0, 0.38, 0.9),
      width 0.13s ease-out, height 0.13s ease-out;
    width: 0.875rem;
  }

  .slider-handle {
    background-color: #383838;
    border-color: #383838;
  }

  .slider-handle.is-focused {
    background-color: #383838;
  }

  .slider-handle.is-focused,
  .slider-handle:focus {
    background-color: #383838;
    box-shadow: 0 0 0 2px currentColor, inset 0 0 0 2px #fff;
  }

  .slider-handle.is-dragged,
  .slider-handle:active {
    background-color: #383838;
    box-shadow: 0 0 0 2px currentColor, inset 0 0 0 2px #fff;
  }

  .slider-handle.is-dragged,
  .slider-handle:active,
  .slider-handle.is-focused {
    cursor: grabbing;
  }

  .slider-handle.is-dragged,
  .slider-handle:active,
  .slider-handle.is-focused,
  .slider-handle.is-tophandle {
    z-index: 3;
  }

  .slider-min-value,
  .slider-max-value {
    font-size: 0.8333rem;
  }

  .slider-handle.is-dragged,
  .slider-handle:active,
  .slider-handle:hover,
  .slider-handle:focus,
  .slider-handle.is-focused,
  .slider-handle.is-tophandle {
    transform: translate(-50%, -50%) scale(1.25);
  }

  .slider-value-left,
  .slider-value-right {
    cursor: default;
    flex-grow: 0;
  }

  .slider-value-right {
    margin-left: 16px;
    min-width: 40px;
  }

  .slider-value-left {
    margin-right: 16px;
    min-width: 40px;
  }

  .slider-value-left.hidden,
  .slider-value-right.hidden {
    display: none;
    visibility: hidden;
  }

  .slider .slider-container .slider-value-left,
  .slider .slider-container .slider-value-right {
    background-color: #eaeaea; /* #909090 */
    border-radius: 3px;
    color: #383838; /* #ffffff */
    font-size: 0.8333rem;
    height: fit-content;
    padding: 0.125rem 0.4375rem;
    text-align: center;
    width: fit-content;
  }

  .slider-thumb-label-container {
    position: absolute;
    left: 0;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .slider-thumb-label {
    background-color: #383838;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    color: #fff !important;
    width: 32px;
    height: 32px;
    border-radius: 50% 50% 0;
    bottom: 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .slider-thumb-label {
    transform: translateX(-50%) translateY(60%) translateY(-100%) rotate(45deg);
  }

  .slider-thumb-label > * {
    transform: rotate(-45deg);
  }

  .slider-thumb-label.warning {
    color: #000 !important;
  }
`;
