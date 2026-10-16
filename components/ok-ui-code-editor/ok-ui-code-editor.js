import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-code-editor.css?inline';

@defineElement({
  tag: 'ok-ui-code-editor', styles: [styles], props: [
    { label: { type: String, value: 'main.js' } },
    { value: { type: String, value: 'const hello = "world";\n' } },
    { language: { type: String, value: 'javascript' } },
    { readonly: { type: Boolean, value: false } },
  ]
})
export class OkUiCodeEditor extends Okalit {
  onAfterRender() {
    if (!this._editor) return this.ensureEditor();
    this._editor.contentDOM.setAttribute('aria-label', this.label.value);
    if (!this._settingValue && this._editor.state.doc.toString() !== this.value.value) {
      this._settingValue = true;
      this._editor.dispatch({ changes: { from: 0, to: this._editor.state.doc.length, insert: this.value.value } });
      this._settingValue = false;
    }
    if (this._lastReadonly !== this.readonly.value) {
      this._lastReadonly = this.readonly.value;
      this._editor.dispatch({ effects: this._editable.reconfigure(this._EditorView.editable.of(!this.readonly.value)) });
    }
    if (this._lastLanguage !== this.language.value) {
      this._lastLanguage = this.language.value;
      this.updateLanguage();
    }
  }

  async extension() {
    if (this.language.value === 'json') return (await import('@codemirror/lang-json')).json();
    return (await import('@codemirror/lang-javascript')).javascript();
  }

  async ensureEditor() {
    if (this._loading) return;
    this._loading = (async () => {
      const [{ EditorView, basicSetup }, { Compartment }, syntax] = await Promise.all([
        import('codemirror'), import('@codemirror/state'), this.extension(),
      ]);
      if (!this.isConnected) return;
      const container = this.renderRoot.querySelector('.editor');
      if (!container) return;
      this._EditorView = EditorView;
      this._editable = new Compartment();
      this._syntax = new Compartment();
      const theme = EditorView.theme({
        '&': { backgroundColor: 'var(--ok-surface, #fff)', color: 'var(--ok-text, #1a2840)' },
        '.cm-content': { minHeight: '180px', fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '13px' },
        '.cm-gutters': { backgroundColor: 'var(--ok-surface-alt, #edf2fa)', color: 'var(--ok-muted, #56657e)', borderRight: '1px solid var(--ok-border, #cbd5e5)' },
        '.cm-activeLine': { backgroundColor: 'var(--ok-surface-alt, #edf2fa)' },
        '&.cm-focused': { outline: 'none' },
      });
      this._editor = new EditorView({
        doc: this.value.value,
        parent: container,
        extensions: [basicSetup, this._editable.of(EditorView.editable.of(!this.readonly.value)), this._syntax.of(syntax), theme,
          EditorView.updateListener.of((update) => {
            if (!update.docChanged || this._settingValue) return;
            const value = update.state.doc.toString();
            this.value.value = value;
            this.output('ui-change', { value });
          }),
        ],
      });
      this._lastReadonly = this.readonly.value;
      this._lastLanguage = this.language.value;
      this._editor.contentDOM.setAttribute('aria-label', this.label.value);
    })().finally(() => { this._loading = null; });
  }

  async updateLanguage() {
    const version = (this._languageVersion || 0) + 1;
    this._languageVersion = version;
    const syntax = await this.extension();
    if (version === this._languageVersion && this._editor) this._editor.dispatch({ effects: this._syntax.reconfigure(syntax) });
  }

  onDestroy() {
    this._editor?.destroy();
    this._editor = null;
  }

  render() {
    return html`<section><header><strong>${this.label.value}</strong><span>${this.language.value === 'json' ? 'JSON' : 'JavaScript'}</span></header><div class="editor" role="group" aria-label="${this.label.value}"></div></section>`;
  }
}