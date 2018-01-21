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

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      EditProfile: true,
      profile_img: '',
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      city: '',
      country: '',
      bio: '',
      about_me: '',
      skills: '',
    }
  }
  handleViewProfile = () => {
    this.setState(({EditProfile}) => ({
      EditProfile: false,
    }))
  }
  render() {
    const {data} = this.props
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
            this.state.EditProfile ?
              <div>
                <h3>Account Basics</h3>
                <img src="http://res.cloudinary.com/devvzv96d/image/upload/v1516176891/new_years_small_nvsldx.jpg" alt="" />
                <button><i class="material-icons">add</i></button>
                <form>
                  <input type="text" name="first_name" placeholder=" First Name" defaultValue={this.props.data.user.first_name ? this.props.data.user.first_name : this.state.first_name}/>
                  <input type="text" name="last_name" placeholder=" Last Name" defaultValue={this.props.data.user.last_name ? this.props.data.user.last_name : this.state.last_name}/>
                  <input type="text" name="username" placeholder=" Username" defaultValue={this.props.data.user.username ? this.props.data.user.username : this.state.username}/>
                  <input type="text" name="email" placeholder=" E-mail Address" defaultValue={this.props.data.user.email ? this.props.data.user.email : this.state.email}/>
                </form>
                <h3>Profile</h3>
                <form>
                  <input type="text" name="city" placeholder=" City" defaultValue={this.props.data.user.city ? this.props.data.user.city : this.state.city}/>
                  <input type="text" name="country" placeholder=" Country" defaultValue={this.props.data.user.country ? this.props.data.user.country : this.state.country}/>
                  <input type="text" name="portfolio_url" placeholder=" Website" defaultValue={this.props.data.user.portfolio_url ? this.props.data.user.portfolio_url : this.state.portfolio_url}/>
                  <textarea name="bio" rows="4" cols="16" placeholder=" About Me" defaultValue={this.props.data.user.bio ? this.props.data.user.bio : this.state.bio}>
                  </textarea>
                  <textarea name="skills" rows="2" cols="16" placeholder=" Skills" defaultValue={this.props.data.user.skills ? this.props.data.user.skills : this.state.skills}>
                  </textarea>
                </form>
                <footer>
                  <p onClick={this.handleViewProfile}>View Profile</p>
                  <button><i class="material-icons">save</i>Save Changes</button>
                </footer> 
              </div> :
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
}

const mapStateToProps = state => {
  return {
    isLogin: state.getUserInfo.isLogin,
    userInfo: state.getUserInfo.userInfo
  }
}

//export default connect(mapStateToProps)(Profile)

export default graphql(profileQuery)(connect(mapStateToProps)(Profile))
