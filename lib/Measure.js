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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactLibShallowCompare = require('react/lib/shallowCompare');

var _reactLibShallowCompare2 = _interopRequireDefault(_reactLibShallowCompare);

var _MeasureClone = require('./MeasureClone');

var _MeasureClone2 = _interopRequireDefault(_MeasureClone);

var _getNodeDimensions = require('./get-node-dimensions');

var _getNodeDimensions2 = _interopRequireDefault(_getNodeDimensions);

var Measure = (function (_Component) {
  _inherits(Measure, _Component);

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
    };
  }

  _createClass(Measure, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._node = _reactDom2['default'].findDOMNode(this);

      if (this.props.clone) {
        this._cloneComponent();
      } else {
        this._update((0, _getNodeDimensions2['default'])(this._node));
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactLibShallowCompare2['default'])(this, nextProps, nextState);
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

      // store portal for later use
      this._portal = portal;

      // append portal next to this component
      this._node.parentNode.insertBefore(portal, this._node.nextSibling);
    }
  }, {
    key: '_closePortal',
    value: function _closePortal() {
      if (this._portal) {
        _reactDom2['default'].unmountComponentAtNode(this._portal);
        this._portal.parentNode.removeChild(this._portal);
      }
      this._portal = null;
    }
  }, {
    key: '_cloneComponent',
    value: function _cloneComponent() {
      var _this2 = this;

      var _props = this.props;
      var children = _props.children;
      var collection = _props.collection;
      var forceAutoHeight = _props.forceAutoHeight;

      var onMount = this._cloneMounted;
      var clone = (0, _react.cloneElement)(children);
      var child = (0, _react.createElement)(_MeasureClone2['default'], { collection: collection, forceAutoHeight: forceAutoHeight, onMount: onMount }, clone);

      // create a portal to append clone to
      this._openPortal();

      // render clone to the portal
      _reactDom2['default'].unstable_renderSubtreeIntoContainer(this, child, this._portal, function () {
        // remove portal after mount since we no longer need it
        _this2._closePortal();
      });
    }
  }, {
    key: '_update',
    value: function _update(dimensions) {
      var _this3 = this;

      if (this.props.collection) {
        Object.keys(dimensions).forEach(function (key) {
          var childDimensions = dimensions[key];
          var hasChanged = false;

          _this3._properties.forEach(function (prop) {
            if (childDimensions[prop] !== _this3._lastDimensions[prop]) {
              hasChanged = true;
              return;
            }
          });

          if (hasChanged) {
            _this3.props.onChange(dimensions);

            // store last dimensions to compare changes
            _this3._lastDimensions = dimensions;

            // we don't need to look any further, bail out
            return;
          }
        });
      } else {
        // determine if we need to update our callback with new dimensions or not
        this._properties.forEach(function (prop) {
          if (dimensions[prop] !== _this3._lastDimensions[prop]) {
            _this3.props.onChange(dimensions);

            // store last dimensions to compare changes
            _this3._lastDimensions = dimensions;

            // we don't need to look any further, bail out
            return;
          }
        });
      }
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
      forceAutoHeight: _react.PropTypes.bool,
      collection: _react.PropTypes.bool,
      whitelist: _react.PropTypes.array,
      blacklist: _react.PropTypes.array,
      onChange: _react.PropTypes.func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      clone: false,
      forceAutoHeight: false,
      collection: false,
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