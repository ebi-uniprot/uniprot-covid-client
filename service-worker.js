!function(e){var t={};function s(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/uniprot-covid-client/",s(s.s=6)}([function(e,t,s){"use strict";try{self["workbox:precaching:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:core:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:routing:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:strategies:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:expiration:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:cacheable-response:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";s.r(t);s(0);const n=[],a={get:()=>n,add(e){n.push(...e)}};s(1);const r={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},i=e=>[r.prefix,e,r.suffix].filter(e=>e&&e.length>0).join("-"),c=e=>e||i(r.precache),o=e=>e||i(r.runtime),h=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),""),u=(e,...t)=>{let s=e;return t.length>0&&(s+=" :: "+JSON.stringify(t)),s};class l extends Error{constructor(e,t){super(u(e,t)),this.name=e,this.details=t}}const d=new Set;const p=(e,t)=>e.filter(e=>t in e),f=async({request:e,mode:t,plugins:s=[]})=>{const n=p(s,"cacheKeyWillBeUsed");let a=e;for(const e of n)a=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:a}),"string"==typeof a&&(a=new Request(a));return a},g=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:a=[]})=>{const r=await self.caches.open(e),i=await f({plugins:a,request:t,mode:"read"});let c=await r.match(i,n);for(const t of a)if("cachedResponseWillBeUsed"in t){const a=t.cachedResponseWillBeUsed;c=await a.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:c,request:i})}return c},w=async({cacheName:e,request:t,response:s,event:n,plugins:a=[],matchOptions:r})=>{const i=await f({plugins:a,request:t,mode:"write"});if(!s)throw new l("cache-put-with-no-response",{url:h(i.url)});const c=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let a=t,r=!1;for(const t of n)if("cacheWillUpdate"in t){r=!0;const n=t.cacheWillUpdate;if(a=await n.call(t,{request:e,response:a,event:s}),!a)break}return r||(a=a&&200===a.status?a:void 0),a||null})({event:n,plugins:a,response:s,request:i});if(!c)return void 0;const o=await self.caches.open(e),u=p(a,"cacheDidUpdate"),w=u.length>0?await g({cacheName:e,matchOptions:r,request:i}):null;try{await o.put(i,c)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of d)await e()}(),e}for(const t of u)await t.cacheDidUpdate.call(t,{cacheName:e,event:n,oldResponse:w,newResponse:c,request:i})},m=g,_=async({request:e,fetchOptions:t,event:s,plugins:n=[]})=>{if("string"==typeof e&&(e=new Request(e)),s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const a=p(n,"fetchDidFail"),r=a.length>0?e.clone():null;try{for(const t of n)if("requestWillFetch"in t){const n=t.requestWillFetch,a=e.clone();e=await n.call(t,{request:a,event:s})}}catch(e){throw new l("plugin-error-request-will-fetch",{thrownError:e})}const i=e.clone();try{let a;a="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of n)"fetchDidSucceed"in e&&(a=await e.fetchDidSucceed.call(e,{event:s,request:i,response:a}));return a}catch(e){0;for(const t of a)await t.fetchDidFail.call(t,{error:e,event:s,originalRequest:r.clone(),request:i.clone()});throw e}};let y;async function v(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},a=t?t(n):n,r=function(){if(void 0===y){const e=new Response("");if("body"in e)try{new Response(e.body),y=!0}catch(e){y=!1}y=!1}return y}()?s.body:await s.blob();return new Response(r,a)}function x(e){if(!e)throw new l("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:s}=e;if(!s)throw new l("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(s,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(s,location.href),a=new URL(s,location.href);return n.searchParams.set("__WB_REVISION__",t),{cacheKey:n.href,url:a.href}}class R{constructor(e){this._cacheName=c(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const s of e){"string"==typeof s?t.push(s):s&&void 0===s.revision&&t.push(s.url);const{cacheKey:e,url:n}=x(s),a="string"!=typeof s&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new l("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof s&&s.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==s.integrity)throw new l("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,s.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,a),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],a=await self.caches.open(this._cacheName),r=await a.keys(),i=new Set(r.map(e=>e.url));for(const[e,t]of this._urlsToCacheKeys)i.has(t)?n.push(e):s.push({cacheKey:t,url:e});const c=s.map(({cacheKey:s,url:n})=>{const a=this._cacheKeysToIntegrities.get(s),r=this._urlsToCacheModes.get(n);return this._addURLToCache({cacheKey:s,cacheMode:r,event:e,integrity:a,plugins:t,url:n})});return await Promise.all(c),{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}async _addURLToCache({cacheKey:e,url:t,cacheMode:s,event:n,plugins:a,integrity:r}){const i=new Request(t,{integrity:r,cache:s,credentials:"same-origin"});let c,o=await _({event:n,plugins:a,request:i});for(const e of a||[])"cacheWillUpdate"in e&&(c=e);if(!(c?await c.cacheWillUpdate({event:n,request:i,response:o}):o.status<400))throw new l("bad-precaching-response",{url:t,status:o.status});o.redirected&&(o=await v(o)),await w({event:n,plugins:a,response:o,request:e===t?i:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this._cacheName)).match(s)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new l("missing-precache-entry",{cacheName:this._cacheName,url:t instanceof Request?t.url:t})}catch(s){if(e)return fetch(t);throw s}}}createHandlerBoundToURL(e,t=!0){if(!this.getCacheKeyForURL(e))throw new l("non-precached-url",{url:e});const s=this.createHandler(t),n=new Request(e);return()=>s({request:n})}}let b;const q=()=>(b||(b=new R),b);const U=(e,t)=>{const s=q().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:a}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(n){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:r});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let N=!1;function E(e){N||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const a=c();self.addEventListener("fetch",r=>{const i=U(r.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!i)return void 0;let c=self.caches.open(a).then(e=>e.match(i)).then(e=>e||fetch(i));r.respondWith(c)})})(e),N=!0)}const T=e=>{const t=q(),s=a.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},O=e=>{const t=q();e.waitUntil(t.activate())};s(2);const L=e=>e&&"object"==typeof e?e:{handle:e};class C{constructor(e,t,s="GET"){this.handler=L(t),this.match=e,this.method=s}}class K extends C{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}class M{constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const{params:n,route:a}=this.findMatchingRoute({url:s,request:e,event:t});let r=a&&a.handler;if(!r&&this._defaultHandler&&(r=this._defaultHandler),!r)return void 0;let i;try{i=r.handle({url:s,request:e,event:t,params:n})}catch(e){i=Promise.reject(e)}return i instanceof Promise&&this._catchHandler&&(i=i.catch(n=>this._catchHandler.handle({url:s,request:e,event:t}))),i}findMatchingRoute({url:e,request:t,event:s}){const n=this._routes.get(t.method)||[];for(const a of n){let n;const r=a.match({url:e,request:t,event:s});if(r)return n=r,(Array.isArray(r)&&0===r.length||r.constructor===Object&&0===Object.keys(r).length||"boolean"==typeof r)&&(n=void 0),{route:a,params:n}}return{}}setDefaultHandler(e){this._defaultHandler=L(e)}setCatchHandler(e){this._catchHandler=L(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new l("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new l("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let S;const A=()=>(S||(S=new M,S.addFetchListener(),S.addCacheListener()),S);function k(e,t,s){let n;if("string"==typeof e){const a=new URL(e,location.href);0,n=new C(({url:e})=>e.href===a.href,t,s)}else if(e instanceof RegExp)n=new K(e,t,s);else if("function"==typeof e)n=new C(e,t,s);else{if(!(e instanceof C))throw new l("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}return A().registerRoute(n),n}s(3);class P{constructor(e={}){this._cacheName=o(e.cacheName),this._plugins=e.plugins||[],this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){"string"==typeof t&&(t=new Request(t));let s,n=await m({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(n)0;else{0;try{n=await this._getFromNetwork(t,e)}catch(e){s=e}0}if(!n)throw new l("no-response",{url:t.url,error:s});return n}async _getFromNetwork(e,t){const s=await _({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),n=s.clone(),a=w({cacheName:this._cacheName,request:e,response:n,event:t,plugins:this._plugins});if(t)try{t.waitUntil(a)}catch(e){0}return s}}const j={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class D{constructor(e={}){if(this._cacheName=o(e.cacheName),this._plugins=e.plugins||[],e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this._plugins=t?e.plugins:[j,...e.plugins]}else this._plugins=[j];this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){"string"==typeof t&&(t=new Request(t));const s=this._getFromNetwork({request:t,event:e});let n,a=await m({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(a){if(e)try{e.waitUntil(s)}catch(n){0}}else{0;try{a=await s}catch(e){n=e}}if(!a)throw new l("no-response",{url:t.url,error:n});return a}async _getFromNetwork({request:e,event:t}){const s=await _({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),n=w({cacheName:this._cacheName,request:e,response:s.clone(),event:t,plugins:this._plugins});if(t)try{t.waitUntil(n)}catch(e){0}return s}}function I(e){e.then(()=>{})}class W{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this._db=null,this._name=e,this._version=t,this._onupgradeneeded=s,this._onversionchange=n||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this._name,this._version);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this._onupgradeneeded&&this._onupgradeneeded(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:a,includeKeys:r=!1}={}){return await this.transaction([e],"readonly",(i,c)=>{const o=i.objectStore(e),h=t?o.index(t):o,u=[],l=h.openCursor(s,n);l.onsuccess=()=>{const e=l.result;e?(u.push(r?e:e.value),a&&u.length>=a?c(u):e.continue()):c(u)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,a)=>{const r=this._db.transaction(e,t);r.onabort=()=>a(r.error),r.oncomplete=()=>n(),s(r,e=>n(e))})}async _call(e,t,s,...n){return await this.transaction([t],s,(s,a)=>{const r=s.objectStore(t),i=r[e].apply(r,n);i.onsuccess=()=>a(i.result)})}close(){this._db&&(this._db.close(),this._db=null)}}W.prototype.OPEN_TIMEOUT=2e3;const F={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(F))for(const s of t)s in IDBObjectStore.prototype&&(W.prototype[s]=async function(t,...n){return await this._call(s,t,e,...n)});s(4);const H=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class B{constructor(e){this._cacheName=e,this._db=new W("workbox-expiration",1,{onupgradeneeded:e=>this._handleUpgrade(e)})}_handleUpgrade(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}})})(this._cacheName)}async setTimestamp(e,t){const s={url:e=H(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)};await this._db.put("cache-entries",s)}async getTimestamp(e){return(await this._db.get("cache-entries",this._getId(e))).timestamp}async expireEntries(e,t){const s=await this._db.transaction("cache-entries","readwrite",(s,n)=>{const a=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),r=[];let i=0;a.onsuccess=()=>{const s=a.result;if(s){const n=s.value;n.cacheName===this._cacheName&&(e&&n.timestamp<e||t&&i>=t?r.push(s.value):i++),s.continue()}else n(r)}}),n=[];for(const e of s)await this._db.delete("cache-entries",e.id),n.push(e.url);return n}_getId(e){return this._cacheName+"|"+H(e)}}class Q{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._cacheName=e,this._timestampModel=new B(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const e of t)await s.delete(e);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,I(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){return await this._timestampModel.getTimestamp(e)<Date.now()-1e3*this._maxAgeSeconds}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}class ${constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const a=this._isResponseDateFresh(n),r=this._getCacheExpiration(s);I(r.expireEntries());const i=r.updateTimestamp(t.url);if(e)try{e.waitUntil(i)}catch(e){0}return a?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),d.add(t))}_getCacheExpiration(e){if(e===o())throw new l("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new Q(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);return null===t||t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}s(5);class G{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some(t=>e.headers.get(t)===this._headers[t])),t}}class J{constructor(e){this.cacheWillUpdate=async({response:e})=>this._cacheableResponse.isResponseCacheable(e)?e:null,this._cacheableResponse=new G(e)}}var V,z,X=/^https:\/\/fonts\.googleapis\.com/;self.addEventListener("activate",e=>{const t=c();e.waitUntil((async(e,t="-precache-")=>{const s=(await self.caches.keys()).filter(s=>s.includes(t)&&s.includes(self.registration.scope)&&s!==e);return await Promise.all(s.map(e=>self.caches.delete(e))),s})(t).then(e=>{}))}),function(e){q().addToCacheList(e),e.length>0&&(self.addEventListener("install",T),self.addEventListener("activate",O))}([{'revision':null,'url':'/uniprot-covid-client/0.b2a436.css'},{'revision':'e8c3472b2da9ad0b671a7622f333096a','url':'/uniprot-covid-client/0.b2a436.css.map'},{'revision':null,'url':'/uniprot-covid-client/10.f48bf3.css'},{'revision':'c5eb2537910464c0acee32b5d3317c4c','url':'/uniprot-covid-client/10.f48bf3.css.map'},{'revision':null,'url':'/uniprot-covid-client/11.d8f58a.css'},{'revision':'8f9504a2248d73626c6dbc68624672c3','url':'/uniprot-covid-client/11.d8f58a.css.map'},{'revision':null,'url':'/uniprot-covid-client/12.42e2c1.css'},{'revision':'b9e3dae90d2b31a6d5ba8eadc3ac9451','url':'/uniprot-covid-client/12.42e2c1.css.map'},{'revision':null,'url':'/uniprot-covid-client/14.d8f58a.css'},{'revision':'4a438aafd97f4460bf5fa3fea9dd0064','url':'/uniprot-covid-client/14.d8f58a.css.map'},{'revision':null,'url':'/uniprot-covid-client/2.271a70.css'},{'revision':'efd5cd6064136e5f2cc0106af4a0c2f8','url':'/uniprot-covid-client/2.271a70.css.map'},{'revision':null,'url':'/uniprot-covid-client/3.c74c73.css'},{'revision':'f2395a09b0107e1a286f2e8a2c581682','url':'/uniprot-covid-client/3.c74c73.css.map'},{'revision':null,'url':'/uniprot-covid-client/4.840636.css'},{'revision':'99a2c7775929cbf52fe8e10a0f67e779','url':'/uniprot-covid-client/4.840636.css.map'},{'revision':'74a5aea7ff4bc2927f9fca7dbdca0625','url':'/uniprot-covid-client/404.html'},{'revision':null,'url':'/uniprot-covid-client/5.af3006.css'},{'revision':'241da55204644345b9767b8babeb8dca','url':'/uniprot-covid-client/5.af3006.css.map'},{'revision':null,'url':'/uniprot-covid-client/6.0162cc.css'},{'revision':'4868c2f8cf613675f1b51801b6b1571e','url':'/uniprot-covid-client/6.0162cc.css.map'},{'revision':null,'url':'/uniprot-covid-client/9.d8f58a.css'},{'revision':'de923e0cb28f6dfbf2aff355c4dab5e9','url':'/uniprot-covid-client/9.d8f58a.css.map'},{'revision':null,'url':'/uniprot-covid-client/app.25263f.js'},{'revision':'f24b1690bf0c6cb39760ab70575724d0','url':'/uniprot-covid-client/app.25263f.js.map'},{'revision':null,'url':'/uniprot-covid-client/contact.53d321.js'},{'revision':'88c16cd7ec96c2c761015dd2203b4c09','url':'/uniprot-covid-client/contact.53d321.js.map'},{'revision':null,'url':'/uniprot-covid-client/customise-table.1b702e.js'},{'revision':'49fdd4b372026bff779908a8ad4af330','url':'/uniprot-covid-client/customise-table.1b702e.js.map'},{'revision':null,'url':'/uniprot-covid-client/default-vendors.fb5d4a.js'},{'revision':'b2d64f09b834b0a00c5a1f7edef53566','url':'/uniprot-covid-client/default-vendors.fb5d4a.js.map'},{'revision':null,'url':'/uniprot-covid-client/default~entry~results.6585c6.js'},{'revision':'7956ff2738882ebf267e5a49238ff519','url':'/uniprot-covid-client/default~entry~results.6585c6.js.map'},{'revision':null,'url':'/uniprot-covid-client/download.6dc683.js'},{'revision':'e73b2e66678cc12d196aaf9e741fd3bd','url':'/uniprot-covid-client/download.6dc683.js.map'},{'revision':null,'url':'/uniprot-covid-client/entry.7e5fca.js'},{'revision':'a9406cc340f6f7482fd7d6c3aa57a6ea','url':'/uniprot-covid-client/entry.7e5fca.js.map'},{'revision':null,'url':'/uniprot-covid-client/franklin.0af438.js'},{'revision':'213af76cf7e355dc2bab50da11f2458e','url':'/uniprot-covid-client/franklin.0af438.js.map'},{'revision':'52a54c0dfaedcfc1ef8acaa586fbe473','url':'/uniprot-covid-client/index.html'},{'revision':null,'url':'/uniprot-covid-client/job-error.864a90.js'},{'revision':'c71751a615b647e901615e017c8436b5','url':'/uniprot-covid-client/job-error.864a90.js.map'},{'revision':null,'url':'/uniprot-covid-client/litemol.7839cc.js'},{'revision':'4e054e47d06f85a9892e82bcd1e3f759','url':'/uniprot-covid-client/litemol.7839cc.js.map'},{'revision':null,'url':'/uniprot-covid-client/main.aea235.js'},{'revision':'85e186aadcb44f042620c079697eb197','url':'/uniprot-covid-client/main.aea235.js.map'},{'revision':null,'url':'/uniprot-covid-client/react.226d9d.js'},{'revision':'c93be73f1910521c22ae788c8ed0b4c8','url':'/uniprot-covid-client/react.226d9d.js.map'},{'revision':null,'url':'/uniprot-covid-client/resource-not-found.669f2b.js'},{'revision':'70914a486ace8b695a10e24bdbfc5a03','url':'/uniprot-covid-client/resource-not-found.669f2b.js.map'},{'revision':null,'url':'/uniprot-covid-client/results.ef31cb.js'},{'revision':'f6f3b9d1af41491a7e317c069afe7cd0','url':'/uniprot-covid-client/results.ef31cb.js.map'},{'revision':null,'url':'/uniprot-covid-client/service-unavailable.b88bbe.js'},{'revision':'1b86ef443a80d1070fb1f2fab91cdec9','url':'/uniprot-covid-client/service-unavailable.b88bbe.js.map'},{'revision':null,'url':'/uniprot-covid-client/service-worker-client.729534.js'},{'revision':'643dabeb5adebecce2a82f81434974ea','url':'/uniprot-covid-client/service-worker-client.729534.js.map'},{'revision':'6949a87de655f2022e3242c71ec79fb3','url':'/uniprot-covid-client/service-worker.js.map'}]),E(V),k(new class extends C{constructor(e,{allowlist:t=[/./],denylist:s=[]}={}){super(e=>this._match(e),e),this._allowlist=t,this._denylist=s}_match({url:e,request:t}){if(t&&"navigate"!==t.mode)return!1;const s=e.pathname+e.search;for(const e of this._denylist)if(e.test(s))return!1;return!!this._allowlist.some(e=>e.test(s))}}((z="".concat("/uniprot-covid-client/","index.html"),q().createHandlerBoundToURL(z)))),k(/^https?:\/\/((www|api)\.rhea-db\.org|api\.geneontology\.org|www\.ebi\.ac\.uk\/(interpro\/api|pdbe))\//,new D({cacheName:"external-APIs",plugins:[new J({statuses:[0,200,204]}),new $({maxEntries:500,maxAgeSeconds:2419200,purgeOnQuotaError:!0})]})),k(/\.(?:png|gif|jpe?g|webp|svg|ico|woff2?|ttf|eot)$/,new P({cacheName:"images-and-fonts",plugins:[new $({maxEntries:100,maxAgeSeconds:3024e3,purgeOnQuotaError:!0})]})),k(/^https?:\/\/.*?\.(?:png|gif|jpe?g|webp|svg)$/,new P({cacheName:"external-images",plugins:[new J({statuses:[0,200]}),new $({maxEntries:20,maxAgeSeconds:1814400,purgeOnQuotaError:!0})]})),k(X,new D({cacheName:"google-fonts-stylesheets"})),k(X,new P({cacheName:"fonts",plugins:[new J({statuses:[0,200]}),new $({maxEntries:10,maxAgeSeconds:1814400,purgeOnQuotaError:!0})]})),k(/^https?:\/\/www(dev)?.ebi\.ac\.uk\/(proteins|uniprot)\/api\//,new D({cacheName:"APIs",plugins:[new $({maxEntries:750,maxAgeSeconds:4838400,purgeOnQuotaError:!0})]}))}]);
//# sourceMappingURL=service-worker.js.map