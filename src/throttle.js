export default function _throttle(fn, threshhold = 250, scope) {
  threshhold || (threshhold = 250);
  let last,
      deferTimer;
  return function () {
    let context = scope || this;
    let now = +new Date,
        args = arguments;
    if(last && now < last + threshhold) {
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