import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';

export const SHOW_ARTICLE_MODAL = 'SHOW_ARTICLE_MODAL';

export function showArticleModal() {
  return {
    type: SHOW_ARTICLE_MODAL
  };
}

export function searchArticles(searchCondition) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      searchCondition
    })
  };
  // console.log(searchCondition);
  return {
    [ASYNC]: {
      key: 'searchArticles',
      promise: () => customFetch('/searchArticles', option)
    }
  };
}
