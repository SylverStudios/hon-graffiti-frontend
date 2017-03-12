import React from 'react';

import TopBar from './TopBar';
import StoredStrings from './StoredStrings';
import CreateNewString from './CreateNewString';

import style from './App.scss';

export default () => (
  <div>
    <TopBar />
    <div className={style.inner}>
      <CreateNewString />
      <StoredStrings />
    </div>
  </div>
);
