## React Measure 0.0.4

Compute measurements of React components.

## Example Usage

```javascript

import Measure from 'react-measure';

<Measure>
  {({width, height, top, left}) =>
    <div>
      {/* do cool stuff with my dimensions */}
    </div>
  }
</Measure>
```