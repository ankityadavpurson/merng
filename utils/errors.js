const { GraphQLError } = require("graphql");

class UserInputError extends GraphQLError {
  constructor(message, extensions) {
    super(message, { extensions: { ...extensions, code: "BAD_USER_INPUT" } });
  }
}

class AuthenticationError extends GraphQLError {
  constructor(message, extensions) {
    super(message, { extensions: { ...extensions, code: "UNAUTHENTICATED" } });
  }
}

module.exports = { UserInputError, AuthenticationError };
