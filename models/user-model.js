const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  aboutme: String,
  picture: String,
  createEvent: [{ type: mongoose.Schema.Types.ObjectId }],
  joinEvent: [{ type: mongoose.Schema.Types.ObjectId }],
  
});

const User = mongoose.model("User", userSchema);

module.exports = User;