import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-button.css?inline';

@defineElement({
  tag: 'ok-ui-button',
  styles: [styles],
  props: [
    { variant: { type: String, value: 'primary' } },
    { size: { type: String, value: 'md' } },
    { disabled: { type: Boolean, value: false } },
    { loading: { type: Boolean, value: false } },
  ],
})
export class OkUiButton extends Okalit {
  click() {
    if (this.disabled.value || this.loading.value) return;
    this.output('ui-click')
  }

  render() {
    return html`
      <button
        type="button"
        class="${this.variant.value} ${this.size.value}"
        ?disabled=${this.disabled.value || this.loading.value}
        aria-busy="${this.loading.value}"
        @click="${this.click}"
      >
        <slot></slot>
      </button>`;
  }
}