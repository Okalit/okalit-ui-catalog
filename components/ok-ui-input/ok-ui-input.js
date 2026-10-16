import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-input.css?inline';

@defineElement({ tag: 'ok-ui-input', styles: [styles], props: [
  { name: { type: String, value: '' } },
  { label: { type: String, value: 'Label' } },
  { type: { type: String, value: 'text' } },
  { value: { type: String, value: '' } },
  { placeholder: { type: String, value: '' } },
  { hint: { type: String, value: '' } },
  { autocomplete: { type: String, value: '' } },
  { required: { type: Boolean, value: false } },
  { disabled: { type: Boolean, value: false } },
] })
export class OkUiInput extends Okalit {
  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._revealed = false;
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

  toggleVisibility() {
    const input = this.renderRoot.querySelector('input');
    this.value.value = input.value;
    this._revealed = !this._revealed;
    this.requestUpdate();
    input.focus();
  }

  render() {
    const type = ['text', 'email', 'password', 'search', 'tel', 'url', 'number'].includes(this.type.value) ? this.type.value : 'text';
    return html`<label><span>${this.label.value}${this.required.value ? ' *' : ''}</span><span class="control ${type === 'password' ? 'password' : ''}"><input type="${type === 'password' && this._revealed ? 'text' : type}" placeholder="${this.placeholder.value}" autocomplete="${this.autocomplete.value || (type === 'password' ? 'current-password' : undefined)}" .value=${this.value.value} ?required=${this.required.value} ?disabled=${this.disabled.value} @input=${(event) => { this.sync(event.target); this.output('ui-input', type === 'password' ? { name: this.name.value } : { name: this.name.value, value: event.target.value }); }} @change=${(event) => { this.value.value = event.target.value; }} />${type === 'password' ? html`<button type="button" ?disabled=${this.disabled.value} aria-label="${this._revealed ? 'Ocultar contrasena' : 'Mostrar contrasena'}" aria-pressed="${this._revealed}" @click=${() => this.toggleVisibility()}>${this._revealed ? 'Ocultar' : 'Mostrar'}</button>` : ''}</span></label>${this.hint.value ? html`<small>${this.hint.value}</small>` : ''}`;
  }
}