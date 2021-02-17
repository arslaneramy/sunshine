const express = require('express');
const eventRouter = express.Router();
const User = require('./../models/user-model');
const Event = require('./../models/event-model');
const {
    isLoggedIn
} = require('./../utils/middleware');
eventRouter.get("/", (req, res, next) => {
    Event.find()
        .then((allEvents) => {
            res.render("events-views/index", {
                allEvents
            });
        })
        .catch((error) => {
            console.log(error)
            res.redirect('/events');
        });
});
// we neeed a event view, there will be a button to create an event, and when clicked, we would go to the view whith the form to create the new event
eventRouter.get("/create", isLoggedIn, (req, res, next) => {
    res.render('events-views/new-event')
});
eventRouter.post("/create", isLoggedIn, (req, res, next) => { // new
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
        .then(event => {
            console.log(event, 'evetttt')
            res.status(200).redirect(`/events/${event._id}`);
          })
          .catch(error => {
            next(error);
          });
});

<<<<<<< HEAD
=======

// eventRouter.get("/:id", (req, res, next) => {
//     //res.send("hooooopoooo")
//     res.render('events-views/list', {event})
// });

>>>>>>> 3a540a883c7a2446d75bf091ab6ae16deda8e7a6
eventRouter.get("/list", (req, res, next) => {
    Event.find()
    .then(event => {
        console.log(event, 'hihihi')
        res.render("events-views/list", {event})
    })
    .catch(error => {
        next(error);
    });
})


eventRouter.get("/:id", (req, res, next) => {
    //res.send("hooooopoooo")
    res.render('events-views/list')
});



// eventRouter.post('/:eventId/edit', isLoggedIn, (req, res, next) => {
//     const eventId = req.params.eventId;
//     const {
//         name,
//         description,
//         location,
//         picture,
//         email
//     } = req.body;
//     let event;
//     //console.log(req.body);
//     Event.findOne({
//             _id: eventId,
//             creator: req.user._id
//         })
//         .then(doc => {
//             event = doc.toObject();
//             if (req.file) {
//                 photo = req.file.url;
//             } else {
//                 photo = event.photo;
//             }
//             //console.log(photo);
//             return Event.findByIdAndUpdate({
//                 _id: eventId
//             }, {
//                 /*add here*/
//             });
//         })
//         .then(result => {
//             //console.log('result', result);
//             res.redirect(`/event/${eventId}`);
//         })
//         .catch(error => {
//             next(error);
//         });
// });
// eventRouter.post("/edit/:id", isLoggedIn, (req, res, next) => {
//     const {
//         id
//     } = req.params.id;
//     const {
//         data
//     } = req.body;
//     Event.findByIdAndUpdate(id, data)
//         .then((event) =>  {
//             res.render('events-views/details-event')
//         })
//         .catch((error) => console.log(error));
// })
// eventRouter.post("/delete/:id", (req, res, next) => {
//     const {
//         id
//     } = req.params.id;
//     Event.findByIdAndRemove()
//         .then(() => res.redirect('/events'))
//         .catch((err) => console.log(err));
// })
module.exports = eventRouter;