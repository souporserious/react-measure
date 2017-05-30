import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import ResizeObserver from 'resize-observer-polyfill'
import getTypes from './get-types'
import getContentRect from './get-content-rect'

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
        children: PropTypes.func,
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

      componentWillMount() {
        this._resizeObserver = new ResizeObserver(this.measure)
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

      _handleRef = node => {
        this._node = node

        if (node) {
          this._resizeObserver.observe(node)
        } else {
          this._resizeObserver.disconnect(node)
        }

        if (typeof this.props.innerRef === 'function') {
          this.props.innerRef(node)
        }
      }

      render() {
        const { innerRef, onResize, ...props } = this.props
        return createElement(WrappedComponent, {
          ...props,
          measureRef: this._handleRef,
          measure: this.measure,
          contentRect: this.state.contentRect,
        })
      }
    }
}

export default withContentRect
