import React, { Component, Children, PropTypes, createElement, cloneElement } from 'react'
import ReactDOM from 'react-dom'
import shallowCompare from 'react/lib/shallowCompare'
import getNodeDimensions from './get-node-dimensions'

class Measure extends Component {
  static propTypes = {
    config: PropTypes.object,
    accurate: PropTypes.bool,
    whitelist: PropTypes.array,
    blacklist: PropTypes.array,
    onChange: PropTypes.func
  }

  static defaultProps = {
    config: {
      childList: true,
      attributes: false,
      characterData: false,
      subtree: true
    },
    accurate: false,
    whitelist: ['width', 'height', 'top', 'right', 'bottom', 'left'],
    blacklist: [],
    onChange: () => null
  }

  _whitelist = this.props.whitelist
  _properties = this._whitelist.filter(prop => this.props.blacklist.indexOf(prop) < 0)
  _observer = null
  _node = null
  _lastDimensions = {}

  componentDidMount() {
    this._node = ReactDOM.findDOMNode(this)

    // set up mutation observer
    this._observer = new MutationObserver(this._onMutation)
    this._observer.observe(this._node, this.props.config)

    // fire callback for first render
    this.getDimensions()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  componentWillUnmount() {
    this._observer.disconnect()
  }

  getDimensions = (mutations = null) => {
    const dimensions = getNodeDimensions(this._node, this.props.accurate)

    // determine if we need to update our callback with new dimensions or not
    this._properties.some(prop => {
      if(dimensions[prop] !== this._lastDimensions[prop]) {
        this.props.onChange(dimensions, mutations)

        // store last dimensions to compare changes
        this._lastDimensions = dimensions

        // we don't need to look any further, bail out
        return true
      }
    })
  }

  _onMutation = (mutations) => {
    this.getDimensions(mutations)
  }

  render() {
    return Children.only(this.props.children)
  }
}

export default Measure