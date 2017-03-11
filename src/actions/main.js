import { ASYNC } from 'redux-amrc';
import { customFetch } from '../utils/utils';

export const ADD_ACTIVE_INDEX = 'ADD_ACTIVE_INDEX';
export const SUBTRACT_ACTIVE_INDEX = 'SUBTRACT_ACTIVE_INDEX';
export const CHANGE_SCROLL_STATE = 'CHANGE_SCROLL_STATE';

export function add() {
  return {
    type: ADD_ACTIVE_INDEX
  };
}

export function subtract() {
  return {
    type: SUBTRACT_ACTIVE_INDEX
  };
}

export function addActiveIndex() {
  return (dispatch, getState) => {
    const { activeIndex } = getState().main;
    if (activeIndex === 1) return;
    dispatch(add());
  };
}

export function subtractActiveIndex() {
  return (dispatch, getState) => {
    const { activeIndex } = getState().main;
    if (activeIndex === 0) return;
    dispatch(subtract());
  };
}

export function changeScrollState() {
  return {
    type: CHANGE_SCROLL_STATE
  };
}

// export function shouldLoadAuth(state) {
//   if (!state.async.loadState.user) return true;
//   const loaded = state.async.loadState.user.loaded;
//   return !loaded;
// }

// export function loadAuth() {
//   return {
//     [ASYNC]: {
//       key: 'user',
//       promise: () => customFetch('/loadAuth')
//     }
//   };
// }

// export function loadAuthIfNeeded() {
//   return (dispatch, getState) => {
//     if (shouldLoadAuth(getState())) {
//       return dispatch(loadAuth());
//     }
//     return Promise.resolve();
//   };
// }

// export function login(name) {
//   const url = '/login';
//   const option = {
//     method: 'post',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       name
//     })
//   };
//   return {
//     [ASYNC]: {
//       key: 'user',
//       promise: () => customFetch(url, option)
//     }
//   };
// }

// export function logout() {
//   return {
//     [ASYNC]: {
//       key: 'user',
//       promise: () => customFetch('/logout')
//     }
//   };
// }
