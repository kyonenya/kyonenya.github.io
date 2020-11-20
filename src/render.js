import { route } from './router.js';

export const render = (page, data) => {
  const archiveHeaderElement = document.querySelector('.el_archive_header');
  const suffixElement = document.querySelector('.el_logo_suffix');

  document.getElementById('root').innerHTML = page.body;
  document.querySelectorAll('a').forEach(a => {
    a.onclick = (event) => {
      event.preventDefault();
      window.history.pushState(null, '', a.href);
      route(data);
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
