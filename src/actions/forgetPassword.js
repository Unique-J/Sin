import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';

export function getUser(uid, email) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uid,
      email
    })
  };
  // console.log(userid);
  return {
    [ASYNC]: {
      key: 'user',
      promise: () => customFetch('/getUser', option)
    }
  };
}

export function resetPassword(uid, email) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uid,
      email
    })
  };
  // console.log(userid);
  return {
    [ASYNC]: {
      key: 'resetPwd',
      promise: () => customFetch('/resetPassword', option)
    }
  };
}
