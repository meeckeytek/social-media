const { UserInputError } = require("apollo-server");
const Post = require("../../models/post.model")

module.exports = {
    Query: {
      //get all posts
      async getAllPosts() {
        try {
          const posts = await Post.find();
          return posts
        } catch (err) {
          throw new Error(err);
        }
      },

      //get single post
      async getPost(_, {id}){

      }
    },
    Mutation: {
      //create new post
      async newPost(_, {postInput: {image, title, body}}){
        if(image.trim() === "" || title.trim() === "" || body.trim()){
          throw new UserInputError("Please supply all necessary inputs")
        }

        const newPost = new Post({})
      },

      // edit post
      async editPost(_, {id, image, title, body}){
        if(image.trim() === "" || title.trim() === "" || body.trim()){
          throw new UserInputError("Please supply all necessary inputs")
        }
      },

      //like post
      async likePost(_, {id}){

      },

      //comment on post
async commentPost(_, {id, comment}){

},

      //delete post
      async deletePost(_, {id}){

      },
    }
  };