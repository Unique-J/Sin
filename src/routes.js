import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { Main, Home, Counter, Login } from './containers';
import { loadAuthIfNeeded } from './actions/auth';

import { FirstMainPage } from './components/index';

const preload = promise => (nextState, replace, cb) => {
  if (__SERVER__ || nextState.location.action === 'PUSH') {
    promise().then(() => cb());
  } else {
    cb();
  }
};

export default store => {
  const authPromise = () => store.dispatch(loadAuthIfNeeded());
  const requireLogin = (nextState, replace, cb) => {
    const user = store.getState().async.user;
    if (!user) {
      replace('/');
    }
    cb();
  };
  return (
    <Route path="/" component={Home} onEnter={preload(authPromise)}>
      <IndexRoute component={Main} />
      <Route path="login" component={Login} />
      <Route onEnter={requireLogin}>
        <Route path="counter" component={Counter} />
        <Route path="test" component={FirstMainPage} />
      </Route>
    </Route>
  );
};
