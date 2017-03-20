import { SHOW_EDITOR } from '../actions/dashboard';

const initState = {
  showEditorFlag: false
};

function dashboard(state = initState, action) {
  switch (action.type) {
    case SHOW_EDITOR:
      return Object.assign({}, state, { showEditorFlag: !state.showEditorFlag });
    default:
      return state;
  }
}

export default dashboard;
