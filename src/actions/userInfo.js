import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';

export const SHOW_EDITOR = 'SHOW_EDITOR';
export const USER_INFO_PANNEL_TYPE = 'USER_INFO_PANNEL_TYPE';

export function showEditor() {
  return {
    type: SHOW_EDITOR
  };
}

export function changePannelType(type) {
  return {
    type: USER_INFO_PANNEL_TYPE,
    userInfoPannelType: type
  };
}

export function getPerson(uid) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uid
    })
  };
  return {
    [ASYNC]: {
      key: 'person',
      promise: () => customFetch('/getPerson', option)
    }
  };
}

export function logout() {
  return {
    [ASYNC]: {
      key: 'login',
      promise: () => customFetch('/logout')
    }
  };
}
