const express = require('express');
const router = express.Router();
const Event = require('./../models/event-model');
const {isLoggedIn} = require('./../utils/middleware');

router.get("/", (req, res, next) => {
    Event.find()
      .then((allEvents) => {
        res.render("events-views/index", {allEvents});
      })
      .catch((error) => {
        console.log(error)
        res.redirect('/events');
      });
  });

// we neeed a event view, there will be a button to create an event, and when clicked, we would go to the view whith the form to create the new event
router.get("/create", isLoggedIn, (req, res, next) => res.render('events-views/new-event'));

router.post("/create", (req, res, next) => { // new
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
            res.render("events-views/details-event", {
                event
            });
        })
        .catch((error) => console.log(error));
})

router.get("/edit/:id", (req, res, next) => {
    const {
        id
    } = req.params;

    Event.findById(id)
        .then((event) => res.render('events-views/edit-event', {
            event
        }))
        .catch((error) => console.log(error));
})

router.post("/edit/:id", (req, res, next) => {
    const { id } = req.params.id;
    const { data } = req.body;

    Event.findByIdAndUpdate(id, data)
    .then((event) => res.render('events-views/details-event', {
        event
    }))
    .catch((error) => console.log(error));})

router.post("/delete/:id", (req, res, next) => {
    const {id} = req.params.id;
    Event.findByIdAndRemove()
    .then(() => res.redirect('/events'))
    .catch((err) => console.log(err));
})

module.exports = router;