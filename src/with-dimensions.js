import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import ResizeObserver from 'resize-observer-polyfill'
import getNodeDimensions from 'get-node-dimensions'

function withDimensions(WrappedComponent, { includeMargin, useClone } = {}) {
  class MeasuredComponent extends Component {
    static propTypes = {
      includeMargin: PropTypes.bool,
      useClone: PropTypes.bool,
    }

    state = {
      dimensions: {
        width: -1,
        height: -1,
      },
    }

    componentDidMount() {
      if (typeof window !== 'object') return

      if (this._node) {
        this._resizeObserver = new ResizeObserver(this.measure)
        this._resizeObserver.observe(this._node)
      } else {
        console.error(
          'No ref found, attach the `measureRef` prop to the component you want to measure.'
        )
      }
    }

    componentWillUnmount() {
      if (this.resizeObserver && this._node) {
        this._resizeObserver.disconnect(this._node)
      }
    }

    measure = entries => {
      const dimensions = getNodeDimensions(this._node, {
        margin: this.props.includeMargin || includeMargin,
        clone: this.props.useClone || useClone,
      })

      this.setState({ dimensions })

      if (typeof this.props.onResize === 'function') {
        this.props.onResize(dimensions)
      }
    }

    _handleRef = component => {
      this._node = component

      if (typeof this.props.innerRef === 'function') {
        this.props.innerRef(component)
      }
    }

    render() {
      const { onResize, ...props } = this.props
      return createElement(WrappedComponent, {
        ...props,
        measure: this.measure,
        measureRef: this._handleRef,
        dimensions: this.state.dimensions,
      })
    }
  }
  return MeasuredComponent
}

export default withDimensions
