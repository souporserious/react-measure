import React, { Component, Children, cloneElement } from 'react'

import { Measure } from '../../src/index'

function getInvertedValues(first, last) {
  return {
    left: first.left - last.left,
    top: first.top - last.top,
    width: first.width / last.width,
    height: first.height / last.height,
  }
}

function getInvertedTransform(first, last) {
  const { top, left, width, height } = getInvertedValues(first, last)
  return `translate(${left}px, ${top}px) scale(${width}, ${height})`
}

class Flip extends Component {
  state = {
    transform: null,
    transition: false,
  }

  componentWillReceiveProps() {
    if (this.state.transition) {
      this.setState({
        transition: false,
      })
    }
  }

  componentDidUpdate() {
    if (this.state.transform) {
      requestAnimationFrame(() => {
        this.setState({
          transform: null,
          transition: true,
        })

        // cleanup after transition
        setTimeout(() => {
          this.setState({
            transition: false,
          })
        }, 300)
      })
    }
  }

  handleMeasure = measurements => {
    if (this.lastMeasurements) {
      this.setState({
        transform: getInvertedTransform(
          this.lastMeasurements.flip,
          measurements.flip
        ),
      })
    }
    this.lastMeasurements = measurements
  }

  render() {
    const child = Children.only(this.props.children)
    return (
      <div>
        <Measure onMeasure={this.handleMeasure}>
          {({ bind, measurements }) => {
            return cloneElement(child, {
              ...bind('flip'),
              style: {
                ...child.props.style,
                transformOrigin: 'top left',
                transform: this.state.transform,
                ...(this.state.transition
                  ? { transition: 'all 300ms ease' }
                  : {}),
              },
            })
          }}
        </Measure>
      </div>
    )
  }
}

const collapsedStyles = {
  width: 200,
  height: 100,
  marginLeft: 'calc(50% - 100px)',
}

const expandedStyles = {
  width: '100%',
  height: '75vh',
  marginTop: 32,
}

class FlipDemo extends Component {
  state = {
    isToggled: false,
  }
  render() {
    const { isToggled } = this.state
    return (
      <Flip>
        <div
          onClick={() =>
            this.setState(state => ({ isToggled: !state.isToggled }))
          }
          style={{
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            fontFamily: 'sans-serif',
            background: 'rgba(122,255,0,0.5)',
            userSelect: 'none',
            ...(isToggled ? expandedStyles : collapsedStyles),
          }}
        >
          Click it to FLIP it
        </div>
      </Flip>
    )
  }
}

export default FlipDemo
