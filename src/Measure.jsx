import React, { Component, Children, PropTypes, createElement, cloneElement } from 'react'
import ReactDOM from 'react-dom'
import resizeDetector from './resize-detector'
import getNodeDimensions from 'get-node-dimensions'

class Measure extends Component {
  static propTypes = {
    accurate: PropTypes.bool,
    whitelist: PropTypes.array,
    blacklist: PropTypes.array,
    shouldMeasure: PropTypes.bool,
    onMeasure: PropTypes.func
  }

  static defaultProps = {
    accurate: false,
    whitelist: ['width', 'height', 'top', 'right', 'bottom', 'left'],
    blacklist: [],
    shouldMeasure: true,
    onMeasure: () => null
  }

  state = {
    dimensions: {}
  }

  _node = null
  _propsToMeasure = this._getPropsToMeasure(this.props)
  _lastDimensions = {}

  componentDidMount() {
    this._node = ReactDOM.findDOMNode(this)

    // measure on first render
    this.measure()

    // add component to resize detector to detect changes on resize
    resizeDetector().listenTo(this._node, () => this.measure())
  }

  componentWillReceiveProps({config, whitelist, blacklist}) {
    // we store the properties ourselves so we need to update them if the
    // whitelist or blacklist props have changed
    if (this.props.whitelist !== whitelist ||
        this.props.blacklist !== blacklist) {
      this._propsToMeasure = this._getPropsToMeasure({whitelist, blacklist})
    }
  }

  componentWillUnmount() {
    resizeDetector().removeAllListeners(this._node)
  }

  getDimensions(node = this._node, clone) {
    return getNodeDimensions(node, { clone })
  }

  _getPropsToMeasure({ whitelist, blacklist }) {
    return whitelist.filter(prop => blacklist.indexOf(prop) < 0)
  }

  measure = (accurate = this.props.accurate) => {
    // bail out if we shouldn't measure
    if (!this.props.shouldMeasure) return

    const dimensions = this.getDimensions(this._node, accurate)
    const isChildFunction = (typeof this.props.children === 'function')

    // determine if we need to update our callback with new dimensions or not
    this._propsToMeasure.some(prop => {
      if (dimensions[prop] !== this._lastDimensions[prop]) {
        // update our callback if we've found a dimension that has changed
        this.props.onMeasure(dimensions)

        // update state to send dimensions to child function
        if (isChildFunction) {
          this.setState({ dimensions })
        }

        // store last dimensions to compare changes
        this._lastDimensions = dimensions

        // we don't need to look any further, bail out
        return true
      }
    })
  }

  render() {
    const { children } = this.props
    return Children.only(
      typeof children === 'function'
        ? children(this.state.dimensions)
        : children
    )
  }
}

export default Measure
