import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const profileQuery = gql`
  query profileQuery($user_id: ID!) {
    user(user_id: $user_id) {
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
          <strong>ID: </strong>
          <p>{userInfo.id}</p>
          <div key={user.first_name + '-user'}>
            <span><strong>First Name: </strong> </span>
            <p>{user.first_name}</p>
            <span><strong>Last Name: </strong> </span>
            <p>{user.last_name}</p>
            <span><strong>Email:</strong> </span>
            <p>
              <a href={'mailto:' + user.email}>{user.email}</a>
            </p>
          </div>
          {user &&
            user.projects.map((item, index) => (
              <div key={item.id + '-project'}>
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

export default connect(mapStateToProps)(graphql(profileQuery, {
  options: (ownProps) => ({
    variables: {
      user_id: ownProps.userInfo.id,
      email: ownProps.userInfo.email,
    },
  })})(Profile));