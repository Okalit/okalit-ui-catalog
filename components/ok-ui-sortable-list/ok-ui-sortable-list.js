import { defineElement, html, Okalit } from '@okalit/core';
import { keyed } from 'lit/directives/keyed.js';
import Sortable from 'sortablejs';
import styles from './ok-ui-sortable-list.css?inline';

@defineElement({ tag: 'ok-ui-sortable-list', styles: [styles], props: [
  { items: { type: Array, value: [] } },
  { label: { type: String, value: 'Lista ordenable' } },
  { itemKey: { type: String, value: 'id' } },
  { disabled: { type: Boolean, value: false } },
] })
export class OkUiSortableList extends Okalit {
  constructor() {
    super();
    this._revision = 0;
  }

  onAfterRender() {
    this._sortable?.destroy();
    const list = this.renderRoot.querySelector('.items');
    this._sortable = new Sortable(list, {
      animation: 150,
      handle: '.grip',
      draggable: '.item',
      ghostClass: 'dragging',
      delayOnTouchOnly: true,
      delay: 160,
      touchStartThreshold: 4,
      disabled: this.disabled.value,
      onEnd: (event) => {
        const siblings = [...list.children].filter((child) => child !== event.item);
        list.insertBefore(event.item, siblings[event.oldIndex] || null);
        this.move(event.oldIndex, event.newIndex);
      },
    });
    if (this._pendingFocus !== undefined) {
      list.querySelectorAll('.grip')[this._pendingFocus]?.focus({ preventScroll: true });
      this._pendingFocus = undefined;
    }
  }

  onDestroy() {
    this._sortable?.destroy();
    this._sortable = null;
  }

  move(fromIndex, toIndex) {
    const items = [...this.items.value];
    if (fromIndex < 0 || fromIndex >= items.length || toIndex < 0 || toIndex >= items.length || fromIndex === toIndex) return;
    const [item] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, item);
    this._revision++;
    this.items.value = items;
    this.output('ui-move', { id: String(item?.[this.itemKey.value] ?? fromIndex), fromIndex, toIndex, items });
  }

  keydown(event, index) {
    const last = this.items.value.length - 1;
    const target = event.key === 'ArrowUp' ? Math.max(0, index - 1)
      : event.key === 'ArrowDown' ? Math.min(last, index + 1)
        : event.key === 'Home' ? 0 : event.key === 'End' ? last : index;
    if (target === index && !['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (target === index) return;
    this._pendingFocus = target;
    this.move(index, target);
  }

  render() {
    const items = Array.isArray(this.items.value) ? this.items.value : [];
    return html`<section>${keyed(this._revision, html`<ol class="items" aria-label="${this.label.value}">${items.map((item, index) => html`<li class="item" data-id="${String(item?.[this.itemKey.value] ?? index)}"><button class="grip" type="button" title="Arrastrar o usar flechas" aria-label="Mover ${item?.label ?? `elemento ${index + 1}`}" ?disabled=${this.disabled.value} @keydown=${(event) => this.keydown(event, index)}>↕</button><div class="body"><strong>${item?.label ?? ''}</strong>${item?.description ? html`<small>${item.description}</small>` : ''}</div><span class="number">${index + 1}</span></li>`)}</ol>`)}${!items.length ? html`<p class="empty">No hay elementos</p>` : ''}<span class="sr-only" aria-live="polite">${this.label.value}: ${items.length} elementos</span></section>`;
  }
}