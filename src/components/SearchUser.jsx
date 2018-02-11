import React, { Component } from 'react'
import { Transition } from 'react-transition-group'

class SearchUser extends Component {
  getItemList = (item) => {
      if(this.props.search === 'projects') {
        return {
            name: item.title,
            desc: item.description,
            skills: item.skills,
            text: 'This project still does not have any introductions.'
        };
      } else {
        return {
            name: item.first_name + ' ' + item.last_name,
            desc: item.bio,
            skills: item.skills,
            text: 'This user does not have any self introductions.'
        };
      }
  }
  render() {
    const { data } = this.props;
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
                      (this.getItemList(item).name &&
                        this.getItemList(item).name.match(this.props.selectedItem))
                  )
                  .map((item, index) => (
                    <div
                      className="search__user d-flex flex-column"
                      key={this.props.search + '-' + index}
                    >
                      <div className="d-flex flex-row align-items-center justify-content-center">
                        <span className="search__thumbnail">
                          {this.getItemList(item).name && this.getItemList(item).name.slice(0, 1)}
                        </span>
                        <div className="search__title__grid">
                          <span className="search__result__title">
                            {this.getItemList(item).name && this.getItemList(item).name}
                          </span>
                          <div>
                            <ul className="list__inline list__border">
                              {item.skills && item.skills.length > 0 ? (
                                item.skills.map(item => (
                                  <li
                                    key={item.name + ' ' + item.id}
                                  >
                                    {item.name}
                                  </li>
                                ))
                              ) : (
                                <li key="Not Specified">Not Specified</li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="search__desc">
                        {this.getItemList(item).desc? this.getItemList(item).desc : this.getItemList(item).text}
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
        <p className="text-center">Cannot receive any data right now. Please try again later.</p>
        <span
              onClick={this.props.resetSearch}
              className="search__toggle--refresh btn btn-link"
            ><i className="fa fa-refresh"></i> Refresh
            </span>
        </div>
        )
    }
  }
}

export default SearchUser
