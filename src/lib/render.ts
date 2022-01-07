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
    document
      .querySelectorAll('link[rel="canonical"]')
      .forEach((linkElement) => linkElement.remove());
    const linkElement = document.createElement('link');
    linkElement.rel = 'canonical';
    linkElement.href = page.href;
    document.head.appendChild(linkElement);
  }
}
