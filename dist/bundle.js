/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/article.js":
/*!************************!*\
  !*** ./src/article.js ***!
  \************************/
/*! namespace exports */
/*! export createArticle [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createArticle\": () => /* binding */ createArticle\n/* harmony export */ });\n/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template.js */ \"./src/template.js\");\n;\n\n/* 個別記事ページ */\nconst createArticle = (post) =>  {\n  return {\n    html: (0,_template_js__WEBPACK_IMPORTED_MODULE_0__.html_article)(post),\n    suffix: ` :: ${post.id}`,\n    description: `${post.plainText.substr(0, 110)}…`,\n    pageTitle: (post.title)  // exists?\n      ? `${post.title}｜placet experiri :: ${post.id}`  // 記事タイトルあり\n      : `placet experiri :: ${post.id}`,  // 記事タイトルなし\n    archiveHeader: '',\n  }\n}\n\n\n//# sourceURL=webpack://kyonenya.github.io/./src/article.js?");

/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/*! namespace exports */
/*! export process [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"process\": () => /* binding */ process\n/* harmony export */ });\n/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template.js */ \"./src/template.js\");\n;\n\nconst process = (data) => {\n  for (const eachData of data) {  // data[]オブジェクト配列にプロパティを追加\n\n    // 1. ダブルダッシュ——が途切れてしまうので罫線二つに置換しておく\n    eachData.text = eachData.text.replace(/——/g, '──');\n    eachData.title = eachData.title.replace(/——/g, '──');\n\n    // 2. マークアップを削除してプレーンテキストを生成しておく\n    eachData.plainText = eachData.text.replace(/<(\"[^\"]*\"|'[^']*'|[^'\">])*>/g,'');\n\n    // 3. 記事一覧リストでの表示用文字列を作っておく\n    const postTextLength = 125;  // 記事一覧に何文字表示するか？\n    // 長文なら、\n    if (eachData.plainText.length > postTextLength) {\n      eachData.postText = `${eachData.plainText.substr(0, postTextLength)}…`;  // 冒頭n文字分だけを省略表示。\n    } else {  // 短文なら、\n      eachData.postText = eachData.plainText;  // プレーンテキストそのまま\n    }\n    // 4.  ハッシュタグを生成しておく\n    eachData.hashtags = eachData.tags\n        .map((eachTag) => {\n          if (eachTag === status.tag) {  // タグフィルターにマッチしているなら、\n            return (0,_template_js__WEBPACK_IMPORTED_MODULE_0__.html_hashtags_highlighted)(eachTag);  // 当該タグをハイライト。\n          } else {\n            return (0,_template_js__WEBPACK_IMPORTED_MODULE_0__.html_hashtags)(eachTag);\n          }\n        })\n        .join('');\n    // 5. 記事リストのHTMLを生成しておく\n    const i = data.length - eachData.id;\n    eachData.postlistHtml = (0,_template_js__WEBPACK_IMPORTED_MODULE_0__.html_postlist)(data[i], eachData.id);        \n  }\n  \n  return data;\n}\n\n\n//# sourceURL=webpack://kyonenya.github.io/./src/data.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router.js */ \"./src/router.js\");\n/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data.js */ \"./src/data.js\");\n/* harmony import */ var _article_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./article.js */ \"./src/article.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render.js */ \"./src/render.js\");\n/* harmony import */ var _search_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./search.js */ \"./src/search.js\");\n\n;\n\n\n\n\n\n  // 表示調整用\n  const jsonPath = './data.json';\n\n  // 実行\n  const queryStr = window.location.search.slice(1);  // 'foo=1&bar=2'、文頭の'?'を除外\n  const status = (0,_router_js__WEBPACK_IMPORTED_MODULE_0__.getUrlQueries)(queryStr);\n  \n/* JSONデータ取得開始 --------------------  */\nfetch(jsonPath)\n .then((response) => response.json())\n .then((data) => {\n\n/* ---------------------------------\n  下準備・データの加工 */  \n  data = (0,_data_js__WEBPACK_IMPORTED_MODULE_1__.process)(data);\n  \n  for (const eachData of data) {  \n    // 6. 表示・非表示フラグを、タグフィルターに応じてセットしておく\n    const tagExists = eachData.tags.includes(status.tag);  // タグ検索にヒットしたか\n    // タグ検索がOFFか、またはタグ検索にヒットしているならば、\n    eachData.isVisible = status.tag == null || tagExists\n        ? true  // 表示。\n        : false;\n  }\n\n\n/* ---------------------------------\n  記事一覧ページ生成 */\n  const createPostlist = (data) => {\n    return {\n      html: `<ul class=\"bl_posts\">${\n        data.map((eachData) => {\n            if (eachData.isVisible === true) {\n              return eachData.postlistHtml;\n            }\n          }).join('')\n        }</ul>`,\n      suffix: '',\n      description: '',\n      pageTitle: '',\n      archiveHeader: '',\n    }\n  }\n    \n  const createTagged = () => {  \n    return {\n      html: `<ul class=\"bl_posts\">${\n        data.map((eachData) => {\n            if (eachData.isVisible === true) {\n              return eachData.postlistHtml;\n            }\n          }).join('')\n        }</ul>`,\n      suffix: '',\n      description: '',\n      pageTitle: `#${status.tag}｜placet experiri`,\n      archiveHeader: `#${status.tag}`,\n    }\n  }\n  \n  const postlist_tagged = createTagged(data);\n  const postlist = createPostlist(data); \n  \n  // ルーティング\n  if (status.id == null && status.tag) {\n    (0,_render_js__WEBPACK_IMPORTED_MODULE_3__.renderHTML)(postlist_tagged);\n  } else if (status.id == null) {\n    (0,_render_js__WEBPACK_IMPORTED_MODULE_3__.renderHTML)(postlist);\n  }\n  if (isFinite(status.id)) {  // 数値判定\n    const i = data.length - status.id;  // 記事idはループカウントで言うと何番目か\n    const article = (0,_article_js__WEBPACK_IMPORTED_MODULE_2__.createArticle)(data[i]);\n    (0,_render_js__WEBPACK_IMPORTED_MODULE_3__.renderHTML)(article);  // ページ生成\n    document.querySelector('.el_search_form')\n        .classList.add('hp_hidden');  // 検索フォームを非表示\n  }\n\n  /* ---------------------------------\n    リアルタイム検索 */\n  // 文字入力されるたびに検索実行\n  document.querySelector('.el_search_form').addEventListener('input', () => {\n    (0,_search_js__WEBPACK_IMPORTED_MODULE_4__.realTimeSearch)(data);\n  });\n\n///----------------\n  class BlogCard extends HTMLElement {\n    constructor() {\n      super();\n      this.id = this.getAttribute('id');\n      this.i = data.length - this.id;\n      this.hashtags = data[this.i].tags\n          .map((eachTag) => `<li>#${eachTag}</li>`)\n          .join('');\n      this.innerHTML = `\n      <div class=\"bl_blogcard\">\n        <a href=\"?id=${this.id}\">\n          <header class=\"bl_blogcard_header\">\n            <div class=\"bl_blogcard_icon\"></div>\n            <div class=\"bl_blogcard_logo\">placet experiri</span>\n            <span class=\"bl_blogcard_suffix\"> :: ${this.id}</span>\n          </header>\n          <div class=\"bl_blogcard_title\">${data[this.i].title}</div>\n          <p class=\"bl_blogcard_text\">${data[this.i].plainText.substr(0, 56)}…</p>\n          <footer class=\"bl_blogcard_footer\">\n            <span class=\"bl_blogcard_time\">${moment(data[this.i].date).format(\"YYYY-MM-DD\")}</span>\n            <ul class=\"bl_blogcard_tags\">\n              ${this.hashtags}\n            </ul>\n          </footer>\n        </a>\n      </div>`;\n    }\n  }\n\n  // レンダリングと結びつける\n  // 第一引数にHTML上のカスタムエレメント、第二引数にJS上のクラス名\n  window.customElements.define('blog-card', BlogCard);\n\n})  // fetch.then((data) => {...\n\n//# sourceURL=webpack://kyonenya.github.io/./src/index.js?");

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/*! namespace exports */
/*! export renderHTML [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderHTML\": () => /* binding */ renderHTML\n/* harmony export */ });\n// レンダラー（汎用）\nconst renderHTML = (currentPage) => {\n  document.getElementById('root').innerHTML\n      = currentPage.html;  // 記事内容\n  if (currentPage.pageTitle) {\n    document.title = currentPage.pageTitle;  // ブラウザのタイトル\n  }\n  if (currentPage.suffix) {\n    document.querySelector('.el_logo_suffix').innerText \n        = currentPage.suffix;  // ロゴのidカウンター\n  }\n  if (currentPage.description) {\n    document.querySelector('meta[name=description]').content\n        = currentPage.description;  // メタタグの説明文      \n  }\n  if (currentPage.archiveHeader) {\n    document.querySelector('.el_archive_header').innerText\n        = currentPage.archiveHeader;  // 記事検索時に現れる、ページ上部のナビゲーションバー\n  }\n}\n\n\n//# sourceURL=webpack://kyonenya.github.io/./src/render.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/*! namespace exports */
/*! export getUrlQueries [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getUrlQueries\": () => /* binding */ getUrlQueries\n/* harmony export */ });\nconst getUrlQueries = (queryStr) => {\n  const result = {};\n  // const queryStr = window.location.search.slice(1);  // 'foo=1&bar=2'、文頭の'?'を除外\n\n  // クエリがない場合は、\n  if (!queryStr) {\n    return result;  // 空のオブジェクトを返す。\n  }\n  \n  // 複数のクエリを'&'で切って配列へと分解\n  const queryArr = queryStr.split('&')  // ['foo=1', 'bar=2']\n  queryArr.forEach((eachQueryStr) => {\n    const keyAndValue = eachQueryStr.split('=');  // ['foo', '1']// '='でさらに分割してそれぞれ配列（key,value）へと格納\n    // 配列からオブジェクトを生成、このとき値を日本語にデコードしておく\n    result[keyAndValue[0]] = decodeURIComponent(keyAndValue[1]);  // {foo: 1}\n  });\n\n  return result;\n};\n\n//# sourceURL=webpack://kyonenya.github.io/./src/router.js?");

/***/ }),

