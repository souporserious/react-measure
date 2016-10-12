import React, { Component, Children, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Measure from '../src/react-measure'

import './main.scss'

class Paragraph extends Component {
  render() {
    return(
      <div>
        <p>The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee. </p>
      </div>
    )
  }
}

class Paragraphs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      toggleFlex: false,
      dimensions: {}
    }
  }

  _renderParagraphs() {
    const { count } = this.state
    let paragraphs = []

    for(let i = 0; i < count; i++) {
      paragraphs.push(<Paragraph key={i} />)
    }

    return paragraphs
  }

  _renderDimensions() {
    const { dimensions } = this.state

    return (
      Object.keys(dimensions).map((dimension, i) =>
        <li key={i}>{dimension}: {dimensions[dimension]}</li>
      )
    )
  }

  render() {
    const { count, toggleFlex } = this.state

    return(
      <div className="measure-example">
        <header>
          <button
            onClick={() =>
              this.setState({count: count + 1})
            }
          >
            Add Paragraph
          </button>
          <button
            onClick={() =>
              this.setState({toggleFlex: !toggleFlex})
            }
          >
            Toggle Flex
          </button>
        </header>
        <main>
          <Measure
            onMeasure={(dimensions) => {
              this.setState({dimensions})
            }}
          >
            <div
              className="paragraphs"
              style={{
                flex: toggleFlex ? 2 : 1,
                padding: 12,
                background: 'red'
              }}
            >
              {this._renderParagraphs()}
            </div>
          </Measure>
          <ul
            className="paragraphs-measurements"
          >
            {this._renderDimensions()}
          </ul>
        </main>
      </div>
    )
  }
}

const AnimatingChild = ({ animate }) => (
  <Measure>
    {dimensions =>
      <div className={`square ${animate ? 'animate' : ''}`}>
        <strong>
          {animate ? 'Click to stop animating' : 'Click to animate'}
        </strong>
        <pre>
          {JSON.stringify(dimensions, null, 2)}
        </pre>
      </div>
    }
  </Measure>
)

class App extends Component {
  state = {
    animate: false
  }

  render() {
    const { animate } = this.state
    return (
      <div>
        <Paragraphs/>
        <div onClick={() => this.setState({ animate: !animate })}>
          <AnimatingChild animate={animate}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
