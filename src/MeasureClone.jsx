import React, { Component, Children } from 'react'
import ReactDOM from 'react-dom'
import shallowCompare from 'react/lib/shallowCompare'
import getNodeDimensions from './get-node-dimensions'

class MeasureClone extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this)
    let dimensions = {}
    
    if(this.props.collection) {
      const currChild = Children.only(this.props.children)
      const currChildren = currChild.props.children
      const nodeChildren = node.children

      Children.forEach(currChildren, (child, i) => {
        const childnode = nodeChildren[i]

        if(this.props.forceAutoHeight) {
          const family = childnode.getElementsByTagName('*')

          for(let i = family.length; i--;) {
            family[i].style.height = 'auto'
          }
        }

        dimensions[child.key] = getNodeDimensions(childnode, true)
      })
    } else {
      if(this.props.forceAutoHeight) {
        const family = node.getElementsByTagName('*')

        for(let i = family.length; i--;) {
          family[i].style.height = 'auto'
        }
      }

      dimensions = getNodeDimensions(node, true)
    }

    // fire a callback to let Measure know our dimensions
    this.props.onMount(dimensions)
  }

  render() {
    return this.props.children
  }
}

export default MeasureClone