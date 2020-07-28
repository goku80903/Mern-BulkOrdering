const mongoose = require('mongoose');

let User = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String
    },
    ratings:{
        type:Number
    },
    rating_sum:{
        type:Number
    },
    review:{
        type:Array
    }
});

module.exports = mongoose.model('User', User);