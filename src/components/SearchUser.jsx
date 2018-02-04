import React, { Component } from 'react'
import { Transition } from 'react-transition-group'

class SearchUser extends Component {
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
    } else if (!data.loading) {
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
                      (item.first_name &&
                        item.first_name.match(this.props.selectedItem)) ||
                      (item.title && item.title.match(this.props.selectedItem))
                  )
                  .map((item, index) => (
                    <div
                      className="search__user d-flex flex-column"
                      key={this.props.search + '-' + index}
                    >
                      <div className="d-flex flex-row align-items-center justify-content-center">
                        <span className="search__thumbnail">
                          {(item.title && item.title.slice(0, 1)) ||
                            (item.first_name && item.first_name.slice(0, 1))}
                        </span>
                        <div className="search__title__grid">
                          <span className="search__result__title">
                            {item.title ||
                              item.first_name + ' ' + item.last_name}
                          </span>
                          <div>
                            <ul className="list__inline list__border">
                              {item.skills.length > 0 ? (
                                item.skills.map(item => (
                                  <li
                                    key={
                                      item.title + '-' + item.id ||
                                      item.first_name + '-' + item.id
                                    }
                                  >
                                    {item.name}
                                  </li>
                                ))
                              ) : (
                                <li>Not Specified</li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="search__desc">
                        {item.bio
                          ? item.bio
                          : this.props.search === 'users'
                            ? 'This user does not have any self introductions.'
                            : ''}
                        {item.description
                          ? item.description
                          : this.props.search === 'projects'
                            ? 'This project still does not have any introductions.'
                            : ''}
                      </div>
                    </div>
                  ))
              : ''}
          </div>
        </Transition>
      )
    }
  }
}

export default SearchUser
