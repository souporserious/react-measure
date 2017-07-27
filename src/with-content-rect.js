// @flow

import React, { Component, createElement } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
import getTypes from './get-types'
import getContentRect, { type Entry, type ContentRect } from './get-content-rect'

type InputProps = {
  client?: boolean,
  offset?: boolean,
  scroll?: boolean,
  bounds?: boolean,
  margin?: boolean,
  innerRef?: (element: HTMLElement) => void,
  onResize?: (contentRect: ContentRect) => void,
}

export type OutputProps = {
  measureRef: (element: HTMLElement) => void,
  measure: (entries: Entry[]) => void,
  contentRect: ContentRect,
};

type State = {
  contentRect: ContentRect,
}

function withContentRect<Props: InputProps>(types?: string[]) {
  return (WrappedComponent: ReactClass<$Exact<Props> & OutputProps>): ReactClass<Props> =>
    class extends Component {
      props: Props;

      state: State = {
        contentRect: {},
      }

      _resizeObserver: ResizeObserver;

      _node: HTMLElement;

      componentWillMount() {
        this._resizeObserver = new ResizeObserver(this.measure)
      }

      measure = (entries: Entry[]) => {
        const contentRect = getContentRect(
          this._node,
          types || getTypes(this.props)
        )

        if (entries.length !== 0) {
          contentRect.entry = entries[0].contentRect
        }

        this.setState({ contentRect })

        if (typeof this.props.onResize === 'function') {
          this.props.onResize(contentRect)
        }
      }

      _handleRef = (node: HTMLElement) => {
        if (this._resizeObserver) {
          if (node) {
            this._resizeObserver.observe(node)
          } else {
            this._resizeObserver.disconnect(this._node)
          }
        }
        this._node = node

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
