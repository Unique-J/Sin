import { combineReducers } from 'redux';
import { reducerCreator } from 'redux-amrc';
import counter from './counter';
import main from './main';
import loginContainer from './loginContainer';

const rootReducers = combineReducers({
  counter,
  main,
  loginContainer,
  async: reducerCreator()
});

export default rootReducers;
