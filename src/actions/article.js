import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';

export function getArticle(id) {
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
      key: 'article',
      promise: () => customFetch('/getArticle', option)
    }
  };
}

export function collectArticle(id, sid) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      sid
    })
  };
  return {
    [ASYNC]: {
      key: 'student',
      promise: () => customFetch('/collectArticle', option)
    }
  };
}

export function cancelCollectArticle(id, sid) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      sid
    })
  };
  return {
    [ASYNC]: {
      key: 'student',
      promise: () => customFetch('/cancelCollectArticle', option)
    }
  };
}
