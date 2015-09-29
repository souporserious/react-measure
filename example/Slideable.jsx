import React, { Component, Children, PropTypes } from 'react'
import { Spring } from 'react-motion'
import Measure from '../src/react-measure'

class Slideable extends Component {
  static propTypes = {
    component: PropTypes.string,
    defaultHeight: PropTypes.number,
    springConfig: PropTypes.array,
    toggle: PropTypes.bool,
    forceAutoHeight: PropTypes.bool
  }

  static defaultProps = {
    component: 'div',
    defaultHeight: 0,
    springConfig: [205, 28],
    toggle: false,
    forceAutoHeight: false
  }

  state = {
    height: null
  }

  render() {
    const { toggle, component, className, defaultHeight, springConfig, style, children, forceAutoHeight } = this.props;

    return(
      <Measure
        clone={true}
        forceAutoHeight={forceAutoHeight}
        whitelist={['height']}
        onChange={d => this.setState({height: d.height})}
      >
        <Spring
          endValue={{
            val: {
              height: toggle ? (this.state.height || defaultHeight) : defaultHeight,
              translateY: toggle ? 0 : 10,
              opacity: toggle ? 1 : -1
            },
            config: springConfig
          }}
        >
          {({val: {height, translateY, opacity}}) =>
            React.createElement(
              component,
              {
                className,
                style: {
                  height: height === this.state.height ? '' : height,
                  overflow: 'hidden',
                  ...style
                }
              },
              children
            )
          }
        </Spring>
      </Measure>
    )
  }
}

export default Slideable