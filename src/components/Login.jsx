import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-6 login__introblock">
            <h1 className="user__headline--white">You can...</h1>
            <ul className="login__ul">
              <li>Find developers</li>
              <li>Communicate with Chingu teams</li>
              <li>Contribute!</li>
            </ul>
            <p>Login now!</p>
          </div>
          <div className="col-sm-6">
            <h1 className="user__headline">Login</h1>
            <a href="/auth/google"><div
              className="login__button-google"
            >
              <i className="fa fa-facebook-official" aria-hidden="true" />
              Login using Google
            </div></a>
            <a href="/auth/auth/facebook"><div
              className="login__button-facebook"
            >
              <i className="fa fa-google" aria-hidden="true" />
              Login using Facebook
            </div></a>
          </div>
        </div>
        <div>
          <a href="/home">Back to Home</a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.fetchData.isFetching,
    users: state.getUserInfo.users,
    isLogin: state.getUserInfo.isLogin,
    userInfo: state.getUserInfo.userInfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    startLoginGoogle: e => {
      
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
