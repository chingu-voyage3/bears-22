import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Transition } from 'react-transition-group';

import SearchBar from './SearchBar';
import SearchFilter from './SearchFilter';
import SearchUser from './SearchUser';

//  query searchQuery($search: String!) {
const searchQuery = gql`
query searchQuery($skills: [String]) {
    skills {
      id
      name
    },
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
    projects(limit: 100, skills: $skills) {
    id
    title
    description
    skills {
      id
      name
    }
    users {
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
    }
  }
}
`;

class Search extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isSearchToggleOn: true,
      isSearchFilterOpen: true,
      selectedItem: '',
      search: 'projects',
      inputValue: ''
    };
  }

  handleSearchToggleClick = () => {
    const search = () =>
      this.state.search === 'projects' ? 'users' : 'projects';
    this.setState(prevState => ({
      isSearchToggleOn: !prevState.isSearchToggleOn,
      search: search(),
      selectedItem: '',
      inputValue: ''
    }));
  };

  handleSearchFilterClick = () => {
    this.setState(prevState => ({
      isSearchFilterOpen: !prevState.isSearchFilterOpen
    }));
  };

  onChange = selectedItem => {
    this.setState((prevState, props) => ({
      selectedItem
    }));
  };

  onInputValueChange = (e, i) => {
    console.log(e);
    this.setState({
      inputValue: String(e)
    });
  };

  resetSearch = () => {
    this.setState((prevState, props) => ({
      selectedItem: '',
      inputValue: ''
    }));
    this.props.data.refetch();
  };

  render () {
    const { data } = this.props;
    return (

      <div className="d-flex search">

          <div className={this.state.isSearchFilterOpen? "d-none" : "filter__list"}>
          <SearchFilter
            isSearchFilterOpen={this.state.isSearchFilterOpen}
            data={data}
          />
          </div>

      <div className={this.state.isSearchFilterOpen? "container section--dark" : "container section--dark filter--translate"}>
        <div>
          <div>
            <div>
              <form>
                <div className="form-group d-flex flex-column flex-md-row align-items-center justify-content-center pt-3">
                  <div className="section__feature">
                  <i className={this.state.isSearchToggleOn ? 'fa fa-book icon mb-0' : 'fa fa-users icon mb-0'}></i>
                  </div>
                  <div className="col-xs-12 col-md-6 p-0 p-md-4 mt-4 mb-2 mt-md-0 mb-md-0">
                    <SearchBar
                      placeholder={
                        this.state.isSearchToggleOn ? (
                          'Search projects'
                        ) : (
                          'Search users'
                        )
                      }
                      items={
                        data[this.state.search] &&
                        data[this.state.search].map(
                          item => item.title || item.first_name
                        )
                      }
                      onChange={this.onChange}
                      onInputValueChange={this.onInputValueChange}
                      search={this.state.search}
                      inputValue={this.state.inputValue}
                      data={data}
                      resetSearch={this.resetSearch}
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="d-flex flex-column flex-xl-row justify-content-center align-items-center pb-2">
            <span
              onClick={this.handleSearchToggleClick}
              className="search__toggle btn"
            >
              <i className="fa fa-refresh" aria-hidden="true" />
              {this.state.isSearchToggleOn ? 'Get users' : 'Get projects'}
            </span>

            <span
              onClick={this.handleSearchFilterClick}
              className="search__toggle btn"
            >
              <i className="fa fa-filter" aria-hidden="true" />
              {this.state.isSearchFilterOpen ? 'Show Filters' : 'Hide Filters'}
            </span>
            </div>



          </div>

          <div
            className={
              this.props.filter.skills &&
              this.props.filter.skills.length > 0 ? (
                'filter__item--grid'
              ) : (
                'd-none'
              )
            }
          >
            Filtered:{' '}
            {this.props.filter.skills && this.props.filter.skills.length > 0 ? (
              this.props.filter.skills.map(item => (
                <div className="filter__item--filtered" key={item}>
                  {item}
                </div>
              ))
            ) : (
              ''
            )}
          </div>
          <div>
            <SearchUser
              search={this.state.search}
              data={data}
              selectedItem={this.state.selectedItem}
              resetSearch={this.resetSearch}
            />
          </div>
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.getUserInfo.userInfo,
    filter: state.getFilter.filter
  };
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     updateData: e => {
//       this.props.data.refetch();
//     }
//   }
// }

export default connect(mapStateToProps)(
  graphql(searchQuery, {
    options: ownProps => ({
      variables: {
        search: ownProps.search,
        skills: ownProps.filter.skills
      }
    })
  })(Search)
);
