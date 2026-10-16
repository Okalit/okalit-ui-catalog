import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-tabs.css?inline';

@defineElement({ tag: 'ok-ui-tabs', styles: [styles], props: [
  { options: { type: Array, value: ['Chat', 'Posts', 'Files'] } },
  { selected: { type: String, value: 'Chat' } },
] })
export class OkUiTabs extends Okalit {
  select(option) {
    this.selected.value = option;
    this.output('ui-change', { value: option, selected: option });
  }

  keydown(event, index) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const options = this.options.value;
    const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + options.length) % options.length;
    this.select(options[next]);
    this.renderRoot.querySelectorAll('button')[next]?.focus();
  }

  render() {
    return html`<div role="tablist" aria-label="Views">${this.options.value.map((option, index) => html`<button type="button" role="tab" aria-selected="${option === this.selected.value}" tabindex="${option === this.selected.value ? 0 : -1}" @click=${() => this.select(option)} @keydown=${(event) => this.keydown(event, index)}>${option}</button>`)}</div>`;
  }
}