const express = require('express');
const router = express.Router();

const ingredientController = require('../controllers/ingredient');
const multer = require('../middleware/multer-config');
const upload = multer({ destination: 'images/ingredient' });

router.get('/all', ingredientController.getAll);
router.post('/', upload.single('file'), ingredientController.addIngredient);
router.delete('/:id', ingredientController.deleteOne);
router.get('/:id', ingredientController.getOne);

module.exports = router;