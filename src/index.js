import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Root from './components/Root';
import mainReducer from './reducers';

let store = createStore(
	mainReducer, 
	applyMiddleware(thunk)
);

ReactDOM.render(
	<Root store={store} />, 
	document.getElementById('root')
);
