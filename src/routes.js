import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { Main, Home, Counter, Article, Register, LoginContainer,
  Dashboard, Headbar, FollowList, UserItem, Editor } from './containers';
import { loadAuthIfNeeded } from './actions/login';

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
    const user = store.getState().async.login;
    console.log(user);
    if (!user) {
      replace('/');
    }
    cb();
  };
  return (
    <Route path="/" component={Home} onEnter={preload(authPromise)}>
      <IndexRoute component={Main} />
      <Route path="login" component={LoginContainer} />
      <Route onEnter={requireLogin}>
        <Route path="counter" component={Counter} />
        <Route path="test" component={FirstMainPage} />
      </Route>
      <Route path="register" component={Register} />
      <Route path="article" component={Article} />
      <Route path="dashboard" component={Dashboard} />
      <Route path="headbar" component={Headbar} />
      <Route path="followlist" component={FollowList} />
      <Route path="useritem" component={UserItem} />
      <Route path="editor" component={Editor} />
    </Route>
  );
};
