const express = require('express');
const cartController = require('../controller/cart.controller');

const router = express.Router();

router.get("/view/:id", cartController.getCart);
router.post("/add", cartController.addProduct);

module.exports = router;
