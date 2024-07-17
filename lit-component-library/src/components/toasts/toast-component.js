import { LitElement, html, css, svg } from "lit";
import { toastStyles } from "./toasts-styles.js";
import { utilitiesStyles } from "../utilities-styles.js"; // Import the utilities styles

class ToastComponent extends LitElement {
  static styles = [utilitiesStyles, toastStyles, css``];

  static properties = {
    duration: { type: Number },
    id: { type: String },
    position: { type: String, reflect: true },
    plumageToast: { type: Boolean },
    plumageTemplate2: { type: Boolean },
    solidToast: { type: Boolean },
    appendToast: { type: Boolean },
    toasts: { type: Array },
  };

  constructor() {
    super();
    this.duration = 5000; // Default duration to 5 seconds
    this.id = "toast-component";
    this.position = "bottom-right";
    this.plumageToast = false;
    this.plumageTemplate2 = false;
    this.solidToast = false;
    this.appendToast = false; // Default to prepending toasts
    this.toasts = [];
  }

  showToast({
    message,
    secondaryMessage,
    variant = "",
    duration = this.duration,
    customContent = null,
    secContent = null,
    svgIcon = "exclamation-triangle-fill",
    persistent = false,
    title = "",
    time = new Date().toISOString().split("T")[1].split(".")[0] + "Z",
    closeBtn = true,
    iconPlumageStyle = false,
  }) {
    const variantClass = this.getColor(variant);
    const id = new Date().getTime();
    const content = customContent ? customContent : html`${message}`;
    const secondaryContent = secContent
      ? secContent
      : html`${secondaryMessage}`;
    const newToast = {
      id,
      content,
      secondaryContent,
      variantClass,
      duration,
      svgIcon,
      persistent,
      title,
      time,
      closeBtn,
      iconPlumageStyle,
    };

    this.toasts = this.appendToast
      ? [...this.toasts, newToast] // Append to the end
      : [newToast, ...this.toasts]; // Prepend to the beginning

    console.log("Toast added:", newToast);

    if (!persistent) {
      setTimeout(() => {
        console.log("Starting to remove toast id:", id);
        this.startRemoveToast(id);
      }, duration);
    }
  }

  startRemoveToast(id) {
    const toastIndex = this.toasts.findIndex((toast) => toast.id === id);
    if (toastIndex >= 0) {
      this.toasts[toastIndex].fadeOut = true;
      this.requestUpdate();
      setTimeout(() => this.removeToast(id), 500); // Delay to match fadeout animation
    }
  }

