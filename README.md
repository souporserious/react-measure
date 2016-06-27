## React Measure

Compute measurements of React components. Uses [element-resize-detector](https://github.com/wnr/element-resize-detector) to detect changes of an element and return the new dimensions.

## Install

`npm install react-measure --save`

`bower install react-measure --save`

## Example Usage w/ state

```javascript
import Measure from 'react-measure';

class ItemToMeasure extends Component {
  state = {
    dimensions: {}
  }

  render() {
    const { height } = this.state.dimensions
    return (
      <Measure
        whitelist={['height']}
        onMeasure={(dimensions) => {
          this.setState({dimensions})
        }}
      >
        <div>
          I can do cool things with my dimensions now :D
        </div>
      </Measure>
    )
  }
}
```

## Example Usage w/ child function

```javascript
import Measure from 'react-measure';

class ItemToMeasure extends Component {
  render() {
    return (
      <Measure>
        {dimensions =>
          <div>
            {Object.keys(dimensions).map((dimension, i) =>
              <div key={i}>{dimension}: {dimensions[dimension]}</div>
            )}
          </div>
        }
      </Measure>
    )
  }
}
```

## Props

#### `accurate`: PropTypes.bool

Tries to give the most accurate measure by cloning the element and measuring it. Use if you your item is hidden or you want know to find out what height/width you need to get to.

#### `whitelist`: PropTypes.array

Provide a list of properties to fire a callback for. Accepts any of the following properties `['width', 'height', 'top', 'right', 'bottom', 'left']`

#### `blacklist`: PropTypes.array

Like above, but will not fire a callback for the specified properties.

#### `shouldMeasure`: PropTypes.bool

Determines whether or not a measurement should occur. Useful if you only need to measure in certain cases.

#### `onMeasure`: PropTypes.func

Callback when the component has been mutated. Receives the new `dimensions` of your component.

## Good to knows
To help avoid layout thrashing, use the prop `blacklist` to ignore specific values and stop firing a render to check the DOM for changes. Likewise you can use `whitelist` to choose only the ones you need to check.

**Margins from hell.** If your element is not calculating width or height properly it could be due to a margin hanging outside of its container. To get a true measurement, make sure to not have any hanging margins, in some cases a padding of 1px added to the container will fix this. See the stack overflow answers [here](http://stackoverflow.com/questions/19718634/how-to-disable-margin-collapsing) for more tricks .

## Run Example

clone repo

`git clone git@github.com:souporserious/react-measure.git`

move into folder

`cd ~/react-measure`

install dependencies

`npm install`

run dev mode

`npm run dev`

open your browser and visit: `http://localhost:8080/`
