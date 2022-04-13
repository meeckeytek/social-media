const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstname:{type: String},
    lastname:{type: String},
    username:{type: String},
    phone:{type: String},
    email:{type: String},
    password:{type: String},
    resetLink:{data: String, default: ''}
},{
    timestamps: true
});
module.exports = mongoose.model("User", userSchema)