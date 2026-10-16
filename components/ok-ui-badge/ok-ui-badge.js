import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-badge.css?inline';

@defineElement({ tag: 'ok-ui-badge', styles: [styles], props: [
  { tone: { type: String, value: 'neutral' } },
] })
export class OkUiBadge extends Okalit {
  render() {
    return html`<span class="${this.tone.value}"><slot></slot></span>`;
  }
}