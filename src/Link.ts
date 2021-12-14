import { toState } from './state';

const style = document.createElement('style');
style.textContent = `
  a {
    cursor: pointer;
    text-decoration: none;
    color: inherit;
  }`;

export function defineLinks(invokeRoute: () => void): void {
  const onClick = (e: Event, href: string) => {
    e.preventDefault();
    window.history.pushState(toState(href ?? ''), '', href);
    invokeRoute();
  };

  class RouterLink extends HTMLElement {
    constructor() {
      super();
      const href = this.getAttribute('href');
      if (!href) return;

      const a = document.createElement('a');
      a.onclick = (e) => onClick(e, href);
      a.appendChild(document.createElement('slot'));

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
      a.innerText = this.innerText;
      this.innerText = '';
      a.onclick = (e) => onClick(e, href);
      a.classList.add('el_link');

      this.appendChild(a);
    }
  }

  window.customElements.define('router-link', RouterLink);
  window.customElements.define('internal-link', InternalLink);
}
