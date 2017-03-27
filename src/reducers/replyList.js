import { SHOW_EDITOR } from '../actions/replyList';

const initState = {
  showEditorFlag: false,
  // showArticleModalFlag: false
};

function replyList(state = initState, action) {
  switch (action.type) {
    case SHOW_EDITOR:
      return Object.assign({}, state, { showEditorFlag: !state.showEditorFlag });
    // case SHOW_ARTICLE_MODAL:
    //   return Object.assign({}, state, { showArticleModalFlag: !state.showArticleModalFlag });
    default:
      return state;
  }
}

export default replyList;
