import React, { Component } from 'react'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push
} from 'react-router-redux'
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../actions/sagas'
//import thunk from 'redux-thunk'
import mainReducer from '../reducers'
import User from './User'
import Landing from './Landing'
import Login from './Login'

const history = createBrowserHistory()
//const store = createStore(mainReducer, applyMiddleware(thunk))

const sagaMiddleware = createSagaMiddleware();
const store = createStore(mainReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga);

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/" component={Landing} />
        <Route path="/user-list" component={User} />
        <Route path="/login" component={Login} />
      </div>
    </ConnectedRouter>
  </Provider>
)

export default App
