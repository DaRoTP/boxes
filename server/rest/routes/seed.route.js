const express = require("express");
const router = express.Router();

const SeedController = require('../controller/seed.controller');

router
  .route("/")
  .get(SeedController.seedData);

router
  .route("/box")
  .get(SeedController.seedBoxes);


module.exports = router;