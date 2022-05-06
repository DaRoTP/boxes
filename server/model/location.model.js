const mongoose = require("mongoose");
const makeModel = require("../utils/modelFactory");

const LOCATION_NAME = "Location";

const locationSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, "country is requied"],
  },
  city: {
    type: String,
    required: [true, "city is requied"],
  },
  street: {
    type: String,
    required: [true, "street is requied"],
  },
  number: {
    type: Number,
  },
  postcode: {
    type: String,
    required: [true, "postcode is requied"],
    maxlength: [8, "must not be longer than 8 characters"],
  },


});

const Location = makeModel(LOCATION_NAME, locationSchema);

module.exports = { Location, LOCATION_NAME };