import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-file-upload.css?inline';

@defineElement({ tag: 'ok-ui-file-upload', styles: [styles], props: [
  { name: { type: String, value: '' } },
  { label: { type: String, value: 'Adjuntar archivo' } },
  { accept: { type: String, value: '' } },
  { capture: { type: String, value: '' } },
  { multiple: { type: Boolean, value: false } },
  { required: { type: Boolean, value: false } },
  { disabled: { type: Boolean, value: false } },
  { maxSize: { type: Number, value: 0 } },
] })
export class OkUiFileUpload extends Okalit {
  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._files = [];
    this._error = '';
  }

  get files() {
    return this.renderRoot.querySelector('input')?.files || null;
  }

  onAfterRender() {
    this.updateFormValue();
  }

  updateFormValue() {
    const missing = this.required.value && this._files.length === 0;
    this._internals.setValidity(this._error ? { customError: true } : missing ? { valueMissing: true } : {}, this._error || (missing ? 'Selecciona un archivo' : ''));
    if (!this._files.length || this._error) return this._internals.setFormValue(null);
    if (!this.multiple.value) return this._internals.setFormValue(this._files[0]);
    const data = new FormData();
    for (const file of this._files) data.append(this.name.value, file);
    this._internals.setFormValue(data);
  }

  changed(event) {
    this._files = Array.from(event.target.files || []);
    const tooLarge = this.maxSize.value > 0 && this._files.some((file) => file.size > this.maxSize.value);
    this._error = tooLarge ? 'El archivo supera el tamano permitido' : '';
    this.updateFormValue();
    this.requestUpdate();
    this.output(tooLarge ? 'ui-invalid' : 'ui-change', tooLarge ? { reason: 'size' } : { name: this.name.value, files: this._files });
  }

  formResetCallback() {
    const input = this.renderRoot.querySelector('input');
    if (input) input.value = '';
    this._files = [];
    this._error = '';
    this.updateFormValue();
    this.requestUpdate();
  }

  render() {
    return html`<label><input type="file" accept="${this.accept.value || undefined}" capture="${this.capture.value || undefined}" ?multiple=${this.multiple.value} ?required=${this.required.value} ?disabled=${this.disabled.value} @change=${(event) => this.changed(event)} /><span class="action">${this.label.value}</span><span class="caption">${this._files.length ? this._files.map((file) => file.name).join(', ') : 'Seleccionar desde el dispositivo'}</span></label>${this._error ? html`<p role="alert">${this._error}</p>` : ''}`;
  }
}