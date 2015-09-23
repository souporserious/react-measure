## React Measure 0.1.0

Compute measurements of React components.

## Install

`npm install react-measure --save`

`bower install react-measure --save`

## Example Usage using ES6 & Babel Stage 0

```javascript
import Measure from 'react-measure';

class ItemToMeasure extends Component {
  state = {
    measurements: {}
  }

  render() {
    const { width, height, top, right, bottom, left } = this.state.dimensions;

    return(
      <Measure
        whitelist={['width', 'height']}
        blacklist={['top', 'left']}
        onChange={m => this.setState({measurements: m})}
      >
        <div>
          I can do cool things with my measurements now :D
        </div>
      </Measure>
    )
  }
}
```

## Good to knows
To help avoid layout thrashing, use the prop `blacklist` to ignore specific values and stop firing a render to check the DOM for changes. Likewise you can use `whitelist` to choose only the ones you need to check.

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

## CHANGELOG
### 0.0.1
Rewritten to be more React friendly

Measure component no longer accepts a child function, instead get dimensions by setting state in onChange callback