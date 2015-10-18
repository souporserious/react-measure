import React, { Component, PropTypes, createElement } from 'react'
import DOM from 'react-dom'
import { StaggeredMotion, spring, presets } from 'react-motion'

class Slideable extends Component {
  static propTypes = {
    component: PropTypes.string,
    defaultHeight: PropTypes.number,
    springConfig: PropTypes.array,
    toggle: PropTypes.bool,
    forceAutoHeight: PropTypes.bool,
    measure: PropTypes.bool,
    onChange: PropTypes.func
  }

  static defaultProps = {
    component: 'div',
    defaultHeight: 0,
    springConfig: presets.noWobble,
    toggle: false,
    forceAutoHeight: false,
    measure: true,
    onChange: () => null
  }

  _firstPass = true
  _instant = false
  state = {
    height: null
  }

  primeHeight() {
    const height = this._node.scrollHeight

    if(this.state.height !== height) {
      this.setState({height}, () => {
        this._instant = true
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.toggle !== nextProps.toggle) {
      this._measure = true
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
    // return this.state.height !== nextState.height ||
    //        this.props.toggle !== nextProps.toggle
  }

  componentDidMount() {
    this._node = DOM.findDOMNode(this)
    this.setState({height: this._node.scrollHeight})
  }

  componentDidUpdate() {
    this._instant = false

    if(this.props.toggle && this._measure) {
      const height = this._node.scrollHeight

      if(this.state.height !== height) {
        this.setState({height})
        this._measure = false
      }
    }
    // } else if(!this._firstPass && !this.props.toggle && this.state.height > 0) {
    //   this.setState({height: 0})
    // }

    this._firstPass = false
  }

  _getEndValues = (prevValue) => {
    const { toggle, defaultHeight, springConfig } = this.props
    const config = this._instant ? [] : springConfig
    const height = toggle ? (this.state.height || defaultHeight) : defaultHeight

    if(prevValue && prevValue[0].height === height) {
      this.props.onChange()
    }

    return [{height: spring(height, config)}]
  }

  render() {
    const { toggle, component, className, defaultHeight, springConfig, style, children, forceAutoHeight, measure, instant } = this.props;

    return createElement(
      StaggeredMotion,
      {
        styles: this._getEndValues
      },
      (values) => {
        const height = values[0].height
        
        return createElement(
          component,
          {
            className,
            style: {
              height: this._instant || (height === this.state.height) ? '' : height,
              overflow: 'hidden',
              ...style
            }
          },
          children
        )
      }
    )
  }
}

export default Slideable