export const render = (page, route) => {
  const archiveHeaderElement = document.querySelector('.el_archive_header');
  const suffixElement = document.querySelector('.el_logo_suffix');

  document.getElementById('root').innerHTML = page.body;
  // overwrite links
  document.querySelectorAll('a[href^="?"]').forEach((_a) => {
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
    document.querySelector('meta[name=description]').content = page.description;
  }
};
