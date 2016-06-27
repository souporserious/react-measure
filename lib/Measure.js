'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _resizeDetector = require('./resize-detector');

var _resizeDetector2 = _interopRequireDefault(_resizeDetector);

var _getNodeDimensions = require('./get-node-dimensions');

var _getNodeDimensions2 = _interopRequireDefault(_getNodeDimensions);

var Measure = (function (_Component) {
  _inherits(Measure, _Component);

  function Measure() {
    var _this = this;

    _classCallCheck(this, Measure);

    _get(Object.getPrototypeOf(Measure.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      dimensions: {}
    };
    this._node = null;
    this._propsToMeasure = this._getPropsToMeasure(this.props);
    this._lastDimensions = {};

    this.measure = function () {
      var accurate = arguments.length <= 0 || arguments[0] === undefined ? _this.props.accurate : arguments[0];

      // bail out if we shouldn't measure
      if (!_this.props.shouldMeasure) return;

      var dimensions = _this.getDimensions(_this._node, accurate);
      var isChildFunction = typeof _this.props.children === 'function';

      // determine if we need to update our callback with new dimensions or not
      _this._propsToMeasure.some(function (prop) {
        if (dimensions[prop] !== _this._lastDimensions[prop]) {
          // update our callback if we've found a dimension that has changed
          _this.props.onMeasure(dimensions);

          // update state to send dimensions to child function
          if (isChildFunction) {
            _this.setState({ dimensions: dimensions });
          }

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
      var _this2 = this;

      this._node = _reactDom2['default'].findDOMNode(this);

      // measure on first render
      this.measure();

      // add component to resize detector to detect changes on resize
      (0, _resizeDetector2['default'])().listenTo(this._node, function () {
        return _this2.measure();
      });
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
      (0, _resizeDetector2['default'])().removeAllListeners(this._node);
    }
  }, {
    key: 'getDimensions',
    value: function getDimensions() {
      var node = arguments.length <= 0 || arguments[0] === undefined ? this._node : arguments[0];
      var accurate = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      return (0, _getNodeDimensions2['default'])(node, accurate);
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
  }], [{
    key: 'propTypes',
    value: {
      accurate: _react.PropTypes.bool,
      whitelist: _react.PropTypes.array,
      blacklist: _react.PropTypes.array,
      shouldMeasure: _react.PropTypes.bool,
      onMeasure: _react.PropTypes.func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      accurate: false,
      whitelist: ['width', 'height', 'top', 'right', 'bottom', 'left'],
      blacklist: [],
      shouldMeasure: true,
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