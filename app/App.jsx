import React from 'react';

import TopBar from './TopBar';
import StoredStrings from './StoredStrings';
import StringInput from './StringInput';

import style from './App.scss';

export default () => (
  <div>
    <TopBar />
    <div className={style.inner}>
      <StringInput />
      <StoredStrings />
    </div>
  </div>
);
