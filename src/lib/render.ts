export type Page = {
  body: string;
  title: string;
  suffix?: string;
  description?: string;
  href?: string;
};

const rootElement = <HTMLDivElement>document.getElementById('root');
const suffixElement = <HTMLSpanElement>(
  document.querySelector('.el_logo_suffix')
);
const descriptionElement = <HTMLMetaElement>(
  document.querySelector('meta[name=description]')
);
const canonicalElement = <HTMLLinkElement>document.querySelector('link[rel="canonical"]');

export function renderRoot(html: string): void {
  rootElement.innerHTML = html;
}

export function renderPage(page: Page): void {
  renderRoot(page.body);
  document.title = page.title;
  suffixElement.innerText = page.suffix ?? '';
  if (page.description) {
    descriptionElement.content = page.description;
  }
  if (page.href) {
    canonicalElement.href = page.href;
  }
}
