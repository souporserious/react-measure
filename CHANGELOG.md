## CHANGELOG
### 0.3.5

Fixed bug in IE with accurate height calculation when checking for children nodes.

Fixed [deprecation notice](https://www.chromestatus.com/features/5724912467574784) when calculating SVG dimensions.

Removed `react-addons-shallow-compare` dependency.

Moved `react` and `react-dom` packages into peer dependencies.

### 0.3.4

Fix server-side rendering

### 0.3.3

Added public method `getDimensions`

Clone nodes without any children

Fixed calculating measurements on resize

### 0.3.2

Patch to fix `shallowCompare` so bower works.

Added a resize handler to measure component changes on window resize.

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
