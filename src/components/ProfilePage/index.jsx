import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const profileQuery = gql`
  query profileQuery($email: String!) {
    user(email: $email) {
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
      city {
        id
        name
      }
      country {
        id
        name
      }
      bio
      skills {
        id
        name
      }
    }
  }
`
const updateUser = gql`
  mutation updateUser($email: String!) {
    user(email: $email) {
      updateUser(user_data: { username: "jordanleo7" }) {
        id
      }
    }
  }
`
class Profile extends React.Component {
  state = {
    EditProfile: true,
    profile_img: '',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    city: '',
    country: '',
    bio: '',
    skills: ''
  }
  handleViewProfile = () => {
    this.setState(({ EditProfile }) => ({
      EditProfile: false
    }))
  }
  handleSaveChanges = () => {
    console.log(this.state)
    this.props
      .mutate({
        variables: { bio: "I'm learning how to use GraphQL." }
      })
      .then(({ data }) => {
        console.log('got data', data)
      })
      .catch(error => {
        console.log('there was an error sending the query', error)
      })
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
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
          // Display edit profile page if EditProfile state is true, else show view profile page
          this.state.EditProfile ? (
            <div className="profile__body container-fluid profile__edit-bg-grey">
              <h3 className="profile__category-text pt-3 pb-3">
                Account Basics
              </h3>
              <div className="profile__image-container">
                <img
                  className="profile__edit-image mb-3"
                  src="http://res.cloudinary.com/devvzv96d/image/upload/v1516176891/new_years_small_nvsldx.jpg"
                  alt=""
                />
                <button className="profile__edit-image-button">
                  <i class="material-icons">add</i>
                </button>
              </div>
              <form>
                <input
                  onChange={this.handleChange}
                  className="profile__form-field widthHalf border-right-0"
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  defaultValue={
                    this.props.data.user.first_name
                      ? this.props.data.user.first_name
                      : this.state.first_name
                  }
                />
                <input
                  onChange={this.handleChange}
                  className="profile__form-field widthHalf"
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  defaultValue={
                    this.props.data.user.last_name
                      ? this.props.data.user.last_name
                      : this.state.last_name
                  }
                />
                <input
                  onChange={this.handleChange}
                  className="profile__form-field border-top-0"
                  type="text"
                  name="username"
                  placeholder="Username"
                  defaultValue={
                    this.props.data.user.username
                      ? this.props.data.user.username
                      : this.state.username
                  }
                />
                <input
                  onChange={this.handleChange}
                  className="profile__form-field border-top-0"
                  type="text"
                  name="email"
                  placeholder="E-mail Address"
                  defaultValue={
                    this.props.data.user.email
                      ? this.props.data.user.email
                      : this.state.email
                  }
                />
              </form>
              <h3 className="profile__category-text pt-3 pb-3">Profile</h3>
              <form>
                <input
                  onChange={this.handleChange}
                  className="profile__form-field widthHalf border-right-0"
                  type="text"
                  name="city"
                  placeholder="City"
                  defaultValue={
                    this.props.data.user.city
                      ? this.props.data.user.city
                      : this.state.city
                  }
                />
                <input
                  onChange={this.handleChange}
                  className="profile__form-field widthHalf"
                  type="text"
                  name="country"
                  placeholder="Country"
                  defaultValue={
                    this.props.data.user.country
                      ? this.props.data.user.country
                      : this.state.country
                  }
                />
                <input
                  onChange={this.handleChange}
                  className="profile__form-field border-top-0"
                  type="text"
                  name="portfolio_url"
                  placeholder="Website"
                  defaultValue={
                    this.props.data.user.portfolio_url
                      ? this.props.data.user.portfolio_url
                      : this.state.portfolio_url
                  }
                />
                <textarea
                  onChange={this.handleChange}
                  className="profile__form-field border-top-0"
                  name="bio"
                  rows="4"
                  cols="16"
                  placeholder="About Me"
                  defaultValue={
                    this.props.data.user.bio
                      ? this.props.data.user.bio
                      : this.state.bio
                  }
                />
                <textarea
                  onChange={this.handleChange}
                  className="profile__form-field border-top-0 mb-3"
                  name="skills"
                  rows="2"
                  cols="16"
                  placeholder="Skills"
                  defaultValue={
                    this.props.data.user.skills
                      ? this.props.data.user.skills
                      : this.state.skills
                  }
                />
              </form>
              <footer className="profile__edit-footer fixed-bottom">
                <p
                  className="profile__button-change-view"
                  onClick={this.handleViewProfile}
                >
                  View Profile
                </p>
                <button
                  onClick={this.handleSaveChanges}
                  className="profile__button-save"
                >
                  <i class="material-icons">save</i>Save Changes
                </button>
              </footer>
            </div>
          ) : (
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
                    {this.props.data.user.first_name}{' '}
                    {this.props.data.user.last_name}
                  </h3>
                  <p className="align-middle">
                    {this.props.data.user.city}, {this.props.data.user.country}
                  </p>
                  <a
                    href={'mailto:' + this.props.data.user.email}
                    className="align-middle"
                  >
                    {this.props.data.user.email}
                  </a>
                </div>
                <a
                  href={'mailto:' + this.props.data.user.email}
                  className="profile__button-contact"
                >
                  Contact
                </a>
              </section>
              {/*About and Skills*/}
              <section className="profile__bg-black row">
                <div className="col-12">
                  <h3 className="profile__category-text">About</h3>
                  <p>{this.props.data.user.bio}</p>
                  <h3 className="profile__category-text">Skills</h3>
                  <p>{this.props.data.user.skills}</p>
                </div>
              </section>
            </div>
          )
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
  graphql(profileQuery, {
    options: ownProps => ({
      variables: {
        user_id: ownProps.userInfo.id,
        email: ownProps.userInfo.email
      }
    })
  })(Profile)
)
