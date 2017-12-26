import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Profile extends Component {
  render() {
    return (
      <div className="profile">
      <h1 className="profile__header">Profile</h1>
        <strong>Username: </strong>
        <p>{this.props.userInfo.name}</p>
        <Link to={'/'}><p>Back to Home</p></Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.getUserInfo.isLogin,
    userInfo: state.getUserInfo.userInfo
  }
}

export default connect(mapStateToProps)(Profile)
