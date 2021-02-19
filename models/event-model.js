const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: String,
    description: String,
    date: Date,
    location: String,
    picture: String,
    // activity: String,

    activity:[
        "sport",
        "food",
        "party",
        "movies",
        "outdoor", 
    ],

    host: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    numberParticipants: Number
});

/*
{ typeKey: '$type' }
By adding this we are asking mongoose to use $type for interpreting the type of a key instead of the default keyword type
*/

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;