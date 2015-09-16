import React, { Component, Children, PropTypes } from 'react';
import throttle from './throttle';
import debounce from './debounce';

class Measure extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: null,
      height: null,
      top: null,
      right: null,
      bottom: null,
      left: null
    }
    this._node = null
    this._nodeCopy = null
    this._nodeParent = null
    this._copyAppended = false
    this._debounceDelay = 350
    this._forceMeasure = this._forceMeasure.bind(this)
  }

  componentWillMount() {
    this._removeClone = debounce(this._removeClone, this._debounceDelay);
    this._setMeasure = throttle(this._setMeasure, 300);
    this._forceMeasure = throttle(this._forceMeasure, 300);
  }

  componentDidMount() {
    this._node = React.findDOMNode(this)
    this._parentNode = this._node.parentNode
    this.setState(this._measure(this._node));

    // need to move into one event listener and delegate updates accordingly
    window.addEventListener('resize', this._forceMeasure);
  }

  componentDidUpdate(prevProps, prevState) {
    const dimensions = this._measure(this._node);

    // we can use JSON stringify to compare objects since they are simple structures to
    // determine if we need to update our state with new dimensions or not
    if(JSON.stringify(prevState) !== JSON.stringify(dimensions)) {
      this._setMeasure(dimensions);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._forceMeasure);
  }

  _forceMeasure() {
    this.forceUpdate();
  }

  _setMeasure(dimensions) {
    this.setState(dimensions);
  }

  _measure(node) {
    let dimensions

    if(!this._copyAppended) {
      const context = document.createElement('div')
      const copy = node.cloneNode(true)

      // give the node some context to measure off of
      // height and overflow prevent scrollbars from copy
      context.style.height = 0
      context.style.position = 'relative'
      context.style.overflow = 'hidden'
      //copy.style.transform = 'translateY(-100%)';

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
      copy.style.height = 'auto'
      copy.style.width = '100%'
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

    // grab dimensions of node
    dimensions = this._nodeCopy.getBoundingClientRect();

    // remove the copy after getting it's height
    this._removeClone();

    return {
      width: dimensions.width,
      height: dimensions.height,
      top: dimensions.top,
      right: dimensions.right,
      bottom: dimensions.bottom,
      left: dimensions.left
    }
  }

  _removeClone() {
    // we remove the parentNode because we added it earlier to measure it in the correct context
    this._parentNode.removeChild(this._nodeCopy.parentNode)
    this._copyAppended = false
  }

  render() {
    return Children.only(this.props.children(this.state));
  }
}

export default Measure;