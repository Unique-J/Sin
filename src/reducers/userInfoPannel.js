import { SHOW_ARTICLE_MODAL } from '../actions/userInfoPannel';

const initState = {
  showArticleModalFlag: false
};

function userInfoPannel(state = initState, action) {
  switch (action.type) {
    case SHOW_ARTICLE_MODAL:
      return Object.assign({}, state, { showArticleModalFlag: !state.showArticleModalFlag });
    default:
      return state;
  }
}

export default userInfoPannel;
