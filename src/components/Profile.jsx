import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const profileQuery = gql`
  {
    user(user_id: 1) {
      email
      username
      first_name
      last_name
      status
      profile_image
      portfolio_url
      projects {
        id
        title
        description
      }
    }
  }
`

const Profile = ({ userInfo, data: { user, refetch, error, loading } }) => {
  if (error) {
    return (
      <div className="profile">
        <h1 className="profile__header">Profile</h1>
        <p>Failed to fetch data now, please try again.</p>
        <Link to={'/'}>
          <p>Back to Home</p>
        </Link>
      </div>
    )
  } else {
    if (!loading) {
      return (
        <div className="profile">
          <h1 className="profile__header">Profile</h1>
          <strong>Username: </strong>
          {userInfo.name}
          <div key={user.id + '-' + 'user'}>
            <span>First Name: </span>
            <p>{user.first_name}</p>
            <span>Last Name: </span>
            <p>{user.last_name}</p>
            <span>Last Name: </span>
            <p>
              <a href={'mailto:' + user.email}>{user.email}</a>
            </p>
          </div>
          {user &&
            user.projects.map((item, index) => (
              <div key={item.id + '-' + 'project'}>
                <span>Project: </span>
                <p>{item.title}</p>
                {item.description ? (
                  <div>
                    <span>Description:</span>
                    <p>{item.description}</p>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ))}
          <Link to={'/'}>
            <p>Back to Home</p>
          </Link>
        </div>
      )
    } else {
      return (
        <div className="profile">
          <h1 className="profile__header">Profile</h1>
          <p>Loading...</p>
          <Link to={'/'}>
            <p>Back to Home</p>
          </Link>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.getUserInfo.isLogin,
    userInfo: state.getUserInfo.userInfo
  }
}

//export default connect(mapStateToProps)(Profile)

export default graphql(profileQuery)(connect(mapStateToProps)(Profile))
