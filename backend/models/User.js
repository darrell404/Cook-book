const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userLoginSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    favourites: {
        type: Array
    }
})

module.exports = mongoose.model('users', userLoginSchema)