'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = resizeDetector;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _elementResizeDetector = require('element-resize-detector');

var _elementResizeDetector2 = _interopRequireDefault(_elementResizeDetector);

var instance = null;

function resizeDetector() {
  if (!instance) {
    instance = (0, _elementResizeDetector2['default'])({
      strategy: 'scroll'
    });
  }
  return instance;
}

module.exports = exports['default'];