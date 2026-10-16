import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-data-grid.css?inline';

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

@defineElement({ tag: 'ok-ui-data-grid', styles: [styles], props: [
  { columns: { type: Array, value: [] } },
  { rows: { type: Array, value: [] } },
  { label: { type: String, value: 'Registros' } },
  { rowKey: { type: String, value: 'id' } },
  { pageSize: { type: Number, value: 5 } },
  { selectable: { type: Boolean, value: true } },
] })
export class OkUiDataGrid extends Okalit {
  constructor() {
    super();
    this._query = '';
    this._sortKey = '';
    this._direction = 'asc';
    this._page = 1;
    this._selected = new Set();
  }

  sort(key) {
    this._direction = this._sortKey === key && this._direction === 'asc' ? 'desc' : 'asc';
    this._sortKey = key;
    this._page = 1;
    this.requestUpdate();
    this.output('ui-sort', { key, direction: this._direction });
  }

  select(keys, checked) {
    for (const key of keys) {
      if (checked) this._selected.add(key);
      else this._selected.delete(key);
    }
    this.requestUpdate();
    this.output('ui-select', { ids: [...this._selected] });
  }

  page(number) {
    this._page = number;
    this.requestUpdate();
    this.output('ui-page', { page: number });
  }

  render() {
    const columns = Array.isArray(this.columns.value) ? this.columns.value : [];
    const entries = (Array.isArray(this.rows.value) ? this.rows.value : []).map((row, index) => ({
      row, id: String(row?.[this.rowKey.value] ?? index),
    }));
    const query = this._query.toLocaleLowerCase();
    const filtered = entries.filter(({ row }) => columns.some((column) => String(row?.[column.key] ?? '').toLocaleLowerCase().includes(query)));
    if (this._sortKey) {
      const direction = this._direction === 'asc' ? 1 : -1;
      filtered.sort((first, second) => direction * collator.compare(String(first.row?.[this._sortKey] ?? ''), String(second.row?.[this._sortKey] ?? '')));
    }
    const size = Math.max(1, Number(this.pageSize.value) || 5);
    const pages = Math.max(1, Math.ceil(filtered.length / size));
    this._page = Math.min(this._page, pages);
    const shown = filtered.slice((this._page - 1) * size, this._page * size);
    const allSelected = shown.length > 0 && shown.every(({ id }) => this._selected.has(id));

    return html`<section><div class="toolbar"><strong>${this.label.value}</strong><label><span class="sr-only">Buscar en ${this.label.value}</span><input type="search" placeholder="Buscar..." .value=${this._query} @input=${(event) => { this._query = event.target.value; this._page = 1; this.requestUpdate(); }} /></label></div><div class="table-wrap" tabindex="0" role="region" aria-label="${this.label.value}"><table><thead><tr>${this.selectable.value ? html`<th scope="col"><input type="checkbox" aria-label="Seleccionar pagina" ?checked=${allSelected} @change=${(event) => this.select(shown.map(({ id }) => id), event.target.checked)} /></th>` : ''}${columns.map((column) => html`<th scope="col" aria-sort="${this._sortKey === column.key ? (this._direction === 'asc' ? 'ascending' : 'descending') : 'none'}">${column.sortable === false ? column.label : html`<button type="button" @click=${() => this.sort(column.key)}>${column.label}<span aria-hidden="true">${this._sortKey === column.key ? (this._direction === 'asc' ? '↑' : '↓') : '↕'}</span></button>`}</th>`)}</tr></thead><tbody>${shown.length ? shown.map(({ row, id }) => html`<tr>${this.selectable.value ? html`<td><input type="checkbox" aria-label="Seleccionar ${id}" ?checked=${this._selected.has(id)} @change=${(event) => this.select([id], event.target.checked)} /></td>` : ''}${columns.map((column) => html`<td>${String(row?.[column.key] ?? '')}</td>`)}</tr>`) : html`<tr><td class="empty" colspan="${columns.length + Number(this.selectable.value)}">Sin resultados</td></tr>`}</tbody></table></div><footer><span>${filtered.length} registros · ${this._selected.size} seleccionados</span><nav aria-label="Paginas"><button type="button" aria-label="Pagina anterior" ?disabled=${this._page <= 1} @click=${() => this.page(this._page - 1)}>‹</button><span>${this._page} / ${pages}</span><button type="button" aria-label="Pagina siguiente" ?disabled=${this._page >= pages} @click=${() => this.page(this._page + 1)}>›</button></nav></footer></section>`;
  }
}