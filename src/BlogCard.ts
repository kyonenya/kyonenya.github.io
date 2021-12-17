import { Tags } from './Tags';
import dayjs from './lib/dayjs';
import { Post } from './post';

const summaryLength = 74;

const style = document.createElement('style');
const parent = 'bl_blogCard';
style.innerText = `
  .${parent} {
    font-size: 80%;
    border: 1px solid var(--monochrome-light);
    border-radius: 4px;
    box-shadow: 0 0 1px var(--monochrome-midlight); /* around */
    padding: 0.6em 1em;
    margin: 1.25em 0.5em 1em;
    box-sizing: border-box;
  }
  
  @media screen and (min-width: 560px) {
    .${parent} {
      margin: 1.5em 2em 1.25em;
    }
  }

  .${parent} header {
    font-family: 'Avenir Next', 'Lucida Sans', sans-serif;
    display: inline-flex;
    color: var(--monochrome-dark);
  }

  .${parent} .icon {
    background-image: url(../../assets/icons/favicon.svg);
    background-size: 100%;
    background-repeat: no-repeat;
    vertical-align: bottom;
    margin-top: 0.4em;
    width: 1.4em;
    height: 1.4em;
  }

  .${parent} .logo {
    font-size: 130%;
    color: var(--text-color);
    margin-left: 0.2em;
  }

  .${parent} .suffix {
    color: var(--monochrome-dark);
    font-size: 85%;
    margin: 0.6em 0 0 0.3em;
  }

  .${parent} .title {
    font-weight: bold;
    font-size: 120%;
  }

  .${parent} .text {
    margin: 0.2em 0;
  }

  .${parent} footer {
    color: var(--monochrome-dark);
    display: inline-flex;
    flex-wrap: wrap;
  }

  .${parent} .tags {
    display: inline-flex;
    flex-wrap: wrap;
    padding-left: 0.6em;
  }

  .${parent} .tags li {
    padding-right: 0.3em;
  }
`;

export const defineBlogCard = (posts: Post[]): void => {
  class BlogCard extends HTMLElement {
    constructor() {
      super();
      const idString = this.getAttribute('id');
      if (!idString) return;
      const id = parseInt(idString, 10);
      const post = posts.find((post) => post.id === id);
      if (!post) return;

      this.innerHTML = `
        <div class="${parent}">
          <router-link href="?id=${id}">
            <header>
              <div class="icon"></div>
              <span class="logo">placet experiri</span>
              <span class="suffix"> :: ${id}</span>
            </header>
            ${
              post.title
                ? `<div class="title">
                    ${post.title}
                  </div>`
                : ''
            }
            <p class="text">
              ${post.plainText.substring(0, summaryLength)}…
            </p>
            <footer>
              <span>
                ${dayjs(post.createdAt).format('YYYY-MM-DD')}
              </span>
              <ul class="tags">
                ${Tags(post.tags)}
              </ul>
            </footer>
          </router-link>
        </div>`;
      this.appendChild(style);
    }
  }

  window.customElements.define('blog-card', BlogCard);
};
