## React Measure 0.3.1

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
    const { width, height } = this.state.dimensions

    return(
      <Measure
        whitelist={['width', 'height']}
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

## CHANGELOG
### 0.3.1
Renamed `onChange` prop to `onMeasure`

Added `shouldMeasure` prop, similar to componentShouldUpdate. It determines whether or not the `onMeasure` callback will fire, useful for perf and not performing measurements if you don't need to.

Fixed updating of `config` prop to disconnect and reconnect a new MutationObserver with the new configuration

Fixed updaing of `whitelist` & `blacklist` props to use new values

### 0.3.0
Rebuilt from the ground up

No more cloning of elements!

Optimized to touch the DOM as least as possible

`clone`, `forceAutoHeight`, `collection` props removed

`config` prop added, accepts a [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver#MutationObserverInit) configuration

`accurate` prop added, use to get an accurate measurement, only height supported right now

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