/***/ "./src/search.js":
/*!***********************!*\
  !*** ./src/search.js ***!
  \***********************/
/*! namespace exports */
/*! export realTimeSearch [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"realTimeSearch\": () => /* binding */ realTimeSearch\n/* harmony export */ });\n  /* 検索関数 ---------- */\nconst realTimeSearch = (data) => {\n\n  // 検索ボックスに入力された値\n  const word = document.querySelector('.el_search_form').value;\n  \n  // 全件ループ開始\n  for (const eachData of data) {\n\n    const li = document.querySelector(`.bl_posts_item[data-id=\"${eachData.id}\"]`);\n    const li_text = document.querySelector(`.bl_posts_summary[data-id=\"${eachData.id}\"]`);\n    \n    // 記事一覧に表示されてなければ、\n    if (eachData.isVisible === false) {\n      continue;  // スキップして次のループへ。\n    }\n    \n    let wordIndex = eachData.plainText.indexOf(word);\n    const isMatched_title = eachData.title.includes(word);  // タイトル簡易検索\n    let isMatched_hashtags = eachData.hashtags.includes(word);  // ハッシュタグ簡易検索\n    let resultText = '…';\n    \n    // 表示調整用\n    const resultLength = 41;  // 検索結果に表示したい文字数は？\n    const beforeLength = 15;  // 先読み、マッチした検索語句の何文字前から表示したい？\n    const afterLength = resultLength - beforeLength - word.length;  // 後読み\n    \n    // マッチしたときは（本文・タイトル・タグのいずれかに）\n    if (wordIndex != -1 || isMatched_title === true || isMatched_hashtags === true) {\n      li.classList.remove('hp_hidden');  // 表示。\n      \n      // 検索結果に表示するための文字列を決定\n        // 検索語句が先頭に近すぎたら、\n        if (wordIndex <= beforeLength) {\n          wordIndex = beforeLength;  // 冒頭から表示して、\n          resultText = '';  // 冒頭の'…'を削除。\n        }        \n        // 結果表示用の文字列\n        resultText += eachData.plainText.substr(wordIndex - beforeLength, resultLength)\n        // 検索語句が末尾より十分遠ければ、\n        const wordIndex_last = wordIndex + word.length + afterLength;\n        if (wordIndex_last < eachData.plainText.length) {\n          resultText += '…';  // 末尾に'…'を追加。\n        }\n      \n      // 検索語句をハイライト表示する\n      resultText = resultText.replace(new RegExp(word, \"g\"), `<span class=\"hp_highlight\">${word}</span>`);  // （変数を使って複数置換させる方法）\n      // DOM要素として追加\n      li_text.innerHTML = `<p>${resultText}</p>`;\n      \n    } else {\n    // マッチしなかったときは、\n      li.classList.add('hp_hidden');  // 非表示に。\n    }\n\n    // 検索フォームが空になったら、\n    if (word === '') {\n      li_text.innerHTML = eachData.postText  // 元のテキストに戻す。\n    }\n\n  }  // for(){...\n  };  // ---------- realTimeSearch() => {...\n\n\n//# sourceURL=webpack://kyonenya.github.io/./src/search.js?");

/***/ }),

