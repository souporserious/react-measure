import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM from 'react-dom'
import shallowCompare from 'react-addons-shallow-compare'
import { Motion, spring, presets } from 'react-motion'
import Measure from '../src/react-measure'

// PARENT always knows about children
// should change data attribute saying it is now a child
// data-slideable-child=true

const stopParentSlideables = (el) => {
  while (el !== document.body) {
    el = el.parentNode

    const slideable = el.getAttribute('data-slideable')
    
    if (slideable && slideable !== 'stop') {
      el.setAttribute('data-slideable', 'stop')
    }
  }
}

class Store {
  constructor() {
    this.slideables = {}
  }

  getSlideables() {
    return this.slideables
  }

  add(slideable) {

  }

  remove() {

  }

  onChange() {

  }
}

class Slideable extends Component {
  state = {
    height: -1,
    instant: false
  }
  _isAnimating = false

  componentWillReceiveProps({show}) {
    // if we're toggling "show", measure and set state
    // so we can animate from an accurate measurement
    if(this.props.show !== show) {
      const { height } = this.refs['measure'].getDimensions()
      this.setState({height})
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  componentDidUpdate() {
    const { stopped, instant } = this.state

    if(instant) {
      this.setState({instant: false})
    }
  }

  // check if any children are animating
  _shouldMeasure = (mutations) => {
    // we need to build a set of rules
    // the last triggered Slideable always takes precedence over any others
    // 
    // it needs to notify any parents as well as children that it is animating
    // reasons why include
    // 1. if a parent is in the middle of animating it needs to notify that parent to stop
    // we can change a data attribute on it and it will recieve the notification
    // to stop
    // 
    // Mock API
    // call methods by changing data attributes
    // data-slideable={['measure', 'stop', 'animateTo', 'animateFrom']}
    // [measure] - measure the component and set it's height instantly - would stop any current animations as well
    // [stop] - stop animating and set height to 'auto'
    // [animateTo] - animate to the last known value it has
    // [animateFrom] - animate from the last known value it has
    
    // maybe we have a needsMeasure state? We need to measure when the show prop
    // has changed so something like
    // show prop changes ->
    // set something to not animate height just yet ->
    // grab height, set that prop to false so we can animate now ->
    // we've now moved from a current height

    // when I fire, stop all current animations, measure myself and
    // go to whatever value I was at that moment in time

    // we need to measure at least once before we receive a mutation
    if (!mutations) return true

    // we may need to go through each mutation for instance if 3 slideables
    // are all triggered at once how do we handle that
    const { target, attributeName } = mutations[0]
    const slideable = target.getAttribute('data-slideable')
    const isSliding = target.getAttribute('data-sliding')

    // stop slideables if that's what we wanted
    if(slideable === 'stop') {
      this.stop()
    }

    // stop all parent slideables
    stopParentSlideables(target)
    
    // if the mutation happened to this component we need
    // to update the children so they will stop animating
    if (this._node === target && isSliding) {
      return true
    }

    // check if the target is a child of this node
    if (this._node !== target) {
      const isSliding = target.getAttribute('data-sliding')

      // if it has finished sliding then we need to query for height
      if(isSliding === 'false') {
        return { target, isSliding }
      }

    // if this node and is a mutation from data-sliding, don't update
    } else if (attributeName === 'data-sliding') {
      return false
    }
  }

  _onMeasure = ({height}, mutations, data) => {
    //if (!mutations) return this.setState({height})
    this.setState({height})
    //const { target, attributeName } = mutations[0]
    //const isSliding = target.getAttribute('data-sliding')
    
    // if (attributeName === 'data-slideable') {
    //   const slideable = target.getAttribute('data-slideable')
      
    //   // stop slideables if that's what we wanted
    //   if (slideable === 'stop') {
    //     this.stop()
    //     return
    //   }
    // }

    //stopParentSlideables(target)
    // stop all parent slideables
    // stopParentSlideables(target, anyStopped => {
    //   // if any slideables were stopped we can't animate yet
    //   // since they need to finish
    //   if (anyStopped) {

    //   } else {

    //   }
    // })

    // set height if this was a child and has finished sliding
    // if (this._node !== target && isSliding === 'false') {
    //   this.setState({height, instant: true})
    // }
  }

  // stops a Slideable if in the middle of animating and moves to its value
  // instantly, good way to prime the slideable height without animating to it
  stop() {
    this.setState({instant: true})
  }

  render() {
    const { show, children } = this.props
    const { instant } = this.state
    const child = React.Children.only(children)
    const { style } = child.props
    const rmHeight = show ? this.state.height : 0
    const rmConfig = presets.noWobble//[60, 22]

    return(
      <Measure
        ref="measure"
        config={{
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['data-slideable', 'data-sliding']
        }}
        accurate
        whitelist={['height']}
        shouldMeasure={this._shouldMeasure}
        onMeasure={this._onMeasure}
      >
        <Motion
          defaultStyle={{height: 0}}
          style={{
            height: instant ? rmHeight : spring(rmHeight, rmConfig)
          }}
        >
          {({height}) => {
            const destHeight = parseFloat(this.state.height).toFixed(2)
            const currHeight = parseFloat(height).toFixed(2)
            let rmStyle = {}

            if (destHeight !== currHeight && !instant) {
              rmStyle = {
                height,
                overflow: 'hidden'
              }
            }

            if (destHeight === currHeight || height === 0) {
              this._isAnimating = false
            } else {
              this._isAnimating = true
            }

            return(
              React.cloneElement(
                React.Children.only(children),
                {
                  ref: c => this._node = ReactDOM.findDOMNode(c),
                  style: {
                    ...rmStyle,
                    ...style
                  },
                  'data-sliding': this._isAnimating,
                  'data-slideable': true
                }
              )
            )
          }}
        </Motion>
      </Measure>
    )
  }
}

export default Slideable