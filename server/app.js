// Imports
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const cookieSession = require('cookie-session')

const api = require('./routes/api')
const auth = require('./routes/auth')
const passportSetup = require('./config/passport-setup')
const keys = require('./config/keys')
const data = require('./data.json')

// Set up express app
const app = express()

// Set up middlewares
app.use(cors())

//Set up session handling
app.use(
  cookieSession({
    maxAge: 60 * 60 * 1000, //Expires in an hour
    keys: [keys.session.encryptionKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

//Connect to mongodb
mongoose.Promise = global.Promise
const connection = mongoose
  .connect(keys.mongodb.dbURI, {
    useMongoClient: true
  })
  .then(() => {
    console.log('Connected to mongodb!')
  })

// app.use(express.static('public')); // Serve static files

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

// Listen for requests on port 8080
const PORT = process.env.port || 8080
app.listen(PORT, () => {
  console.log(`Sever running at http://localhost:${PORT} ... `)
})
