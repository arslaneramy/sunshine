//'use strict';

const User = require('./../models/user-model');

function isLoggedIn (req, res, next) {
    if (req.session.currentUser) { // if user has an authenticated cookie
      next(); 
    }                                                                 
    else {                              
        res.redirect("/auth/login");    
    }                                 
  }

  module.exports = {
    isLoggedIn
  }