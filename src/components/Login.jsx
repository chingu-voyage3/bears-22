import React, { Component } from 'react'
import { connect } from 'react-redux'
import { verifyLogin, startLogin } from '../actions'

class User extends Component {
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
            <div class="login__button-google" onClick={this.props.startLogin}>
              <i className="fa fa-facebook-official" aria-hidden="true" />
              Login using Google
            </div>
            <div class="login__button-facebook">
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
    startLogin: () => {
      dispatch(startLogin())
    } //starting fetching
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
