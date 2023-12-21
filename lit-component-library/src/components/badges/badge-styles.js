import { css } from "lit";

export const badgeStyles = css`
  .mr-1 {
    margin-right: 0.25rem !important;
  }

  .ml-1 {
    margin-left: 0.25rem !important;
  }

  .pl-badge-flex {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  /* Badge styles */
  .pl-badge__wrapper {
    flex: 0 1;
    height: 100%;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
  }

  .pl-badge__badge,
  .pl-badge__token {
    display: inline-block;
    line-height: 1;
  }

  .pl-badge__badge {
    position: relative;
  }

  .pl-badge__token {
    border-radius: 10 px;
    color: #fff;
    font-size: 12px;
    letter-spacing: 0;
    min-width: 12px;
    padding: 4px;
    position: absolute;
    overflow: hidden;
    text-align: center;
    text-indent: 0;
    top: auto;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    white-space: nowrap;
  }

  .pl-badge--icon .pl-badge__token {
    padding: 4px 6px;
  }

  .pl-badge__badge.token-bordered .pl-badge__token:after {
    border-radius: inherit;
    border-width: 2px;
    border-style: solid;
    bottom: 0;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: scale(1.15);
  }

  .pl-badge--dot .pl-badge__token {
    border-radius: 4.5px;
    height: 9px;
    min-width: 0;
    padding: 0;
    width: 9px;
  }

  .pl-badge--dot .pl-badge__token {
    inset: auto auto calc(100% - 6px) calc(100% - 6px);
  }

  .pl-badge {
    align-items: center;
    border: 1px solid transparent;
    border-radius: 4px;
    display: inline-flex;
    flex: 0 0 auto;
    font-weight: 500;
    letter-spacing: 0.0892857143em;
    justify-content: center;
    min-width: 8px;
    outline: 0;
    padding: 0.15rem;
    position: relative;
    text-decoration: none;
    text-indent: 0.0892857143em;
    transition-duration: 0.28s;
    transition-property: box-shadow, transform, opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
  }

  .pl-badge {
    color: rgba(0, 0, 0, 0.87);
  }

  .pl-badge.disabled,
  .pl-badge:disabled {
    cursor: default !important;
    opacity: 0.65 !important;
    pointer-events: none !important;
  }

  .pl-badge:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(38, 128, 235, 0.5);
  }

  .pl-badge--block {
    display: flex;
    flex: 1 0 auto;
    min-width: 100% !important;
    max-width: none;
  }

  .pl-badge__content {
    align-items: center;
    color: inherit;
    display: flex;
    flex: 1 0 auto;
    justify-content: inherit;
    line-height: normal;
    position: relative;
    transition: inherit;
    transition-property: opacity;
  }

  .pl-badge.primary,
  .pl-badge__token.primary {
    background-color: #2680eb;
    border-color: #2680eb;
  }

  /* .pl-badge.primary:not(:disabled):not(.disabled).active,
  .pl-badge.primary:not(:disabled):not(.disabled):active, */
  /* .pl-badge__token.primary:not(:disabled):not(.disabled).active,
  .pl-badge__token.primary:not(:disabled):not(.disabled):active  */
  .pl-badge.primary.active,
  .pl-badge__token.primary.active {
    background-color: #1367cb;
    border-color: #1261c0;
  }

  .pl-badge.secondary,
  .pl-badge__token.secondary {
    background-color: #909090;
    border-color: #909090;
  }

  /* .pl-badge.secondary:not(:disabled):not(.disabled).active,
  .pl-badge.secondary:not(:disabled):not(.disabled):active,
  .pl-badge__token.secondary:not(:disabled):not(.disabled).active,
  .pl-badge__token.secondary:not(:disabled):not(.disabled):active  */
  .pl-badge.secondary.active,
  .pl-badge__token.secondary.active {
    background-color: #777;
    border-color: #707070;
  }

  .pl-badge.tertiary,
  .pl-badge__token.tertiary {
    background-color: #b9b9b9;
    border-color: #b9b9b9;
  }

  .pl-badge.active-blue,
  .pl-badge__token.active-blue {
    background-color: #909090;
    border-color: #909090;
    color: #ffff;
  }

  .pl-badge.active-blue.active,
  .pl-badge__token.active-blue.active {
    background-color: #5aa9fa;
    border-color: #5aa9fa;
    color: #252525;
  }

  .pl-badge.success,
  .pl-badge__token.success {
    background-color: #2d9d78;
    border-color: #2d9d78;
  }

  .pl-badge.danger,
  .pl-badge__token.danger {
    background-color: #e34850;
    border-color: #e34850;
  }

  .pl-badge.warning {
    background-color: #e68619;
    border-color: #e68619;
  }

  .pl-badge.info,
  .pl-badge__token.info {
    background-color: #5aa9fa;
    border-color: #5aa9fa;
  }

  .pl-badge.light,
  .pl-badge__token.light {
    background-color: #f2f2f2;
    border-color: #f2f2f2;
  }

  .pl-badge.dark,
  .pl-badge__token.dark {
    background-color: #323232;
    border-color: #252525;
  }

  .blue.pl-badge,
  .blue-grey.pl-badge,
  .brown.pl-badge,
  .deep-orange.pl-badge,
  .deep-purple.pl-badge,
  .green.pl-badge,
  .grey.pl-badge,
  .indigo.pl-badge,
  .light-blue.pl-badge,
  .pink.pl-badge,
  .purple.pl-badge,
  .red.pl-badge,
  .teal.pl-badge,
  .shades.black.pl-badge {
    color: #fff;
  }

  .amber.pl-badge,
  .cyan.pl-badge,
  .lime.pl-badge,
  .light-green.pl-badge,
  .orange.pl-badge,
  .yellow.pl-badge,
  .shades.white.pl-badge {
    color: #000;
  }

  .pl-badge.text {
    background-color: transparent;
    border-color: transparent;
  }

  /* .pl-badge.primary--text {
    color: #2680eb;
  }

  .pl-badge.secondary--text {
    color: #909090;
  }

  .pl-badge.tertiary--text {
    color: #b9b9b9;
  }

  .pl-badge.success--text {
    color: #2d9d78;
  }

  .pl-badge.danger--text {
    color: #e34850;
  }

  .pl-badge.warning--text {
    color: #e68619;
  }

  .pl-badge.info--text {
    color: #5aa9fa;
  }

  .pl-badge.light--text {
    color: #f2f2f2;
  }

  .pl-badge.dark--text {
    color: #323232;
  } */

  .pl-badge.xs {
    font-size: 0.625rem;
    /* min-width: 36px !important; */
  }

  .pl-badge.sm {
    font-size: 0.75rem;
    /* min-width: 50px !important; */
  }

  .pl-badge.lg {
    font-size: 1.2rem !important;
    /* min-width: 78px !important; */
  }

  .pl-badge:not(.pl-badge--outlined).accent,
  .pl-badge:not(.pl-badge--outlined).danger,
  .pl-badge:not(.pl-badge--outlined).info,
  .pl-badge:not(.pl-badge--outlined).primary,
  .pl-badge:not(.pl-badge--outlined).secondary,
  .pl-badge:not(.pl-badge--outlined).success,
  .pl-badge:not(.pl-badge--outlined).warning,
  .pl-badge:not(.pl-badge--outlined).dark {
    color: #fff;
  }

  .pl-badge__token.yellow,
  .pl-badge__token.light,
  .pl-badge__token.white {
    color: #000;
  }

  .pl-badge.flat,
  .pl-badge__token.flat {
    border: none;
    box-shadow: none;
  }

  .pl-badge .icon {
    margin: 0 3px;
  }

  .pl-badge.pill {
    border-radius: 1.75rem;
    padding: 0.25rem 0.5rem;
  }

  .pl-badge.pill .icon {
    margin: 0 0 0 3px;
  }

  .pl-badge.square,
  .pl-badge__token.square {
    border-radius: 0;
  }

  .pl-badge.circle,
  .pl-badge__token.circle {
    border-radius: 50%;
  }
  
  .pl-badge.rounded,
  .pl-badge__token.rounded {
    border-radius: 4px;
  }

  .pl-badge.is-elevated,
  .pl-badge__token.is-elevated {
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
      0 1px 5px 0 rgb(0 0 0 / 12%);
  }

  .elevated-0 {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(0, 0, 0, 0.14),
      0 0 0 0 rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-1 {
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
      0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-2 {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-3 {
    box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2),
      0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-4 {
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
      0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-5 {
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
      0 5px 8px 0 rgba(0, 0, 0, 0.14), 0 1px 14px 0 rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-6 {
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
      0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-7 {
    box-shadow: 0 4px 5px -2px rgba(0, 0, 0, 0.2),
      0 7px 10px 1px rgba(0, 0, 0, 0.14), 0 2px 16px 1px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-8 {
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
      0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-9 {
    box-shadow: 0 5px 6px -3px rgba(0, 0, 0, 0.2),
      0 9px 12px 1px rgba(0, 0, 0, 0.14), 0 3px 16px 2px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-10 {
    box-shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.2),
      0 10px 14px 1px rgba(0, 0, 0, 0.14), 0 4px 18px 3px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-11 {
    box-shadow: 0 6px 7px -4px rgba(0, 0, 0, 0.2),
      0 11px 15px 1px rgba(0, 0, 0, 0.14), 0 4px 20px 3px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-12 {
    box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2),
      0 12px 17px 2px rgba(0, 0, 0, 0.14), 0 5px 22px 4px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-13 {
    box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2),
      0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-14 {
    box-shadow: 0 7px 9px -4px rgba(0, 0, 0, 0.2),
      0 14px 21px 2px rgba(0, 0, 0, 0.14), 0 5px 26px 4px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-15 {
    box-shadow: 0 8px 9px -5px rgba(0, 0, 0, 0.2),
      0 15px 22px 2px rgba(0, 0, 0, 0.14), 0 6px 28px 5px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-16 {
    box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
      0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-17 {
    box-shadow: 0 8px 11px -5px rgba(0, 0, 0, 0.2),
      0 17px 26px 2px rgba(0, 0, 0, 0.14), 0 6px 32px 5px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-18 {
    box-shadow: 0 9px 11px -5px rgba(0, 0, 0, 0.2),
      0 18px 28px 2px rgba(0, 0, 0, 0.14), 0 7px 34px 6px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-19 {
    box-shadow: 0 9px 12px -6px rgba(0, 0, 0, 0.2),
      0 19px 29px 2px rgba(0, 0, 0, 0.14), 0 7px 36px 6px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-20 {
    box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2),
      0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-21 {
    box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2),
      0 21px 33px 3px rgba(0, 0, 0, 0.14), 0 8px 40px 7px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-22 {
    box-shadow: 0 10px 14px -6px rgba(0, 0, 0, 0.2),
      0 22px 35px 3px rgba(0, 0, 0, 0.14), 0 8px 42px 7px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-23 {
    box-shadow: 0 11px 14px -7px rgba(0, 0, 0, 0.2),
      0 23px 36px 3px rgba(0, 0, 0, 0.14), 0 9px 44px 8px rgba(0, 0, 0, 0.12) !important;
  }

  .elevated-24 {
    box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
      0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12) !important;
  }

  .pl-badge--outlined,
  .pl-badge__token.outlined {
    background-color: #FFF !important;
    border: thin solid !important;
  }

  .pl-badge--outlined.accent .pl-badge__token.outlined.accent {
    background-color: transparent;
    border-color: #2680eb;
    color: #2680eb;
  }

  .pl-badge--outlined.primary,
  .pl-badge__token.outlined.primary {
    background-color: transparent;
    border-color: #2680eb;
    color: #2680eb;
  }

  .pl-badge--outlined.secondary,
  .pl-badge__token.outlined.secondary {
    background-color: transparent;
    border-color: #909090;
    color: #909090;
  }

  .pl-badge--outlined.tertiary,
  .pl-badge__token.outlined.tertiary {
    background-color: transparent;
    border-color: #b9b9b9;
    color: #b9b9b9;
  }

  .pl-badge--outlined.success,
  .pl-badge__token.outlined.success {
    background-color: transparent;
    border-color: #2d9d78;
    color: #2d9d78;
  }

  .pl-badge--outlined.danger,
  .pl-badge__token.outlined.danger {
    background-color: transparent;
    border-color: #e34850;
    color: #e34850;
  }

  .pl-badge--outlined.warning,
  .pl-badge__token.outlined.warning {
    background-color: transparent;
    border-color: #e68619;
    color: #e68619;
  }

  .pl-badge--outlined.info,
  .pl-badge__token.outlined.info {
    background-color: transparent;
    border-color: #5aa9fa;
    color: #5aa9fa;
  }

  .pl-badge--outlined.light,
  .pl-badge__token.outlined.light {
    background-color: transparent;
    border-color: #c5c5c5 !important;
  }

  .pl-badge--outlined.dark,
  .pl-badge__token.outlined.dark {
    background-color: transparent;
    border-color: #323232;
    color: #323232;
  }

  .pl-badge__token.outlined.primary,
  .pl-badge__token.outlined.secondary,
  .pl-badge__token.outlined.tertiary,
  .pl-badge__token.outlined.success,
  .pl-badge__token.outlined.danger,
  .pl-badge__token.outlined.warning,
  .pl-badge__token.outlined.info,
  .pl-badge__token.outlined.light,
  .pl-badge__token.outlined.dark {
    background-color: #fff !important;
  }

  .pl-badge.link {
    background-color: transparent;
    border-color: transparent;
    color: #2680eb;
  }

  .pl-badge.link:hover {
    background-color: transparent;
    border-color: transparent;
    color: #115bb4;
  }

  .pulse {
    animation: token-pulse 2s infinite;
  }

  @keyframes token-pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
    }
  }
`;
