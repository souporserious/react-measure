"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _debounce;

function _debounce(fn) {
  var delay = arguments.length <= 1 || arguments[1] === undefined ? 250 : arguments[1];

  var timer = null;
  return function () {
    var context = this,
        args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

module.exports = exports["default"];