import { scrollToId } from './lib/render';
import { toState } from './state';

function watchPopState(reroute: () => void): void {
  window.addEventListener('popstate', () => reroute());
}

function watchSearchForm(reroute: () => void): void {
  const searchFormElement = document.querySelector('.el_search_form');
  const searchInputElement = <HTMLInputElement>(
    document.querySelector('.el_search_input')
  );

  searchFormElement?.addEventListener('submit', (e) => {
    e.preventDefault();
    window.history.pushState(
      toState(
        window.location.search,
        window.location.pathname,
        `#${searchInputElement.value}`
      ),
      '',
      `${window.location.search}#${searchInputElement.value}`
    );
    reroute();
  });
}

function watchInternalLinkClicks(reroute: () => void): void {
  document.addEventListener('click', (e) => {
    if (!(e.target instanceof Element)) return;
    const a = e.target.closest<HTMLAnchorElement>(
      'a[href^="#"], a[href^="/?"], a[href="/"], a[href^="/posts/"]'
    );
    if (a) {
      e.preventDefault();
      window.history.pushState(undefined, '', a.href);
      reroute();
      scrollToId(a.hash.replace('#', ''));
    }
  });
}

export function registerRerouter(reroute: () => void): void {
  watchPopState(reroute);
  watchSearchForm(reroute);
  watchInternalLinkClicks(reroute);
}
