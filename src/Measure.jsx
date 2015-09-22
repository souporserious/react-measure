import React, { Component, Children, PropTypes } from 'react'
import throttle from './throttle'
import debounce from './debounce'

let registeredComponents = []

// force rerender on window resize so we can grab dimensions again
window.addEventListener('resize', () => {
  registeredComponents.forEach(c => c._forceMeasure())
})

class Measure extends Component {
  static defaultProps = {
    blacklist: [],
    onChange: () => null
  }

  state = {
    width: null,
    height: null,
    top: null,
    right: null,
    bottom: null,
    left: null,
  }
  _whitelist = ['width', 'height', 'top', 'right', 'bottom', 'left']
  _properties = this._whitelist.filter(prop => this.props.blacklist.indexOf(prop) < 0)
  _node = null
  _nodeCopy = null
  _nodeParent = null
  _copyAppended = false
  _isMounted = false

  componentWillMount() {
    this._removeClone = debounce(this._removeClone, 600)
    this._forceMeasure = throttle(this._forceMeasure, 300)
    this._setMeasure = throttle(this._setMeasure, 300)
  }

  componentDidMount() {
    this._isMounted = true
    this._node = React.findDOMNode(this)
    this._parentNode = this._node.parentNode
    this.setState(this._measure(this._node))

    // store registered components
    registeredComponents.push(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const dimensions = this._measure(this._node)

    // determine if we need to update our state with new dimensions or not
    this._properties.forEach(prop => {
      if(prevState[prop] !== dimensions[prop]) {
        this._setMeasure(dimensions)
        return
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false

    const pos = registeredComponents.indexOf(this)
    if(pos > -1) {
      registeredComponents.splice(pos, 1)
    }
  }

  _forceMeasure = () => {
    this.forceUpdate()
  }

  _setMeasure(dimensions) {
    if(this._isMounted) {
      this.setState(dimensions, () => {
        this.props.onChange(dimensions)
      })
    }
  }

  _measure(node) {
    if(!this._copyAppended) {
      const context = document.createElement('div')
      const copy = node.cloneNode(true)

      // give the node some context to measure off of
      // height and overflow prevent scrollbars from node copy
      context.style.height = 0
      context.style.position = 'relative'
      context.style.overflow = 'hidden'

      // remove name from all children inputs so they don't conflict with current ones
      const inputNodes = copy.querySelectorAll('input')
      for(let i = inputNodes.length; i--;) {
        inputNodes[i].setAttribute('name', '')
      }

      // remove copy and children react id's so it doesn't conflict with current ones
      const reactNodes = copy.querySelectorAll('[data-reactid]')
      copy.setAttribute('data-reactid', '')
      for(let j = reactNodes.length; j--;) {
        reactNodes[j].setAttribute('data-reactid', '')
      }

      // set props to hide copy and get true dimensions
      copy.style.boxSizing = 'border-box'
      copy.style.width = 'auto'
      copy.style.height = 'auto'
      copy.style.position = 'absolute'
      copy.style.visibility = 'hidden'

      // append copy to context
      context.appendChild(copy)

      // append context to DOM so we can measure
      this._parentNode.appendChild(context)
      this._copyAppended = true

      // store node so we can calculate on it and remove it later
      this._nodeCopy = copy
    }

    // grab dimensions of the node
    const rect = this._nodeCopy.getBoundingClientRect();
    const dimensions = {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
    }

    // remove the copy after getting it's height
    this._removeClone()

    return dimensions
  }

  _removeClone() {
    // we remove the parentNode because we added it earlier to measure it in the correct context
    this._parentNode.removeChild(this._nodeCopy.parentNode)
    this._copyAppended = false
  }

  render() {
    return Children.only(this.props.children(this.state))
  }
}

export default Measure