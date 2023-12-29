import { css } from "lit";

export const buttonGroupStyles = css`
  .pl-btn-group,
  .pl-btn-group-vertical {
    position: relative;
    display: -ms-inline-flexbox;
    display: inline-flex;
    vertical-align: middle;
  }

  .pl-btn-group-vertical {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}

  .pl-btn-group-vertical > .pl-btn,
  .pl-btn-group > .pl-btn {
    position: relative;
    flex: 1 1 auto;
  }
`;
