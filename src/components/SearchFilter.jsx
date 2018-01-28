import React, { Component } from 'react'

class SearchFilter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
          <div
            className={
              this.props.isSearchFilterOpen
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

    )
  }
}

export default SearchFilter