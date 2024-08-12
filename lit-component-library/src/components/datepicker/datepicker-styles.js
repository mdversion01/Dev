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

  .small,
  small {
    font-size: 0.875em;
    font-weight: 400;
  }

  .border-top {
    border-top: 1px solid #dee2e6 !important;
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
    color: #6c757d !important;
  }
  .text-center {
    text-align: center !important;
  }

  .form-control {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
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

  .btn-outline-light.focus, .btn-outline-light:focus {
    outline: none !important;
    background-color: #e2e6ea !important;
    box-shadow: 0 0 0 0.2rem rgb(224 224 224 / 20%) !important;
}

  .btn-outline-secondary {
    color: #6c757d;
    border-color: #6c757d;
  }

  .btn-outline-secondary:hover {
    color: #fff;
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

  /* .btn-outline-secondary {
    color: #6c757d;
    border-color: #6c757d;
  }

  .btn-outline-secondary:hover {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
  }

  .btn-primary.focus,
  .btn-primary:focus {
    color: #fff;
    background-color: #0069d9;
    border-color: #0062cc;
    box-shadow: 0 0 0 0.2rem rgb(38 143 255 / 50%);
  }

  .btn-primary:not(:disabled):not(.disabled).active,
  .btn-primary:not(:disabled):not(.disabled):active,
  .show > .btn-primary.dropdown-toggle {
    color: #fff;
    background-color: #0062cc;
    border-color: #005cbf;
  }

  .btn.focus,
  .btn:focus,
  .form-control.focus {
    outline: none !important;
    box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25) !important;
  }

  .btn-outline-light.focus,
  .btn-outline-light:focus {
    outline: none !important;
    background-color: #e2e6ea !important;
    box-shadow: 0 0 0 0.2rem rgba(224, 224, 224, 0.2) !important;
  }

  [type="button"]:not(:disabled),
  [type="reset"]:not(:disabled),
  [type="submit"]:not(:disabled),
  button:not(:disabled) {
    cursor: pointer;
  } */

  .flex-fill {
    -ms-flex: 1 1 auto !important;
    flex: 1 1 auto !important;
  }
  .border-0 {
    border: 0 !important;
  }

  .dp-calendar {
    width: 270px;
  }
  .calendar {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
  .calendar-inner {
    min-width: 250px;
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
    border-bottom: 1px solid #ccc;
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
`;
