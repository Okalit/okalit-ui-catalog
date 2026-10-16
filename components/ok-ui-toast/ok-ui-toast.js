import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-toast.css?inline';

@defineElement({ tag: 'ok-ui-toast', styles: [styles], props: [
  { open: { type: Boolean, value: false } },
  { tone: { type: String, value: 'info' } },
  { duration: { type: Number, value: 4500 } },
] })
export class OkUiToast extends Okalit {
  onInit() {
    this.schedule();
  }

  onChange(changes) {
    if (changes.open || changes.duration) this.schedule();
  }

  onDestroy() {
    clearTimeout(this._timer);
  }

  schedule() {
    clearTimeout(this._timer);
    if (this.open.value && this.duration.value > 0) {
      this._timer = setTimeout(() => this.close(), this.duration.value);
    }
  }

  close() {
    if (!this.open.value) return;
    this.open.value = false;
    this.output('ui-close', { open: false });
  }

  render() {
    if (!this.open.value) return html``;
    const tone = ['info', 'success', 'danger'].includes(this.tone.value) ? this.tone.value : 'info';
    return html`<div class="toast ${tone}" role="${tone === 'danger' ? 'alert' : 'status'}"><span><slot></slot></span><button type="button" aria-label="Cerrar notificacion" @click=${() => this.close()}>×</button></div>`;
  }
}