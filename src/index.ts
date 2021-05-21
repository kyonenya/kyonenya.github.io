import { enrich } from './data';
import { route } from './router';
import { registerComponents } from './components';
import { notifyUpdate } from './notify';
import { datarable } from './types';

const jsonPath = './data.json';

const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(response.statusText);
  return (await response.json()) as T;
};

const index = async (): Promise<void> => {
  const rawData = await fetcher<datarable[]>(jsonPath);
  const data = enrich(rawData);

  const formElement = <HTMLFormElement>(
    document.querySelector('.el_search_form')
  );
  const inputElement = <HTMLInputElement>(
    document.querySelector('.el_search_input')
  );
  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    window.history.pushState(
      null,
      '',
      `${window.location.search}#${inputElement.value}`
    );
    route(data);
  });
  notifyUpdate();

  route(data);
  window.addEventListener('popstate', () => route(data));
  registerComponents(data);
};

index().catch((err) => console.error(err));
