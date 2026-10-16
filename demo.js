import '@okalit/demo-components';
import './demo.css';

const catalog = document.querySelector('#catalog');
catalog.deviceTheme.value = 'light';

const theme = new CSSStyleSheet();
theme.replaceSync(`
  :host { font-family: 'DM Sans', sans-serif; --bg-primary: #f4f7fc; --bg-secondary: #eaf0fa; --bg-surface: #ffffff; --accent: #7aa2f7; --accent-dim: #456fc6; --accent-glow: #7aa2f72b; --border: #cbd5e5; --text-primary: #1a2840; --text-secondary: #56657e; --cyan: #0089a8; --pink: #456fc6; }
  main { box-sizing: border-box; width: 100%; min-height: calc(100dvh - 62px); height: auto; display: grid; grid-template-columns: minmax(0, 1fr) minmax(300px, 380px); gap: 0; }
  .content { min-width: 0; padding: 24px; align-items: center; background: #f4f7fc; }
  .resolution { flex-wrap: wrap; justify-content: center; }
  .content > .device { width: min(100%, 460px); min-width: 0; height: min(640px, 70dvh); background: var(--ok-background); border-color: #cbd5e5; box-shadow: 0 14px 35px #253f6117; }
  .content > .device.fullscreen { width: 100%; }
  .content > .device.device-dark { background: #101925; border-color: #425571; }
  .details { box-sizing: border-box; display: block; min-width: 0; width: 100%; padding: 28px; border-left: 1px solid #cbd5e5; background: #fff; }
  .details .tabs { overflow-x: auto; }
  .details table { width: 100%; table-layout: fixed; }
  .details td, .details th { padding: 9px 7px; overflow-wrap: anywhere; }
  .details th:first-child, .details td:first-child { width: 25%; }
  .details th:nth-child(2), .details td:nth-child(2) { width: 18%; }
  .details th:nth-child(3), .details td:nth-child(3) { width: 57%; }
  .details .row input, .details .row textarea { min-width: 0; }
  .resolution button.active, .details .tabs button.active { color: #101e3a; }
  .device { color-scheme: light; --ok-background: #f4f7fc; --ok-surface: #ffffff; --ok-surface-alt: #edf2fa; --ok-text: #1a2840; --ok-muted: #56657e; --ok-border: #cbd5e5; --ok-primary: #7aa2f7; --ok-primary-contrast: #101e3a; --ok-primary-2: #00d4ff; --ok-danger: #c53b54; --ok-radius: 8px; --ok-font: 'DM Sans', sans-serif; }
  .device.device-dark { color-scheme: dark; --ok-background: #101925; --ok-surface: #192637; --ok-surface-alt: #243449; --ok-text: #f2f7ff; --ok-muted: #b1c2dc; --ok-border: #425571; --ok-primary: #91b4ff; --ok-primary-contrast: #101e3a; --ok-primary-2: #64def6; --ok-danger: #ff8397; }
  @media (max-width: 850px) { main { display: block; } .content { padding: 18px 12px; } .content > .device { height: clamp(220px, 36dvh, 340px); } .details { border-left: 0; border-top: 1px solid #cbd5e5; padding: 22px 16px 40px; } }
`);
catalog.shadowRoot.adoptedStyleSheets = [...catalog.shadowRoot.adoptedStyleSheets, theme];

