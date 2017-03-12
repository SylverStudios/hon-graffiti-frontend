import React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';

import DecoratedString from './DecoratedString';
import parseRaw from './parseRaw';

import style from './NewStringPreview.scss';

export default connect(({ newString }) => (
  { newString }
))(({ newString }) => (
  <div className={style.component}>
    <DecoratedString segments={new List(parseRaw(newString))} />
  </div>
));
