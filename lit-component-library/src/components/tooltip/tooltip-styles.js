import { css } from "lit";

export const tooltipStyles = css`
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
   }

  .secondary {
    background-color: #6c757d !important;
  }

  .success {
    background-color: #28a745 !important;
  }

  .info {
    background-color: #17a2b8 !important;
  }

  .warning {
    background-color: #ffc107 !important;
    color: #000 !important;
  }

  .danger {
    background-color: #dc3545 !important;
 }

  .dark {
    background-color: #343a40 !important;
  }

.tooltip {
  position: absolute;
  z-index: 1070;
  display: block;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.875rem; /* Tooltip font size 0.8333rem */
  font-weight: 400;
  line-height: 1.2;
  text-align: left;
  text-align: start;
  text-decoration: none;
  text-shadow: none;
  text-transform: none;
  letter-spacing: normal;
  word-break: normal;
  word-spacing: normal;
  white-space: normal;
  line-break: auto;
  word-wrap: break-word;
  margin: 0;
  opacity: 0;
  transition: opacity 0.15s;
  border-radius: 0.25rem;
}

.tooltip.show {
  opacity: 1;
}

.tooltip .tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

.tooltip .tooltip-inner {
  max-width: 15rem;
  padding: 0.25rem 0.5rem;
  color: #f0f0f0; /* Tooltip text color #3e3e3e */
  text-align: center;
  background-color: #6e6e6e; /* Tooltip background color #e3e3e3 */
  border-radius: 0.25rem;
}

.tooltip.tooltip-top .tooltip-arrow {
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0.5rem 0.375rem 0;
  border-color: #6e6e6e transparent transparent transparent; /* Tooltip background color #e3e3e3 */
}

.tooltip.tooltip-top .tooltip-arrow.primary,
.tooltip.tooltip-top .tooltip-arrow.secondary,
.tooltip.tooltip-top .tooltip-arrow.success,
.tooltip.tooltip-top .tooltip-arrow.info,
.tooltip.tooltip-top .tooltip-arrow.warning,
.tooltip.tooltip-top .tooltip-arrow.danger,
.tooltip.tooltip-top .tooltip-arrow.dark {
    border-width: 0.5rem 0.375rem 0 !important;
    background-color: transparent !important;
}

.tooltip.tooltip-top .tooltip-arrow.primary {
  border-color: #1867c0 transparent transparent transparent;
}

.tooltip.tooltip-top .tooltip-arrow.secondary {
  border-color: #6c757d transparent transparent transparent;
}

.tooltip.tooltip-top .tooltip-arrow.success {
  border-color: #28a745 transparent transparent transparent;
}

.tooltip.tooltip-top .tooltip-arrow.info {
  border-color: #17a2b8 transparent transparent transparent;
}

.tooltip.tooltip-top .tooltip-arrow.warning {
  border-color: #ffc107 transparent transparent transparent;
}

.tooltip.tooltip-top .tooltip-arrow.danger {
  border-color: #dc3545 transparent transparent transparent;
}

.tooltip.tooltip-top .tooltip-arrow.dark {
  border-color: #343a40 transparent transparent transparent;
}

.tooltip.tooltip-bottom .tooltip-arrow {
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 0.375rem 0.5rem;
  border-color: transparent transparent #6e6e6e transparent; /* Tooltip background color #e3e3e3 */
}

.tooltip.tooltip-bottom .tooltip-arrow.primary,
.tooltip.tooltip-bottom .tooltip-arrow.secondary,
.tooltip.tooltip-bottom .tooltip-arrow.success,
.tooltip.tooltip-bottom .tooltip-arrow.info,
.tooltip.tooltip-bottom .tooltip-arrow.warning,
.tooltip.tooltip-bottom .tooltip-arrow.danger,
.tooltip.tooltip-bottom .tooltip-arrow.dark {
    border-width: 0 0.375rem 0.5rem !important;
    background-color: transparent !important;
}

.tooltip.tooltip-bottom .tooltip-arrow.primary {
  border-color: transparent transparent #1867c0 transparent;
}

.tooltip.tooltip-bottom .tooltip-arrow.secondary {
  border-color: transparent transparent #6c757d transparent;
}

.tooltip.tooltip-bottom .tooltip-arrow.success {
  border-color: transparent transparent #28a745 transparent;
}

.tooltip.tooltip-bottom .tooltip-arrow.info {
  border-color: transparent transparent #17a2b8 transparent;
}

.tooltip.tooltip-bottom .tooltip-arrow.warning {
  border-color: transparent transparent #ffc107 transparent;
}

.tooltip.tooltip-bottom .tooltip-arrow.danger {
  border-color: transparent transparent #dc3545 transparent;
}

.tooltip.tooltip-bottom .tooltip-arrow.dark {
  border-color: transparent transparent #343a40 transparent;
}

.tooltip.tooltip-left .tooltip-arrow {
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 0.375rem 0 0.375rem 0.5rem;
  border-color: transparent transparent transparent #6e6e6e; /* Tooltip background color #e3e3e3 */
}

.tooltip.tooltip-left .tooltip-arrow.primary,
.tooltip.tooltip-left .tooltip-arrow.secondary,
.tooltip.tooltip-left .tooltip-arrow.success,
.tooltip.tooltip-left .tooltip-arrow.info,
.tooltip.tooltip-left .tooltip-arrow.warning,
.tooltip.tooltip-left .tooltip-arrow.danger,
.tooltip.tooltip-left .tooltip-arrow.dark {
    border-width: 0.375rem 0 0.375rem 0.5rem !important;
    background-color: transparent !important;
}

.tooltip.tooltip-left .tooltip-arrow.primary {
  border-color: transparent transparent transparent #1867c0;
}

.tooltip.tooltip-left .tooltip-arrow.secondary {
  border-color: transparent transparent transparent #6c757d;
}

.tooltip.tooltip-left .tooltip-arrow.success {
  border-color: transparent transparent transparent #28a745;
}

.tooltip.tooltip-left .tooltip-arrow.info {
  border-color: transparent transparent transparent #17a2b8;
}

.tooltip.tooltip-left .tooltip-arrow.warning {
  border-color: transparent transparent transparent #ffc107;
}

.tooltip.tooltip-left .tooltip-arrow.danger {
  border-color: transparent transparent transparent #dc3545;
}

.tooltip.tooltip-left .tooltip-arrow.dark {
  border-color: transparent transparent transparent #343a40;
}

.tooltip.tooltip-right .tooltip-arrow {
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 0.375rem 0.5rem 0.375rem 0;
  border-color: transparent #6e6e6e transparent transparent; /* Tooltip background color #e3e3e3 */
}

.tooltip.tooltip-right .tooltip-arrow.primary,
.tooltip.tooltip-right .tooltip-arrow.secondary,
.tooltip.tooltip-right .tooltip-arrow.success,
.tooltip.tooltip-right .tooltip-arrow.info,
.tooltip.tooltip-right .tooltip-arrow.warning,
.tooltip.tooltip-right .tooltip-arrow.danger,
.tooltip.tooltip-right .tooltip-arrow.dark {
    border-width: 0.375rem 0.5rem 0.375rem 0 !important;
    background-color: transparent !important;
}

.tooltip.tooltip-right .tooltip-arrow.primary {
  border-color: transparent #1867c0 transparent transparent;
}

.tooltip.tooltip-right .tooltip-arrow.secondary {
  border-color: transparent #6c757d transparent transparent;
}

.tooltip.tooltip-right .tooltip-arrow.success {
  border-color: transparent #28a745 transparent transparent;
}

.tooltip.tooltip-right .tooltip-arrow.info {
  border-color: transparent #17a2b8 transparent transparent;
}

.tooltip.tooltip-right .tooltip-arrow.warning {
  border-color: transparent #ffc107 transparent transparent;
}

.tooltip.tooltip-right .tooltip-arrow.danger {
  border-color: transparent #dc3545 transparent transparent;
}

.tooltip.tooltip-right .tooltip-arrow.dark {
  border-color: transparent #343a40 transparent transparent;
}


`;
