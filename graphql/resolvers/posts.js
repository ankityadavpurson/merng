const Post = require("../../models/Post");

const postResolver = {
  Query: {
    async getPost() {
      try {
        const post = await Post.find();
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = postResolver;
