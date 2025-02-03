const express = require('express');
const router = express.Router();

const dishController = require('../controllers/dish');
const multer = require('../middleware/multer-config');
const upload = multer({ destination: 'images/dish' });

router.get('/all', dishController.getAll);
router.post('/', upload.single('image'), dishController.add);
router.delete('/:id', dishController.deleteOne)
router.get('/:id', dishController.getOne);
router.patch('/:id', upload.single('image'), dishController.updateOne);

module.exports = router;