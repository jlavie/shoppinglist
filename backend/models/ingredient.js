const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ingredientSchema = mongoose.Schema({
    name: {type: String, require: true, unique: true},
    file: {type: String, require: true},
    category: {type: String, require: true}
})

ingredientSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Ingredient', ingredientSchema);