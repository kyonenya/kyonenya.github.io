import { toState } from './state';

export function defineLinks(invokeRoute: () => void): void {
  class RouterLink extends HTMLElement {
    constructor() {
      super();
      const href = this.getAttribute('href');
      const className = 'el_routerLink';

      const style = document.createElement('style');
      style.textContent = `
        .${className} {
          cursor: pointer;
          text-decoration: none;
          color: inherit;
        }
      `;

      const a = document.createElement('a');
      a.classList.add(className);
      a.onclick = (e) => {
        e.preventDefault();
        window.history.pushState(toState(href ?? ''), '', href);
        invokeRoute();
      };
      const slot = document.createElement('slot');
      a.appendChild(slot);

      this.attachShadow({ mode: 'open' }).appendChild(a).appendChild(style);
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
