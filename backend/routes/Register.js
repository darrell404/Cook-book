const express = require("express")
const router = express.Router();
const passport = require("passport")
const LocalStrategy = require('passport-local')
const bcrypt = require("bcrypt")
const User = require('../models/model')

router.route('/').post(async (req, res) => {
    var parameters = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        const createUser = await User.create(parameters)
        console.log(`Account for ${createUser.email} found!`)
    }
    catch(err) {
        console.log(err)
    }
})


module.exports = router