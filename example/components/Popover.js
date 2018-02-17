import React, { Component, Children, Fragment, cloneElement } from 'react'
import { transform } from 'popmotion'

import generateFakeData from '../generate-fake-data'

import { Measure, Viewport } from '../../src/index'

const data = generateFakeData(
  faker => ({
    id: faker.random.uuid(),
    avatar: faker.image.avatar(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  }),
  50
)

class Popper extends Component {
  render() {
    return
  }
}

const placements = (placement, target, popper) => {
  const placementLookup = {
    topLeft: '',
    topCenter: '',
    topRight: '',
    bottomCenter: {
      left: target.width / 2 - popper.width / 2,
      bottom: 0,
    },
  }
  return {
    position: 'absolute',
    ...placementLookup[placement],
  }
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min
}

// use intersection observer to determine if element is hitting another element

class ScrollShadow extends Component {
  state = {
    targetLeft: 0,
    targetTop: 0,
  }

  updatePosition = () => {
    this.setState({
      targetLeft: getRandomFloat(0, window.innerWidth),
      targetTop: getRandomFloat(0, window.innerHeight),
    })
  }

  render() {
    const { targetLeft, targetTop } = this.state
    return (
      <div style={{ height: '150vh' }}>
        <button onClick={this.updatePosition}>Update position</button>
        <Viewport>
          {viewport => (
            <Measure>
              {({ bind, measurements: { target, popper } }) => (
                <React.Fragment>
                  <div
                    {...bind('target')}
                    style={{
                      background: 'orange',
                      marginLeft: targetLeft,
                      marginTop: targetTop,
                    }}
                  >
                    Target
                  </div>
                  <div
                    {...bind('popper')}
                    style={{
                      background: 'pink',
                      overflow: 'auto',
                      position: 'absolute',
                      ...(target && popper
                        ? {
                            height: viewport.height - target.bottom,
                            top: target.bottom,
                            left:
                              target.left +
                              (target.width / 2 - popper.width / 2),
                          }
                        : {}),
                    }}
                  >
                    {data.map(person => (
                      <div
                        key={person.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: 8,
                        }}
                      >
                        <img
                          src={person.avatar}
                          width={32}
                          height={32}
                          style={{ marginRight: 8 }}
                        />
                        {person.firstName} {person.lastName}
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              )}
            </Measure>
          )}
        </Viewport>
      </div>
    )
  }
}

export default ScrollShadow
