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

var _getNodeDimensions = require('./get-node-dimensions');

var _getNodeDimensions2 = _interopRequireDefault(_getNodeDimensions);

var MeasureClone = (function (_Component) {
  _inherits(MeasureClone, _Component);

  function MeasureClone() {
    _classCallCheck(this, MeasureClone);

    _get(Object.getPrototypeOf(MeasureClone.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(MeasureClone, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactLibShallowCompare2['default'])(this, nextProps, nextState);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      var node = _reactDom2['default'].findDOMNode(this);
      var dimensions = {};

      if (this.props.collection) {
        (function () {
          var currChild = _react.Children.only(_this.props.children);
          var currChildren = currChild.props.children;
          var nodeChildren = node.children;

          _react.Children.forEach(currChildren, function (child, i) {
            var childnode = nodeChildren[i];

            if (_this.props.forceAutoHeight) {
              var family = childnode.getElementsByTagName('*');

              for (var _i = family.length; _i--;) {
                family[_i].style.height = 'auto';
              }
            }

            dimensions[child.key] = (0, _getNodeDimensions2['default'])(childnode, true);
          });
        })();
      } else {
        if (this.props.forceAutoHeight) {
          var family = node.getElementsByTagName('*');

          for (var i = family.length; i--;) {
            family[i].style.height = 'auto';
          }
        }

        dimensions = (0, _getNodeDimensions2['default'])(node, true);
      }

      // fire a callback to let Measure know our dimensions
      this.props.onMount(dimensions);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return MeasureClone;
})(_react.Component);

exports['default'] = MeasureClone;
module.exports = exports['default'];