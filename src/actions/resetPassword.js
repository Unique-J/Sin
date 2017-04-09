import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';
import md5 from 'md5';

export function updatePassword(uid, pwd) {
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
  console.log(uid + ' ' + pwd);
  return {
    [ASYNC]: {
      key: 'password',
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
