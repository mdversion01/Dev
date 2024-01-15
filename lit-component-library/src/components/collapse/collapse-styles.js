import { css } from "lit";

export const collapseStyles = css`
  .fade {
    transition: opacity 0.15s linear;
  }

  @media (prefers-reduced-motion: reduce) {
    .fade {
      transition: none;
    }
  }

  .fade:not(.show) {
    opacity: 0;
  }

  .collapse {
    position: relative;
    overflow: hidden;
    transition: height 0.35s ease;
    height: 0;
  }

  .collapse.show {
    height: auto;
  }

  .collapsing {
    transition: height 0.35s ease;
  }

  .rotate-down {
    transform: rotate(180deg);
    transition: transform 0.3s ease-in-out;
  }

  .rotate-up {
    transform: rotate(0deg);
    transition: transform 0.35s ease-in-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .collapsing {
      transition: none;
    }
  }

  .expansion-wrapper {
    text-align: left;
  }

  .expansion-body {
    flex: 1 1 auto;
    padding: 1.25rem;
    text-align: left;
  }

  .expansion-body.text-large {
    font-size: 1.25rem;
  }

  .expansion-body.text-default {
    font-size: 1rem;
  }

  .expansion-body.text-small {
    font-size: 0.875rem;
  }

  .expansion-body.text-xsmall {
    font-size: 0.75rem;
  }

  .expansion-body.text-xlarge {
    font-size: 1.5rem;
  }

  .expansion-body.text-xxlarge {
    font-size: 2rem;
  }

  .expansion-card {
    position: relative;
    margin: 5px 0;
    min-width: 0;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
  }

  .accordion .expansion-card {
    border-radius: 0;
    margin: 0;
  }


  
`;
