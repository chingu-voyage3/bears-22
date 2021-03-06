import React, { Component } from 'react'

class Footer extends Component {
  getYear = () => new Date().getFullYear()
  render() {
    return (
      <div className="footer mb-auto">
        <span>{this.getYear()} DOUM. All rights reserved.</span>
      </div>
    )
  }
}

export default Footer
