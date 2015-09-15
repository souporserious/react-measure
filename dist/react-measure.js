(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactMeasure"] = factory(require("React"));
	else
		root["ReactMeasure"] = factory(root["React"]);
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

	exports.Measure = _Measure2['default'];

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

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

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

	function _debounce(fn) {
	  var delay = arguments[1] === undefined ? 250 : arguments[1];

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

	var Measure = (function (_Component) {
	  function Measure(props) {
	    _classCallCheck(this, Measure);

	    _get(Object.getPrototypeOf(Measure.prototype), 'constructor', this).call(this, props);
	    this.state = { height: 0 };
	    this._node = null;
	    this._nodeCopy = null;
	    this._nodeParent = null;
	    this._copyAppended = false;
	    this._debounceDelay = 350;
	    this._forceMeasure = this._forceMeasure.bind(this);
	  }

	  _inherits(Measure, _Component);

	  _createClass(Measure, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this._removeClone = _debounce(this._removeClone, this._debounceDelay);
	      this._forceMeasure = _throttle(this._forceMeasure, 300);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._node = _react2['default'].findDOMNode(this);
	      this._parentNode = this._node.parentNode;
	      this.setState({ height: this._calcHeight(this._node) });

	      window.addEventListener('resize', this._forceMeasure);
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      var height = this._calcHeight(this._node);

	      if (+prevState.height !== +height) {
	        this.setState({ height: height });
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      window.removeEventListener('resize', this._forceMeasure);
	    }
	  }, {
	    key: '_forceMeasure',
	    value: function _forceMeasure() {
	      this.forceUpdate();
	    }
	  }, {
	    key: '_calcHeight',
	    value: function _calcHeight(node) {
	      var height = undefined;

	      if (!this._copyAppended) {
	        var context = document.createElement('div');
	        var copy = node.cloneNode(true);

	        // give the node some context to measure off of
	        // height and overflow prevent scrollbars
	        context.style.height = 0;
	        context.style.position = 'relative';
	        context.style.overflow = 'hidden';
	        //copy.style.transform = 'translateY(-100%)';

	        // remove name from all children inputs so they don't conflict with current ones
	        var inputNodes = copy.querySelectorAll('input');
	        for (var i = inputNodes.length; i--;) {
	          inputNodes[i].setAttribute('name', '');
	        }

	        // remove copy and children react id's so it doesn't conflict with current ones
	        var reactNodes = copy.querySelectorAll('[data-reactid]');
	        copy.setAttribute('data-reactid', '');
	        for (var j = reactNodes.length; j--;) {
	          reactNodes[j].setAttribute('data-reactid', '');
	        }

	        // set props to hide copy and get true dimensions
	        copy.style.height = 'auto';
	        copy.style.width = '100%';
	        copy.style.position = 'absolute';
	        copy.style.visibility = 'hidden';

	        // append copy to context
	        context.appendChild(copy);

	        // append context to DOM so we can measure
	        this._parentNode.appendChild(context);
	        this._copyAppended = true;

	        // store node so we can calculate on it and remove it later
	        this._nodeCopy = copy;
	      }

	      // grab height of node
	      height = +this._nodeCopy.offsetHeight;

	      // remove the copy after getting it's height
	      this._removeClone();

	      return height;
	    }
	  }, {
	    key: '_removeClone',
	    value: function _removeClone() {
	      // we remove the parentNode because we added it earlier to measure it in the correct context
	      this._parentNode.removeChild(this._nodeCopy.parentNode);
	      this._copyAppended = false;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react.Children.only(this.props.children(this.state));
	    }
	  }]);

	  return Measure;
	})(_react.Component);

	exports['default'] = Measure;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;