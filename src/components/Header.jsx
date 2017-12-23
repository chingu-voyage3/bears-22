import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
    	<div className="header">
    	<span className="site__name">Do-um</span>
    		<ul className="header__menu">
	    		<Link to = {'/'}><li>Home</li></Link>
	    		<Link to = {'/user-list'}><li>User List</li></Link>
	    		<Link to = {'/login'}><li>Login</li></Link>
    		</ul>
    	</div>
    	)
  }
}

export default Header
