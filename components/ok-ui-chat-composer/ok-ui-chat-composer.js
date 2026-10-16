import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-chat-composer.css?inline';

@defineElement({ tag: 'ok-ui-chat-composer', styles: [styles], props: [
  { placeholder: { type: String, value: 'Escribe un mensaje...' } },
  { accept: { type: String, value: 'image/*' } },
  { maxFiles: { type: Number, value: 4 } },
  { disabled: { type: Boolean, value: false } },
] })
export class OkUiChatComposer extends Okalit {
  constructor() {
    super();
    this._draft = '';
    this._files = [];
  }

  attach(event) {
    const selected = Array.from(event.target.files || []);
    const limit = Math.max(1, this.maxFiles.value || 4);
    this._files = selected.slice(0, limit);
    if (selected.length > limit) {
      this.output('ui-error', { reason: 'files-limit', maxFiles: limit });
    }
    this.requestUpdate();
  }

  send(event) {
    event.preventDefault();
    const text = this._draft.trim();
    if (!text && !this._files.length) {
      this.renderRoot.querySelector('textarea')?.focus();
      return;
    }
    this.output('ui-send', { text, files: [...this._files] });
    this._draft = '';
    this._files = [];
    this.renderRoot.querySelector('textarea').value = '';
    this.renderRoot.querySelector('input[type="file"]').value = '';
    this.requestUpdate();
  }

  keydown(event) {
    if (event.key !== 'Enter' || event.shiftKey || event.isComposing) return;
    event.preventDefault();
    event.currentTarget.form.requestSubmit();
  }

  render() {
    return html`<form @submit=${(event) => this.send(event)}>${this._files.length ? html`<div class="attachments">${this._files.map((file) => html`<span>${file.name}</span>`)}</div>` : ''}<div class="controls"><label class="attach" title="Adjuntar archivo"><input type="file" aria-label="Adjuntar archivo" accept="${this.accept.value || undefined}" multiple ?disabled=${this.disabled.value} @change=${(event) => this.attach(event)} /><span aria-hidden="true">+</span></label><textarea rows="1" aria-label="Mensaje" placeholder="${this.placeholder.value}" .value=${this._draft} ?disabled=${this.disabled.value} @input=${(event) => { this._draft = event.target.value; }} @keydown=${(event) => this.keydown(event)}></textarea><button type="submit" title="Enviar mensaje" aria-label="Enviar mensaje" ?disabled=${this.disabled.value}>↑</button></div></form>`;
  }
}