(()=>{"use strict";var e={636:(e,t)=>{t.h8=t.Kx=t.O6=t.o=void 0,t.o=e=>(t,n)=>{if(void 0===n)return;const{maxLength:i=50,beforeLength:o=20}=null!=e?e:{},r=t.indexOf(n);if(-1===r)return;const s=r-o<=0?0:r-o,l=r+n.length,a=s+i;return{isBeforeEllipsed:0!==s,beforeText:t.substring(s,r),keyword:t.substring(r,l),afterText:t.substring(l,a),isAfterEllipsed:a<t.length}},t.O6=(e,n,i)=>(0,t.o)(i)(e,n),t.Kx=e=>(n,i)=>{const o=(0,t.O6)(n,i,e);if(void 0===o)return;const{ellipsisToken:r="...",keywordModifier:s=(e=>e)}=null!=e?e:{};return(o.isBeforeEllipsed?r:"")+o.beforeText+s(o.keyword)+o.afterText+(o.isAfterEllipsed?r:"")},t.h8=(e,n,i)=>(0,t.Kx)(i)(e,n)}},t={};function n(i){var o=t[i];if(void 0!==o)return o.exports;var r=t[i]={exports:{}};return e[i](r,r.exports,n),r.exports}(()=>{const e=e=>`#${e}`,t=(t,n)=>`\n  <li>\n    <a href="?tag=${t}" class="hp_unsetLink">\n      ${t===n?`<b>${e(t)}</b>`:e(t)}\n    </a>\n  </li>`,i=(e,n)=>`\n  <ul class="el_tagList">\n    ${e.map((e=>t(e,n))).join("")}\n  </ul>\n`,o=36e5,r=24*o,s={second:1e3,minute:6e4,hour:o,day:r,month:2592e6,year:31104e6},l=Object.keys(s);function a(e,t){return e/s[t]}const c=new Intl.DateTimeFormat("ja-JP",{dateStyle:"short"}),d=new Intl.DateTimeFormat("ja-JP",{dateStyle:"short",timeStyle:"short"}),u=new Intl.RelativeTimeFormat("ja-JP",{style:"narrow"});function p(e){return c.format(e).replaceAll("/","-")}function f(e,t){return e.getTime()<t.getTime()}const h={second:45,minute:45,hour:22,day:26,month:11,year:1/0};function m(e){const t=e.getTime()-(new Date).getTime(),n=l.find((e=>Math.abs(a(t,e))<h[e]));return n?u.format(Math.round(a(t,n)),n):""}const g=window.matchMedia("(max-width: 559px)");let b=g.matches;function v(){return{isMobile:b}}const _=e=>`\n  <p class="bl_blogCard_summary hp_alignJustify">\n    ${e.substring(0,74)}…\n  </p>\n`,y=e=>`\n  <p class="bl_blogCard_summary hp_ellipsis433">\n    ${e.substring(0,200)}\n  </p>\n`;function $(e){return/localhost:\d+/.test(e)}const w="2023-01-22";function x(e){return/\+\d\d/.test(e)?new Date(e):new Date(`${e}+09:00`)}function A(e,t){const n=new URLSearchParams(e),i=n.get("id"),o=n.get("tag");return{id:i?parseInt(i,10):void 0,tag:null!=o?o:void 0,keyword:void 0===t||""===t?void 0:decodeURIComponent(t.replace("#",""))}}const L=e=>{return`\n  <section class="ly_container">\n    <article>\n      <header class="bl_text_header">\n        <time class="bl_text_date">\n          ${n=e.createdAt,d.format(n).replaceAll("/","-")}\n        </time>\n      </header>\n      <div class="bl_text">\n        ${e.title?`<h1>${e.title}</h1>`:""}\n        ${(e=>e.replaceAll("——","──").replaceAll(/([！？])　/g,((e,t)=>`${t} `)).replaceAll(/<p>([「『（].+?)<\/p>/g,((e,t)=>`<p style="text-indent: 0">${t}</p>`)))((t=e.text,t.replaceAll(/<a href=['"]([^?].+?)['"](.*?)>(.+?)<\/a>/g,((e,t,n,i)=>(e=>{const{href:t,content:n,attributes:i=""}=e;return`<a href="${t}" target="_blank" rel="noopener" ${i}>${n}</a>`})({href:t,attributes:n,content:i})))))}\n      </div>\n      <footer class="bl_text_footer">\n        <span class="bl_posts_dateago">\n          ${m(e.createdAt)}\n        </span>\n        ${i(e.tags)}\n      </footer>\n    </article>\n  </section>`;var t,n};var k=n(636);const T=e=>`<span class="hp_highlight">${e}</span>`,S=e=>`\n  <div class="bl_postList_summary">\n    <p class="hp_alignJustify">\n      ${e.substring(0,134)+"…"}\n    </p>\n  </div>`,E=e=>`\n  <div class="bl_postList_summary">\n    <p class="hp_ellipsis654">\n      ${e.substring(0,250)}\n    </p>\n  </div>`,j=e=>{const{post:t,tag:n,keyword:o}=e,{isMobile:r}=v(),s=(0,k.h8)(t.plainText,o,{maxLength:200,beforeLength:48,keywordModifier:T});return`\n    <li\n      class="bl_postList_item"\n      style="display: ${!o||s||t.title&&-1!==t.title.indexOf(o)?"block":"none"}"\n    >\n      <a href="?id=${t.id}">\n        <header class="bl_postList_header">\n          <time class="bl_postList_date">\n            ${p(t.createdAt)}\n          </time>\n        </header>\n        ${t.title?((e,t)=>`\n  <h2 class="bl_postList_title">\n    ${((e,t)=>t?e.replace(t,T(t)):e)(e,t)}\n  </h2>`)(t.title,o):""}\n        ${s?(e=>`\n  <div class="bl_postList_summary">\n    <p class="hp_ellipsis433">\n      ${e}\n    </p>\n  </div>`)(s):(r?S:E)(t.plainText)}\n      </a>\n      <footer class="bl_postList_footer">\n        <span class="bl_postList_dateago">\n          ${m(t.createdAt)}\n        </span>\n        ${i(t.tags,n)}\n      </footer>\n    </li>`},D=(e,t)=>`\n  <section class="ly_container">\n    ${t?`<h2 class="el_archiveHeader">${t}</h2>`:""}\n    <ul class="bl_postList">\n      ${e}\n    </ul>\n  </section>`,q=e=>D(e.map(((t,n)=>j({post:e[n]}))).reverse().join("")),C=(e,t)=>D(e.map(((n,i)=>n.tags.includes(t)?j({post:e[i],tag:t}):"")).reverse().join(""),`#${t}`),I=(e,t,n)=>D(e.map(((i,o)=>void 0===n||i.tags.includes(n)?j({post:e[o],tag:n,keyword:t}):"")).reverse().join(""),`「${t}」`),M="https://kyonenya.github.io/";function O(e){var t;const n=document.querySelector(".el_logo_suffix"),i=document.querySelector("meta[name=description]");var o;if(o=e.body,document.getElementById("root").innerHTML=o,$(window.location.href)&&document.querySelectorAll(`a[href^="${M}"]`).forEach((e=>{e.href="/"+e.href.replace(M,"")})),document.title=e.title,n.innerText=null!==(t=e.suffix)&&void 0!==t?t:"",e.description&&(i.content=e.description),e.href){document.querySelectorAll('link[rel="canonical"]').forEach((e=>e.remove()));const t=document.createElement("link");t.rel="canonical",t.href=e.href,document.head.appendChild(t)}}const P=document.querySelector(".el_search_input");function B(e){const{id:t,tag:n,keyword:i}=A(window.location.search,window.location.hash),o=$(window.location.href)?e:function(e){return e.filter((e=>f(e.createdAt,new Date)))}(e);if(window.scrollTo(0,0),P&&(P.style.display="block"),void 0!==t){const e=o.find((e=>e.id===t));if(!e)return;(e=>{O({body:L(e),title:e.title?`${e.title}｜placet experiri :: ${e.id}`:`placet experiri :: ${e.id}`,suffix:` :: ${e.id}`,description:`${e.plainText.substring(0,110)}…`,href:`${M}?id=${e.id}`}),P&&(P.style.display="none")})(e)}else void 0!==i?((e,t,n)=>{O({body:I(e,t,n),title:`「${t}」｜placet experiri`})})(o,i,n):void 0!==n?((e,t)=>{O({body:C(e,t),title:`#${t}｜placet experiri`,href:`${M}?tag=${t}`})})(o,n):(e=>{O({body:q(e),title:"placet experiri",href:M})})(o);return(e=>{document.querySelectorAll('a[href^="?"]').forEach((t=>{t.onclick=n=>{n.preventDefault(),window.history.pushState(void 0,"",t.href),t.hash||B(e)}})),document.querySelectorAll('a[href^="#"]').forEach((e=>{e.onclick=t=>{t.preventDefault(),window.history.pushState(void 0,"",e.href);const n=document.querySelector(e.hash);n&&window.scrollTo({top:window.pageYOffset+n.getBoundingClientRect().top,behavior:"smooth"})}}))})(o)}!function(){var e,n,i,o;e=this,n=void 0,o=function*(){const e=function(e){return[...e].reverse().map((e=>Object.assign(Object.assign({},e),{title:null===e.title||""===e.title?void 0:e.title,plainText:e.text.replaceAll(/<blockquote>(.+?)<\/blockquote>/g,((e,t)=>`> ${t}`)).replaceAll(/<h2>(.+?)<\/h2>/g,((e,t)=>`## ${t}`)).replaceAll(/——/g,"──").replaceAll(/<("[^"]*"|'[^']*'|[^'">])*>/g,""),createdAt:x(e.createdAt),modifiedAt:x(e.modifiedAt)})))}(yield function(e){return t=this,n=void 0,o=function*(){const e=yield fetch("./posts.json");if(!e.ok)throw new Error(e.statusText);return yield e.json()},new((i=void 0)||(i=Promise))((function(e,r){function s(e){try{a(o.next(e))}catch(e){r(e)}}function l(e){try{a(o.throw(e))}catch(e){r(e)}}function a(t){var n;t.done?e(t.value):(n=t.value,n instanceof i?n:new i((function(e){e(n)}))).then(s,l)}a((o=o.apply(t,n||[])).next())}));var t,n,i,o}());var n;B(e),function(e){window.addEventListener("popstate",(()=>e()))}(n=()=>B(e)),function(e){const t=document.querySelector(".el_search_form"),n=document.querySelector(".el_search_input");null==t||t.addEventListener("submit",(t=>{t.preventDefault(),window.history.pushState(A(window.location.search,"#{searchInputElement.value}"),"",`${window.location.search}#${n.value}`),e()}))}(n),function(e){g.addListener((t=>{b=t.matches,e()}))}(n),function(e){class n extends HTMLElement{constructor(){super();const n=this.getAttribute("id");if(!n)return;const i=e.find((e=>e.id===parseInt(n,10)));i&&(this.innerHTML=(e=>{const{isMobile:n}=v();return`\n    <div class="bl_blogCard">\n      <a href="?id=${e.id}" class="hp_unsetLink">\n        <header>\n          <div class="bl_blogCard_icon"></div>\n          <span class="bl_blogCard_logo">placet experiri</span>\n          <span class="bl_blogCard_suffix">:: ${e.id}</span>\n        </header>\n        ${e.title?`<div class="bl_blogCard_title">${e.title}</div>`:""}\n        ${(n?_:y)(e.plainText)}\n        <footer>\n          <span>${p(e.createdAt)}</span>\n          <ul class="bl_blogCard_tagList">\n            ${e.tags.map((e=>t(e))).join("")}\n          </ul>\n        </footer>\n      </a>\n    </div>`})(i))}}window.customElements.define("blog-card",n)}(e),function(){const e=document.getElementById("about");(function(e,t){const n=e;return n.setDate(e.getDate()+30),f(new Date,n)})(new Date(w))&&(null==e||e.addEventListener("click",(()=>{localStorage.setItem(w,"true")})),"true"!==localStorage.getItem(w)&&(null==e||e.classList.add("el_badge")))}()},new((i=void 0)||(i=Promise))((function(t,r){function s(e){try{a(o.next(e))}catch(e){r(e)}}function l(e){try{a(o.throw(e))}catch(e){r(e)}}function a(e){var n;e.done?t(e.value):(n=e.value,n instanceof i?n:new i((function(e){e(n)}))).then(s,l)}a((o=o.apply(e,n||[])).next())}))}()})()})();