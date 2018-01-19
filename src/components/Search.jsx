import React, { Component } from 'react'
import { connect } from 'react-redux'
import u14 from './temp_assets/u14.png'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import SearchBar from './SearchBar'
import SearchFilter from './SearchFilter'

//  query searchQuery($search: String!) {
const searchQuery = gql`
  query {
    user(user_id: 1) {
      id
      username
      first_name
      email
      bio
      skills {
        id
        name
      }
    }
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
      skills {
        id
        name
      }
    }
  }
`

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSearchToggleOn: true,
      isSearchFilterOpen: true,
      selectedItem: '',
      search: 'projects'
    }
    this.handleSearchToggleClick = this.handleSearchToggleClick.bind(this)
    this.handleSearchFilterClick = this.handleSearchFilterClick.bind(this)
    this.onChange = this.onChange.bind(this)
    this.resetSearch = this.resetSearch.bind(this)
  }

  handleSearchToggleClick() {
    const search = () => (this.state.search == 'projects' ? 'user' : 'projects')
    this.setState(prevState => ({
      isSearchToggleOn: !prevState.isSearchToggleOn,
      search: search()
    }))
    document.getElementById('search__title').classList.add('flip-animation')
    setTimeout(
      () =>
        document
          .getElementById('search__title')
          .classList.remove('flip-animation'),
      500
    )
  }

  handleSearchFilterClick() {
    this.setState(prevState => ({
      isSearchFilterOpen: !prevState.isSearchFilterOpen
    }))
  }

  onChange(selectedItem) {
    this.setState((prevState, props) => ({
      selectedItem
    }))
  }

  resetSearch() {
    this.setState((prevState, props) => ({
      selectedItem: ''
    }))
    this.props.data.refetch()
  }

  render() {
    const { data } = this.props
    return (
      <div className="container-fluid">
        <div className="row">
          <SearchFilter isSearchFilterOpen={this.state.isSearchFilterOpen} />
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
                    <h3 id="search__title">
                      {this.state.isSearchToggleOn
                        ? 'Find projects.'
                        : 'Find users.'}
                    </h3>
                  </label>
                  <div className="col-6 text-right pt-2 pb-0">
                    <SearchBar
                      placeholder={
                        this.state.isSearchToggleOn
                          ? 'Search projects'
                          : 'Search users'
                      }
                      items={
                        data.projects && data.projects.map(item => item.title)
                      }
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="pb-2">
              <p
                onClick={this.handleSearchToggleClick}
                className="btn btn-link mb-0"
              >
                {this.state.isSearchToggleOn ? 'Get users' : 'Get projects'}
              </p>

              <p
                onClick={this.handleSearchFilterClick}
                className="btn btn-link mb-0"
              >
                {this.state.isSearchFilterOpen
                  ? 'Show Filters'
                  : 'Hide Filters'}
              </p>
            </div>

            <div>
              <ul className="list-group">
                {!data.loading ? (
                  data['projects'] &&
                  data['projects']
                    .filter(item => item.title.match(this.state.selectedItem))
                    .map((item, index) => (
                      <li className="list-group-item mb-4" key={index}>
                        <div className="row">
                          <div className="col-xs-12 col-sm-8 search__result d-flex align-items-center">
                            <span className="search__thumbnail" key={index}>
                              {item.title.slice(0, 1)}
                            </span>
                            <span className="search__result__title">
                              {item.title}
                            </span>
                          </div>
                          <div className="col-xs-12 col-sm-4">
                            <p className="search__result__need">Need:</p>
                            <img className="need__img" src={u14} alt="dev" />
                          </div>
                          <div className="col-12">
                            <p className="search__desc">
                              {item.description
                                ? item.description
                                : 'This project still does not have any description yet.'}
                            </p>
                            <ul className="list__inline list__border">
                              <li>Node.js</li>
                              <li>Express.js</li>
                              <li>Back End</li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    ))
                ) : (
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
    userInfo: state.getUserInfo.userInfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeSearchSection: e => {
      this.props.data.refetch()
    }
  }
}

export default connect(mapStateToProps)(
  graphql(searchQuery, {
    options: ownProps => ({
      variables: {
        //search: ownProps.search
      }
    })
  })(Search)
)
