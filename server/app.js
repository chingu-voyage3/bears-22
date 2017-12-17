// Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const api = require('./routes/api');
// const keys = require('./config/keys');
const data = require('./data.json');

// Set up express app
const app = express();

app.use(cors());

//Connect to mongodb
// mongoose.Promise = global.Promise;
// const connection = mongoose
//   .connect(keys.mongodb.dbURI, {
//     useMongoClient: true
//   })
//   .then(() => {
//     console.log('Connected to mongodb!');
//   });

// Set up middlewares
// app.use(express.static('public')); // Serve static files

// Set up routes

const PORT = process.env.port || 8080;

app.get('/users', (req, res) => {
  res.send(data);
});

// app.use('/api', api);

// Listen for requests on port 5000
app.listen(PORT, () => {
  console.log(`Sever running at http://localhost:${PORT} ... `);
});