/***/ "./src/template.js":
/*!*************************!*\
  !*** ./src/template.js ***!
  \*************************/
/*! namespace exports */
/*! export html_article [provided] [no usage info] [missing usage info prevents renaming] */
/*! export html_hashtags [provided] [no usage info] [missing usage info prevents renaming] */
/*! export html_hashtags_highlighted [provided] [no usage info] [missing usage info prevents renaming] */
/*! export html_postlist [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"html_postlist\": () => /* binding */ html_postlist,\n/* harmony export */   \"html_article\": () => /* binding */ html_article,\n/* harmony export */   \"html_hashtags\": () => /* binding */ html_hashtags,\n/* harmony export */   \"html_hashtags_highlighted\": () => /* binding */ html_hashtags_highlighted\n/* harmony export */ });\n// 記事一覧リスト\nconst html_postlist = (post, id) => {\n  return `\n    <li class=\"bl_posts_item\" data-id=${id}>\n      <a href=\"?id=${id}\">\n        <header class=\"bl_posts_header\">\n          <time class=\"bl_posts_date\" datetime=\"${moment(post.date).format(\"YYYY-MM-DD HH:mm\")}\">${moment(post.date).format(\"YYYY-MM-DD\")}\n          </time>\n        </header>\n        <h2 class=\"bl_posts_title\">\n          ${post.title}\n        </h2>\n        <div class=\"bl_posts_summary\" data-id=${id}>\n          <p>${post.postText}</p>\n        </div>\n      </a>\n      <footer class=\"bl_posts_footer\">\n        <span class=\"bl_posts_dateago\">${moment(post.date).fromNow()}</span>\n        <ul class=\"bl_tags\">\n          ${post.hashtags}\n        </ul>\n      </footer>\n    </li>`;\n}\n\nconst html_article = (post) => {\n  return `\n    <article>\n      <header class=\"bl_text_header\">\n        <time class=\"bl_text_date\" datetime=\"${moment(post.date).format(\"YYYY-MM-DD HH:mm\")}\">${moment(post.date).format(\"YYYY-MM-DD HH:mm\")}\n        </time>\n      </header>\n      <div class=\"bl_text\">\n        <h2 class=\"bl_text_title\">${post.title}</h2>\n        ${post.text}\n      </div>\n      <footer class=\"bl_text_footer\">\n        <span class=\"bl_posts_dateago\">${moment(post.date).fromNow()}</span>\n        <ul class=\"bl_tags\">\n          ${post.hashtags}\n        </ul>\n      </footer>\n    </article>`;\n}\n\n//  ハッシュタグ（共通部品）\nconst html_hashtags = (eachTag) => {\n  return `<li><a href=\"?tag=${eachTag}\">#${eachTag}</a></li>`  // リンクにタグフィルター用のクエリ文字列を仕込む\n}\n\n// ハッシュタグ、ハイライトされたとき\nconst html_hashtags_highlighted = (eachTag) => {\n  return `<li><a href=\"?tag=${eachTag}\" class=\"hp_bold\">#${eachTag}</a></li>`  // リンクにタグフィルター用のクエリ文字列を仕込む\n}\n\n\n//# sourceURL=webpack://kyonenya.github.io/./src/template.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;