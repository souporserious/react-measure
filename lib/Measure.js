'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _resizeObserverPolyfill = require('resize-observer-polyfill');

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

var _getNodeDimensions = require('get-node-dimensions');

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