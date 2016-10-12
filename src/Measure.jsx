import React, { Component, Children, PropTypes, createElement, cloneElement } from 'react'
import ReactDOM from 'react-dom'
import resizeDetector from './resize-detector'
import getNodeDimensions from 'get-node-dimensions'

class Measure extends Component {
  static propTypes = {
    whitelist: PropTypes.array,
    blacklist: PropTypes.array,
    useClone: PropTypes.bool,
    cloneOptions: PropTypes.object,
    shouldMeasure: PropTypes.bool,
    onMeasure: PropTypes.func
  }

  static defaultProps = {
    whitelist: ['width', 'height', 'top', 'right', 'bottom', 'left'],
    blacklist: [],
    useClone: false,
    cloneOptions: {},
    shouldMeasure: true,
    onMeasure: () => null
  }

  constructor(props) {
    super(props)
    this.state = {
      dimensions: {}
    }
    this._node = null
    this._propsToMeasure = this._getPropsToMeasure(props)
    this._lastDimensions = {}
  }

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
      this._propsToMeasure = this._getPropsToMeasure({ whitelist, blacklist })
    }
  }

  componentWillUnmount() {
    resizeDetector().removeAllListeners(this._node)
    resizeDetector().uninstall(this._node)
    this._node = null
  }

  getDimensions(
    node = this._node,
    useClone = this.props.useClone,
    cloneOptions = this.props.cloneOptions
  ) {
    return getNodeDimensions(node, { clone: useClone, ...cloneOptions })
  }

  measure = (useClone = this.props.useClone) => {
    // bail out if we shouldn't measure
    if (!this.props.shouldMeasure) return

    const dimensions = this.getDimensions(this._node, useClone)
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

  _getPropsToMeasure({ whitelist, blacklist }) {
    return whitelist.filter(prop => blacklist.indexOf(prop) < 0)
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
