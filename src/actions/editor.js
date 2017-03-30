import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';

export function saveArticle(title, description, content, tags, date, tid, authorName) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description, content, tags, date, tid, authorName })
  };
  return {
    [ASYNC]: {
      key: 'saveArticle',
      promise: () => customFetch('/saveArticle', option)
    }
  };
}

export function getArticlesByTid(tid) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tid
    })
  };
  return {
    [ASYNC]: {
      key: 'articles',
      promise: () => customFetch('/getArticlesByTid', option)
    }
  };
}
