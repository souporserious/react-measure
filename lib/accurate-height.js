'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = accurateHeight;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dataStore = require('./data-store');

var _dataStore2 = _interopRequireDefault(_dataStore);

var _getCloneHeight = require('./get-clone-height');

var _getCloneHeight2 = _interopRequireDefault(_getCloneHeight);

function getStyle(node) {
  return (0, _dataStore2['default'])(node, 'style') || (0, _dataStore2['default'])(node, 'style', getComputedStyle(node));
}

// inspired by http://stackoverflow.com/a/8235013/1461204

function accurateHeight(node) {
  var children = node.children;

  // if no children present on the node or an SVG element
  // we need to clone it to get a true height
  if (!children || children && children.length === 0 || node instanceof SVGElement) {
    return (0, _getCloneHeight2['default'])(node);
  }

  var firstChild = children[0];
  var lastChild = children[children.length - 1];

  var _getStyle = getStyle(firstChild);

  var marginTop = _getStyle.marginTop;

  var _getStyle2 = getStyle(lastChild);

  var marginBottom = _getStyle2.marginBottom;

  var offsetDiff = lastChild.offsetTop - firstChild.offsetTop;

  return parseInt(marginTop) + (offsetDiff + lastChild.offsetHeight) + parseInt(marginBottom);
}

module.exports = exports['default'];