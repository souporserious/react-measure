import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import ResizeObserver from 'resize-observer-polyfill'
import getContentRect from './get-content-rect'

const types = ['client', 'offset', 'scroll', 'bounds', 'margin']

function getTypes(props) {
  const allowedTypes = []
  types.forEach(type => {
    if (props[type]) {
      allowedTypes.push(type)
    }
  })
  return allowedTypes
}

function withContentRect(types) {
  return WrappedComponent =>
    class extends Component {
      static propTypes = {
        client: PropTypes.bool,
        offset: PropTypes.bool,
        scroll: PropTypes.bool,
        bounds: PropTypes.bool,
        margin: PropTypes.bool,
        innerRef: PropTypes.func,
        onResize: PropTypes.func,
      }

      state = {
        contentRect: {
          entry: {},
          client: {},
          offset: {},
          scroll: {},
          bounds: {},
          margin: {},
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
        const contentRect = getContentRect(
          this._node,
          types || getTypes(this.props)
        )

        if (entries) {
          contentRect.entry = entries[0].contentRect
        }

        this.setState({ contentRect })

        if (typeof this.props.onResize === 'function') {
          this.props.onResize(contentRect)
        }
      }

      _handleRef = component => {
        this._node = component

        if (typeof this.props.innerRef === 'function') {
          this.props.innerRef(component)
        }
      }

      render() {
        const { innerRef, onResize, ...props } = this.props
        return createElement(WrappedComponent, {
          ...props,
          measure: this.measure,
          measureRef: this._handleRef,
          contentRect: this.state.contentRect,
        })
      }
    }
}

export default withContentRect
