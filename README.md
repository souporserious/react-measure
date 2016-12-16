## React Measure

[![npm version](https://badge.fury.io/js/react-measure.svg)](https://badge.fury.io/js/react-measure)
[![Dependency Status](https://david-dm.org/souporserious/react-measure.svg)](https://david-dm.org/souporserious/react-measure)

Compute measurements of React components. Uses [resize-observer-polyfill](https://github.com/que-etc/resize-observer-polyfill) to detect changes of an element and return the new dimensions.

## Install

`npm install react-measure --save`

```html
<script src="https://unpkg.com/react-measure/dist/react-measure.js"></script>
(UMD library exposed as `Measure`)
```

## Codepen Demo

[Live Demo](http://codepen.io/souporserious/pen/rLdwao/)

## Example Usage w/ state

```javascript
import Measure from 'react-measure';
import classNames from 'classnames';

class ItemToMeasure extends Component {
  state = {
    dimensions: {
      width: -1,
      height: -1
    }
  }

  render() {
    const { width, height } = this.state.dimensions
    const className = classNames(
      (width < 400) && 'small-width-modifier'
    )

    return (
      <Measure
        onMeasure={(dimensions) => {
          this.setState({dimensions})
        }}
      >
        <div className={className}>
          I can do cool things with my dimensions now :D

          { (height > 250) &&
            <div>Render responsive content based on the component size!</div>
          }
        </div>
      </Measure>
    )
  }
}
```

## Example Usage w/ child function

```javascript
import Measure from 'react-measure';

const ItemToMeasure = () => (
  <Measure>
    { dimensions =>
      <div>
        Some content here
        <pre>
          {JSON.stringify(dimensions, null, 2)}
        </pre>
      </div>
    }
  </Measure>
)
```

## Props

#### `whitelist`: PropTypes.array

Provide a list of properties that determine when `onMeasure` should fire. Accepts any of the following properties `['width', 'height', 'top', 'right', 'bottom', 'left']`

#### `blacklist`: PropTypes.array

Like above, but will not fire `onMeasure` for the specified properties.

#### `includeMargin`: PropTypes.bool

Whether or not to include margins in calculation. Defaults to `true`.

#### `useClone`: PropTypes.bool

Tries to give the most accurate measure by cloning the element and measuring it. Use if your item is hidden or you want to determine what a new dimension will be.

#### `cloneOptions`: PropTypes.Object

Passes clone options to [getNodeDimensions](https://github.com/souporserious/get-node-dimensions).

#### `shouldMeasure`: PropTypes.bool

Determines whether or not a measurement should occur. Useful if you only need to measure in certain cases.

#### `onMeasure`: PropTypes.func

Callback when the component dimensions have changed. Receives the new `dimensions` of your component.

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
