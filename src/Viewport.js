// @flow

import * as React from 'react'
import ResizeObserver from 'resize-observer-polyfill'

import {
  getClosestScrollElement,
  getScrollXDirection,
  getScrollYDirection,
  getWindowSize,
  getElementSize,
} from './utils'

type State = {|
  width: number,
  height: number,
  scrollWidth: number,
  scrollHeight: number,
  scrollX: number,
  scrollY: number,
  scrollXDirection: 'left' | 'right' | null,
  scrollYDirection: 'down' | 'up' | null,
|}

type Props = {|
  children: ({
    bind: {
      ref: (?Element) => void,
    },
    initialScrollX: number,
    initialScrollY: number,
    ...State,
  }) => React.Node,
|}

class Viewport extends React.Component<Props, State> {
  firstResizeEvent = true
  initialScrollX = 0
  initialScrollY = 0
  node: ?Element = null
  scrollElement: any
  isWindow: boolean
  resizeObserver: ResizeObserver
  lastScrollX: number
  latestScrollX: number
  lastScrollY: number
  latestScrollY: number
  isScrolling: boolean = false

  state = {
    width: 0,
    height: 0,
    scrollWidth: 0,
    scrollHeight: 0,
    scrollX: 0,
    scrollY: 0,
    scrollXDirection: null,
    scrollYDirection: null,
  }

  componentDidMount() {
    this.scrollElement = getClosestScrollElement(this.node)
    this.isWindow = this.scrollElement === window

    this.scrollElement.addEventListener('scroll', this.requestScroll)
    this.requestScroll()

    this.initialScrollX = this.isWindow
      ? window.pageXOffset
      : this.scrollElement.scrollLeft
    this.initialScrollY = this.isWindow
      ? window.pageYOffset
      : this.scrollElement.scrollTop

    if (this.isWindow) {
      window.addEventListener('resize', this.updateWindowSize)
      this.updateWindowSize()
    } else {
      this.resizeObserver = new ResizeObserver(() => {
        if (this.firstResizeEvent) {
          this.firstResizeEvent = false
        } else {
          this.updateElementSize()
        }
      })
      this.resizeObserver.observe(this.scrollElement)
      this.updateElementSize()
    }
  }

  componentWillUnmount() {
    this.scrollElement.removeEventListener('scroll', this.requestScroll)
    if (this.isWindow) {
      window.removeEventListener('resize', this.updateWindowSize)
    } else {
      this.resizeObserver.disconnect()
    }
  }

  requestScroll = () => {
    this.latestScrollX = this.isWindow
      ? window.pageXOffset
      : this.scrollElement.scrollLeft
    this.latestScrollY = this.isWindow
      ? window.pageYOffset
      : this.scrollElement.scrollTop
    if (!this.isScrolling) {
      requestAnimationFrame(this.updateScroll)
      this.isScrolling = true
    }
  }

  updateScroll = () => {
    const scrollXDirection = getScrollXDirection(
      this.lastScrollX,
      this.latestScrollX
    )
    const scrollYDirection = getScrollYDirection(
      this.lastScrollY,
      this.latestScrollY
    )

    this.lastScrollX = this.latestScrollX
    this.lastScrollY = this.latestScrollY

    this.setState({
      scrollX: this.latestScrollX,
      scrollY: this.latestScrollY,
      scrollXDirection,
      scrollYDirection,
    })

    this.isScrolling = false
  }

  updateWindowSize = () => {
    this.setState(getWindowSize())
  }

  updateElementSize = () => {
    this.setState(getElementSize(this.scrollElement))
  }

  setRef = (node: ?Element) => {
    if (!this.node) {
      this.node = node
    }
  }

  render() {
    return this.props.children({
      bind: {
        ref: this.setRef,
      },
      initialScrollX: this.initialScrollX,
      initialScrollY: this.initialScrollY,
      ...this.state,
    })
  }
}

export default Viewport
