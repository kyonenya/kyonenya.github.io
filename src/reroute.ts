import { toState } from './state';

function watchPopState(reroute: () => void): void {
  window.addEventListener('popstate', () => reroute());
}

function watchSearchForm(reroute: () => void): void {
  document.querySelector('.el_search_form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const hash = `#${document.querySelector<HTMLInputElement>('.el_search_input')?.value ?? ''}`;
    window.history.pushState(
      toState(window.location.search, window.location.pathname, hash),
      '',
      `${window.location.search}${hash}`,
    );
    reroute();
  });
}

function watchInternalLinkClicks(reroute: () => void): void {
  document.addEventListener('click', (e) => {
    if (!(e.target instanceof Element)) return;
    const a = e.target.closest<HTMLAnchorElement>(
      'a[href^="#"], a[href^="/?"], a[href="/"], a[href^="/posts/"]',
    );
    if (a) {
      e.preventDefault();
      window.history.pushState(undefined, '', a.href);
      reroute();
    }
  });
}

export function registerRerouter(reroute: () => void): void {
  watchPopState(reroute);
  watchSearchForm(reroute);
  watchInternalLinkClicks(reroute);
}
