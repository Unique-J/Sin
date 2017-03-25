import { SHOW_EDITOR } from '../actions/articleDetail';

const initState = {
  showEditorFlag: false,
};

function articleDetail(state = initState, action) {
  switch (action.type) {
    case SHOW_EDITOR:
      return Object.assign({}, state, { showEditorFlag: !state.showEditorFlag });
    default:
      return state;
  }
}

export default articleDetail;
