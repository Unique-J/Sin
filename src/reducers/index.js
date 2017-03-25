import { combineReducers } from 'redux';
import { reducerCreator } from 'redux-amrc';
import counter from './counter';
import main from './main';
import loginContainer from './loginContainer';
import dashboard from './dashboard';
import articleDetail from './articleDetail';

const rootReducers = combineReducers({
  counter,
  main,
  loginContainer,
  dashboard,
  articleDetail,
  async: reducerCreator()
});

export default rootReducers;
