const express = require("express");
const router = express.Router();

const LocationController = require('../controller/location.controller');
const { isAuth, isAuthThrow } = require('../../middleware/isAuth.middleware');

router
  .route("/")
  .get(isAuth, isAuthThrow, LocationController.list)
  .post(isAuth, isAuthThrow, LocationController.create);

router
  .route("/:locationId")
  .get(LocationController.getById)
  .delete(isAuth, isAuthThrow, LocationController.deleteById)
  .put(isAuth, isAuthThrow, LocationController.updateById)

module.exports = router;