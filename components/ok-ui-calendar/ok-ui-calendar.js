import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-calendar.css?inline';

@defineElement({ tag: 'ok-ui-calendar', styles: [styles], props: [
  { name: { type: String, value: '' } },
  { label: { type: String, value: 'Date' } },
  { value: { type: String, value: '' } },
  { min: { type: String, value: '' } },
  { max: { type: String, value: '' } },
  { required: { type: Boolean, value: false } },
  { disabled: { type: Boolean, value: false } },
] })
export class OkUiCalendar extends Okalit {
  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  onInit() {
    this._initialValue ??= this.value.value;
  }

  sync(control) {
    this._internals.setFormValue(control.value);
    this._internals.setValidity(control.validity.valid ? {} : { customError: true }, control.validationMessage, control);
  }

  onAfterRender() {
    this.sync(this.renderRoot.querySelector('input'));
  }

  formResetCallback() {
    this.value.value = this._initialValue ?? '';
  }

  render() {
    return html`<label><span>${this.label.value}${this.required.value ? ' *' : ''}</span><input type="date" .value=${this.value.value} min="${this.min.value || undefined}" max="${this.max.value || undefined}" ?required=${this.required.value} ?disabled=${this.disabled.value} @change=${(event) => { this.value.value = event.target.value; this.sync(event.target); this.output('ui-change', { name: this.name.value, value: event.target.value }); }} /></label>`;
  }
}