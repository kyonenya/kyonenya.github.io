import { TagListItem } from './TagList';
import { formatYMD } from './lib/dateUtils';
import { useMediaQueryContext } from './mediaQueryContext';
import { Post } from './post';

const className = 'bl_blogCard';

const MobileSummary = (plainText: string) => `
  <p class="text hp_alignJustify">
    ${plainText.substring(0, 74)}…
  </p>
`;

const Summary = (plainText: string) => `
  <p class="text hp_ellipsis433">
    ${plainText.substring(0, 200)}
  </p>
`;

const Component = (post: Post): string => {
  const { isMobile } = useMediaQueryContext();
  return `
    <div class="${className}">
      <a href="?id=${post.id}" class="hp_unsetLink">
        <header>
          <div class="icon"></div>
          <span class="logo">placet experiri</span>
          <span class="suffix">:: ${post.id}</span>
        </header>
        ${post.title ? `<div class="title">${post.title}</div>` : ''}
        ${(isMobile ? MobileSummary : Summary)(post.plainText)}
        <footer>
          <span>${formatYMD(post.createdAt)}</span>
          <ul class="tags">
            ${post.tags.map((tag) => TagListItem(tag)).join('')}
          </ul>
        </footer>
      </a>
    </div>`;
};

export function defineBlogCard(posts: Post[]): void {
  class BlogCard extends HTMLElement {
    constructor() {
      super();
      const idString = this.getAttribute('id');
      if (!idString) return;
      const post = posts.find((post) => post.id === parseInt(idString, 10));
      if (!post) return;

      this.innerHTML = Component(post);
      const style = document.createElement('style');
    }
  }

  window.customElements.define('blog-card', BlogCard);
}
