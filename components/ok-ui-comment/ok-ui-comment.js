import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-comment.css?inline';

@defineElement({ tag: 'ok-ui-comment', styles: [styles], props: [
  { author: { type: String, value: 'Sam' } },
  { text: { type: String, value: '' } },
  { time: { type: String, value: 'Ahora' } },
  { likes: { type: Number, value: 0 } },
  { liked: { type: Boolean, value: false } },
] })
export class OkUiComment extends Okalit {
  like() {
    this.liked.value = !this.liked.value;
    this.likes.value = Math.max(0, this.likes.value + (this.liked.value ? 1 : -1));
    this.output('ui-like', { liked: this.liked.value, likes: this.likes.value });
  }

  render() {
    return html`<article><span class="avatar" aria-hidden="true">${this.author.value.trim().charAt(0).toUpperCase()}</span><div class="body"><div class="meta"><strong>${this.author.value}</strong><time>${this.time.value}</time></div><p>${this.text.value}</p><div class="actions"><button type="button" aria-pressed="${this.liked.value}" @click=${() => this.like()}>${this.liked.value ? '♥' : '♡'} ${this.likes.value}</button><button type="button" @click=${() => this.output('ui-reply')}>Responder</button></div></div></article>`;
  }
}