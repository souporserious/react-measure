import React, { Component, Children, PropTypes } from 'react';

function _throttle(fn, threshhold = 250, scope) {
  threshhold || (threshhold = 250);
  let last,
      deferTimer;
  return function () {
    let context = scope || this;
    let now = +new Date,
        args = arguments;
    if(last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

function _debounce(fn, delay = 250) {
  let timer = null;
  return function () {
    const context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

class Measure extends Component {
  constructor(props) {
    super(props)
    this.state = { height: null }
    this._node = null
    this._nodeCopy = null
    this._nodeParent = null
    this._copyAppended = false
    this._debounceDelay = 350
    this._forceMeasure = this._forceMeasure.bind(this)
  }

  componentWillMount() {
    this._removeClone = _debounce(this._removeClone, this._debounceDelay);
    this._forceMeasure = _throttle(this._forceMeasure, 300);
  }

  componentDidMount() {
    this._node = React.findDOMNode(this)
    this._parentNode = this._node.parentNode
    this.setState({height: this._calcHeight(this._node)});
    
    window.addEventListener('resize', this._forceMeasure);
  }

  componentDidUpdate(prevProps, prevState) {
    let height = this._calcHeight(this._node);

    if(+prevState.height !== +height) {
      this.setState({height});
    }
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this._forceMeasure);
  }
  
  _forceMeasure() {
    this.forceUpdate();
  }

  _calcHeight(node) {
    let height
    
    if(!this._copyAppended) {
      const context = document.createElement('div');
      const copy = node.cloneNode(true);
      
      // give the node some context to measure off of
      // height and overflow prevent scrollbars 
      context.style.height = 0;
      context.style.position = 'relative';
      context.style.overflow = 'hidden';
      //copy.style.transform = 'translateY(-100%)';
      
      // remove name from all children inputs so they don't conflict with current ones
      const inputNodes = copy.querySelectorAll('input');
      for(let i = inputNodes.length; i--;) {
        inputNodes[i].setAttribute('name', '')
      }

      // remove copy and children react id's so it doesn't conflict with current ones
      const reactNodes = copy.querySelectorAll('[data-reactid]');
      copy.setAttribute('data-reactid', '');
      for(let j = reactNodes.length; j--;) {
        reactNodes[j].setAttribute('data-reactid', '')
      }

      // set props to hide copy and get true dimensions
      copy.style.height = 'auto';
      copy.style.width = '100%';
      copy.style.position = 'absolute';
      copy.style.visibility = 'hidden';
  
      // append copy to context
      context.appendChild(copy);
      
      // append context to DOM so we can measure
      this._parentNode.appendChild(context)
      this._copyAppended = true
      
      // store node so we can calculate on it and remove it later
      this._nodeCopy = copy;
    }

    // grab height of node
    height = +this._nodeCopy.offsetHeight
  
    // remove the copy after getting it's height
    this._removeClone();

    return height
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