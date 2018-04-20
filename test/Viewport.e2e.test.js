/**
 * @flow
 * @jest-environment jest-environment-puppeteer
 */

import { bootstrap } from './utils.js'

test.skip('bind to the element and passes size and scroll on the next render', async () => {
  const page = await bootstrap()
  const renderFn = jest.fn()
  await page.exposeFunction('renderFn', renderFn)

  await page.evaluate(() => {
    const React = window.React
    const Viewport = window.ReactMeasure.Viewport

    const omit = (data, list) =>
      Object.entries(data).reduce((acc, [key, value]) => {
        if (!list.includes(key)) {
          acc[key] = value
        }
        return acc
      }, {})

    window.render(
      <Viewport>
        {params => {
          window.renderFn(omit(params, ['bind']))
          return (
            <div
              className="viewport"
              style={{ width: 100, height: 120, overflow: 'scroll' }}
            >
              <div {...params.bind}>
                <div style={{ width: 500, height: 520 }} />
              </div>
            </div>
          )
        }}
      </Viewport>
    )
  })

  expect(renderFn).toHaveBeenCalledTimes(2)
  expect(renderFn).lastCalledWith({
    initialScrollX: 0,
    initialScrollY: 0,
    width: 100,
    height: 120,
    scrollWidth: 520,
    scrollHeight: 520,
    scrollX: 0,
    scrollY: 0,
    scrollXDirection: null,
    scrollYDirection: null,
  })
})
