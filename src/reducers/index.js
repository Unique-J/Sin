import { combineReducers } from 'redux';
import { reducerCreator } from 'redux-amrc';
import counter from './counter';
import main from './main';
import loginContainer from './loginContainer';
import dashboard from './dashboard';
import articleDetail from './articleDetail';
import replyList from './replyList';
import userpage from './userpage';

const rootReducers = combineReducers({
  counter,
  main,
  loginContainer,
  dashboard,
  articleDetail,
  replyList,
  userpage,
  async: reducerCreator()
});

export default rootReducers;
