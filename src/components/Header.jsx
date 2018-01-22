import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends Component {
  constructor() {
    super();
    this.state = {
      toggleMenu: false
    }
    this.onToggle = this.onToggle.bind(this);
  }
  onToggle() {
    this.setState((prevState, props) => ({
      toggleMenu: !prevState.toggleMenu
    }));
    console.log('clickeed');
    if(!this.state.toggleMenu) {
      document.getElementById('body').classList.add('header__translate');
    } else {
      document.getElementById('body').classList.remove('header__translate');
    }
  }
  render() {
    return (
      <div>
      <div className={this.state.toggleMenu ? 'header header__translate' : 'header'}>
      <Link to={'/'}>
          <span className="site__name">Do-um</span>
        </Link>
        <div className="header__hamburger header__animation--active" onClick={this.onToggle}>
        <div className="header__hamburger--center">
          <span className="bar-1"></span>
          <span className="bar-2"></span>
          <span className="bar-3"></span>
        </div>
      </div>
      </div>

        <div className={this.state.toggleMenu ? 'header__menu__grid header__menu__grid--active' : 'header__menu__grid'} id="header__menu__grid">
        <ul className="header__menu">
           <Link to={'/'}>
            <li>DO-UM</li>
          </Link>
          <Link to={'/'}>
            <li><i class="fa fa-home" aria-hidden="true"></i><span>Home</span></li>
          </Link>
          {this.props.isLogin ? (
            <Link to={'/profile'}>
              <li><i class="fa fa-info" aria-hidden="true"></i><span>My Dashboard</span></li>
            </Link>
          ) : (
            ''
          )}
          <Link to={'/user-list'}>
            <li><i class="fa fa-user" aria-hidden="true"></i><span>User List</span></li>
          </Link>
          <Link to={'/search'}>
            <li><i class="fa fa-search" aria-hidden="true"></i> <span>Search</span></li>
          </Link>
          {this.props.isLogin ? (
            <a href="/auth/logout">
              <li><i class="fa fa-sign-out" aria-hidden="true"></i><span>Logout</span></li>
            </a>
          ) : (
            <Link to={'/login'}>
              <li><i class="fa fa-sign-in" aria-hidden="true"></i><span>Login</span></li>
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
