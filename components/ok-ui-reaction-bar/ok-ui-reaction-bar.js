import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-reaction-bar.css?inline';

@defineElement({ tag: 'ok-ui-reaction-bar', styles: [styles], props: [
  { reactions: { type: Array, value: [] } },
  { selected: { type: String, value: '' } },
] })
export class OkUiReactionBar extends Okalit {
  react(emoji) {
    const previous = this.selected.value;
    const nextSelected = previous === emoji ? '' : emoji;
    const next = this.reactions.value.map((reaction) => ({
      ...reaction,
      count: Math.max(0, Number(reaction.count || 0) + (reaction.emoji === previous ? -1 : 0) + (reaction.emoji === nextSelected ? 1 : 0)),
    }));
    this.selected.value = nextSelected;
    this.reactions.value = next;
    this.output('ui-change', { selected: nextSelected, reactions: next });
  }

  render() {
    return html`<div role="group" aria-label="Reacciones">${this.reactions.value.map((reaction) => html`<button type="button" aria-label="${reaction.label || reaction.emoji}, ${reaction.count || 0}" aria-pressed="${this.selected.value === reaction.emoji}" @click=${() => this.react(reaction.emoji)}><span aria-hidden="true">${reaction.emoji}</span><small>${reaction.count || 0}</small></button>`)}</div>`;
  }
}