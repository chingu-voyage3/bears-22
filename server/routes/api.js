// Imports
const express = require('express')

const data = require('../data.json')
const user = require('../model/user')

// Set up Router
const router = express.Router()

// Routes
router.get('/profile', (req, res) => {
  if (req.user) 
  	res.send(req.user)
  else 
  	res.send('Not logged in')
})

router.post('/update', (req, res) => {
	console.log('Serving /update');
	id_to_update = req.user._id
	//Save req.body to DB
	user.updateUser(id_to_update, req.body).then(function(result){

		user.findUserByID(id_to_update).then(user => {
    		console.log("In api - " + user);
			res.send(user);
  		})

		
	}).catch(function(err){
		console.log(err);
		res.send("Error");
	})
	
});

router.delete('/delete', (req, res)=> {
	id_to_del = req.user._id;
	console.log("Going to delete: " + id_to_del);
	user.deleteUser(id_to_del).then(function(){
		req.logout();
		res.send("Sucessfully deleted");
	}).catch(function(err){
		console.log(err);
		res.send("Error");
	})
});

// Export Routes
module.exports = router