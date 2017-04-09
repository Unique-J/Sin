import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';

export const SHOW_EDITOR = 'SHOW_EDITOR';

export function showEditor() {
  return {
    type: SHOW_EDITOR
  };
}

export function logout() {
  return {
    [ASYNC]: {
      key: 'login',
      promise: () => customFetch('/logout')
    }
  };
}

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

export function getArticle(id) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id
    })
  };
  return {
    [ASYNC]: {
      key: 'article',
      promise: () => customFetch('/getArticle', option)
    }
  };
}

export function saveChildComment(content, user, childComment, commentid) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content,
      user,
      childComment,
      commentid
    })
  };

  return {
    [ASYNC]: {
      key: 'comment',
      promise: () => customFetch('/saveChildComment', option)
    }
  };
}