  removeToast(id) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
  }

  renderSvgIcons() {
    return svg`
      <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
        <symbol id="check-circle-fill" viewBox="0 0 22 22">
          <path
            d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
          />
        </symbol>
        <symbol id="check-circle-outline" viewBox="0 0 22 22">
          <path
            d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z"
          />
        </symbol>
        <symbol id="info-fill" viewBox="0 0 22 22">
          <path
            d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
          />
        </symbol>
        <symbol id="info-outlined" viewBox="0 0 22 22">
          <path
            d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
          />
        </symbol>
        <symbol id="exclamation-triangle-fill" viewBox="0 0 22 22">
          <path d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z" />
        </symbol>
        <symbol id="exclamation-triangle-outline" viewBox="0 0 22 22">
          <path
            d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"
          />
        </symbol>
        <symbol id="exclamation-circle-fill" viewBox="0 0 22 22">
          <path
            d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
          />
        </symbol>
        <symbol id="exclamation-circle-outline" viewBox="0 0 22 22">
          <path
            d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"
          />
        </symbol>
      </svg>
    `;
  }

  getColor(variant) {
    switch (variant) {
      case "primary":
        return "primary";
      case "secondary":
        return "secondary";
      case "success":
        return "success";
      case "danger":
        return "danger";
      case "info":
        return "info";
      case "warning":
        return "warning";
      case "dark":
        return "dark";
      case "light":
        return "light";
      default:
        return ""; // Default color if no variant or unrecognized variant
    }
  }

  getIconColor(variant) {
    switch (variant) {
      case "primary":
        return "#2680eb";
      case "secondary":
        return "#8e8e8e";
      case "success":
        return "#2d9d78";
      case "danger":
        return "#e34850";
      case "info":
        return "#5c9be6";
      case "warning":
        return "#e68619";
      case "dark":
        return "#383838";
      case "light":
        return "#eaeaea";
      default:
        return "currentColor"; // Default color if no variant or unrecognized variant
    }
  }

  renderToast() {
    return html`
      ${this.toasts.map(
        (toast) => html`
          <div
            id="${this.id}__toast_outer"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            class="toast toast-solid${toast.fadeOut
              ? " fade-out"
              : ""}${toast.persistent ? " persistent" : ""}${toast.variantClass
              ? " toast-" + toast.variantClass
              : ""}"
            style=" --toast-duration: ${toast.duration / 1000}s;"
          >
            <div
              id="${this.id}"
              tabindex="0"
              @keydown="${(e) => this.handleKeydown(e, toast.id)}"
            >
              <header class="toast-header">
                <div class="d-flex flex-grow-1 align-items-center">
                  <svg
                    class="toast-svg flex-shrink-0 me-2"
                    role="img"
                    aria-label="Icon"
                    style="fill: currentColor"
                  >
                    <use href="#${toast.svgIcon}"></use>
                  </svg>
                  <strong class="mr-auto">${toast.title}</strong>
                  <small class="text-muted mr-2"
                    >${toast.secondaryContent}</small
                  >
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  class="close ml-auto m1"
                  @click="${() => this.startRemoveToast(toast.id)}"
                >
                  ×
                </button>
              </header>
              <div class="toast-body">${toast.content}</div>
            </div>
          </div>
        `
      )}
    `;
  }

  renderSolidToast() {
    return html`
      ${this.toasts.map(
        (toast) => html`
          <div
            class="toast align-items-center border-0${toast.fadeOut
              ? " fade-out"
              : ""}${toast.persistent ? " persistent" : ""}${toast.variantClass
              ? " text-bg-" + toast.variantClass
              : ""}"
            style=" --toast-duration: ${toast.duration / 1000}s;"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div class="d-flex">
              <div class="toast-body d-flex align-items-center">
                <svg
                  class="toast-svg flex-shrink-0 me-2"
                  role="img"
                  aria-label="Icon"
                  style="fill: currentColor"
                >
                  <use href="#${toast.svgIcon}"></use>
                </svg>
                ${toast.content}
              </div>
              <button
                type="button"
                aria-label="Close"
                class="close mr-2 ml-auto"
                @click="${() => this.startRemoveToast(toast.id)}"
              >
                ×
              </button>
            </div>
          </div>
        `
      )}
    `;
  }

  renderPlumageToast() {
    return html`
      ${this.toasts.map(
        (toast) => html`
          <div
            id="${this.id}__toast_outer"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            class="pl-toast${toast.fadeOut ? " fade-out" : ""}${toast.persistent
              ? " persistent"
              : ""}${toast.variantClass ? " toast-" + toast.variantClass : ""}"
            style=" --toast-duration: ${toast.duration / 1000}s;"
          >
            ${this.plumageTemplate2
              ? html`
                  <div class="pl-toast-2">
                    <div class="pl-toast-body">
                      <div title="" class="pl-toast-content d-flex">
                        <div class="align-self-center">
                          <div class="pl-toast-icon">
                            <svg
                              class="toast-svg flex-shrink-0 me-2"
                              role="img"
                              aria-label="Icon"
                              style="fill: ${this.getIconColor(
                                toast.variantClass
                              )}"
                            >
                              <use href="#${toast.svgIcon}"></use>
                            </svg>
                          </div>
                        </div>
                        <div class="toast-title w-100">
                          <div class="d-flex justify-content-between">
                            <div class="header">${toast.title}</div>
                            <div class="toast-buttons d-flex">
                              <button
                                type="button"
                                aria-label="Close this alert"
                                class="close ml-3"
                                @click="${() =>
                                  this.startRemoveToast(toast.id)}"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                          <div class="d-flex flex-column toast-data">
                            <slot name="custom-content">${toast.content}</slot>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                `
              : html`
                  <div
                    id="${this.id}"
                    tabindex="0"
                    class="${toast.iconPlumageStyle ? "pl-toast-display" : ""}"
                  >
                    ${toast.iconPlumageStyle
                      ? html` <div class="pl-toast-icon">
                            <svg
                              class="toast-svg flex-shrink-0 me-2"
                              role="img"
                              aria-label="Icon"
                              style="fill: ${this.getIconColor(
                                toast.variantClass
                              )}"
                            >
                              <use href="#${toast.svgIcon}"></use>
                            </svg>
                          </div>
                          <div class="pl-toast-content">
                            <header class="pl-toast-header">
                              <div
                                class="d-flex flex-grow-1 align-items-center"
                              >
                                <div class="mr-auto mb-0">${toast.title}</div>
                                <div>${toast.time}</div>
                              </div>
                              ${toast.closeBtn
                                ? html` <button
                                    type="button"
                                    aria-label="Close"
                                    class="close ml-3"
                                    @click="${() =>
                                      this.startRemoveToast(toast.id)}"
                                  >
                                    ×
                                  </button>`
                                : html``}
                            </header>
                            <div class="pl-toast-body">
                              <em>${toast.content}</em>
                            </div>
                          </div>`
                      : html`
                          <header class="pl-toast-header">
                            <div class="d-flex flex-grow-1 align-items-center">
                              <div class="mr-auto mb-0">${toast.title}</div>
                              <div>${toast.time}</div>
                            </div>
                            ${toast.closeBtn
                              ? html` <button
                                  type="button"
                                  aria-label="Close"
                                  class="close close ml-3 mr-1"
                                  @click="${() =>
                                    this.startRemoveToast(toast.id)}"
                                >
                                  ×
                                </button>`
                              : html``}
                          </header>
                          <div class="pl-toast-body">
                            <em>${toast.content}</em>
                          </div>
                        `}
                  </div>
                `}
          </div>
        `
      )}
    `;
  }

  handleKeydown(event, id) {
    if (event.key === "Escape") {
      this.startRemoveToast(id);
    }
  }

  render() {
    return html`
      ${this.renderSvgIcons()}
      <div
        id="toaster-${this.position}"
        class="${this.plumageToast ? "pl-toaster" : "toaster"} toaster-${this
          .position}"
      >
        <div class="toaster-slot">
          ${this.solidToast
            ? this.renderSolidToast()
            : this.plumageToast
            ? this.renderPlumageToast()
            : this.renderToast()}
        </div>
      </div>
    `;
  }
}

customElements.define("toast-component", ToastComponent);
