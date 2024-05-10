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
    color: #1867c0 !important;
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

  .slider-track::before {
    background-color: #6e6e6e;
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
    background-color: #383838;
  }

  .slider-background-track {
    position: absolute;
    height: 4px;
    background-color: #ccc; /* Light grey background */
    width: 100%;
}

.slider-moving-track {
    position: absolute;
    height: 4px;
    background-color: #007bff; /* Blue color for the selected range */
    transition: width 0.1s ease; /* Smooth transition for the moving track */
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

  /* .slider-tick:first-of-type {
    margin-left: 0;
  }

  .slider-tick:last-of-type {
    margin-right: 0;
  } */

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

  /* [dir="ltr"] .slider-tick::after {
    left: calc(50% - 0.0625rem);
  } */

  input {
    margin: 0;
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
  }

  input {
    overflow: visible;
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

  .slider-input {
    width: 100%;
    height: 1.5rem;
    padding: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
    border: 0;
    cursor: grab;
    margin: 0;
    /* pointer-events: auto; */
    position: absolute;
    transform: translate(0, 0);
    transition: transform 0.11s cubic-bezier(0.2, 0, 0.38, 0.9),
      background-color 0.11s cubic-bezier(0.2, 0, 0.38, 0.9);
    z-index: 10;
    -webkit-appearance: none;
  }

  .slider-input:focus,
  .slider-thumb:focus {
    outline: 0;
  }

  .slider-input:hover::-webkit-slider-thumb {
    transform: scale(1.4);
    transition: transform 0.11s cubic-bezier(0.2, 0, 0.38, 0.9),
      background-color 0.11s cubic-bezier(0.2, 0, 0.38, 0.9);
  }

  .slider-input:focus::-webkit-slider-thumb,
  .slider-thumb:focus {
    box-shadow: 0 0 0 1px #fff, 0 0 0 0.25rem rgba(13, 110, 253, 0.4);
    background-color: #0d6efd;
    transform: scale(1);
  }

  .slider-input:focus::-moz-range-thumb,
  .slider-thumb:focus {
    box-shadow: 0 0 0 1px #fff, 0 0 0 0.25rem rgba(13, 110, 253, 0.4);
    background-color: #0d6efd;
  }

  .slider-input::-moz-focus-outer {
    border: 0;
  }

  .slider-input::-webkit-slider-thumb {
    width: 0.875rem;
    height: 0.875rem;
    cursor: grab;
    margin-top: -0.45rem;
    -webkit-appearance: none;
    appearance: none;
    background-color: #383838;
    border: 0;
    border-radius: 50%;
    -webkit-transition: background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    z-index: 15;
  }

  @media (prefers-reduced-motion: reduce) {
    .slider-input::-webkit-slider-thumb {
      -webkit-transition: none;
      transition: none;
    }
  }

  .slider-input::-webkit-slider-thumb:active {
    background-color: #71acff;
    /* background-color: #0d6efd; */
    transform: scale(1) translateY(-40%);
    transition: transform 0.11s cubic-bezier(0.2, 0, 0.38, 0.9),
      background-color 0.11s cubic-bezier(0.2, 0, 0.38, 0.9);
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

  .slider-input::-webkit-slider-runnable-track {
    width: 100%;
    height: 0;
    color: transparent;
    cursor: pointer;
    background-color: #6c757d;
    border-color: transparent;
    border-radius: 1rem;
  }

  .slider-input::-moz-range-thumb {
    width: 0.875rem;
    height: 0.875rem;
    cursor: grab;
    -moz-appearance: none;
    appearance: none;
    background-color: #383838; /* #0d6efd */
    border: 0;
    border-radius: 50%;
    -moz-transition: background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .slider-input::-moz-range-thumb {
      -moz-transition: none;
      transition: none;
    }
  }

  .slider-input::-moz-range-thumb:active,
  .slider-thumb:active {
    background-color: #0d6efd;
  }

  .slider-input::-moz-range-track {
    width: 100%;
    height: 0rem;
    color: transparent;
    cursor: pointer;
    background-color: #6c757d;
    border-color: transparent;
    border-radius: 1rem;
  }

  .slider-input:disabled {
    pointer-events: none;
  }

  .slider-input:disabled::-webkit-slider-thumb {
    background-color: #6c757d;
  }

  .slider-input:disabled::-moz-range-thumb {
    background-color: #6c757d;
  }

  [dir="ltr"] .slider-input {
    left: -2px;
  }

  .slider-min-value,
  .slider-max-value {
    font-size: 0.8333rem;
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
`;
