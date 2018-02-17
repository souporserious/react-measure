import React, { Component, Children, Fragment, cloneElement } from 'react'
import { tween, value } from 'popmotion'
import styler from 'stylefire'

import generateFakeData from '../generate-fake-data'

import { Measure } from '../../src/index'

class Fluid extends Component {
  static defaultProps = {
    width: null,
    height: null,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width && nextProps.width !== null) {
      this.animateWidth(
        nextProps.width === 'auto' ? this.dimensions.width : nextProps.width
      )
    }
    if (this.props.height !== nextProps.height && nextProps.height !== null) {
      this.animateHeight(
        nextProps.height === 'auto' ? this.dimensions.height : nextProps.height
      )
    }
  }

  setRef = node => {
    if (node) {
      this.nodeStyler = styler(node)
    } else {
      this.nodeStyler = null
    }
  }

  animateWidth = amount => {
    tween({
      from: this.widthValue.get(),
      to: amount,
    }).start(this.widthValue)
  }

  animateHeight = amount => {
    tween({
      from: this.heightValue.get(),
      to: amount,
    }).start(this.heightValue)
  }

  handleMeasure = measurements => {
    if (!measurements.wrapper) {
      return
    }
    const dimensions = measurements.wrapper

    if (this.props.width !== null) {
      if (!this.widthValue) {
        this.widthValue = value(
          this.props.width === 'auto' ? dimensions.width : this.props.width,
          this.nodeStyler.set('width')
        )
      } else if (this.props.width === 'auto') {
        this.animateWidth(dimensions.width)
      }
    }

    if (this.props.height !== null) {
      if (!this.heightValue) {
        this.heightValue = value(
          this.props.height === 'auto' ? dimensions.height : this.props.height,
          this.nodeStyler.set('height')
        )
      } else if (this.props.height === 'auto') {
        this.animateHeight(dimensions.height)
      }
    }

    this.dimensions = dimensions
  }

  render() {
    const {
      width,
      height,
      innerProps,
      children,
      style,
      ...restProps
    } = this.props
    return (
      <div ref={this.setRef} style={{ width, height, ...style }} {...restProps}>
        <Measure onMeasure={this.handleMeasure}>
          {({ bind }) => (
            <div {...bind('wrapper')} {...innerProps}>
              {children}
            </div>
          )}
        </Measure>
      </div>
    )
  }
}

class CollapseDemo extends Component {
  state = {
    isOpen: false,
  }

  render() {
    const { isOpen } = this.state
    return (
      <div>
        <button onClick={() => this.setState({ isOpen: !isOpen })}>
          Toggle
        </button>
        <Fluid
          height={isOpen ? 'auto' : 0}
          style={{ overflow: 'hidden', background: 'orange' }}
          innerProps={{
            style: { padding: 12 },
          }}
        >
          This is some sample content that will show how a collapse can break up
          multiple sections of content and still animate.
        </Fluid>
      </div>
    )
  }
}

export default CollapseDemo
