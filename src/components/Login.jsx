import React, { Component } from 'react'
import { connect } from 'react-redux'
import { verifyLogin } from '../actions'
import face from '../assets/ic_face_white_48dp_2x.png'
import add from '../assets/ic_person_add_48pt_2x.png'

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
      <div className="section__hero">
        <div className="login-container">
          <div className="row">
            <div className="login__width mx-auto section section--dark">
              <div className="section__feature login-icon-container">
                <img
                  src={face}
                  alt="abc"
                  className="icon login-icon d-block mx-auto mb-1"
                />
                <p className="user__headline--yellow mb-4">Member Login</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="login__width mx-auto section section--black">
              <div className="login__button mb-4">
                <a href="/auth/github">
                  <div>
                    <span className="btn btn__login">
                      <i
                        className="fa fa-github text-dark"
                        aria-hidden="true"
                      />{' '}
                      Login via Github
                    </span>
                  </div>
                </a>

                <p className="login__text">Need an account?</p>
                <a href="https://chingu-cohorts.github.io/chingu-directory/">
                  <div className="login__button-register">
                    <span className="btn btn__login">
                      <img src={add} alt="" className="login--face" /> Register
                      via Chingu
                    </span>
                  </div>
                </a>
              </div>
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
