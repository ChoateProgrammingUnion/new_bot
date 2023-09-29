const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

/*
discordID -> Not the hashtag one, just the long number that doesn't change
nickname -> What they enter for nickname
attendanceYear -> How many times a year they attended
attendanceDates -> Array of dates they attended. Format is MM/DD/YYYY
*/

const userSchema = new Schema({
    discordID: {
        type: Number,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    attendanceYear: {
        type: Number,
        required: true,
    },
    attendanceDates: {
        type: Array,
        required: true,
    },
});

const userHandler = mongoose.model('Users', userSchema, 'Users');

module.exports = userHandler;