// native promise only
!function(t,n,e){n[t]=n[t]||e(),"undefined"!=typeof module&&module.exports?module.exports=n[t]:"function"==typeof define&&define.amd&&define(function(){return n[t]})}("Promise","undefined"!=typeof global?global:this,function(){"use strict";function t(t,n){l.add(t,n),h||(h=y(l.drain))}function n(t){var n,e=typeof t;return null==t||"object"!=e&&"function"!=e||(n=t.then),"function"==typeof n?n:!1}function e(){for(var t=0;t<this.chain.length;t++)o(this,1===this.state?this.chain[t].success:this.chain[t].failure,this.chain[t]);this.chain.length=0}function o(t,e,o){var r,i;try{e===!1?o.reject(t.msg):(r=e===!0?t.msg:e.call(void 0,t.msg),r===o.promise?o.reject(TypeError("Promise-chain cycle")):(i=n(r))?i.call(r,o.resolve,o.reject):o.resolve(r))}catch(c){o.reject(c)}}function r(o){var c,u=this;if(!u.triggered){u.triggered=!0,u.def&&(u=u.def);try{(c=n(o))?t(function(){var t=new f(u);try{c.call(o,function(){r.apply(t,arguments)},function(){i.apply(t,arguments)})}catch(n){i.call(t,n)}}):(u.msg=o,u.state=1,u.chain.length>0&&t(e,u))}catch(a){i.call(new f(u),a)}}}function i(n){var o=this;o.triggered||(o.triggered=!0,o.def&&(o=o.def),o.msg=n,o.state=2,o.chain.length>0&&t(e,o))}function c(t,n,e,o){for(var r=0;r<n.length;r++)!function(r){t.resolve(n[r]).then(function(t){e(r,t)},o)}(r)}function f(t){this.def=t,this.triggered=!1}function u(t){this.promise=t,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function a(n){if("function"!=typeof n)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var o=new u(this);this.then=function(n,r){var i={success:"function"==typeof n?n:!0,failure:"function"==typeof r?r:!1};return i.promise=new this.constructor(function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");i.resolve=t,i.reject=n}),o.chain.push(i),0!==o.state&&t(e,o),i.promise},this["catch"]=function(t){return this.then(void 0,t)};try{n.call(void 0,function(t){r.call(o,t)},function(t){i.call(o,t)})}catch(c){i.call(o,c)}}var s,h,l,p=Object.prototype.toString,y="undefined"!=typeof setImmediate?function(t){return setImmediate(t)}:setTimeout;try{Object.defineProperty({},"x",{}),s=function(t,n,e,o){return Object.defineProperty(t,n,{value:e,writable:!0,configurable:o!==!1})}}catch(d){s=function(t,n,e){return t[n]=e,t}}l=function(){function t(t,n){this.fn=t,this.self=n,this.next=void 0}var n,e,o;return{add:function(r,i){o=new t(r,i),e?e.next=o:n=o,e=o,o=void 0},drain:function(){var t=n;for(n=e=h=void 0;t;)t.fn.call(t.self),t=t.next}}}();var g=s({},"constructor",a,!1);return a.prototype=g,s(g,"__NPO__",0,!1),s(a,"resolve",function(t){var n=this;return t&&"object"==typeof t&&1===t.__NPO__?t:new n(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");n(t)})}),s(a,"reject",function(t){return new this(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");e(t)})}),s(a,"all",function(t){var n=this;return"[object Array]"!=p.call(t)?n.reject(TypeError("Not an array")):0===t.length?n.resolve([]):new n(function(e,o){if("function"!=typeof e||"function"!=typeof o)throw TypeError("Not a function");var r=t.length,i=Array(r),f=0;c(n,t,function(t,n){i[t]=n,++f===r&&e(i)},o)})}),s(a,"race",function(t){var n=this;return"[object Array]"!=p.call(t)?n.reject(TypeError("Not an array")):new n(function(e,o){if("function"!=typeof e||"function"!=typeof o)throw TypeError("Not a function");c(n,t,function(t,n){e(n)},o)})}),a});
// axios library
!function i(s,a,u){function c(t,e){if(!a[t]){if(!s[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(f)return f(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var o=a[t]={exports:{}};s[t][0].call(o.exports,function(e){return c(s[t][1][e]||e)},o,o.exports,i,s,a,u)}return a[t].exports}for(var f="function"==typeof require&&require,e=0;e<u.length;e++)c(u[e]);return c}({1:[function(e,t,r){t.exports=e("./lib/axios")},{"./lib/axios":3}],2:[function(x,e,t){(function(p){"use strict";var d=x("./../utils"),h=x("./../core/settle"),m=x("./../helpers/buildURL"),y=x("./../helpers/parseHeaders"),w=x("./../helpers/isURLSameOrigin"),g=x("../core/createError"),v="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||x("./../helpers/btoa");e.exports=function(l){return new Promise(function(r,n){var o=l.data,i=l.headers;d.isFormData(o)&&delete i["Content-Type"];var s=new XMLHttpRequest,e="onreadystatechange",a=!1;if("test"===p.env.NODE_ENV||"undefined"==typeof window||!window.XDomainRequest||"withCredentials"in s||w(l.url)||(s=new window.XDomainRequest,e="onload",a=!0,s.onprogress=function(){},s.ontimeout=function(){}),l.auth){var t=l.auth.username||"",u=l.auth.password||"";i.Authorization="Basic "+v(t+":"+u)}if(s.open(l.method.toUpperCase(),m(l.url,l.params,l.paramsSerializer),!0),s.timeout=l.timeout,s[e]=function(){if(s&&(4===s.readyState||a)&&(0!==s.status||s.responseURL&&0===s.responseURL.indexOf("file:"))){var e="getAllResponseHeaders"in s?y(s.getAllResponseHeaders()):null,t={data:l.responseType&&"text"!==l.responseType?s.response:s.responseText,status:1223===s.status?204:s.status,statusText:1223===s.status?"No Content":s.statusText,headers:e,config:l,request:s};h(r,n,t),s=null}},s.onerror=function(){n(g("Network Error",l,null,s)),s=null},s.ontimeout=function(){n(g("timeout of "+l.timeout+"ms exceeded",l,"ECONNABORTED",s)),s=null},d.isStandardBrowserEnv()){var c=x("./../helpers/cookies"),f=(l.withCredentials||w(l.url))&&l.xsrfCookieName?c.read(l.xsrfCookieName):void 0;f&&(i[l.xsrfHeaderName]=f)}if("setRequestHeader"in s&&d.forEach(i,function(e,t){void 0===o&&"content-type"===t.toLowerCase()?delete i[t]:s.setRequestHeader(t,e)}),l.withCredentials&&(s.withCredentials=!0),l.responseType)try{s.responseType=l.responseType}catch(e){if("json"!==l.responseType)throw e}"function"==typeof l.onDownloadProgress&&s.addEventListener("progress",l.onDownloadProgress),"function"==typeof l.onUploadProgress&&s.upload&&s.upload.addEventListener("progress",l.onUploadProgress),l.cancelToken&&l.cancelToken.promise.then(function(e){s&&(s.abort(),n(e),s=null)}),void 0===o&&(o=null),s.send(o)})}}).call(this,x("_process"))},{"../core/createError":9,"./../core/settle":12,"./../helpers/btoa":16,"./../helpers/buildURL":17,"./../helpers/cookies":19,"./../helpers/isURLSameOrigin":21,"./../helpers/parseHeaders":23,"./../utils":25,_process:27}],3:[function(e,t,r){"use strict";var n=e("./utils"),o=e("./helpers/bind"),i=e("./core/Axios"),s=e("./defaults");function a(e){var t=new i(e),r=o(i.prototype.request,t);return n.extend(r,i.prototype,t),n.extend(r,t),r}var u=a(s);u.Axios=i,u.create=function(e){return a(n.merge(s,e))},u.Cancel=e("./cancel/Cancel"),u.CancelToken=e("./cancel/CancelToken"),u.isCancel=e("./cancel/isCancel"),u.all=function(e){return Promise.all(e)},u.spread=e("./helpers/spread"),t.exports=u,t.exports.default=u},{"./cancel/Cancel":4,"./cancel/CancelToken":5,"./cancel/isCancel":6,"./core/Axios":7,"./defaults":14,"./helpers/bind":15,"./helpers/spread":24,"./utils":25}],4:[function(e,t,r){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,t.exports=n},{}],5:[function(e,t,r){"use strict";var n=e("./Cancel");function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var r=this;e(function(e){r.reason||(r.reason=new n(e),t(r.reason))})}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var t;return{token:new o(function(e){t=e}),cancel:t}},t.exports=o},{"./Cancel":4}],6:[function(e,t,r){"use strict";t.exports=function(e){return!(!e||!e.__CANCEL__)}},{}],7:[function(e,t,r){"use strict";var n=e("./../defaults"),o=e("./../utils"),i=e("./InterceptorManager"),s=e("./dispatchRequest");function a(e){this.defaults=e,this.interceptors={request:new i,response:new i}}a.prototype.request=function(e){"string"==typeof e&&(e=o.merge({url:arguments[0]},arguments[1])),(e=o.merge(n,{method:"get"},this.defaults,e)).method=e.method.toLowerCase();var t=[s,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)r=r.then(t.shift(),t.shift());return r},o.forEach(["delete","get","head","options"],function(r){a.prototype[r]=function(e,t){return this.request(o.merge(t||{},{method:r,url:e}))}}),o.forEach(["post","put","patch"],function(n){a.prototype[n]=function(e,t,r){return this.request(o.merge(r||{},{method:n,url:e,data:t}))}}),t.exports=a},{"./../defaults":14,"./../utils":25,"./InterceptorManager":8,"./dispatchRequest":10}],8:[function(e,t,r){"use strict";var n=e("./../utils");function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(t){n.forEach(this.handlers,function(e){null!==e&&t(e)})},t.exports=o},{"./../utils":25}],9:[function(e,t,r){"use strict";var s=e("./enhanceError");t.exports=function(e,t,r,n,o){var i=new Error(e);return s(i,t,r,n,o)}},{"./enhanceError":11}],10:[function(e,t,r){"use strict";var n=e("./../utils"),o=e("./transformData"),i=e("../cancel/isCancel"),s=e("../defaults"),a=e("./../helpers/isAbsoluteURL"),u=e("./../helpers/combineURLs");function c(e){e.cancelToken&&e.cancelToken.throwIfRequested()}t.exports=function(t){return c(t),t.baseURL&&!a(t.url)&&(t.url=u(t.baseURL,t.url)),t.headers=t.headers||{},t.data=o(t.data,t.headers,t.transformRequest),t.headers=n.merge(t.headers.common||{},t.headers[t.method]||{},t.headers||{}),n.forEach(["delete","get","head","post","put","patch","common"],function(e){delete t.headers[e]}),(t.adapter||s.adapter)(t).then(function(e){return c(t),e.data=o(e.data,e.headers,t.transformResponse),e},function(e){return i(e)||(c(t),e&&e.response&&(e.response.data=o(e.response.data,e.response.headers,t.transformResponse))),Promise.reject(e)})}},{"../cancel/isCancel":6,"../defaults":14,"./../helpers/combineURLs":18,"./../helpers/isAbsoluteURL":20,"./../utils":25,"./transformData":13}],11:[function(e,t,r){"use strict";t.exports=function(e,t,r,n,o){return e.config=t,r&&(e.code=r),e.request=n,e.response=o,e}},{}],12:[function(e,t,r){"use strict";var o=e("./createError");t.exports=function(e,t,r){var n=r.config.validateStatus;r.status&&n&&!n(r.status)?t(o("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)}},{"./createError":9}],13:[function(e,t,r){"use strict";var n=e("./../utils");t.exports=function(t,r,e){return n.forEach(e,function(e){t=e(t,r)}),t}},{"./../utils":25}],14:[function(a,u,e){(function(e){"use strict";var r=a("./utils"),n=a("./helpers/normalizeHeaderName"),t={"Content-Type":"application/x-www-form-urlencoded"};function o(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var i,s={adapter:("undefined"!=typeof XMLHttpRequest?i=a("./adapters/xhr"):void 0!==e&&(i=a("./adapters/http")),i),transformRequest:[function(e,t){return n(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(o(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(o(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return 200<=e&&e<300}};s.headers={common:{Accept:"application/json, text/plain, */*"}},r.forEach(["delete","get","head"],function(e){s.headers[e]={}}),r.forEach(["post","put","patch"],function(e){s.headers[e]=r.merge(t)}),u.exports=s}).call(this,a("_process"))},{"./adapters/http":2,"./adapters/xhr":2,"./helpers/normalizeHeaderName":22,"./utils":25,_process:27}],15:[function(e,t,r){"use strict";t.exports=function(r,n){return function(){for(var e=new Array(arguments.length),t=0;t<e.length;t++)e[t]=arguments[t];return r.apply(n,e)}}},{}],16:[function(e,t,r){"use strict";function a(){this.message="String contains an invalid character"}(a.prototype=new Error).code=5,a.prototype.name="InvalidCharacterError",t.exports=function(e){for(var t,r,n=String(e),o="",i=0,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";n.charAt(0|i)||(s="=",i%1);o+=s.charAt(63&t>>8-i%1*8)){if(255<(r=n.charCodeAt(i+=.75)))throw new a;t=t<<8|r}return o}},{}],17:[function(e,t,r){"use strict";var i=e("./../utils");function s(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}t.exports=function(e,t,r){if(!t)return e;var n;if(r)n=r(t);else if(i.isURLSearchParams(t))n=t.toString();else{var o=[];i.forEach(t,function(e,t){null!=e&&(i.isArray(e)?t+="[]":e=[e],i.forEach(e,function(e){i.isDate(e)?e=e.toISOString():i.isObject(e)&&(e=JSON.stringify(e)),o.push(s(t)+"="+s(e))}))}),n=o.join("&")}return n&&(e+=(-1===e.indexOf("?")?"?":"&")+n),e}},{"./../utils":25}],18:[function(e,t,r){"use strict";t.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},{}],19:[function(e,t,r){"use strict";var a=e("./../utils");t.exports=a.isStandardBrowserEnv()?{write:function(e,t,r,n,o,i){var s=[];s.push(e+"="+encodeURIComponent(t)),a.isNumber(r)&&s.push("expires="+new Date(r).toGMTString()),a.isString(n)&&s.push("path="+n),a.isString(o)&&s.push("domain="+o),!0===i&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},{"./../utils":25}],20:[function(e,t,r){"use strict";t.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},{}],21:[function(e,t,r){"use strict";var s=e("./../utils");t.exports=s.isStandardBrowserEnv()?function(){var r,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");function i(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}return r=i(window.location.href),function(e){var t=s.isString(e)?i(e):e;return t.protocol===r.protocol&&t.host===r.host}}():function(){return!0}},{"./../utils":25}],22:[function(e,t,r){"use strict";var o=e("../utils");t.exports=function(r,n){o.forEach(r,function(e,t){t!==n&&t.toUpperCase()===n.toUpperCase()&&(r[n]=e,delete r[t])})}},{"../utils":25}],23:[function(e,t,r){"use strict";var i=e("./../utils"),s=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];t.exports=function(e){var t,r,n,o={};return e&&i.forEach(e.split("\n"),function(e){if(n=e.indexOf(":"),t=i.trim(e.substr(0,n)).toLowerCase(),r=i.trim(e.substr(n+1)),t){if(o[t]&&0<=s.indexOf(t))return;o[t]="set-cookie"===t?(o[t]?o[t]:[]).concat([r]):o[t]?o[t]+", "+r:r}}),o}},{"./../utils":25}],24:[function(e,t,r){"use strict";t.exports=function(t){return function(e){return t.apply(null,e)}}},{}],25:[function(e,t,r){"use strict";var o=e("./helpers/bind"),n=e("is-buffer"),i=Object.prototype.toString;function s(e){return"[object Array]"===i.call(e)}function a(e){return null!==e&&"object"==typeof e}function u(e){return"[object Function]"===i.call(e)}function c(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),s(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}t.exports={isArray:s,isArrayBuffer:function(e){return"[object ArrayBuffer]"===i.call(e)},isBuffer:n,isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===i.call(e)},isFile:function(e){return"[object File]"===i.call(e)},isBlob:function(e){return"[object Blob]"===i.call(e)},isFunction:u,isStream:function(e){return a(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:c,merge:function r(){var n={};function e(e,t){"object"==typeof n[t]&&"object"==typeof e?n[t]=r(n[t],e):n[t]=e}for(var t=0,o=arguments.length;t<o;t++)c(arguments[t],e);return n},extend:function(r,e,n){return c(e,function(e,t){r[t]=n&&"function"==typeof e?o(e,n):e}),r},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},{"./helpers/bind":15,"is-buffer":26}],26:[function(e,t,r){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}t.exports=function(e){return null!=e&&(n(e)||"function"==typeof(t=e).readFloatLE&&"function"==typeof t.slice&&n(t.slice(0,0))||!!e._isBuffer);var t}},{}],27:[function(e,t,r){var n,o,i=t.exports={};function s(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function u(t){if(n===setTimeout)return setTimeout(t,0);if((n===s||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:s}catch(e){n=s}try{o="function"==typeof clearTimeout?clearTimeout:a}catch(e){o=a}}();var c,f=[],l=!1,p=-1;function d(){l&&c&&(l=!1,c.length?f=c.concat(f):p=-1,f.length&&h())}function h(){if(!l){var e=u(d);l=!0;for(var t=f.length;t;){for(c=f,f=[];++p<t;)c&&c[p].run();p=-1,t=f.length}c=null,l=!1,function(t){if(o===clearTimeout)return clearTimeout(t);if((o===a||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(t);try{o(t)}catch(e){try{return o.call(null,t)}catch(e){return o.call(this,t)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function y(){}i.nextTick=function(e){var t=new Array(arguments.length-1);if(1<arguments.length)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];f.push(new m(e,t)),1!==f.length||l||u(h)},m.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=y,i.addListener=y,i.once=y,i.off=y,i.removeListener=y,i.removeAllListeners=y,i.emit=y,i.prependListener=y,i.prependOnceListener=y,i.listeners=function(e){return[]},i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},{}],28:[function(e,t,r){var n=e("axios");window.axios=n},{axios:1}]},{},[28]);
// jquery-param
(function(h){var c=function(c){var f=[],g=function(d,a){a="function"===typeof a?a():a;a=null===a?"":void 0===a?"":a;f[f.length]=encodeURIComponent(d)+"="+encodeURIComponent(a)},e=function(d,a){var c;if(d)if(Array.isArray(a)){var b=0;for(c=a.length;b<c;b++)e(d+"["+("object"===typeof a[b]&&a[b]?b:"")+"]",a[b])}else if("[object Object]"===String(a))for(b in a)e(d+"["+b+"]",a[b]);else g(d,a);else if(Array.isArray(a))for(b=0,c=a.length;b<c;b++)g(a[b].name,a[b].value);else for(b in a)e(b,a[b]);return f}; return e("",c).join("&")};"object"===typeof module&&"object"===typeof module.exports?module.exports=c:"function"===typeof define&&define.amd?define([],function(){return c}):h.param=c})(this);
// NodeList.prototype.forEach
if (window.NodeList && !NodeList.prototype.forEach) { NodeList.prototype.forEach = Array.prototype.forEach;}
 
// should be provided by server, currently we have to manually update the information once a client changes settings.
var is_premium = 1;
var myshopify_domain = 'bold-fred.myshopify.com';
var shappify_motivator_goals  = [];
var shappify_motivator_styles = {"shop_app_id":"158790","0":"158790","background_color":"e8f3ff","1":"e8f3ff","color":"3c64b5","2":"3c64b5","padding":"15","3":"15","font_size":"15","4":"15","font_bold":"0","5":"0","scroll_delay":"5","6":"5","bottom_border_color":"95c9f0","7":"95c9f0","bottom_border_size":"1","8":"1","balance_font_size":"17","9":"17","balance_color":"497add","10":"497add","balance_bold":"0","11":"0","additional_css":"","12":"","confirmation_color":"497add","13":"497add","confirmation_font_size":"17","14":"17","confirmation_bold":"0","15":"0","batch_status":"0","16":"0"};
// provided by server
 
var motivatorHost = 'https://motivate.boldapps.net';
 
// helper function used to convert html string to DocumentFragment so that we can use querySelectorAll on
function fragmentFromString(str) {
  return document.createRange().createContextualFragment(str);
}
// extends any html element object to give them ability of knowing the exact time when some specific child nodes are inserted
if (!Element.prototype.whenChildNodesCreated) {
  Element.prototype.whenChildNodesCreated = function(searchTerm) {
    var self = this;
    return new Promise(function(resolve, reject) {
      var config = {
        childList: true,
        subtree: true,
        characterData: true,
        characterDataOldValue: true
      };
      var callback = function(mutationRecords) {
        var childNodes = [];
        mutationRecords
        .forEach(function(mutationRecord) {
          var addedNodes = mutationRecord.addedNodes;
          if(typeof searchTerm == "string"){
            for (var i = 0; i < addedNodes.length; i += 1) {
              var addedNode = addedNodes[i];
              if (addedNode.nodeType == 3) {
                if (addedNode.textContent.includes(searchTerm)) {
                  childNodes.push(addedNode);
                }
              }
              if (addedNode.nodeType == 1) {
                if(addedNode.querySelectorAll(searchTerm)){
                  addedNode.querySelectorAll(searchTerm).forEach(function(node){
                    childNodes.push(node);
                  })
                }
                if(addedNode.matches(searchTerm) || addedNode.textContent.includes(searchTerm)){
                  childNodes.push(addedNode);
                }
              }
            }
          }
        });
        childNodes = childNodes.filter(function (node, index, nodes) {
          return nodes.indexOf(node) === index;
        });     
        if (childNodes.length > 0) {
          observer.disconnect();
          resolve(childNodes);
        }
      };
      var observer = new MutationObserver(callback);
      observer.observe(self, config);
    });
  };
}
// helper function which will make create custom event easier
function shappify_dispatch_custom_event(event_name, detail){
  var event = new CustomEvent(event_name, {detail: detail});
  document.dispatchEvent(event);
}
 
function shappify_motivator_get_country(){
  return axios.get("https://motivate.boldapps.net/cf_helper/get_country.php").then(function (result) {
    var country = result.data;
    return ({
      shop: myshopify_domain,
      country: country
    });
  })
}
 
function shappify_motivator_get_goals(shop_country_info) {
  return axios.get(motivatorHost + '/get_premium_goals.php?' + param(shop_country_info)).then(function (result){
    var goals = result.data;
    return goals;
  });
}
 
function shappify_get_cart() {
  var tmp = new Date().getTime();
  return axios.get("/cart.js?" + tmp).then(function (result) {
    var cart = result.data;
    return cart;
  })
}
// according to cart and goals, figure out what cookies to save, what messages to show, what requests to send
function shappify_motivator_analyze_cart_and_goals(cart_goals_arr) {
  var cart = cart_goals_arr[0];
  var goals = cart_goals_arr[1];
  if (window.BOLD
      && BOLD.common
      && BOLD.common.cartDoctor
      && typeof BOLD.common.cartDoctor.fix == 'function') {
    cart = window.BOLD.common.cartDoctor.fix(cart);
  }
  var motivator_last_total = shappify_get_cookie("motivator_last_total");
  var messages = [];
  var ajax_requests_params_arr = [];
  var motivator_initialised_cookie_params_arr = [];
  var motivator_confirmed_cookie_params_arr = [];
 
  if (cart && goals && goals.length && goals.length > 0) {       
    for (let shappify_i = 0; shappify_i < goals.length; shappify_i++) {
      var motivator_was_initialised = shappify_get_cookie("motivator_initialised_" + goals[shappify_i].id);
      var motivator_was_confirmed = shappify_get_cookie("motivator_confirmed_" + goals[shappify_i].id);                   
      if (motivator_was_initialised != "1") {
        messages.push("<span class='shapp_pitch'>" + goals[shappify_i].pitch + "</span>");
      }
      var free_product_enabled = goals[shappify_i].free_product_enabled;
      var variant_id = goals[shappify_i].variant_id;
      var bal = (100 * goals[shappify_i].goal) - (cart.total_price);
 
      if (bal > 0) {           
        var formatted_bal = shappify_format_money(bal, "${{amount}}");
        if (motivator_was_initialised == "1" && cart.total_price != motivator_last_total ) {
          messages.push(goals[shappify_i].pre_balance + " <span class='shappify-motivator-bal'>" + formatted_bal + "</span> " + goals[shappify_i].post_balance);
        }
        motivator_confirmed_cookie_params_arr.push(["motivator_confirmed_" + goals[shappify_i].id, 0, 1]);
        cart.items.forEach(function(item, index){
          if (item.variant_id == variant_id) {
            ajax_requests_params_arr.push('updates[' + variant_id + ']=0');
          }
        });          
      } else {           
        if (motivator_was_confirmed != "1") {
          messages.push("<span class='shapp_confirmation'>" + goals[shappify_i].confirmation + "</span>");
        }           
        motivator_confirmed_cookie_params_arr.push(["motivator_confirmed_" + goals[shappify_i].id, 1, 1]);           
        if (free_product_enabled && variant_id) {
          ajax_requests_params_arr.push('updates[' + variant_id + ']=1');
        }
      }         
      motivator_initialised_cookie_params_arr.push(["motivator_initialised_" + goals[shappify_i].id, 1, 1]);
    }
  }
  return Promise.resolve({
    cart: cart,
    messages: messages,
    ajax_requests_params_arr: ajax_requests_params_arr,
    motivator_initialised_cookie_params_arr: motivator_initialised_cookie_params_arr,
    motivator_confirmed_cookie_params_arr: motivator_confirmed_cookie_params_arr
  });
}
// send ajax requests to adjust cart
function shappify_motivator_adjust_cart(info) {
  var cart = info.cart;
  var messages = info.messages;
  var ajax_requests_params_arr = info.ajax_requests_params_arr;
  var motivator_initialised_cookie_params_arr = info.motivator_initialised_cookie_params_arr;
  var motivator_confirmed_cookie_params_arr = info.motivator_confirmed_cookie_params_arr;
  return new Promise(function(resolve, reject){
    if(ajax_requests_params_arr.length > 0){
      var tmp = new Date().getTime();
      axios.post("/cart/update.js?" + tmp, ajax_requests_params_arr.join('&')).then(function (result) {
        var cart = result.data;
        if (window.BOLD
            && BOLD.common
            && BOLD.common.cartDoctor
            && typeof BOLD.common.cartDoctor.fix == 'function') {
          cart = window.BOLD.common.cartDoctor.fix(cart);
        }
        resolve({
          cart: cart,
          messages: messages,
          motivator_initialised_cookie_params_arr: motivator_initialised_cookie_params_arr,
          motivator_confirmed_cookie_params_arr: motivator_confirmed_cookie_params_arr
        });
      })
    } else {
      resolve({
        cart: cart,
        messages: messages,
        motivator_initialised_cookie_params_arr: motivator_initialised_cookie_params_arr,
        motivator_confirmed_cookie_params_arr: motivator_confirmed_cookie_params_arr
      });
    }
  });
}
// save cookies
function shappify_motivator_set_cookie(info){
  var cart = info.cart;
  var messages = info.messages;
  var motivator_initialised_cookie_params_arr = info.motivator_initialised_cookie_params_arr;
  var motivator_confirmed_cookie_params_arr = info.motivator_confirmed_cookie_params_arr;
  shappify_set_cookie("motivator_last_total", cart.total_price, 1);
  motivator_initialised_cookie_params_arr.forEach(function(params){
    shappify_set_cookie(params[0], params[1], params[2]);                                               
  });
  motivator_confirmed_cookie_params_arr.forEach(function(params){
    shappify_set_cookie(params[0], params[1], params[2]);
  });
  return Promise.resolve({
    cart: cart,
    messages: messages
  });
}
//show messages
function shappify_motivator_show_messages(info){
  var messages = info.messages;
  var cart = info.cart;
  if(document.readyState === "loading"){
    document.addEventListener("readystatechange", function(e){
      if (event.target.readyState === "interactive") {
        show_messages(messages);
      }
    });
  } else {
    show_messages(messages);
  }
  function show_messages(messages){
    if(typeof messages != 'undefined' && messages.length>0) {
      var tmp = new Date().getTime();
      var html = "<div class='shappify-motivator-slider' id='message_" + tmp + "' ><a href='#' class='shappify-motivator-x' onclick='ShappjQuery(\".shappify-motivator-slider\").slideUp(\"fast\"); return false;'>X</a> ";
      var i;
      for(i=0;i<messages.length;i++){
        html += "<p>"+messages[i]+"</p>";
      }
      html =html +"</div>";    
      if(document.body){
        document.body.querySelectorAll(".shappify-motivator-slider").forEach(function(slider){
          slider.parentNode.removeChild(slider);
        });
        document.body.insertAdjacentHTML('beforeend', html);
        document.body.querySelectorAll("#message_" + tmp).forEach(function(message){
          shappify_slide_down(message, 600, function(){
            setTimeout(function(){
              shappify_slide_up(message, 200)
            }, shappify_motivator_styles.scroll_delay*1000)
          });       
        });
      }
    }
  } 
  return Promise.resolve(cart);
}
 
function shappify_format_money(b, e){
  var d="";var c=/\{\{\s*(\w+)\s*\}\}/;var a=(e||this.money_format);switch(a.match(c)[1]){case"amount":d=shappify_float_to_string(b/100,2).replace(/(\d+)(\d{3}[\.,]?)/,"$1,$2");break;case"amount_no_decimals":d=shappify_float_to_string(b/100,0).replace(/(\d+)(\d{3}[\.,]?)/,"$1,$2");break;case"amount_with_comma_separator":d=shappify_float_to_string(b/100,2).replace(/\./,",").replace(/(\d+)(\d{3}[\.,]?)/,"$1.$2");break;case"amount_no_decimals_with_comma_separator":d=shappify_format_with_delimiters(b, 0, ',', '.');break;}return a.replace(c,d);
}
 
function shappify_float_to_string(c,a){
  var b=c.toFixed(a).toString();if(b.match(/^\.\d+/)){return"0"+b}else{return b}
}
 
function shappify_format_with_delimiters(number, precision, thousands, decimal) {
    if (isNaN(number) || number == null) { return 0; }
    if (typeof number == 'string') { number = number.replace('.',''); }
    number = (number/100.0).toFixed(precision);
    var parts   = number.split('.'),
        dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
        cents   = parts[1] ? (decimal + parts[1]) : '';
    return dollars + cents;
}
 
function shappify_set_cookie(c_name, value, exhours){
  var exdate = new Date();
  exdate.setHours(exdate.getHours() + exhours);
  var c_value = escape(value) + ((exhours == null) ? "" : "; expires=" + exdate.toUTCString());
  document.cookie = c_name + "=" + c_value + "; path=/";
}
 
function shappify_get_cookie(c_name){
  var c_value = document.cookie;
  var c_start = c_value.indexOf(" " + c_name + "=");
  if (c_start == -1) {
    c_start = c_value.indexOf(c_name + "=");
    c_value = null;
  } else {
    c_start = c_value.indexOf("=", c_start) + 1;
    var c_end = c_value.indexOf(";", c_start);
    if (c_end == -1) {
      c_end = c_value.length;
    }
    c_value = unescape(c_value.substring(c_start, c_end));
  }
  return c_value;
}
// insert a style tag with styles set by the client in Motivator's setting panel
function shappify_motivator_add_styles(){
  var bold = "normal";
  var balance_bold = "normal";
  var confirmation_bold = "normal";
  if(shappify_motivator_styles.font_bold == "1"){
    bold = "bold";
  }
  if(shappify_motivator_styles.balance_bold == "1"){
    balance_bold = "bold";
  }
  if(shappify_motivator_styles.confirmation_bold == "1"){
    confirmation_bold = "bold";
  }
 
  var css="<style>a.shappify-motivator-x{color:#" + shappify_motivator_styles.color+"; float:right; margin-right:25px; text-decoration: none;font-weight: bold;text-transform: lowercase;font-size: 20px; line-height: 19px;}.shappify-motivator-slider, .shappify-motivator-slider{position:Fixed ; display:none; top:0; width:100%; z-index:999999999;  margin:0; left:0; "
  css=css+"background-color:#" + shappify_motivator_styles.background_color+"; ";
  css=css+"padding:"+shappify_motivator_styles.padding+"px 0; ";
  css=css+"color:#" + shappify_motivator_styles.color+"; ";
  css=css+"font-size:" + shappify_motivator_styles.font_size+"px; ";
  css=css+"font-weight:" + bold+ "; ";
  css=css+"border-bottom:" +shappify_motivator_styles.bottom_border_size +"px solid #" + shappify_motivator_styles.bottom_border_color+"; ";
  css=css+"shappify-motivator-slider p, shappify-motivator-slider a{color:#" + shappify_motivator_styles.color+";} ";
  css=css+"} .shappify-motivator-slider .shappify-motivator-bal{" ;
  css=css+"font-size:"+ shappify_motivator_styles.balance_font_size+"px; ";
  css=css+"color:#"+ shappify_motivator_styles.balance_color+"; ";
  css=css+"font-weight:" + balance_bold+ "; ";
 
  css=css + "}.shappify-motivator-slider .shapp_confirmation{";
 
  css=css+"font-size:"+ shappify_motivator_styles.confirmation_font_size+"px; ";
  css=css+"color:#"+ shappify_motivator_styles.confirmation_color+"; ";
  css=css+"font-weight:" + confirmation_bold+ "; ";
 
  css=css + "}.shappify-motivator-slider p{padding:0; margin:0; text-align:center;}";
  css=css+shappify_motivator_styles.additional_css
  css=css + "</style>";
 
  document.documentElement.insertAdjacentHTML('afterbegin', css);
}
// jQuery.slideDown's alternative with vanilla javascript
function shappify_slide_down(element, duration, callback) {
  return new Promise(function (resolve, reject) {
    element.style.removeProperty('display');
    var display = window.getComputedStyle(element).display;
    if (display === 'none') {
      display = 'block';
    }
    element.style.display = display;
    var height = element.offsetHeight;
    element.style.overflow = 'hidden';
    element.style.height = 0;
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;
    element.style.marginTop = 0;
    element.style.marginBottom = 0;
    element.offsetHeight; // eslint-disable-line no-unused-expressions
    element.style.transitionProperty = 'height, margin, padding';
    element.style.transitionDuration = duration + 'ms';
    element.style.height = height + 'px';
    element.style.removeProperty('padding-top');
    element.style.removeProperty('padding-bottom');
    element.style.removeProperty('margin-top');
    element.style.removeProperty('margin-bottom');
    window.setTimeout(function () {
      element.style.removeProperty('height');
      element.style.removeProperty('overflow');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
      'function' == typeof callback
      && callback();
    }, duration);
  })
}
// jQuery.slideUp's alternative with vanilla javascript
function shappify_slide_up(element, duration) {
  return new Promise(function (resolve, reject) {
    element.style.height = element.offsetHeight + 'px';
    element.style.transitionProperty = 'height, margin, padding';
    element.style.transitionDuration = duration + 'ms';
    element.offsetHeight;
    element.style.overflow = 'hidden';
    element.style.height = 0;
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;
    element.style.marginTop = 0;
    element.style.marginBottom = 0;
    window.setTimeout(function () {
      element.style.display = 'none';
      element.style.removeProperty('height');
      element.style.removeProperty('padding-top');
      element.style.removeProperty('padding-bottom');
      element.style.removeProperty('margin-top');
      element.style.removeProperty('margin-bottom');
      element.style.removeProperty('overflow');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
      resolve(false);
    }, duration);
  })
}
// a function inspired by csp's shappify_csp_got_cart, it could be used on ajax integration
function shappify_tm_got_cart(cart, success_callback) {
  Promise.all([Promise.resolve(cart), shappify_motivator_get_country().then(shappify_motivator_get_goals)])
  .then(shappify_motivator_analyze_cart_and_goals)
  .then(shappify_motivator_adjust_cart)
  .then(shappify_motivator_set_cookie)
  .then(shappify_motivator_show_messages)
  .then(success_callback)
}
// a function inspired by csp's shappify_csp_main, it could be used on ajax integration
function shappify_tm_main(success_callback) {
  Promise.all([shappify_get_cart(), shappify_motivator_get_country().then(shappify_motivator_get_goals)])
  .then(shappify_motivator_analyze_cart_and_goals)
  .then(shappify_motivator_adjust_cart)
  .then(shappify_motivator_set_cookie)
  .then(shappify_motivator_show_messages)
  .then(success_callback)
}
// the function return a Promise, passed onfulfilled function will get the correct cart object as
// the parameter. for some themes, this function is easier than shappify_tm_got_cart (when a theme
// is making use of Promise to do asynchronous things)
function shappify_tm_check(cart) {
  return new Promise(function(resolve, reject){
    if(cart && cart.items){
      shappify_tm_got_cart(cart, resolve);
    } else {
      shappify_tm_main(resolve);
    }
  });
}
// hide normal and additional checkout buttons
function shappify_disable_checkout(selectors) {
  var selectors = selectors || [
    '[name="checkout"]',
    '.additional-checkout-button', '.additional-checkout-buttons',
    'a[href*="https://partial.ly/checkout"]'
  ]
  document.documentElement.querySelectorAll(selectors.join(',')).forEach(function(button){
    button.style.setProperty("display", "none", "important");
  });
}
// display normal and addtional checkout buttons
function shappify_enable_checkout(selectors) {
  var selectors = selectors || [
    '[name="checkout"]',
    '.additional-checkout-button', '.additional-checkout-buttons',
    'a[href*="https://partial.ly/checkout"]'
  ]
  document.documentElement.querySelectorAll(selectors.join(',')).forEach(function(button){
    button.style.setProperty("display", "");
  });
}
// Some themes' cart pages are not controlled by ajax (changing the value of quantity inputs will not
// affect the real items in the cart), in the motivator.php, there is some code to disable the checkout
// button but it doesn't work for additional checkout button. To solve this, we can add an attribute of
// data-bold-original-qty to store the real quantity of one item in the cart, then register this function
// as the event listener of quantity inputs' focusin and change events. After that, if only one item's
// displayed quantity is not equal to its real quantity, the checkout buttons will be hidden.
function shappify_toggle_checkout(e, checkout_selectors) {
  var target = e.target;
  var type = e.type;
  if (target
      && target.name
      && typeof target.name.includes == 'function'
      && target.name.includes("updates[")
      && target.dataset
      && target.dataset.boldOriginalQty){
    var originalQuantity = target.dataset.boldOriginalQty;     
    if (type == 'focusin') {
      shappify_disable_checkout(checkout_selectors);
      target.addEventListener("focusout", function (e) {
        var currentQuantity = e.target.value;
        if (originalQuantity == currentQuantity) {
          shappify_enable_checkout(checkout_selectors);
        }
      });
    }
    if (type == 'change') {
      var currentQuantity = e.target.value;
      if (originalQuantity == currentQuantity) {
        shappify_enable_checkout(checkout_selectors);
      } else {
        shappify_disable_checkout(checkout_selectors);
      }
    }
  }
}
// send ajax request to /cart, use the html on the new page to replace current corresponding part
// require two selectors, one is for item list when cart is not empty, the other is for empty cart
function shappify_update_cart_form(cart, selector, selector2) {
  if(document.documentElement.querySelector(selector)){
    replace_content(cart, selector, selector2);
  } else {
    document.documentElement.whenChildNodesCreated(selector)
    .then(function(){
      replace_content(cart, selector, selector2);
    });
  }
  function replace_content(cart, selector, selector2) {
    if(cart.item_count > 0){
      axios.get("/cart").then(function(result) {
        var html = result.data;
        var oldFormTable = document.documentElement.querySelector(selector);
        var newFormTable = fragmentFromString(html).querySelector(selector);
        if(oldFormTable && newFormTable){
          oldFormTable.innerHTML = newFormTable.innerHTML;
        }
      });
    } else {
      axios.get("/cart").then(function(result){
        var html = result.data;
        var oldBody = document.documentElement.querySelector(selector2);
        var newBody = fragmentFromString(html).querySelector(selector2);
        if(oldBody && newBody){
          oldBody.innerHTML = newBody.innerHTML;
        }
      });
    }
  }
}
// all the functions in this file except shappify_motivator_add_styles are not called,
// in this way, it will be much easier for support people to make the app work on strange themes
shappify_motivator_add_styles();