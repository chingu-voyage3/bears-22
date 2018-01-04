import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link to={'/'}>
          <span className="site__name">Do-um</span>
        </Link>
        <ul className="header__menu">
          <Link to={'/'}>
            <li>Home</li>
          </Link>
          {this.props.isLogin ? (
            <Link to={'/profile'}>
              <li>My Dashboard</li>
            </Link>
          ) : (
            ''
          )}
          <Link to={'/user-list'}>
            <li>User List</li>
          </Link>
          {this.props.isLogin ? (
            <a href="/auth/logout">
              <li>Logout</li>
            </a>
          ) : (
            <Link to={'/login'}>
              <li>Login</li>
            </Link>
          )}
        </ul>
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

export default connect(mapStateToProps)(Header)
