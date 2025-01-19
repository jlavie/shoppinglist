const express = require('express');
const router = express.Router();

const ingredientController = require('../controllers/ingredient');

router.get('/all', ingredientController.getAll);

module.exports = router;