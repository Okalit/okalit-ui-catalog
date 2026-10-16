import { defineElement, html, Okalit } from '@okalit/core';
import { keyed } from 'lit/directives/keyed.js';
import Sortable from 'sortablejs';
import styles from './ok-ui-kanban-board.css?inline';

let boardCounter = 0;

@defineElement({ tag: 'ok-ui-kanban-board', styles: [styles], props: [
  { columns: { type: Array, value: [] } },
  { label: { type: String, value: 'Tablero de tareas' } },
  { disabled: { type: Boolean, value: false } },
] })
export class OkUiKanbanBoard extends Okalit {
  constructor() {
    super();
    this._group = `ok-ui-kanban-${++boardCounter}`;
    this._sortables = [];
    this._announcement = '';
    this._revision = 0;
  }

  onAfterRender() {
    this._sortables.forEach((sortable) => sortable.destroy());
    this._sortables = [...this.renderRoot.querySelectorAll('.tasks')].map((list) => new Sortable(list, {
      group: this._group,
      animation: 150,
      handle: '.grip',
      draggable: '.task',
      ghostClass: 'dragging',
      delayOnTouchOnly: true,
      delay: 160,
      touchStartThreshold: 4,
      disabled: this.disabled.value,
      onEnd: (event) => {
        const fromColumn = event.from.closest('[data-column-id]')?.dataset.columnId;
        const toColumn = event.to.closest('[data-column-id]')?.dataset.columnId;
        const siblings = [...event.from.children].filter((child) => child !== event.item);
        event.from.insertBefore(event.item, siblings[event.oldIndex] || null);
        this.move(fromColumn, toColumn, event.oldIndex, event.newIndex);
      },
    }));
    if (this._pendingFocus) {
      const { columnIndex, itemIndex } = this._pendingFocus;
      this.renderRoot.querySelectorAll('.column')[columnIndex]?.querySelectorAll('.grip')[itemIndex]?.focus({ preventScroll: true });
      this._pendingFocus = null;
    }
  }

  onDestroy() {
    this._sortables.forEach((sortable) => sortable.destroy());
    this._sortables = [];
  }

  move(fromColumn, toColumn, fromIndex, toIndex) {
    const columns = this.columns.value.map((column) => ({ ...column, items: [...(column.items || [])] }));
    const source = columns.find((column) => String(column.id) === String(fromColumn));
    const target = columns.find((column) => String(column.id) === String(toColumn));
    if (!source || !target || fromIndex < 0 || fromIndex >= source.items.length) return;
    const index = Math.max(0, Math.min(toIndex, target.items.length - Number(source === target)));
    if (source === target && fromIndex === index) return;
    const [item] = source.items.splice(fromIndex, 1);
    target.items.splice(index, 0, item);
    this._revision++;
    this.columns.value = columns;
    this._announcement = `${item.title} movida a ${target.title}, posicion ${index + 1}`;
    this.output('ui-move', { id: String(item.id), fromColumn: String(fromColumn), toColumn: String(toColumn), fromIndex, toIndex: index, columns });
  }

  keydown(event, columnIndex, itemIndex) {
    const columns = this.columns.value;
    const column = columns[columnIndex];
    let targetColumnIndex = columnIndex;
    let targetIndex = itemIndex;
    if (event.key === 'ArrowUp') targetIndex = Math.max(0, itemIndex - 1);
    else if (event.key === 'ArrowDown') targetIndex = Math.min(column.items.length - 1, itemIndex + 1);
    else if (event.key === 'Home') targetIndex = 0;
    else if (event.key === 'End') targetIndex = column.items.length - 1;
    else if (event.key === 'ArrowLeft') targetColumnIndex = Math.max(0, columnIndex - 1);
    else if (event.key === 'ArrowRight') targetColumnIndex = Math.min(columns.length - 1, columnIndex + 1);
    else return;
    event.preventDefault();
    if (targetColumnIndex !== columnIndex) targetIndex = Math.min(itemIndex, columns[targetColumnIndex].items.length);
    if (targetColumnIndex === columnIndex && targetIndex === itemIndex) return;
    this._pendingFocus = { columnIndex: targetColumnIndex, itemIndex: targetIndex };
    this.move(column.id, columns[targetColumnIndex].id, itemIndex, targetIndex);
  }

  render() {
    const columns = Array.isArray(this.columns.value) ? this.columns.value : [];
    return html`<section class="board" aria-label="${this.label.value}">${keyed(this._revision, html`<div class="columns">${columns.map((column, columnIndex) => html`<section class="column" data-column-id="${column.id}" aria-label="${column.title}"><header><h2>${column.title}</h2><span>${column.items?.length || 0}</span></header><ol class="tasks" aria-label="${column.title}">${(column.items || []).map((item, itemIndex) => html`<li class="task" data-id="${item.id}"><div class="task-top"><button class="grip" type="button" title="Arrastrar o usar flechas" aria-label="Mover ${item.title}" ?disabled=${this.disabled.value} @keydown=${(event) => this.keydown(event, columnIndex, itemIndex)}>↕</button>${item.tag ? html`<span class="tag">${item.tag}</span>` : ''}</div><strong>${item.title}</strong>${item.description ? html`<p>${item.description}</p>` : ''}<label class="move-label">Mover a <select aria-label="Mover ${item.title} a otra columna" ?disabled=${this.disabled.value} @change=${(event) => this.move(column.id, event.target.value, itemIndex, this.columns.value.find((entry) => String(entry.id) === event.target.value)?.items?.length || 0)}>${columns.map((entry) => html`<option value="${entry.id}" ?selected=${String(entry.id) === String(column.id)}>${entry.title}</option>`)}</select></label></li>`)}</ol>${!column.items?.length ? html`<p class="empty">Sin tareas</p>` : ''}</section>`)}</div>`)}<span class="sr-only" aria-live="polite">${this._announcement}</span></section>`;
  }
}