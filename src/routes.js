import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { Main, Home, Counter, Login } from './containers';
import { loadAuthIfNeeded } from './actions/auth';

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
    <Route path="/" component={Main} onEnter={preload(authPromise)}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route onEnter={requireLogin}>
        <Route path="counter" component={Counter} />
      </Route>
    </Route>
  );
};
