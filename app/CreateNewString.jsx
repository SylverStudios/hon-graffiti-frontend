import React from 'react';

import StringInput from './StringInput';
import NewStringPreview from './NewStringPreview';

import style from './CreateNewString.scss';

export default () => (
  <div className={style.component}>
    <StringInput />
    <NewStringPreview />
  </div>
);
