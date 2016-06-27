'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getNodeDimensions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _getCloneDimensions = require('./get-clone-dimensions');

var _getCloneDimensions2 = _interopRequireDefault(_getCloneDimensions);

function getNodeDimensions(node) {
  var accurate = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  var rect = node.getBoundingClientRect();
  var width = rect.width;
  var height = rect.height;

  if (accurate) {
    var cloneDimensions = (0, _getCloneDimensions2['default'])(node);
    width = cloneDimensions.width;
    height = cloneDimensions.height;
  }

  return {
    width: width,
    height: height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left
  };
}

module.exports = exports['default'];