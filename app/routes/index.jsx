/* eslint react/display-name: 0*/
import React from 'react';
import { Router, Redirect, Route, IndexRoute } from 'react-router';

// Layouts
import App from '../components/App/App';
import AppError from '../components/AppError/AppError';

// Pages
import { Home } from '../components/Home/Home';
import { Web } from '../components/Web/Web';
import { Video } from '../components/Video/Video';
import { Settings } from '../components/Settings/Settings';
import CareerPicker from '../components/CareerPicker/CareerPicker';
import { Career } from '../components/Career/Career';
import { Stars } from '../components/Stars/Stars';

export default function(history) {
  return (
    <Router history={history}>
      <Route path="/" component={ App }>
        <IndexRoute component={ Home } />
      </Route>
      <Route path="/careerpicker/:interests" component={ App }>
        <IndexRoute component={ CareerPicker } />
      </Route>
      <Route path="/web" component={ App }>
        <IndexRoute component={ Web } />
      </Route>
      <Route path="/video" component={ App }>
        <IndexRoute component={ Video } />
      </Route>
      <Route path="/settings" component={ App }>
        <IndexRoute component={ Settings } />
      </Route>
      <Route path="/career" component={ App }>
        <IndexRoute component={ Career } />
      </Route>
      <Redirect from="stars" to="/" />
      <Route path="/stars/:starId" component={ App }>
        <IndexRoute component={ Stars } />
      </Route>
      <Route path="*" component={ AppError }/>
    </Router>
  );
}
