import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-textarea.css?inline';

@defineElement({ tag: 'ok-ui-textarea', styles: [styles], props: [
  { name: { type: String, value: '' } },
  { label: { type: String, value: 'Message' } },
  { value: { type: String, value: '' } },
  { placeholder: { type: String, value: '' } },
  { rows: { type: Number, value: 4 } },
  { required: { type: Boolean, value: false } },
  { disabled: { type: Boolean, value: false } },
] })
export class OkUiTextarea extends Okalit {
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
    this.sync(this.renderRoot.querySelector('textarea'));
  }

  formResetCallback() {
    this.value.value = this._initialValue ?? '';
  }

  render() {
    return html`<label><span>${this.label.value}${this.required.value ? ' *' : ''}</span><textarea rows="${Math.max(2, Math.min(this.rows.value || 4, 12))}" placeholder="${this.placeholder.value}" .value=${this.value.value} ?required=${this.required.value} ?disabled=${this.disabled.value} @input=${(event) => { this.sync(event.target); this.output('ui-input', { name: this.name.value, value: event.target.value }); }} @change=${(event) => { this.value.value = event.target.value; }}></textarea></label>`;
  }
}