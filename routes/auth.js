const express = require('express');
const authRouter = express.Router();
const User = require('./../models/user-model');

const bcrypt = require("bcrypt");
const saltRounds = 10;

authRouter.get("/signup", (req, res, next) => {
    res.render("auth-views/signup-form");
});

authRouter.post("/signup", (req, res, next) => {
    console.log('req.body', req.body)
    const {email, name, password } = req.body;

    if (email === "" || name === "" || password === "" ) {
        res.render(
            "auth-views/signup-form", {
                errorMessage: "Please enter a username, password and email"
            }
        );
        return;
    }

    User.findOne({
            name
        })
        .then((user) => {
            if (user !== null) {
                res.render('auth-views/signup-form', {
                    errorMessage: "There was an error, try again"
                })
                return;
            }

            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(password, salt);

            User.create({
                    name,
                    email,
                    password: hashedPassword
                })
                .then((createdUser) => {
                    req.session.currentUser = user; // Triggers creation of the session and cookie
                    res.redirect('/');
                })
                .catch((err) => {
                    console.log(err)
                    res.render('auth-views/signup-form', {
                        errorMessage: 'There was an error, please try again!'
                    })
                });
        })
        .catch((err) => next(err));

});

authRouter.get('/login', (req, res, next) => {
    res.render('auth-views/login-form');
});

authRouter.post('/login', (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    if (email === "" || password === "") {
        res.render(
            "auth-views/login-form", {
                errorMessage: "Please enter email and password"
            }
        );
        return;
    }

    User.findOne({
            email
        })
        .then((user) => {
            if (!user) {
                res.render(
                    "auth-views/login-form", {
                        errorMessage: "Indicate email and password"
                    }
                );
                return;
            }

            const passwordCorrect = bcrypt.compareSync(password, user.password);

            if (passwordCorrect) {
                req.session.currentUser = user; // Triggers creation of the session and cookie
                res.redirect('/');
            } else {

                res.render(
                    "auth-views/login-form", {
                        errorMessage: "Indicate email and password"
                    }
                );
            }

        })
        .catch((err) => next(err));
})

authRouter.get('/logout', (req, res, next) => {
    req.session.destroy(function (err) {
        if (err) {
            next(err)
        } else {
            res.redirect('/auth/login')
        }
    })
})

module.exports = authRouter;