const express = require('express')
const cors = require('cors')
const passport = require('passport')
const cookieSession = require('cookie-session')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const auth = require('./authRouter')
const passportSetup = require('./passport')

const app = express()

// Set up session handling
app.use(
  cookieSession({
    // 1 hour session
    maxAge: 60 * 60 * 1000,
    keys: [process.env.SESSION_COOKIE_KEY]
  })
)

// Initialize Passport
require('./passport')
app.use(passport.initialize())
app.use(passport.session())
app.use('/auth', auth)

// Cross Origin Resource Sharing
app.use(cors())
app.options('*', cors())

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
})

// GraphQL connection
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true
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
