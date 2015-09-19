## React Measure 0.0.7

Compute measurements of React components.

## Example Usage

```javascript

import Measure from 'react-measure';

<Measure onChange={this._handleOnChange}>
  {({width, height, top, left}) =>
    <div>
      {/* do cool stuff with my dimensions */}
    </div>
  }
</Measure>
```