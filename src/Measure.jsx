import React from 'react'
import withContentRect from './with-content-rect'

function Measure({ measure, measureRef, contentRect, children }) {
  return children({ measure, measureRef, contentRect })
}

export default withContentRect()(Measure)
