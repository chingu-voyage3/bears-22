import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const profileQuery = gql`
  query profileQuery($id: String!) {
    getUserByID(id: $id) {
      id
      githubID
      email
      username
      name
      location
      bio
      avatar_url
      github_url
      blog_url
      skills {
        id
        name
      }
    }
  }
`
class Profile extends React.Component {
  render() {
    if (!this.props.userInfo) {
      return (
        <div className="profile">
          <h1 className="profile__header">Profile</h1>
          <p>Failed to fetch data, please try again.</p>
          <Link to={'/'}>
            <p>Back to Home</p>
          </Link>
        </div>
      )
    } else if (this.props.data.loading) {
      return (
        <div className="profile">
          <h1 className="profile__header">Profile</h1>

          <div class="spinner">
            <div class="bounce1" />
            <div class="bounce2" />
            <div class="bounce3" />
          </div>

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
                src={this.props.userInfo.avatar_url}
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
              <p>
                {this.props.userInfo.skills &&
                  this.props.userInfo.skills.map((skill, index) => {
                    return <span key={index}>{skill.name}</span>
                  })}
              </p>
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

export default compose(
  connect(mapStateToProps),
  graphql(profileQuery, {
    options: ownProps => ({
      variables: {
        id: ownProps.userInfo.id
      }
    })
  })
)(Profile)
