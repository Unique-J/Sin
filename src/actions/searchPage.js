import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';

export const SHOW_EDITOR = 'SHOW_EDITOR';

export function showEditor() {
  return {
    type: SHOW_EDITOR
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
