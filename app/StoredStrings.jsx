import React from 'react';
import { connect } from 'react-redux';

import DecoratedString from './DecoratedString';

import style from './StoredStrings.scss';

export default connect(({ strings }) => ({ strings }))(({ strings }) => (
  <div className={style.component}>
    {strings.map((decorated, raw) => (
      <div key={raw}>{raw}: <DecoratedString segments={decorated} /></div>
    )).toArray()}
  </div>
));
