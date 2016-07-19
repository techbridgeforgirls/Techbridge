import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import createRoutes from './routes/index';
import * as reducers from './reducers';

const initialState = window.INITIAL_STATE;
const reducer = combineReducers(reducers);
const store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware));

render(
  <Provider store={ store }>
    { createRoutes(browserHistory, store) }
  </Provider>,
  document.getElementById('tg-mainContainer')
);
