const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    image: { type: String },
    title: { type: String },
    body: { type: String },
    category: { type: String },
    views: [{ userIp: { type: String } }],
    likes: [{ userId: { type: String } }],
    creator: [
     { userId:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
     username: { type: String }}
    ],
    cloudinary_id: { type: String },
    comments: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: { type: String },
        comment: { type: String },
        createdAt: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);