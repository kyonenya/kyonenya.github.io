export type Page = {
  body: string;
  suffix: string;
  description: string;
  title: string;
  archiveHeader: string;
};

const rootElement = <HTMLDivElement>document.getElementById('root');
const archiveHeaderElement = <HTMLHeadingElement>(
  document.querySelector('.el_archive_header')
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

export const render = (page: Page): void => {
  renderRoot(page.body);
  if (document.title !== page.title) {
    document.title = page.title;
  }
  if (suffixElement.innerText !== page.suffix) {
    suffixElement.innerText = page.suffix;
  }
  if (archiveHeaderElement.innerText !== page.archiveHeader) {
    archiveHeaderElement.innerText = page.archiveHeader;
  }
  if (page.description !== '') {
    descriptionElement.content = page.description;
  }
};
