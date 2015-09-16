## React Measure 0.0.3

Compute measurements of React components.

## Example Usage

```javascript

import Measure from 'react-measure';

<Measure>
  {({width, height, top, right, bottom, left}) =>
    <div>
      {/* do cool stuff with my dimensions */}
    </div>
  }
</Measure>
```