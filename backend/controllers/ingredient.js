const Ingredient = require('../models/ingredient');
const fs = require('fs');

exports.getAll = (req, res) => {
    Ingredient.find()
        .then(ingredients => res.status(200).json({ingredients}))
        .catch(error => res.status(400).json({error}));
}

exports.getOne = (req, res) => {
    Ingredient.findOne({_id: req.params.id})
        .then(ingredient => {
            console.log('Donnée retournée par MongoDB :', ingredient);
            if (!ingredient) {
                return res.status(404).json({ message: 'Ingredient not found' });
            }
            res.status(200).json(ingredient)
        })
        .catch(error => res.status(400).json(error));
}

exports.addIngredient = (req, res) => {
    const filePath = `${req.protocol}://${req.get('host')}/images/ingredient/${req.file.filename}`;
    delete req.body._id;

    const ingredient = new Ingredient({
        ...req.body,
        file: filePath
    });
    ingredient.save()
        .then((ingredient) => res.status(200).json({ingredient}))
        .catch(error => res.status(400).json({error}));
}

exports.deleteOne = (req, res) => {
    Ingredient.findOne({_id: req.params.id})
        .then(ingredient => {
            const filename = ingredient.file.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {
                Ingredient.deleteOne({_id: req.params.id})
                .then(ingredient => {
                    res.status(200).json(ingredient);
                })
                .catch(error => res.status(400).json(error));
            })
            console.log(filename)

        })
        .catch(error => res.status(400).json(error));
}
