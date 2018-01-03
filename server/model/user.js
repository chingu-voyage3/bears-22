// Imports
var graphqlClient = require('graphql-client')
var userModules = {}

var client = graphqlClient({
  url: 'http://localhost:5000/graphql'
})
userModules.findUserByGithubEmail = function(email, cb) {
  var query = `
    query{
        user(user_email: "${email}") {
          first_name,
          last_name
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
      else cb(body.data)
    })
    .catch(function(err) {
      console.log(err.message)
      cb(null)
    })
}

// Export models
module.exports = userModules
