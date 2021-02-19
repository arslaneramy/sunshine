const express = require('express');
const eventRouter = express.Router();
const User = require('./../models/user-model');
const Event = require('./../models/event-model');
const { isLoggedIn } = require('./../utils/middleware');

// we neeed a event view, there will be a button to create an event, and when clicked...
//..., we would go to the view whith the form to create the new event
eventRouter.get("/create", isLoggedIn, (req, res, next) => {
    res.render('events-views/new-event')
});

eventRouter.post("/create", (req, res, next) => { // new
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
            email,
            host: req.session.currentUser._id
        })
        .then((event) => {
            console.log('eventInfo:', event); // log it to check how id is called
            console.log('userInfo:', req.session.currentUser);
            const userId = req.session.currentUser._id;
            User.findByIdAndUpdate(userId, {
                    $push: {
                        createEvent: event._id
                    }
                })
                .then(() => res.redirect(`/events/list`))

        }).catch((error) => console.log(error));
});

eventRouter.get("/list", (req, res, next) => {
    Event.find()
        .then(event => {
            //console.log(req.session.currentUser);
            const data = {
                eventData: event,
                user: req.session.currentUser
            }
            console.log('checking the user', data.user);
            console.log(event, 'hihihi')
            res.render("events-views/list", {
                data
            })
        })
        .catch(error => {
            next(error);
        });
});

eventRouter.get("/edit/:id", (req, res, next) => {
    const id = req.params.id;

    Event.findById(id)
        .then((event) => {
            console.log(event);
            res.render('events-views/edit', { event })}
            )
        .catch((error) => console.log(error));
})

eventRouter.post("/:id", (req, res, next) => {
    console.log("what", req.params)
    const data = req.body;

    Event.findByIdAndUpdate({ _id: req.params.id }, data )
        .then(() => res.redirect('/events/list'))
        .catch((error) => console.log(error));
})

eventRouter.get("/delete/:id", (req, res, next) => {
    const { id } = req.params;
    Event.findByIdAndRemove(id)
        .then(() => res.redirect('/events/list'))
        .catch((err) => console.log(err));
})

module.exports = eventRouter;

// eventRouter.post('/:eventId/edit', isLoggedIn, (req, res, next) => {
//     const eventId = req.params.eventId;
//     const {
//         name,
//         description,
//         location,
//         picture,
//         email,
//         activity,
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
// });

// eventRouter.post("/delete/:id", (req, res, next) => {
//     const {
//         id
//     } = req.params.id;
//     Event.findByIdAndRemove()
//         .then(() => res.redirect('/events'))
//         .catch((err) => console.log(err));
// });

// DELETE
// eventRouter.post("/create", isLoggedIn, (req, res, next) => { // new
//     const {
//         name,
//         description,
//         location,
//         picture,
//         email,
//         activity,
//     } = req.body;

//     Event.create({
//         name,
//         description,
//         location,
//         picture,
//         email,
//         activity,
//         })
//         .then(event => {
//             // console.log(event, 'evetttt')
//             res.status(200).redirect(`/events/${event._id}`);
//           })
//           .catch(error => {
//             next(error);
//           });
// });

// DELETE
// eventRouter.get("/", (req, res, next) => {
//     Event.find()
//         .then((allEvents) => {
//             res.render("events-views/index", {
//                 allEvents
//             });
//         })
//         .catch((error) => {
//             console.log(error)
//             res.redirect('/events');
//         });
// });
// })

/*eventRouter.get("/list", (req, res, next) => {
    Event.find()
        .then(event => {
            console.log(event, 'hihihi')
            res.render("events-views/list", {
                event
            })
        })
        .catch(error => {
            // console.log(event, 'evetttt')
            res.status(200).redirect(`/events/list`);
            //            res.status(200).redirect(`/events/${event._id}`);

          })
          .catch(error => {
            next(error);
        });
});*/

// eventRouter.get("/:id", (req, res, next) => {
//     //res.send("hooooopoooo")
//     res.render('events-views/list', {event})
// });

/*eventRouter.get("/:id", (req, res, next) => {
    //res.send("hooooopoooo")
    res.render('events-views/list')
});*/