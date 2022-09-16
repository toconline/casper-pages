import { html, css, LitElement } from 'lit';

export class CasperPages extends LitElement {
  static properties = {
    selected: {
      type: String
    }
  };

  static styles = [
    css`
      :host {
        padding: 0.625rem;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
      }

      ::slotted(*) {
        flex-grow: 1;
      }
    `
  ];

  constructor () {
    super();

    this.selected = undefined;
    this.selectedItem = undefined;
  }

  render () {
    console.log('render casper-pages');
    return html`
      <slot @slotchange=${this._onSelectedChange}></slot>
    `;
  }

  updated (changedProperties) {
    if (changedProperties.has('selected')) {
      this._onSelectedChange();
    }
  }

  _onSelectedChange () {
    const childElements = this.shadowRoot.querySelector('slot').assignedElements({flatten: true});
    childElements.forEach(elem => {
      if (elem.getAttribute('name') !== this.selected) {
        elem.setAttribute('hidden',true);
      } else {
        if (typeof this.selectedItem?.detached === 'function') this.selectedItem.detached();
        this.selectedItem = elem;
        if (typeof this.selectedItem?.attached === 'function') this.selectedItem.attached();
        elem.removeAttribute('hidden');
      }
    })
  }
}

customElements.define('casper-pages', CasperPages);