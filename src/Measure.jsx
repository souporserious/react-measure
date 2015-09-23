import React, { Component, Children, PropTypes, cloneElement } from 'react'
import MeasureChild from './MeasureChild'

class Measure extends Component {
  static propTypes = {
    whitelist: PropTypes.array,
    blacklist: PropTypes.array,
    onChange: PropTypes.func
  }
  static defaultProps = {
    blacklist: [],
    onChange: () => null
  }
  _whitelist = this.props.whitelist || ['width', 'height', 'top', 'right', 'bottom', 'left']
  _properties = this._whitelist.filter(prop => this.props.blacklist.indexOf(prop) < 0)
  _portal = null
  _lastDimensions = {}

  componentDidMount() {
    this._node = React.findDOMNode(this)
    this._cloneComponent()
  }

  componentDidUpdate() {
    this._cloneComponent();
  }

  _createPortal() {
    const portal = document.createElement('div')

    // set styles to hide portal from view
    portal.style.cssText = `
      height: 0;
      position: relative;
      overflow: hidden;
    `

    this._portal = portal

    // append portal next to this component
    this._node.parentNode.insertBefore(this._portal, this._node.nextSibling)
  }

  _destroyPortal() {
    this._portal.parentNode.removeChild(this._portal);
  }

  _cloneMounted = (dimensions) => {
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

    // remove component and portal since we no longer need it
    React.unmountComponentAtNode(this._portal)
    this._destroyPortal()
  }

  _cloneComponent() {
    const onMount = this._cloneMounted;
    const clone = cloneElement(this.props.children)
    const child = React.createElement(MeasureChild, {onMount}, clone)

    // create a portal to append clone to
    this._createPortal()

    // render clone to the portal
    React.render(child, this._portal)
  }

  render() {
    return Children.only(this.props.children)
  }
}

export default Measure