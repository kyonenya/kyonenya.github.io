import { baseUrl, isDevelopment } from './lib/utils';
import type { Head, Page } from './pages';

export function renderRoot(html: string): void {
  const rootElement = <HTMLDivElement>document.getElementById('root');
  rootElement.innerHTML = html;

  const target = document.getElementById(window.location.hash.replace('#', ''));
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.scrollTo(0, 0);
  }

  if (isDevelopment(window.location.href)) {
    // overwrite to internal link
    document
      .querySelectorAll<HTMLAnchorElement>(`a[href^="${baseUrl}"]`)
      .forEach((a) => {
        a.href = '/' + a.href.replace(baseUrl, '');
      });
  }
}

export function renderHead(head: Head): void {
  const descriptionElement = <HTMLMetaElement>(
    document.querySelector('meta[name=description]')
  );
  const searchInputElement = <HTMLInputElement>(
    document.querySelector('.el_search_input')
  );

  document.title = head.title;
  searchInputElement.style.display = head.enableSearchForm ? 'block' : 'none';
  if (head.description) {
    descriptionElement.content = head.description;
  }
  if (head.href) {
    document
      .querySelectorAll('link[rel="canonical"]')
      .forEach((link) => link.remove());
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = head.href;
    document.head.appendChild(link);
  }
}

export function renderPage(page: Page): void {
  const suffixElement = <HTMLSpanElement>(
    document.querySelector('.el_logo_suffix')
  );

  renderRoot(page.body);
  suffixElement.innerText = page.suffix ?? '';
  renderHead(page);
}
