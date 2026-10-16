import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-pagination.css?inline';

@defineElement({ tag: 'ok-ui-pagination', styles: [styles], props: [
  { total: { type: Number, value: 0 } },
  { page: { type: Number, value: 1 } },
  { pageSize: { type: Number, value: 10 } },
  { maxPages: { type: Number, value: 5 } },
  { label: { type: String, value: 'Paginacion' } },
  { disabled: { type: Boolean, value: false } },
] })
export class OkUiPagination extends Okalit {
  select(page) {
    const pageSize = Math.max(1, Number(this.pageSize.value) || 10);
    const totalPages = Math.max(1, Math.ceil(Math.max(0, Number(this.total.value) || 0) / pageSize));
    const nextPage = Math.max(1, Math.min(totalPages, page));
    if (nextPage === this.page.value || this.disabled.value) return;
    this.page.value = nextPage;
    this.output('ui-page', { page: nextPage, pageSize, totalPages });
  }

  render() {
    const total = Math.max(0, Number(this.total.value) || 0);
    const pageSize = Math.max(1, Number(this.pageSize.value) || 10);
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const page = Math.max(1, Math.min(totalPages, Number(this.page.value) || 1));
    const maxPages = Math.max(1, Math.min(9, Number(this.maxPages.value) || 5));
    const end = Math.min(totalPages, page + Math.floor(maxPages / 2));
    const start = Math.max(1, Math.min(page - Math.floor(maxPages / 2), end - maxPages + 1));
    const pages = Array.from({ length: end - start + 1 }, (_, index) => start + index);
    const firstItem = total ? (page - 1) * pageSize + 1 : 0;
    const lastItem = Math.min(page * pageSize, total);
    return html`<nav aria-label="${this.label.value}" class="pagination"><span class="summary">${firstItem}-${lastItem} de ${total}</span><div class="controls"><button type="button" aria-label="Primera pagina" title="Primera pagina" ?disabled=${this.disabled.value || page <= 1} @click=${() => this.select(1)}>«</button><button type="button" aria-label="Pagina anterior" title="Pagina anterior" ?disabled=${this.disabled.value || page <= 1} @click=${() => this.select(page - 1)}>‹</button>${pages.map((number) => html`<button type="button" class="page" aria-label="Pagina ${number}" aria-current="${number === page ? 'page' : undefined}" ?disabled=${this.disabled.value || number === page} @click=${() => this.select(number)}>${number}</button>`)}<button type="button" aria-label="Pagina siguiente" title="Pagina siguiente" ?disabled=${this.disabled.value || page >= totalPages} @click=${() => this.select(page + 1)}>›</button><button type="button" aria-label="Ultima pagina" title="Ultima pagina" ?disabled=${this.disabled.value || page >= totalPages} @click=${() => this.select(totalPages)}>»</button></div></nav>`;
  }
}