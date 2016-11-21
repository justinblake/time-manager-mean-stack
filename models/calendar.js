var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: {
        type: String,
        unique: true
    },
    tasks: [{
        title: String,
        description: String,
        startTime: String,
        endTime: String,
        spanLunch: Boolean
    }],
    phoneNumber: Number

});

module.exports = mongoose.model('UserObject', userSchema);