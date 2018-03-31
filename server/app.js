const express = require('express')
const cors = require('cors')
const passport = require('passport')
const cookieSession = require('cookie-session')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')
const mongoose = require('mongoose')
require('dotenv').config()
const api = require('./routes/api')
const auth = require('./routes/auth')
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

const authRouter = require('./authRouter')
app.use('/', authRouter)

/*
// Set up routes
app.get('/users', (req, res) => {
  res.send(data)
})

app.get('/profile', (req, res) => {
  if (req.user) res.send(req.user)
  else res.send('Not logged in')
})

// app.use('/api', api);
app.use('/auth', auth)


*/

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
  console.log(`Server is listening on port http://localhost:${PORT}`)
})
