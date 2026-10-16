import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-drawer.css?inline';

@defineElement({ tag: 'ok-ui-drawer', styles: [styles], props: [
  { open: { type: Boolean, value: false } },
  { title: { type: String, value: 'Filtros' } },
  { side: { type: String, value: 'right' } },
] })
export class OkUiDrawer extends Okalit {
  onAfterRender() {
    const dialog = this.renderRoot.querySelector('dialog');
    if (this.open.value && !dialog.open) dialog.showModal();
    else if (!this.open.value && dialog.open) dialog.close();
  }

  onDestroy() {
    this.renderRoot.querySelector('dialog')?.close();
  }

  close() {
    if (!this.open.value) return;
    this.open.value = false;
    this.output('ui-close', { open: false });
  }

  render() {
    return html`<button class="trigger" type="button" ?hidden=${this.open.value} @click=${() => { this.open.value = true; }}><slot name="trigger">Abrir panel</slot></button><dialog class="${this.side.value === 'left' ? 'left' : 'right'}" @cancel=${(event) => { event.preventDefault(); this.close(); }} @keydown=${(event) => { if (event.key === 'Escape') { event.preventDefault(); this.close(); } }} @close=${() => { if (this.open.value) this.close(); }} @click=${(event) => { if (event.target === event.currentTarget) this.close(); }}><div class="panel"><header><h2>${this.title.value}</h2><button type="button" title="Cerrar panel" aria-label="Cerrar panel" @click=${() => this.close()}>×</button></header><div class="body"><slot></slot></div><footer><slot name="actions"></slot></footer></div></dialog>`;
  }
}