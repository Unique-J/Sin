import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';

export const SHOW_EDITOR = 'SHOW_EDITOR';

export function showEditor() {
  return {
    type: SHOW_EDITOR
  };
}

export function getArticles() {
  return {
    [ASYNC]: {
      key: 'articles',
      promise: () => customFetch('/getArticles')
    }
  };
}
