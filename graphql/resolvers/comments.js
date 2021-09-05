const { UserInputError, AuthenticationError } = require("apollo-server");

const checkAuth = require("../../utils/check-auth");
const Post = require("../../models/Post");

const commentResolver = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const { username } = checkAuth(context);

      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment is empty",
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comment.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },

    async deleteComment(_, { postId, commentId }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);

        if (post) {
          const commentIndex = post.comment.findIndex(
            (c) => c.id === commentId
          );
          if (user.username === post.comment[commentIndex].username) {
            post.comment.splice(commentIndex, 1);
            await post.save();
            return post;
          } else {
            throw new AuthenticationError("Action not allowed");
          }
        } else throw new UserInputError("Post not found");
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = commentResolver;
