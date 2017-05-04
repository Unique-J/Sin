import { SHOW_EDITOR, SHOW_ARTICLE_MODAL } from '../actions/explorePage';

const initState = {
  showEditorFlag: false,
  showArticleModalFlag: false
};

function explorePage(state = initState, action) {
  switch (action.type) {
    case SHOW_EDITOR:
      return Object.assign({}, state, { showEditorFlag: !state.showEditorFlag });
    case SHOW_ARTICLE_MODAL:
      return Object.assign({}, state, { showArticleModalFlag: !state.showArticleModalFlag });
    default:
      return state;
  }
}

export default explorePage;
