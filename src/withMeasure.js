import React from 'react'
import Measure from 'react-measure'

const withMeasure = (
  dimensionsToInject = ['width', 'height', 'top', 'right', 'bottom', 'left'],
  props = {}
) => WrappedComponent => wrappedComponentProps => (
  <Measure {...props}>
    {dimensions => {
      const injectedDimensions = {}
      dimensionsToInject.forEach(key => {
        injectedDimensions[key] = dimensions[key]
      })
      return (
        <WrappedComponent {...injectedDimensions} {...wrappedComponentProps} />
      )
    }}
  </Measure>
)

export default withMeasure
