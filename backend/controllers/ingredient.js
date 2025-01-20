const Ingredient = require('../models/ingredient');

exports.getAll = (req, res) => {
    Ingredient.find()
        .then(ingredients => res.status(200).json({ingredients}))
        .catch(error => res.status(400).json({error}));
}

exports.addIngredient = (req, res) => {
    console.log(req.body)
    delete req.body._id;
    const ingredient = new Ingredient({
        ...req.body
    })

    ingredient.save()
        .then(() => res.status(200).json({message: 'Ingrédient ajouté en base'}))
        .catch(error => res.status(400).json({error}));
}