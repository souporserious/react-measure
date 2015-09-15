import React, { Component, PropTypes } from 'react';
import { Spring } from 'react-motion';
import { Measure } from '../src/index';

import './main.scss';

class App extends Component {
  render() {
    return(
      <div>
        <Measure>
        {({height}) =>
          <Spring
            defaultValue={0}
            endValue={height}
          >
            {(rmHeight) =>
              <div
                style={{
                  height: rmHeight,
                  padding: 28,
                  backgroundColor: '#b4da55',
                  overflow: 'hidden'
                }}
              >
                <h3>height = {Math.ceil(rmHeight)}px</h3>
                <p>Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'?</p>
              </div>
            }
          </Spring>
        }
        </Measure>
      </div>
    );
  }
}

React.render(<App />, document.body);