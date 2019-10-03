let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    phone: Number,
    email: String,
    username: String,
    password: String,
    landlordnum: Number
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);