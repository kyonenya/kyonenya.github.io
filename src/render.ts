export const render = (page, route) => {
  const archiveHeaderElement = <HTMLHeadingElement>document.querySelector('.el_archive_header');
  const suffixElement = <HTMLSpanElement>document.querySelector('.el_logo_suffix');
  const descriptionElement = <HTMLMetaElement>document.querySelector('meta[name=description]');

  document.getElementById('root').innerHTML = page.body;
  // overwrite links
  document.querySelectorAll('a[href^="?"]').forEach((_a: HTMLAnchorElement) => {
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
