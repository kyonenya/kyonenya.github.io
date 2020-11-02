// レンダラー（汎用）
export const renderHTML = (currentPage) => {
  document.getElementById('root').innerHTML
      = currentPage.html;  // 記事内容
  if (currentPage.pageTitle) {
    document.title = currentPage.pageTitle;  // ブラウザのタイトル
  }
  if (currentPage.suffix) {
    document.querySelector('.el_logo_suffix').innerText 
        = currentPage.suffix;  // ロゴのidカウンター
  }
  if (currentPage.description) {
    document.querySelector('meta[name=description]').content
        = currentPage.description;  // メタタグの説明文      
  }
  if (currentPage.archiveHeader) {
    document.querySelector('.el_archive_header').innerText
        = currentPage.archiveHeader;  // 記事検索時に現れる、ページ上部のナビゲーションバー
  }
}
