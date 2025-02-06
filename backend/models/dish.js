const mongoose = require('mongoose');

const dishSchema = mongoose.Schema({
    title: {type: String, require: true},
    description: {type: String, require: true},
    image: {type: String, require: true},
    category: {type: String, require: true},
    difficulty: {type: String, require: true},
    budget: {type: String, require: true},
    ingredients: [{
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' },
        quantity: { type: Number, required: true }
      }]
})

module.exports = mongoose.model('Dish', dishSchema);