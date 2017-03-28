import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';

export function getComment(commentid) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      commentid
    })
  };

  return {
    [ASYNC]: {
      key: 'comment',
      promise: () => customFetch('/getComment', option)
    }
  };
}
