const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecipeFromAPISchema = new Schema({
    any: Schema.Types.Mixed}, { strict: false }
)

module.exports = mongoose.model('RecipeFromAPI', RecipeFromAPISchema, 'recipes')