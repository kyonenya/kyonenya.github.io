import { pagable } from './types';

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

export function renderRoot(html: string) {
  rootElement.innerHTML = html;
}

export const render = (page: pagable, invokeRoute: () => void): void => {
  // overwrite links
  const anchors: NodeListOf<HTMLAnchorElement> =
    document.querySelectorAll('a[href^="?"]');
  anchors.forEach((a) => {
    a.onclick = (event) => {
      event.preventDefault();
      window.history.pushState(a.href, '', a.href);
      invokeRoute();
    };
  });

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
