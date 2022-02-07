import { toState } from './state';

export function watchPopState(reRoute: () => void): void {
  window.addEventListener('popstate', reRoute);
}

export function watchSearchForm(reRoute: () => void): void {
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
    reRoute();
  });
}
