import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';
import md5 from 'md5';

export function updateInfo(uid, title, content) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uid,
      title,
      content
    })
  };
  // console.log(userid);
  return {
    [ASYNC]: {
      key: 'info',
      promise: () => customFetch('/updateInfo', option)
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

export function validatePwd(uid, pwd) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uid,
      pwd: md5(pwd)
    })
  };
  return {
    [ASYNC]: {
      key: 'validatePwd',
      promise: () => customFetch('/validatePwd', option)
    }
  };
}

export function updatePwd(uid, pwd) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uid,
      pwd: md5(pwd)
    })
  };
  return {
    [ASYNC]: {
      key: 'updatePwd',
      promise: () => customFetch('/updatePassword', option)
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
