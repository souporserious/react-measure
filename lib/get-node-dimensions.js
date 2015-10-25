'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getNodeDimensions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _accurateHeight = require('./accurate-height');

var _accurateHeight2 = _interopRequireDefault(_accurateHeight);

function getNodeDimensions(node) {
  var accurate = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  var rect = node.getBoundingClientRect();

  return {
    width: rect.width,
    height: accurate ? (0, _accurateHeight2['default'])(node) : rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left
  };
}

module.exports = exports['default'];