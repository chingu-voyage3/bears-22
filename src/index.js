import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux'
import App from './components/App';
import Root from './components/Root';
import mainReducer from './reducers';

let store = createStore(mainReducer);

ReactDOM.render(
	<Root store={store} />, 
	document.getElementById('root')
);
