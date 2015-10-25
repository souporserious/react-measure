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

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactLibShallowCompare = __webpack_require__(4);

	var _reactLibShallowCompare2 = _interopRequireDefault(_reactLibShallowCompare);

	var _getNodeDimensions = __webpack_require__(5);

	var _getNodeDimensions2 = _interopRequireDefault(_getNodeDimensions);

	var Measure = (function (_Component) {
	  _inherits(Measure, _Component);

	  function Measure() {
	    var _this = this;

	    _classCallCheck(this, Measure);

	    _get(Object.getPrototypeOf(Measure.prototype), 'constructor', this).apply(this, arguments);

	    this._whitelist = this.props.whitelist;
	    this._properties = this._whitelist.filter(function (prop) {
	      return _this.props.blacklist.indexOf(prop) < 0;
	    });
	    this._observer = null;
	    this._node = null;
	    this._lastDimensions = {};

	    this.getDimensions = function () {
	      var mutations = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	      var dimensions = (0, _getNodeDimensions2['default'])(_this._node, _this.props.accurate);

	      // determine if we need to update our callback with new dimensions or not
	      _this._properties.some(function (prop) {
	        if (dimensions[prop] !== _this._lastDimensions[prop]) {
	          _this.props.onChange(dimensions, mutations);

	          // store last dimensions to compare changes
	          _this._lastDimensions = dimensions;

	          // we don't need to look any further, bail out
	          return true;
	        }
	      });
	    };

	    this._onMutation = function (mutations) {
	      _this.getDimensions(mutations);
	    };
	  }

	  _createClass(Measure, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._node = _reactDom2['default'].findDOMNode(this);

	      // set up mutation observer
	      this._observer = new MutationObserver(this._onMutation);
	      this._observer.observe(this._node, this.props.config);

	      // fire callback for first render
	      this.getDimensions();
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return (0, _reactLibShallowCompare2['default'])(this, nextProps, nextState);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._observer.disconnect();
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
	      onChange: _react.PropTypes.func
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      config: {
	        childList: true,
	        attributes: false,
	        characterData: false,
	        subtree: true
	      },
	      accurate: false,
	      whitelist: ['width', 'height', 'top', 'right', 'bottom', 'left'],
	      blacklist: [],
	      onChange: function onChange() {
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = getNodeDimensions;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _accurateHeight = __webpack_require__(6);

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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = getHeight;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _dataStore = __webpack_require__(7);

	var _dataStore2 = _interopRequireDefault(_dataStore);

	function getStyle(node) {
	  return (0, _dataStore2['default'])(node, 'style') || (0, _dataStore2['default'])(node, 'style', getComputedStyle(node));
	}

	function getHeight(el) {
	  var children = el.children;

	  var firstChild = children[0];
	  var lastChild = children[children.length - 1];

	  var _getStyle = getStyle(firstChild);

	  var marginTop = _getStyle.marginTop;

	  var _getStyle2 = getStyle(lastChild);

	  var marginBottom = _getStyle2.marginBottom;

	  var offsetDiff = lastChild.offsetTop - firstChild.offsetTop;

	  return offsetDiff + lastChild.offsetHeight + parseInt(marginTop) + parseInt(marginBottom);
	}

	module.exports = exports['default'];

/***/ },
/* 7 */
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