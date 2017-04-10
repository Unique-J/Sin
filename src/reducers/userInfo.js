import { SHOW_EDITOR, USER_INFO_PANNEL_TYPE } from '../actions/userInfo';

const initState = {
  showEditorFlag: false,
  userInfoPannelType: 3,
  // showArticleModalFlag: false
};

function userInfo(state = initState, action) {
  switch (action.type) {
    case SHOW_EDITOR:
      return Object.assign({}, state, { showEditorFlag: !state.showEditorFlag });
    case USER_INFO_PANNEL_TYPE:
      return Object.assign({}, state, { userInfoPannelType: action.userInfoPannelType });
    default:
      return state;
  }
}

export default userInfo;
