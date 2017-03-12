import React from 'react';
import { connect } from 'react-redux';

import DecoratedString from './DecoratedString';

import style from './StoredStrings.scss';

export default connect(({ strings }) => ({ strings }))(({ strings }) => (
  <div className={style.component}>
    {strings.map((decorated, raw) => (
      <div key={raw} className={style.stringContainer}>
        <div className={style.raw}>{raw}</div>
        <div className={style.rendered}>
          <DecoratedString segments={decorated} />
        </div>
      </div>
    )).toArray()}
  </div>
));
