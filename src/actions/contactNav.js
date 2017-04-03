import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils//utils';

export function searchUsers(sid, condition) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sid,
      condition
    })
  };
  // console.log(condition);
  return {
    [ASYNC]: {
      key: 'searchUsers',
      promise: () => customFetch('/searchUsers', option)
    }
  };
}

export function getUserFollowers(sid, type) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sid,
      type
    })
  };
  // console.log(condition);
  return {
    [ASYNC]: {
      key: 'followers',
      promise: () => customFetch('/getUserFollowers', option)
    }
  };
}

export function getFollowers(sid) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sid
    })
  };
  return {
    [ASYNC]: {
      key: 'searchUsers',
      promise: () => customFetch('/getFollowers', option)
    }
  };
}
