import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';

export function saveArticle(title, description, content, tags, date) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description, content, tags, date })
  };
  return {
    [ASYNC]: {
      key: 'saveArticle',
      promise: () => customFetch('/saveArticle', option)
    }
  };
}
