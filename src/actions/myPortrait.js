import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';

export function uploadPortrait(uid, portrait) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uid,
      portrait
    })
  };
  // console.log(portrait);
  return {
    [ASYNC]: {
      key: 'upload',
      promise: () => customFetch('/uploadPortrait', option)
    }
  };
}
