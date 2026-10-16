import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-combobox.css?inline';

@defineElement({ tag: 'ok-ui-combobox', styles: [styles], props: [
  { name: { type: String, value: '' } },
  { label: { type: String, value: 'Buscar opcion' } },
  { placeholder: { type: String, value: 'Seleccionar...' } },
  { options: { type: Array, value: [] } },
  { value: { type: String, value: '' } },
  { required: { type: Boolean, value: false } },
  { disabled: { type: Boolean, value: false } },
] })
export class OkUiCombobox extends Okalit {
  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._open = false;
    this._query = '';
    this._active = -1;
  }

  onInit() {
    this._initialValue ??= this.value.value;
  }

  get choices() {
    return (Array.isArray(this.options.value) ? this.options.value : []).map((option) =>
      typeof option === 'string' ? { label: option, value: option } : { label: String(option?.label ?? ''), value: String(option?.value ?? '') });
  }

  onAfterRender() {
    this._internals.setFormValue(this.disabled.value ? null : this.value.value || null);
    const missing = this.required.value && !this.value.value && !this.disabled.value;
    this._internals.setValidity(missing ? { valueMissing: true } : {}, missing ? 'Selecciona una opcion' : '');
  }

  formResetCallback() {
    this.value.value = this._initialValue ?? '';
    this._query = '';
    this._open = false;
    this._active = -1;
    this.requestUpdate();
  }

  choose(option) {
    this.value.value = option.value;
    this._query = option.label;
    this._open = false;
    this._active = -1;
    this._internals.setFormValue(option.value);
    this._internals.setValidity({});
    this.requestUpdate();
    this.output('ui-change', { name: this.name.value, value: option.value });
  }

  keydown(event, filtered) {
    if (event.key === 'Escape') { this._open = false; this.requestUpdate(); return; }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this._open = true;
      if (filtered.length) this._active = (this._active + (event.key === 'ArrowDown' ? 1 : -1) + filtered.length) % filtered.length;
      this.requestUpdate();
    }
    if (event.key === 'Enter' && this._open && filtered[this._active]) {
      event.preventDefault();
      this.choose(filtered[this._active]);
    }
  }

  render() {
    const chosen = this.choices.find((option) => option.value === this.value.value);
    const filtered = this.choices.filter((option) => option.label.toLocaleLowerCase().includes(this._query.toLocaleLowerCase()));
    return html`<div class="field"><label for="query">${this.label.value}${this.required.value ? ' *' : ''}</label><input id="query" type="search" role="combobox" aria-autocomplete="list" aria-controls="options" aria-expanded="${this._open}" aria-activedescendant="${this._open && this._active >= 0 && filtered.length ? `option-${this._active}` : undefined}" placeholder="${this.placeholder.value}" .value=${this._query || chosen?.label || ''} ?disabled=${this.disabled.value} @focus=${() => { this._open = true; this.requestUpdate(); }} @input=${(event) => { this._query = event.target.value; this._active = -1; this._open = true; if (this.value.value) { this.value.value = ''; this._internals.setFormValue(null); this.output('ui-change', { name: this.name.value, value: '' }); } this.requestUpdate(); }} @keydown=${(event) => this.keydown(event, filtered)} @blur=${() => { queueMicrotask(() => { if (!this.matches(':focus-within')) { this._open = false; this.requestUpdate(); } }); }} />${this._open ? html`<div id="options" role="listbox" aria-label="${this.label.value}">${filtered.length ? filtered.map((option, index) => html`<button id="option-${index}" type="button" role="option" aria-selected="${this.value.value === option.value}" class="${index === this._active ? 'active' : ''}" @mousedown=${(event) => event.preventDefault()} @click=${() => this.choose(option)}>${option.label}</button>`) : html`<span class="empty">Sin resultados</span>`}</div>` : ''}</div>`;
  }
}