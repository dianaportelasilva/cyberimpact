parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"H97Y":[function(require,module,exports) {

},{}],"cMyF":[function(require,module,exports) {
"use strict";function e(){return new Promise(e=>"loading"===document.readyState?document.addEventListener("DOMContentLoaded",e):e())}function t(e){return query(e).content.cloneNode(!0)}function n(e,...t){let n=!1;return function(){n||(n=!0,e.apply(this,t))}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.onDomReady=e,exports.once=n,exports.template=t;
},{}],"bKoQ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.observable=void 0;const e={elements:[],init:t=>{e.elements=queryAll(t||"[observable]"),e.elements.forEach(e=>{let t=!1;const s=parseFloat(e.getAttribute("threshold")||1),r=null!==e.getAttribute("once"),n=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&!t?(t=!0,e.target.dispatchEvent(new CustomEvent("observed",e)),r&&n.unobserve(e.target)):!e.isIntersecting&&t&&(t=!1,e.target.dispatchEvent(new CustomEvent("unobserved",e)))})},{threshold:s});n.observe(e)})},getElements:()=>e.elements};exports.observable=e;
},{}],"GTRl":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.swipeable=void 0;const e={elements:[],init:t=>{e.elements=queryAll(t||"[swipeable]"),e.elements.forEach(e=>{const t=Number(e.getAttribute("threshold"))||120;let s;e.addEventListener("touchstart",e=>{[s]=e.changedTouches},{passive:!0}),e.addEventListener("touchend",n=>{const[i,a]=[n.changedTouches[0].clientX-s.clientX,n.changedTouches[0].clientY-s.clientY],[c,l]=[i,a].map(Math.abs);(c||l)&&e.dispatchEvent(new CustomEvent("swipe",{detail:{x:c>t&&c>l?-Math.sign(i):0,y:l>t&&l>c?-Math.sign(a):0}}))},{passive:!0})})},getElements:()=>e.elements};exports.swipeable=e;
},{}],"ZIfy":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"observable",{enumerable:!0,get:function(){return t.observable}}),Object.defineProperty(exports,"onDomReady",{enumerable:!0,get:function(){return e.onDomReady}}),Object.defineProperty(exports,"once",{enumerable:!0,get:function(){return e.once}}),exports.queryAll=exports.query=void 0,Object.defineProperty(exports,"swipeable",{enumerable:!0,get:function(){return r.swipeable}}),Object.defineProperty(exports,"template",{enumerable:!0,get:function(){return e.template}});var e=require("./utils/utils"),t=require("./utils/intersection-observer"),r=require("./utils/swipeable");Object.setPrototypeOf(NodeList.prototype,Array.prototype),Object.setPrototypeOf(HTMLCollection.prototype,Array.prototype);const o=document.querySelector.bind(document);exports.query=o;const n=document.querySelectorAll.bind(document);exports.queryAll=n,window.query=o,window.queryAll=n,Node.prototype.query=function(e){return this.querySelector(e)},Node.prototype.queryAll=function(e){return this.querySelectorAll(e)},NodeList.prototype.query=function(e){return this.queryAll(e)[0]},NodeList.prototype.queryAll=function(e){return this.map(t=>Array.from(t.queryAll(e))).flat()},Node.prototype.sibling=function(e){return this.siblings(e)[0]},Node.prototype.siblings=function(e){return(e?this.parentElement.queryAll(e):this.parentElement.children).filter(e=>this!==e)},Node.prototype.index=function(){let e=this,t=-1;for(;e;)e=e.previousElementSibling,t+=1;return t},Node.prototype.trigger=function(e,t){this.dispatchEvent(new CustomEvent(e,t))};
},{"./utils/utils":"cMyF","./utils/intersection-observer":"bKoQ","./utils/swipeable":"GTRl"}],"H99C":[function(require,module,exports) {
"use strict";require("bootstrap/dist/css/bootstrap.min.css");var e=require("cantil"),r=(0,e.query)("form");r.query("button").addEventListener("click",function(e){e.preventDefault();var t=r.checkValidity();if(r.reportValidity(),!t)return!1;var u=Number(r.query("#cost").value),a=(Number(r.query("#volume").value),Number(r.query("#days").value)),i=Number(r.query("#proporcion").value)/100*a,n=i/(5===a?250:365),o=n*u,s=(o/Number(r.query("#population").value)).toFixed(2);r.query("[affected-days]").innerText=i,r.query("[affected-capacity]").innerText=n,r.query("[cost-estimated]").innerText=o,r.query("[cost-per-person]").innerText=s,r.query(".alert").classList.remove("d-none")});
},{"bootstrap/dist/css/bootstrap.min.css":"H97Y","cantil":"ZIfy"}]},{},["H99C"], null)
//# sourceMappingURL=/src.22da82fa.js.map