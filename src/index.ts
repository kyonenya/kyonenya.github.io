import { enrich } from './data';
import { route } from './router';
import { registerComponents } from './components';
import { datarable } from './types';

const jsonPath = './data.json';

const fetcher = async <T>(url: string): Promise<T> => {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json().then((data) => data as T);
  });
};

const index = async (): Promise<void> => {
  const formElement = <HTMLFormElement>(
    document.querySelector('.el_search_form')
  );
  formElement.addEventListener('input', () => {
    window.location.hash = encodeURIComponent(formElement.value);
  });
  const rawData = await fetcher<datarable[]>(jsonPath);
  const data = enrich(rawData);
  route(data);
  window.addEventListener('popstate', () => route(data));
  registerComponents(data);
};

index().catch((err) => console.error(err));
