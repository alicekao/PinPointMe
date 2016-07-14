import React from 'react';
import reactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import App from './components/app';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';

const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers);

reactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="signin" component={Signin}/>
        <Route path="signup" component={Signup}/>
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'));