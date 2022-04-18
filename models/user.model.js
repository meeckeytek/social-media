const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    picture: {type: String},
    firstname:{type: String},
    lastname:{type: String},
    username:{type: String},
    phone:{type: String},
    email:{type: String},
    password:{type: String},
    cloudinary_id:{type: String},
    resetLink:{data: String, default: ''}
},{
    timestamps: true
});
module.exports = mongoose.model("User", userSchema)