(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactDOM"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOM"], factory);
	else if(typeof exports === 'object')
		exports["Measure"] = factory(require("React"), require("ReactDOM"));
	else
		root["Measure"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Measure = __webpack_require__(1);

	var _Measure2 = _interopRequireDefault(_Measure);

	exports['default'] = _Measure2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _ResizeHandler = __webpack_require__(4);

	var _ResizeHandler2 = _interopRequireDefault(_ResizeHandler);

	var _diffConfig = __webpack_require__(7);

	var _diffConfig2 = _interopRequireDefault(_diffConfig);

	var _getNodeDimensions = __webpack_require__(8);

	var _getNodeDimensions2 = _interopRequireDefault(_getNodeDimensions);

	var resizeHandler = new _ResizeHandler2['default']();

	var Measure = (function (_Component) {
	  _inherits(Measure, _Component);

	  function Measure() {
	    var _this = this;

	    _classCallCheck(this, Measure);

	    _get(Object.getPrototypeOf(Measure.prototype), 'constructor', this).apply(this, arguments);

	    this._observer = null;
	    this._node = null;
	    this._properties = this._getProperties(this.props);
	    this._lastDimensions = {};

	    this._measure = function (mutations) {
	      var shouldMeasure = _this.props.shouldMeasure(mutations);

	      // bail out if we shouldn't measure
	      if (!shouldMeasure) return;

	      var dimensions = _this.getDimensions(_this._node, _this.props.accurate);

	      // determine if we need to update our callback with new dimensions or not
	      _this._properties.some(function (prop) {
	        if (dimensions[prop] !== _this._lastDimensions[prop]) {
	          // if we've found a dimension that has changed, update our callback
	          // we also allow shouldMeasure to return any values so the end user
	          // doesn't have to recalculate anything
	          _this.props.onMeasure(dimensions, mutations, shouldMeasure);

	          // store last dimensions to compare changes
	          _this._lastDimensions = dimensions;

	          // we don't need to look any further, bail out
	          return true;
	        }
	      });
	    };
	  }

	  _createClass(Measure, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._node = _reactDom2['default'].findDOMNode(this);

	      // set up mutation observer
	      this._connectObserver(this.props.config);

	      // measure on first render
	      this._measure(null);

	      // add component to resize handler to detect changes on resize
	      resizeHandler.add(this);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(_ref) {
	      var config = _ref.config;
	      var whitelist = _ref.whitelist;
	      var blacklist = _ref.blacklist;

	      // disconnect the old observer and reconnect with new config if changed
	      if ((0, _diffConfig2['default'])(this.props.config, config)) {
	        this._disconnectObserver();
	        this._connectObserver(config);
	      }

	      // we store the properties ourselves so we need to update them if the
	      // whitelist or blacklist props have changed
	      if (this.props.whitelist !== whitelist || this.props.blacklist !== blacklist) {
	        this._properties = this._getProperties({ whitelist: whitelist, blacklist: blacklist });
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._disconnectObserver();
	      resizeHandler.remove(this);
	    }
	  }, {
	    key: 'getDimensions',
	    value: function getDimensions() {
	      var node = arguments.length <= 0 || arguments[0] === undefined ? this._node : arguments[0];
	      var accurate = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	      return (0, _getNodeDimensions2['default'])(node, accurate);
	    }
	  }, {
	    key: '_connectObserver',
	    value: function _connectObserver(config) {
	      this._observer = new MutationObserver(this._measure);
	      this._observer.observe(this._node, config);
	    }
	  }, {
	    key: '_disconnectObserver',
	    value: function _disconnectObserver() {
	      this._observer.disconnect();
	    }
	  }, {
	    key: '_getProperties',
	    value: function _getProperties(_ref2) {
	      var whitelist = _ref2.whitelist;
	      var blacklist = _ref2.blacklist;

	      return whitelist.filter(function (prop) {
	        return blacklist.indexOf(prop) < 0;
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react.Children.only(this.props.children);
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      config: _react.PropTypes.object,
	      accurate: _react.PropTypes.bool,
	      whitelist: _react.PropTypes.array,
	      blacklist: _react.PropTypes.array,
	      shouldMeasure: _react.PropTypes.func,
	      onMeasure: _react.PropTypes.func
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      config: {
	        childList: true,
	        attributes: true
	      },
	      accurate: false,
	      whitelist: ['width', 'height', 'top', 'right', 'bottom', 'left'],
	      blacklist: [],
	      shouldMeasure: function shouldMeasure() {
	        return true;
	      },
	      onMeasure: function onMeasure() {
	        return null;
	      }
	    },
	    enumerable: true
	  }]);

	  return Measure;
	})(_react.Component);

	exports['default'] = Measure;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _lodashDebounce = __webpack_require__(5);

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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	'use strict';

	var getNative = __webpack_require__(6);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeNow = getNative(Date, 'now');

	/**
	 * Gets the number of milliseconds that have elapsed since the Unix epoch
	 * (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @category Date
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => logs the number of milliseconds it took for the deferred function to be invoked
	 */
	var now = nativeNow || function () {
	  return new Date().getTime();
	};

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed invocations. Provide an options object to indicate that `func`
	 * should be invoked on the leading and/or trailing edge of the `wait` timeout.
	 * Subsequent calls to the debounced function return the result of the last
	 * `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	 * on the trailing edge of the timeout only if the the debounced function is
	 * invoked more than once during the `wait` timeout.
	 *
	 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options] The options object.
	 * @param {boolean} [options.leading=false] Specify invoking on the leading
	 *  edge of the timeout.
	 * @param {number} [options.maxWait] The maximum time `func` is allowed to be
	 *  delayed before it is invoked.
	 * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	 *  edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // avoid costly calculations while the window size is in flux
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
	 * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // ensure `batchLog` is invoked once after 1 second of debounced calls
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', _.debounce(batchLog, 250, {
	 *   'maxWait': 1000
	 * }));
	 *
	 * // cancel a debounced call
	 * var todoChanges = _.debounce(batchLog, 1000);
	 * Object.observe(models.todo, todoChanges);
	 *
	 * Object.observe(models, function(changes) {
	 *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
	 *     todoChanges.cancel();
	 *   }
	 * }, ['delete']);
	 *
	 * // ...at some point `models.todo` is changed
	 * models.todo.completed = true;
	 *
	 * // ...before 1 second has passed `models.todo` is deleted
	 * // which cancels the debounced `todoChanges` call
	 * delete models.todo;
	 */
	function debounce(func, wait, options) {
	  var args,
	      maxTimeoutId,
	      result,
	      stamp,
	      thisArg,
	      timeoutId,
	      trailingCall,
	      lastCalled = 0,
	      maxWait = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = wait < 0 ? 0 : +wait || 0;
	  if (options === true) {
	    var leading = true;
	    trailing = false;
	  } else if (isObject(options)) {
	    leading = !!options.leading;
	    maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function cancel() {
	    if (timeoutId) {
	      clearTimeout(timeoutId);
	    }
	    if (maxTimeoutId) {
	      clearTimeout(maxTimeoutId);
	    }
	    lastCalled = 0;
	    maxTimeoutId = timeoutId = trailingCall = undefined;
	  }

	  function complete(isCalled, id) {
	    if (id) {
	      clearTimeout(id);
	    }
	    maxTimeoutId = timeoutId = trailingCall = undefined;
	    if (isCalled) {
	      lastCalled = now();
	      result = func.apply(thisArg, args);
	      if (!timeoutId && !maxTimeoutId) {
	        args = thisArg = undefined;
	      }
	    }
	  }

	  function delayed() {
	    var remaining = wait - (now() - stamp);
	    if (remaining <= 0 || remaining > wait) {
	      complete(trailingCall, maxTimeoutId);
	    } else {
	      timeoutId = setTimeout(delayed, remaining);
	    }
	  }

	  function maxDelayed() {
	    complete(trailing, timeoutId);
	  }

	  function debounced() {
	    args = arguments;
	    stamp = now();
	    thisArg = this;
	    trailingCall = trailing && (timeoutId || !leading);

	    if (maxWait === false) {
	      var leadingCall = leading && !timeoutId;
	    } else {
	      if (!maxTimeoutId && !leading) {
	        lastCalled = stamp;
	      }
	      var remaining = maxWait - (stamp - lastCalled),
	          isCalled = remaining <= 0 || remaining > maxWait;

	      if (isCalled) {
	        if (maxTimeoutId) {
	          maxTimeoutId = clearTimeout(maxTimeoutId);
	        }
	        lastCalled = stamp;
	        result = func.apply(thisArg, args);
	      } else if (!maxTimeoutId) {
	        maxTimeoutId = setTimeout(maxDelayed, remaining);
	      }
	    }
	    if (isCalled && timeoutId) {
	      timeoutId = clearTimeout(timeoutId);
	    } else if (!timeoutId && wait !== maxWait) {
	      timeoutId = setTimeout(delayed, wait);
	    }
	    if (leadingCall) {
	      isCalled = true;
	      result = func.apply(thisArg, args);
	    }
	    if (isCalled && !timeoutId && !maxTimeoutId) {
	      args = thisArg = undefined;
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  return debounced;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = debounce;

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	'use strict';

	var funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = getNative;

/***/ },
/* 7 */
/***/ function(module, exports) {

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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = getNodeDimensions;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _accurateHeight = __webpack_require__(9);

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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = accurateHeight;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _dataStore = __webpack_require__(10);

	var _dataStore2 = _interopRequireDefault(_dataStore);

	var _getCloneHeight = __webpack_require__(11);

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

/***/ },
/* 10 */
/***/ function(module, exports) {

	// inspired by https://github.com/julianshapiro/velocity/blob/master/velocity.js
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = dataStore;
	var expando = 'react-measure' + new Date().getTime();
	var cache = {};
	var uuid = 0;

	function dataStore(node, key, value) {
	  if (value === undefined) {
	    var id = node[expando];
	    var store = id && cache[id];

	    if (key === undefined) {
	      return store;
	    } else if (store) {
	      if (key in store) {
	        return store[key];
	      }
	    }
	  } else if (key !== undefined) {
	    var id = node[expando] || (node[expando] = ++uuid);

	    cache[id] = cache[id] || {};
	    cache[id][key] = value;

	    return value;
	  }
	}

	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = getCloneHeight;

	function getCloneHeight(node) {
	  var parentNode = node.parentNode;

	  var context = document.createElement('div');
	  var clone = node.cloneNode(true);
	  var height = 0;

	  // give the node some context to measure off of
	  // height and overflow prevent scrollbars from node copy
	  context.style.height = 0;
	  context.style.position = 'relative';
	  context.style.overflow = 'hidden';

	  // clean up any attributes that might cause a conflict
	  clone.setAttribute('id', '');
	  clone.setAttribute('name', '');
	  clone.setAttribute('data-reactid', '');

	  // set props to hide copy and get a true height calculation
	  clone.style.boxSizing = 'border-box';
	  clone.style.height = 'auto';
	  clone.style.position = 'absolute';
	  clone.style.visibility = 'hidden';

	  // append copy to context
	  context.appendChild(clone);

	  // append context to DOM so we can measure
	  parentNode.appendChild(context);

	  // get height
	  height = clone.scrollHeight;

	  // destroy clone
	  parentNode.removeChild(context);

	  return height;
	}

	module.exports = exports['default'];

/***/ }
/******/ ])
});
;