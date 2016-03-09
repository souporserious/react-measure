## React Measure

Compute measurements of React components. Uses a [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver#MutationObserverInit) to detect changes of an element and return the new measurements after that mutation.

## Install

`npm install react-measure --save`

`bower install react-measure --save`

## Example Usage

```javascript
import Measure from 'react-measure';

class ItemToMeasure extends Component {
  state = {
    dimensions: {}
  }

  render() {
    const { height } = this.state.dimensions

    return(
      <Measure
        whitelist={['height']}
        shouldMeasure={(mutations) => {
          // don't update unless we have mutations available
          if(mutations) {
            return mutations[0].target
          } else {
            return false
          }
        }}
        // notice how target gets passed into onMeasure now
        onMeasure={(dimensions, mutations, target) => {
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

## Props

#### `config`: PropTypes.object

Accepts a [MutationObserver configuration](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver#MutationObserverInit).

#### `accurate`: PropTypes.bool

Tries to give the most accurate measure. Currently only works with height. Measures the content rather than the actual box of the element.

#### `whitelist`: PropTypes.array

Provide a list of properties to fire a callback for. Accepts any of the following properties `['width', 'height', 'top', 'right', 'bottom', 'left']`

#### `blacklist`: PropTypes.array

Like above, but will not fire a callback for the specified properties.

#### `shouldMeasure`: PropTypes.func

Determines whether or not a measurement should occur. Return `true`, `false` or a value you want returned in `onMeasure`.

#### `onMeasure`: PropTypes.func

Callback when the component has been mutated. Receives `dimensions`, `mutations`, and anything passed to `shouldMeasure`.

## Good to knows
To help avoid layout thrashing, use the prop `blacklist` to ignore specific values and stop firing a render to check the DOM for changes. Likewise you can use `whitelist` to choose only the ones you need to check.

**Margins from hell.** If your element is not calculating width or height properly it could be due to a margin hanging outside of its container. To get a true measurement, make sure to not have any hanging margins, in some cases a padding of 1px added to the container will fix this. See the stack overflow answers [here](http://stackoverflow.com/questions/19718634/how-to-disable-margin-collapsing) for more tricks .

## Browser Support
All modern browsers supported. IE 9 & 10 support with a MutationObserver polyfill. I recommend this [one](https://github.com/megawac/MutationObserver.js)

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
