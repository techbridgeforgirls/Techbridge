import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { useRouterHistory, RouterContext, match } from 'react-router';
import { createMemoryHistory, useQueries } from 'history';
import { Provider } from 'react-redux';
import * as reducers from '../app/reducers';
import createRoutes from '../app/routes/index';

// Combine all of our reducers
const reducer = combineReducers(reducers);

export default function(app) {
  // Setup the App handler
  let prepareAppHelper = function(store, req, renderProps) {
    // Setup the app data in Redux
    if (req && req.headers && req.cookies) {
      store.dispatch({
        type: 'SET_LANGUAGE',
        langHeader: req.headers['accept-language']
      });
    }

    let fullApp = ReactDOMServer.renderToString(
      <Provider store={store}>
        { <RouterContext {...renderProps}/> }
      </Provider>
    );
    return fullApp;
  };

  // Setup the wildcard route
  app.get('*', (req, res) => {
    let history = useRouterHistory(useQueries(createMemoryHistory))();
    let routes = createRoutes(history);
    let location = history.createLocation(req.url);
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        res.status(500).send(error.message);
      } else if (renderProps == null) {
        res.status(404).send('Not found');
      } else {
        // Setup the Redux store
        const store = createStore(reducer, { }, applyMiddleware(thunkMiddleware));
        let appComponent = prepareAppHelper(store, req, renderProps);
        let curState = store.getState();
        let lang = curState && curState.app && curState.app.language;

        res.render('main.hbs', { layout: 'page', initialState: JSON.stringify(store.getState()), content: appComponent, jsUrl: '/js/app.js', lang: lang });
      }
    });
  });
}
