import { defineElement, html, Okalit } from '@okalit/core';
import { nothing } from 'lit';
import styles from './ok-ui-button.css?inline';

@defineElement({
  tag: 'ok-ui-button',
  styles: [styles],
  props: {
    variant: { type: String, value: 'primary' },
    size: { type: String, value: 'md' },
    disabled: { type: Boolean, value: false },
    loading: { type: Boolean, value: false },
    toggle: { type: Boolean, value: false },
    pressed: { type: Boolean, value: false },
    iconOnly: { type: Boolean, value: false },
    ariaLabel: { type: String, value: '' },
    className: { type: String, value: '' },
  },
})
export class OkUiButton extends Okalit {
  click() {
    if (this.disabled.value || this.loading.value) return;
    this.output('ui-click');
  }

  render() {
    return html`
      <button
        part="button"
        type="button"
        class="${this.variant.value} ${this.size.value} ${this.className.value} ${this.iconOnly.value ? 'icon-only' : ''}"
        ?disabled=${this.disabled.value || this.loading.value}
        aria-busy="${this.loading.value}"
        aria-pressed=${this.toggle.value ? String(this.pressed.value) : nothing}
        aria-label=${this.ariaLabel.value || nothing}
        title=${this.ariaLabel.value || nothing}
        @click="${this.click}"
      >
        <slot></slot>
      </button>`;
  }
}
