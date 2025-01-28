const express = require('express');
const router = express.Router();

const ingredientController = require('../controllers/ingredient');
const multer = require('../middleware/multer-config');

router.get('/all', ingredientController.getAll);
router.post('/', multer, ingredientController.addIngredient);
router.delete('/:id', ingredientController.deleteOne);
router.get('/:id', ingredientController.getOne);

module.exports = router;