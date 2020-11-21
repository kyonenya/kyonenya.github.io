import dayjs from 'dayjs';
import 'dayjs/locale/ja';

dayjs.locale('ja');

export const registerComponents = (data) => {
  class BlogCard extends HTMLElement {
    constructor() {
      super();
      this.id = this.getAttribute('id');
      this.hashtags = data[data.length - this.id].tags
        .map(eachTag => `<li>#${eachTag}</li>`)
        .join('');
      this.innerHTML = `
        <div class="bl_blogcard">
          <a href="?id=${this.id}">
            <header class="bl_blogcard_header">
              <div class="bl_blogcard_icon"></div>
              <div class="bl_blogcard_logo">placet experiri</span>
              <span class="bl_blogcard_suffix"> :: ${this.id}</span>
            </header>
            <div class="bl_blogcard_title">${data[data.length - this.id].title}</div>
            <p class="bl_blogcard_text">
              ${data[data.length - this.id].plainText.substr(0, 56)}…
            </p>
            <footer class="bl_blogcard_footer">
              <span class="bl_blogcard_time">
                ${dayjs(data[data.length - this.id].date).format('YYYY-MM-DD')}
              </span>
              <ul class="bl_blogcard_tags">
                ${this.hashtags}
              </ul>
            </footer>
          </a>
        </div>`;
    }
  }

  window.customElements.define('blog-card', BlogCard);
};
