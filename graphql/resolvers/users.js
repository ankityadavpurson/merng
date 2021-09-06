const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../../config");
const User = require("../../models/User");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { valid, errors } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Input errors", { errors });
      }

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        errors.general = "Wrong crendetials";
        throw new UserInputError("Wrong crendetials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    async register(
      _,
      { registerInput: { username, password, confirmPassword, email } }
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Input errors", { errors });
      }

      const user = await User.findOne({ username });

      if (user) {
        throw new UserInputError("Uaername is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
