import React, { Component } from 'react'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push
} from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../actions/sagas'
//import thunk from 'redux-thunk'
import mainReducer from '../reducers'
import User from './User'
import Landing from './Landing'
import Login from './Login'
import Header from './Header'
import Footer from './Footer'

const history = createBrowserHistory()
//const store = createStore(mainReducer, applyMiddleware(thunk))

const sagaMiddleware = createSagaMiddleware()
const store = createStore(mainReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
      <Route path="/" component={Header} />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/user-list" component={User} />
        <Route exact path="/login" component={Login} />
        </Switch>
        <Route path="/" component={Footer} />
      </div>
    </ConnectedRouter>
  </Provider>
)

export default App
