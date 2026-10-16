import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-loading.css?inline';

@defineElement({ tag: 'ok-ui-loading', styles: [styles], props: [
  { label: { type: String, value: 'Cargando' } },
  { variant: { type: String, value: 'spinner' } },
] })
export class OkUiLoading extends Okalit {
  render() {
    return this.variant.value === 'skeleton'
      ? html`<div class="skeleton" role="status" aria-label="${this.label.value}"><span></span><span></span><span></span></div>`
      : html`<div class="spinner" role="status" aria-label="${this.label.value}"><span aria-hidden="true"></span><slot>${this.label.value}</slot></div>`;
  }
}