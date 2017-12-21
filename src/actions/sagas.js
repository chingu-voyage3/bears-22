import { fetchStatus, getUserInfo } from './index'
import {
  call,
  put,
  all,
  take,
  fork,
  takeEvery,
  takeLatest
} from 'redux-saga/effects'

//start fetching data using Axios
export const FETCHING_DATA = 'FETCHING_DATA'
export function* fetchUserAPI() {
  try {
    //console.log("fetching user lists...");
    const response = yield call(fetch, '/users')
    const res = yield response.json()
    yield put({ type: 'RECEIVE_INFO', users: res.users })
  } catch (err) {
    console.log(err)
  }
}

export const USER_LOGIN_FACEBOOK = 'USER_LOGIN_FACEBOOK'
export function* facebookLoginClick() {
  yield* take('USER_LOGIN_FACEBOOK', googleAuth)
}

function* facebookAuth() {
  try {
    console.log('login')
    const response = yield call(fetch, '/auth/facebook')
    //yield put({ type: 'RECEIVE_INFO', users })
  } catch (err) {
    //yield put (fetchStatus(false))
    console.log(err)
  }
}

function* googleAuth() {
  try {
    console.log('login')
    const response = yield call(fetch, '/auth/google')
    //yield put({ type: 'RECEIVE_INFO', users })
  } catch (err) {
    //yield put (fetchStatus(false))
    console.log(err)
  }
}

export default function* rootSaga() {
  yield all([
    fork(fetchUserAPI),
    takeEvery('USER_LOGIN_FACEBOOK', facebookLoginClick)
  ])
}
