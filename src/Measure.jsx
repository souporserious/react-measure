// @flow

import * as React from 'react'
import withContentRect, { type OutputProps } from './with-content-rect'

type OwnProps = {
  children: (params: OutputProps) => React.Element<*>
};

function Measure({ measure, measureRef, contentRect, children }: { ...OwnProps, ...$Exact<OutputProps> }) {
  if (children) {
    return children({ measure, measureRef, contentRect })
  }
}

export default withContentRect()(Measure)
