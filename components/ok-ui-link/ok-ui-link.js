import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-link.css?inline';

@defineElement({ tag: 'ok-ui-link', styles: [styles], props: [
  { href: { type: String, value: '#' } },
  { variant: { type: String, value: 'inline' } },
  { external: { type: Boolean, value: false } },
] })
export class OkUiLink extends Okalit {
  render() {
    const href = /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(this.href.value) ? this.href.value : '#';
    return html`<a href="${href}" class="${this.variant.value}" target="${this.external.value ? '_blank' : undefined}" rel="${this.external.value ? 'noopener noreferrer' : undefined}"><slot></slot></a>`;
  }
}