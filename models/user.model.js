const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
},{
    timestamps: true
});
module.exports = mongoose.model("User", userSchema)