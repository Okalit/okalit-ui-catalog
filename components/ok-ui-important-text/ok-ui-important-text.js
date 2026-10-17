import { Okalit, defineElement, html } from "@okalit/core";

import styles from "./ok-ui-important-text.css?inline";

@defineElement({
  tag: "ok-ui-important-text",
  props: [
    { variant: { type: String, value: 'primary' } }
  ],
  styles: [styles]
})
export class OkUiImportantText extends Okalit {
  render() {
    return html`
      <span class="${this.variant.value}">
        <slot></slot>
      </span>
    `;
  }
}
