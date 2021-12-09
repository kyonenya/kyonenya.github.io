import dayjs from './lib/dayjs';
import { Post } from './post';

const summaryLength = 74;

export const defineBlogCard = (posts: Post[]): void => {
  class BlogCard extends HTMLElement {
    constructor() {
      super();
      if (!this.id) return;
      const id = parseInt(this.id, 10);
      const post = posts.find((post) => post.id === id);
      if (!post) return;

      this.innerHTML = `
        <div class="bl_blogcard">
          <link-internal href="?id=${id}">
            <header class="bl_blogcard_header">
              <div class="bl_blogcard_icon"></div>
              <div class="bl_blogcard_logo">placet experiri</span>
              <span class="bl_blogcard_suffix"> :: ${id}</span>
            </header>
            ${
              post.title
                ? `<div class="bl_blogcard_title">
                    ${post.title}
                  </div>`
                : ''
            }
            <p class="bl_blogcard_text">
              ${post.plainText.substr(0, summaryLength)}…
            </p>
            <footer class="bl_blogcard_footer">
              <span class="bl_blogcard_time">
                ${dayjs(post.date).format('YYYY-MM-DD')}
              </span>
              <ul class="bl_blogcard_tags">
                ${post.tags.map((tag) => `<li>#${tag}</li>`).join('')}
              </ul>
            </footer>
          </link-internal>
        </div>`;
    }
  }

  window.customElements.define('blog-card', BlogCard);
};
