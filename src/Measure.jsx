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
  _portal = document.createElement('div')
  _lastDimensions = {}

  constructor(props) {
    super(props)

    // set styles to hide portal from view
    this._portal.style.cssText = `
      height: 0;
      position: relative;
      overflow: hidden;
    `
  }

  componentDidMount() {
    const node = React.findDOMNode(this)

    // append portal next to this component
    node.parentNode.appendChild(this._portal)

    this._cloneComponent();
  }

  componentDidUpdate() {
    this._cloneComponent();
  }

  _copyMounted = (dimensions) => {
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

    // remove component since we no longer need it
    React.unmountComponentAtNode(this._portal)
  }

  _cloneComponent() {
    const onMount = this._copyMounted;
    const clone = cloneElement(this.props.children)
    const child = React.createElement(MeasureChild, {onMount}, clone)

    // render clone to the portal
    React.render(child, this._portal)
  }

  render() {
    return Children.only(this.props.children)
  }
}

export default Measure