const postsResolvers = require("./posts")
const userResolvers = require("./users")

module.exports = {
    Post:{
        likeCount:(parent) => parent.likes.length,
        commentsCount:(parent) => parent.comments.length,
        viewsCount:(parent) => parent.views.length
    },
    Query:{
        ...postsResolvers.Query,
        ...userResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...postsResolvers.Mutation,
    },
    // Subscription:{
    //     ...postsResolvers.Subscription
    // }
}