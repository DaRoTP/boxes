const express = require("express");
const router = express.Router();

const SizeController = require('../controller/size.controller');

router
  .route("/")
  .get(SizeController.list)
  .post(SizeController.create);

router
  .route("/:sizeId")
  .get(SizeController.getById)
  .delete(SizeController.deleteById)
  .put(SizeController.updateById)

module.exports = router;