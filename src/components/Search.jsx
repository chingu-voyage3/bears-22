import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userListReq } from '../actions'
import { Link } from 'react-router-dom'
import genericlogo from '../generic-logo.jpg'

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">

          <div className="col-3 sidebar">
            <h5 className="pt-4 text-center pb-4">Search categories</h5>
            <ul className="list-group">
              <li className="list-group-item list-group-item-secondary">Search for solo devs of teams</li>
              <li className="list-group-item">Solo</li>
              <li className="list-group-item">Team</li>
            </ul>
            <ul className="list-group">
              <li className="list-group-item list-group-item-secondary">Search by skills</li>
              <li className="list-group-item">JavaScript</li>
              <li className="list-group-item active">React</li>
              <li className="list-group-item">Front End</li>
              <li className="list-group-item">Back End</li>
              <li className="list-group-item">Node.js</li>
              <li className="list-group-item">Express.js</li>
              <li className="list-group-item">Vue.js</li>
              <li className="list-group-item active">UI/UX</li>
            </ul>
          </div>

          <div className="col-9 main">

            <div>
              <form>
                <div className="form-group row justify-content-between">
                  <label htmlFor="inputSearch" className="col-6 col-form-label pb-0">
                    <h3>{this.state.isToggleOn ? 'Find a non-profit.' : 'Find a user.'}</h3>
                  </label>
                  <div className="col-6 text-right pt-2 pb-0">
                    <input type="text" className="form-control" placeholder={this.state.isToggleOn ? 'Search for a non-profit' : 'Search for a user'} required />
                  </div>
                </div>
              </form>
            </div>

            <button onClick={this.handleClick} className="btn btn-link pt-0">
              {this.state.isToggleOn ? 'Show me devs!' : 'Show me non-profits!'}
            </button>

            <div>
              <ul className="list-group">
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-6">
                      <img src={genericlogo} alt="Logo" className="float-left search__result__logo" />
                      <h5 className="pt-3">Habitat for Humanity</h5>
                    </div>
                    <div className="col-6">
                      <ul className="list__inline pt-3">
                        <li>Need:</li>
                        <li>DEV</li>
                        <li>DESIGN</li>
                      </ul>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <p>Seeking to put God's love into action, Habitat for Humanity brings people together to build homes, communities, and hope.
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <ul className="list__inline list__border">
                          <li>JavaScript</li>
                          <li>React.js</li>
                          <li>Front End</li>
                          <li>Node.js</li>
                          <li>Express.js</li>
                          <li>Back End</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-6">
                      <img src={genericlogo} alt="Logo" className="float-left search__result__logo" />
                      <h5 className="pt-3">Doctors Without Borders</h5>
                    </div>
                    <div className="col-6">
                      <ul className="list__inline pt-3">
                        <li>Need:</li>
                        <li>DEV</li>
                      </ul>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <p>We help people worldwide where the need is greatest, delivering emergency medical aid to people affected by conflict, epidemics, disasters, or exclusion from healthcare.
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <ul className="list__inline list__border">
                          <li>Node.js</li>
                          <li>Express.js</li>
                          <li>Back End</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-6">
                      <img src={genericlogo} alt="Logo" className="float-left search__result__logo" />
                      <h5 className="pt-3">Greenpeace</h5>
                    </div>
                    <div className="col-6">
                      <ul className="list__inline pt-3">
                        <li>Need:</li>
                        <li>DEV</li>
                      </ul>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <p>Greenpeace is an independent campaigning organisation, which uses non-violent, creative confrontation to expose global environmental problems, and to force the solutions which are essential to a green and peaceful future.
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <ul className="list__inline list__border">
                          <li>Front End</li>
                          <li>JavaScript</li>
                          <li>React.js</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    )
  }

}

export default Search
