import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';

export function searchTeachers(tid) {
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
  // console.log(tid);
  return {
    [ASYNC]: {
      key: 'searchTeachers',
      promise: () => customFetch('/searchTeachers', option)
    }
  };
}

export function searchStudents(sid) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sid
    })
  };
  return {
    [ASYNC]: {
      key: 'searchStudents',
      promise: () => customFetch('/searchStudents', option)
    }
  };
}
