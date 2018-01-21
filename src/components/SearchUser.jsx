import React, { Component } from 'react'

class SearchUser extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { data } = this.props;
    if(this.props.search === 'users') {
      return (
        <div>
        {!data.loading ? (data[this.props.search] && 
          data[this.props.search]
          .filter(item => item.first_name.match(this.props.selectedItem))
          .map((item, index) => (
            <div className="search__user d-flex flex-column">
              <div className="d-flex flex-row search__user__header">
                <span className="search__thumbnail" key={index}>{item.first_name.slice(0,1) }</span>
                <div>
                <span className="search__result__title">{item.first_name + ' ' + item.last_name}</span>
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
              {item.bio ? item.bio : 'This user does not have any self introduction.' + ' (View More...)'}
              </div>
            </div>))) : (
        <div>Loading...</div>
        )}
            </div>
       )
    } else if (this.props.search === 'projects') {
      return (
        <div className="search__user__grid">
        {!data.loading ? (data[this.props.search] && 
          data[this.props.search]
          .filter(item => item.title.match(this.props.selectedItem))
          .map((item, index) => (
            <div className="search__user d-flex flex-column">
              <div className="d-flex flex-row align-items-center justify-content-center">
                <span className="search__thumbnail" key={index}>{item.title.slice(0,1) }</span>
                <div>
                <span className="search__result__title">{item.title}</span>
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
              {item.description ? item.description : 'This project still does not have any description.'}
              </div>
            </div>))) : (
        <div>Loading...</div>
        )}
    </div>
       )
    }
  }
}

export default SearchUser