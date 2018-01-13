import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import u14 from './temp_assets/u14.png';

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
        <div className="profile__body container-fluid">
          {/*Image and Basic Info*/}
          <section className="profile__bg-grey row">
            <div className="col-4">
              <img src={u14} alt="Profile Image" className="profile__image col-4"/>
            </div>
            <div className="profile__header-text col-8">
              <h3 className="align-middle">Richard Ellery</h3>
              <p className="align-middle">Busan, South Korea</p>
              <a href="http://localhost:3000/profile"  className="align-middle">http://elleredddddddddddddddddddddeeee.github.io</a>
            </div>
            <button className="profile__button-contact">Contact</button>
          </section>
          {/*About and Skills*/}
          <section className="profile__bg-black row">
            <div className="col-12">
              <h3 className="profile__category-text">About</h3>
              <p>My name is Richard. I have experience using HTML, CSS, JavaScript, and React in a team setting. I've also helped design UI/UX. I hope I can help your team finish your project!</p>
              <h3 className="profile__category-text">Skills</h3>
              <p>HTML, CSS, JavaScript, React, UI, UX</p>
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
