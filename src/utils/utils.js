import 'isomorphic-fetch';
import config from '../config';

function handle401(res) {
  if (res.status === 401 && !__SERVER__) {
    window.location.reload();
  }
  return res;
}

function handleErrors(res) {
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export function customFetch(url, option) {
  const prefix = __SERVER__ ? 'http://' + config.apiHost + ':' + config.apiPort : '/api';

  let opt = option || {};
  if (__SERVER__) {
    opt = {
      ...opt,
      headers: {
        ...opt.headers,
        cookie: __COOKIE__
      }
    };
  } else {
    opt = {
      ...opt,
      credentials: 'same-origin'
    };
  }

  return fetch(prefix + url, opt)
    .then(handle401)
    .then(handleErrors);
}

export function formatTime(time) {
  // console.log(time);
  const fdate = time.substring(0, 10);
  const ftime = time.substring(11, 19);
  return `${fdate}  ${ftime}`;
}

export function getDate(time) {
  return time.substring(0, 10);
}

export function getDay(time) {
  return `${time.substring(5, 7)}月${time.substring(8, 10)}日`;
}

export function getTime(time) {
  return time.substring(11, 19);
}

export function transformTagsToArray(tagString) {
  return tagString.split(' ').map(tag => `${tag} `);
}

export function createMessageId(sid, rid) {
  const senderid = parseInt(sid, 10);
  const receiverid = parseInt(rid, 10);
  // console.log(typeof senderid);
  // console.log(receiverid);
  const mid = senderid < receiverid ? `${senderid}${receiverid}` : `${receiverid}${senderid}`;
  return mid;
}
