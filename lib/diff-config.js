'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = diffConfig;
var CONFIG_SHAPE = ['childList', 'attributes', 'characterData', 'subtree', 'attributeOldValue', 'characterDataOldValue', 'attributeFilter'];

function diffConfig(prev, next) {
  for (var i = 7; i--;) {
    var config = CONFIG_SHAPE[i];
    var prevConfig = prev[config];
    var nextConfig = next[config];

    // if equal continue to the next
    if (prevConfig === nextConfig) {
      continue;
    }

    var prevUndefined = typeof prevConfig === 'undefined';
    var nextUndefined = typeof nextConfig === 'undefined';

    // if attributeFilter, we know it needs to be a simple array,
    // so comparing lengths should be enough to know if it has changed
    if (prevUndefined && !nextUndefined || !prevUndefined && nextUndefined || config === 'attributeFilter' && prevConfig.length !== nextConfig.length) {
      return true;
    }
  }
  return false;
}

module.exports = exports['default'];