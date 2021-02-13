const express = require('express');
const usersRouter = express.Router();
const User = require("../models/user-model");


/* GET users listing. */
usersRouter.get('/user/:id', function(req, res, next) {
  const userId = req.params.id;
  User.findById(userId)
  .then(
    userRes => {
      res.render( "/user", {userRes} );
      
    }
    
  )
    
  
  
});




module.exports = usersRouter;
