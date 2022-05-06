const mongoose = require("mongoose");
const makeModel = require("../utils/modelFactory");

const USER_NAME = "User";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
  },
  password: {
    type: String,
    minLength: [6, "must not be shorter than 6 characters"],
    required: [true, "password is required"],
  },
});

const User = makeModel(USER_NAME, userSchema);

module.exports = { User, USER_NAME };