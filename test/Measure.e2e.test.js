/**
 * @flow
 * @jest-environment jest-environment-puppeteer
 */

import { bootstrap } from './utils.js'

test('Measure component binds and passes size on every resize', async () => {
  const page = await bootstrap()
  const renderFn = jest.fn()

  await page.exposeFunction('renderFn', renderFn)

  await page.evaluate(() => {
    const React = window.React
    const Value = window.ReactPowerPlug.Value
    const Measure = window.ReactMeasure.Measure

    window.render(
      <Measure>
        {({ measurements, bind }) => {
          renderFn(measurements)
          return (
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div {...bind('1')}>
                <Value initial={40}>
                  {({ value, set }) => (
                    <div
                      className="handler"
                      style={{ width: value, height: value + 40 }}
                      onClick={() => set(value * 2)}
                    />
                  )}
                </Value>
              </div>
              <div {...bind('2')}>
                <div style={{ width: 30, height: 60 }} />
              </div>
            </div>
          )
        }}
      </Measure>
    )
  })

  expect(renderFn).lastCalledWith({
    '1': expect.objectContaining({
      width: 40,
      height: 80,
    }),
    '2': expect.objectContaining({
      width: 30,
      height: 60,
    }),
  })

  await page.click('.handler')

  expect(renderFn).toHaveBeenCalledTimes(3)
  expect(renderFn).lastCalledWith({
    '1': expect.objectContaining({
      width: 80,
      height: 120,
    }),
    '2': expect.objectContaining({
      width: 30,
      height: 60,
    }),
  })
})
