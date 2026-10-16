import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-checkbox.css?inline';

@defineElement({ tag: 'ok-ui-checkbox', styles: [styles], props: [
  { name: { type: String, value: '' } },
  { value: { type: String, value: 'on' } },
  { checked: { type: Boolean, value: false } },
  { required: { type: Boolean, value: false } },
  { disabled: { type: Boolean, value: false } },
] })
export class OkUiCheckbox extends Okalit {
  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  onInit() {
    this._initialChecked ??= this.checked.value;
  }

  sync() {
    this._internals.setFormValue(this.checked.value ? this.value.value : null);
    this._internals.setValidity(this.required.value && !this.checked.value ? { valueMissing: true } : {}, this.required.value && !this.checked.value ? 'Please select this option' : '');
  }

  onAfterRender() {
    this.sync();
  }

  formResetCallback() {
    this.checked.value = this._initialChecked ?? false;
  }

  render() {
    return html`<label><input type="checkbox" ?checked=${this.checked.value} ?required=${this.required.value} ?disabled=${this.disabled.value} @change=${(event) => { this.checked.value = event.target.checked; this.sync(); this.output('ui-change', { name: this.name.value, checked: event.target.checked }); }} /><span class="box" aria-hidden="true"></span><span class="text"><slot>Accept</slot></span></label>`;
  }
}