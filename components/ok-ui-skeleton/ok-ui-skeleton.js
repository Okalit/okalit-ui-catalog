import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-skeleton.css?inline';

@defineElement({ tag: 'ok-ui-skeleton', styles: [styles], props: [
  { variant: { type: String, value: 'text' } },
  { lines: { type: Number, value: 3 } },
  { width: { type: Number, value: 0 } },
  { height: { type: Number, value: 120 } },
  { label: { type: String, value: 'Cargando contenido' } },
] })
export class OkUiSkeleton extends Okalit {
  render() {
    const variant = ['text', 'circle', 'rect'].includes(this.variant.value) ? this.variant.value : 'text';
    const width = Math.max(0, Math.min(Number(this.width.value) || 0, 1200));
    const height = Math.max(12, Math.min(Number(this.height.value) || 120, 800));
    const size = width ? `width:${width}px;` : '';
    const style = variant === 'text' ? undefined
      : variant === 'circle' ? `width:${width || height}px;height:${width || height}px`
        : `width:${width ? `${width}px` : '100%'};height:${height}px`;
    const lines = Math.max(1, Math.min(12, Number(this.lines.value) || 3));
    return variant === 'text'
      ? html`<div class="text" role="status" aria-label="${this.label.value}">${Array.from({ length: lines }, (_, index) => html`<span class="line line-${index}" aria-hidden="true"></span>`)}</div>`
      : html`<div class="shape ${variant}" style="${style}" role="status" aria-label="${this.label.value}"></div>`;
  }
}