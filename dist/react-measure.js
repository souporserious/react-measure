(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["Measure"] = factory(require("React"));
	else
		root["Measure"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _MeasureChild = __webpack_require__(3);

	var _MeasureChild2 = _interopRequireDefault(_MeasureChild);

	var _getNodeDimensions = __webpack_require__(4);

	var _getNodeDimensions2 = _interopRequireDefault(_getNodeDimensions);

	var Measure = (function (_Component) {
	  function Measure() {
	    var _this = this;

	    _classCallCheck(this, Measure);

	    _get(Object.getPrototypeOf(Measure.prototype), 'constructor', this).apply(this, arguments);

	    this._whitelist = this.props.whitelist || ['width', 'height', 'top', 'right', 'bottom', 'left'];
	    this._properties = this._whitelist.filter(function (prop) {
	      return _this.props.blacklist.indexOf(prop) < 0;
	    });
	    this._portal = null;
	    this._lastDimensions = {};

	    this._cloneMounted = function (dimensions) {
	      _this._update(dimensions);

	      // remove component and portal since we no longer need it
	      _react2['default'].unmountComponentAtNode(_this._portal);
	      _this._closePortal();
	    };
	  }

	  _inherits(Measure, _Component);

	  _createClass(Measure, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._node = _react2['default'].findDOMNode(this);

	      if (this.props.clone) {
	        this._cloneComponent();
	      } else {
	        this._update((0, _getNodeDimensions2['default'])(this._node));
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      // we check for parent node because we we're getting some weird issues
	      // with React Motion specifically and it causing an error on unmount
	      // because parent would return null, might be a bigger problem to look into
	      if (this.props.clone && this._node.parentNode) {
	        this._cloneComponent();
	      } else {
	        this._update((0, _getNodeDimensions2['default'])(this._node));
	      }
	    }
	  }, {
	    key: '_openPortal',
	    value: function _openPortal() {
	      var portal = document.createElement('div');

	      // set styles to hide portal from view
	      portal.style.cssText = '\n      height: 0;\n      position: relative;\n      overflow: hidden;\n    ';

	      this._portal = portal;

	      // append portal next to this component
	      this._node.parentNode.insertBefore(portal, this._node.nextSibling);
	    }
	  }, {
	    key: '_closePortal',
	    value: function _closePortal() {
	      this._portal.parentNode.removeChild(this._portal);
	    }
	  }, {
	    key: '_cloneComponent',
	    value: function _cloneComponent() {
	      var onMount = this._cloneMounted;
	      var clone = (0, _react.cloneElement)(this.props.children);
	      var child = _react2['default'].createElement(_MeasureChild2['default'], { onMount: onMount }, clone);

	      // create a portal to append clone to
	      this._openPortal();

	      // render clone to the portal
	      _react2['default'].render(child, this._portal);
	    }
	  }, {
	    key: '_update',
	    value: function _update(dimensions) {
	      var _this2 = this;

	      // determine if we need to update our callback with new dimensions or not
	      this._properties.forEach(function (prop) {
	        if (dimensions[prop] !== _this2._lastDimensions[prop]) {
	          _this2.props.onChange(dimensions);

	          // store last dimensions to compare changes
	          _this2._lastDimensions = dimensions;

	          // we don't need to look any further, bail out
	          return;
	        }
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
	      clone: _react.PropTypes.bool,
	      whitelist: _react.PropTypes.array,
	      blacklist: _react.PropTypes.array,
	      onChange: _react.PropTypes.func
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      clone: false,
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _getNodeDimensions = __webpack_require__(4);

	var _getNodeDimensions2 = _interopRequireDefault(_getNodeDimensions);

	var MeasureChild = (function (_Component) {
	  function MeasureChild() {
	    _classCallCheck(this, MeasureChild);

	    _get(Object.getPrototypeOf(MeasureChild.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _inherits(MeasureChild, _Component);

	  _createClass(MeasureChild, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var node = _react2['default'].findDOMNode(this);

	      // fire a callback to let Measure know our dimensions
	      this.props.onMount((0, _getNodeDimensions2['default'])(node, true));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return this.props.children;
	    }
	  }]);

	  return MeasureChild;
	})(_react.Component);

	exports['default'] = MeasureChild;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = getNodeDimensions;

	function getNodeDimensions(node) {
	  var clone = arguments[1] === undefined ? false : arguments[1];

	  if (clone) {
	    // set width/height to auto to get a true calculation
	    node.style.width = 'auto';
	    node.style.height = 'auto';

	    // move node exactly on top of it's clone to calculate proper position
	    // this also overrides any transform already set, so something like scale
	    // won't affect the calculation, could be bad to do this,
	    // but we'll see what happens
	    node.style.transform = 'translateY(-100%)';
	    node.style.WebkitTransform = 'translateY(-100%)';
	  }

	  var rect = node.getBoundingClientRect();

	  return {
	    width: rect.width,
	    height: rect.height,
	    top: rect.top,
	    right: rect.right,
	    bottom: rect.bottom,
	    left: rect.left
	  };
	}

	module.exports = exports['default'];

/***/ }
/******/ ])
});
;