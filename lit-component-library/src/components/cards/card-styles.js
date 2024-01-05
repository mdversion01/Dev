import { css } from "lit";

export const cardStyles = css`
  .h4,
  h4 {
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.2;
  }

  .pl-card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.125rem;
    background-color: #fff;

    /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  }

  .pl-card-img-top {
    width: 100%;
    border-top-left-radius: calc(0.25rem - 1px);
    border-top-right-radius: calc(0.25rem - 1px);
  }

  .pl-card img {
    vertical-align: middle;
    border-style: none;
  }

  .pl-card .pl-card-header {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    letter-spacing: 0.0125em;
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    font-size: 1.0625rem;
    font-weight: 300;
    margin-bottom: 0;
    padding: 0.625rem;
    word-break: break-all;
  }

  .pl-card .pl-card-title {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    font-size: 1rem;
    letter-spacing: 0.0125em;
    margin-bottom: 0.75rem;
    margin-top: 0;
    word-break: break-all;
  }

  .pl-card .pl-card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 0.875rem;
  }

  .pl-card .pl-card-text {
    color: #212529;
    font-size: 0.8333rem;
    font-weight: 400;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  .pl-card .pl-card-text:last-child {
    margin-bottom: 0;
  }

  .pl-card .pl-card-footer {
    background-color: #fff;
    border-top: 1px solid rgba(0, 0, 0, 0.125);
    font-size: 0.875rem;
    font-weight: 300;
    padding: 0 0.625rem;
  }

  .pl-card .pl-card-actions {
    align-items: center;
    display: flex;
    padding: 8px;
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
`;
