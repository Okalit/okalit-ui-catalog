import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-switch.css?inline';

@defineElement({ tag: 'ok-ui-switch', styles: [styles], props: [
  { name: { type: String, value: '' } },
  { checked: { type: Boolean, value: false } },
  { disabled: { type: Boolean, value: false } },
] })
export class OkUiSwitch extends Okalit {
  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  onInit() {
    this._initialChecked ??= this.checked.value;
  }

  onAfterRender() {
    this._internals.setFormValue(this.checked.value ? 'on' : null);
  }

  formResetCallback() {
    this.checked.value = this._initialChecked ?? false;
  }

  render() {
    return html`<label><span class="text"><slot>Notifications</slot></span><input type="checkbox" role="switch" ?checked=${this.checked.value} ?disabled=${this.disabled.value} @change=${(event) => { this.checked.value = event.target.checked; this._internals.setFormValue(event.target.checked ? 'on' : null); this.output('ui-change', { name: this.name.value, checked: event.target.checked }); }} /><span class="track" aria-hidden="true"><span class="thumb"></span></span></label>`;
  }
}