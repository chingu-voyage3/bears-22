import React, { Component } from 'react'
import { connect } from 'react-redux'

class Login extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-6 login__introblock">
            <h1 className="user__headline--white">Our site name</h1>
            <p>In our site, you can...</p>
            <ul className="login__ul">
              <li>Find developers</li>
              <li>Showcase your skills</li>
              <li>Find NGOs</li>
            </ul>
            <div className="mb-auto">
              <p>Not a developer?</p>
            </div>
          </div>
          <div className="col-sm-6">
            <h1 className="user__headline">Login</h1>
            <div className="login__button-google" onClick={this.props.startLoginGoogle}>
              <i className="fa fa-facebook-official" aria-hidden="true" />
              Login using Google
            </div>
            <div className="login__button-facebook"  onClick={this.props.startLoginFacebook}>
              <i className="fa fa-google" aria-hidden="true" />
              Login using Facebook
            </div>
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
    startLoginGoogle: (e) =>  {
      console.log("Google");
      fetch("/auth/google", { method: 'GET', credentials: 'include', mode: "no-cors",redirect: 'follow', })
      .then(function(res) {
        console.log(res)
      })
    },
    startLoginFacebook: (e) =>  {
      fetch("/auth/facebook", { method: 'POST', credentials: 'include', mode: "no-cors",redirect: 'follow', })
      .then(function(res) {
        console.log(res)
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
