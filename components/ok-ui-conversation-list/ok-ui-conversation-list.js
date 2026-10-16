import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-conversation-list.css?inline';

@defineElement({ tag: 'ok-ui-conversation-list', styles: [styles], props: [
  { conversations: { type: Array, value: [] } },
  { active: { type: String, value: '' } },
  { label: { type: String, value: 'Conversaciones' } },
] })
export class OkUiConversationList extends Okalit {
  choose(id) {
    this.active.value = String(id);
    this.output('ui-select', { id: String(id), active: String(id) });
  }

  render() {
    return html`<section aria-label="${this.label.value}">${this.conversations.value.length ? html`<ul>${this.conversations.value.map((conversation) => html`<li><button type="button" class="${String(conversation.id) === this.active.value ? 'active' : ''}" aria-current="${String(conversation.id) === this.active.value ? 'true' : undefined}" @click=${() => this.choose(conversation.id)}><span class="avatar" aria-hidden="true">${String(conversation.name || '?').trim().charAt(0).toUpperCase()}</span><span class="content"><strong>${conversation.name}</strong><span class="preview">${conversation.preview || ''}</span></span><span class="aside"><time>${conversation.time || ''}</time>${conversation.unread ? html`<span class="unread" aria-label="${conversation.unread} sin leer">${conversation.unread}</span>` : ''}</span></button></li>`)}</ul>` : html`<p class="empty">No hay conversaciones</p>`}</section>`;
  }
}