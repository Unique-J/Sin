import { INCREMENT_COUNTER } from '../actions/counter';

const initState = {
  counter: 0,
  async: {}
};

function counter(state = initState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return Object.assign({}, state, { counter: state.counter + 1 });
    case 'WRITE_RESULT':
      return Object.assign({}, state, { async: action.async });
    default:
      return state;
  }
}

export default counter;
