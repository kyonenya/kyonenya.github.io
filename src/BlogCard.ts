import { TagListItem } from './TagList';
import { formatYMD } from './lib/dateUtils';
import { useMediaQueryContext } from './mediaQueryContext';
import { Post } from './post';

const MobileSummary = (plainText: string) => `
  <p class="bl_blogCard_summary hp_alignJustify">
    ${plainText.substring(0, 74)}…
  </p>
`;

const Summary = (plainText: string) => `
  <p class="bl_blogCard_summary hp_ellipsis433">
    ${plainText.substring(0, 200)}
  </p>
`;

const Component = (post: Post): string => {
  const { isMobile } = useMediaQueryContext();
  return `
    <div class="bl_blogCard">
      <a href="?id=${post.id}" class="hp_unsetLink">
        <header>
          <div class="bl_blogCard_icon"></div>
          <span class="bl_blogCard_logo">placet experiri</span>
          <span class="bl_blogCard_suffix">:: ${post.id}</span>
        </header>
        ${
          post.title ? `<div class="bl_blogCard_title">${post.title}</div>` : ''
        }
        ${(isMobile ? MobileSummary : Summary)(post.plainText)}
        <footer>
          <span>${formatYMD(post.createdAt)}</span>
          <ul class="bl_blogCard_tagList">
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
    }
  }

  window.customElements.define('blog-card', BlogCard);
}
