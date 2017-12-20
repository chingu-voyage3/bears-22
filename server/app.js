// Imports
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')

const api = require('./routes/api')
const auth = require('./routes/auth')
const passportSetup = require('./config/passport-setup')
const keys = require('./config/keys')
const data = require('./data.json')

// Set up express app
const app = express()

// Set up middlewares
app.use(cors())
app.use(bodyParser.json())

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

app.use('/api', api);
app.use('/auth', auth)

// Listen for requests on port 8080
const PORT = process.env.port || 8080
app.listen(PORT, () => {
  console.log(`Sever running at http://localhost:${PORT} ... `)
})
