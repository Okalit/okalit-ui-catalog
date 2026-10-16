import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-media-preview.css?inline';

@defineElement({ tag: 'ok-ui-media-preview', styles: [styles], props: [
  { src: { type: String, value: '' } },
  { type: { type: String, value: 'image' } },
  { alt: { type: String, value: '' } },
  { poster: { type: String, value: '' } },
  { caption: { type: String, value: '' } },
  { ratio: { type: String, value: '16/9' } },
  { controls: { type: Boolean, value: true } },
  { muted: { type: Boolean, value: false } },
  { loop: { type: Boolean, value: false } },
] })
export class OkUiMediaPreview extends Okalit {
  render() {
    const ratios = { '1/1': 'square', '4/3': 'classic', '3/2': 'landscape', '16/9': 'wide', '9/16': 'portrait' };
    const ratio = ratios[this.ratio.value] || 'wide';
    const type = ['image', 'video'].includes(this.type.value) ? this.type.value : 'image';
    const media = !this.src.value
      ? html`<div class="empty" role="status">Sin contenido para mostrar</div>`
      : type === 'video'
        ? html`<video src="${this.src.value}" poster="${this.poster.value || undefined}" aria-label="${this.alt.value || this.caption.value || 'Vista previa de video'}" ?controls=${this.controls.value} ?muted=${this.muted.value} ?loop=${this.loop.value} playsinline></video>`
        : html`<img src="${this.src.value}" alt="${this.alt.value}" loading="lazy" />`;
    return html`<figure><div class="frame ${ratio} ${type}">${media}</div>${this.caption.value ? html`<figcaption>${this.caption.value}</figcaption>` : ''}</figure>`;
  }
}