const searchFormElement = <HTMLFormElement>(
  document.querySelector('.el_search_form')
);
const searchInputElement = <HTMLInputElement>(
  document.querySelector('.el_search_input')
);

export function activateSearchForm(invokeRoute: () => void): void {
  searchFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = `${window.location.search}#${searchInputElement.value}`;
    window.history.pushState(query, query, query);
    invokeRoute();
  });
}
