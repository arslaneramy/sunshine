'use strict';


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
  name: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: {type: String, required: true},
  aboutme : {type: String},
  picture : {type : String},
  createEvent: [{ type: mongoose.Schema.Types.ObjectId }],
  joinEvent: [{ type: mongoose.Schema.Types.ObjectId }]
},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
}
);
  

const User = mongoose.model("User", userSchema);

module.exports = User;