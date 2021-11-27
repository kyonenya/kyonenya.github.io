import dayjs from 'dayjs';
import { datarable } from './types';

export const registerComponents = (data: datarable[]): void => {
  class BlogCard extends HTMLElement {
    constructor() {
      super();
      this.id = this.getAttribute('id')!;
      this.innerHTML = `
        <div class="bl_blogcard">
          <a href="?id=${this.id}">
            <header class="bl_blogcard_header">
              <div class="bl_blogcard_icon"></div>
              <div class="bl_blogcard_logo">placet experiri</span>
              <span class="bl_blogcard_suffix"> :: ${this.id}</span>
            </header>
            <div class="bl_blogcard_title">
              ${data[data.length - parseInt(this.id, 10)].title}
            </div>
            <p class="bl_blogcard_text">
              ${data[data.length - parseInt(this.id, 10)].plainText.substr(
                0,
                56
              )}…
            </p>
            <footer class="bl_blogcard_footer">
              <span class="bl_blogcard_time">
                ${dayjs(data[data.length - parseInt(this.id, 10)].date).format(
                  'YYYY-MM-DD'
                )}
              </span>
              <ul class="bl_blogcard_tags">
                ${data[data.length - parseInt(this.id, 10)].tags
                  .map((eachTag) => `<li>#${eachTag}</li>`)
                  .join('')}
              </ul>
            </footer>
          </a>
        </div>`;
    }
  }

  window.customElements.define('blog-card', BlogCard);
};
