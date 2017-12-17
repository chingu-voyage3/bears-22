import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import User from './User'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
		<div>
		  <Route path="/home" component={App} />
		  <Route path="/user-list" component={User} />
      </div>
    </Router>
  </Provider>
)

export default Root;
