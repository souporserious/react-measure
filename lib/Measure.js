'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _throttle = require('./throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _debounce = require('./debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var registeredComponents = [];

// force rerender on window resize so we can grab dimensions again
window.addEventListener('resize', function () {
  registeredComponents.forEach(function (c) {
    return c._forceMeasure();
  });
});

var Measure = (function (_Component) {
  _inherits(Measure, _Component);

  function Measure() {
    var _this = this;

    _classCallCheck(this, Measure);

    _get(Object.getPrototypeOf(Measure.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      width: null,
      height: null,
      top: null,
      right: null,
      bottom: null,
      left: null
    };
    this._node = null;
    this._nodeCopy = null;
    this._nodeParent = null;
    this._copyAppended = false;

    this._forceMeasure = function () {
      _this.forceUpdate();
    };
  }

  _createClass(Measure, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._removeClone = (0, _debounce2['default'])(this._removeClone, 300);
      this._forceMeasure = (0, _throttle2['default'])(this._forceMeasure, 300);
      this._setMeasure = (0, _throttle2['default'])(this._setMeasure, 300);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._node = _react2['default'].findDOMNode(this);
      this._parentNode = this._node.parentNode;
      this.setState(this._measure(this._node));

      // store registered components
      registeredComponents.push(this);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var dimensions = this._measure(this._node);

      // we can use JSON stringify to compare objects since they are simple structures
      // used to determine if we need to update our state with new dimensions or not
      if (JSON.stringify(prevState) !== JSON.stringify(dimensions)) {
        this._setMeasure(dimensions);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var pos = registeredComponents.indexOf(this);
      if (pos > -1) {
        registeredComponents.splice(pos, 1);
      }
    }
  }, {
    key: '_setMeasure',
    value: function _setMeasure(dimensions) {
      this.setState(dimensions);
    }
  }, {
    key: '_measure',
    value: function _measure(node) {
      var dimensions = undefined;

      if (!this._copyAppended) {
        var context = document.createElement('div');
        var copy = node.cloneNode(true);

        // give the node some context to measure off of
        // height and overflow prevent scrollbars from copy
        context.style.height = 0;
        context.style.position = 'relative';
        context.style.overflow = 'hidden';

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
        copy.style.boxSizing = 'border-box';
        copy.style.height = 'auto';
        copy.style.width = 'auto';
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

      // grab dimensions of node
      dimensions = {
        width: this._nodeCopy.offsetWidth,
        height: this._nodeCopy.offsetHeight,
        top: this._nodeCopy.offsetTop,
        left: this._nodeCopy.offsetLeft
      };

      // remove the copy after getting it's height
      this._removeClone();

      return dimensions;
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