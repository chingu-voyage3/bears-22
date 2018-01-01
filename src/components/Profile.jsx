import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const profileQuery = gql`
  {
    people {
      url
      homeworld
      height
      skin_color
      birth_year
      eye_color
      hair_color
      gender
      name
      mass
    }
  }
`

const Profile = ({ userInfo, data: { people, refetch, error } }) => {
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
    return (
      <div className="profile">
        <h1 className="profile__header">Profile</h1>
        <strong>Username: </strong>
        {userInfo.name}
        {people &&
          people.map((user, index) => (
            <div className="row" key={user.birth_year + '-' + index}>
              <p>{user.birth_year}</p>
            </div>
          ))}
        <Link to={'/'}>
          <p>Back to Home</p>
        </Link>
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

//export default connect(mapStateToProps)(Profile)

export default graphql(profileQuery)(connect(mapStateToProps)(Profile))
