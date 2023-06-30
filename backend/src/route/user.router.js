const express = require('express');
const userController = require('../controller/user.controller');

const router = express.Router();

router.post('/create', userController.createUser);
router.post('/login', userController.logIn);
router.post('/verify', userController.validateEmail);

module.exports = router;
