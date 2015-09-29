import React, { Component, Children, PropTypes, cloneElement } from 'react'
import MeasureChild from './MeasureChild'
import getNodeDimensions from './get-node-dimensions'

class Measure extends Component {
  static propTypes = {
    clone: PropTypes.bool,
    forceAutoHeight: PropTypes.bool,
    whitelist: PropTypes.array,
    blacklist: PropTypes.array,
    onChange: PropTypes.func
  }
  static defaultProps = {
    clone: false,
    forceAutoHeight: false,
    blacklist: [],
    onChange: () => null
  }
  _whitelist = this.props.whitelist || ['width', 'height', 'top', 'right', 'bottom', 'left']
  _properties = this._whitelist.filter(prop => this.props.blacklist.indexOf(prop) < 0)
  _portal = null
  _lastDimensions = {}

  componentDidMount() {
    this._node = React.findDOMNode(this)

    if(this.props.clone) {
      this._cloneComponent()
    } else {
      this._update(getNodeDimensions(this._node))
    }
  }

  componentDidUpdate() {
    // we check for parent node because we we're getting some weird issues
    // with React Motion specifically and it causing an error on unmount
    // because parent would return null, might be a bigger problem to look into
    if(this.props.clone && this._node.parentNode) {
      this._cloneComponent()
    } else {
      this._update(getNodeDimensions(this._node))
    }
  }

  _openPortal() {
    const portal = document.createElement('div')

    // set styles to hide portal from view
    portal.style.cssText = `
      height: 0;
      position: relative;
      overflow: hidden;
    `

    this._portal = portal

    // append portal next to this component
    this._node.parentNode.insertBefore(portal, this._node.nextSibling)
  }

  _closePortal() {
    React.unmountComponentAtNode(this._portal)
    this._portal.parentNode.removeChild(this._portal)
  }

  _cloneMounted = (dimensions) => {
    this._update(dimensions)

    // remove portal since we no longer need it
    this._closePortal()
  }

  _cloneComponent() {
    const { forceAutoHeight } = this.props
    const onMount = this._cloneMounted
    const clone = cloneElement(this.props.children)
    const child = React.createElement(MeasureChild, {onMount, forceAutoHeight}, clone)

    // create a portal to append clone to
    this._openPortal()

    // render clone to the portal
    React.render(child, this._portal)
  }

  _update(dimensions) {
    // determine if we need to update our callback with new dimensions or not
    this._properties.forEach(prop => {
      if(dimensions[prop] !== this._lastDimensions[prop]) {
        this.props.onChange(dimensions)

        // store last dimensions to compare changes
        this._lastDimensions = dimensions

        // we don't need to look any further, bail out
        return
      }
    })
  }

  render() {
    return Children.only(this.props.children)
  }
}

export default Measure