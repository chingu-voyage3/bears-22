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
        <div>
          {/*Image and Basic Info*/}
          <section>
            <img src="" alt=""/>
            <h3></h3>
            <p></p>
            <p></p>
            <button>Contact</button>
          </section>
          {/*About and Skills*/}
          <section>
            <h3>About</h3>
            <p></p>
            <h3>Skills</h3>
            <p></p>
          </section>
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
