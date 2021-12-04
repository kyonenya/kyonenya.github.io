import { toState } from '../router';

export function registerLinkInternal(invokeRoute: () => void): void {
  class LinkInternal extends HTMLElement {
    constructor() {
      super();
      const href = this.getAttribute('href');

      const a = document.createElement('a');
      a.onclick = (e) => {
        e.preventDefault();
        window.history.pushState(toState(href ?? ''), href ?? '', href);
        invokeRoute();
      };
      const slot = document.createElement('slot');
      a.appendChild(slot);

      this.attachShadow({ mode: 'open' }).appendChild(a);
    }
  }

  window.customElements.define('link-internal', LinkInternal);
}
