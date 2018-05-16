const express = require('express')
const cors = require('cors')
const passport = require('passport')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { createServer } = require('http')
const { graphql, execute } = require('graphql')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const auth = require('./authentication/authRouter')
const passportSetup = require('./authentication/passport')

// Create GraphQL Schema
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const { makeExecutableSchema } = require('graphql-tools')
const schema = makeExecutableSchema({ typeDefs, resolvers })

const app = express()

// Cross Origin Resource Sharing
var corsOptions = {
  origin: ['http://localhost:3000', process.env.DOMAIN],
  credentials: true
}
app.use(cors(corsOptions))

// Set up session handling
app.use(
  cookieSession({
    // 24 hour session
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_COOKIE_KEY]
  })
)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Initialize Passport
require('./authentication/passport')
app.use(passport.initialize())
app.use(passport.session())
app.use('/auth', auth)

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
})

// Apollo GraphQL Server
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      user: req.user
    }
  }))
)

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
)

// Priority serve any static files.
app.use(express.static('build'))

// All remaining requests return the React app, so it can handle routing
app.route('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../build', 'index.html'))
})

// Listen for requests on port 8080
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
