// @flow

import * as React from 'react'
import { Viewport, Measure } from '../src'
;[
  <Viewport>
    {params => {
      ;(params.bind: Object)
      ;(params.initialScrollX: number)
      ;(params.initialScrollY: number)
      ;(params.width: number)
      ;(params.height: number)
      ;(params.scrollWidth: number)
      ;(params.scrollHeight: number)
      ;(params.scrollX: number)
      ;(params.scrollY: number)
      ;(params.scrollXDirection: string | null)
      ;(params.scrollYDirection: string | null)
    }}
  </Viewport>,
  // $FlowFixMe
  <Viewport />,
][
  (<Measure>{() => null}</Measure>,
  (
    <Measure>
      {params => {
        params.bind('1')
        if (params.measurements) {
          ;(params.measurements['1'].width: number)
          // unsound yet
          ;(params.measurements['2'].width: number)
        }
      }}
    </Measure>
  ),
  (
    // $FlowFixMe
    <Measure />
  ))
]
