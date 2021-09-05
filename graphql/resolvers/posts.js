const { AuthenticationError } = require("apollo-server");
const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");

const postResolver = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) return post;
        else throw new Error("Post not found");
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },

    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findOne({ postId });
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted sccessfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async likePost(_, { postId }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);

        if (post) {
          if (post.likes.find((like) => like.username === user.username)) {
            // already liked=> unlike
            post.likes = post.likes.filter(
              (like) => like.username !== user.username
            );
          } else {
            // not liked=> like
            post.likes.push({
              username: user.username,
              createdAt: new Date().toISOString(),
            });
          }

          await post.save();
          return post;
        } else throw new UserInputError("Post not found");
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = postResolver;
