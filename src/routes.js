import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { Main, Home, Counter, Article, Register, LoginContainer,
  Dashboard, Headbar, FollowList, UserItem, Editor, ArticleModal,
  ArticleDetail, Comment, CommentList, ChildComment, ReplyList,
  ReplyCard, UserPage, SearchPage, UserInfo, ForgetPassword,
  ResetPassword } from './containers';
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
    // console.log(user);
    if (!user) {
      replace('/');
    }
    cb();
  };
  return (
    <Route path="/" component={Home} onEnter={preload(authPromise)}>
      <IndexRoute component={Main} />
      <Route path="login" component={LoginContainer} />
      <Route path="register" component={Register} />
      <Route path="forgetpassword" component={ForgetPassword} />
      <Route path="resetpassword" component={ResetPassword} />
      <Route onEnter={requireLogin}>
        <Route path="counter" component={Counter} />
        <Route path="test" component={FirstMainPage} />
        <Route path="article" component={Article} />
        <Route path="dashboard" component={Dashboard} />
        <Route path="headbar" component={Headbar} />
        <Route path="followlist" component={FollowList} />
        <Route path="useritem" component={UserItem} />
        <Route path="editor" component={Editor} />
        <Route path="articlemodal" component={ArticleModal} />
        <Route path="articledetail" component={ArticleDetail} />
        <Route path="comment" component={Comment} />
        <Route path="commentlist" component={CommentList} />
        <Route path="childcomment" component={ChildComment} />
        <Route path="replylist" component={ReplyList} />
        <Route path="replycard" component={ReplyCard} />
        <Route path="userpage" component={UserPage} />
        <Route path="searchpage" component={SearchPage} />
        <Route path="userinfo" component={UserInfo} />
      </Route>
    </Route>
  );
};
