// inspired by https://github.com/julianshapiro/velocity/blob/master/velocity.js
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = dataStore;
var expando = 'react-measure' + new Date().getTime();
var cache = {};
var uuid = 0;

function dataStore(node, key, value) {
  if (value === undefined) {
    var id = node[expando];
    var store = id && cache[id];

    if (key === undefined) {
      return store;
    } else if (store) {
      if (key in store) {
        return store[key];
      }
    }
  } else if (key !== undefined) {
    var id = node[expando] || (node[expando] = ++uuid);

    cache[id] = cache[id] || {};
    cache[id][key] = value;

    return value;
  }
}

module.exports = exports['default'];