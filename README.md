## React Measure 0.0.8

Compute measurements of React components.

## Good to knows
To help avoid layout thrashing, use the prop `blacklist` to ignore specific values and firing an update to check the DOM for changes.

## Example Usage

```javascript

import Measure from 'react-measure';

<Measure blacklist={['top', 'left']} onChange={this._handleOnChange}>
  {({width, height, top, right, bottom, left}) =>
    <div>
      {/* do cool stuff with my dimensions */}
    </div>
  }
</Measure>
```