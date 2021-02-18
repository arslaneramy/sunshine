const express = require('express');
const usersRouter = express.Router();
const User = require("../models/user-model");
const uploader = require("./../file-uploader");//require to upload the files

/* GET users listing. */
usersRouter.get('/profile', (req, res, next) => {
  const userId = req.session.user;
  let userData;

  User.findById(userId)
  .then(
    user => {
      userData = user
      res.render( "profile/user", {user: userData} );// <-- call by name
    }
  )
  .catch(err => {
    next(err);
  })
});


// User.findById(userId) //check userID
//   .populate()
// usersRouter.get("/profile", (req, res, next) =>{
//   const userId = req.session.user;
//   let = userData;

//   User.findById(userId)
//     //.populate()
//     .then(user => {
//       userData = user;
//       return ;
//     })
// })

<<<<<<< HEAD
=======


>>>>>>> develop
usersRouter.get("/profile", (req, res, next) => {
  const userId = req.session.user;
  let
})

//upload profile picture
          //check avatar-upload
usersRouter.post("/avatar-upload", uploader.single("photo"), (req, res, next) =>{
  const photoUrl = req.file.url;

  User.findByIdAndUpdate(req.session.user, { photoUrl })
    .then(() =>{
      res.redirect('profile'); //<-- check profile redirect
    })
    .catch(err =>{
      next(err);
    });
});

//check edit route
usersRouter.get('/profile/edit', (req, res, next) => {
  const id = req.session.user;
  let userData;

  User.findById(id)
    .then(document => {
      userData = document;
      console.log(userData);
      res.render('profile/edit', { userData });
    })
    .catch(err =>{
      next(err);
    });
});

usersRouter.post("/edit", uploader.single("photo"), (req, res, next) =>{
  const id = req.session.user;
  const user = {
    name: req.body.name,
    //add a date??
  }

  if (req.file && req.file.url) {
    user.photoUrl = req.file.url;
  }

  User.findByIdAndUpdate(id, user)
    .then(() => {
      res.redirect("/profile");
    })
    .catch(err => {
      next(err);
    });
});

module.exports = usersRouter;