const mongoose = require('mongoose');

const dishSchema = mongoose.Schema({
    title: {type: String, require: true},
    description: {type: String, require: true},
    image: {type: String, require: true},
    category: {type: String, require: true},
    difficulty: {type: String, require: true},
    budget: {type: String, require: true}
})

module.exports = mongoose.model('Dish', dishSchema);