import { css } from "lit";

export const modalStyles = css`
  *,
  :after,
  :before {
    box-sizing: border-box;
  }

  .modal-backdrop {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.5);
    }
    .modal-content {
      position: relative;
      background: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 2;
    }

  `;