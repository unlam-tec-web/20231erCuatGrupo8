const express = require('express');
const userController = require('../controller/user.controller');

const router = express.Router();


router.get("/", userController.findAll);
router.post('/create', userController.createUser);

module.exports = router;