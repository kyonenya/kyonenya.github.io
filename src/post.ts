export type Post = {
  id: number;
  index: number;
  date: string;
  title: string;
  text: string;
  plainText: string;
  tags: string[];
};

export const toPost = (posts: Post[]): Post[] =>
  posts.map((_post, idx) => {
    const post = { ..._post };
    post.id = posts.length - idx;
    post.index = idx;
    post.text = post.text.replace(/——/g, '──'); // ダブルダッシュ -> 罫線2つ
    // eslint-disable-next-line no-irregular-whitespace
    post.text = post.text.replace(/　/g, ' '); // 全角スペース -> 半角スペース
    post.plainText = post.text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
    return post;
  });
