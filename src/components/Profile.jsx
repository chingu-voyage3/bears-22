import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const profileQuery = gql`
  query profileQuery($email: String!) {
    getUserByUsername(username: $username) {
      email
      username
      name
      avatar_url
      location
      bio
      skills
    }
  }
`
class Profile extends React.Component {
  render() {
    if (!this.props.userInfo) {
      return (
        <div className="profile">
          <h1 className="profile__header">Profile</h1>
          <p>Failed to fetch data now, please try again.</p>
          <Link to={'/'}>
            <p>Back to Home</p>
          </Link>
        </div>
      )
    } else if (this.props.data.loading) {
      return (
        <div className="profile">
          <h1 className="profile__header">Profile</h1>
          <p>Loading...</p>
          <Link to={'/'}>
            <p>Back to Home</p>
          </Link>
        </div>
      )
    } else {
      return (
        <div className="profile__body container-fluid">
          {/*Image and Basic Info*/}
          <section className="profile__view-bg-grey row">
            <div className="col-4">
              <img
                src="http://res.cloudinary.com/devvzv96d/image/upload/v1516176891/new_years_small_nvsldx.jpg"
                alt="Profile Image"
                className="profile__image col-4"
              />
            </div>
            <div className="profile__header-text col-8">
              <h3 className="align-middle">{this.props.userInfo.name}</h3>
              <p className="align-middle">{this.props.userInfo.location}</p>
              <a
                href={'mailto:' + this.props.data.email}
                className="align-middle"
              >
                {this.props.userInfo.email}
              </a>
            </div>
            <a
              href={'mailto:' + this.props.userInfo.email}
              className="profile__button-contact"
            >
              Contact
            </a>
          </section>
          {/*About and Skills*/}
          <section className="profile__bg-black row">
            <div className="col-12">
              <h3 className="profile__category-text">About</h3>
              <p>{this.props.userInfo.bio}</p>
              <h3 className="profile__category-text">Skills</h3>
              <p>{this.props.userInfo.skills}</p>
            </div>
          </section>
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

export default connect(mapStateToProps)(
  graphql(profileQuery, {
    options: ownProps => ({
      variables: {
        user_id: ownProps.userInfo.id,
        email: ownProps.userInfo.email
      }
    })
  })(Profile)
)
