import React, { Component } from 'react';
import { connect } from 'react-redux'
import fetchStatus from '../actions'

class User extends Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}
	onClick() {
		dispatch(fetchStatus(this.props.isFetching));
	}
	render() {
		return (
		<div>
			<h3>Users</h3>
			<button onClick={this.onClick}>
				Fetch
			</button>
		</div>
		);
	}
}


const mapStateToProps = state => {
  return {
    isFetching: state.isFetching
  }
}

export default User;
