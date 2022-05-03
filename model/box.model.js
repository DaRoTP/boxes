const mongoose = require("mongoose");
const makeModel = require("../utils/modelFactory");
const { ACTIVITY_NAME } = require("./activity.model");
const { LOCATION_NAME } = require("./location.model");
const { HISTORY_NAME } = require("./history.model");

const BOX_NAME = "Box";

const boxSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "description is required"],
    minlength: [3, "must not be less that 3 charatcters"],
    maxlength: [400, "must not be longer than 400 characters"],
  },
  history: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: HISTORY_NAME,
    }
  ],
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ACTIVITY_NAME,
  },
  origin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: LOCATION_NAME,
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: LOCATION_NAME,
  },

});

const Box = makeModel(BOX_NAME, boxSchema);

module.exports = { Box, BOX_NAME };