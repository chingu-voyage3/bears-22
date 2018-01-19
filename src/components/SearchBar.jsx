import React, { Component } from 'react'
import Downshift from 'downshift'
import { connect } from 'react-redux'

class SearchBar extends Component {
  constructor(props) {
    super(props)
<<<<<<< HEAD
    this.onChange = this.onChange.bind(this)
  }

  onChange(selectedItem) {
    console.log(selectedItem)
  }
=======
  }

  render() {
    return (
      <div className="searchbar">
        <Downshift
          onChange={this.props.onChange}
          render={({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            selectedItem,
            highlightedIndex
          }) => (
          <div>
              <input
                type="search"
                className="form-control"
                {...getInputProps({ placeholder: this.props.placeholder })}
                required
              />
              {isOpen ? (
                <div style={{ border: '1px solid #ccc' }}>
                  {this.props.items
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
>>>>>>> master

  render() {
    return (
      <div className="searchbar">
        <Downshift
          onChange={this.onChange}
          render={({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            selectedItem,
            highlightedIndex
          }) => (
            <div>
              <input
                className="form-control"
                {...getInputProps({ placeholder: this.props.placeholder })}
                required
              />
              {isOpen ? (
                <div style={{ border: '1px solid #ccc' }}>
                  {this.props.items
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

<<<<<<< HEAD
export default SearchBar
=======
export default SearchBar
>>>>>>> master
