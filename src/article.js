import { html_article } from './template.js';

/* 個別記事ページ */
export class Article {
  constructor(post) {
    this.html = html_article(post);
    this.suffix = ` :: ${post.id}`;
    this.description = `${post.plainText.substr(0, 110)}…`;
    this.pageTitle = (post.title)  // exists?
      ? `${post.title}｜placet experiri :: ${post.id}`  // 記事タイトルあり
      : `placet experiri :: ${post.id}`;  // 記事タイトルなし
    this.archiveHeader = '';
  }
}
