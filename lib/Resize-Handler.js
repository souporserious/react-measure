'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodashDebounce = require('lodash.debounce');

var _lodashDebounce2 = _interopRequireDefault(_lodashDebounce);

var ResizeHandler = (function () {
  function ResizeHandler() {
    _classCallCheck(this, ResizeHandler);

    this._queue = [];
    this.update = (0, _lodashDebounce2['default'])(this.update.bind(this), 150);
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.update);
    }
  }

  _createClass(ResizeHandler, [{
    key: 'destroy',
    value: function destroy() {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', this.update);
      }
    }
  }, {
    key: 'add',
    value: function add(component) {
      this._queue.push(component);
    }
  }, {
    key: 'remove',
    value: function remove(component) {
      var pos = this._queue.indexOf(component);
      if (pos > -1) {
        this._queue.splice(pos, 1);
      }
    }
  }, {
    key: 'update',
    value: function update() {
      for (var i = this._queue.length; i--;) {
        this._queue[i]._measure();
      }
    }
  }]);

  return ResizeHandler;
})();

exports['default'] = ResizeHandler;
module.exports = exports['default'];