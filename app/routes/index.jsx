/* eslint react/display-name: 0*/
import React from 'react';
import { Router, Redirect, Route, IndexRoute } from 'react-router';

// Layouts
import App from '../components/App/App';
import AppError from '../components/AppError/AppError';

// Pages
import  Home  from '../components/Home/Home';
import { Web } from '../components/Web/Web';
import { Video } from '../components/Video/Video';
import { Settings } from '../components/Settings/Settings';
import CareerPicker from '../components/CareerPicker/CareerPicker';
import Career from '../components/Career/Career';
import Stars from '../components/Stars/Stars';

// Actions
import { initState,  getInterestsId } from '../actions/apiActions';


export default function(history, store) {

  function onEnterRoute(nextState) {
    // We make sure the state in the store matches the query parameters
    store.dispatch(initState(nextState.location.query));
  }

  function onEnterCareerPicker(nextState, replace) {
    // Make sure the query data is consistent with the state
    var interests = store.getState().interests;
    var interestList =  getInterestsId(interests && interests.selected);
    if (interestList && !nextState.location.query.interests) {
      var newQuery = Object.assign({ }, nextState.location.query, { interests: interestList });
      replace({
        pathname: nextState.location.pathname,
        query: newQuery
      });
    }

    onEnterRoute(nextState, replace);
  }

  return (
    <Router history={history}>
      <Route path="/" component={ App } onEnter={ onEnterRoute }>
        <IndexRoute component={ Home } />
      </Route>
      <Route path="/careerpicker" component={ App } onEnter={ onEnterCareerPicker }>
        <IndexRoute component={ CareerPicker } />
      </Route>
      <Route path="/web" component={ App } onEnter={ onEnterRoute }>
        <IndexRoute component={ Web } />
      </Route>
      <Route path="/video" component={ App } onEnter={ onEnterRoute }>
        <IndexRoute component={ Video } />
      </Route>
      <Route path="/settings" component={ App } onEnter={ onEnterRoute }>
        <IndexRoute component={ Settings } />
      </Route>
      <Route path="/career" component={ App } onEnter={ onEnterRoute }>
        <IndexRoute component={ Career } />
      </Route>
      <Redirect from="stars" to="/" />
      <Route path="/stars/:starId" component={ App } onEnter={ onEnterRoute }>
        <IndexRoute component={ Stars } />
      </Route>
      <Route path="*" component={ AppError }/>
    </Router>
  );
}
