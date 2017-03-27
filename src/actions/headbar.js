import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';

export function getCommentbox(userid) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userid
    })
  };
  console.log(userid);
  return {
    [ASYNC]: {
      key: 'commentbox',
      promise: () => customFetch('/getCommentbox', option)
    }
  };
}
