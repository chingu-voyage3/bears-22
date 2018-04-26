import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import create from '../../assets/ic_create_white_48dp_2x.png'
import face from '../../assets/ic_face_white_48dp_2x.png'
import group from '../../assets/ic_group_white_48dp_2x.png'
import check from '../../assets/ic_check_white_48dp_2x.png'
import FeaturedProjects from './FeaturedProjects'
import FeaturedDevelopers from './FeaturedDevelopers'

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
      <Query query={getData}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...'
          if (error) return `Error! ${error.message}`
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
                    that need help. It is a solution for cohorts who need
                    another teammate and for developers who want more
                    experience.
                  </p>
                </div>

                <div className="login__button mb-4">
                  <a href="/auth/github">
                    <div>
                      <span className="btn btn__login">
                        <i
                          className="fa fa-github text-dark"
                          aria-hidden="true"
                        />{' '}
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
                  <p>Match with teams via Chingu&apos;s API</p>
                </div>

                <div className="section__feature">
                  <img src={check} className="icon" />
                  <p>Finish projects</p>
                </div>
              </section>

              <FeaturedProjects projects={data.getAllProjects} />
              <FeaturedDevelopers users={data.getAllUsers} />

              {/* Volunteer Today*/}

              <section className="section section--black">
                <h3 className="section__header">Volunteer Today</h3>
                <p className="section__text">
                  Gain experience on new projects and become a developer who can
                  adapt to new situations.
                </p>
                <p className="section__text">The first step starts here.</p>
                <div className="login__button mb-4">
                  <a href="/auth/github">
                    <div>
                      <span className="btn btn__login">
                        <i
                          className="fa fa-github text-dark"
                          aria-hidden="true"
                        />{' '}
                        Sign up with GitHub
                      </span>
                    </div>
                  </a>
                </div>
              </section>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default LandingPage
