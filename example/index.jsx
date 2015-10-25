import React, { Component, Children, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import shallowCompare from 'react/lib/shallowCompare'
import Slideable from './Slideable'

import './main.scss'

class AccordionContent extends Component {
  state = {
    content: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render() {
    const { item, style } = this.props
    const { content } = this.state

    return(
      <div
        className="accordion__item__content"
        style={style}
      >
        {item.contents.map((content, i) => <p key={i}>{content}</p>)}
        <div style={{padding: 0.1}}>
          <button
            onClick={e => {
              e.stopPropagation()
              this.setState({content: !this.state.content})
            }}
          >
            Toggle Extra Content
          </button>
          {
            content &&
            <p>Just another paragraph to test out height animations.</p>
          }
        </div>
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
            <Slideable show={active === item.id}>
              <AccordionContent item={item} active={active} />
            </Slideable>
          </li>
        )}
      </ul>
    );
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
    active: 1
  }
  
  _handleAccordionClick = ({id}) => {
    const active = (id === this.state.active) ? null : id;
    this.setState({active});
  }
  
  render() {
    const { items, active } = this.state;
    const currentSelected = active === null ? 'Nothing selected' : items[active].title;

    return(
      <div className="app">
        <strong>Current Selected:</strong> {currentSelected}
        <Accordion
          items={items}
          active={active}
          onClick={this._handleAccordionClick}
        />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));