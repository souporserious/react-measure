/**
 * @flow
 * @jest-environment jest-environment-node
 */

import * as React from 'react'
import TestRenderer from 'react-test-renderer'
import { Measure } from '../src'

test('Measure component work on server', () => {
  const renderFn = jest.fn().mockReturnValue(null)
  TestRenderer.create(<Measure>{renderFn}</Measure>)

  expect(renderFn).toHaveBeenCalledTimes(1)
  expect(renderFn).lastCalledWith(
    expect.objectContaining({ measurements: null })
  )
})
