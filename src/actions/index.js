//actions for redux
import { 
  FETCH_LOGIN_STATUS, 
  USER_LIST_REQUEST
   } from './sagas'

//get fetching status action
export const FETCH_STATUS = 'FETCH_STATUS'
export function fetchStatus(status) {
  return { type: FETCH_STATUS, isFetching: status }
}

//receive user list info
export const RECEIVE_INFO = 'RECEIVE_INFO'
export function getUserInfo(json) {
  return {
    type: RECEIVE_INFO,
    users: json
  }
}

export function userListReq () {
  return {
    type: USER_LIST_REQUEST
  }
}

//get login status
export function verifyLogin() {
  return {
    type: FETCH_LOGIN_STATUS
  }
}