// Imports
const express = require('express');
const api = require('./routes/api');
const mongoose = require('mongoose');
const keys = require('./config/keys');

// Set up express app
const app = express();

//Connect to mongodb
mongoose.Promise = global.Promise;
var connection = mongoose.connect(keys.mongodb.dbURI, {
		useMongoClient: true,
	}).then( () => {
		console.log('Connected to mongodb!');
	});

// Set up middlewares
app.use(express.static('public'));	// Serve static files

// Set up routes
app.use('/api', api);

// Listen for requests on port 3000
app.listen(process.env.port || 3000, () => {
	console.log("Listening on port 3000... ");
});