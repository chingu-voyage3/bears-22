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
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'

import rootSaga from '../actions/sagas'
//import thunk from 'redux-thunk'
import mainReducer from '../reducers'
import UserPage from './UserPage'
import LandingPage from './LandingPage'
import LoginPage from './LoginPage'
import Header from './Header'
import Footer from './Footer'
import ProfilePage from './ProfilePage'
import SearchPage from './SearchPage'

const history = createBrowserHistory()
// const store = createStore(mainReducer, applyMiddleware(thunk))

const sagaMiddleware = createSagaMiddleware()
// const store = createStore(mainReducer, applyMiddleware(sagaMiddleware))

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
// now you can use redux dev tools in chrome/firefox
const store = createStore(mainReducer, enhancer)

const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql', credentials: 'same-origin' }),
  cache: new InMemoryCache()
})

sagaMiddleware.run(rootSaga)

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route path="/" component={Header} />
          <div id="body">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/user-list" component={UserPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/profile" component={ProfilePage} />
              <Route exact path="/search" component={SearchPage} />
            </Switch>
            <Route path="/" component={Footer} />
          </div>
        </div>
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>
)

export default App
