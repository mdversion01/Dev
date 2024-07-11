import { LitElement, html, css } from 'lit';

class ToastComponent extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 1000;
    }
    
    :host([position="top-left"]) {
      top: 20px;
      left: 20px;
    }

    :host([position="top-right"]) {
      top: 20px;
      right: 20px;
    }

    :host([position="bottom-left"]) {
      bottom: 20px;
      left: 20px;
    }

    :host([position="bottom-right"]) {
      bottom: 20px;
      right: 20px;
    }

    .toast {
      display: flex;
      align-items: center;
      background-color: var(--toast-background-color, #333);
      color: var(--toast-color, white);
      padding: 16px;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      animation: fadein 0.5s, fadeout 0.5s var(--toast-duration, 2.5s);
    }

    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes fadeout {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `;

  static properties = {
    position: { type: String, reflect: true },
    duration: { type: Number },
    toasts: { type: Array },
  };

  constructor() {
    super();
    this.position = 'bottom-right';
    this.duration = 3000;
    this.toasts = [];
  }

  showToast({ message, color = '#333', textColor = 'white', duration = this.duration, customContent = null }) {
    const id = new Date().getTime();
    const content = customContent ? customContent : html`${message}`;
    this.toasts = [
      ...this.toasts,
      { id, content, color, textColor, duration }
    ];
    setTimeout(() => {
      this.removeToast(id);
    }, duration);
  }

  removeToast(id) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  }

  render() {
    return html`
      ${this.toasts.map(toast => html`
        <div 
          class="toast" 
          style="--toast-background-color: ${toast.color}; --toast-color: ${toast.textColor}; --toast-duration: ${toast.duration / 1000}s;"
          role="status" aria-live="polite">
          ${toast.content}
        </div>
      `)}
    `;
  }
}

customElements.define('toast-component', ToastComponent);
