const express = require('express');
const router = express.Router();

const dishController = require('../controllers/dish');
const multer = require('../middleware/multer-config');
const upload = multer({ destination: 'images/dish' });

router.post('/', upload.single('image'), dishController.add);

module.exports = router;