const express = require('express');
const router = express.Router();
const {
    isLoggedIn
} = require("./../utils/middleware");
const User = require('./../models/user-model');
const Event = require('./../models/event-model');

// we neeed a event view, there will be a button to create an event, and when clicked, we would go to the view whith the form to create the new event
router.get("/new", isLoggedIn, (req, res, next) => res.render('new-event'));

router.post("/create", (req, res, next) => {
    const {
        name,
        description,
        location,
        picture,
        email
    } = req.body;

    Event.create({
            name,
            description,
            location,
            picture,
            email
        })
        .then((event) => {
            console.log(event); // log it to check how id is called
            const userId = req.session.currentUser._id;
            User.findById(userId)
                .then(user => {
                    user.createEvent.push(event._id)
                })
            res.redirect("/event-details");
        })
        .catch((error) => console.log(error));
})

