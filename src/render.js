export const render = (page) => {
  document.getElementById('root').innerHTML = page.html;
  if (page.pageTitle) {
    document.title = page.title;
  }
  if (page.suffix) {
    document.querySelector('.el_logo_suffix').innerText = page.suffix;
  }
  if (page.description) {
    document.querySelector('meta[name=description]').content = page.description;
  }
  if (page.archiveHeader) {
    document.querySelector('.el_archive_header').innerText = page.archiveHeader;
  }
};
