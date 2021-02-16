const express = require('express');
const Event = require('./../models/event-model');
const uploader = require('./../file-uploader');
const routeGuard = require('./../utils/route-guard');

const eventRouter = new express.Router();

eventRouter.get('/create' , (req, res, next) => {
  res.render('event/create');
});

eventRouter.post('/create' , uploader.single('photo'), (req, res, next) => {
  //console.log(req.body);
  const { name,
    description,
    location,
    picture,
    email } = req.body;
  const creator = req.user._id;
  const photo = req.file.url;
  Event.create({
    name,
    description,
    location,
    picture,
    email,
    creator//delete
  })
    .then(event => {
      const eventId = event._id;
      res.redirect(`/event/${eventId}`);
    })
    .catch(error => {
      next(error);
    });
});

eventRouter.get('/list', (req, res, next) => {
  Event.find()
    .populate('event creator')//check this
    .then(events => {
      //console.log(events)
      res.render('event/list', { events });
    })
    .catch(error => {
      next(error);
    });
});

/*eventRouter.get('/search', routeGuard, (req, res, next) => {
  //console.log('searching', req.query);
  const { userLatitude, userLongitude, distance } = req.query;
  const kmToDegrees = value => value / (40000 / 360);

  Event.find()
    .where('location')
    .within()
    .circle({ center: [userLongitude, userLatitude], radius: kmToDegrees(distance) })
    .then(events => {
      res.render('event/list', { events });
    })
    .catch(error => {
      next(error);
    });
});*/

/*eventRouter.post('/:eventId/comment', routeGuard, (req, res, next) => {
  const eventId = req.params.eventId;
  Comment.create({
    description: req.body.description,
    event: eventId,
    creator: req.user._id
  })
    .then(comment => {
      //console.log('comment is saved ', comment);
      res.redirect(`/event/${eventId}`);
    })
    .catch(error => {
      next(error);
    });
});*/


//join  event
eventRouter.post('/:eventId/join/', (req, res, next) => {
  const eventId = req.params.eventId;
  const userId = req.user._id;
  Event.findById({ _id: eventId })
    .then(event => {
      //console.log('user', userId, 'joining', event, event.participants);
      if (event.participants.includes(userId)) {
        return Promise.reject(new Error('You have already joined this event'));
      } else {
        return Event.findByIdAndUpdate({ _id: eventId }, { $push: { participants: userId } });
      }
    })
    .then(() => {
      //console.log('participants updated', result);
      res.redirect(`/event/${eventId}`);
    })
    .catch(error => {
      next(error);
    });
});

/*
eventRouter.get('/:eventId/contact-owner', (req, res, next) => {
  Event.findById({_id: req.params.eventId})
    .populate('creator')
    .then(event => {
      //console.log(event);
      res.render('event/contact-owner', {event});
    })
    .catch(error => {
      next(error);
    });
});
*/

/*
eventRouter.post('/:eventId/contact-owner', (req, res, next) => {
  const eventId = req.params.eventId;
  const userName = req.user.name;
  const userEmail = req.user.email;
  const {subject, message } = req.body;
  let eventTitle;
  let eventOwnerEmail;
  let eventOwnerName;
  Event.findById({ _id: eventId })
    .populate('creator')
    .then(event => {     
      eventTitle = event.title;
      eventOwnerEmail = event.creator.email;
      eventOwnerName = event.creator.name;
      transporter
      .sendMail({
        from: `Doggy Playdate Parent ${userName} <${process.env.NODEMAILER_EMAIL}`,
        to: eventOwnerEmail,
        subject: subject,
        html : `Dear ${eventOwnerName} You have received the following message from Doggy Playdate Parent ${userName} regarding your event ${eventTitle}: ${message}. Kind regards, ${userName} - you can reply to my message at <a href=mailto:${userEmail}>${userEmail}</a>`
        
      });
    })
    .then(result => {
      console.log(result)
      res.redirect(`/event/${eventId}`);
    }) 
    .catch(error => {
      next(error);
    });
});
*/


eventRouter.get('/:eventId/edit', (req, res, next) => {
  const eventId = req.params.eventId;
  Event.findOne({
    _id: eventId,
    creator: req.user._id
  })
    .then(event => {
      //console.log(event);
      let formattedStartDate = event.date;
      formattedStartDate = formattedStartDate.toISOString().replace('Z', '');
      let formattedEndDate = event.endDate;
      formattedEndDate = formattedEndDate.toISOString().replace('Z', '');
      res.render('event/edit', { event, formattedStartDate, formattedEndDate });
    })
    .catch(error => {
      next(error);
    });
});

eventRouter.post('/:eventId/edit', uploader.single('photo'), (req, res, next) => {
  const eventId = req.params.eventId;
  const { name,
    description,
    location,
    picture,
    email } = req.body;
  let photo;
  let event;
  //console.log(req.body);
  Event.findOne({
    _id: eventId,
    creator: req.user._id
  })
    .then(doc => {
      event = doc.toObject();
      if (req.file) {
        photo = req.file.url;
      } else {
        photo = event.photo;
      }
      //console.log(photo);
      return Event.findByIdAndUpdate(
        { _id: eventId },
        {
            name,
            description,
            location,
            picture,
            email
        }
      );
    })
    .then(result => {
      //console.log('result', result);
      res.redirect(`/event/${eventId}`);
    })
    .catch(error => {
      next(error);
    });
});


eventRouter.post('/:eventId/delete', (req, res, next) => {
  const eventId = req.params.eventId;
  Event.findOneAndRemove({
    _id: eventId,
    creator: req.user._id
  })
    .then(result => {
      //console.log(result);
      res.redirect(`/event/list`);
    })
    .catch(error => {
      next(error);
    });
});



eventRouter.get('/:eventId', (req, res, next) => {
  const eventId = req.params.eventId;
  let event;
  Event.findById(eventId)
    .populate('event creator')
    .populate('event participants')
    .then(doc => {
      event = doc.toObject();
      if (req.user && event.creator._id.toString() === req.user._id.toString()) {
        event.owner = true;
      }
      //console.log('true?', event.owner, 'req id', req.user._id, 'creator', event.creator._id);
      return Comment.find({ event: eventId }).populate('creator');
    })
    .then(comments => {
      //console.log(comments);
      res.render('event/single', { event, comments });
    })
    .catch(error => {
      next(error);
    });
});


module.exports = eventRouter;