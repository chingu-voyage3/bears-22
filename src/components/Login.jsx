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
            <div className="login__button">
              <a href="/auth/github">
                <div className="login__button-github">
                  <span>
                    <i className="fa fa-github" aria-hidden="true" />
                    Login via Github
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
