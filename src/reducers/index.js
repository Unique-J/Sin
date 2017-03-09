import { combineReducers } from 'redux';
import { reducerCreator } from 'redux-amrc';
import counter from './counter';

const rootReducers = combineReducers({
  counter,
  async: reducerCreator()
});

export default rootReducers;
