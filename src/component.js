export const registerComponents = (data) => {
    // ブログカード
    class BlogCard extends HTMLElement {
      constructor() {
        super();
        this.id = this.getAttribute('id');
        this.i = data.length - this.id;
        this.hashtags = data[this.i].tags
            .map((eachTag) => `<li>#${eachTag}</li>`)
            .join('');
        this.innerHTML = `
        <div class="bl_blogcard">
            <a href="?id=${this.id}">
            <header class="bl_blogcard_header">
                <div class="bl_blogcard_icon"></div>
                <div class="bl_blogcard_logo">placet experiri</span>
                <span class="bl_blogcard_suffix"> :: ${this.id}</span>
            </header>
            <div class="bl_blogcard_title">${data[this.i].title}</div>
            <p class="bl_blogcard_text">${data[this.i].plainText.substr(0, 56)}…</p>
            <footer class="bl_blogcard_footer">
                <span class="bl_blogcard_time">${dayjs(data[this.i].date).format("YYYY-MM-DD")}</span>
                <ul class="bl_blogcard_tags">
                ${this.hashtags}
                </ul>
            </footer>
            </a>
        </div>`;
      }
    }

    // レンダリングと結びつける
    // 第一引数にHTML上のカスタムエレメント、第二引数にJS上のクラス名
    window.customElements.define('blog-card', BlogCard);
  }