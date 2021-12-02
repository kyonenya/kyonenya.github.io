export function registerLinkInternal(invokeRoute: () => void): void {
  class LinkInternal extends HTMLElement {
    constructor() {
      super();
      const href = this.getAttribute('href');
      this.attachShadow({ mode: 'open' });

      const a = document.createElement('a');
      a.onclick = (e) => {
        e.preventDefault();
        window.history.pushState(href, href ?? '', href);
        invokeRoute();
      };
      const slot = document.createElement('slot');
      a.appendChild(slot);

      this.shadowRoot?.appendChild(a);
    }
  }

  window.customElements.define('link-internal', LinkInternal);
}
