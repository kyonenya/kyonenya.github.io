import type { Head, Page } from './pages';

export function renderRoot(html: string): void {
  document.getElementById('root')!.innerHTML = html;

  const target = document.getElementById(window.location.hash.replace('#', ''));
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.scrollTo(0, 0);
  }
}

export function renderHead(head: Head): void {
  document.title = head.title;
  document
    .querySelector<HTMLElement>('.el_search_input')
    ?.style.setProperty('display', head.enableSearchForm ? 'block' : 'none');
  if (head.description) {
    document
      .querySelector('meta[name=description]')
      ?.setAttribute('content', head.description);
  }
  if (head.href) {
    document
      .querySelectorAll('link[rel="canonical"]')
      .forEach((link) => link.remove());
    document.head.appendChild(
      Object.assign(document.createElement('link'), {
        rel: 'canonical',
        href: head.href,
      }),
    );
  }
}

export function renderPage(page: Page): void {
  renderRoot(page.body);
  renderHead(page);

  document.querySelector('.el_logo_suffix')?.replaceChildren(page.suffix ?? '');
}
