//reducers for redux

import { combineReducers } from 'redux';
import {
	FETCH_STATUS,
	FETCH_USER,
	RECEIVE_INFO
	} from '../actions'

//set fetching status
function fetchData ( state = initialState , action ) {
	switch(action.type) {
		case FETCH_STATUS:
			return Object.assign({}, state, { isFetching: action.isFetching });
		default: 
		return state;
	}
}

//set user info state
function getUserInfo ( state = initialState, action ) {
	switch(action.type) {
		case RECEIVE_INFO:
			return Object.assign({}, state, { users: action.users })
		default: 
			return state;
	}
}


const initialState = { 
  isFetching: false,
  users: [],
};


const mainReducer = combineReducers({
  fetchData,
  getUserInfo,
  initialState
})

export default mainReducer
