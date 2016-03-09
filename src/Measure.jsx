import React, { Component, Children, PropTypes, createElement, cloneElement } from 'react'
import ReactDOM from 'react-dom'
import ResizeHandler from './Resize-Handler'
import diffConfig from './diff-config'
import getNodeDimensions from './get-node-dimensions'

const resizeHandler = new ResizeHandler()

class Measure extends Component {
  static propTypes = {
    config: PropTypes.object,
    accurate: PropTypes.bool,
    whitelist: PropTypes.array,
    blacklist: PropTypes.array,
    shouldMeasure: PropTypes.func,
    onMeasure: PropTypes.func
  }

  static defaultProps = {
    config: {
      childList: true,
      attributes: true
    },
    accurate: false,
    whitelist: ['width', 'height', 'top', 'right', 'bottom', 'left'],
    blacklist: [],
    shouldMeasure: () => true,
    onMeasure: () => null
  }

  _observer = null
  _node = null
  _properties = this._getProperties(this.props)
  _lastDimensions = {}

  componentDidMount() {
    this._node = ReactDOM.findDOMNode(this)

    // set up mutation observer
    this._connectObserver(this.props.config)

    // measure on first render
    this._measure(null)

    // add component to resize handler to detect changes on resize
    resizeHandler.add(this)
  }

  componentWillReceiveProps({config, whitelist, blacklist}) {
    // disconnect the old observer and reconnect with new config if changed
    if (diffConfig(this.props.config, config)) {
      this._disconnectObserver()
      this._connectObserver(config)
    }

    // we store the properties ourselves so we need to update them if the
    // whitelist or blacklist props have changed
    if (this.props.whitelist !== whitelist ||
        this.props.blacklist !== blacklist) {
      this._properties = this._getProperties({whitelist, blacklist})
    }
  }

  componentWillUnmount() {
    this._disconnectObserver()
    resizeHandler.remove(this)
  }

  getDimensions(node = this._node, accurate = true) {
    return getNodeDimensions(node, accurate)
  }

  _measure = (mutations) => {
    const shouldMeasure = this.props.shouldMeasure(mutations)

    // bail out if we shouldn't measure
    if(!shouldMeasure) return

    const dimensions = this.getDimensions(this._node, this.props.accurate)

    // determine if we need to update our callback with new dimensions or not
    this._properties.some(prop => {
      if(dimensions[prop] !== this._lastDimensions[prop]) {
        // if we've found a dimension that has changed, update our callback
        // we also allow shouldMeasure to return any values so the end user
        // doesn't have to recalculate anything
        this.props.onMeasure(dimensions, mutations, shouldMeasure)

        // store last dimensions to compare changes
        this._lastDimensions = dimensions

        // we don't need to look any further, bail out
        return true
      }
    })
  }

  _connectObserver(config) {
    this._observer = new MutationObserver(this._measure)
    this._observer.observe(this._node, config)
  }

  _disconnectObserver() {
    this._observer.disconnect()
  }

  _getProperties({whitelist, blacklist}) {
    return whitelist.filter(prop => blacklist.indexOf(prop) < 0)
  }

  render() {
    return Children.only(this.props.children)
  }
}

export default Measure
