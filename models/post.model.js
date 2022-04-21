const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    image:{type: String},
    title:{type: String},
    body:{type: String},
    category:{type: String},
    views:[{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
    likes:[{userId: {type: mongoose.Schema.Types.ObjectId, ref:'User'}}],
    creator:{type: String},
    cloudinary_id:{type: String},
    comments:[{
        username: {type: String},
        comment:{type: String},
        createdAt:{type: String}
    }]
},{
    timestamps: true
})

module.exports = mongoose.model("Post", postSchema)