const express = require('express');
const router = express.Router();

const ingredientController = require('../controllers/ingredient');

router.get('/all', ingredientController.getAll);
router.post('/', ingredientController.addIngredient);
router.delete('/:id', ingredientController.deleteOne);
router.get('/:id', ingredientController.getOne);

module.exports = router;