import { isDevelopment } from './lib/utils';

export type Page = {
  body: string;
  title: string;
  suffix?: string;
  description?: string;
  href?: string;
};

export const baseUrl = 'https://kyonenya.github.io/';

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

export function renderHead(page: Omit<Page, 'body' | 'suffix'>): void {
  const descriptionElement = <HTMLMetaElement>(
    document.querySelector('meta[name=description]')
  );

  document.title = page.title;
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

export function renderPage(page: Page): void {
  const suffixElement = <HTMLSpanElement>(
    document.querySelector('.el_logo_suffix')
  );

  renderRoot(page.body);
  suffixElement.innerText = page.suffix ?? '';
  renderHead(page);
}
