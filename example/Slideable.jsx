import React, { Component, PropTypes, Children, cloneElement } from 'react'
import { findDOMNode } from 'react-dom'
import { Motion, spring, presets } from 'react-motion'
import Measure from '../src/react-measure'

class Slideable extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    springConfig: React.PropTypes.objectOf(React.PropTypes.number),
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    springConfig: presets.noWobble
  }

  state = {
    height: -1
  }

  _instant = false
  _isAnimating = false
  _measureComponent = null
  _node = null

  componentWillReceiveProps(nextProps) {
    // force measure so we can animate from an accurate measurement
    if (this.props.show !== nextProps.show) {
      this._instant = false
    }
  }

  _onMeasure = ({ height }) => {
    this.setState({ height })
  }

  render() {
    const { show, rmConfig, children } = this.props
    const child = Children.only(children)
    const childStyles = child.props.style || {}
    const rmHeight = show ? this.state.height : 0

    return (
      <Measure
        ref={c => this._measureComponent = c}
        // we only need to be accurate if the show prop has changed,
        // otherwise something else is effecting the height change
        accurate={!this._instant}
        whitelist={['height']}
        onMeasure={this._onMeasure}
      >
        <Motion
          defaultStyle={{ height: 0 }}
          style={{
            height: this._instant
              ? rmHeight
              : spring(rmHeight, { precision: 0.5, ...rmConfig })
          }}
          onRest={() => {
            this._instant = true
          }}
        >
          {({ height }) => {
            const destHeight = parseFloat(this.state.height).toFixed(2)
            const currHeight = parseFloat(height).toFixed(2)
            let rmStyles = {}

            // only animate when necessary
            // don't always apply style values so height works responsively
            if (destHeight !== currHeight) {
              rmStyles = {
                height,
                overflow: 'hidden'
              }
            }
            return cloneElement(child, { style: { ...rmStyles, ...childStyles } })
          }}
        </Motion>
      </Measure>
    )
  }
}

export default Slideable
