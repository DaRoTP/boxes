const express = require("express");
const router = express.Router();

const UserController = require('../controller/user.controller');

router
  .route("/")
  .get(UserController.list)
  .post(UserController.create);

router
  .route("/login")
  .post(UserController.login);

router
  .route("/:activityId")
  .get(UserController.getById)
  .delete(UserController.deleteById)
  .put(UserController.updateById)

module.exports = router;