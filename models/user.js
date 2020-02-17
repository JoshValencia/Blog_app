var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,   
    image: String,
    email: String,
    fullname: String,
    age: String,
    location: String,
    gender: String,
    bio: String
    },{timestamps: true});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);