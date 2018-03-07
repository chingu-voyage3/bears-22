import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'

class SearchFilter extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    const { data } = this.props
    return (
      <Transition timeout={300}>
        <div
          className={
            this.props.isSearchFilterOpen
              ? 'd-none'
              : ' p-2 pt-4'
          }
        >
          <span className="filter__title">Filter by skills</span>
          <i className="fa fa-times pr-2" onClick={this.props.handleSearchFilterClick} />
          {data.skills ? (
            data.skills.map(item => (
              <div key={item.id} className="filter__item">
                <input
                  onClick={this.props.isFiltered}
                  id={item.name}
                  type="checkbox"
                  name={item.name}
                  value={this.props.skills && this.props.skills.includes(item.name)}
                  title={item.name}
                />
                <label htmlFor={item.name}>{item.name}</label>
              </div>
            ))
          ) : (
            <div>Not Specified</div>
          )}
        </div>
      </Transition>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.getUserInfo.userInfo,
    filter: state.getFilter.filter,
    skills: state.getFilter.filter.skills
  }
}

export default connect(mapStateToProps)(SearchFilter)
