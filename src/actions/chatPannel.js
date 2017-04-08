import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';

export function getMessages(mid, number) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mid,
      number
    })
  };
  return {
    [ASYNC]: {
      key: 'messages',
      promise: () => customFetch('/getMessages', option)
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
