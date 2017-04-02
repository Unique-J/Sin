import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';

export const SHOW_ARTICLE_MODAL = 'SHOW_ARTICLE_MODAL';

export function showArticleModal() {
  return {
    type: SHOW_ARTICLE_MODAL
  };
}

export function getCollections(sid) {
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
      key: 'collections',
      promise: () => customFetch('/getCollections', option)
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
      key: 'followers',
      promise: () => customFetch('/getFollowers', option)
    }
  };
}
