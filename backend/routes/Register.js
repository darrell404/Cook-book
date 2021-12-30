const express = require("express")
const router = express.Router();
const passport = require("passport")
const LocalStrategy = require('passport-local')
const bcrypt = require("bcrypt")
const User = require('../models/User')

router.use(express.json())

router.route('/').post(async (req, res) => {
    const salt = 10;
    const encryptPassword = await bcrypt.hash(req.body.password, salt, async (err, hash) => {
        const {firstName, lastName, email} = req.body
        console.log(req.body)
        if(err) console.log(err)
        else {
            var parameters = {
                firstName,
                lastName,
                email,
                password: hash
            }
        
            try {
                const createUser = await User.create(parameters)
                console.log(`Account for ${createUser.email} created!`)
                res.send({"success": "Account successfully created!"})
            }
            catch(err) {
                if(err.code === 11000) {res.send({"error": "User account already exists"})}
                console.log(err)
            }
        }
    })

   
})


module.exports = router