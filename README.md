## React Measure 0.2.0

Compute measurements of React components.

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
    const { width, height, top, right, bottom, left } = this.state.dimensions;

    return(
      <Measure
        clone={true}
        forceAutoHeight={true}
        whitelist={['width', 'height']}
        blacklist={['top', 'left']}
        onChange={d => this.setState({dimensions: d})}
      >
        <div>
          I can do cool things with my dimensions now :D
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
### 0.2.0
Upgraded to React 0.14.0

### 0.1.3
Added `forceAutoHeight` prop to help with proper height calculation when children heights are animating

### 0.1.2
Clone prop now exposed to allow optional cloning of component

Defaults to false which could potentially break components relying on cloned calculations

### 0.1.1
Set width/height to auto on clone no matter what to get a true dimension

Append clone directly after original instead of the end of its parent

Portal now gets destroyed after measurements have been calculated

### 0.1.0
Rewritten to be more React friendly

Measure component no longer accepts a child function, instead get dimensions by setting state in onChange callback