import { toState } from './state';

export function watchPopState(reroute: () => void): void {
  window.addEventListener('popstate', () => {
    if (window.location.hash) return; // enable page-internal jump
    reroute();
  });
}

export function watchSearchForm(reroute: () => void): void {
  const searchFormElement = document.querySelector('.el_search_form');
  const searchInputElement = <HTMLInputElement>(
    document.querySelector('.el_search_input')
  );

  searchFormElement?.addEventListener('submit', (e) => {
    e.preventDefault();
    window.history.pushState(
      toState(window.location.search, `#{searchInputElement.value}`),
      '',
      `${window.location.search}#${searchInputElement.value}`
    );
    reroute();
  });
}
