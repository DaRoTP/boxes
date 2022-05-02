const express = require("express");
const router = express.Router();

const BoxController = require('../controller/box.controller');

router
  .route("/")
  .get(BoxController.list)
  .post(BoxController.createOrder)


router
  .route("/:boxId")
  .get(BoxController.getOrder)
  .put(BoxController.updateOrder)


module.exports = router;