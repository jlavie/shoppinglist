const Ingredient = require('../models/ingredient');

exports.getAll = (req, res) => {
    Ingredient.find()
        .then(ingredients => res.status(200).json({ingredients}))
        .catch(error => res.status(400).json({error}));
}