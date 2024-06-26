import { css } from "lit";

export const timepickerStyles = css`
.timepicker-wrapper {
  position: relative;
  padding: 1rem;
  margin: 1rem;
  border: 1px solid #dee2e6;
}

.time-picker {
  position: relative;
}

.time-input,
.time-icon {
  display: inline-block;
}

.time-icon {
  cursor: pointer;
  border-width: 0;
  border-left-width: 1px;
  border-left-color: #ccc;
}

.time-dropdown {
  position: absolute;
  top: 38px;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 5px;
  z-index: 1;
}

.time-dropdown.hidden {
  display: none;
}

.time-spinner {
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 0.5rem;
}

.time-picker .input-group {
  border: 1px solid #ccc;
  border-radius: 0.375rem;
}

.time-picker .input-group .form-control {
  border: none;
}

.time-spinner-wrapper {
  display: flex;
  margin-bottom: 0.5rem;
}

.time-spinner.am-pm-spinner {
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 0.5rem;
}

.am-pm-spinner.hidden {
  display: none;
}

.time-spinner-colon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.time-spinner-colon .dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0.5rem 0;
  font-size: 0.5rem;
}

.time-spinner-close {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

input[type="number"] {
  width: 40px;
}

button.arrow {
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0.25rem 0.5rem;
  border: none;
  background-color: #fff;
}

button.arrow:hover {
  background-color: #e1e1e1;
}

button.arrow.up {
  border-bottom: 1px solid #ccc;
  border-radius: 0.3rem 0.3rem 0 0;
}
button.arrow.down {
  border-top: 1px solid #ccc;
  border-radius: 0 0 0.3rem 0.3rem;
}

.clear-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  color: #959595;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  user-select: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.clear-button:hover {
  color: #ac0000;
}

.validation-message,
.warning-message {
  color: #ac0000;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.fa-sr-only,
.fa-sr-only-focusable:not(:focus),
.sr-only,
.sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.fa-sr-only,
.fa-sr-only-focusable:not(:focus),
.sr-only,
.sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
`;
