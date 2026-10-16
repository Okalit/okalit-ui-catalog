import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-empty-state.css?inline';

@defineElement({ tag: 'ok-ui-empty-state', styles: [styles], props: [
  { title: { type: String, value: 'Sin resultados' } },
  { description: { type: String, value: 'Prueba con otra busqueda.' } },
] })
export class OkUiEmptyState extends Okalit {
  render() {
    return html`<section><div class="illustration"><slot name="icon">∅</slot></div><h2>${this.title.value}</h2><p>${this.description.value}</p><div class="action"><slot name="action"></slot></div></section>`;
  }
}