import React, { Component, Children, PropTypes, createElement, cloneElement } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
import getNodeDimensions from 'get-node-dimensions'

class Measure extends Component {
  static propTypes = {
    whitelist: PropTypes.array,
    blacklist: PropTypes.array,
    includeMargin: PropTypes.bool,
    useClone: PropTypes.bool,
    cloneOptions: PropTypes.object,
    shouldMeasure: PropTypes.bool,
    onMeasure: PropTypes.func
  }

  static defaultProps = {
    whitelist: ['width', 'height', 'top', 'right', 'bottom', 'left'],
    blacklist: [],
    includeMargin: true,
    useClone: false,
    cloneOptions: {},
    shouldMeasure: true,
    onMeasure: () => null
  }

  constructor(props) {
    super(props)
    this.state = {
      dimensions: {
        width: 0,
        height: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    }
    this._node = null
    this._propsToMeasure = this._getPropsToMeasure(props)
    this._lastDimensions = {}
  }

  componentDidMount() {
    // measure on first render
    this.measure()

    // add component to resize observer to detect changes on resize
    this.resizeObserver = new ResizeObserver(() => this.measure())
    this.resizeObserver.observe(this._node)
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
    this.resizeObserver.disconnect(this._node)
    this._node = null
  }

  getDimensions(
    node = this._node,
    includeMargin = this.props.includeMargin,
    useClone = this.props.useClone,
    cloneOptions = this.props.cloneOptions
  ) {
    return getNodeDimensions(node, {
      margin: includeMargin,
      clone: useClone,
      ...cloneOptions
    })
  }

  measure = (
    includeMargin = this.props.includeMargin,
    useClone = this.props.useClone
  ) => {
    // bail out if we shouldn't measure
    if (!this.props.shouldMeasure) return

    // More info here: https://facebook.github.io/react/docs/refs-and-the-dom.html#caveats
    if (!this._node) return

    const dimensions = this.getDimensions(this._node, includeMargin, useClone)
    const isChildFunction = (typeof this.props.children === 'function')

    // determine if we need to update our callback with new dimensions or not
    this._propsToMeasure.some(prop => {
      if (dimensions[prop] !== this._lastDimensions[prop]) {
        // update our callback if we've found a dimension that has changed
        this.props.onMeasure(dimensions)

        // update state to send dimensions to child function
        if (isChildFunction && typeof this !== 'undefined') {
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
    const filtered = Children.only(
      typeof children === 'function'
        ? children(this.state.dimensions)
        : children
    );
    return (
      <div ref={(c) => { this._node = c; }}>
        { filtered }
      </div>
    )
  }
}

export default Measure
