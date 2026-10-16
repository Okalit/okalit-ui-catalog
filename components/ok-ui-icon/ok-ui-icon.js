import { defineElement, html, Okalit } from '@okalit/core';
import { svg } from 'lit';
import styles from './ok-ui-icon.css?inline';

const icons = {
  document: svg`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>`,
  home: svg`<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10"/>`,
  message: svg`<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`,
  heart: svg`<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z"/>`,
  search: svg`<circle cx="11" cy="11" r="8"/><path d="m21 21-4.4-4.4"/>`,
  google: svg`<path fill="currentColor" stroke="none" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09zM12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23zM5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85zM12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>`,
  discord: svg`<path fill="currentColor" stroke="none" d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.51c-.24.41-.45.82-.61 1.25a18.3 18.3 0 0 0-5.49 0c-.18-.43-.38-.85-.62-1.25a19.8 19.8 0 0 0-4.88 1.51C.72 9.05-.14 13.58.28 18.06a20 20 0 0 0 5.99 3.03c.46-.63.87-1.29 1.23-1.99-.66-.25-1.29-.55-1.88-.9l.38-.29c3.92 1.8 8.18 1.8 12.06 0l.38.29c-.59.35-1.21.65-1.87.9.36.7.77 1.36 1.23 1.99a20 20 0 0 0 6-3.03c.5-5.18-.84-9.68-3.48-13.69zM8.02 15.33c-1.18 0-2.16-1.09-2.16-2.42s.96-2.42 2.16-2.42 2.18 1.1 2.16 2.42c0 1.33-.96 2.42-2.16 2.42zm7.98 0c-1.18 0-2.16-1.09-2.16-2.42s.96-2.42 2.16-2.42 2.18 1.1 2.16 2.42c0 1.33-.95 2.42-2.16 2.42z"/>`,
  gridHome: svg`<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>`,
  compass: svg`<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z"/>`,
  chatBubble: svg`<path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11z"/>`,
  profile: svg`<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>`,
  devil: svg`<path fill="currentColor" stroke="none" d="M7.1 8.7C5.85 6.45 6.3 3.75 8.65 1.85c.35-.28.87.02.8.47-.33 2.12.24 3.95 1.55 5.14a8.2 8.2 0 0 1 2 0c1.31-1.19 1.88-3.02 1.55-5.14-.07-.45.45-.75.8-.47 2.35 1.9 2.8 4.6 1.55 6.85A8.3 8.3 0 0 1 20 15c0 4.05-3.58 7-8 7s-8-2.95-8-7a8.3 8.3 0 0 1 3.1-6.3z"/><circle cx="9" cy="15" r=".8" fill="var(--ok-surface, #fff)" stroke="none"/><circle cx="15" cy="15" r=".8" fill="var(--ok-surface, #fff)" stroke="none"/>`,
  info: svg`<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>`,
  alertTriangle: svg`<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/>`,
  alertCircle: svg`<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>`,
  notification: svg`<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/>`,
  survey: svg`<path d="M6 5v14M9 7h9M9 11h9M9 15h9M9 19h9"/>`,
  pen: svg`<path d="m11 9-4 2c-1 3-2 6-2 8 2 0 5-1 8-2l2-4zM13 7l5-5 4 4-5 5M5 19l5-5"/>`,
  phone: svg`<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 19h4M12 9v6M9 12h6"/>`,
  arrowLeft: svg`<path d="M19 12H5m7 7-7-7 7-7"/>`,
  link: svg`<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>`,
  settings: svg`<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>`,
  send: svg`<path d="M22 2 11 13m11-11-7 20-4-9-9-4z"/>`,
  checkCircle: svg`<path d="M22 11a10 10 0 1 1-6-9M22 4 12 14l-3-3"/>`,
  picture: svg`<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>`,
  plusCircle: svg`<circle cx="12" cy="12" r="10"/><path d="M12 7v10M7 12h10"/>`,
  calendar: svg`<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>`,
  close: svg`<path d="M18 6 6 18M6 6l12 12"/>`,
  chevronDown: svg`<path d="m6 9 6 6 6-6"/>`,
};

@defineElement({ tag: 'ok-ui-icon', styles: [styles], props: [
  { name: { type: String, value: 'home' } },
  { size: { type: Number, value: 20 } },
  { tone: { type: String, value: 'text' } },
  { color: { type: String, value: '' } },
  { label: { type: String, value: '' } },
] })
export class OkUiIcon extends Okalit {
  render() {
    const size = Number.isFinite(this.size.value) ? Math.max(12, Math.min(this.size.value, 64)) : 20;
    const color = this.color.value || this.tone.value;
    const tone = ['primary', 'secondary', 'muted', 'danger'].includes(color) ? color : 'text';
    return html`<svg class="${tone}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="${this.label.value ? 'img' : undefined}" aria-label="${this.label.value || undefined}" aria-hidden="${this.label.value ? undefined : 'true'}">${icons[this.name.value] || icons.info}</svg>`;
  }
}