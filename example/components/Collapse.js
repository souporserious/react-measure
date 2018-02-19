import React, { Component, Children, Fragment, cloneElement } from 'react'
import { tween, value, transform } from 'popmotion'
import styler from 'stylefire'

import { Measure } from '../../src/index'

import generateFakeData from '../generate-fake-data'

class Fluid extends Component {
  static defaultProps = {
    width: null,
    height: null,
  }

  state = {
    isAnimating: false,
    widthProgress: 0,
    heightProgress: 0,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.animateWidth(
        nextProps.width === 'auto'
          ? this.dimensions.offsetWidth
          : nextProps.width
      )
    }
    if (this.props.height !== nextProps.height) {
      this.animateHeight(
        nextProps.height === 'auto'
          ? this.dimensions.offsetHeight
          : nextProps.height
      )
    }
  }

  setRef = node => {
    if (node) {
      this.nodeStyler = styler(node)
      this.nodeStyler
        .set({
          width: this.props.width,
          height: this.props.height,
        })
        .render()
    }
  }

  startAnimating = () => {
    this.setState({ isAnimating: true })
  }

  stopAnimating = () => {
    this.setState({ isAnimating: false })
  }

  animateDimension = (dimension, toValue) => {
    const dimensionValue = this[`${dimension}Value`]
    const fromValue = dimensionValue.get()
    if (fromValue === toValue) {
      return
    }
    const getProgress = transform.interpolate(
      [fromValue, toValue],
      fromValue < toValue ? [0, 1] : [1, 0]
    )
    this.startAnimating()
    tween({
      from: fromValue,
      to: toValue,
    }).start({
      update: value => {
        dimensionValue.update(value)
        this.setState({
          [`${dimension}Progress`]: getProgress(value),
        })
      },
      complete: this.stopAnimating,
    })
  }

  animateWidth = toValue => {
    this.animateDimension('width', toValue)
  }

  animateHeight = toValue => {
    this.animateDimension('height', toValue)
  }

  handleMeasure = measurements => {
    const dimensions = measurements.inner

    if (this.props.width !== null) {
      if (!this.widthValue) {
        this.widthValue = value(
          this.props.width === 'auto'
            ? dimensions.offsetWidth
            : this.props.width,
          this.nodeStyler.set('width')
        )
      } else if (this.props.width === 'auto') {
        this.widthValue.update(dimensions.offsetWidth)
      }
    }

    if (this.props.height !== null) {
      if (!this.heightValue) {
        this.heightValue = value(
          this.props.height === 'auto'
            ? dimensions.offsetHeight
            : this.props.height,
          this.nodeStyler.set('height')
        )
      } else if (this.props.height === 'auto') {
        this.heightValue.update(dimensions.offsetHeight)
      }
    }

    this.dimensions = dimensions
  }

  render() {
    const { width, height, innerProps, children, ...restProps } = this.props
    const { isAnimating, widthProgress, heightProgress } = this.state
    return (
      <Measure onMeasure={this.handleMeasure}>
        {({ bind }) =>
          children({
            bindWrapper: { ref: this.setRef },
            bindInner: bind('inner'),
            isAnimating,
            widthProgress,
            heightProgress,
          })
        }
      </Measure>
    )
  }
}

const getScale = transform.interpolate([0, 1], [0.95, 1])

class Collapse extends Component {
  state = {
    isOpen: false,
  }

  render() {
    const { isOpen } = this.state
    return (
      <div>
        <button onClick={() => this.setState({ isOpen: !isOpen })}>
          Toggle collapsed content
        </button>
        <Fluid height={isOpen ? 'auto' : 0}>
          {({ bindWrapper, bindInner, isAnimating, heightProgress }) => (
            <div
              {...bindWrapper}
              style={{
                backgroundColor: 'rgba(0,0,0,0.05)',
                overflow: (!isOpen || isAnimating) && 'hidden',
              }}
            >
              <div
                {...bindInner}
                style={{
                  padding: 12,
                  opacity: heightProgress,
                  transform: `scale(${getScale(heightProgress)})`,
                }}
              >
                This is some sample content that will show how a collapse can
                break up multiple sections of content and still animate between
                component resizes.
              </div>
            </div>
          )}
        </Fluid>
      </div>
    )
  }
}

export default Collapse
