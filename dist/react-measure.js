(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactDOM"), require("shallowCompare"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOM", "shallowCompare"], factory);
	else if(typeof exports === 'object')
		exports["Measure"] = factory(require("React"), require("ReactDOM"), require("shallowCompare"));
	else
		root["Measure"] = factory(root["React"], root["ReactDOM"], root["shallowCompare"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
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

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactLibShallowCompare = __webpack_require__(4);

	var _reactLibShallowCompare2 = _interopRequireDefault(_reactLibShallowCompare);

	var _diffConfig = __webpack_require__(5);

	var _diffConfig2 = _interopRequireDefault(_diffConfig);

	var _getNodeDimensions = __webpack_require__(6);

	var _getNodeDimensions2 = _interopRequireDefault(_getNodeDimensions);

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

	    this.getDimensions = function (mutations) {
	      var shouldMeasure = _this.props.shouldMeasure(mutations);

	      // bail out if we shouldn't measure
	      if (!shouldMeasure) return;

	      var dimensions = (0, _getNodeDimensions2['default'])(_this._node, _this.props.accurate);

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

	      // fire callback for first render
	      this.getDimensions();
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(_ref) {
	      var config = _ref.config;
	      var whitelist = _ref.whitelist;
	      var blacklist = _ref.blacklist;

	      // disconnect the old observer and reconnect with new config if changed
	      if ((0, _diffConfig2['default'])(this.props.config, config)) {
	        console.log('buttjoe');
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
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return (0, _reactLibShallowCompare2['default'])(this, nextProps, nextState);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._disconnectObserver();
	    }
	  }, {
	    key: '_connectObserver',
	    value: function _connectObserver(config) {
	      this._observer = new MutationObserver(this.getDimensions);
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
	        childList: true
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
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = getNodeDimensions;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _accurateHeight = __webpack_require__(7);

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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = accurateHeight;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _dataStore = __webpack_require__(8);

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

/***/ },
/* 8 */
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

/***/ }
/******/ ])
});
;