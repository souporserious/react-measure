'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = accurateHeight;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dataStore = require('./data-store');

var _dataStore2 = _interopRequireDefault(_dataStore);

function getStyle(node) {
  return (0, _dataStore2['default'])(node, 'style') || (0, _dataStore2['default'])(node, 'style', getComputedStyle(node));
}

// inspired by http://stackoverflow.com/a/8235013/1461204

function accurateHeight(node) {
  var children = node.children;

  var amount = children.length;

  if (amount === 0) {
    return node.offsetHeight;
  }

  var firstChild = children[0];
  var lastChild = children[amount - 1];

  var _getStyle = getStyle(firstChild);

  var marginTop = _getStyle.marginTop;

  var _getStyle2 = getStyle(lastChild);

  var marginBottom = _getStyle2.marginBottom;

  var offsetDiff = lastChild.offsetTop - firstChild.offsetTop;

  return offsetDiff + lastChild.offsetHeight + parseInt(marginTop) + parseInt(marginBottom);
}

module.exports = exports['default'];