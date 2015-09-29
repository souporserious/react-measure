import React, { Component, Children, PropTypes } from 'react'
import { Spring } from 'react-motion'
import Measure from '../src/react-measure'
import Slideable from './Slideable'

import './main.scss';

class SlideableDemo extends Component {
  constructor() {
    super();
    this._handleToggle = this._handleToggle.bind(this);
    this.state = {toggle: true}
  }
  
  _handleToggle() {
    this.setState({toggle: !this.state.toggle});
  }

  render() {
    return(
      <div>
        <button onClick={this._handleToggle}>Toggle</button>
        <Slideable
          toggle={this.state.toggle}
          style={{
            background: '#b4da55'
          }}
        >
          <div
            style={{
              padding: '32px 28px'
            }}
          >
            <h3>Sam L Jackson</h3>
            <p>Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'?</p>
          </div>
        </Slideable>
      
        <Slideable
          forceAutoHeight={true}
          toggle={!this.state.toggle}
          style={{
            background: '#DA8355'
          }}
        >
          <div
            style={{
              padding: '6px 28px'
            }}
          >
            <h3>Sam L Jackson</h3>
            <p>Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'?</p>
            <Slideable
              toggle={!this.state.toggle}
              style={{
                background: '#DA5555'
              }}
            >
              <div
                style={{
                  padding: '6px 28px'
                }}
              >
                <h3>Sam L Jackson</h3>
                <p>Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'?</p>
              </div>
            </Slideable>
          </div>
        </Slideable>
      </div>
    );
  }
}


class AccordionContent extends Component {
  state = {
    height: 0
  }

  render() {
    const { item, active } = this.props;

    return(
      <Measure
        clone={true}
        onChange={dimensions => this.setState({height: dimensions.height})}
      >
        <Spring
          endValue={{
            val: {
              height: active === item.id ? this.state.height : 0,
              opacity: active === item.id ? 1 : 0,
              scale: active === item.id ? 1 : 0.95
            }
          }}
        >
          {({val: {height, opacity, scale}}) =>
            <div
              className="accordion__item__content"
              style={{height, opacity, transform: `scale(${scale})`}}
            >
              {item.contents.map((content, i) => <p key={i}>{content}</p>)}
            </div>
          }
        </Spring>
      </Measure>
    )
  }
}

class Accordion extends Component {  
  _handleClick(item) {
    this.props.onClick(item);
  }
  
  render() {
    const { items, active } = this.props;

    return(
      <ul className="accordion__items">
        {items.map(item =>
          <li
            className="accordion__item" key={item.id}
            onClick={this._handleClick.bind(this, item)}
          >
            <h2 className="accordion__item__title">{item.title}</h2>
            <AccordionContent item={item} active={active} />
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
        <SlideableDemo />
      </div>
    );
  }
}

React.render(<App />, document.getElementById('app'));