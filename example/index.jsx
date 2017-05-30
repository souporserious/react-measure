import React, { Component, Children, PropTypes, createElement } from 'react'
import ReactDOM from 'react-dom'
import Measure, { withContentRect } from '../src/react-measure'

import './main.scss'

class Paragraph extends Component {
  render() {
    return (
      <div>
        <p>
          The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.
          {' '}
        </p>
      </div>
    )
  }
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
    const { count } = this.state
    let paragraphs = []

    for (let i = 0; i < count; i++) {
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
              <button onClick={() => measure()}>
                Measure
              </button>
            </header>

            <pre>
              {JSON.stringify(contentRect.scroll, null, 2)}
            </pre>

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
        <pre>
          {JSON.stringify(contentRect.offset, null, 2)}
        </pre>
      </div>
    )}
  </Measure>
)

const DisplayContentRect = ({ innerRef, measure, contentRect, ...props }) => (
  <div ref={innerRef} {...props}>
    These are the dimensions of your component:
    <pre>
      {JSON.stringify(contentRect.bounds, null, 2)}
    </pre>
  </div>
)

const MeasuredHoF = withContentRect(
  'bounds'
)(({ measureRef, contentRect, ...props }) => (
  <DisplayContentRect
    innerRef={measureRef}
    contentRect={contentRect}
    {...props}
  />
))

const MeasuredHoC = props => (
  <Measure bounds>
    {({ measureRef, contentRect }) => (
      <DisplayContentRect
        innerRef={measureRef}
        contentRect={contentRect}
        {...props}
      />
    )}
  </Measure>
)

const LibComponent = props => <DisplayContentRect {...props} />

const MeasuredLib = withContentRect('bounds')(({ measureRef, ...props }) => (
  <LibComponent innerRef={measureRef} {...props} />
))

class App extends Component {
  state = {
    animate: false,
    renderGroup: false,
  }

  render() {
    const { animate, renderGroup } = this.state
    return (
      <div>
        <Measure client offset scroll bounds margin>
          {({ measureRef, contentRect }) => (
            <div>
              <div
              // style={{ position: 'fixed', top: 0, left: 0 }}
              >
                <h4>Paragraphs</h4>
                <pre>
                  {JSON.stringify(contentRect, null, 2)}
                </pre>
              </div>
              <div ref={measureRef} style={{ marginBottom: 24 }}>
                <Paragraphs />
              </div>
            </div>
          )}
        </Measure>
        <div onClick={() => this.setState({ animate: !animate })}>
          <AnimatingChild animate={animate} />
        </div>
        <button onClick={() => this.setState({ renderGroup: !renderGroup })}>
          Toggle Group
        </button>
        {renderGroup &&
          <div>
            <MeasuredHoF />
            <MeasuredHoC />
            <MeasuredLib />
          </div>}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
