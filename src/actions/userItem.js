import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';

export function followTeacher(tid, sid) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tid,
      sid
    })
  };
  return {
    [ASYNC]: {
      key: 'student',
      promise: () => customFetch('/followTeacher', option)
    }
  };
}

export function cancelFollowTeacher(tid, sid) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tid,
      sid
    })
  };
  return {
    [ASYNC]: {
      key: 'student',
      promise: () => customFetch('/cancelFollowTeacher', option)
    }
  };
}
