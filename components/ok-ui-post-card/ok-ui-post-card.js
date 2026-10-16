import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-post-card.css?inline';

@defineElement({ tag: 'ok-ui-post-card', styles: [styles], props: [
  { author: { type: String, value: 'Alex Rivera' } },
  { handle: { type: String, value: '@alex' } },
  { date: { type: String, value: 'Ahora' } },
  { text: { type: String, value: '' } },
  { image: { type: String, value: '' } },
  { likes: { type: Number, value: 0 } },
  { replies: { type: Number, value: 0 } },
  { liked: { type: Boolean, value: false } },
] })
export class OkUiPostCard extends Okalit {
  toggleLike() {
    this.liked.value = !this.liked.value;
    this.likes.value = Math.max(0, this.likes.value + (this.liked.value ? 1 : -1));
    this.output('ui-like', { liked: this.liked.value, likes: this.likes.value });
  }

  render() {
    const initials = this.author.value.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() || '').join('');
    return html`<article><header><span class="avatar" aria-hidden="true">${initials}</span><div><strong>${this.author.value}</strong><span>${this.handle.value} · ${this.date.value}</span></div></header><p>${this.text.value}</p>${this.image.value ? html`<img src="${this.image.value}" alt="Imagen compartida por ${this.author.value}" loading="lazy" />` : ''}<div class="actions"><button type="button" aria-label="${this.liked.value ? 'Quitar me gusta' : 'Me gusta'}" aria-pressed="${this.liked.value}" @click=${() => this.toggleLike()}>${this.liked.value ? '♥' : '♡'} <span>${this.likes.value}</span></button><button type="button" aria-label="Responder" @click=${() => this.output('ui-reply')}>↩ <span>${this.replies.value}</span></button><slot name="actions"></slot></div></article>`;
  }
}