// actions for redux

// get fetching status action
export const Actions = {
  FETCH_STATUS: 'FETCH_STATUS',
  IS_FETCHING: 'IS_FETCHING',
  FETCH_LOGIN_STATUS: 'FETCH_LOGIN_STATUS',
  RECEIVE_INFO: 'RECEIVE_INFO',
  USER_LIST_REQUEST: 'USER_LIST_REQUEST',
  FETCH_LOGIN_SUCCESS: 'FETCH_LOGIN_SUCCESS',
  GUEST: 'GUEST',
  FETCH_FAILED: 'FETCH_FAILED'
  // SEARCH_START: 'SEARCH_START',
  // SEARCH_FAILED: 'SEARCH_FAILED'
}

// //search related
// export function watchSearch(search) {
//   return {
//     type: Actions.SEARCH_START,
//     search
//   }
// }

// export function watchSearchFailed(err) {
//   return {
//     type: Actions.SEARCH_FAILED,
//     errorMsg: err
//   }
// }

//fetch related
export function fetchStatus() {
  return { type: Actions.FETCH_STATUS, isFetching }
}

// receive user list info
export function getUserInfo(json) {
  return {
    type: Actions.RECEIVE_INFO,
    users: json.users
  }
}

export function userListReq() {
  return {
    type: Actions.USER_LIST_REQUEST
  }
}

export function isFetching(status) {
  return {
    type: Actions.IS_FETCHING,
    isFetching: status
  }
}

export function fetchFailed(err) {
  return {
    type: Actions.FETCH_FAILED,
    isFetching: false,
    errorMsg: err
  }
}

// get login status
export function verifyLogin() {
  return {
    type: Actions.FETCH_LOGIN_STATUS
  }
}
