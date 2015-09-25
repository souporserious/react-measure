import React, { Component } from 'react'
import getNodeDimensions from './get-node-dimensions'

class MeasureChild extends Component {
  componentDidMount() {
    const node = React.findDOMNode(this)

    // fire a callback to let Measure know our dimensions
    this.props.onMount(getNodeDimensions(node, true))
  }

  render() {
    return this.props.children
  }
}

export default MeasureChild