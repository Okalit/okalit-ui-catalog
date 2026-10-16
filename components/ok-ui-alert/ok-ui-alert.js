import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-alert.css?inline';

@defineElement({ tag: 'ok-ui-alert', styles: [styles], props: [
  { tone: { type: String, value: 'info' } },
  { title: { type: String, value: '' } },
  { dismissible: { type: Boolean, value: false } },
] })
export class OkUiAlert extends Okalit {
  constructor() {
    super();
    this._dismissed = false;
  }

  dismiss() {
    this._dismissed = true;
    this.requestUpdate();
    this.output('ui-dismiss');
  }

  render() {
    if (this._dismissed) return html``;
    const tone = ['info', 'success', 'danger'].includes(this.tone.value) ? this.tone.value : 'info';
    return html`<div class="${tone}" role="${tone === 'danger' ? 'alert' : 'status'}"><div class="content">${this.title.value ? html`<strong>${this.title.value}</strong>` : ''}<slot></slot></div>${this.dismissible.value ? html`<button type="button" aria-label="Cerrar aviso" @click=${() => this.dismiss()}>×</button>` : ''}</div>`;
  }
}