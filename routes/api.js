// Imports
const express = require('express');

// Set up Router
const router = express.Router();

// Routes
// Serve Index Page
router.get('/', (req, res) => {
	res.send('Serving /api');
});

// Export Routes
module.exports = router