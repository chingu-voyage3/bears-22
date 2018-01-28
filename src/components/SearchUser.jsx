import React, { Component } from 'react'

class SearchUser extends Component {
  render() {
    const { data } = this.props
    if (this.props.search === 'users') {
      return (
        <div className="search__user__grid">
          {!data.loading ? (
            data[this.props.search] &&
            data[this.props.search]
              .filter(item => item.first_name.match(this.props.selectedItem))
              .map((item, index) => (
                <div
                  className="search__user d-flex flex-column"
                  key={this.props.search + '-' + index}
                >
                  <div className="d-flex flex-row align-items-center justify-content-center">
                    <span className="search__thumbnail">
                      {item.first_name.slice(0, 1)}
                    </span>
                    <div className="search__title__grid">
                      <span className="search__result__title">
                        {item.first_name + ' ' + item.last_name}
                      </span>
                      <div>
                        <ul className="list__inline list__border">
                          <li>Node.js</li>
                          <li>Express.js</li>
                          <li>Back End</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="search__desc">
                    {item.bio
                      ? item.bio
                      : 'This user does not have any self introductions.'}
                  </div>
                </div>
              ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      )
    } else if (this.props.search === 'projects') {
      return (
        <div className="search__user__grid">
          {!data.loading ? (
            data[this.props.search] &&
            data[this.props.search]
              .filter(item => item.title.match(this.props.selectedItem))
              .map((item, index) => (
                <div
                  className="search__user d-flex flex-column"
                  key={this.props.search + '-' + index}
                >
                  <div className="d-flex flex-row align-items-center justify-content-center">
                    <span className="search__thumbnail">
                      {item.title.slice(0, 1)}
                    </span>
                    <div className="search__title__grid">
                      <span className="search__result__title">
                        {item.title}
                      </span>
                      <div>
                        <ul className="list__inline list__border">
                          <li>Node.js</li>
                          <li>Express.js</li>
                          <li>Back End</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="search__desc">
                    {item.description
                      ? item.description
                      : 'This project still does not have any description.'}
                  </div>
                </div>
              ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      )
    }
  }
}

export default SearchUser
