const mongoose = require("mongoose");
const User = require("./../models/user-model")
require('dotenv').config();

const userArray = [{
    name: 'Arslane',
    email: 'arslane@hotmail.com',
    password: '123456',
    aboutme: 'lorem',
    picture: 'pictureurl', // we don't need the last two properties
  },
  {
    name: 'Matt',
    email: 'mat@hotmail.com',
    password: 'abcdef',
    aboutme: 'lorem',
    picture: 'pictureurl',
  }/*,
  {
    name: 'Isabel',
    email: 'isabel@hotmail.com',
    password: '654321',
    aboutme: 'lorem',
    picture: 'pictureurl', // we don't need the last two properties
  }*/
];

mongoose.connect(
  /*`${process.env.MONGODB_URI}`, {*/
  `mongodb://localhost:27017/Sunshine`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then((x) => {
    console.log('hola');
    console.log('Connected to the DB, yei');
    const pr = x.connection.dropDatabase();
    return pr;
  })
  .then(() => {
    const pr = User.create(userArray);
    return pr;
  })
  .then((userInserted) => {
    console.log(`Created ${userInserted}`);
    mongoose.connection.close();
  })
  .catch((err) => console.log('Error connection to the DB', err));