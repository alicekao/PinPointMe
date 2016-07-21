import React from 'react';
import reactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import store from './store';

import App from './components/app';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import MainContainer from './components/mainContainer';

reactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={MainContainer} />
        <Route path="signin" component={Signin}/>
        <Route path="signup" component={Signup}/>
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'));