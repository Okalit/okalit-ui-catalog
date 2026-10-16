import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-avatar.css?inline';

@defineElement({ tag: 'ok-ui-avatar', styles: [styles], props: [
  { name: { type: String, value: 'User' } },
  { src: { type: String, value: '' } },
  { size: { type: String, value: 'md' } },
] })
export class OkUiAvatar extends Okalit {
  constructor() {
    super();
    this._failed = false;
  }

  onChange(changes) {
    if (changes.src) this._failed = false;
  }

  render() {
    const initials = this.name.value.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() || '').join('');
    return html`<span class="${this.size.value}" role="img" aria-label="${this.name.value}">${this.src.value && !this._failed ? html`<img src="${this.src.value}" alt="" @error=${() => { this._failed = true; this.requestUpdate(); }} />` : initials}</span>`;
  }
}