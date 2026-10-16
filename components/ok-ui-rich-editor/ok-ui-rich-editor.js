import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-rich-editor.css?inline';

@defineElement({ tag: 'ok-ui-rich-editor', styles: [styles], props: [
  { value: { type: String, value: '<p>Escribe algo interesante...</p>' } },
  { label: { type: String, value: 'Contenido' } },
  { disabled: { type: Boolean, value: false } },
] })
export class OkUiRichEditor extends Okalit {
  onAfterRender() {
    if (!this._editor) return this.ensureEditor();
    this._syncing = true;
    try {
      if (this._editor.getHTML() !== this.value.value) {
        this._editor.commands.setContent(this.value.value, { emitUpdate: false });
      }
      if (this._editor.isEditable === this.disabled.value) this._editor.setEditable(!this.disabled.value);
      this._editor.view.dom.setAttribute('aria-label', this.label.value);
    } finally {
      this._syncing = false;
    }
  }

  async ensureEditor() {
    if (this._loading) return;
    this._loading = (async () => {
      const [{ Editor }, { default: StarterKit }] = await Promise.all([import('@tiptap/core'), import('@tiptap/starter-kit')]);
      if (!this.isConnected) return;
      const element = this.renderRoot.querySelector('.editor');
      if (!element) return;
      this._editor = new Editor({
        element,
        extensions: [StarterKit],
        content: this.value.value,
        editable: !this.disabled.value,
        onUpdate: ({ editor }) => {
          const value = editor.getHTML();
          this.value.value = value;
          this.output('ui-change', { value });
        },
        onSelectionUpdate: () => { if (!this._syncing) this.requestUpdate(); },
      });
      this._editor.view.dom.setAttribute('aria-label', this.label.value);
      this.requestUpdate();
    })().finally(() => { this._loading = null; });
  }

  command(action) {
    if (!this._editor) return;
    const chain = this._editor.chain().focus();
    if (action === 'bold') chain.toggleBold().run();
    else if (action === 'italic') chain.toggleItalic().run();
    else if (action === 'heading') chain.toggleHeading({ level: 2 }).run();
    else if (action === 'list') chain.toggleBulletList().run();
    else if (action === 'undo') chain.undo().run();
    else if (action === 'redo') chain.redo().run();
    this.requestUpdate();
  }

  onDestroy() {
    this._editor?.destroy();
    this._editor = null;
  }

  render() {
    const selected = (name) => this._editor?.isActive(name) || false;
    return html`<section><div class="toolbar" role="toolbar" aria-label="Formato de ${this.label.value}"><span>${this.label.value}</span><div><button type="button" title="Negrita" aria-label="Negrita" aria-pressed="${selected('bold')}" ?disabled=${!this._editor || this.disabled.value} @click=${() => this.command('bold')}>B</button><button type="button" title="Cursiva" aria-label="Cursiva" aria-pressed="${selected('italic')}" ?disabled=${!this._editor || this.disabled.value} @click=${() => this.command('italic')}><i>I</i></button><button type="button" title="Titulo" aria-label="Titulo" aria-pressed="${this._editor?.isActive('heading', { level: 2 }) || false}" ?disabled=${!this._editor || this.disabled.value} @click=${() => this.command('heading')}>H2</button><button type="button" title="Lista" aria-label="Lista" aria-pressed="${selected('bulletList')}" ?disabled=${!this._editor || this.disabled.value} @click=${() => this.command('list')}>☷</button><button type="button" title="Deshacer" aria-label="Deshacer" ?disabled=${!this._editor || this.disabled.value} @click=${() => this.command('undo')}>↶</button><button type="button" title="Rehacer" aria-label="Rehacer" ?disabled=${!this._editor || this.disabled.value} @click=${() => this.command('redo')}>↷</button></div></div><div class="editor"></div></section>`;
  }
}