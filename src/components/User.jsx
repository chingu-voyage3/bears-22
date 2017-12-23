import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userListReq } from '../actions'
import { Link } from 'react-router-dom'

class User extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }
  render() {
    return (
      <div>
        <h1 className="user__headline">User List</h1>
        <div className="col-xs-12 user__list">
          <div
            className="row"
            style={{ display: this.props.users === [] ? 'none' : 'flex' }}
          >
            <div className="col-xs-12 col-lg-1 user__header">
              <p>Gender</p>
            </div>
            <div className="col-xs-12 col-lg-3 user__header">
              <p>Name</p>
            </div>
            <div className="col-xs-12 col-lg-2 user__header">
              <p>Age</p>
            </div>
            <div className="col-xs-12 col-lg-3 user__header">
              <p>Email</p>
            </div>
            <div className="col-xs-12 col-lg-3 user__header">
              <p>Joined At</p>
            </div>
          </div>
          <p
            className="loading"
            style={{ display: this.props.isFetching ? 'block' : 'none' }}
          >
            <i className="fa fa-spinner fa-pulse fa-2x fa-fw" />
            <span className="sr-only">Loading...</span> Loading...
          </p>
          {this.props.users.map((user, index) => (
            <div
              className="row"
              key={user.firstName + user.lastName + '-' + index}
            >
              <div className="col-xs-12 col-lg-1 user__cell">
                <i
                  className={
                    user.sex === 'Male'
                      ? 'fa fa-male user__male'
                      : 'fa fa-female user__female'
                  }
                  aria-hidden="true"
                />
              </div>
              <div className="col-xs-12 col-lg-3 user__cell">
                <p>
                  {user.firstName} {user.lastName}
                </p>
                <p className="small">{user.type}</p>
              </div>
              <div className="col-xs-12 col-lg-2 user__cell">
                <p>{user.age}</p>
              </div>
              <div className="col-xs-12 col-lg-3 user__cell">
                <p>
                  <a href="mailto:{user.email}">{user.email}</a>
                </p>
              </div>
              <div className="col-xs-12 col-lg-3 user__cell">
                <p>{user.joinDate.slice(0, 10)}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Link to={'/'}>Back to Home</Link>
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
    fetchUser: () => {
      dispatch(userListReq())
    } // fetching user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
