import React, { Component, Children, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import shallowCompare from 'react/lib/shallowCompare'
import Measure from '../src/react-measure'
import Slideable from './Slideable'

import './main.scss'

class AccordionContent extends Component {
  state = {
    showContent: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render() {
    const { item, style } = this.props
    const { showContent } = this.state

    return(
      <div
        className="accordion__item__content"
        style={style}
        data-sliding={this.props['data-sliding']}
      >
        <div>
          <button
            onClick={e => {
              e.stopPropagation()
              this.setState({showContent: !this.state.showContent})
            }}
          >
            Toggle Extra Content
          </button>
          <Slideable show={showContent}>
            <div style={{background: 'red'}}>
              <p style={{margin: 0, padding: 12}}>Just another paragraph to test out height animations.</p>
              <p style={{margin: 0, marginTop: 12, padding: 12}}>Just another paragraph to test out height animations.</p>
            </div>
          </Slideable>
        </div>
        {item.contents.map((content, i) => <p key={i}>{content}</p>)}
      </div>
    )
  }
}

class Accordion extends Component {
  _handleClick(item) {
    this.props.onClick(item)
  }

  render() {
    const { items, active } = this.props

    return(
      <ul className="accordion__items">
        {items.map(item =>
          <li
            key={item.id}
            className="accordion__item"
            onClick={this._handleClick.bind(this, item)}
          >
            <h2 className="accordion__item__title">{item.title}</h2>
            <Slideable
              show={active === item.id}
            >
              <AccordionContent item={item} active={active} />
            </Slideable>
          </li>
        )}
      </ul>
    );
  }
}

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

    return(
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

class App extends Component {
  state = {
    items: [
      {
        id: 0,
        title: 'What is a dog?',
        contents: ['A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.']
      }, {
        id: 1,
        title: 'What kinds of dogs are there?',
        contents: ['There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.']
      }, {
        id: 2,
        title: 'How do you acquire a dog?',
        contents: ['Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.', 'A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog who may not find one so readily.']
      }
    ],
    active: 1,
    showSVG: false
  }

  _handleAccordionClick = ({id}) => {
    const active = (id === this.state.active) ? null : id;
    this.setState({active});
  }

  render() {
    const { items, active, showSVG } = this.state;
    const currentSelected = active === null ? 'Nothing selected' : items[active].title;

    return(
      <div className="app">
        <div>
          <div onClick={() => this.setState({showSVG: !showSVG})}>Toggle SVG</div>
          <Slideable show={showSVG}>
            <svg width="36px" height="36px" viewBox="0 0 36 36">
              <circle fill="#373D3F" cx="18" cy="18" r="18"/>
          	 <polygon fill="#CDD7DB" points="14,11 26,18 14,25"/>
            </svg>
          </Slideable>
        </div>
        <strong>Current Selected:</strong> {currentSelected}
        <Accordion
          items={items}
          active={active}
          onClick={this._handleAccordionClick}
        />
        <Paragraphs />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
