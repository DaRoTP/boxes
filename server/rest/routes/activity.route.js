const express = require("express");
const router = express.Router();

const ActivityController = require('../controller/activity.controller');

router
  .route("/")
  .get(ActivityController.list)
  .post(ActivityController.create);

router
  .route("/:activityId")
  .get(ActivityController.getById)
  .delete(ActivityController.deleteById)
  .put(ActivityController.updateById)

module.exports = router;