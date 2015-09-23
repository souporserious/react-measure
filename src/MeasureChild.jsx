import React, { Component } from 'react'

class MeasureChild extends Component {
  componentDidMount() {
    const node = React.findDOMNode(this)
  
    // if width/height was set to 0, set it to auto to get a true calculation
    if(node.style.width === '0px') {
      node.style.width = 'auto'
    }

    if(node.style.height === '0px') {
      node.style.height = 'auto'
    }

    // move node exactly on top of it's clone to calculate proper position
    node.style.transform = 'translateY(-100%)'
    node.style.WebkitTransform = 'translateY(-100%)'

    const rect = node.getBoundingClientRect();
    const dimensions = {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
    }

    // fire a callback to let Measure know our dimensions
    this.props.onMount(dimensions)
  }

  render() {
    return this.props.children
  }
}

export default MeasureChild