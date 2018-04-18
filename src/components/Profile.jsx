import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const profileQuery = gql`
  query profileQuery($email: String!) {
    getUserByEmail(email: $email) {
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
    const { data } = this.props
    if (data.error) {
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
      if (!data.loading) {
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
                  <h3 className="align-middle">
                    {this.props.data.name}
                  </h3>
                  <p className="align-middle">
                    {this.props.data.location}
                  </p>
                  <a
                    href={'mailto:' + this.props.data.email}
                    className="align-middle"
                  >
                    {this.props.data.email}
                  </a>
                </div>
                <a
                  href={'mailto:' + this.props.data.email}
                  className="profile__button-contact"
                >
                  Contact
                </a>
              </section>
              {/*About and Skills*/}
              <section className="profile__bg-black row">
                <div className="col-12">
                  <h3 className="profile__category-text">About</h3>
                  <p>{this.props.data.bio}</p>
                  <h3 className="profile__category-text">Skills</h3>
                  <p>{this.props.data.skills}</p>
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
}

const mapStateToProps = state => {
  return {
    isLogin: state.getUserInfo.isLogin,
    userInfo: state.getUserInfo.userInfo
  }
}

//export default connect(mapStateToProps)(Profile)

export default connect(mapStateToProps)(
  compose(
    graphql(profileQuery, {
      options: ownProps => ({
        variables: {
          user_id: ownProps.userInfo.id,
          email: ownProps.userInfo.email
        }
      })
    }),
  )(Profile)
)
