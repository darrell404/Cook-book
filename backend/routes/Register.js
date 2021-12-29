const express = require("express")
const router = express.Router();
const passport = require("passport")
const LocalStrategy = require('passport-local')
const bcrypt = require("bcrypt")
const User = require('../models/model')

router.use(express.json())

router.route('/').post(async (req, res) => {
    const salt = 10;
    const encryptPassword = await bcrypt.hash(req.body.password, salt, async (err, hash) => {
        if(err) console.log(err)
        else {
            var parameters = {
                email: req.body.email,
                password: hash
            }
        
            try {
                const createUser = await User.create(parameters)
                console.log(`Account for ${createUser.email} created!`)
            }
            catch(err) {
                console.log(err)
            }
        }
    })

   
})


module.exports = router