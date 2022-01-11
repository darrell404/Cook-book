const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecipeSchema = new Schema({
    recipeID: {
        type: Number
    }
})

module.exports = mongoose.model('recipes', RecipeSchema)