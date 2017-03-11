import { combineReducers } from 'redux';
import { reducerCreator } from 'redux-amrc';
import counter from './counter';
import main from './main';

const rootReducers = combineReducers({
  counter,
  main,
  async: reducerCreator()
});

export default rootReducers;
