import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-radio-group.css?inline';

@defineElement({ tag: 'ok-ui-radio-group', styles: [styles], props: [
  { name: { type: String, value: '' } },
  { label: { type: String, value: 'Choose one' } },
  { options: { type: Array, value: [] } },
  { value: { type: String, value: '' } },
  { required: { type: Boolean, value: false } },
  { disabled: { type: Boolean, value: false } },
] })
export class OkUiRadioGroup extends Okalit {
  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  onInit() {
    this._initialValue ??= this.value.value;
  }

  onAfterRender() {
    this._internals.setFormValue(this.value.value || null);
    const missing = this.required.value && !this.value.value;
    this._internals.setValidity(missing ? { valueMissing: true } : {}, missing ? 'Selecciona una opcion' : '');
  }

  formResetCallback() {
    this.value.value = this._initialValue ?? '';
  }

  select(option) {
    this.value.value = option;
    this._internals.setFormValue(option);
    this._internals.setValidity({});
    this.output('ui-change', { name: this.name.value, value: option });
  }

  render() {
    return html`<fieldset ?disabled=${this.disabled.value}><legend>${this.label.value}${this.required.value ? ' *' : ''}</legend>${this.options.value.map((option) => html`<label><input type="radio" name="choice" value="${option}" ?checked=${this.value.value === option} ?required=${this.required.value} @change=${(event) => { if (event.target.checked) this.select(option); }} /><span>${option}</span></label>`)}</fieldset>`;
  }
}