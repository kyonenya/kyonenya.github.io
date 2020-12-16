import { pagable } from './types';

export const render = (page: pagable, route: () => void) => {
  const archiveHeaderElement = <HTMLHeadingElement>(
    document.querySelector('.el_archive_header')
  );
  const suffixElement = <HTMLSpanElement>(
    document.querySelector('.el_logo_suffix')
  );
  const descriptionElement = <HTMLMetaElement>(
    document.querySelector('meta[name=description]')
  );

  document.getElementById('root')!.innerHTML = page.body;

  // overwrite links
  const anchors: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(
    'a[href^="?"]'
  );
  anchors.forEach((_a) => {
    const a = _a;
    a.onclick = (event) => {
      event.preventDefault();
      window.history.pushState(null, '', a.href);
      route();
    };
  });
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
