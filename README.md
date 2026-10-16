# Okalit UI Catalog

Thirty-five standalone web components built with Okalit. The preview uses `@okalit/demo-components` to explore props, slots, events, mobile/tablet layouts, and light/dark themes.

## Preview

```bash
npm install
npm run dev
```

Open the local URL printed by Rsbuild. `npm run build` verifies every lazy-loaded component and `npm test` validates the CLI registry. The preview starts in light mode. Its Dark button switches the preview tokens without changing the host application's theme.

## Install a component

Publish this repository on GitHub, then from an Okalit app:

```bash
okalit add ok-ui-button --registry github.com/Okalit/okalit-ui-catalog
```

Replace `YOUR-ORG` with the actual owner. The CLI reads `registry.json` from the repository's `main` branch and copies that component's JS and CSS into `src/catalogs/ok-ui-button/`. Each registry entry is self-contained; none imports styles or JavaScript from a sibling component. Consumer apps need `@okalit/core` and its `lit` peer dependency, plus a bundler that supports CSS `?inline` imports (such as the Okalit Rsbuild template).

The CLI copies files but does **not** install external npm packages. Install the matching engine in the consuming app when adding these components:

| Component | Extra dependency |
| --- | --- |
| `ok-ui-chart` | `npm install echarts` |
| `ok-ui-rich-editor` | `npm install @tiptap/core @tiptap/starter-kit` |
| `ok-ui-code-editor` | `npm install codemirror @codemirror/state @codemirror/lang-javascript @codemirror/lang-json` |
| `ok-ui-sortable-list`, `ok-ui-kanban-board` | `npm install sortablejs` |

Chart and editor engines are imported only when the element connects; drag components bundle SortableJS with their own lazy component chunk. Other catalog components need no extra npm packages.

```js
import '@catalogs/ok-ui-button/ok-ui-button.js';

// In an Okalit html template:
html`<ok-ui-button variant="primary" @ui-click=${handleClick}>Continue</ok-ui-button>`;
```

All components use `ok-ui-` custom element tags. Import each JavaScript file once to register its element. Events named `ui-click`, `ui-input`, `ui-change`, and `ui-close` bubble across shadow roots and carry their values in `event.detail` when applicable. Inputs, textareas, selects, dates, checkboxes and switches participate in native `FormData` via `ElementInternals`. Prefer native dates/selects on mobile so iOS and Android provide their own accessible pickers.

## Theme

The default is light: background `#f4f7fc`, primary `#7aa2f7`, and secondary `#00d4ff`. Every component supplies its own fallback values, so no global stylesheet is required. Override the inherited custom properties on a parent to change colors in another app:

```css
:root {
  --ok-background: #f4f7fc;
  --ok-surface: #fff;
  --ok-text: #1a2840;
  --ok-primary: #7aa2f7;
  --ok-primary-2: #00d4ff;
}
```

The optional `tokens.css` provides full light/dark presets. Copy or import it into the consuming app, then add `data-theme="dark"` to a parent (or `.ok-theme-dark`); use `.ok-theme-light` to switch back. Additional tokens are `--ok-surface-alt`, `--ok-muted`, `--ok-border`, `--ok-primary-contrast`, `--ok-danger`, `--ok-radius`, and `--ok-font`. The dialog is centered on wider viewports and becomes a bottom sheet below 600px; it uses the browser's native focus and Escape behavior.

## Components

| Group | Tags |
| --- | --- |
| Actions | `ok-ui-button`, `ok-ui-link`, `ok-ui-icon` |
| Inputs | `ok-ui-input`, `ok-ui-textarea`, `ok-ui-checkbox`, `ok-ui-radio-group`, `ok-ui-select`, `ok-ui-calendar`, `ok-ui-switch`, `ok-ui-file-upload` |
| Content | `ok-ui-card`, `ok-ui-badge`, `ok-ui-avatar`, `ok-ui-chat-bubble`, `ok-ui-empty-state`, `ok-ui-loading` |
| Navigation and overlays | `ok-ui-tabs`, `ok-ui-dialog`, `ok-ui-alert`, `ok-ui-toast` |
| Messaging | `ok-ui-chat-composer` |
| CRM | `ok-ui-data-grid`, `ok-ui-combobox`, `ok-ui-date-range`, `ok-ui-drawer`, `ok-ui-sortable-list`, `ok-ui-kanban-board` |
| Social | `ok-ui-post-card`, `ok-ui-comment`, `ok-ui-reaction-bar`, `ok-ui-conversation-list` |
| Charts and editors | `ok-ui-chart`, `ok-ui-rich-editor`, `ok-ui-code-editor` |

