const express = require('express');
const authRouter = express.Router();
const User = require('./../models/user-model');

const bcrypt = require("bcrypt");
const saltRounds = 10;

authRouter.get("/signup", async (req, res, next) => {
    res.render("auth-views/signup-form");
});


    authRouter.post("/signup", async (req, res, next) => {
    try {
        const {
            email,
            name,
            password
        } = req.body;
    
        if (name === "" || password === "" || email === "") {
        throw new Error("Please enter name, email and password");
        }
    

    const user = await User.findOne({
            name
        })
 

            if (user !== null) {
             throw new Error("There was an error, try again");
            }

         
            const salt = await bcrypt.genSaltSync(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);


            const createdUser = await User.create({
                    email,
                    name,
                    password: hashedPassword
                })
                
                    
                    
                    res.redirect('/');
                }
                catch(error) {
               
                    res.render('auth-views/signup-form', {
                        errorMessage: error.message
                    });
                }

            });



authRouter.get('/login', (req, res, next) => {
    res.render('auth-views/login-form');
});

authRouter.post('/login', async (req, res, next) => {
    try {
        const {
        email,
        password
    } = req.body;

    if (email === "" || password === "") {
        throw new Error ("Please enter email and password");
            }

            const user = await User.findOne({ email });

            if(!user){
                throw new Error("Indicate username and password");
            }

            const passwordCorrect = await bcrypt.compare(password, user.password);
    
    if (passwordCorrect) {
        req.session.currentUser = user;
        res.redirect('/');
    } else {
        throw new Error("Indicate email and password");
    }
    
} catch(error) {
    res.render("auth-views/login-form", { errorMessage : error.message });
}

})
    
           
// logout 

authRouter.get('/logout', (req, res, next) => {
    req.session.destroy(function (err) {
        if (err) {
            next(err)
        } 
        else {
            res.redirect('/auth/login')
        }
    })
})

module.exports = authRouter;