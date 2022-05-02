const express = require("express");
const router = express.Router();

const LocationController = require('../controller/location.controller');

router
  .route("/")
  .get(LocationController.list)
  .post(LocationController.create);

router
  .route("/:locationId")
  .get(LocationController.getById)
  .delete(LocationController.deleteById)
  .put(LocationController.updateById)

module.exports = router;