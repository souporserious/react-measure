import React, { Component, Children, PropTypes, createElement } from 'react'
import Measure, { withContentRect } from '../../../src'

import '../app.css'

function Paragraph() {
  return (
    <div>
      <p>
        The path of the righteous man is beset on all sides by the iniquities of
        the selfish and the tyranny of evil men. Blessed is he who, in the name
        of charity and good will, shepherds the weak through the valley of
        darkness, for he is truly his brother's keeper and the finder of lost
        children. And I will strike down upon thee with great vengeance and
        furious anger those who would attempt to poison and destroy My brothers.
        And you will know My name is the Lord when I lay My vengeance upon thee.{' '}
      </p>
    </div>
  )
}

class Paragraphs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      display: true,
      contentRect: {},
    }
  }

  _renderParagraphs() {
    let paragraphs = []
    for (let i = 0; i < this.state.count; i++) {
      paragraphs.push(<Paragraph key={i} />)
    }
    return paragraphs
  }

  render() {
    const { count, display } = this.state
    return (
      <Measure scroll>
        {({ measure, measureRef, contentRect }) => (
          <div className="measure-example">
            <header>
              <button onClick={() => this.setState({ count: count + 1 })}>
                Add Paragraph
              </button>
              <button onClick={() => this.setState({ display: !display })}>
                Toggle Visibility
              </button>
              <button onClick={() => measure()}>Measure</button>
            </header>
            <pre>{JSON.stringify(contentRect.scroll, null, 2)}</pre>
            <div
              ref={measureRef}
              style={{
                height: display ? undefined : 0,
                overflow: display ? undefined : 'hidden',
              }}
            >
              <div
                className="paragraphs"
                style={{
                  padding: 12,
                  background: 'red',
                }}
              >
                {this._renderParagraphs()}
              </div>
            </div>
          </div>
        )}
      </Measure>
    )
  }
}

const AnimatingChild = ({ animate }) => (
  <Measure offset>
    {({ measureRef, contentRect }) => (
      <div ref={measureRef} className={`square ${animate ? 'animate' : ''}`}>
        <strong>
          {animate ? 'Click to stop animating' : 'Click to animate'}
        </strong>
        <pre>{JSON.stringify(contentRect.offset, null, 2)}</pre>
      </div>
    )}
  </Measure>
)

class App extends Component {
  state = {
    animate: false,
  }

  render() {
    const { animate } = this.state
    return (
      <div>
        <Measure client offset scroll bounds margin>
          {({ measureRef, contentRect }) => (
            <div ref={measureRef} style={{ marginBottom: 24 }}>
              <Paragraphs />
            </div>
          )}
        </Measure>
        <div onClick={() => this.setState({ animate: !animate })}>
          <AnimatingChild animate={animate} />
        </div>
      </div>
    )
  }
}

export default App
