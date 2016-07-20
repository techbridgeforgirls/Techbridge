import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import createRoutes from './routes/index';
import * as reducers from './reducers';
import Intl from 'intl';
import areIntlLocalesSupported from 'intl-locales-supported';

const languages = ['en'];
const initialState = window.INITIAL_STATE;
const reducer = combineReducers(reducers);
const store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware));

if (!global.Intl) {
    global.Intl = Intl;
} else {
    if (!areIntlLocalesSupported(languages)) {
        var IntlPolyfill = require('intl');
        require('intl/locale-data/jsonp/en.js');
        Intl.NumberFormat = IntlPolyfill.NumberFormat;
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
    }
}

render(
  <Provider store={ store }>
    { createRoutes(browserHistory, store) }
  </Provider>,
  document.getElementById('tg-mainContainer')
);
