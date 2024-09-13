import { css } from "lit";

export const inputGroupStyles = css`
  .pl-input-group {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    width: 100%;
  }

  .pl-input-group-append,
  .pl-input-group-prepend {
    display: flex;
    height: 100%;
  }

  .pl-input-group-prepend {
    margin-right: -1px;
  }

  .pl-input-group-append,
  .pl-input-group-prepend {
    display: flex;
  }

  .pl-input-group-append {
    margin-left: -1px;
  }

  .pl-input-group-text {
    display: flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    text-align: center;
    white-space: nowrap;
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;

    min-height: 38px;
  }

  .pl-input-group-btn {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.275rem 0.75rem;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    white-space: nowrap;
    //border: 1px solid #ced4da;
    border-top: 1px solid #ced4da;
    border-bottom: 1px solid #ced4da;
    border-right: none;
    border-left: none;
    border-radius: 0.25rem;
    background-color: transparent;
    min-height: 28px;
    height: 100%;
  }

  .pl-input-group
    > .pl-input-group-append:not(:last-child)
    > .pl-input-group-text {
    border-left: none;
    border-right: none;
  }

  .pl-input-group > .pl-input-group-append:last-child > .pl-input-group-btn {
    border-right: 1px solid #ced4da;
    border-left: none;
  }

  .pl-input-group
    > .pl-input-group-append:last-child
    > .pl-btn:not(:last-child):not(.dropdown-toggle),
  .pl-input-group
    > .pl-input-group-append:last-child
    > .pl-input-group-text:not(:last-child),
  .pl-input-group
    > .pl-input-group-append:last-child
    > .pl-input-group-btn:not(:last-child),
  .pl-input-group > .pl-input-group-append:not(:last-child) > .pl-btn,
  .pl-input-group
    > .pl-input-group-append:not(:last-child)
    > .pl-input-group-text,
  .pl-input-group
    > .pl-input-group-append:not(:last-child)
    > .pl-input-group-btn,
  .pl-input-group > .pl-input-group-prepend > .pl-btn,
  .pl-input-group > .pl-input-group-prepend > .pl-input-group-text,
  .pl-input-group > .pl-input-group-prepend > .pl-input-group-btn {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .pl-input-group > .pl-input-group-append > .pl-btn,
  .pl-input-group > .pl-input-group-append > .pl-input-group-text,
  .pl-input-group
    > .pl-input-group-prepend:first-child
    > .btn:not(:first-child),
  .pl-input-group
    > .pl-input-group-prepend:first-child
    > .pl-input-group-text:not(:first-child),
  .pl-input-group > .pl-input-group-prepend:not(:first-child) > .pl-btn,
  .pl-input-group
    > .pl-input-group-prepend:not(:first-child)
    > .pl-input-group-text {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .pl-input-group > .custom-file,
  .pl-input-group > .custom-select,
  .pl-input-group > .form-control {
    position: relative;
    flex: 1 1 auto;
    width: 1%;
    margin-bottom: 0;
    padding: 0.375rem 0.75rem;
  }

  .pl-input-group > .custom-select:not(:first-child),
  .pl-input-group > .form-control:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .pl-input-group > .custom-select:not(:last-child),
  .pl-input-group > .form-control:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .pl-input-group-sm > .custom-select,
  .pl-input-group-sm > .form-control,
  .pl-input-group-sm > .pl-input-group-append > .pl-btn,
  .pl-input-group-sm > .pl-input-group-append > .pl-input-group-text,
  .pl-input-group-sm > .pl-input-group-prepend > .pl-btn,
  .pl-input-group-sm > .pl-input-group-prepend > .pl-input-group-text {
    padding: 0.15rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
    border-radius: 0.2rem;
    min-height: 0;
  }

  .pl-input-group-sm > .custom-select,
  .pl-input-group-sm > .form-control:not(textarea) {
    height: calc(1.5em + 0.39rem + 1px);
  }

  .pl-input-group-lg > .custom-select,
  .pl-input-group-lg > .form-control,
  .pl-input-group-lg > .pl-input-group-append > .pl-btn,
  .pl-input-group-lg > .pl-input-group-append > .pl-input-group-text,
  .pl-input-group-lg > .pl-input-group-prepend > .pl-btn,
  .pl-input-group-lg > .pl-input-group-prepend > .pl-input-group-text {
    padding: 0.5rem 1rem;
    font-size: 1.125rem;
    line-height: 1.5;
    border-radius: 0.3rem;
  }

  .pl-input-group-lg > .custom-select,
  .pl-input-group-lg > .form-control:not(textarea) {
    height: calc(1.5em + 1rem + 2px);
  }

  .horizontal .form-input-group-basic label,
  .inline .form-input-group-basic label {
    display: flex;
    align-items: center;
    justify-content: right;
    font-size: 0.8333rem;
    margin-bottom: 0 !important;
    padding-right: 8px !important;
  }

  .horizontal .pl-input-group,
  .inline .pl-input-group {
    padding: 0 15px 0 0;
  }

  .form-input-group-basic label {
    margin-bottom: 0.25rem !important;
  }

  .form-control {
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
  }

  .pl-input-group-prepend.is-invalid > .pl-input-group-text,
  .pl-input-group-append.is-invalid > .pl-input-group-text {
    color: #b30009;
    border-color: #b30009;
  }

  .form-control:invalid,
  .form-control.is-invalid {
    border-color: #b30009;
    padding-right: calc(1.5em + 0.75rem);
    background-repeat: no-repeat;
    background-position: right calc(-1em + 1.5rem) center;
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    background-image: url(
      data:image/svg + xml,
      %3csvgxmlns="http://www.w3.org/2000/svg"fill="%23e34850"viewBox="0 0 24 24"%3e%3cpathd="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0 18c4.411 0 8-3.589 8-8s-3.589-8-8-8-8 3.589-8 8 3.589 8 8 8z"/%3e%3cpathd="M13 7h-2v6h2V7zm0 8h-2v2h2v-2z"/%3e%3c/svg%3e
    );
  }

  .invalid {
    color: #b30009;
  }
`;
