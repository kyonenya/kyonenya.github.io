import { isNew } from './lib/date-utils';

const modifiedAt = '2021-11-27';
const newDays = 30;

const aboutElement = document.getElementById('about');
const searchFormElement = document.querySelector('.el_search_form');
const searchInputElement = <HTMLInputElement>(
  document.querySelector('.el_search_input')
);

export function activatePopState(invokeRoute: () => void): void {
  window.addEventListener('popstate', invokeRoute);
}

export function activateSearchForm(invokeRoute: () => void): void {
  searchFormElement?.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = `${window.location.search}#${searchInputElement.value}`;
    window.history.pushState(query, '', query);
    invokeRoute();
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
