const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: String,
    description: String,
    date: Date,
    location: String,
    picture: String,
    host: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    numberParticipants: number
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;