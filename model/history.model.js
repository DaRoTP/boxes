const mongoose = require("mongoose");
const makeModel = require("../utils/modelFactory");

const { LOCATION_NAME } = require("./location.model");

const HISTORY_NAME = "History";

const hsitorySchema = new mongoose.Schema({
  timeStamp: {
    type: Date,
    default: new Date(),
  },
  currentLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: LOCATION_NAME,
  },
});

const History = makeModel(HISTORY_NAME, hsitorySchema);

module.exports = { History, HISTORY_NAME };