import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';
import md5 from 'md5';

export function verifyUser(id) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id
    })
  };
  return {
    [ASYNC]: {
      key: 'verifyUser',
      promise: () => customFetch('/judgeUserRegistered', option)
    }
  };
}

export function shouldLoadAuth(state) {
  if (!state.async.loadState.login) return true;
  const loaded = state.async.loadState.login.loaded;
  return !loaded;
}

export function loadAuth() {
  return {
    [ASYNC]: {
      key: 'login',
      promise: () => customFetch('/loadAuth')
    }
  };
}

export function loadAuthIfNeeded() {
  return (dispatch, getState) => {
    if (shouldLoadAuth(getState())) {
      return dispatch(loadAuth());
    }
    return Promise.resolve();
  };
}

export function login(userid, pwd) {
  const url = '/login';
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userid,
      pwd: md5(pwd)
    })
  };
  return {
    [ASYNC]: {
      key: 'login',
      promise: () => customFetch(url, option)
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
