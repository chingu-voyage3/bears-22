import React, { Component } from 'react'
import { connect } from 'react-redux'
import genericlogo from './temp_assets/generic-logo.jpg'
import u14 from './temp_assets/u14.png'
import u16 from './temp_assets/u16.png'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import SearchBar from './SearchBar'
//  query searchQuery($search: String!) {
const searchQuery = gql`
  query {
  projects {
    id
    title
    users {
      id
      username
      first_name
      email
    }
    github_url
    project_url
    description
  } 
  }
`

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSearchToggleOn: true,
      isSearchFilterOpen: true
    }
    this.handleSearchToggleClick = this.handleSearchToggleClick.bind(this)
    this.handleSearchFilterClick = this.handleSearchFilterClick.bind(this)
  }

  handleSearchToggleClick() {
    this.setState(prevState => ({
      isSearchToggleOn: !prevState.isSearchToggleOn
    }))
  }

  handleSearchFilterClick() {
    this.setState(prevState => ({
      isSearchFilterOpen: !prevState.isSearchFilterOpen
    }))
  }

  render() {
    const { data } = this.props;
    console.log(data.projects);
    return (
      <div className="container-fluid">
        <div className="row">
          <div
            className={
              this.state.isSearchFilterOpen
                ? 'sidebar d-none'
                : 'sidebar col-xs-12 col-sm-3'
            }
          >
            <h5 className="pt-4 text-center pb-4">Search categories</h5>
            <ul className="list-group">
              <li className="list-group-item list-group-item-secondary">
                Search for solo devs of teams
              </li>
              <li className="list-group-item">Solo</li>
              <li className="list-group-item">Team</li>
            </ul>
            <ul className="list-group">
              <li className="list-group-item list-group-item-secondary">
                Search by skills
              </li>
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

          <div
            className={
              this.state.isSearchFilterOpen
                ? 'main col-12'
                : 'main col-xs-12 col-sm-9'
            }
          >
            <div>
              <form>
                <div className="form-group row justify-content-between">
                  <label
                    htmlFor="inputSearch"
                    className="col-xs-12 col-sm-6 col-form-label"
                  >
                    <h3 className="search__header-text-align search__responsive-text-align">
                      {this.state.isSearchToggleOn
                        ? 'Find a non-profit.'
                        : 'Find a user.'}
                    </h3>
                  </label>
                  <div className="col-6 text-right pt-2 pb-0">
                    <SearchBar
                      placeholder={
                        this.state.isToggleOn
                          ? 'Search for a non-profit'
                          : 'Search for a user'
                      }
                      items={[
                        'Habitat for Humanity',
                        'Doctors Without Borders',
                        'Greenpeace'
                      ]}
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="search__filter-buttons search__responsive-text-align pb-2">
              <button
                onClick={this.handleSearchToggleClick}
                className="btn btn-link pt-0"
              >
                {this.state.isSearchToggleOn
                  ? 'Show me devs!'
                  : 'Show me non-profits!'}
              </button>

              <button
                onClick={this.handleSearchFilterClick}
                className="btn btn-link pt-0"
              >
                {this.state.isSearchFilterOpen
                  ? 'Show Filters'
                  : 'Hide Filters'}
              </button>
            </div>

            <div>
              <ul className="list-group">
                {!data.loading ? (data.projects && data.projects.map((item, index) => (<li className="list-group-item mb-4" key={index}>
                  <div className="row">
                    <div className="col-xs-12 col-sm-6">
                      <ul className="search__result__title">
                        <li>
                          <img src={genericlogo} alt="Logo" />
                        </li>
                        <li>{item.title}</li>
                      </ul>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <ul className="search__result__need search__responsive-text-align">
                        <li>Need:</li>
                        <li>
                          <img src={u14} alt="dev" />
                        </li>
                      </ul>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <p>
                          We help people worldwide where the need is greatest,
                          delivering emergency medical aid to people affected by
                          conflict, epidemics, disasters, or exclusion from
                          healthcare.
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
                </li>))) : (
                <div>Loading...</div>
                )}

              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.getUserInfo.isLogin
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    checkLoginStatus: e => {
    }
  }
}

export default connect(mapStateToProps)(
  graphql(searchQuery, {
    options: ownProps => ({
      variables: {
        search: "1233131"
      }
    })
  })(Search)
)

