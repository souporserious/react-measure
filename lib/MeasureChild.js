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

var MeasureChild = (function (_Component) {
  _inherits(MeasureChild, _Component);

  function MeasureChild() {
    _classCallCheck(this, MeasureChild);

    _get(Object.getPrototypeOf(MeasureChild.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(MeasureChild, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var node = _react2['default'].findDOMNode(this);

      // set width/height to auto to get a true calculation
      node.style.width = 'auto';
      node.style.height = 'auto';

      // move node exactly on top of it's clone to calculate proper position
      // this also overrides any transform already set, so something like scale
      // won't affect the calculation, could be bad to do this,
      // but we'll see what happens
      node.style.transform = 'translateY(-100%)';
      node.style.WebkitTransform = 'translateY(-100%)';

      var rect = node.getBoundingClientRect();
      var dimensions = {
        width: rect.width,
        height: rect.height,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left
      };

      // fire a callback to let Measure know our dimensions
      this.props.onMount(dimensions);
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