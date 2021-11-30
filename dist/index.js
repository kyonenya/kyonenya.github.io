(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",r="second",i="minute",s="hour",a="day",o="week",l="month",u="quarter",d="year",c="date",h="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},_=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},$={s:_,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+_(r,2,"0")+":"+_(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,l),s=n-i<0,a=e.clone().add(r+(s?-1:1),l);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:d,w:o,d:a,D:c,h:s,m:i,s:r,ms:n,Q:u}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",v={};v[y]=m;var g=function(t){return t instanceof w},b=function(t,e,n){var r;if(!t)return y;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(y=r),r||!n&&y},M=function(t,e){if(g(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new w(n)},x=$;x.l=b,x.i=g,x.w=function(t,e){return M(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var w=function(){function m(t){this.$L=b(t.locale,null,!0),this.parse(t)}var _=m.prototype;return _.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(x.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(f);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},_.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},_.$utils=function(){return x},_.isValid=function(){return!(this.$d.toString()===h)},_.isSame=function(t,e){var n=M(t);return this.startOf(e)<=n&&n<=this.endOf(e)},_.isAfter=function(t,e){return M(t)<this.startOf(e)},_.isBefore=function(t,e){return this.endOf(e)<M(t)},_.$g=function(t,e,n){return x.u(t)?this[e]:this.set(n,t)},_.unix=function(){return Math.floor(this.valueOf()/1e3)},_.valueOf=function(){return this.$d.getTime()},_.startOf=function(t,e){var n=this,u=!!x.u(e)||e,h=x.p(t),f=function(t,e){var r=x.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return u?r:r.endOf(a)},p=function(t,e){return x.w(n.toDate()[t].apply(n.toDate("s"),(u?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},m=this.$W,_=this.$M,$=this.$D,y="set"+(this.$u?"UTC":"");switch(h){case d:return u?f(1,0):f(31,11);case l:return u?f(1,_):f(0,_+1);case o:var v=this.$locale().weekStart||0,g=(m<v?m+7:m)-v;return f(u?$-g:$+(6-g),_);case a:case c:return p(y+"Hours",0);case s:return p(y+"Minutes",1);case i:return p(y+"Seconds",2);case r:return p(y+"Milliseconds",3);default:return this.clone()}},_.endOf=function(t){return this.startOf(t,!1)},_.$set=function(t,e){var o,u=x.p(t),h="set"+(this.$u?"UTC":""),f=(o={},o[a]=h+"Date",o[c]=h+"Date",o[l]=h+"Month",o[d]=h+"FullYear",o[s]=h+"Hours",o[i]=h+"Minutes",o[r]=h+"Seconds",o[n]=h+"Milliseconds",o)[u],p=u===a?this.$D+(e-this.$W):e;if(u===l||u===d){var m=this.clone().set(c,1);m.$d[f](p),m.init(),this.$d=m.set(c,Math.min(this.$D,m.daysInMonth())).$d}else f&&this.$d[f](p);return this.init(),this},_.set=function(t,e){return this.clone().$set(t,e)},_.get=function(t){return this[x.p(t)]()},_.add=function(n,u){var c,h=this;n=Number(n);var f=x.p(u),p=function(t){var e=M(h);return x.w(e.date(e.date()+Math.round(t*n)),h)};if(f===l)return this.set(l,this.$M+n);if(f===d)return this.set(d,this.$y+n);if(f===a)return p(1);if(f===o)return p(7);var m=(c={},c[i]=t,c[s]=e,c[r]=1e3,c)[f]||1,_=this.$d.getTime()+n*m;return x.w(_,this)},_.subtract=function(t,e){return this.add(-1*t,e)},_.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=x.z(this),s=this.$H,a=this.$m,o=this.$M,l=n.weekdays,u=n.months,d=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return x.s(s%12||12,t,"0")},f=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:x.s(o+1,2,"0"),MMM:d(n.monthsShort,o,u,3),MMMM:d(u,o),D:this.$D,DD:x.s(this.$D,2,"0"),d:String(this.$W),dd:d(n.weekdaysMin,this.$W,l,2),ddd:d(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(s),HH:x.s(s,2,"0"),h:c(1),hh:c(2),a:f(s,a,!0),A:f(s,a,!1),m:String(a),mm:x.s(a,2,"0"),s:String(this.$s),ss:x.s(this.$s,2,"0"),SSS:x.s(this.$ms,3,"0"),Z:i};return r.replace(p,(function(t,e){return e||m[t]||i.replace(":","")}))},_.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},_.diff=function(n,c,h){var f,p=x.p(c),m=M(n),_=(m.utcOffset()-this.utcOffset())*t,$=this-m,y=x.m(this,m);return y=(f={},f[d]=y/12,f[l]=y,f[u]=y/3,f[o]=($-_)/6048e5,f[a]=($-_)/864e5,f[s]=$/e,f[i]=$/t,f[r]=$/1e3,f)[p]||$,h?y:x.a(y)},_.daysInMonth=function(){return this.endOf(l).$D},_.$locale=function(){return v[this.$L]},_.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=b(t,e,!0);return r&&(n.$L=r),n},_.clone=function(){return x.w(this.$d,this)},_.toDate=function(){return new Date(this.valueOf())},_.toJSON=function(){return this.isValid()?this.toISOString():null},_.toISOString=function(){return this.$d.toISOString()},_.toString=function(){return this.$d.toUTCString()},m}(),Y=w.prototype;return M.prototype=Y,[["$ms",n],["$s",r],["$m",i],["$H",s],["$W",a],["$M",l],["$y",d],["$D",c]].forEach((function(t){Y[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),M.extend=function(t,e){return t.$i||(t(e,w,M),t.$i=!0),M},M.locale=b,M.isDayjs=g,M.unix=function(t){return M(1e3*t)},M.en=v[y],M.Ls=v,M.p={},M}()},831:function(t,e,n){t.exports=function(t){"use strict";var e=function(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}(t),n={name:"ja",weekdays:"日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),weekdaysShort:"日_月_火_水_木_金_土".split("_"),weekdaysMin:"日_月_火_水_木_金_土".split("_"),months:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),ordinal:function(t){return t+"日"},formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY/MM/DD",LL:"YYYY年M月D日",LLL:"YYYY年M月D日 HH:mm",LLLL:"YYYY年M月D日 dddd HH:mm",l:"YYYY/MM/DD",ll:"YYYY年M月D日",lll:"YYYY年M月D日 HH:mm",llll:"YYYY年M月D日(ddd) HH:mm"},meridiem:function(t){return t<12?"午前":"午後"},relativeTime:{future:"%s後",past:"%s前",s:"数秒",m:"1分",mm:"%d分",h:"1時間",hh:"%d時間",d:"1日",dd:"%d日",M:"1ヶ月",MM:"%dヶ月",y:"1年",yy:"%d年"}};return e.default.locale(n,null,!0),n}(n(484))},850:function(t){t.exports=function(){"use strict";return function(t,e,n){var r=e.prototype,i=function(t){var e=t.date,r=t.utc;return Array.isArray(e)?r?e.length?new Date(Date.UTC.apply(null,e)):new Date:1===e.length?n(String(e[0])).toDate():new(Function.prototype.bind.apply(Date,[null].concat(e))):e},s=r.parse;r.parse=function(t){t.date=i.bind(this)(t),s.bind(this)(t)}}}()},110:function(t){t.exports=function(){"use strict";return function(t,e,n){t=t||{};var r=e.prototype,i={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function s(t,e,n,i){return r.fromToBase(t,e,n,i)}n.en.relativeTime=i,r.fromToBase=function(e,r,s,a,o){for(var l,u,d,c=s.$locale().relativeTime||i,h=t.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],f=h.length,p=0;p<f;p+=1){var m=h[p];m.d&&(l=a?n(e).diff(s,m.d,!0):s.diff(e,m.d,!0));var _=(t.rounding||Math.round)(Math.abs(l));if(d=l>0,_<=m.r||!m.r){_<=1&&p>0&&(m=h[p-1]);var $=c[m.l];o&&(_=o(""+_)),u="string"==typeof $?$.replace("%d",_):$(_,r,m.l,d);break}}if(r)return u;var y=d?c.future:c.past;return"function"==typeof y?y(u):y.replace("%s",u)},r.to=function(t,e){return s(t,e,this,!0)},r.from=function(t,e){return s(t,e,this)};var a=function(t){return t.$u?n.utc():n()};r.toNow=function(t){return this.to(a(this),t)},r.fromNow=function(t){return this.from(a(this),t)}}}()}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var s=e[r]={exports:{}};return t[r].call(s.exports,s,s.exports,n),s.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";var t=n(484),e=n.n(t),r=n(850),i=n.n(r),s=n(110),a=n.n(s);n(831),e().extend(i()),e().extend(a()),e().locale("ja");const o=e(),l=t=>`<li><a href="?tag=${t}">#${t}</a></li>`,u=(t,e=null,n={})=>`\n  <li\n    class="\n      bl_posts_item\n      ${n.isMatched||0===Object.keys(n).length?"":" hp_hidden"}"\n    data-id=${t.id}\n  >\n    <a href="?id=${t.id}">\n      <header class="bl_posts_header">\n        <time class="bl_posts_date" \n          datetime="${o(t.date).format("YYYY-MM-DD HH:mm")}"\n        >\n          ${o(t.date).format("YYYY-MM-DD")}\n        </time>\n      </header>\n      <h2 class="bl_posts_title">\n        ${t.title}\n      </h2>\n      <div class="bl_posts_summary" data-id=${t.id}>\n        <p>\n          ${n.isMatched?n.summary:`${t.plainText.substr(0,125)}…`}\n        </p>\n      </div>\n    </a>\n    <footer class="bl_posts_footer">\n      <span class="bl_posts_dateago">${o(t.date).fromNow()}</span>\n      <ul class="bl_tags">\n        ${t.tags.map((t=>t===e?(t=>`<li><a href="?tag=${t}" class="hp_bold">#${t}</a></li>`)(t):l(t))).join("")}\n      </ul>\n    </footer>\n  </li>`,d=t=>`\n  <article>\n    <header class="bl_text_header">\n      <time class="bl_text_date"\n        datetime="${o(t.date).format("YYYY-MM-DD HH:mm")}"\n      >\n        ${o(t.date).format("YYYY-MM-DD HH:mm")}\n      </time>\n    </header>\n    <div class="bl_text">\n      <h1 class="bl_text_title">${t.title}</h1>\n      ${t.text}\n    </div>\n    <footer class="bl_text_footer">\n      <span class="bl_posts_dateago">${o(t.date).fromNow()}</span>\n      <ul class="bl_tags">\n        ${t.tags.map((t=>l(t))).join("")}\n      </ul>\n    </footer>\n  </article>`,c=t=>`\n  ${t.beforeEllipsis}${t.beforeText}\n  <span class="hp_highlight">\n    ${t.word}\n  </span>\n  ${t.afterText}${t.afterEllipsis}`,h=document.getElementById("root"),f=document.querySelector(".el_archive_header"),p=document.querySelector(".el_logo_suffix"),m=document.querySelector("meta[name=description]"),_=(t,e)=>{var n;document.querySelectorAll('a[href^="?"]').forEach((t=>{t.onclick=n=>{n.preventDefault(),window.history.pushState(t.href,"",t.href),e()}})),n=t.body,h.innerHTML=n,document.title!==t.title&&(document.title=t.title),p.innerText!==t.suffix&&(p.innerText=t.suffix),f.innerText!==t.archiveHeader&&(f.innerText=t.archiveHeader),""!==t.description&&(m.content=t.description)},$=t=>{var e,n;const r=new URLSearchParams(window.location.search),i=r.get("id"),s=r.get("tag");return window.scrollTo(0,0),null===(e=document.querySelector(".el_search_input"))||void 0===e||e.classList.remove("hp_hidden"),i&&Number.isFinite(Number(i))?(null===(n=document.querySelector(".el_search_input"))||void 0===n||n.classList.add("hp_hidden"),_((a=t[t.length-parseInt(i,10)],{body:d(a),suffix:` :: ${a.id}`,description:`${a.plainText.substr(0,110)}…`,title:a.title?`${a.title}｜placet experiri :: ${a.id}`:`placet experiri :: ${a.id}`,archiveHeader:""}),(()=>$(t)))):""!==window.location.hash?_(((t,e,n=null)=>({body:`\n    <ul class="bl_posts">\n      ${t.map((r=>null===n||r.tags.includes(n)?u(t[r.index],n,((t,e)=>{const n=30-t.length,r=e.plainText.indexOf(t),i=r-20,s=r+t.length,a=-1!==r||e.title.includes(t);return""===t?{}:-1===r?{isMatched:a,summary:`${e.plainText.substr(0,50)}…`}:i<=0?{isMatched:a,summary:c({beforeEllipsis:"",beforeText:e.plainText.substr(0,r),word:e.plainText.substr(r,t.length),afterText:e.plainText.substr(s,50-s),afterEllipsis:"…"})}:{isMatched:a,summary:c({beforeEllipsis:"…",beforeText:e.plainText.substr(i,20),word:e.plainText.substr(r,t.length),afterText:e.plainText.substr(s,n),afterEllipsis:i+50<e.plainText.length?"…":""})}})(e,r)):"")).join("")}\n    </ul>`,suffix:"",description:"",title:`「${e}」｜placet experiri`,archiveHeader:`「${e}」`}))(t,decodeURIComponent(window.location.hash.slice(1)),s),(()=>$(t))):_(null!=s?((t,e)=>({body:`\n    <ul class="bl_posts">\n      ${t.map((n=>null===e||n.tags.includes(e)?u(t[n.index],e):"")).join("")}\n    </ul>`,suffix:"",description:"",title:`#${e}｜placet experiri`,archiveHeader:`#${e}`}))(t,s):(t=>({body:`\n    <ul class="bl_posts">\n      ${t.filter((t=>o(t.date).isBefore(o()))).map((e=>u(t[e.index]))).join("")}\n    </ul>`,suffix:"",description:"",title:"placet experiri",archiveHeader:""}))(t),(()=>$(t)));var a},y=t=>{class n extends HTMLElement{constructor(){super(),this.id=this.getAttribute("id"),this.innerHTML=`\n        <div class="bl_blogcard">\n          <a href="?id=${this.id}">\n            <header class="bl_blogcard_header">\n              <div class="bl_blogcard_icon"></div>\n              <div class="bl_blogcard_logo">placet experiri</span>\n              <span class="bl_blogcard_suffix"> :: ${this.id}</span>\n            </header>\n            <div class="bl_blogcard_title">\n              ${t[t.length-parseInt(this.id,10)].title}\n            </div>\n            <p class="bl_blogcard_text">\n              ${t[t.length-parseInt(this.id,10)].plainText.substr(0,56)}…\n            </p>\n            <footer class="bl_blogcard_footer">\n              <span class="bl_blogcard_time">\n                ${e()(t[t.length-parseInt(this.id,10)].date).format("YYYY-MM-DD")}\n              </span>\n              <ul class="bl_blogcard_tags">\n                ${t[t.length-parseInt(this.id,10)].tags.map((t=>`<li>#${t}</li>`)).join("")}\n              </ul>\n            </footer>\n          </a>\n        </div>`}}window.customElements.define("blog-card",n)};const v="2021-11-27",g=document.getElementById("about");const b=document.querySelector(".el_search_form"),M=document.querySelector(".el_search_input");!function(){var t,e,n,r;t=this,e=void 0,r=function*(){var t,e,n,r,i;(t=>{$(t),window.addEventListener("popstate",(()=>$(t))),b.addEventListener("submit",(e=>{e.preventDefault(),window.history.pushState(`${window.location.search}#${M.value}`,"",`${window.location.search}#${M.value}`),$(t)})),function(t,e,n){const r=o("2021-11-27").add(30,"day");return o(void 0).isBefore(r)}()&&(null==g||g.addEventListener("click",(()=>{localStorage.setItem(v,"true")})),"true"!==localStorage.getItem(v)&&(null==g||g.classList.add("el_badge"))),y(t)})((t=yield(e=void 0,n=void 0,r=void 0,i=function*(){const t=yield fetch("./data.json");if(!t.ok)throw new Error(t.statusText);return yield t.json()},new(r||(r=Promise))((function(t,s){function a(t){try{l(i.next(t))}catch(t){s(t)}}function o(t){try{l(i.throw(t))}catch(t){s(t)}}function l(e){var n;e.done?t(e.value):(n=e.value,n instanceof r?n:new r((function(t){t(n)}))).then(a,o)}l((i=i.apply(e,n||[])).next())})))).map(((e,n)=>{const r=Object.assign({},e);return r.id=t.length-n,r.index=n,r.text=r.text.replace(/——/g,"──"),r.text=r.text.replace(/　/g," "),r.title=r.title.replace(/——/g,"──"),r.plainText=r.text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,""),r})))},new((n=void 0)||(n=Promise))((function(i,s){function a(t){try{l(r.next(t))}catch(t){s(t)}}function o(t){try{l(r.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,o)}l((r=r.apply(t,e||[])).next())}))}()})()})();