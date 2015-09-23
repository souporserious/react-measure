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

var _MeasureChild = require('./MeasureChild');

var _MeasureChild2 = _interopRequireDefault(_MeasureChild);

var Measure = (function (_Component) {
  _inherits(Measure, _Component);

  _createClass(Measure, null, [{
    key: 'propTypes',
    value: {
      whitelist: _react.PropTypes.array,
      blacklist: _react.PropTypes.array,
      onChange: _react.PropTypes.func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      blacklist: [],
      onChange: function onChange() {
        return null;
      }
    },
    enumerable: true
  }]);

  function Measure(props) {
    var _this = this;

    _classCallCheck(this, Measure);

    _get(Object.getPrototypeOf(Measure.prototype), 'constructor', this).call(this, props);

    // set styles to hide portal from view
    this._whitelist = this.props.whitelist || ['width', 'height', 'top', 'right', 'bottom', 'left'];
    this._properties = this._whitelist.filter(function (prop) {
      return _this.props.blacklist.indexOf(prop) < 0;
    });
    this._portal = document.createElement('div');
    this._lastDimensions = {};

    this._copyMounted = function (dimensions) {
      // determine if we need to update our callback with new dimensions or not
      _this._properties.forEach(function (prop) {
        if (dimensions[prop] !== _this._lastDimensions[prop]) {
          _this.props.onChange(dimensions);

          // store last dimensions to compare changes
          _this._lastDimensions = dimensions;

          // we don't need to look any further, bail out
          return;
        }
      });

      // remove component since we no longer need it
      _react2['default'].unmountComponentAtNode(_this._portal);
    };

    this._portal.style.cssText = '\n      height: 0;\n      position: relative;\n      overflow: hidden;\n    ';
  }

  _createClass(Measure, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var node = _react2['default'].findDOMNode(this);

      // append portal next to this component
      node.parentNode.appendChild(this._portal);

      this._cloneComponent();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._cloneComponent();
    }
  }, {
    key: '_cloneComponent',
    value: function _cloneComponent() {
      var onMount = this._copyMounted;
      var clone = (0, _react.cloneElement)(this.props.children);
      var child = _react2['default'].createElement(_MeasureChild2['default'], { onMount: onMount }, clone);

      // render clone to the portal
      _react2['default'].render(child, this._portal);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react.Children.only(this.props.children);
    }
  }]);

  return Measure;
})(_react.Component);

exports['default'] = Measure;
module.exports = exports['default'];