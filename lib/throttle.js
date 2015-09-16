"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _throttle;

function _throttle(fn, threshhold, scope) {
  if (threshhold === undefined) threshhold = 250;

  threshhold || (threshhold = 250);
  var last = undefined,
      deferTimer = undefined;
  return function () {
    var context = scope || this;
    var now = +new Date(),
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

module.exports = exports["default"];