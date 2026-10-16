import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-card.css?inline';

@defineElement({ tag: 'ok-ui-card', styles: [styles], props: [
  { variant: { type: String, value: 'bordered' } },
] })
export class OkUiCard extends Okalit {
  render() {
    return html`<article class="${this.variant.value}"><div class="media"><slot name="media"></slot></div><div class="body"><slot name="eyebrow"></slot><div class="title"><slot name="title"></slot></div><div class="content"><slot></slot></div><footer><slot name="footer"></slot></footer></div></article>`;
  }
}