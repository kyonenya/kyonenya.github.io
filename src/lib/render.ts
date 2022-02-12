import { isDevelopment } from './utils';

export type Page = {
  body: string;
  title: string;
  suffix?: string;
  description?: string;
  href?: string;
};

export const baseUrl = 'https://kyonenya.github.io/';

function overwriteInternalLink(): void {
  document
    .querySelectorAll<HTMLAnchorElement>(`a[href^="${baseUrl}"]`)
    .forEach((a) => {
      a.href = '/' + a.href.replace(baseUrl, '');
    });
}

export function renderRoot(html: string): void {
  const rootElement = <HTMLDivElement>document.getElementById('root');
  rootElement.innerHTML = html;
  if (isDevelopment(window.location.href)) {
    overwriteInternalLink();
  }
}

export function renderPage(page: Page): void {
  const suffixElement = <HTMLSpanElement>(
    document.querySelector('.el_logo_suffix')
  );
  const descriptionElement = <HTMLMetaElement>(
    document.querySelector('meta[name=description]')
  );

  renderRoot(page.body);
  document.title = page.title;
  suffixElement.innerText = page.suffix ?? '';
  if (page.description) {
    descriptionElement.content = page.description;
  }
  if (page.href) {
    document
      .querySelectorAll('link[rel="canonical"]')
      .forEach((link) => link.remove());
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = page.href;
    document.head.appendChild(link);
  }
}
