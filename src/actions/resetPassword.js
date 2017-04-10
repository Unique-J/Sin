import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';
import md5 from 'md5';

export function resetPassword(uid, email, resetPwdCode, pwd) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uid,
      email,
      resetPwdCode,
      pwd: md5(pwd)
    })
  };
  // console.log(uid + ' ' + pwd + ' ' + resetPwdCode + ' ' + email);
  return {
    [ASYNC]: {
      key: 'resetPassword',
      promise: () => customFetch('/resetPassword', option)
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
