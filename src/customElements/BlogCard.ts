import dayjs from '../dayjs';
import { Post } from '../post';

export const registerBlogCard = (posts: Post[]): void => {
  class BlogCard extends HTMLElement {
    constructor() {
      super();
      const id = parseInt(this.getAttribute('id')!, 10);
      this.innerHTML = `
        <div class="bl_blogcard">
          <link-internal href="?id=${this.id}">
            <header class="bl_blogcard_header">
              <div class="bl_blogcard_icon"></div>
              <div class="bl_blogcard_logo">placet experiri</span>
              <span class="bl_blogcard_suffix"> :: ${this.id}</span>
            </header>
            <div class="bl_blogcard_title">
              ${posts[posts.length - id].title}
            </div>
            <p class="bl_blogcard_text">
              ${posts[posts.length - id].plainText.substr(0, 56)}…
            </p>
            <footer class="bl_blogcard_footer">
              <span class="bl_blogcard_time">
                ${dayjs(posts[posts.length - id].date).format('YYYY-MM-DD')}
              </span>
              <ul class="bl_blogcard_tags">
                ${posts[posts.length - id].tags
                  .map((eachTag) => `<li>#${eachTag}</li>`)
                  .join('')}
              </ul>
            </footer>
          </link-internal>
        </div>`;
    }
  }

  window.customElements.define('blog-card', BlogCard);
};
