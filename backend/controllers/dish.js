const Dish = require('../models/dish');
const fs = require('fs');

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