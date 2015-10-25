import React, { Component, PropTypes, createElement } from 'react'
import shallowCompare from 'react/lib/shallowCompare'
import { Motion, spring } from 'react-motion'
import Measure from '../src/react-measure'

class Slideable extends Component {
  state = {
    height: -1
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render() {
    const { show, children } = this.props

    return(
      React.createElement(
        Measure,
        {
          accurate: true,
          onChange: d => {
            this.setState({height: d.height})
          }
        },
        React.createElement(
          Motion,
          {
            defaultStyle: {
              height: 0
            },
            style: {
              height: spring(show ? this.state.height : 0)
            }
          },
          ({height}) =>
            React.cloneElement(
              React.Children.only(children),
              {
                style: {
                  height: (this.state.height > -1) ? height : ''
                }
              }
            )
        )
      )
    )
  }
}

export default Slideable