The icon component uses a static map of 29 names, including `document`, `home`, `message`, `google`, `discord`, `devil`, `search`, `send`, `calendar`, and `close`. Set `label` for an accessible nondecorative icon; leave it blank to hide the graphic from assistive technology. Use `tone` or `color` for semantic colors, and `--ok-icon-color` for an arbitrary color.

```js
html`
  <ok-ui-icon name="chatBubble" tone="primary" size="24" label="Chat"></ok-ui-icon>
  <ok-ui-dialog title="Delete message">
    Are you sure?
    <ok-ui-button slot="actions" variant="secondary">Cancel</ok-ui-button>
  </ok-ui-dialog>
`;
```

For `ok-ui-select` and `ok-ui-tabs`, pass `options` as a JavaScript property (for example `.options=${['Chat', 'Posts']}`), not as a serialized HTML attribute. Keep demo slot contents trusted: the published demo tool inserts them as HTML.

Use `ok-ui-input type="password" autocomplete="current-password"` for sign-in or `autocomplete="new-password"` for registration. Its show/hide button never places the secret in `ui-input` event details; read it from the submitted `FormData` instead. `ok-ui-file-upload` accepts `accept`, `capture="environment"`, `multiple` and `max-size` (bytes); validate type and size again on the server. `ok-ui-toast` closes after `duration` milliseconds (`0` disables auto-close). `ok-ui-chat-composer` emits `ui-send` with `{ text, files }`; the consuming app decides where to position it on screen.

## CRM, social and editors

`ok-ui-data-grid` accepts `.columns=${[{ key: 'name', label: 'Name' }]}` and `.rows=${[{ id: '1', name: 'Lucia' }]}`. Set a stable `row-key` (defaults to `id`); filtering, sorting, selection and pagination are local to the rows provided. Fetch the next page from your API in the consuming app for large server datasets. `ok-ui-combobox` accepts `.options=${['Orbit', 'Nexus']}` or `{ label, value }` objects; `ok-ui-date-range` contributes `<name>-start` and `<name>-end` to `FormData`.

The social components emit `ui-like`, `ui-reply`, `ui-change` or `ui-select` with local state/identifiers. Persist or undo those actions through your application service; the UI components do not call a backend.

`ok-ui-chart` accepts `.data=${[{ label: 'Mon', value: 24 }]}` and `type="bar|line|pie"`; its collapsible data table is accessible even without canvas. `ok-ui-rich-editor` exposes HTML through `ui-change`, while `ok-ui-code-editor` exposes plain code and supports `language="javascript"` or `language="json"` and `readonly`. Validate and sanitize stored rich HTML on the server before rendering it elsewhere. Do not use either editor as a source of trusted code or HTML.

## Drag and drop

`ok-ui-sortable-list` accepts `.items=${[{ id: 'a', label: 'First task' }]}` and emits `ui-move` with `{ id, fromIndex, toIndex, items }`. `ok-ui-kanban-board` accepts `.columns=${[{ id: 'todo', title: 'To do', items: [{ id: 'a', title: 'First task' }] }]}` and emits `{ id, fromColumn, toColumn, fromIndex, toIndex, columns }`. IDs must be unique and stable. The components update their local view immediately; persist `event.detail.items` or `event.detail.columns` in your application, and restore the previous state on API failure.

Both support mouse/touch dragging on the handle and keyboard arrows (Up/Down to reorder, Left/Right between kanban columns; Home/End within a column). The kanban also provides a native "Move to" selector. On narrow screens, columns scroll horizontally inside the board rather than making the whole page overflow. If drag gestures conflict with page scrolling in a Capacitor WebView, use the native selector or keyboard controls instead.