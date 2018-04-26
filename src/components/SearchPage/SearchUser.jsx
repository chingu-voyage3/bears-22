import React, { Component } from 'react'
import { Transition } from 'react-transition-group'

class SearchUser extends Component {
  getItemList = item => {
    if (this.props.search === 'projects') {
      return {
        name: item.title,
        desc: item.description,
        skills: item.skills,
        text: 'This project still does not have any introductions.'
      }
    } else {
      return {
        name: item.first_name + ' ' + item.last_name,
        desc: item.bio,
        skills: item.skills,
        country: item.country,
        text: 'This user does not have any self introductions.'
      }
    }
  }
  render() {
    const { data } = this.props
    if (data.loading) {
      return (
        <div className="loading-animation">
          <div className="spots">
            <div className="spot-1" />
            <div className="spot-2" />
            <div className="spot-3" />
            <div className="spot-4" />
          </div>
        </div>
      )
    } else if (!data.loading && data.networkStatus === 7) {
      return (
        <Transition timeout={500}>
          <div
            className={
              this.props.search === 'users'
                ? 'search__user__grid fade-in-out'
                : 'search__user__grid fade-in'
            }
          >
            {!data.loading
              ? data[this.props.search] &&
                data[this.props.search]
                  .filter(
                    item =>
                      this.getItemList(item).name &&
                      this.getItemList(item).name.match(this.props.selectedItem)
                  )
                  .map((item, index) => (
                    <div
                      className="search__user d-flex flex-column flex-md-row section--black justify-content-md-start"
                      key={this.props.search + '-' + index}
                    >
                      <div className="d-flex flex-row flex-md-column align-items-center justify-content-left justify-content-md-center search__user--name">
                        <span className="search__thumbnail mr-3 mr-md-0 mb-2">
                          {this.getItemList(item).name &&
                            this.getItemList(item).name.slice(0, 1)}
                        </span>
                        <div className="search__title__grid">
                          <span className="search__result__title">
                            <p className="mb-0">
                              {this.getItemList(item).name &&
                                this.getItemList(item).name}
                            </p>
                          </span>
                          {this.getItemList(item).country ? (
                            <p>{this.getItemList(item).country.name}</p>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-column justify-content-start search__user--desc">
                        <div className="d-flex flex-column flex-sm-row">
                          <span className="search__title--yellow">About: </span>
                          <span className="search__desc">
                            <p className="m-0">
                              {this.getItemList(item).desc
                                ? this.getItemList(item).desc.length > 200
                                  ? this.getItemList(item).desc.slice(0, 200) +
                                    ' ...'
                                  : this.getItemList(item).desc
                                : this.getItemList(item).text}
                            </p>
                          </span>
                        </div>
                        <div className="d-flex flex-column flex-sm-row">
                          <span className="search__title--yellow col-xs-2">
                            Skills:{' '}
                          </span>
                          <div className="list__inline">
                            {item.skills && item.skills.length > 0 ? (
                              item.skills.map(item => (
                                <span
                                  key={item.name + ' ' + item.id}
                                  title={item.name}
                                  onClick={this.props.isFiltered}
                                >
                                  {item.name}
                                </span>
                              ))
                            ) : (
                              <span
                                key="Not Specified"
                                title="Not Specified"
                                onClick={this.props.isFiltered}
                              >
                                Not Specified
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              : ''}
          </div>
        </Transition>
      )
    } else {
      return (
        <div className="search__err">
          <p className="text-center">
            Cannot receive any data right now. Please try again later.
          </p>
          <span
            onClick={this.props.resetSearch}
            className="search__toggle--refresh btn btn-link"
          >
            <i className="fa fa-refresh" /> Refresh
          </span>
        </div>
      )
    }
  }
}

export default SearchUser
