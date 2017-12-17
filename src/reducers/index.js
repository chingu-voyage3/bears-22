//reducers for redux

import { combineReducers } from 'redux';
import {
	FETCH_STATUS,
	FETCH_USER,
	RECEIVE_INFO
	} from '../actions'

function fetchData ( state = { isFetching: false } , action ) {
	switch(action.type) {
		case FETCH_STATUS:
			return Object.assign({}, state, { isFetching: true })
		default: 
		return state;
	}
}

function getUserInfo ( state = { users: [] }, action ) {
	switch(action.type) {
		case FETCH_STATUS:
			return Object.assign({}, state, { users: action.users })
		default: 
			return state;
	}
}

const mainReducer = combineReducers({
  fetchData,
  getUserInfo
})

export default mainReducer
