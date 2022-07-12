// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"node_modules/bootstrap/dist/css/bootstrap.min.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"node_modules/cantil/src/utils/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onDomReady = onDomReady;
exports.once = once;
exports.template = template;

// On Dom Ready
// @stimulus https://github.com/stimulusjs/stimulus/blob/master/packages/%40stimulus/core/src/application.ts
function onDomReady() {
  return new Promise(resolve => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', resolve) : resolve());
} // Template helper


function template(selector) {
  return query(selector).content.cloneNode(true);
} // Once
// @vuejs https://github.com/vuejs/vue/blob/4de4649d9637262a9b007720b59f80ac72a5620c/src/shared/util.js


function once(callback, ...args) {
  let called = false;
  return function () {
    if (!called) {
      called = true;
      callback.apply(this, args);
    }
  };
}
},{}],"node_modules/cantil/src/utils/intersection-observer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.observable = void 0;
// Interception observer
const observable = {
  elements: [],
  // Init
  init: selector => {
    observable.elements = queryAll(selector || '[observable]');
    observable.elements.forEach(observable => {
      let status = false;
      const threshold = parseFloat(observable.getAttribute('threshold') || 1);
      const once = observable.getAttribute('once') !== null;
      const revealContentObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !status) {
            status = true;
            entry.target.dispatchEvent(new CustomEvent('observed', entry));

            if (once) {
              revealContentObserver.unobserve(entry.target);
            }
          } else if (!entry.isIntersecting && status) {
            status = false;
            entry.target.dispatchEvent(new CustomEvent('unobserved', entry));
          }
        });
      }, {
        threshold
      });
      revealContentObserver.observe(observable);
    });
  },

  // Get Elements
  getElements() {
    return observable.elements;
  }

};
exports.observable = observable;
},{}],"node_modules/cantil/src/utils/swipeable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.swipeable = void 0;
// Swipeable
const swipeable = {
  elements: [],
  // Init
  init: selector => {
    swipeable.elements = queryAll(selector || '[swipeable]');
    swipeable.elements.forEach(swipeable => {
      const threshold = Number(swipeable.getAttribute('threshold')) || 120;
      let startTouch; // Touch Start Event

      swipeable.addEventListener('touchstart', e => {
        [startTouch] = e.changedTouches;
      }, {
        passive: true
      }); // Touch End Event

      swipeable.addEventListener('touchend', e => {
        const [dx, dy] = [e.changedTouches[0].clientX - startTouch.clientX, e.changedTouches[0].clientY - startTouch.clientY];
        const [adx, ady] = [dx, dy].map(Math.abs);

        if (adx || ady) {
          swipeable.dispatchEvent(new CustomEvent('swipe', {
            detail: {
              x: adx > threshold && adx > ady ? -Math.sign(dx) : 0,
              y: ady > threshold && ady > adx ? -Math.sign(dy) : 0
            }
          }));
        }
      }, {
        passive: true
      });
    });
  },

  // Get Elements
  getElements() {
    return swipeable.elements;
  }

};
exports.swipeable = swipeable;
},{}],"node_modules/cantil/src/cantil.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "observable", {
  enumerable: true,
  get: function () {
    return _intersectionObserver.observable;
  }
});
Object.defineProperty(exports, "onDomReady", {
  enumerable: true,
  get: function () {
    return _utils.onDomReady;
  }
});
Object.defineProperty(exports, "once", {
  enumerable: true,
  get: function () {
    return _utils.once;
  }
});
exports.queryAll = exports.query = void 0;
Object.defineProperty(exports, "swipeable", {
  enumerable: true,
  get: function () {
    return _swipeable.swipeable;
  }
});
Object.defineProperty(exports, "template", {
  enumerable: true,
  get: function () {
    return _utils.template;
  }
});

var _utils = require("./utils/utils");

var _intersectionObserver = require("./utils/intersection-observer");

var _swipeable = require("./utils/swipeable");

// Prototype
Object.setPrototypeOf(NodeList.prototype, Array.prototype);
Object.setPrototypeOf(HTMLCollection.prototype, Array.prototype); // Query

const query = document.querySelector.bind(document);
exports.query = query;
const queryAll = document.querySelectorAll.bind(document);
exports.queryAll = queryAll;
window.query = query;
window.queryAll = queryAll;

Node.prototype.query = function query(selector) {
  return this.querySelector(selector);
};

Node.prototype.queryAll = function queryAll(selector) {
  return this.querySelectorAll(selector);
};

NodeList.prototype.query = function query(selector) {
  return this.queryAll(selector)[0];
};

NodeList.prototype.queryAll = function queryAll(selector) {
  return this.map(elem => Array.from(elem.queryAll(selector))).flat();
}; // Sibling util


Node.prototype.sibling = function sibling(query) {
  return this.siblings(query)[0];
};

Node.prototype.siblings = function siblings(query) {
  const elems = query ? this.parentElement.queryAll(query) : this.parentElement.children;
  return elems.filter(e => this !== e);
}; // Index util


Node.prototype.index = function index() {
  let elem = this;
  let i = -1;

  while (elem) {
    elem = elem.previousElementSibling;
    i += 1;
  }

  return i;
}; // Trigger events


Node.prototype.trigger = function trigger(event, init) {
  this.dispatchEvent(new CustomEvent(event, init));
};
},{"./utils/utils":"node_modules/cantil/src/utils/utils.js","./utils/intersection-observer":"node_modules/cantil/src/utils/intersection-observer.js","./utils/swipeable":"node_modules/cantil/src/utils/swipeable.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("bootstrap/dist/css/bootstrap.min.css");

var _cantil = require("cantil");

var form = (0, _cantil.query)("form");
form.query("button").addEventListener("click", function (event) {
  event.preventDefault();
  var status = form.checkValidity();
  form.reportValidity();

  if (!status) {
    return false;
  } // get form values


  var cost = Number(form.query("#cost").value);
  var volume = Number(form.query("#volume").value);
  var weekdays = Number(form.query("#days").value);
  var proporcion = Number(form.query("#proporcion").value) / 100;
  var population = Number(form.query("#population").value);
  var affectedDays = proporcion * weekdays;
  var affectedCapacity = affectedDays / (weekdays === 5 ? 250 : 365);
  var costEstimated = affectedCapacity * cost;
  var costPerPerson = (costEstimated / population).toFixed(2);
  form.query("[affected-days]").innerText = affectedDays;
  form.query("[affected-capacity]").innerText = affectedCapacity;
  form.query("[cost-estimated]").innerText = costEstimated;
  form.query("[cost-per-person]").innerText = costPerPerson; // show results

  form.query(".alert").classList.remove("d-none");
});
},{"bootstrap/dist/css/bootstrap.min.css":"node_modules/bootstrap/dist/css/bootstrap.min.css","cantil":"node_modules/cantil/src/cantil.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55482" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map