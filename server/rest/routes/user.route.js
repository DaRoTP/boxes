const express = require("express");
const router = express.Router();
const { isAuth, isAuthThrow } = require('../../middleware/isAuth.middleware');

const UserController = require('../controller/user.controller');

router
  .route("/")
  .get(UserController.list)

router
  .route("/login")
  .post(UserController.login);

router
  .route("/isAuth")
  .get(isAuth, isAuthThrow, UserController.getLoggedInuUser);

router
  .route("/register")
  .post(UserController.create);

router
  .route("/:activityId")
  .get(isAuth, isAuthThrow, UserController.getById)
  .delete(isAuth, isAuthThrow, UserController.deleteById)
  .put(isAuth, isAuthThrow, UserController.updateById)

module.exports = router;