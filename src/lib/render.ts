export type Page = {
  body: string;
  title: string;
  suffix?: string;
  description?: string;
  archiveHeader?: string;
};

const rootElement = <HTMLDivElement>document.getElementById('root');
const archiveHeaderElement = <HTMLHeadingElement>(
  document.querySelector('.el_archiveHeader')
);
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
  archiveHeaderElement.innerText = page.archiveHeader ?? '';
  if (page.description) {
    descriptionElement.content = page.description;
  }
}
