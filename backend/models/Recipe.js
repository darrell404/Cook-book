const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecipeSchema = new Schema({
    recipeID: {
        type: Number
    },
    any: Schema.Types.Mixed}, { strict: false }
)

module.exports = mongoose.model('recipes', RecipeSchema)