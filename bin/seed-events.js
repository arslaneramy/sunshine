// const mongoose = require("mongoose");
// const Event = require("../models/event-model")
// require('dotenv').config();

// const eventArray = [{
//     name: 'Running',
//     description: 'Running at the park',
//     date: Date.now(),
//     location: 'BCN',
//     picture: 'link to the picture',
//     numberParticipants: 0
//   },
//   {
//     name: 'Language exchange',
//     description: 'Language exchange at the pub',
//     date: Date.now(),
//     location: 'BCN',
//     picture: 'link to the picture',
//     numberParticipants: 0
//   }
// ];

// mongoose.connect(
//     `${process.env.MONGODB_URI}`, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     }
//   )
//   .then((x) => {
//     console.log('Connected to the DB');
//     const pr = x.connection.dropDatabase();
//     return pr;
//   })
//   .then(() => {
//     const pr = Event.create(eventArray);
//     return pr;
//   })
//   .then((eventInserted) => {
//     console.log(`Created ${eventInserted}`);
//     mongoose.connection.close();
//   })
//   .catch((err) => console.log('Error connection to the DB', err));