import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-toggle-button.css?inline';

@defineElement({
  tag: 'ok-ui-toggle-button',
  styles: [styles],
  props: {
    pressed: { type: Boolean, value: false },
    storage: { type: String, value: '' },
    disabled: { type: Boolean, value: false },
  },
})
export class OkUiToggleButton extends Okalit {
  onInit() {
    const stored = this.readStored();
    if (stored !== null) this.pressed.value = stored;
  }

  readStored() {
    const key = this.storage.value;
    if (!key) return null;
    try {
      const value = localStorage.getItem(key);
      return value === null ? null : value === 'true';
    } catch {
      // localStorage puede no estar disponible (modo privado, permisos).
      return null;
    }
  }

  writeStored(pressed) {
    const key = this.storage.value;
    if (!key) return;
    try {
      localStorage.setItem(key, String(pressed));
    } catch {
      // Si no se puede guardar, el estado sigue funcionando solo en memoria.
    }
  }

  toggle() {
    if (this.disabled.value) return;
    this.pressed.value = !this.pressed.value;
    this.writeStored(this.pressed.value);
    this.output('ui-change', { name: this.storage.value, pressed: this.pressed.value });
  }

  render() {
    const pressed = this.pressed.value;
    return html`<button
      part="button"
      type="button"
      class="${pressed ? 'pressed' : ''}"
      aria-pressed="${String(pressed)}"
      ?disabled=${this.disabled.value}
      @click="${this.toggle}"
    >
      <svg
        class="icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="${pressed ? 'currentColor' : 'none'}"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z" />
      </svg>
      <span><slot>Favorito</slot></span>
    </button>`;
  }
}
