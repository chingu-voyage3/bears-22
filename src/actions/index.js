//actions for redux

import axios from 'axios';

//get fetching status action
export const FETCH_STATUS = 'FETCH_STATUS';
export function fetchStatus (status) {
	return {type: FETCH_STATUS, status };
}

//fetch user information action
export const FETCH_USER = 'FETCH_USER';
export function fetchUserInfo (users) {
	return {type: FETCH_USER, users };
}

//receive user info
export const RECEIVE_INFO = 'RECEIVE_INFO';
export function getUserInfo(info, json) {
  return {
    type: RECEIVE_INFO,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

//start fetching data using Axios
export const FETCHING_DATA = 'FETCHING_DATA';
export function fetchingData(users) {
	return dispatch => {
		dispatch(fetchUserInfo(users))
		return axios('/users')
		.then(response => response.json())
		.then(json => dispatch(getUserInfo(json)))
	}
}
