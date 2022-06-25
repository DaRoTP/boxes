const express = require("express");
const router = express.Router();

const { isAuthThrow } = require('../../middleware/isAuth.middleware');

const BoxController = require('../controller/box.controller');

router
  .route("/")
  .get(BoxController.list)
  .post(isAuthThrow, BoxController.createOrder)

router
  .route("/:boxId")
  .get(BoxController.getOrder)
  .put(BoxController.updateOrder)
  .delete(BoxController.deleteOrder)

router
  .route("/:boxId/transfer")
  .patch(BoxController.transferOrder)

router
  .route("/:boxId/history")
  .get(BoxController.getBoxHistory)


module.exports = router;