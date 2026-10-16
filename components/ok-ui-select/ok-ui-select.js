import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-select.css?inline';

@defineElement({ tag: 'ok-ui-select', styles: [styles], props: [
  { name: { type: String, value: '' } },
  { label: { type: String, value: 'Choose' } },
  { value: { type: String, value: '' } },
  { placeholder: { type: String, value: 'Select an option' } },
  { options: { type: Array, value: [] } },
  { required: { type: Boolean, value: false } },
  { disabled: { type: Boolean, value: false } },
] })
export class OkUiSelect extends Okalit {
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
    this._internals.setValidity(control.validity.valid ? {} : { valueMissing: true }, control.validationMessage, control);
  }

  onAfterRender() {
    const control = this.renderRoot.querySelector('select');
    control.value = this.value.value;
    this.sync(control);
  }

  formResetCallback() {
    this.value.value = this._initialValue ?? '';
  }

  render() {
    return html`<label><span>${this.label.value}${this.required.value ? ' *' : ''}</span><select ?required=${this.required.value} ?disabled=${this.disabled.value} @change=${(event) => { this.value.value = event.target.value; this.sync(event.target); this.output('ui-change', { name: this.name.value, value: event.target.value }); }}><option value="">${this.placeholder.value}</option>${this.options.value.map((option) => html`<option value="${option}">${option}</option>`)}</select></label>`;
  }
}