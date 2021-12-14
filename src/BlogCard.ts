import { Tags } from './Tags';
import dayjs from './lib/dayjs';
import { html } from './lib/tagged';
import { Post } from './post';

const summaryLength = 74;

export const defineBlogCard = (posts: Post[]): void => {
  class BlogCard extends HTMLElement {
    constructor() {
      super();
      const idString = this.getAttribute('id');
      if (!idString) return;
      const id = parseInt(idString, 10);
      const post = posts.find((post) => post.id === id);
      if (!post) return;

      this.innerHTML = html`<div class="bl_blogcard">
        <router-link href="?id=${id}">
          <header class="bl_blogcard_header">
            <div class="bl_blogcard_icon"></div>
            <span class="bl_blogcard_logo">placet experiri</span>
            <span class="bl_blogcard_suffix"> :: ${id}</span>
          </header>
          ${post.title
            ? `<div class="bl_blogcard_title">
                    ${post.title}
                  </div>`
            : ''}
          <p class="bl_blogcard_text">
            ${post.plainText.substring(0, summaryLength)}…
          </p>
          <footer class="bl_blogcard_footer">
            <span class="bl_blogcard_time">
              ${dayjs(post.createdAt).format('YYYY-MM-DD')}
            </span>
            <ul class="bl_blogcard_tags">
              ${Tags(post.tags)}
            </ul>
          </footer>
        </router-link>
      </div>`;
    }
  }

  window.customElements.define('blog-card', BlogCard);
};
