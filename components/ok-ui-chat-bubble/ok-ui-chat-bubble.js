import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-chat-bubble.css?inline';

@defineElement({ tag: 'ok-ui-chat-bubble', styles: [styles], props: [
  { author: { type: String, value: 'Alex' } },
  { text: { type: String, value: 'Hello there!' } },
  { time: { type: String, value: '10:42' } },
  { mine: { type: Boolean, value: false } },
] })
export class OkUiChatBubble extends Okalit {
  onAfterRender() {
    this.style.marginLeft = this.mine.value ? 'auto' : '';
  }

  render() {
    return html`<article class="${this.mine.value ? 'mine' : ''}"><span class="author">${this.author.value}</span><p>${this.text.value}</p><time>${this.time.value}</time></article>`;
  }
}