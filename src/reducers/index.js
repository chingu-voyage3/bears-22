// reducers for redux

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { FETCH_STATUS, RECEIVE_INFO } from '../actions'

import {
  FETCH_LOGIN_SUCCESS,
  GUEST,
  IS_FETCHING,
  FETCH_FAIL
} from '../actions/sagas'

// set fetching status
function fetchData(state = initialState, action) {
  switch (action.type) {
    case FETCH_STATUS:
    case IS_FETCHING:
      return Object.assign({}, state, { isFetching: action.isFetching })
    case FETCH_FAIL:
      return Object.assign({}, state, { errorMsg: action.errorMsg })
    default:
      return state
  }
}

// set user info state
function getUserInfo(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_INFO:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        users: action.users
      })
    case FETCH_LOGIN_SUCCESS:
    case GUEST:
      return Object.assign({}, state, {
        isLogin: action.isLogin,
        userInfo: action.userInfo
      })
    default:
      return state
  }
}

const initialState = {
  isFetching: false,
  users: [],
  isLogin: false,
  userInfo: [],
  errorMsg: ''
}

const mainReducer = combineReducers({
  fetchData,
  getUserInfo,
  initialState,
  router: routerReducer
})

export default mainReducer
