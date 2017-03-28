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
  // console.log(prefix + url);
  return fetch(prefix + url, opt)
    .then(handle401)
    .then(handleErrors);
}

export function formatTime(time) {
  const fdate = time.substring(0, 10);
  const ftime = time.substring(11, 19);
  return `${fdate}  ${ftime}`;
}

export function getDate(time) {
  return time.substring(0, 10);
}

export function getTime(time) {
  return time.substring(11, 19);
}
