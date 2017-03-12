import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import StateReducer from './StateReducer';

import App from './App';
import styles from './main.scss';

// create container element on DOM
const container = document.createElement('div'); // eslint-disable-line no-undef
container.setAttribute('class', styles.appContainer);
document.body.append(container); // eslint-disable-line no-undef

const store = createStore(StateReducer);
const appContainer = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(appContainer, container);
