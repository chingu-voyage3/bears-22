import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const projectQuery = gql`
  {
    getProjectByID(id: "5ae5f87093696724d0ea20d1") {
      title
      users {
        avatar_url
        name
      }
      needsHelp
      description
      skills
    }
  }
`

class Project extends React.Component {
  render() {
    return <p>placeholder</p>
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.getUserInfo.isLogin,
    userInfo: state.getUserInfo.userInfo
  }
}

//export default connect(mapStateToProps)(Project)

export default connect(mapStateToProps)(
  graphql(projectQuery, {
    options: ownProps => ({
      variables: {
        user_id: ownProps.userInfo.id,
        email: ownProps.userInfo.email
      }
    })
  })(Project)
)
