const mongoose = require("mongoose");
const makeModel = require("../utils/modelFactory");

const ACTIVITY_NAME = "Activity";

const activitySchema = new mongoose.Schema({
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
});

const Activity = makeModel(ACTIVITY_NAME, activitySchema);

module.exports = { Activity, ACTIVITY_NAME };