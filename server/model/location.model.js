const mongoose = require("mongoose");
const makeModel = require("../utils/modelFactory");

const LOCATION_NAME = "Location";

const locationSchema = new mongoose.Schema({
  identifier: {
    type: String,
    required: [true, "identifier is required"],
    minlength: [3, 'identifier cant be shorter than 3 characters'],
    maxlength: [15, 'identifier cant be longer than 15 characters'],
    unique: [true, "identifier is not available"],
  },
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
  email: {
    type: String,
  },
  phone1: {
    type: String
  },
  phone2: {
    type: String
  }

});

const Location = makeModel(LOCATION_NAME, locationSchema);

module.exports = { Location, LOCATION_NAME };