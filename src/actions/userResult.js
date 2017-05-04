import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';

export function searchTeachers(condition, uid) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      condition,
      uid
    })
  };
  // console.log(tid);
  return {
    [ASYNC]: {
      key: 'searchTeachers',
      promise: () => customFetch('/searchTeachers', option)
    }
  };
}

export function searchStudents(condition, uid) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      condition,
      uid
    })
  };
  return {
    [ASYNC]: {
      key: 'searchStudents',
      promise: () => customFetch('/searchStudents', option)
    }
  };
}
