import React, { Component } from 'react'
import Downshift from 'downshift'
import { connect } from 'react-redux'

class SearchBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="searchbar">
        <Downshift
          onChange={this.props.onChange}
          onInputValueChange={this.props.onInputValueChange}
          render={({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            selectedItem,
            highlightedIndex
          }) => (
            <div>
            <span className={(!isOpen && this.props.inputValue === "")? "d-none" : "search__close"} onClick={this.props.resetSearch}><i className="fa fa-times"></i></span>
              <input
                type="search"
                className="form-control"
                {...getInputProps({ placeholder: this.props.placeholder })}
                value={this.props.inputValue}
                required
              />
              {isOpen ? (
                <div className="search__popup">
                  {[...new Set(this.props.items)] // get unique values using "set"
                    .filter(
                      i =>
                        !inputValue ||
                        i.toLowerCase().includes(inputValue.toLowerCase())
                    )
                    .map((item, index) => (
                      <div
                        {...getItemProps({ item })}
                        key={item}
                        style={{
                          backgroundColor:
                            highlightedIndex === index ? 'gray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal'
                        }}
                      >
                        {item}
                      </div>
                    ))}
                </div>
              ) : null}
            </div>
          )}
        />
      </div>
    )
  }
}

export default SearchBar
