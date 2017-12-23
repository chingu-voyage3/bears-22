import { call, put, all, fork, takeEvery } from 'redux-saga/effects'

//start fetching data using fetch
export const USER_LIST_REQUEST = 'USER_LIST_REQUEST'
export const RECEIVE_INFO = 'RECEIVE_INFO'

export function* watchUserListReq() {
  yield* takeEvery(USER_LIST_REQUEST, fetchUserAPI)
}

export function* fetchUserAPI() {
  try {
    console.log('fetching user lists...')
    const response = yield call(fetch, '/users');
    const res = yield response.json();
    yield put({ type: RECEIVE_INFO, users: res.users });
  } catch (err) {
    console.log(err)
  }
}

//get login status of user
export const FETCH_LOGIN_STATUS = 'FETCH_LOGIN_STATUS'
export function* watchLogin() {
  yield* takeEvery(FETCH_LOGIN_STATUS, checkLoginStatus)
}

export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS'
export const GUEST = 'GUEST'
export function* checkLoginStatus() {
  try {
    console.log('fetching user login status...')
    const response = yield call(fetch, '/auth/user', { credentials: 'include' });
    if(response.status === 200) {
        //logined user
      const res = yield response.json();
      console.log(res);
      yield put({ 
        type: FETCH_LOGIN_SUCCESS, 
        isLogin: true, 
        userInfo: res 
      });
    } else if(response.status === 401) {
      // not authorized status (i.e. guest user)
      yield put({ 
        type: GUEST, 
        isLogin: false, 
        userInfo: [] 
      });
    } else {
      yield put({ type: 'FETCH_FAIL', errorMsg: response.statusText })
    }
  } catch (err) {
    console.log(err)
    yield put({ type: 'FETCH_FAIL', errorMsg: err })
  }
}
//end of login status check

//export all sagas
export default function* rootSaga() {
  yield all([
    watchUserListReq(),
    fork(checkLoginStatus),
    ])
}
