'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactLibShallowCompare = require('react/lib/shallowCompare');

var _reactLibShallowCompare2 = _interopRequireDefault(_reactLibShallowCompare);

var _getNodeDimensions = require('./get-node-dimensions');

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