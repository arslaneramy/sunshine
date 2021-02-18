const express = require('express');
const usersRouter = express.Router();
const User = require("../models/user-model");
const uploader = require("../cloudinary.config");//require to upload the files


/* GET users listing. */
usersRouter.get('/user', (req, res, next) => {
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

// usersRouter.get("/profile", (req, res, next) => {
//   const userId = req.session.user;
//   let userData;

//   User.findById(userId)
//     .then( user =>{
//       userData = user;
//       res.render('profile/user', {user: userData});
//     })
//     .catch(err =>{
//       next(err);
//     });
// });


//upload profile picture
          //check avatar-upload
usersRouter.post("/user", uploader.single("photo"), (req, res, next) =>{
  const photoUrl = req.file.url;
  console.log('req.ses.user',req.session.userId)
  User.findByIdAndUpdate(req.session.userId, { photoUrl })
    .then(data =>{
      console.log('data',data)
      res.redirect('/profile/user'); //<-- check profile redirect
    })
    .catch(err =>{
      next(err);
    });
});

//check edit route
usersRouter.get('/edit', (req, res, next) => {
  const id = req.session.user;
  let userData;

  User.findById(id)
    .then(document => {
      userData = document;
      console.log(userData);
      res.render('/profile/edit', { userData });
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
      res.redirect("/profile/edit");
    })
    .catch(err => {
      next(err);
    });
});

usersRouter.get('/list', (req, res, next) => {
  User.find()
    .then(users =>{
      res.render ("user/list", {users});
    })
    .catch(err =>{
      next(err);
    });
});

usersRouter.get("/:userId", (req, res, next) =>{
  const userId = req.params.userId;
  let user;
  User.findById(userId)
    .then(doc =>{
      console.log('userrrrr', user);
      res.render("profile/user", {user});
    })
    .catch(err => {
      next(err);
    });
});


module.exports = usersRouter;
