// reducers for redux

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { Actions } from '../actions/index'

// set fetching status
function fetchData(state = initialState, action) {
  switch (action.type) {
    case Actions.FETCH_STATUS:
    case Actions.IS_FETCHING:
      return Object.assign({}, state, { isFetching: action.isFetching })
    case Actions.FETCH_FAIL:
      return Object.assign({}, state, { errorMsg: action.errorMsg })
    default:
      return state
  }
}

// set user info state
function getUserInfo(state = initialState, action) {
  switch (action.type) {
    case Actions.RECEIVE_INFO:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        users: action.users
      })
    case Actions.FETCH_LOGIN_SUCCESS:
    case Actions.GUEST:
      return Object.assign({}, state, {
        isLogin: action.isLogin,
        userInfo: action.userInfo
      })
    default:
      return state
  }
}

function getSearch(state = initialState, action) {
  switch (action.type) {
    case Actions.START_SEARCH:
      return Object.assign({}, state, {
        search: action.search
      })
    case Actions.SEARCH_FAILED:
      return Object.assign({}, state, {
        errMsg: action.errMsg
      })
    default:
      return state
  }
}

function getFilter(state = initialState, action) {
  switch (action.type) {
    case Actions.IS_FILTERED:
      return Object.assign({}, state, {
        filter: {
          skills: action.skills.length > 0 ? action.skills : null,
          country: action.country
        }
      })
    case Actions.FILTER_FAILED:
      return Object.assign({}, state, {
        errMsg: action.errMsg
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
  errorMsg: '',
  filter: {
    search: 'projects',
    country: null,
    skills: null
  }
}

const mainReducer = combineReducers({
  fetchData,
  getUserInfo,
  initialState,
  getFilter,
  getSearch,
  router: routerReducer
})

export default mainReducer
