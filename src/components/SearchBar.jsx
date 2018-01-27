import React, { Component } from 'react'
import Downshift from 'downshift'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(selectedItem) {
    console.log(selectedItem)
  }

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

export default SearchBar
