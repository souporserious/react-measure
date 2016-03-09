'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ResizeHandler = require('./Resize-Handler');

var _ResizeHandler2 = _interopRequireDefault(_ResizeHandler);

var _diffConfig = require('./diff-config');

var _diffConfig2 = _interopRequireDefault(_diffConfig);

var _getNodeDimensions = require('./get-node-dimensions');

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