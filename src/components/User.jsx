import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchStatus, getUserInfo, fetchAPI } from '../actions'

class User extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
		<div>
			<div>
				<h3>Users</h3>
				<button onClick={this.props.fetchUser}>
					Fetch
				</button>
			</div>
			<div id="list">
				<p style={{ display: this.props.isFetching ? 'block' : 'none' }}>Loading...</p>
				{this.props.users.map((user, index) =>
					<div key={user.firstName + user.lastName + "-" + index}>
					<p>{user.firstName}</p>
					<p className="small">{user.type}</p>
					</div>
				)}
			</div>
			<div>
			<a href="/home">
				Back to Home
			</a>
			</div>
		</div>
		);
	}
}


const mapStateToProps = state => {
  return {
    isFetching: state.fetchData.isFetching,
    users: state.getUserInfo.users
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => { dispatch(fetchStatus(!ownProps.isFetching)); }, //starting fetching
    fetchUser: () => { dispatch(fetchAPI()); } // fetching user
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(User); 
