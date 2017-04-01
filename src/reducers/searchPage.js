import { SHOW_EDITOR } from '../actions/searchPage';

const initState = {
  showEditorFlag: false,
};

function searchPage(state = initState, action) {
  switch (action.type) {
    case SHOW_EDITOR:
      return Object.assign({}, state, { showEditorFlag: !state.showEditorFlag });
    default:
      return state;
  }
}

export default searchPage;
