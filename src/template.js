dayjs.locale('ja');
dayjs.extend(dayjs_plugin_relativeTime);

const postList = (post, id) => {
  return `
    <li class="bl_posts_item" data-id=${id}>
      <a href="?id=${id}">
        <header class="bl_posts_header">
          <time class="bl_posts_date" datetime="${dayjs(post.date).format("YYYY-MM-DD HH:mm")}">${dayjs(post.date).format("YYYY-MM-DD")}
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
        <span class="bl_posts_dateago">${dayjs(post.date).fromNow()}</span>
        <ul class="bl_tags">
          ${post.hashtags}
        </ul>
      </footer>
    </li>`;
}

const article = (post) => {
  return `
    <article>
      <header class="bl_text_header">
        <time class="bl_text_date" datetime="${dayjs(post.date).format("YYYY-MM-DD HH:mm")}">${dayjs(post.date).format("YYYY-MM-DD HH:mm")}
        </time>
      </header>
      <div class="bl_text">
        <h2 class="bl_text_title">${post.title}</h2>
        ${post.text}
      </div>
      <footer class="bl_text_footer">
        <span class="bl_posts_dateago">${dayjs(post.date).fromNow()}</span>
        <ul class="bl_tags">
          ${post.hashtags}
        </ul>
      </footer>
    </article>`;
}

const hashtags = (eachTag) => {
  return `<li><a href="?tag=${eachTag}">#${eachTag}</a></li>`;
};

const filteredHashtags = (eachTag) => {
  return `<li><a href="?tag=${eachTag}" class="hp_bold">#${eachTag}</a></li>`;  // リンクにタグフィルター用のクエリ文字列を仕込む
};

export const template = {
  postList: postList,
  article: article,
  hashtags: hashtags,
  filteredHashtags: filteredHashtags,  
};
