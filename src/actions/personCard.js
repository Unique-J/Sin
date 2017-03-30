import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';

export function getPerson(uid) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uid
    })
  };
  return {
    [ASYNC]: {
      key: 'person',
      promise: () => customFetch('/getPerson', option)
    }
  };
}

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

export function getStudent(sid) {
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
  // console.log('sid: ' + sid);
  return {
    [ASYNC]: {
      key: 'student',
      promise: () => customFetch('/getStudent', option)
    }
  };
}
