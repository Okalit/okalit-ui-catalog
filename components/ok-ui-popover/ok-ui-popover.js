import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-popover.css?inline';

@defineElement({ tag: 'ok-ui-popover', styles: [styles], props: [
  { label: { type: String, value: 'Opciones' } },
  { placement: { type: String, value: 'bottom' } },
  { open: { type: Boolean, value: false } },
] })
export class OkUiPopover extends Okalit {
  constructor() {
    super();
    this._listeningOutside = false;
    this._onOutsideClick = (event) => {
      if (!event.composedPath().includes(this)) this.close();
    };
  }

  onAfterRender() {
    if (this.open.value && !this._listeningOutside) {
      document.addEventListener('click', this._onOutsideClick);
      this._listeningOutside = true;
    } else if (!this.open.value && this._listeningOutside) {
      document.removeEventListener('click', this._onOutsideClick);
      this._listeningOutside = false;
    }
  }

  onDestroy() {
    document.removeEventListener('click', this._onOutsideClick);
    this._listeningOutside = false;
  }

  close() {
    if (!this.open.value) return;
    this.open.value = false;
    this.output('ui-close');
  }

  keydown(event) {
    if (event.key === 'Escape' && this.open.value) {
      this.close();
      this.renderRoot.querySelector('button')?.focus();
    }
  }

  render() {
    const placement = this.placement.value === 'top' ? 'top' : 'bottom';
    return html`<div class="anchor ${placement}" @keydown=${(event) => this.keydown(event)}><button type="button" aria-haspopup="true" aria-expanded="${this.open.value}" aria-controls="popover-panel" @click=${() => { this.open.value = !this.open.value; }}><slot name="trigger">${this.label.value}</slot></button><div id="popover-panel" class="panel" role="region" aria-label="${this.label.value}" ?hidden=${!this.open.value}><slot></slot></div></div>`;
  }
}