import React, { Component } from 'react'

class SearchUser extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { data } = this.props;
    if(this.props.search === 'users') {
      return (
        <div className="search__user">
        <ul className="list-group">
        {!data.loading ? (data[this.props.search] && 
          data[this.props.search]
          .filter(item => item.first_name.match(this.props.selectedItem))
          .map((item, index) => (
            <li className="list-group-item mb-4" key={index}>
            <div className="row">
            <div className="col-xs-12 col-sm-8 search__result d-flex align-items-center">
            <span className="search__thumbnail" key={index}>{item.first_name.slice(0,1) }</span>
            <span className="search__result__title">{item.first_name } {item.last_name }</span>
            </div>
            <div className="col-xs-12 col-sm-4">
            </div>
            <div className="col-12">
            <p className="search__desc">
            {item.bio ? item.bio : 'This user still does not have any self introduction yet.'}
            </p>
            <ul className="list__inline list__border">
            <li>Node.js</li>
            <li>Express.js</li>
            <li>Back End</li>
            </ul>
            </div>
            </div>
            </li>))) : (
        <div>Loading...</div>
        )}

            </ul>
            </div>
            )
    } else if (this.props.search === 'projects') {
      return (
        <div>
        <ul className="list-group">
        {!data.loading ? (data[this.props.search] && 
          data[this.props.search]
          .filter(item => item.title.match(this.props.selectedItem))
          .map((item, index) => (
            <li className="list-group-item mb-4" key={index}>
            <div className="row">
            <div className="col-xs-12 col-sm-8 search__result d-flex align-items-center">
            <span className="search__thumbnail" key={index}>{item.title.slice(0,1) }</span>
            <span className="search__result__title">{item.title}</span>
            </div>
            <div className="col-xs-12 col-sm-4">
            </div>
            <div className="col-12">
            <p className="search__desc">
            {item.description ? item.description : 'This project still does not have any description yet.' || item.bio ? item.bio : 'This project still does not have any description yet.'}
            </p>
            <ul className="list__inline list__border">
            <li>Node.js</li>
            <li>Express.js</li>
            <li>Back End</li>
            </ul>
            </div>
            </div>
            </li>))) : (
        <div>Loading...</div>
        )}

            </ul>
            </div>
            )
    }

  }
}

export default SearchUser