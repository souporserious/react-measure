/*!
 * React Measure 1.4.6
 * https://github.com/souporserious/react-measure
 * Copyright (c) 2017 React Measure Authors
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("resize-observer-polyfill"), require("get-node-dimensions"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "resize-observer-polyfill", "get-node-dimensions"], factory);
	else if(typeof exports === 'object')
		exports["Measure"] = factory(require("react"), require("react-dom"), require("resize-observer-polyfill"), require("get-node-dimensions"));
	else
		root["Measure"] = factory(root["React"], root["ReactDOM"], root["ResizeObserver"], root["getNodeDimensions"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _Measure = __webpack_require__(1);

	var _Measure2 = _interopRequireDefault(_Measure);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Measure2.default;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _resizeObserverPolyfill = __webpack_require__(4);

	var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

	var _getNodeDimensions = __webpack_require__(5);

	var _getNodeDimensions2 = _interopRequireDefault(_getNodeDimensions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Measure = function (_Component) {
	  _inherits(Measure, _Component);

	  function Measure(props) {
	    _classCallCheck(this, Measure);

	    var _this = _possibleConstructorReturn(this, (Measure.__proto__ || Object.getPrototypeOf(Measure)).call(this, props));

	    _this.measure = function () {
	      var includeMargin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.includeMargin;
	      var useClone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.useClone;

	      // bail out if we shouldn't measure
	      if (!_this.props.shouldMeasure) return;

	      // if no parent available we need to requery the DOM node
	      if (!_this._node.parentNode) {
	        _this._setDOMNode();
	      }

	      var dimensions = _this.getDimensions(_this._node, includeMargin, useClone);
	      var isChildFunction = typeof _this.props.children === 'function';

	      // determine if we need to update our callback with new dimensions or not
	      _this._propsToMeasure.some(function (prop) {
	        if (dimensions[prop] !== _this._lastDimensions[prop]) {
	          // update our callback if we've found a dimension that has changed
	          _this.props.onMeasure(dimensions);

	          // update state to send dimensions to child function
	          if (isChildFunction && typeof _this !== 'undefined') {
	            _this.setState({ dimensions: dimensions });
	          }

	          // store last dimensions to compare changes
	          _this._lastDimensions = dimensions;

	          // we don't need to look any further, bail out
	          return true;
	        }
	      });
	    };

	    _this.state = {
	      dimensions: {
	        width: 0,
	        height: 0,
	        top: 0,
	        right: 0,
	        bottom: 0,
	        left: 0
	      }
	    };
	    _this._node = null;
	    _this._propsToMeasure = _this._getPropsToMeasure(props);
	    _this._lastDimensions = {};
	    return _this;
	  }

	  _createClass(Measure, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._setDOMNode();

	      // measure on first render
	      this.measure();

	      // add component to resize observer to detect changes on resize
	      // Komodo - binds function to this context to resolve issues with IE
	      this.resizeObserver = new _resizeObserverPolyfill2.default(function () {
	        this.measure();
	      }.bind(this));
	      this.resizeObserver.observe(this._node);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(_ref) {
	      var config = _ref.config;
	      var whitelist = _ref.whitelist;
	      var blacklist = _ref.blacklist;

	      // we store the properties ourselves so we need to update them if the
	      // whitelist or blacklist props have changed
	      if (this.props.whitelist !== whitelist || this.props.blacklist !== blacklist) {
	        this._propsToMeasure = this._getPropsToMeasure({ whitelist: whitelist, blacklist: blacklist });
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.resizeObserver.disconnect(this._node);
	      this._node = null;
	    }
	  }, {
	    key: '_setDOMNode',
	    value: function _setDOMNode() {
	      this._node = _reactDom2.default.findDOMNode(this);
	    }
	  }, {
	    key: 'getDimensions',
	    value: function getDimensions() {
	      var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._node;
	      var includeMargin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.includeMargin;
	      var useClone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props.useClone;
	      var cloneOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.props.cloneOptions;

	      return (0, _getNodeDimensions2.default)(node, _extends({
	        margin: includeMargin,
	        clone: useClone
	      }, cloneOptions));
	    }
	  }, {
	    key: '_getPropsToMeasure',
	    value: function _getPropsToMeasure(_ref2) {
	      var whitelist = _ref2.whitelist;
	      var blacklist = _ref2.blacklist;

	      return whitelist.filter(function (prop) {
	        return blacklist.indexOf(prop) < 0;
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var children = this.props.children;

	      return _react.Children.only(typeof children === 'function' ? children(this.state.dimensions) : children);
	    }
	  }]);

	  return Measure;
	}(_react.Component);

	Measure.propTypes = {
	  whitelist: _react.PropTypes.array,
	  blacklist: _react.PropTypes.array,
	  includeMargin: _react.PropTypes.bool,
	  useClone: _react.PropTypes.bool,
	  cloneOptions: _react.PropTypes.object,
	  shouldMeasure: _react.PropTypes.bool,
	  onMeasure: _react.PropTypes.func
	};
	Measure.defaultProps = {
	  whitelist: ['width', 'height', 'top', 'right', 'bottom', 'left'],
	  blacklist: [],
	  includeMargin: true,
	  useClone: false,
	  cloneOptions: {},
	  shouldMeasure: true,
	  onMeasure: function onMeasure() {
	    return null;
	  }
	};
	exports.default = Measure;
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

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }
/******/ ])
});
;