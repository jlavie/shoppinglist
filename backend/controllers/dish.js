const Dish = require('../models/dish');
const fs = require('fs');

exports.getAll = (req, res) => {
    Dish.find()
        .then(dishes => res.status(200).json({dishes}))
        .catch(error => res.status(400).json({error}));
}

exports.add = (req, res) => {
    const filePath = `${req.protocol}://${req.get('host')}/images/dish/${req.file.filename}`;
    delete req.body._id;

    const dish = new Dish({
        ...req.body,
        image: filePath
    })

    dish.save()
        .then(dish => res.status(200).json({dish}))
        .catch(error => res.status(400).json({error}));
}

exports.deleteOne = (req, res) => {
    Dish.findOne({_id: req.params.id})
    .then(dish => {
        if (!dish) {
            return res.status(404).json({ message: 'dish not found' });
        }
        const filename = dish.image.split('images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Dish.deleteOne({_id: req.params.id})
                .then(dish => res.status(200).json({dish}))
                .catch(error => res.status(400).json({error}));
        })    })
    .catch(error => res.status(400).json(error));
}