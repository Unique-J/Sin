import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';

export const SHOW_EDITOR = 'SHOW_EDITOR';
export const SHOW_ARTICLE_MODAL = 'SHOW_ARTICLE_MODAL';

export function showEditor() {
  return {
    type: SHOW_EDITOR
  };
}

export function showArticleModal() {
  return {
    type: SHOW_ARTICLE_MODAL
  };
}

export function getArticles() {
  return {
    [ASYNC]: {
      key: 'articles',
      promise: () => customFetch('/getArticles')
    }
  };
}

export function getArticlesByTid(tid) {
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
  return {
    [ASYNC]: {
      key: 'articles',
      promise: () => customFetch('/getArticlesByTid', option)
    }
  };
}

export function getArticlesBySid(sid) {
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
      key: 'articles',
      promise: () => customFetch('/getArticlesBySid', option)
    }
  };
}

export function getTeachers() {
  return {
    [ASYNC]: {
      key: 'teachers',
      promise: () => customFetch('/getTeachers')
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
  return {
    [ASYNC]: {
      key: 'student',
      promise: () => customFetch('/getStudent', option)
    }
  };
}

// export function getUser(uid) {
//   const option = {
//     method: 'post',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       uid
//     })
//   };
//   return {
//     [ASYNC]: {
//       key: 'user',
//       promise: () => customFetch('/getUser', option)
//     }
//   };
// }

export function logout() {
  return {
    [ASYNC]: {
      key: 'login',
      promise: () => customFetch('/logout')
    }
  };
}
