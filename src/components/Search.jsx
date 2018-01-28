import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import SearchBar from './SearchBar'
import SearchFilter from './SearchFilter'
import SearchUser from './SearchUser'

//  query searchQuery($search: String!) {
const searchQuery = gql`
query searchQuery($skills: [String]) {
  users(limit: 100, skills: $skills) {
    id
    username
    first_name
    last_name
    email
    bio
    skills {
      id
      name
    }
    country {
      id
      name
    }
    city {
      id
      name
    }
  },
  projects(limit: 100, skills: $skills){
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
  },
  skills {
    id
    name
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
      search: 'projects',
      inputValue: ''
    }
  }

  handleSearchToggleClick = () => {
    const search = () => this.state.search === 'projects' ? 'users' : 'projects';
    this.setState(prevState => ({
      isSearchToggleOn: !prevState.isSearchToggleOn,
      search: search(),
      selectedItem: '',
      inputValue: ''
    }))
    document.getElementById('search__title').classList.add('flip-animation');
    setTimeout(() => document.getElementById('search__title').classList.remove('flip-animation'), 500);
  }

  handleSearchFilterClick = () => {
    this.setState(prevState => ({
      isSearchFilterOpen: !prevState.isSearchFilterOpen
    }))
  }

  onChange = (selectedItem) => {
    this.setState((prevState, props) => ({
      selectedItem
    }));
  }

  onInputValueChange = (e, i) => {
    console.log(e);
      this.setState({
      inputValue: String(e)
    });
  }

  resetSearch = () => {
    this.setState((prevState, props) => ({
      selectedItem: ''
    }));
    this.props.data.refetch();
  }

  render() {
    const { data } = this.props;
      return (
      <div className="container-fluid no-padding">
        <div>
          <div>
            <div>
              <form>
                <div className="form-group d-flex flex-column flex-md-row">
                  <label
                    htmlFor="inputSearch"
                    className="col-xs-12 col-sm-6"
                  >
                    <h3 id="search__title">
                      {this.state.isSearchToggleOn
                        ? 'Find projects.'
                        : 'Find users.'}
                    </h3>
                  </label>
                  <div className="col-xs-12 col-md-6 text-right">
                    <SearchBar
                      placeholder={
                        this.state.isSearchToggleOn
                          ? 'Search projects'
                          : 'Search users'
                      }
                      items={data[this.state.search] && data[this.state.search].map((item) => ( item.title || item.first_name ))}
                      onChange={this.onChange}
                      onInputValueChange={this.onInputValueChange}
                      search={this.state.search}
                      inputValue={this.state.inputValue}
                      data={data}
                    />
                  </div>
                </div>
              </form>
            </div>


              <span
                onClick={this.handleSearchToggleClick}
                className="search__toggle btn btn-link"
              >
              <i className="fa fa-refresh" aria-hidden="true"></i>
                {this.state.isSearchToggleOn
                  ? 'Get users'
                  : 'Get projects'}
              </span>

              <span
                onClick={this.handleSearchFilterClick}
                className="search__toggle btn btn-link"
              >
              <i className="fa fa-filter" aria-hidden="true"></i>
                {this.state.isSearchFilterOpen
                  ? 'Show Filters'
                  : 'Hide Filters'}
              </span>
            </div>

            <SearchFilter 
            isSearchFilterOpen={this.state.isSearchFilterOpen}
            data={data}
             />
             <div className={this.props.filter.skills && this.props.filter.skills.length > 0 ? 'filter__item--grid' : 'd-none'}>
             Filtered: {this.props.filter.skills && this.props.filter.skills.length > 0 ? 
              (this.props.filter.skills.map(item => (
                <div className="filter__item--filtered" key={item}>{item}</div>
                ))) : ''
            }
             </div>
            <div>
              <SearchUser
                search={this.state.search}
                data={data}
                selectedItem={this.state.selectedItem}
                 />
               </div>

          </div>
          </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.getUserInfo.userInfo,
    filter: state.getFilter.filter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateData: e => {
      this.props.data.refetch();
    }
  }
}

export default connect(mapStateToProps)(
  graphql(searchQuery, {
    options: ownProps => ({
      variables: {
        search: ownProps.search,
        skills: ownProps.filter.skills
      }
    })
  })(Search)
)

