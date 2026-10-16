import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-date-range.css?inline';

@defineElement({ tag: 'ok-ui-date-range', styles: [styles], props: [
  { name: { type: String, value: 'period' } },
  { label: { type: String, value: 'Periodo' } },
  { start: { type: String, value: '' } },
  { end: { type: String, value: '' } },
  { required: { type: Boolean, value: false } },
  { disabled: { type: Boolean, value: false } },
] })
export class OkUiDateRange extends Okalit {
  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  onInit() {
    this._initial ??= { start: this.start.value, end: this.end.value };
  }

  onAfterRender() {
    this.sync();
  }

  sync() {
    const missing = this.required.value && !this.disabled.value && (!this.start.value || !this.end.value);
    const reversed = this.start.value && this.end.value && this.start.value > this.end.value;
    this._internals.setValidity(missing ? { valueMissing: true } : reversed ? { rangeUnderflow: true } : {}, missing ? 'Selecciona ambas fechas' : reversed ? 'La fecha final debe ser posterior a la inicial' : '', this.renderRoot.querySelectorAll('input')[1]);
    const data = new FormData();
    if (!this.disabled.value && this.start.value) data.append(`${this.name.value}-start`, this.start.value);
    if (!this.disabled.value && this.end.value) data.append(`${this.name.value}-end`, this.end.value);
    this._internals.setFormValue(data);
  }

  formResetCallback() {
    this.start.value = this._initial?.start ?? '';
    this.end.value = this._initial?.end ?? '';
  }

  change(which, value) {
    this[which].value = value;
    this.sync();
    this.output('ui-change', { start: this.start.value, end: this.end.value });
  }

  render() {
    return html`<div class="range"><span class="heading">${this.label.value}${this.required.value ? ' *' : ''}</span><div class="fields"><label>Desde<input type="date" .value=${this.start.value} max="${this.end.value || undefined}" ?disabled=${this.disabled.value} @change=${(event) => this.change('start', event.target.value)} /></label><label>Hasta<input type="date" .value=${this.end.value} min="${this.start.value || undefined}" ?disabled=${this.disabled.value} @change=${(event) => this.change('end', event.target.value)} /></label></div></div>`;
  }
}