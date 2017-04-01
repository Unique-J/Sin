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
  // console.log(userid);
  return {
    [ASYNC]: {
      key: 'commentbox',
      promise: () => customFetch('/getCommentbox', option)
    }
  };
}

// export function searchTeachers(tid) {
//   const option = {
//     method: 'post',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       tid
//     })
//   };
//   console.log(tid);
//   return {
//     [ASYNC]: {
//       key: 'teachers',
//       promise: () => customFetch('/searchTeachers', option)
//     }
//   };
// }

// export function searchStudents(sid) {
//   const option = {
//     method: 'post',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       sid
//     })
//   };
//   return {
//     [ASYNC]: {
//       key: 'students',
//       promise: () => customFetch('/searchStudents', option)
//     }
//   };
// }
