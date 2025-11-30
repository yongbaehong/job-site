import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import MainPage from './pages/MainPage/MainPage'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import LoginPage from './pages/LoginPage/LoginPage'
import SignupPage from './pages/LoginPage/SignupPage'
import User from './pages/UserPage/User'

import 'bootstrap/dist/css/bootstrap.min.css'

const MetierApp = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignupPage} />
      <Route exact path="/user" component={User} />
      <Route path="*" component={ErrorPage} />
    </Switch>
  </Router>
)

ReactDOM.render(<MetierApp />, document.getElementById('root'))
