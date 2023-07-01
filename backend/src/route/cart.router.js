const express = require('express');
const cartController = require('../controller/cart.controller');

const router = express.Router();

router.get("/view", cartController.getCart);
router.post("/add", cartController.addProduct);
router.post("/remove", cartController.removeProduct);
router.post("/clear", cartController.clear);

module.exports = router;
