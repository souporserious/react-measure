import React, { Component, Fragment } from 'react'

import Collapse from './components/Collapse'
import OverflowMenu from './components/OverflowMenu'
import Popover from './components/Popover'
import Table from './components/Table'

class App extends Component {
  render() {
    return (
      <div role="main">
        <Collapse />
        <Popover />
        <OverflowMenu />
        <Table />
      </div>
    )
  }
}

export default App
