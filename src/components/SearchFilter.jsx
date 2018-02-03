import React, { Component } from 'react'
import { connect } from 'react-redux'
import { watchFilter } from '../actions'
import { CSSTransitionGroup, Transition, TransitionGroup } from "react-transition-group";

class SearchFilter extends Component {
  constructor(props) {
    super(props)
  }

  isFiltered = e => {
    if (this.selectedSkills.has(e.target.id)) {
      this.selectedSkills.delete(e.target.id)
    } else {
      this.selectedSkills.add(e.target.id)
    }
    console.log(this.selectedSkills)
    this.props.updateData({
      skills: [...this.selectedSkills],
      country: this.props.country
    })
  }

  componentWillMount = () => {
    this.selectedSkills = new Set()
  }

  render() {
    const { data } = this.props
    return (
      <Transition timeout={300}>
      <div className={this.props.isSearchFilterOpen ? 'd-none' : 'pb-2 fade-in-out filter__list'}>
          <span className="filter__title">Search by skills</span>
          {data.skills ? (
            data.skills.map(item => (
              <div key={item.id} className="filter__item">
                <input
                  onClick={this.isFiltered}
                  id={item.name}
                  type="checkbox"
                  name={item.name}
                  value={item.name}
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateData: e => {
      console.log(e)
      dispatch(watchFilter(e))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter)
