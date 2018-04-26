import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import create from '../../assets/ic_create_white_48dp_2x.png'
import face from '../../assets/ic_face_white_48dp_2x.png'
import group from '../../assets/ic_group_white_48dp_2x.png'
import check from '../../assets/ic_check_white_48dp_2x.png'

const getData = gql`
  query {
    getAllUsers {
      id
      username
      name
      avatar_url
      bio
    }
    getAllProjects {
      id
      title
      description
      skills
      users {
        id
      }
      needsHelp
    }
  }
`

class LandingPage extends Component {
  render() {
    return (
      <div>
        {/* Hero */}

        <section className="section section__hero d-flex flex-column">
          <div className="section__hero__branding mx-auto">
            {' '}
            <span>HELP.</span> <span>FINISH.</span> <span>GROW.</span>
          </div>
          <div className="col-xs-12 col-sm-10 col-md-6 col-xl-4 mx-auto">
            <p>
              Doum is a platform that connects developers with{' '}
              <a
                href="https://chingu-cohorts.github.io/chingu-directory/"
                target="_blank"
                rel="noopener noreferrer"
                className="text--primary"
              >
                Chingu cohorts
              </a>{' '}
              that need help. It is a solution for cohorts who need another
              teammate and for developers who want more experience.
            </p>
          </div>

          <div className="login__button mb-4">
            <a href="/auth/github">
              <div>
                <span className="btn btn__login">
                  <i className="fa fa-github text-dark" aria-hidden="true" />{' '}
                  Sign up with GitHub
                </span>
              </div>
            </a>
          </div>
        </section>

        {/* How It Works */}

        <section className="section section--dark">
          <h3 className="section__header">How It Works</h3>
          <div className="section__feature">
            <img src={create} className="icon" />
            <p>Sign up with GitHub</p>
          </div>

          <div className="section__feature">
            <img src={face} className="icon" />
            <p>Create a profile</p>
          </div>

          <div className="section__feature">
            <img src={group} className="icon" />
            <p>Match with teams via Chingu's API</p>
          </div>

          <div className="section__feature">
            <img src={check} className="icon" />
            <p>Finish projects</p>
          </div>
        </section>

        {/* Featured Projects */}

        <section className="section section--black">
          <h3 className="section__header">Featured Projects</h3>
          <div className="section__feature section__projects">
            {/* <h4>deVGaido</h4>
            <p>
              devGaido provides easy to follow learning paths that help you
              reach your goal without the hassle.
            </p> */}
            {this.props.data.getAllProjects
              ? this.props.data.getAllProjects.slice(0, 4).map(project => (
                  <div
                    key={project.id}
                    id={project.id}
                    className="section__project"
                  >
                    <h5>
                      {project.title} &middot; {project.description}
                    </h5>
                  </div>
                ))
              : 'Loading'}
          </div>
        </section>

        {/* Featured Developers */}

        <section className="section section--dark ">
          <h3 className="section__header ">Featured Developers</h3>
          <p className="section__text">
            These developers joined a team who lost a member and helped them
            finish their project.
          </p>
          <div className="section__users">
            {this.props.data.getAllUsers
              ? this.props.data.getAllUsers
                  .slice(0, 24)
                  .map(user => (
                    <img
                      className="section__users__image"
                      src={
                        user.avatar_url ||
                        'https://visualpharm.com/assets/336/User-595b40b65ba036ed117d26d4.svg'
                      }
                      key={user.id}
                      alt={`${user.first_name} ${user.last_name}`}
                    />
                  ))
              : 'Loading'}
          </div>
        </section>

        {/* Volunteer Today*/}

        <section className="section section--black">
          <h3 className="section__header">Volunteer Today</h3>
          <p className="section__text">
            Gain experience on new projects and become a developer who can adapt
            to new situations.
          </p>
          <p className="section__text">The first step starts here.</p>
          <div className="login__button mb-4">
            <a href="/auth/github">
              <div>
                <span className="btn btn__login">
                  <i className="fa fa-github text-dark" aria-hidden="true" />{' '}
                  Sign up with GitHub
                </span>
              </div>
            </a>
          </div>
        </section>
      </div>
    )
  }
}

export default graphql(getData)(LandingPage)
