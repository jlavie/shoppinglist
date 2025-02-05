const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/me', userController.findMe);
router.get('/protected', userController.verifyToken)

module.exports = router;