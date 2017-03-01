import React from 'react';
import { List } from 'immutable';

import SampleResponse from '../test-resources/SampleResponse';
import DecoratedString from './DecoratedString';

const sample = new List(SampleResponse());

const App = () => (
  <div>
    Hon graffiti frontend <br />
    here is a sample thing: <DecoratedString segments={sample} />
  </div>
);

export default App;
