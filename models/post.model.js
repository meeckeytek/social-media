const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    post: String,
    username: String,
    comments:[{
        comment: String,
        username: String,
    },{
        timestamps: true
    }],
    likes:[{
        username: String,
    },{
        timestamps: true
    }],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Post", postSchema)