import React, { Component } from 'react'
import { connect } from 'react-redux'
import { verifyLogin } from '../actions'

class Login extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.checkLoginStatus()
    console.log(this.props.userInfo)
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 login__introblock p-3">
            <h1 className="user__headline--white">After login, you can...</h1>
            <ul className="login__ul">
              <li>Find developers</li>
              <li>Communicate with Chingu teams</li>
              <li>Learn more!</li>
              <li>Contribute more!</li>
            </ul>
            <p>Login now!</p>
          </div>
          <div className="col-md-6 p-3">
            <h1 className="user__headline">Login</h1>
            <div className="login__button">
              <a href={process.env.REACT_APP_SERVER_LOGIN_ENDPOINT || "http://localhost:8080/auth/github"}>
                <div className="login__button-github">
                  <span>
                    <i className="fa fa-github" aria-hidden="true" />
                    Login via Github
                  </span>
                </div>
              </a>

              <span className="login__text">
                <i className="fa fa-angle-right" />
                If you are not Chingu member, register now:
              </span>
              <a href="https://chingu-cohorts.github.io/chingu-directory/">
                <div className="login__button-register">
                  <span>
                    <i className="fa fa-user-plus" aria-hidden="true" />
                    Register via Chingu
                  </span>
                </div>
              </a>
            </div>
          </div>
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
    checkLoginStatus: e => {
      verifyLogin()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
