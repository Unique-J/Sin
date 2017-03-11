import { customFetch } from '../utils/utils';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

export function writeResult(json) {
  return {
    type: 'WRITE_RESULT',
    async: json
  };
}

export function asyncPost() {
  return dispatch => {
    customFetch('/counter').then(json => dispatch(writeResult(json)));
  };
}

export function login() {
}
