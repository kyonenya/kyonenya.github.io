import { Tags } from './Tags';
import { formatYMD } from './lib/date-utils';
import { Post } from './post';

const className = 'bl_blogCard';

const Style = `
  .${className} {
    font-size: 80%;
    border: 1px solid var(--monochrome-light);
    border-radius: 4px;
    box-shadow: 0 0 1px var(--monochrome-midlight); /* around */
    padding: 0.6em 1em;
    margin: 1.25em 0.5em 1em;
    box-sizing: border-box;
  }
  
  @media screen and (min-width: 560px) {
    .${className} {
      margin: 1.5em 2em 1.25em;
    }
  }

  .${className} header {
    font-family: 'Avenir Next', 'Lucida Sans', sans-serif;
    display: inline-flex;
    color: var(--monochrome-dark);
  }

  .${className} .icon {
    background-image: url(../../assets/icons/favicon.svg);
    background-size: 100%;
    background-repeat: no-repeat;
    vertical-align: bottom;
    margin-top: 0.4em;
    width: 1.4em;
    height: 1.4em;
  }

  .${className} .logo {
    font-size: 130%;
    color: var(--text-color);
    margin-left: 0.2em;
  }

  .${className} .suffix {
    color: var(--monochrome-dark);
    font-size: 85%;
    margin: 0.6em 0 0 0.3em;
  }

  .${className} .title {
    font-weight: bold;
    font-size: 120%;
  }

  .${className} .text {
    margin: 0.3em 0;
  }

  .${className} footer {
    color: var(--monochrome-dark);
    display: inline-flex;
    flex-wrap: wrap;
  }

  .${className} .tags {
    display: inline-flex;
    flex-wrap: wrap;
    padding-left: 0.6em;
  }

  .${className} .tags li {
    list-style: none; /* unset */
    padding-right: 0.3em;
  }
`;

const Component = (post: Post) => `
  <div class="${className}">
    <a href="?id=${post.id}" class="hp_unsetLink">
      <header>
        <div class="icon"></div>
        <span class="logo">placet experiri</span>
        <span class="suffix">:: ${post.id}</span>
      </header>
      ${post.title ? `<div class="title">${post.title}</div>` : ''}
      <p class="text hp_ellipsis433">
        ${post.plainText.substring(0, 200)}
      </p>
      <footer>
        <span>${formatYMD(post.createdAt)}</span>
        <ul class="tags">
          ${Tags(post.tags)}
        </ul>
      </footer>
    </a>
  </div>`;

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
      style.innerText = Style;
      this.appendChild(style);
    }
  }

  window.customElements.define('blog-card', BlogCard);
}
