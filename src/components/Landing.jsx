import React, { Component } from 'react'

class Landing extends Component {
  render() {
    return (
      <div>
        {/* Hero */}

        <section>
          <p>DOUM</p>
          <h1>HELP</h1>
          <h1>FINISH</h1>
          <h1>GROW</h1>
          <p>
            <span>Doum </span> is a platform that connects developers with{' '}
            <a
              href="https://chingu-cohorts.github.io/chingu-directory/"
              target="_blank"
            >
              Chingu cohorts
            </a>{' '}
            that need help. It is a solution for cohorts who need another
            teammate and for developers who want more experience.
          </p>
          <button>
            <i />Sign up with GitHub
          </button>
        </section>

        {/* How It Works */}

        <section>
          <h3>How It Works</h3>
          <i />
          <p>Sign up with GitHub</p>
          <i />
          <p>Create a profile</p>
          <i />
          <p>Match with teams via Chingu's API</p>
          <i />
          <p>Finish projects</p>
        </section>

        {/* Featured Projects */}

        <section>
          <h3>Featured Projects</h3>
          <div>
            <i />
            <h4 />
            <p />
          </div>
          <div>
            <i />
            <h4 />
            <p />
          </div>
          <div>
            <i />
            <h4 />
            <p />
          </div>
          <div>
            <i />
            <h4 />
            <p />
          </div>
        </section>

        {/* Featured Developers */}

        <section>
          <h3>Featured Developers</h3>
          <p>
            These developers joined a team who lost a member and helped them
            finish their project.
          </p>
          <div>
            {/* developer images */}
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
        </section>

        {/* Volunteer Today*/}

        <section>
          <h3>Volunteer Today</h3>
          <p>
            Gain experience on new projects and become a developer who can adapt
            to new situations.
          </p>
          <p>The first step starts here.</p>
          <button>
            <i />Sign up with GitHub
          </button>
        </section>
      </div>
    )
  }
}

export default Landing
