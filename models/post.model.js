const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    image:{type: String},
    title:{type: String},
    body:{type: String},
    views:[{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
    likes:[{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
    creator:{type: String},
    cloudinary_id:{type: String},
    comments:[]
},{
    timestamps: true
})

module.exports = mongoose.model("Post", postSchema)