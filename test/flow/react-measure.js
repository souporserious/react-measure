// @flow

import * as React from 'react';
import Measure, { withContentRect, type ContentRect } from '../../src/react-measure.js';

const a = (
  <Measure>
    {({ measureRef }) => (
      <div ref={measureRef} />
    )}
  </Measure>
);

const b = (
  <Measure>
    {({ measureRef, contentRect }) => (
      <div ref={measureRef}>
        <div style={{ width: contentRect.bounds.width }}></div>
      </div>
    )}
  </Measure>
);

const c = (
  <Measure>
    {({ measureRef, contentRect }) => (
      <div ref={measureRef}>
        {/* $ExpectError */}
        <div style={{ width: contentRect.invalid }}></div>
      </div>
    )}
  </Measure>
);

withContentRect(['client', 'offset', 'scroll', 'bounds', 'margin']);

// $ExpectError
withContentRect(['invalid']);

const Measure2 = withContentRect();

const d = (
  <Measure2>
    {() => <div />}
  </Measure2>
);

// $ExpectError
const e = <Measure2 />;
