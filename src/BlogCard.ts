import dayjs from 'dayjs';
import { datarable } from './types';

export const registerBlogCard = (data: datarable[]): void => {
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
              ${data[data.length - id].title}
            </div>
            <p class="bl_blogcard_text">
              ${data[data.length - id].plainText.substr(0, 56)}…
            </p>
            <footer class="bl_blogcard_footer">
              <span class="bl_blogcard_time">
                ${dayjs(data[data.length - id].date).format('YYYY-MM-DD')}
              </span>
              <ul class="bl_blogcard_tags">
                ${data[data.length - id].tags
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
