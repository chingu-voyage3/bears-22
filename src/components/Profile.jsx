import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import u14 from './temp_assets/u14.png'

const profileQuery = gql`
  query {
    user(user_id: 1) {
      id
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
      bio
      country {
        name
      }
      city {
        name
      }
      skills {
        id
        name
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
        <div className="profile__body container-fluid">
          {/*Image and Basic Info*/}
          <section className="profile__bg-grey row">
            <div className="col-4">
              <img src={u14} alt="Profile Image" className="profile__image" />
            </div>
            <div className="profile__header-text col-8">
              <h3>
                {user.first_name} {user.last_name}
              </h3>
              <p>
                {user.city}, {user.country}
              </p>
              <a href={user.portfolio_url}>{user.portfolio_url}</a>
            </div>
            <a
              href={'mailto:' + user.email}
              className="profile__button-contact"
            >
              Contact
            </a>
          </section>
          {/*About and Skills*/}
          <section className="profile__bg-black row">
            <div className="col-12">
              <h3 className="profile__category-text">About</h3>
              <p>{user.bio}</p>
              <h3 className="profile__category-text">Skills</h3>
              <p>Add skills to query</p>
            </div>
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
