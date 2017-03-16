import { ADD_ACTIVE_INDEX, SUBTRACT_ACTIVE_INDEX, CHANGE_SCROLL_STATE } from '../actions/loginContainer';

const initState = {
  activeIndex: 0,
  scrollState: true
};

function loginContainer(state = initState, action) {
  switch (action.type) {
    case ADD_ACTIVE_INDEX:
      return {
        ...state,
        activeIndex: state.activeIndex + 1
      };
    case SUBTRACT_ACTIVE_INDEX:
      return {
        ...state,
        activeIndex: state.activeIndex - 1
      };
    case CHANGE_SCROLL_STATE:
      return {
        ...state,
        scrollState: !state.scrollState
      };
    default:
      return state;
  }
}

export default loginContainer;
