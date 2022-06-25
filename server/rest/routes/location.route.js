const express = require("express");
const router = express.Router();

const LocationController = require("../controller/location.controller");
const { isAuthThrow } = require("../../middleware/isAuth.middleware");

router
  .route("/")
  .get(isAuthThrow, LocationController.list)
  .post(isAuthThrow, LocationController.create);

router
  .route("/:locationId")
  .get(LocationController.getById)
  .delete(isAuthThrow, LocationController.deleteById)
  .put(isAuthThrow, LocationController.updateById);

router
  .route("/:locationId/contact")
  .get(LocationController.getContactInfo)
module.exports = router;
