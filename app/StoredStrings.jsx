import React from 'react';
import { connect } from 'react-redux';

import DecoratedString from './DecoratedString';

export default connect(({ strings }) => ({ strings }))(({ strings }) => (
  <div>
    {strings.map((decorated, raw) => (
      <div key={raw}>{raw}: <DecoratedString segments={decorated} /></div>
    )).toArray()}
  </div>
));
