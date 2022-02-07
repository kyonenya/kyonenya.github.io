import { isNew } from './lib/date-utils';
import { toState } from './state';

const modifiedAt = '2022-02-02';
const newDays = 15;

const aboutElement = document.getElementById('about');
const searchFormElement = document.querySelector('.el_search_form');
const searchInputElement = <HTMLInputElement>(
  document.querySelector('.el_search_input')
);

export function watchPopState(reRoute: () => void): void {
  window.addEventListener('popstate', reRoute);
}

export function watchSearchForm(reRoute: () => void): void {
  searchFormElement?.addEventListener('submit', (e) => {
    e.preventDefault();
    window.history.pushState(
      toState(window.location.search, `#{searchInputElement.value}`),
      `${window.location.search}#${searchInputElement.value}`,
      `${window.location.search}#${searchInputElement.value}`
    );
    reRoute();
  });
}

export function notifyUpdate(): void {
  if (!isNew(new Date(modifiedAt), newDays)) return;

  aboutElement?.addEventListener('click', () => {
    localStorage.setItem(modifiedAt, 'true');
  });
  if (localStorage.getItem(modifiedAt) !== 'true') {
    aboutElement?.classList.add('el_badge');
  }
}
