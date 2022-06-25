const mongoose = require("mongoose");
const makeModel = require("../utils/modelFactory");

const SIZE_NAME = "Size";

const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  code: {
    type: String,
    maxlength: [10, "must not be longer than 10 characters"],
    unique: true,
    required: [true, "code is required"],
  },
  mesurments: {
    x: { type: Number },
    y: { type: Number },
    z: { type: Number },
  },
  weight: {
    type: Number,
    required: [true, "weight is required"],
  }
});

const Size = makeModel(SIZE_NAME, sizeSchema);

module.exports = { Size, SIZE_NAME };