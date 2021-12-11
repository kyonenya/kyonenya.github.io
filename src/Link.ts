import { toState } from './state';

export function defineRouterLink(invokeRoute: () => void): void {
  class RouterLink extends HTMLElement {
    constructor() {
      super();
      const href = this.getAttribute('href');

      const a = document.createElement('a');
      a.onclick = (e) => {
        e.preventDefault();
        window.history.pushState(toState(href ?? ''), '', href);
        invokeRoute();
      };
      const slot = document.createElement('slot');
      a.appendChild(slot);

      this.attachShadow({ mode: 'open' }).appendChild(a);
    }
  }

  class InternalLink extends HTMLElement {
    constructor() {
      super();
      const href = this.getAttribute('href');
      if (!href) return;

      const a = document.createElement('a');
      a.href = href;
      a.classList.add('el_link');
      a.onclick = (e) => {
        e.preventDefault();
        window.history.pushState(toState(href ?? ''), '', href);
        invokeRoute();
      };

      a.innerText = this.innerText;
      this.innerText = '';
      
      this.appendChild(a);
    }
  }

  window.customElements.define('router-link', RouterLink);
  window.customElements.define('internal-link', InternalLink);
}
