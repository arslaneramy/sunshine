const express = require('express');
const router = express.Router();
const User = require("../models/user-model");


/* GET users listing. */
router.get('/user/:id', function(req, res, next) {
  const userId = req.params.id;
  User.findById(userId)
  .then(
    userRes => {
      res.render("/user", {userRes});
    }
    
  )
    
  
  
});




module.exports = router;
