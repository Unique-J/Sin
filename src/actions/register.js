import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';
import md5 from 'md5';

export function judgeUserRegistered(id) {
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
      key: 'register',
      promise: () => customFetch('/judgeUserRegistered', option)
    }
  };
}

export function registerUser(id, email, pwd, gender) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      email,
      pwd: md5(pwd),
      gender
    })
  };
  return {
    [ASYNC]: {
      key: 'register',
      promise: () => customFetch('/registerUser', option)
    }
  };
}
