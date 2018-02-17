import React, { Component, Fragment } from 'react'

import { Measure } from '../../src/index'

class OverflowMenu extends Component {
  render() {
    return (
      <Measure>
        {({ bind, measurements }) => (
          <div {...bind('menu')} style={{ padding: 12, background: 'orange' }}>
            {measurements.menu ? measurements.menu.width : 0}
            {['Home', 'About', 'Articles', 'Contact'].map(link => (
              <a key={link}>{link}</a>
            ))}
          </div>
        )}
      </Measure>
    )
  }
}

export default OverflowMenu
