import { css } from "lit";

export const datepickerStyles = css`
  article,
  aside,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  nav,
  section {
    display: block;
  }

  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }

  .hide {
    display: none !important;
    visibility: hidden !important;
  }

  .small,
  small {
    font-size: 0.875rem;
    font-weight: 400;
  }

  .border-top {
    border-top: 1px solid #ccc !important;
  }

  .bg-light {
    background-color: #f8f9fa !important;
  }

  .d-flex {
    display: -ms-flexbox !important;
    display: flex !important;
  }

  .flex-fill {
    -ms-flex: 1 1 auto !important;
    flex: 1 1 auto !important;
  }

  .text-muted {
    color: #c1c1c1 !important;
  }
  .text-center {
    text-align: center !important;
  }

  .form-control {
    display: block;
    width: 100%;
    /* height: calc(1.5em + 0.75rem + 2px); */
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .form-control-sm {
    height: calc(1.5em + 0.5rem + 2px);
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
    border-radius: 0.2rem;
  }

  .h-auto {
    height: auto !important;
  }

  .pt-2,
  .py-2 {
    padding-top: 0.5rem !important;
  }

  .btn {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .btn-outline-light {
    color: #f8f9fa;
    border-color: #f8f9fa;
  }

  .border-0 {
    border: 0 !important;
  }

  .rounded-circle {
    border-radius: 50% !important;
  }

  .text-nowrap {
    white-space: nowrap !important;
  }

  .font-weight-bold {
    font-weight: 700 !important;
  }

  .text-dark {
    color: #343a40;
  }

  .btn {
    width: 32px;
    height: 32px;
    font-size: 14px;
    line-height: 1;
    margin: 3px auto;
    padding: 9px 0;
  }

  .btn:hover {
    color: #212529;
    text-decoration: none;
  }

  .btn.focus,
  .btn:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
  }

  .btn-primary {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }

  .btn-primary.focus,
  .btn-primary:focus {
    color: #fff;
    background-color: #0069d9;
    border-color: #0062cc;
    box-shadow: 0 0 0 0.2rem rgb(38 143 255 / 50%);
  }

  .btn.focus,
  .btn:focus,
  .form-control.focus {
    outline: none !important;
    box-shadow: 0 0 0 0.2rem rgb(38 143 255 / 25%) !important;
  }

  .btn-primary:not(:disabled):not(.disabled).active,
  .btn-primary:not(:disabled):not(.disabled):active,
  .show > .btn-primary.dropdown-toggle {
    color: #fff;
    background-color: #0062cc;
    border-color: #005cbf;
  }

  .btn-outline-light:hover {
    color: #212529;
    background-color: #f8f9fa;
    border-color: #f8f9fa;
  }

  .btn-outline-light:not(:disabled):not(.disabled).active,
  .btn-outline-light:not(:disabled):not(.disabled):active,
  .show > .btn-outline-light.dropdown-toggle {
    color: #212529;
    background-color: #f8f9fa;
    border-color: #f8f9fa;
  }

  .btn-outline-light.focus,
  .btn-outline-light:focus {
    outline: none !important;
    background-color: #e2e6ea !important;
    box-shadow: 0 0 0 0.2rem rgb(224 224 224 / 20%) !important;
  }

  .btn-outline-secondary {
    color: #6c757d;
    border-color: #6c757d;
  }

  .btn-outline-secondary:hover,
  .btn-outline-secondary:focus {
    color: #fff;
    fill: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
  }

  .btn-group-sm > .btn,
  .btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
    border-radius: 0.2rem;
  }

  .btn:not(:disabled):not(.disabled) {
    cursor: pointer;
  }

  .selectors {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0 10px;
    justify-content: center;
    padding: 0 10px;
  }

  .selectors .form-control {
    padding: 0.375rem 0.25rem;
  }

  .selectors .months {
    width: 150px;
    margin-right: 10px;
  }

  .selectors .years {
    width: 100px;
    margin-right: 10px;
  }

  .selectors .reset-btn {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(255, 255, 255);
    border: 1px solid rgb(204, 204, 204);
    border-radius: 3px;
  }

  .selectors .reset-btn:hover
  /*, .selectors .reset-btn:focus { */
  {
    color: rgb(255, 255, 255);
    fill: rgb(255, 255, 255);
    background-color: rgb(108, 117, 125);
    border-color: rgb(108, 117, 125);
  }

  .selectors .reset-btn svg {
    fill: inherit;
  }

  .flex-fill {
    -ms-flex: 1 1 auto !important;
    flex: 1 1 auto !important;
  }

  .border-0 {
    border: 0 !important;
  }

  .focus {
    outline: none;
    background-color: #e0e0e0;
    /* border-radius: 50%; */
  }

  .dp-single-calendar,
  .dp-calendar {
    width: 270px;
  }

  .calendar-wrapper {
    display: flex;
    border-width: 1px 1px 0;
    border-style: solid;
    border-color: #ccc;
    border-radius: 0.25rem 0.25rem 0 0;
  }

  .calendar-wrapper.focus,
  .calendar-wrapper:focus {
    outline: none !important;
    background-color: transparent !important;
    box-shadow: rgb(38 143 255 / 25%) 0px 0px 0px 0.2rem !important;
    border-radius: 0.25rem 0.25rem 0 0 !important;
  }

  .calendar {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  .calendar.focus,
  .calendar:focus {
    outline: none !important;
    background-color: transparent !important;
    box-shadow: none !important;
  }

  .calendar-inner {
    min-width: 250px;
    border: 1px solid rgb(225, 225, 225);
    border-radius: 3px;
    padding: 0.25rem;
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-grid-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
    margin-top: 10px;
    border-bottom: 1px solid #dee2e6 !important;
  }

  .calendar-grid-day {
    text-align: center;
    padding: 0 5px;
    /* border-bottom: 1px solid #ccc; */
  }
  .calendar-grid-item {
    text-align: center;
    cursor: pointer;
  }
  .calendar-grid-item:focus-visible {
    outline: none;
  }

  .previous-month-day,
  .next-month-day {
    color: #ccc;
  }
  .next-month-day .active,
  .previous-month-day .active {
    color: #fff !important;
    font-weight: bold;
  }

  .current-day {
    color: #007bff !important;
  }
  .current-day.active {
    color: #fff !important;
  }
  .current-day.focus,
  .current-day:focus {
    outline: none !important;
    background-color: transparent !important;
    box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25) !important;
  }
  .current-day.active.focus,
  .current-day.active:focus {
    outline: none !important;
    background-color: #0062cc !important;
    box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25) !important;
  }
  output {
    padding: 0.25rem;
    font-size: 80%;
    display: inline-block;
  }

  .rounded-circle {
    border-radius: 50% !important;
  }
  .context {
    margin: 1rem;
    font-size: 14px;
  }

  footer .small {
    font-size: 80%;
  }

  .dp-calendar:first-child {
    margin-right: 2px;
    border: none;
    border-right: 1px solid #ccc;
    border-radius: 0.25rem 0 0 0;
  }

  .dp-calendar:last-child {
    margin-left: 2px;
    border: none;
    border-left: 1px solid #ccc;
    border-radius: 0 0.25rem 0 0;
  }

  .range-picker-wrapper {
    padding: 5px;
    max-width: 558px;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
  }

  .range-picker-wrapper footer {
    color: #a7a7a7;
    border-width: 0 1px 1px 1px;
    border-style: solid;
    border-color: #ccc;
    background-color: rgb(248, 249, 250);
  }

  .range-picker-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }

  .range-picker-nav-btn {
    background: rgb(255, 255, 255);
    border: 1px solid rgb(204, 204, 204);
    border-radius: 3px;
    width: 38px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .range-picker-nav-btn svg {
    fill: inherit;
    height: 18px;
  }

  .range-picker {
    display: inline-block;
  }

  .selected-range {
    background-color: rgba(0, 123, 255, 0.25);
    border-radius: 0 !important;
  }

  .selected-range-active {
    color: rgb(255, 255, 255) !important;
    background-color: rgb(0, 98, 204);
  }

  .selected-range-active .btn {
    color: rgb(255, 255, 255) !important;
  }

  .selected-range .focus,
  .selected-range span:focus {
    border-radius: 0 !important;
    box-shadow: none !important;
    background-color: rgba(38, 143, 255, 0.25) !important;
  }

  .selected-range .rounded-circle {
    border-radius: 0 !important;
  }

  .calendar-grid-item.selected-range span:hover,
  .calendar-grid-item.selected-range-active span:hover {
    border-radius: 0 !important;
    box-shadow: none !important;
    background-color: rgba(38, 143, 255, 0.25) !important;
    cursor: pointer;
  }

  .date-ranges {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .date-range-display {
    font-size: 0.8333rem;
    align-items: center;
    justify-content: center;
    padding: 4px;
    margin: 0;
    background-color: #fff;
    border-width: 0 1px 1px 1px;
    border-style: solid;
    border-color: #ccc;
    border-radius: 0 0 5px 5px;
  }

  .date-range-display:focus-visible {
    outline: 1px solid #777777;
  }

  .date-range-display .start-end-ranges {
    font-weight: bold;
    display: flex;
    align-items: center;
  }

  .date-range-display .start-end-ranges .start-date,
  .date-range-display .start-end-ranges .end-date {
    padding: 0 5px;
  }

  .ok-button {
    text-align: right;
    padding: 0 5px;
    width: 100%;
  }

  .ok-button .btn {
    font-size: 0.8333rem;
    padding: 5px 8px;
    height: auto;
    width: auto;
  }

  .ok-button .btn.btn-primary:hover {
    background-color: rgb(20, 109, 215);
    border-color: rgb(20, 109, 215);
    color: rgb(255, 255, 255);
  }

  .ok-button .btn.disabled,
  .ok-button .btn:disabled {
    cursor: default;
    opacity: 0.65;
    pointer-events: none;
  }

  .warning-message {
    color: #dc3545;
    font-size: 0.8333rem;
    margin: 0.5rem 0 0;
    text-align: center;
  }

  .time-input {
    width: 50px;
    padding: 0.05rem 0.4rem;
    font-size: 0.833rem;
    margin: 0 5px 0 0;
  }

  .am-pm-toggle {
    width: 28px;
    cursor: pointer;
  }

  .duration {
    margin-left: 5px;
  }

  .to-spacing {
    padding: 0 0.5rem;
  }

  .calendar-button {
    background-color: transparent;
    cursor: pointer;
    color: rgb(149, 149, 149);
    margin-left: 0px;
    min-height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    user-select: none;
    transition: color 0.15s ease-in-out 0s,
      background-color 0.15s ease-in-out 0s, border-color 0.15s ease-in-out 0s,
      box-shadow 0.15s ease-in-out 0s;
  }

  .calendar-button:hover {
    color: #fff;
  }

  .pl-input-group-prepend.is-invalid > .calendar-button:hover,
  .pl-input-group-append.is-invalid > .calendar-button:hover {
    color: #fff;
    background-color: rgb(179, 0, 9);
  }

  .pl-input-group-append .calendar-button {
    border-top: 1px solid rgb(206, 212, 218);
    border-bottom: 1px solid rgb(206, 212, 218);
    border-right: 1px solid rgb(206, 212, 218);
    border-left: none;
    border-radius: 0 0.2rem 0.2rem 0;
  }

  .pl-input-group-prepend .calendar-button {
    border-top: 1px solid rgb(206, 212, 218);
    border-bottom: 1px solid rgb(206, 212, 218);
    border-left: 1px solid rgb(206, 212, 218);
    border-right: none;
    border-radius: 0.2rem 0 0 0.2rem;
  }

  .dropdown-wrapper {
    position: relative;
  }

  .dropdown-wrapper .dropdown {
    z-index: 1;
    width: inherit;
  }

  .dropdown-wrapper .dropdown-content {
    display: none;
    background-color: white;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    /* padding: 5px; */
    border-radius: 3px;
  }

  .dropdown-wrapper .dropdown.open .dropdown-content {
    display: block;
    width: inherit;
  }

  .text-truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .plumage .selected-date {
    padding: 0.25rem;
    font-size: 80%;
    border: none;
  }

  .plumage .calendar-inner {
    padding: 0;
  }

  .plumage .calendar-nav .btn {
    padding: 0.25rem;
    margin: 0.125rem;
    font-size: 0.8333rem;
    height: 1.375rem;
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .plumage .calendar {
    border: none;
    padding: 0 !important;
  }

  .plumage .calendar .calendar-grid-caption {
    padding: 0.25rem;
    font-size: 0.875rem;
    border: none;
  }

  .plumage .calendar .calendar-grid-weekdays {
    margin: 0;
  }

  .plumage .calendar .calendar-grid-weekdays .small,
  .plumage .calendar .calendar-grid-weekdays small {
    font-size: 80%;
    font-weight: 400;
  }

  .plumage .dp-calendar:first-child {
    border-right: 1px solid rgb(204, 204, 204) !important;
    margin-right: 0;
  }

  .plumage .range-picker-nav-btn,
  .plumage .reset-btn {
    border: none;
  }

  .plumage .time-input {
    font-size: 0.833rem !important;
    border: none;
  }

  .plumage .time-input:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }

  .plumage .calendar-button {
    border: none;
  }

  .plumage .pl-input-group-text {
    border: none;
  }

  .plumage .calendar-button:hover {
    color: #1f1f1f;
    background-color: transparent !important;
  }

  .plumage .pl-input-group-prepend.is-invalid > .calendar-button:hover,
  .plumage .pl-input-group-append.is-invalid > .calendar-button:hover {
    color: #6e2226;
    background-color: transparent !important;
  }
`;
