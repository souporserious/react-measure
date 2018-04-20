// @flow

export const bootstrap = async () => {
  const page = await global.browser.newPage()

  const scripts = [
    './node_modules/react/umd/react.development.js',
    './node_modules/react-dom/umd/react-dom.development.js',
    './node_modules/react-powerplug/dist/react-powerplug.js',
    './dist/index.umd.js',
  ]

  for (const path of scripts) {
    await page.addScriptTag({ path })
  }

  await page.setViewport({ width: 1000, height: 1000 })

  await page.evaluate(() => {
    const container = document.createElement('div')
    if (document.body) {
      const body = document.body
      body.appendChild(container)
      body.style.margin = '0px'
    }

    window.render = component => {
      window.ReactDOM.render(component, container)
    }
  })

  page.on('console', msg =>
    msg.args().forEach(arg => console.log(arg.toString()))
  )

  return page
}
