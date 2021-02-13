const express = require('express');
const router = new express.Router(); //new ??
const User = require("../models/user-model");
const uploader = require("./../file-uploader");//require to upload the files


/* GET users listing. */
router.get('/user/:id', function(req, res, next) {
  const userId = req.params.id;
  User.findById(userId)
  .then(
    userRes => {
      res.render( "/user", {userRes} );
      
    }  
  )
  
});

// User.findById(userId) //check userID
//   .populate()
// router.get("/profile", (req, res, next) =>{
//   const userId = req.session.user;
//   let = userData;

//   User.findById(userId)
//     //.populate()
//     .then(user => {
//       userData = user;
//       return ;
//     })
// })


router.get("/profile", (req, res, next) => {
  const userId = req.session.user;
  let
})


//upload profile picture
          //check avatar-upload
router.post("/avatar-upload", uploader.single("photo"), (req, res, next) =>{
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
router.get('/edit', (req, res, next) => {
  const id = req.session.user;
  let userData;

  User.findById(id)
    .then(document => {
      userData = document;
      console.log(userData);
      res.render('user/edit', { userData });
    })
    .catch(err =>{
      next(err);
    });
});

router.post("/edit", uploader.single("photo"), (req, res, next) =>{
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
      res.redirect("profile");
    })
    .catch(err => {
      next(err);
    });
});




module.exports = router;