catalog.setComponents([
  {
    name: 'Button', tag: 'ok-ui-button', description: 'Acciones primarias, secundarias y discretas.',
    import: () => import('./components/ok-ui-button/ok-ui-button.js'),
    props: [
      { variant: { type: String, value: 'primary' } },
      { size: { type: String, value: 'md' } },
      { disabled: { type: Boolean, value: false } },
      { loading: { type: Boolean, value: false } },
    ],
    slots: [{ name: 'default', content: 'Continuar' }],
    events: ['ui-click'], channels: [],
  },
  {
    name: 'Icon', tag: 'ok-ui-icon', description: 'Iconos del sistema y marcas, con tamano y tono configurables.',
    import: () => import('./components/ok-ui-icon/ok-ui-icon.js'),
    props: [
      { name: { type: String, value: 'message' } },
      { size: { type: Number, value: 32 } },
      { tone: { type: String, value: 'primary' } },
      { color: { type: String, value: '' } },
      { label: { type: String, value: 'Mensajes' } },
    ],
    slots: [], events: [], channels: [],
  },
  {
    name: 'Link', tag: 'ok-ui-link', description: 'Enlace seguro con variante discreta y soporte de nuevas pestanas.',
    import: () => import('./components/ok-ui-link/ok-ui-link.js'),
    props: [
      { href: { type: String, value: '#explore' } },
      { variant: { type: String, value: 'inline' } },
      { external: { type: Boolean, value: false } },
    ],
    slots: [{ name: 'default', content: 'Explorar salas' }], events: [], channels: [],
  },
  {
    name: 'Badge', tag: 'ok-ui-badge', description: 'Indicadores compactos para estados y categorias.',
    import: () => import('./components/ok-ui-badge/ok-ui-badge.js'),
    props: [{ tone: { type: String, value: 'primary' } }],
    slots: [{ name: 'default', content: 'Activo' }], events: [], channels: [],
  },
  {
    name: 'Card', tag: 'ok-ui-card', description: 'Contenido estructurado con slots, sin decoracion innecesaria.',
    import: () => import('./components/ok-ui-card/ok-ui-card.js'),
    props: [{ variant: { type: String, value: 'bordered' } }],
    slots: [
      { name: 'eyebrow', content: 'COMMUNITY / 01' },
      { name: 'title', content: 'Signal Lab' },
      { name: 'default', content: 'Un espacio para construir y compartir ideas.' },
      { name: 'footer', content: '128 miembros' },
    ], events: [], channels: [],
  },
  {
    name: 'Input', tag: 'ok-ui-input', description: 'Campo nativo para texto, email o contrasena con revelar/ocultar.',
    import: () => import('./components/ok-ui-input/ok-ui-input.js'),
    props: [
      { name: { type: String, value: 'email' } }, { label: { type: String, value: 'Correo' } },
      { type: { type: String, value: 'email' } }, { value: { type: String, value: '' } },
      { placeholder: { type: String, value: 'tu@ejemplo.com' } },
      { hint: { type: String, value: 'Nunca compartiremos tu correo.' } },
      { autocomplete: { type: String, value: 'email' } },
      { required: { type: Boolean, value: false } }, { disabled: { type: Boolean, value: false } },
    ], slots: [], events: ['ui-input'], channels: [],
  },
  {
    name: 'Textarea', tag: 'ok-ui-textarea', description: 'Texto largo con redimensionado y soporte de formulario.',
    import: () => import('./components/ok-ui-textarea/ok-ui-textarea.js'),
    props: [
      { name: { type: String, value: 'message' } }, { label: { type: String, value: 'Mensaje' } },
      { value: { type: String, value: '' } }, { placeholder: { type: String, value: 'Escribe aqui...' } },
      { rows: { type: Number, value: 4 } }, { required: { type: Boolean, value: false } },
      { disabled: { type: Boolean, value: false } },
    ], slots: [], events: ['ui-input'], channels: [],
  },
  {
    name: 'Checkbox', tag: 'ok-ui-checkbox', description: 'Casilla tactil con estado y valor de formulario.',
    import: () => import('./components/ok-ui-checkbox/ok-ui-checkbox.js'),
    props: [
      { name: { type: String, value: 'terms' } }, { value: { type: String, value: 'accepted' } },
      { checked: { type: Boolean, value: true } }, { required: { type: Boolean, value: false } },
      { disabled: { type: Boolean, value: false } },
    ], slots: [{ name: 'default', content: 'Acepto las condiciones' }], events: ['ui-change'], channels: [],
  },
  {
    name: 'Select', tag: 'ok-ui-select', description: 'Selector nativo y usable con los pickers de iOS y Android.',
    import: () => import('./components/ok-ui-select/ok-ui-select.js'),
    props: [
      { name: { type: String, value: 'category' } }, { label: { type: String, value: 'Categoria' } },
      { value: { type: String, value: 'Arte' } }, { placeholder: { type: String, value: 'Elige una categoria' } },
      { options: { type: Array, value: ['Arte', 'Tecnologia', 'Musica'] } },
      { required: { type: Boolean, value: false } }, { disabled: { type: Boolean, value: false } },
    ], slots: [], events: ['ui-change'], channels: [],
  },
  {
    name: 'Calendar', tag: 'ok-ui-calendar', description: 'Selector de fecha nativo, con limites opcionales.',
    import: () => import('./components/ok-ui-calendar/ok-ui-calendar.js'),
    props: [
      { name: { type: String, value: 'date' } }, { label: { type: String, value: 'Fecha' } },
      { value: { type: String, value: '2026-10-15' } }, { min: { type: String, value: '' } },
      { max: { type: String, value: '' } }, { required: { type: Boolean, value: false } },
      { disabled: { type: Boolean, value: false } },
    ], slots: [], events: ['ui-change'], channels: [],
  },
  {
    name: 'Switch', tag: 'ok-ui-switch', description: 'Alternancia binaria accesible mediante teclado y tacto.',
    import: () => import('./components/ok-ui-switch/ok-ui-switch.js'),
    props: [{ name: { type: String, value: 'notify' } }, { checked: { type: Boolean, value: true } },
      { disabled: { type: Boolean, value: false } }],
    slots: [{ name: 'default', content: 'Notificaciones' }], events: ['ui-change'], channels: [],
  },
  {
    name: 'Avatar', tag: 'ok-ui-avatar', description: 'Imagen o iniciales automaticas cuando no hay foto.',
    import: () => import('./components/ok-ui-avatar/ok-ui-avatar.js'),
    props: [{ name: { type: String, value: 'Alex Rivera' } }, { src: { type: String, value: '' } },
      { size: { type: String, value: 'lg' } }],
    slots: [], events: [], channels: [],
  },
  {
    name: 'Chat bubble', tag: 'ok-ui-chat-bubble', description: 'Mensaje entrante o saliente con metadatos legibles.',
    import: () => import('./components/ok-ui-chat-bubble/ok-ui-chat-bubble.js'),
    props: [
      { author: { type: String, value: 'Alex' } },
      { text: { type: String, value: 'Te escribo desde el canal.' } },
      { time: { type: String, value: '10:42' } },
      { mine: { type: Boolean, value: false } },
    ], slots: [], events: [], channels: [],
  },
  {
    name: 'Tabs', tag: 'ok-ui-tabs', description: 'Pestanas con flechas de teclado y evento de cambio.',
    import: () => import('./components/ok-ui-tabs/ok-ui-tabs.js'),
    props: [
      { options: { type: Array, value: ['Chat', 'Posts', 'Files'] } },
      { selected: { type: String, value: 'Chat' } },
    ], slots: [], events: ['ui-change'], channels: [],
  },
  {
    name: 'Dialog', tag: 'ok-ui-dialog', description: 'Modal centrado en web y hoja inferior en movil.',
    import: () => import('./components/ok-ui-dialog/ok-ui-dialog.js'),
    props: [
      { open: { type: Boolean, value: false } }, { title: { type: String, value: 'Crear sala' } },
    ], slots: [
      { name: 'trigger', content: 'Abrir dialogo' },
      { name: 'default', content: 'Confirma antes de continuar con esta accion.' },
    ], events: ['ui-close'], channels: [],
  },
  {
    name: 'Radio group', tag: 'ok-ui-radio-group', description: 'Seleccion unica con controles nativos y valor de formulario.',
    import: () => import('./components/ok-ui-radio-group/ok-ui-radio-group.js'),
    props: [
      { name: { type: String, value: 'visibility' } }, { label: { type: String, value: 'Visibilidad' } },
      { options: { type: Array, value: ['Todos', 'Amigos', 'Nadie'] } },
      { value: { type: String, value: 'Amigos' } }, { required: { type: Boolean, value: false } },
      { disabled: { type: Boolean, value: false } },
    ], slots: [], events: ['ui-change'], channels: [],
  },
  {
    name: 'File upload', tag: 'ok-ui-file-upload', description: 'Adjuntos con picker del dispositivo y limite opcional de tamano.',
    import: () => import('./components/ok-ui-file-upload/ok-ui-file-upload.js'),
    props: [
      { name: { type: String, value: 'photos' } }, { label: { type: String, value: 'Elegir foto' } },
      { accept: { type: String, value: 'image/*' } }, { capture: { type: String, value: '' } },
      { multiple: { type: Boolean, value: false } }, { required: { type: Boolean, value: false } },
      { disabled: { type: Boolean, value: false } }, { 'max-size': { type: Number, value: 5242880 } },
    ], slots: [], events: ['ui-change', 'ui-invalid'], channels: [],
  },
  {
    name: 'Alert', tag: 'ok-ui-alert', description: 'Aviso inline para informacion, exito o error.',
    import: () => import('./components/ok-ui-alert/ok-ui-alert.js'),
    props: [{ tone: { type: String, value: 'info' } }, { title: { type: String, value: 'Informacion' } },
      { dismissible: { type: Boolean, value: true } }],
    slots: [{ name: 'default', content: 'Tu perfil se ha actualizado.' }], events: ['ui-dismiss'], channels: [],
  },
  {
    name: 'Toast', tag: 'ok-ui-toast', description: 'Notificacion temporal; duration=0 la mantiene visible.',
    import: () => import('./components/ok-ui-toast/ok-ui-toast.js'),
    props: [{ open: { type: Boolean, value: true } }, { tone: { type: String, value: 'success' } },
      { duration: { type: Number, value: 0 } }],
    slots: [{ name: 'default', content: 'Mensaje enviado.' }], events: ['ui-close'], channels: [],
  },
  {
    name: 'Loading', tag: 'ok-ui-loading', description: 'Spinner o lineas skeleton con movimiento reducido.',
    import: () => import('./components/ok-ui-loading/ok-ui-loading.js'),
    props: [{ label: { type: String, value: 'Cargando mensajes' } },
      { variant: { type: String, value: 'spinner' } }],
    slots: [], events: [], channels: [],
  },
  {
    name: 'Empty state', tag: 'ok-ui-empty-state', description: 'Lista vacia con mensaje, icono y accion opcional.',
    import: () => import('./components/ok-ui-empty-state/ok-ui-empty-state.js'),
    props: [{ title: { type: String, value: 'Aun no hay mensajes' } },
      { description: { type: String, value: 'Inicia la conversacion.' } }],
    slots: [{ name: 'action', content: 'Escribe el primero' }], events: [], channels: [],
  },
  {
    name: 'Chat composer', tag: 'ok-ui-chat-composer', description: 'Texto y adjuntos con Enter para enviar; Shift+Enter para salto.',
    import: () => import('./components/ok-ui-chat-composer/ok-ui-chat-composer.js'),
    props: [{ placeholder: { type: String, value: 'Mensaje para la sala...' } },
      { accept: { type: String, value: 'image/*' } }, { 'max-files': { type: Number, value: 4 } },
      { disabled: { type: Boolean, value: false } }],
    slots: [], events: ['ui-send', 'ui-error'], channels: [],
  },
  {
    name: 'Data grid', tag: 'ok-ui-data-grid', description: 'Registros con orden, filtro, seleccion y paginacion locales.',
    import: () => import('./components/ok-ui-data-grid/ok-ui-data-grid.js'),
    props: [
      { label: { type: String, value: 'Contactos' } },
      { columns: { type: Array, value: [{ key: 'name', label: 'Nombre' }, { key: 'company', label: 'Empresa' }, { key: 'status', label: 'Estado' }] } },
      { rows: { type: Array, value: [
        { id: '1', name: 'Lucia Perez', company: 'Orbit', status: 'Activo' },
        { id: '2', name: 'Marco Silva', company: 'Lumen', status: 'Pendiente' },
        { id: '3', name: 'Sara Kim', company: 'Nexus', status: 'Activo' },
        { id: '4', name: 'Alex Mora', company: 'Orbit', status: 'Nuevo' },
        { id: '5', name: 'Eva Torres', company: 'Delta', status: 'Activo' },
      ] } },
      { 'row-key': { type: String, value: 'id' } }, { 'page-size': { type: Number, value: 3 } },
      { selectable: { type: Boolean, value: true } },
    ], slots: [], events: ['ui-select', 'ui-sort', 'ui-page'], channels: [],
  },
  {
    name: 'Combobox', tag: 'ok-ui-combobox', description: 'Seleccion buscable con teclado y valor de formulario.',
    import: () => import('./components/ok-ui-combobox/ok-ui-combobox.js'),
    props: [
      { name: { type: String, value: 'company' } }, { label: { type: String, value: 'Empresa' } },
      { placeholder: { type: String, value: 'Busca una empresa' } },
      { options: { type: Array, value: ['Orbit', 'Lumen', 'Nexus', 'Delta'] } },
      { value: { type: String, value: '' } }, { required: { type: Boolean, value: false } },
      { disabled: { type: Boolean, value: false } },
    ], slots: [], events: ['ui-change'], channels: [],
  },
  {
    name: 'Date range', tag: 'ok-ui-date-range', description: 'Periodo de fechas con pickers nativos y validacion.',
    import: () => import('./components/ok-ui-date-range/ok-ui-date-range.js'),
    props: [
      { name: { type: String, value: 'period' } }, { label: { type: String, value: 'Periodo' } },
      { start: { type: String, value: '2026-10-01' } }, { end: { type: String, value: '2026-10-15' } },
      { required: { type: Boolean, value: false } }, { disabled: { type: Boolean, value: false } },
    ], slots: [], events: ['ui-change'], channels: [],
  },
  {
    name: 'Drawer', tag: 'ok-ui-drawer', description: 'Panel lateral en web y pantalla completa en movil.',
    import: () => import('./components/ok-ui-drawer/ok-ui-drawer.js'),
    props: [{ open: { type: Boolean, value: false } }, { title: { type: String, value: 'Filtros' } },
      { side: { type: String, value: 'right' } }],
    slots: [{ name: 'trigger', content: 'Abrir filtros' },
      { name: 'default', content: 'Filtra los contactos de tu equipo.' }],
    events: ['ui-close'], channels: [],
  },
  {
    name: 'Post card', tag: 'ok-ui-post-card', description: 'Publicacion social con media, likes y respuesta.',
    import: () => import('./components/ok-ui-post-card/ok-ui-post-card.js'),
    props: [
      { author: { type: String, value: 'Alex Rivera' } }, { handle: { type: String, value: '@alex' } },
      { date: { type: String, value: 'Ahora' } },
      { text: { type: String, value: 'Una idea puede comenzar con una conversacion.' } },
      { image: { type: String, value: '' } },
      { likes: { type: Number, value: 12 } }, { replies: { type: Number, value: 3 } },
      { liked: { type: Boolean, value: false } },
    ], slots: [], events: ['ui-like', 'ui-reply'], channels: [],
  },
  {
    name: 'Comment', tag: 'ok-ui-comment', description: 'Respuesta ligera con me gusta y accion de responder.',
    import: () => import('./components/ok-ui-comment/ok-ui-comment.js'),
    props: [
      { author: { type: String, value: 'Lucia' } },
      { text: { type: String, value: 'Estoy de acuerdo. Hablemos mas de esto.' } },
      { time: { type: String, value: 'Hace 2 min' } },
      { likes: { type: Number, value: 4 } }, { liked: { type: Boolean, value: false } },
    ], slots: [], events: ['ui-like', 'ui-reply'], channels: [],
  },
  {
    name: 'Reaction bar', tag: 'ok-ui-reaction-bar', description: 'Reacciones excluyentes con conteos locales.',
    import: () => import('./components/ok-ui-reaction-bar/ok-ui-reaction-bar.js'),
    props: [
      { reactions: { type: Array, value: [{ emoji: '👍', label: 'Me gusta', count: 12 }, { emoji: '❤️', label: 'Me encanta', count: 7 }, { emoji: '🔥', label: 'Genial', count: 3 }] } },
      { selected: { type: String, value: '' } },
    ], slots: [], events: ['ui-change'], channels: [],
  },
  {
    name: 'Conversation list', tag: 'ok-ui-conversation-list', description: 'Bandeja de chats con vista previa y no leidos.',
    import: () => import('./components/ok-ui-conversation-list/ok-ui-conversation-list.js'),
    props: [
      { label: { type: String, value: 'Mensajes' } }, { active: { type: String, value: '' } },
      { conversations: { type: Array, value: [
        { id: 'orbit', name: 'Equipo Orbit', preview: 'Nos vemos manana', time: '12:30', unread: 2 },
        { id: 'lucia', name: 'Lucia', preview: 'Gracias por la ayuda', time: 'Ayer', unread: 0 },
        { id: 'nexus', name: 'Nexus', preview: 'El proyecto esta listo', time: 'Lun', unread: 1 },
      ] } },
    ], slots: [], events: ['ui-select'], channels: [],
  },
  {
    name: 'Chart', tag: 'ok-ui-chart', description: 'Barras, linea o pastel con ECharts y tabla accesible.',
    import: () => import('./components/ok-ui-chart/ok-ui-chart.js'),
    props: [
      { label: { type: String, value: 'Actividad semanal' } },
      { type: { type: String, value: 'bar' } },
      { data: { type: Array, value: [{ label: 'Lun', value: 24 }, { label: 'Mar', value: 39 }, { label: 'Mie', value: 31 }, { label: 'Jue', value: 52 }, { label: 'Vie', value: 46 }] } },
      { height: { type: Number, value: 260 } },
    ], slots: [], events: [], channels: [],
  },
  {
    name: 'Rich editor', tag: 'ok-ui-rich-editor', description: 'Texto enriquecido con Tiptap, formato y HTML controlado.',
    import: () => import('./components/ok-ui-rich-editor/ok-ui-rich-editor.js'),
    props: [
      { label: { type: String, value: 'Descripcion' } },
      { value: { type: String, value: '<p>Una idea puede comenzar con una conversacion.</p>' } },
      { disabled: { type: Boolean, value: false } },
    ], slots: [], events: ['ui-change'], channels: [],
  },
  {
    name: 'Code editor', tag: 'ok-ui-code-editor', description: 'Editor CodeMirror con JavaScript y JSON.',
    import: () => import('./components/ok-ui-code-editor/ok-ui-code-editor.js'),
    props: [
      { label: { type: String, value: 'main.js' } },
      { value: { type: String, value: 'const channel = "signal-lab";\nconsole.log(channel);' } },
      { language: { type: String, value: 'javascript' } },
      { readonly: { type: Boolean, value: false } },
    ], slots: [], events: ['ui-change'], channels: [],
  },
  {
    name: 'Sortable list', tag: 'ok-ui-sortable-list', description: 'Ordena tareas con arrastre o flechas del teclado.',
    import: () => import('./components/ok-ui-sortable-list/ok-ui-sortable-list.js'),
    props: [
      { label: { type: String, value: 'Prioridades' } },
      { items: { type: Array, value: [
        { id: 'a', label: 'Revisar propuesta', description: 'Equipo de producto' },
        { id: 'b', label: 'Preparar reunion', description: 'Cliente Orbit' },
        { id: 'c', label: 'Publicar informe', description: 'Esta semana' },
      ] } },
      { 'item-key': { type: String, value: 'id' } }, { disabled: { type: Boolean, value: false } },
    ], slots: [], events: ['ui-move'], channels: [],
  },
  {
    name: 'Kanban board', tag: 'ok-ui-kanban-board', description: 'Tareas entre columnas con drag, teclado o selector de destino.',
    import: () => import('./components/ok-ui-kanban-board/ok-ui-kanban-board.js'),
    props: [
      { label: { type: String, value: 'Proyecto Orbit' } },
      { columns: { type: Array, value: [
        { id: 'todo', title: 'Por hacer', items: [
          { id: 'task-1', title: 'Disenar ficha', description: 'Contactos CRM', tag: 'Diseno' },
          { id: 'task-2', title: 'Revisar copy', tag: 'Contenido' },
        ] },
        { id: 'doing', title: 'En curso', items: [
          { id: 'task-3', title: 'Integrar API', description: 'Sincronizar estados', tag: 'Backend' },
        ] },
        { id: 'done', title: 'Terminado', items: [] },
      ] } },
      { disabled: { type: Boolean, value: false } },
    ], slots: [], events: ['ui-move'], channels: [],
  },
  {
    name: 'Media preview', tag: 'ok-ui-media-preview', description: 'Vista adaptable de imagen o video con controles, formato y pie opcional.',
    import: () => import('./components/ok-ui-media-preview/ok-ui-media-preview.js'),
    props: [
      { src: { type: String, value: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80' } },
      { type: { type: String, value: 'image' } }, { alt: { type: String, value: 'Estacion de videojuegos' } },
      { poster: { type: String, value: '' } }, { caption: { type: String, value: 'Vista previa del proyecto' } },
      { ratio: { type: String, value: '16/9' } }, { controls: { type: Boolean, value: true } },
      { muted: { type: Boolean, value: false } }, { loop: { type: Boolean, value: false } },
    ], slots: [], events: [], channels: [],
  },
  {
    name: 'Pagination', tag: 'ok-ui-pagination', description: 'Navegacion accesible por paginas con resumen de resultados.',
    import: () => import('./components/ok-ui-pagination/ok-ui-pagination.js'),
    props: [
      { total: { type: Number, value: 87 } }, { page: { type: Number, value: 4 } },
      { 'page-size': { type: Number, value: 10 } }, { 'max-pages': { type: Number, value: 5 } },
      { label: { type: String, value: 'Paginacion de resultados' } }, { disabled: { type: Boolean, value: false } },
    ], slots: [], events: ['ui-page'], channels: [],
  },
  {
    name: 'Popover', tag: 'ok-ui-popover', description: 'Panel contextual con cierre exterior y soporte de Escape.',
    import: () => import('./components/ok-ui-popover/ok-ui-popover.js'),
    props: [
      { label: { type: String, value: 'Opciones de vista' } },
      { placement: { type: String, value: 'bottom' } }, { open: { type: Boolean, value: false } },
    ], slots: [
      { name: 'trigger', content: 'Opciones' },
      { name: 'default', content: 'Ajusta las opciones de esta vista.' },
    ], events: ['ui-close'], channels: [],
  },
  {
    name: 'Skeleton', tag: 'ok-ui-skeleton', description: 'Marcador de carga configurable como texto, circulo o rectangulo.',
    import: () => import('./components/ok-ui-skeleton/ok-ui-skeleton.js'),
    props: [
      { variant: { type: String, value: 'text' } }, { lines: { type: Number, value: 3 } },
      { width: { type: Number, value: 0 } }, { height: { type: Number, value: 120 } },
      { label: { type: String, value: 'Cargando vista previa' } },
    ], slots: [], events: [], channels: [],
  },
]);