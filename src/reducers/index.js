// reducers for redux

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import {
  FETCH_STATUS,
  FETCH_USER,
  RECEIVE_INFO,
  VERIFY_LOGIN,
  USER_LOGIN
} from '../actions'

// set fetching status

function fetchData(state = initialState, action) {
  switch (action.type) {
    case FETCH_STATUS:
      return Object.assign({}, state, { isFetching: action.isFetching })
    default:
      return state
  }
}

// set user info state

function getUserInfo(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_INFO:
      return Object.assign({}, state, { users: action.users })
    case USER_LOGIN:
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
  userInfo: []
}

const mainReducer = combineReducers({
  fetchData,
  getUserInfo,
  initialState,
  router: routerReducer
})

export default mainReducer
