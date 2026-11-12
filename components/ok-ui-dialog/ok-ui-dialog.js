import { defineElement, html, Okalit, t } from '@okalit/core';
import styles from './ok-ui-dialog.css?inline';

@defineElement({
  tag: 'ok-ui-dialog',
  styles: [styles],
  props: [{ open: { type: Boolean, value: false } }, { title: { type: String, value: '' } }],
})
export class OkUiDialog extends Okalit {
  onAfterRender() {
    const dialog = this.renderRoot?.querySelector('dialog');

    if (!this.isConnected || !dialog?.isConnected) return;

    if (this.open.value && !dialog.open) {
      dialog.showModal();
    } else if (!this.open.value && dialog.open) {
      dialog.close();
    }
  }

  close() {
    this.open.value = false;
    this.output('ui-close');
  }

  render() {
    return html`<button class="trigger" type="button" ?hidden=${this.open.value} @click=${() => {
      this.open.value = true;
    }}><slot name="trigger">${t('catalog.openDialog')}</slot></button><dialog @close=${() => {
      if (this.open.value) this.close();
    }} @click=${(event) => {
      if (event.target === event.currentTarget) this.close();
    }}><div class="panel"><header><h2>${this.title.value || t('catalog.confirmAction')}</h2><button type="button" aria-label=${t('catalog.closeDialog')} title=${t('catalog.closeDialog')} @click=${() => this.close()}>×</button></header><div class="content"><slot></slot></div><footer><slot name="actions"></slot></footer></div></dialog>`;
  }
}
