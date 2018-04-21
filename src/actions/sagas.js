import { call, put, all, fork, takeEvery, takeLatest } from 'redux-saga/effects'
import { Actions } from './index'
import { getUserInfo, isFetching } from './index'

//start fetching data using fetch
export function* watchAnyAction() {
  yield takeEvery('*', function* logger(action) {
    console.log(action)
  })
}

export function* watchUserListReq() {
  yield takeLatest(Actions.USER_LIST_REQUEST, fetchUserAPI)
}

export function* fetchUserAPI() {
  try {
    console.log('fetching user lists...')
    yield put(isFetching(true))
    const response = yield call(fetch, '/users')
    if (response.status === 200) {
      const res = yield response.json()
      yield all([put(getUserInfo(res)), put(isFetching(false))])
    }
  } catch (err) {
    console.log(err)
  }
}

//get login status of user
export function* watchLogin() {
  yield* takeEvery(Actions.FETCH_LOGIN_STATUS, checkLoginStatus)
}

export function* checkLoginStatus() {
  try {
    console.log('fetching user login status...')
    const response = yield call(fetch, '/auth/user', { credentials: 'include' })
    if (response.status === 200) {
      //logined user
      const res = yield response.json()
      console.log(res)
      yield put({
        type: Actions.FETCH_LOGIN_SUCCESS,
        isLogin: true,
        userInfo: res
      })
    } else if (response.status === 401) {
      // not authorized status (i.e. guest user)
      yield put({
        type: Actions.GUEST,
        isLogin: false,
        userInfo: []
      })
    } else {
      yield put({ type: Actions.FETCH_FAILED, errorMsg: response.statusText })
    }
  } catch (err) {
    console.log(err)
    yield put({ type: Actions.FETCH_FAILED, errorMsg: err })
  }
}
//end of login status check

//export all sagas
export default function* rootSaga() {
  yield all([fork(watchAnyAction), fork(checkLoginStatus), watchUserListReq()])
}
