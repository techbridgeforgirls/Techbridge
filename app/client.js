import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import createRoutes from './routes/index';
import * as reducers from './reducers';

const initialState = window.INITIAL_STATE;
const reducer = combineReducers(reducers);
const store = createStore(reducer, initialState,
  window.devToolsExtension && window.devToolsExtension()
);

render(
  <Provider store={ store }>
    { createRoutes(browserHistory) }
  </Provider>,
  document.getElementById('tg-mainContainer')
);