const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecipeSchema = new Schema({ })

module.exports = mongoose.model('recipes', RecipeSchema)