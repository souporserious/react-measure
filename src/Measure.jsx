import React from 'react'
import PropTypes from 'prop-types'
import withContentRect from './with-content-rect'

const Measure =  withContentRect()(function Measure ({ measure, measureRef, contentRect, children }) {
  return children({ measure, measureRef, contentRect })
})

Measure.displayName = 'Measure'
Measure.propTypes.children = PropTypes.func

export default Measure
