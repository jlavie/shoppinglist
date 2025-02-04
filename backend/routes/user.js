const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/logout', userController.logout);
router.post('/login', userController.login);
router.get('/me', userController.findMe);

module.exports = router;