import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';

export const SHOW_EDITOR = 'SHOW_EDITOR';

export function showEditor() {
  return {
    type: SHOW_EDITOR
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

export function getTeachers() {
  return {
    [ASYNC]: {
      key: 'teachers',
      promise: () => customFetch('/getTeachers')
    }
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

export function getComments(articleid) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      articleid
    })
  };

  return {
    [ASYNC]: {
      key: 'comment',
      promise: () => customFetch('/getComments', option)
    }
  };
}

export function saveComment(article, content, user, comment) {
  const option = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      article,
      content,
      user,
      comment
    })
  };
  // console.log('Action');
  // console.log(comment);

  return {
    [ASYNC]: {
      key: 'comment',
      promise: () => customFetch('/saveComment', option)
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
