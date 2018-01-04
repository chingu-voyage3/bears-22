// Imports
var graphqlClient = require('graphql-client')
var userModules = {}

var client = graphqlClient({
  url: 'http://localhost:5000/graphql'
})

var user_fields = `id,
email,
username,
first_name,
last_name,
bio,
linkedin_url,
portfolio_url,
website_url,
twitter_url,
blog_url,
country {
  name
},
city {
  name
}`

userModules.findUserByID = function(id, cb) {
  var query = `
    query{
        user(user_id: "${id}") {
          ${user_fields}
        }
    }`
  console.log('Query: ' + query)

  client
    .query(query, function(req, res) {
      if (res.status === 401) {
        throw new Error('Not authorized')
        cb(null)
      }
    })
    .then(function(body) {
      console.log(body)
      if (body.data.user == null) cb(null)
      else cb(body.data.user)
    })
    .catch(function(err) {
      console.log(err.message)
      cb(null)
    })
}
userModules.findUserByGithubEmail = function(email, cb) {
  var query = `
    query{
        user(email: "${email}") {
          ${user_fields}
        }
    }`
  console.log('Query: ' + query)

  client
    .query(query, function(req, res) {
      if (res.status === 401) {
        throw new Error('Not authorized')
        cb(null)
      }
    })
    .then(function(body) {
      console.log(body)
      if (body.data.user == null) cb(null)
      else cb(body.data.user)
    })
    .catch(function(err) {
      console.log(err.message)
      cb(null)
    })
}

// Export models
module.exports = userModules
