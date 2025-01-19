const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ingredientSchema = mongoose.Schema({
    name: {type: String, require: true, unique: true},
    picto: {type: String, require: true}
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Ingredient', ingredientSchema);