import React, { Component } from 'react'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
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
import Profile from './Profile'
import Search from './Search'

const history = createBrowserHistory()
//const store = createStore(mainReducer, applyMiddleware(thunk))

const sagaMiddleware = createSagaMiddleware()
//const store = createStore(mainReducer, applyMiddleware(sagaMiddleware))

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
  // other store enhancers if any
)
//now you can use redux dev tools in chrome/firefox
const store = createStore(mainReducer, enhancer)

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
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/search" component={Search} />
        </Switch>
        <Route path="/" component={Footer} />
      </div>
    </ConnectedRouter>
  </Provider>
)

export default App
