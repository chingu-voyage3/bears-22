import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends Component {
  constructor() {
    super()
    this.state = {
      toggleMenu: false
    }
    this.onToggle = this.onToggle.bind(this)
  }
  onToggle() {
    if (window.innerWidth < 1200) {
      this.setState((prevState, props) => ({
        toggleMenu: !prevState.toggleMenu
      })) //only mobile will toggle menu

      if (!this.state.toggleMenu) {
        document.getElementById('body').classList.add('header__translate')
        document.body.style.overflowX = 'hidden'
        document.body.style.overflowY = 'hidden'
      } else {
        document.getElementById('body').classList.remove('header__translate')
        document.body.style.overflowX = 'hidden'
        document.body.style.overflowY = 'auto'
      }
    }
  }
  render() {
    return (
      <div>
        <div
          className={
            this.state.toggleMenu ? 'header header__translate' : 'header'
          }
        >
          <Link to={'/'}>
            <span className="site__name">Doum</span>
          </Link>
          <div
            className="header__hamburger header__animation--active"
            onClick={this.onToggle}
          >
            <div className="header__hamburger--center">
              <span className="bar-1" />
              <span className="bar-2" />
              <span className="bar-3" />
            </div>
          </div>
        </div>
        <div
          className={
            this.state.toggleMenu ? 'overlay overlay--active' : 'overlay'
          }
          onClick={this.onToggle}
        />
        <div
          className={
            this.state.toggleMenu
              ? 'header__menu__grid header__menu__grid--active'
              : 'header__menu__grid'
          }
          id="header__menu__grid"
        >
          <ul className="header__menu">
            <Link to={'/'} onClick={this.onToggle}>
              <li className="site__name">Doum</li>
            </Link>
            <Link to={'/'} onClick={this.onToggle}>
              <li>
                <i className="fa fa-home" aria-hidden="true" />
                <span>Home</span>
              </li>
            </Link>
            {this.props.isLogin ? (
              <Link to={'/profile'} onClick={this.onToggle}>
                <li>
                  <i className="fa fa-user-circle-o" aria-hidden="true" />
                  <span>Profile</span>
                </li>
              </Link>
            ) : (
              ''
            )}
            <Link to={'/search'} onClick={this.onToggle}>
              <li>
                <i className="fa fa-search" aria-hidden="true" />{' '}
                <span>Search</span>
              </li>
            </Link>
            {this.props.isLogin ? (
              <a href="/auth/logout" onClick={this.onToggle}>
                <li>
                  <i className="fa fa-sign-out" aria-hidden="true" />
                  <span>Logout</span>
                </li>
              </a>
            ) : (
              <Link to={'/login'} onClick={this.onToggle}>
                <li>
                  <i className="fa fa-sign-in" aria-hidden="true" />
                  <span>Login</span>
                </li>
              </Link>
            )}
          </ul>
        </div>
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
