// 記事一覧リスト
export const html_postlist = (post, id) => {
  return `
    <li class="bl_posts_item" data-id=${id}>
      <a href="?id=${id}">
        <header class="bl_posts_header">
          <time class="bl_posts_date" datetime="${moment(post.date).format("YYYY-MM-DD HH:mm")}">${moment(post.date).format("YYYY-MM-DD")}
          </time>
        </header>
        <h2 class="bl_posts_title">
          ${post.title}
        </h2>
        <div class="bl_posts_summary" data-id=${id}>
          <p>${post.postText}</p>
        </div>
      </a>
      <footer class="bl_posts_footer">
        <span class="bl_posts_dateago">${moment(post.date).fromNow()}</span>
        <ul class="bl_tags">
          ${post.hashtags}
        </ul>
      </footer>
    </li>`;
}

export const html_article = (post) => {
  return `
    <article>
      <header class="bl_text_header">
        <time class="bl_text_date" datetime="${moment(post.date).format("YYYY-MM-DD HH:mm")}">${moment(post.date).format("YYYY-MM-DD HH:mm")}
        </time>
      </header>
      <div class="bl_text">
        <h2 class="bl_text_title">${post.title}</h2>
        ${post.text}
      </div>
      <footer class="bl_text_footer">
        <span class="bl_posts_dateago">${moment(post.date).fromNow()}</span>
        <ul class="bl_tags">
          ${post.hashtags}
        </ul>
      </footer>
    </article>`;
}

//  ハッシュタグ（共通部品）
export const html_hashtags = (eachTag) => {
  return `<li><a href="?tag=${eachTag}">#${eachTag}</a></li>`  // リンクにタグフィルター用のクエリ文字列を仕込む
}

// ハッシュタグ、ハイライトされたとき
export const html_hashtags_highlighted = (eachTag) => {
  return `<li><a href="?tag=${eachTag}" class="hp_bold">#${eachTag}</a></li>`  // リンクにタグフィルター用のクエリ文字列を仕込む
}
